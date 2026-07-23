"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function Nav() {
  const pathname = usePathname();
  const onBlog = pathname.startsWith("/blog");

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 sm:px-6">
      <Link
        href="/"
        aria-label="Alec Bolingbroke — home"
        className="text-fg transition-colors hover:text-accent"
      >
        <Logo className="h-9 w-9" />
      </Link>
      <nav className="flex items-center gap-5">
        <Link
          href="/blog"
          aria-current={onBlog ? "page" : undefined}
          className={`font-mono text-xs uppercase tracking-widest transition-colors ${
            onBlog ? "text-accent" : "text-muted hover:text-accent"
          }`}
        >
          Blog
        </Link>
        <a
          href="mailto:alec.bolingbroke35@gmail.com"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          Email ↗
        </a>
      </nav>
    </header>
  );
}
