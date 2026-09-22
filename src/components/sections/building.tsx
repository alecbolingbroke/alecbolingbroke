import { Reveal } from "../reveal";
import { BUILDING } from "@/content/building";

export function Building() {
  return (
    <section id="building" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[1500px]">
        <Reveal>
          <h2 className="font-mono text-[11px] font-normal uppercase tracking-widest text-muted">
            What I&apos;m building
          </h2>
        </Reveal>

        {/* Rows are divs rather than a ul/li: Reveal renders a div, which can't
            legally sit inside a ul. */}
        <div className="mt-10 max-w-3xl">
          {BUILDING.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05}>
              <div className="border-t border-line py-6 sm:py-7">
                <h3 className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-tight tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-xl text-base leading-snug text-muted sm:text-lg">
                  {item.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
