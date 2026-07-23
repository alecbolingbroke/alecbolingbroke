import { Logo } from "./logo";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 sm:px-6">
      <a href="#top" aria-label="Alec Bolingbroke — home">
        <Logo className="h-6 w-6" />
      </a>
      <a
        href="mailto:alec.bolingbroke35@gmail.com"
        className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
      >
        Email ↗
      </a>
    </header>
  );
}
