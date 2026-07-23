import { Reveal } from "../reveal";

const doing = ["Automate", "Integrate", "Systematize"];

export function About() {
  return (
    <section id="about" className="relative px-5 py-20 text-center sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Reveal>
          <p className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.08] tracking-tight">
            I work at the seam of AI, automation, and systems design, turning
            manual work and disconnected tools into things that run themselves.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md text-lg leading-snug text-muted">
            I do it in the open, sharing the work as it happens.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {doing.map((d, i) => (
            <Reveal key={d} delay={0.05 * i}>
              <span className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-fg/80">
                {d}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
