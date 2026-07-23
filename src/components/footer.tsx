import { Reveal } from "./reveal";

const socials = [
  { label: "Email", href: "mailto:alec.bolingbroke35@gmail.com" },
  { label: "GitHub", href: "https://github.com/alecbolingbroke" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alec-bolingbroke/" },
  { label: "X", href: "https://x.com/AlecBolingbroke" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative px-5 pt-24 pb-8 sm:px-6">
      <div className="mx-auto w-full max-w-[1500px]">
        <Reveal>
          <a
            href="mailto:alec.bolingbroke35@gmail.com"
            className="block whitespace-nowrap font-display text-[clamp(1.75rem,6vw,4.5rem)] font-bold leading-tight tracking-[-0.03em] transition-colors hover:text-accent"
          >
            Let&apos;s build.
          </a>
        </Reveal>

        {/* -my-2 / py-2 buys these 11px labels a thumb-sized tap target without
            changing the spacing. */}
        <div className="mt-12 -ml-2 flex flex-wrap gap-x-4 gap-y-0">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="px-2 py-3 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>© 2026</span>
          <a
            href="/llms.txt"
            className="-mx-2 px-2 py-3 transition-colors hover:text-accent"
          >
            Hey AI, learn about me
          </a>
        </div>
      </div>
    </footer>
  );
}
