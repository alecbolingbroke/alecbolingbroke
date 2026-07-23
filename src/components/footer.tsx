import { Reveal } from "./reveal";
import { Clock } from "./clock";

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
      className="relative border-t border-line px-5 pt-24 pb-5 sm:px-6"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <a
            href="mailto:alec.bolingbroke35@gmail.com"
            className="block font-display text-[clamp(2.75rem,11vw,9rem)] font-black leading-[0.85] tracking-tight transition-colors hover:text-accent"
          >
            Let&apos;s build
            <br />
            something.
          </a>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2">
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

        {/* bottom chrome, Otherkind-style corners */}
        <div className="mt-20 flex items-end justify-between border-t border-line pt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
          <Clock label="LOCAL" />
          <span>© 2026 — Built in the open</span>
        </div>
      </div>
    </footer>
  );
}
