import { Reveal, SplitText } from "../reveal";

const facts = [
  ["Discipline", "Automation, AI systems, internal tooling"],
  ["Approach", "Ship small, in the open, then compound"],
  ["Based", "United States — remote"],
  ["Status", "Building in public"],
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            01 — Ethos
          </p>
        </div>

        <div>
          <SplitText
            as="h2"
            text="I like problems that look like busywork and turn out to be systems."
            className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight"
          />

          <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Most of my work starts with someone doing a thing by hand that a
              machine should be doing quietly in the background. I build the
              plumbing — the integrations, the automations, the small AI-shaped
              pieces — so the repetitive part disappears and the judgment part
              gets more room.
            </p>
            <p>
              I care about craft in places people rarely see: clean data flows,
              honest error handling, interfaces that respect attention. And I
              build in public, because the fastest way to get better is to show
              the work while it&apos;s still rough.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {facts.map(([k, v], i) => (
              <Reveal key={k} delay={0.05 * i} className="bg-bg p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {k}
                </p>
                <p className="mt-2 text-sm text-fg">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
