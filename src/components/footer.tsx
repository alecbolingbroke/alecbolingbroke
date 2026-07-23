import { Reveal } from "./reveal";

const socials = [
  { label: "Email", href: "mailto:alec.bolingbroke35@gmail.com" },
  { label: "GitHub", href: "https://github.com/alecbolingbroke" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X", href: "https://x.com/" },
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
            Let&apos;s build something.
          </a>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-fg"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <span className="mt-10 block font-mono text-[11px] uppercase tracking-widest text-muted">
          © 2026
        </span>
      </div>
    </footer>
  );
}
