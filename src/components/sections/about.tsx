import { Reveal } from "../reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line px-5 pt-24 pb-16 sm:px-6 sm:pt-32"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* giant Otherkind-style wordmark */}
        <Reveal y={40}>
          <h1 className="font-display text-[clamp(3.5rem,15vw,15rem)] font-black leading-[0.82] tracking-[-0.03em]">
            Alec
            <br />
            Bolingbroke
          </h1>
        </Reveal>

        {/* short blurb + contact, set low-left like the reference */}
        <div className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-[1fr_1.1fr] sm:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            01 — Info
          </p>

          <div className="max-w-md">
            <Reveal className="space-y-5 text-lg leading-snug text-fg">
              <p>
                Independent builder working at the seam of AI, automation, and
                systems design.
              </p>
              <p className="text-muted">
                I build the plumbing that makes busywork disappear — integrations,
                agents, internal tools — in the open.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href="mailto:alec.bolingbroke35@gmail.com"
                className="mt-8 inline-block text-lg underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
              >
                Get in touch ↗
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
