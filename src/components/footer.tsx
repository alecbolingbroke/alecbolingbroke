import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";

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
      className="relative border-t border-line px-5 pt-24 pb-10 sm:px-8"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          04 — Contact
        </p>

        <Reveal className="mt-8">
          <a
            href="mailto:alec.bolingbroke35@gmail.com"
            className="block font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] tracking-tight transition-colors hover:text-accent"
          >
            Let&apos;s build
            <br />
            something.
          </a>
        </Reveal>

        <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
                >
                  {s.label} ↗
                </a>
              </Magnetic>
            ))}
          </div>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} — Built in the open
          </p>
        </div>
      </div>
    </footer>
  );
}
