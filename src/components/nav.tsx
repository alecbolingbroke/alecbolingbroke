"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const LINKS = [
  { href: "/shipped", label: "Shipped" },
  { href: "/building", label: "Building" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 sm:px-6">
      <Link
        href="/"
        aria-label="Alec Bolingbroke — home"
        className="-m-2 p-2 text-fg transition-colors hover:text-accent"
      >
        <Logo className="h-9 w-9" />
      </Link>
      {/* The negative margins pull back the padding that exists only to give
          these 12px labels a thumb-sized tap target, so the layout is unchanged. */}
      <nav className="-mr-2 flex items-center gap-2 sm:gap-3">
        {LINKS.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`-my-2 px-2 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                active ? "text-accent" : "text-muted hover:text-accent"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <a
          href="mailto:alec.bolingbroke35@gmail.com"
          className="-my-2 px-2 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          Email ↗
        </a>
      </nav>
    </header>
  );
}
