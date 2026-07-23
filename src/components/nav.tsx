"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Labs", href: "#labs" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 transition-colors duration-500 sm:px-8",
          scrolled &&
            "border-b border-line/60 bg-bg/70 backdrop-blur-md",
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-fg">
            AB
          </span>
          <span className="hidden font-display text-sm tracking-tight sm:block">
            Alec Bolingbroke
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.4}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={0.5}>
            <a
              href="#contact"
              className="ml-1 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Contact
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
