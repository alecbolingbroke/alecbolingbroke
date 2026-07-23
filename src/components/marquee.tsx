const items = [
  "AI Systems",
  "Automation",
  "Integrations",
  "Internal Tools",
  "Data Pipelines",
  "Build in Public",
];

/** Infinite marquee strip. Two identical tracks, translated -50% in CSS. */
export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-line py-5 select-none">
      <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-xl tracking-tight text-muted sm:text-2xl">
              {it}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center"
      >
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-xl tracking-tight text-muted sm:text-2xl">
              {it}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
