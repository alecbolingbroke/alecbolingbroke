import { Reveal } from "../reveal";

const doing = ["Build", "Automate", "Systematize"];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-[1500px] gap-10 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          01 — What I do
        </p>

        <div className="max-w-2xl">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.08] tracking-tight">
              I&apos;m a builder. I work at the seam of AI, automation, and systems
              design — turning manual work and disconnected tools into things that
              run themselves.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-snug text-muted">
              I do it in the open — sharing what I build as I build it.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-2">
            {doing.map((d, i) => (
              <Reveal key={d} delay={0.05 * i}>
                <span className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-fg/80">
                  {d}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
