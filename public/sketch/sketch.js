// Sketch: a Gray-Scott reaction-diffusion pattern that grows out of a typed word or a photo.
// It fills the frame with coral, with tighter markings inside the word or photo, then keeps a slow life of its own
// (its rules drift, so it never quite settles). With the microphone on,
// music is a gentle layer on top, and each beat sends a soft swell through it. Plain WebGL2, no dependencies. Nothing is uploaded anywhere.
(() => {
  const $ = (id) => document.getElementById(id);
  const canvas = $("c"), note = $("note");
  const gl = canvas.getContext("webgl2", { antialias: false });
  // The simulation renders into float textures; without that there is nothing to show.
  if (!gl || !(gl.getExtension("EXT_color_buffer_float") || gl.getExtension("EXT_color_buffer_half_float"))) {
    note.textContent = "This sketch needs WebGL2, which this browser doesn't have turned on.";
    return;
  }

  const VS = `#version 300 es
in vec2 p; out vec2 uv;
void main() { uv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;

  const HEAD = `#version 300 es
precision highp float;
in vec2 uv; out vec4 o;
uniform sampler2D state, mask;
uniform vec2 px;
uniform float aspect;
uniform vec4 rip[4]; // swells: x = ring radius in screen heights, y = strength
float lum(vec2 at) { return dot(texture(mask, at).rgb, vec3(.299, .587, .114)); }
// Direction away from the centre of the frame, and the distance from it.
vec2 radial(out float r) { vec2 d = (uv - .5) * vec2(aspect, 1.); r = length(d) + 1e-5; return vec2(d.x / aspect, d.y) / r; }`;

  // Start: only the bright parts of the word or photo are seeded, so everything grows out of the source.
  const SEED = HEAD + `
uniform float salt;
float hash(vec2 v) { return fract(sin(dot(v, vec2(12.9898, 78.233)) + salt) * 43758.5453); }
void main() {
  float b = step(.5, lum(uv)) * step(.5, hash(floor(uv / px)));
  o = vec4(1., b, 0., 1.);
}`;

  // One Gray-Scott step. The source image bends the feed and kill rates, so it stays readable as the pattern grows:
  // coral around it, tighter animal-like markings inside it. feed and kill here are small slow offsets (the drift).
  const STEP = HEAD + `
uniform vec4 brush; // x, y, radius, strength
uniform float feed, kill;
void main() {
  float r; radial(r);
  vec2 q = uv;
  vec2 s = texture(state, q).rg;
  vec2 e = vec2(px.x, 0.), n = vec2(0., px.y);
  vec2 lap = -s
    + .2 * (texture(state, q + e).rg + texture(state, q - e).rg + texture(state, q + n).rg + texture(state, q - n).rg)
    + .05 * (texture(state, q + e + n).rg + texture(state, q + e - n).rg + texture(state, q - e + n).rg + texture(state, q - e - n).rg);
  float m = lum(uv);
  float F = mix(.0545, .030, m) + feed, K = mix(.062, .056, m) + kill;
  float react = s.r * s.g * s.g;
  float a = s.r + lap.r - react + F * (1. - s.r);
  float b = s.g + .5 * lap.g + react - (K + F) * s.g;
  for (int i = 0; i < 4; i++) { float x = (r - rip[i].x) / .01; b += exp(-x * x) * rip[i].y * .005; } // light: the visible swell is drawn, not grown
  // Growth fades out before it reaches the borders, leaving a clean margin all the way round.
  float margin = min(min(uv.x, 1. - uv.x) * aspect, min(uv.y, 1. - uv.y)); // distance to the nearest border, in screen heights
  b *= mix(.9, 1., smoothstep(.05, .15, margin));
  float d = length((uv - brush.xy) * vec2(aspect, 1.));
  b = max(b, brush.w * smoothstep(brush.z, brush.z * .5, d));
  o = vec4(clamp(a, 0., 1.), clamp(b, 0., 1.), 0., 1.);
}`;

  // Draw the pattern lit from one side. A beat's swell is one soft bulge travelling out through it: no wobble.
  const SHOW = HEAD + `
uniform float time, glint, solid; // solid = 1 for a typed word, 0 for a photo
uniform vec3 tint;
void main() {
  float r; vec2 dir = radial(r);
  vec2 w = uv;
  float flash = 0.;
  for (int i = 0; i < 4; i++) {
    float x = r - rip[i].x, k = rip[i].y * exp(-x * x / .006);
    w -= dir * k * .008;
    flash += k;
  }
  float b = texture(state, w).g;
  float dx = texture(state, w + vec2(px.x, 0.)).g - texture(state, w - vec2(px.x, 0.)).g;
  float dy = texture(state, w + vec2(0., px.y)).g - texture(state, w - vec2(0., px.y)).g;
  vec3 lamp = normalize(vec3(-.5 + .3 * sin(time * .2), .6, .6)); // the light swings slowly across
  float light = clamp(dot(normalize(vec3(-dx * 8., -dy * 8., 1.)), lamp), 0., 1.);
  // A typed word is drawn as solid, evenly lit letters from the very first frame; the pattern only grows around it.
  float word = solid * smoothstep(.12, .78, lum(w)); // a wide ramp: soft edges
  light = mix(light, .8, word);
  float body = max(smoothstep(.1, .3, b), word);
  vec3 deep = tint * .05 + vec3(.01, .02, .03), pale = mix(tint, vec3(1.), .8);
  vec3 flesh = mix(tint, pale, max(light * light, .75 * lum(w))); // the word or photo reads lighter than what grows around it
  vec3 c = mix(deep, flesh * (.5 + .6 * light + .5 * flash + .4 * glint), body);
  o = vec4(c, 1.);
}`;

  const program = (fs) => {
    const prog = gl.createProgram();
    for (const [type, src] of [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, fs]]) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
      gl.attachShader(prog, sh);
    }
    gl.bindAttribLocation(prog, 0, "p");
    gl.linkProgram(prog);
    const u = {};
    for (let i = 0; i < gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS); i++) {
      const name = gl.getActiveUniform(prog, i).name.replace("[0]", "");
      u[name] = gl.getUniformLocation(prog, name);
    }
    return { prog, u };
  };
  const seed = program(SEED), step = program(STEP), show = program(SHOW);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // one big triangle
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const texture = (wrap) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, wrap], [gl.TEXTURE_WRAP_T, wrap]])
      gl.texParameteri(gl.TEXTURE_2D, k, v);
    return t;
  };
  const states = [0, 1].map(() => ({ tex: texture(gl.REPEAT), fbo: gl.createFramebuffer() }));
  const maskTex = texture(gl.CLAMP_TO_EDGE);
  const FACE = 'system-ui, -apple-system, "Segoe UI", sans-serif'; // plain and clean: the reader's own system typeface
  const maskCanvas = document.createElement("canvas");
  const ctx = maskCanvas.getContext("2d");

  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches; // then: it grows, but the rules don't drift and nothing swells
  const params = new URLSearchParams(location.search), selftest = params.has("selftest");
  const fixedSteps = +params.get("steps"); // ?steps=N fast-forwards (used by the self-test)
  const RATE = 720; // simulation steps per second, whatever the screen's refresh rate (a 120 Hz screen must not run it twice as fast)

  let w = 0, h = 0, src = 0, source = { text: "sketch" }, brush = [0, 0, 0, 0], tint = [.98, .45, .36];
  const ripples = [], rips = new Float32Array(16), NONE = new Float32Array(16);
  const swell = (strength) => { if (!calm) ripples.push({ r: .05, s: strength }); }; // only a beat from the microphone sends one

  const use = ({ prog, u }, target, tw, th) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target);
    gl.viewport(0, 0, tw, th);
    gl.useProgram(prog);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, states[src].tex); gl.uniform1i(u.state, 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, maskTex); gl.uniform1i(u.mask, 1);
    gl.uniform2f(u.px, 1 / w, 1 / h);
    gl.uniform1f(u.aspect, w / h);
    return u;
  };

  // Draw the word or photo into the mask, then restart the pattern from it.
  const grow = () => {
    const mw = maskCanvas.width, mh = maskCanvas.height; // the mask is finer than the grid (see resize)
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, mw, mh);
    if (source.image) {
      const { width: iw, height: ih } = source.image, k = Math.max(mw / iw, mh / ih); // cover the frame
      ctx.drawImage(source.image, (mw - iw * k) / 2, (mh - ih * k) / 2, iw * k, ih * k);
    } else {
      const lines = mh > mw ? source.text.trim().split(/\s+/) : [source.text.trim()]; // on a tall screen, one word per line keeps the letters big
      ctx.font = `700 100px ${FACE}`;
      const widest = Math.max(...lines.map((line) => ctx.measureText(line).width), 1);
      const size = Math.min((100 * mw * .86) / widest, (mh * .6) / lines.length, mh * .34);
      ctx.font = `700 ${size}px ${FACE}`;
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.shadowColor = "#fff"; ctx.shadowBlur = size * .05; // a feathered edge, so the letters sit softly in the picture
      lines.forEach((line, i) => ctx.fillText(line, mw / 2, mh / 2 + (i - (lines.length - 1) / 2) * size));
      ctx.shadowBlur = 0;
      // The caret sits just after the last line, in screen pixels (the mask covers the whole window).
      const sx = innerWidth / mw, sy = innerHeight / mh, last = lines.length - 1;
      const endX = mw / 2 + ctx.measureText(lines[last]).width / 2 + size * .08, midY = mh / 2 + (last - (lines.length - 1) / 2) * size;
      Object.assign(caret.style, { left: `${endX * sx}px`, top: `${(midY - size * .4) * sy}px`, height: `${size * .8 * sy}px`, width: `${Math.max(2, size * .055 * sx)}px` });
    }
    caret.hidden = !!source.image;
    gl.bindTexture(gl.TEXTURE_2D, maskTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);
    gl.uniform1f(use(seed, states[src].fbo, w, h).salt, Math.random() * 100);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let lastW = 0, lastH = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr); canvas.height = Math.round(innerHeight * dpr);
    // Regrow only on a real layout change: a phone's address bar showing or hiding just stretches the picture.
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < lastH * .2) return;
    lastW = innerWidth; lastH = innerHeight;
    const k = 720 / Math.max(innerWidth, innerHeight); // the grid's long side is 720, so the pattern's scale doesn't depend on screen size
    w = Math.round(innerWidth * k); h = Math.round(innerHeight * k);
    maskCanvas.width = w * 2; maskCanvas.height = h * 2; // twice the grid, so solid letters keep clean edges
    for (const s of states) {
      gl.bindTexture(gl.TEXTURE_2D, s.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, s.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, s.tex, 0);
    }
    grow();
  };
  let resizeTimer;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); });

  // Word: you type straight onto the picture. The text box is invisible; every change redraws the word and restarts the growth.
  // The caret is always drawn after the word, so the real one is kept at the end too: typing adds there, Backspace deletes from there.
  const box = $("t"), caret = $("caret");
  source = { text: box.value }; // a reload can restore what was typed
  let sample = box.value === box.defaultValue; // the opening word is only an example: the first letter typed replaces it
  // The caret shows while you type and leaves shortly after you stop, so the finished picture is clean.
  let caretTimer;
  const showCaret = (ms) => { caret.classList.add("on"); clearTimeout(caretTimer); caretTimer = setTimeout(() => caret.classList.remove("on"), ms); };
  showCaret(4000); // on arrival: a hint that you can type
  const toEnd = () => box.setSelectionRange(box.value.length, box.value.length);
  box.addEventListener("focus", () => { toEnd(); requestAnimationFrame(toEnd); }); // some browsers place the caret at the start on focus
  box.addEventListener("input", () => { showCaret(1500); sample = false; source.image?.close(); source = { text: box.value }; grow(); });
  $("f").addEventListener("submit", (ev) => { ev.preventDefault(); grow(); }); // Enter starts the growth over
  addEventListener("keydown", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return; // shortcuts (select all, delete word, paste) keep their normal meaning
    if (["ArrowLeft", "ArrowUp", "Home"].includes(ev.key) && document.activeElement === box) { ev.preventDefault(); return; } // the caret stays at the end
    const letter = ev.key.length === 1, onButton = document.activeElement?.tagName === "BUTTON";
    if (!(letter || ev.key === "Backspace") || (ev.key === " " && onButton)) return; // Space still presses a focused button
    if (document.activeElement !== box) box.focus(); // typing goes to the word wherever the focus was
    if (letter && sample) box.value = "";
    sample = false;
    showCaret(1500);
  });
  addEventListener("paste", (ev) => { // pasting works even when the word doesn't have the focus
    if (document.activeElement === box) return;
    ev.preventDefault();
    box.value = ((sample ? "" : box.value) + ev.clipboardData.getData("text").replace(/\s+/g, " ")).slice(0, box.maxLength);
    box.dispatchEvent(new Event("input"));
  });
  canvas.addEventListener("pointerup", () => box.focus({ preventScroll: true })); // a tap on the picture brings up a phone's keyboard

  // Photo: decoded and drawn in this tab only.
  $("photo").addEventListener("click", () => $("file").click());
  $("file").addEventListener("change", async (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    $("photo").disabled = true; // a large photo takes a moment to decode
    try { const image = await createImageBitmap(file); source.image?.close(); source = { image }; box.value = ""; grow(); }
    catch { note.textContent = "That file didn't open as a photo. Try a JPG or PNG."; }
    finally { $("photo").disabled = false; }
    ev.target.value = "";
  });

  // Color: the piece and the page's own accents (focus ring, caret, selection) follow it.
  $("color").addEventListener("input", (ev) => {
    tint = [1, 3, 5].map((i) => parseInt(ev.target.value.slice(i, i + 2), 16) / 255);
    document.documentElement.style.setProperty("--tint", ev.target.value);
  });

  // Drag to stir
  const stir = (ev) => { if (ev.buttons || ev.type === "pointerdown") brush = [ev.clientX / innerWidth, 1 - ev.clientY / innerHeight, .02, .9]; };
  canvas.addEventListener("pointerdown", stir);
  canvas.addEventListener("pointermove", stir);

  // Microphone, a layer over the sketch's own drift: bass loosens the growth, highs glint, a beat sends a swell.
  let analyser = null, stopMic = null, bins = null, bass = 0, highs = 0, average = 0, lastBeat = 0, beat = 0;
  $("mic").addEventListener("click", async (ev) => {
    const btn = ev.currentTarget;
    if (analyser) { stopMic(); analyser = null; btn.setAttribute("aria-pressed", "false"); btn.textContent = "Listen"; return; }
    btn.disabled = true; // a second click while the permission prompt is open would start a second stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audio = new AudioContext();
      analyser = audio.createAnalyser();
      analyser.fftSize = 256;
      bins = new Uint8Array(analyser.frequencyBinCount);
      audio.createMediaStreamSource(stream).connect(analyser);
      stopMic = () => { stream.getTracks().forEach((t) => t.stop()); audio.close(); };
      btn.setAttribute("aria-pressed", "true"); btn.textContent = "Listening";
    } catch { btn.textContent = "Mic blocked"; note.textContent = "The microphone is blocked for this page. Allow it in the browser's site settings, then press the button again."; }
    btn.disabled = false;
  });
  const band = (from, to) => { let sum = 0; for (let i = from; i < to; i++) sum += bins[i]; return sum / ((to - from) * 255); };
  const listen = (now) => {
    if (!analyser) { bass *= .95; highs *= .95; return; } // fades out once the mic is off
    analyser.getByteFrequencyData(bins);
    bass = band(1, 6); highs = band(40, 100);
    average += (bass - average) * .05;
    if (bass > .3 && bass > average * 1.35 && now - lastBeat > 250) { lastBeat = now; beat = Math.max(beat, .55); swell(.55); }
  };

  let time = +params.get("time") || 0, last = performance.now(), owed = 0, lit0 = -1; // ?time=N starts the drift clock at N (for the self-test)
  const draw = (now) => {
    const dt = Math.min((now - last) / 1000, .05); last = now; time += dt;
    listen(now);
    beat *= Math.pow(.024, dt);
    for (const rp of ripples) { rp.r += dt * .32; rp.s *= Math.pow(.4, dt); }
    while (ripples.length > 4 || (ripples.length && ripples[0].s < .03)) ripples.shift();
    rips.fill(0); ripples.forEach((rp, i) => { rips[i * 4] = rp.r; rips[i * 4 + 1] = rp.s * .7; });

    const life = calm ? 0 : 1;
    owed = Math.min(owed + dt * RATE, 24); // capped, so a stalled tab doesn't catch up in one burst
    const steps = fixedSteps || Math.floor(owed);
    owed -= Math.floor(owed);
    for (let i = 0; i < steps; i++) {
      const u = use(step, states[1 - src].fbo, w, h);
      // The rules drift slowly so the pattern keeps changing character, but only inside the range where coral keeps growing.
      // (A wider drift pushed the kill rate past ~0.063 for a minute at a time, where growth stalls into still spots.)
      gl.uniform1f(u.feed, life * Math.sin(time * .045) * .001);
      gl.uniform1f(u.kill, -.0008 + life * Math.sin(time * .031 + 1) * .0006 - .0015 * bass);
      gl.uniform4fv(u.rip, i === 0 ? rips : NONE); // swells seed once per frame, not once per step
      gl.uniform4fv(u.brush, brush);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      src = 1 - src; brush = [0, 0, 0, 0];
    }
    const u = use(show, null, canvas.width, canvas.height);
    gl.uniform1f(u.time, time); gl.uniform1f(u.glint, highs * .65 + beat * .25);
    gl.uniform3fv(u.tint, tint); gl.uniform4fv(u.rip, rips); gl.uniform1f(u.solid, source.image ? 0 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // ?selftest: marks the page once clearly more of the frame is lit than at the start, i.e. the pattern really grew.
    if (selftest && document.body.dataset.grown !== "yes") {
      const px = new Uint8Array(canvas.width * canvas.height * 4);
      gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, px);
      let lit = 0;
      for (let i = 0; i < px.length; i += 4) if (px[i] > 100) lit++;
      if (lit0 < 0) lit0 = lit;
      document.body.dataset.grown = lit > lit0 * 1.25 ? "yes" : "no";
    }
    requestAnimationFrame(draw);
  };

  canvas.addEventListener("webglcontextlost", () => { note.textContent = "The graphics were reset by the browser. Reload to start again."; });
  resize();
  requestAnimationFrame(draw);
})();
