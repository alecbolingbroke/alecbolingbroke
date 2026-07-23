import { labs } from "@/content/labs";
import { Reveal } from "../reveal";

export function Labs() {
  return (
    <section
      id="labs"
      className="relative border-t border-line px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            03 — Labs
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Experiments in progress
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {labs.map((lab, i) => (
            <Reveal key={lab.title} delay={0.05 * i}>
              <div className="group relative flex h-full min-h-[200px] flex-col justify-between bg-bg p-7 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    {lab.tag}
                  </span>
                  <span className="font-mono text-xs text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {lab.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-snug text-muted">
                    {lab.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
