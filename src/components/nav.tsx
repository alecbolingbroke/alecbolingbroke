"use client";

import { motion } from "motion/react";
import { Magnetic } from "./magnetic";
import { Clock } from "./clock";

const links = [
  { label: "Info", href: "#about" },
  { label: "Email", href: "mailto:alec.bolingbroke35@gmail.com" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-[100] flex items-start justify-between p-4 sm:p-5"
    >
      {/* left: bordered pill cluster */}
      <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-bg/70 p-1.5 backdrop-blur-md">
        <a
          href="#top"
          className="px-2.5 font-display text-base font-semibold tracking-tight"
        >
          ( AB )
        </a>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : undefined}
            className="rounded-xl bg-fg/[0.04] px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-fg/80 transition-colors hover:bg-fg/[0.09] hover:text-fg"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* right: availability + live clock chrome */}
      <div className="hidden items-center gap-2.5 rounded-2xl border border-line bg-bg/70 px-3.5 py-2.5 backdrop-blur-md sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <Clock className="font-mono text-[11px] uppercase tracking-widest text-muted" />
      </div>

      {/* mobile contact */}
      <Magnetic strength={0.4} className="sm:hidden">
        <a
          href="#contact"
          className="rounded-2xl border border-fg bg-fg px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-bg"
        >
          Contact
        </a>
      </Magnetic>
    </motion.header>
  );
}
