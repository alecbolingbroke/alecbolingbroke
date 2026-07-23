import { labs } from "@/content/labs";
import { Reveal, SplitText } from "../reveal";

export function Labs() {
  return (
    <section
      id="labs"
      className="relative border-t border-line px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              03 — Labs
            </p>
            <SplitText
              as="h2"
              text="Experiments in progress"
              className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] tracking-tight"
            />
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Rougher, smaller, half-finished on purpose. The interactive one-offs
          and write-ups that don&apos;t belong anywhere else — yet.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {labs.map((lab, i) => (
            <Reveal key={lab.title} delay={0.05 * i}>
              <div className="group relative h-full min-h-[220px] bg-bg p-8 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    {lab.tag}
                  </span>
                  <span className="font-mono text-xs text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <h3 className="mt-16 font-display text-2xl tracking-tight sm:text-3xl">
                  {lab.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  {lab.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
