import { Reveal } from "./reveal";

const socials = [
  { label: "Email", href: "mailto:alec.bolingbroke35@gmail.com" },
  { label: "GitHub", href: "https://github.com/alecbolingbroke" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X", href: "https://x.com/" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-line px-5 pt-24 pb-6 sm:px-6"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <a
            href="mailto:alec.bolingbroke35@gmail.com"
            className="block font-display text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.03em] transition-colors hover:text-accent"
          >
            Let&apos;s build
            <br />
            something.
          </a>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-y-4 border-t border-line pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            © 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
