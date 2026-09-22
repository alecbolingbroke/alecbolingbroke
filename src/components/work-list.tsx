import { Reveal } from "./reveal";

export type WorkItem = {
  name: string;
  blurb: string;
};

/**
 * The shared body of /shipped and /building. Both pages are the same shape —
 * a title, a line of framing, and a list of name + blurb rows — so the rows
 * live here rather than being copied into each route.
 */
export function WorkList({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: WorkItem[];
}) {
  return (
    <section className="relative min-h-[100svh] px-5 pt-32 pb-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1500px]">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          {title}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-snug text-muted">{intro}</p>

        {/* Rows are divs rather than a ul/li: Reveal renders a div, which
            can't legally sit inside a ul. */}
        <div className="mt-16 max-w-3xl">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={0.04 * i}>
              <div className="border-t border-line py-7 sm:py-8">
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-tight">
                  {item.name}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-snug text-muted sm:text-lg">
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
