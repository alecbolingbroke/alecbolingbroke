"use client";

import { motion } from "motion/react";
import { Clock } from "../clock";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
    >
      {/* corner ticks */}
      <Tick className="left-4 top-24 sm:left-6" />
      <Tick className="right-4 top-24 sm:right-6" />
      <Tick className="bottom-16 left-4 sm:left-6" />
      <Tick className="bottom-16 right-4 sm:right-6" />

      {/* center statement — deliberately almost empty */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
          className="font-mono text-[11px] uppercase tracking-[0.35em] text-fg sm:text-xs"
        >
          Independent Builder — AI, Automation &amp; Systems
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.7 }}
          className="mt-6 font-display text-4xl italic tracking-tight text-accent sm:text-5xl"
        >
          &ldquo;©2026&rdquo;
        </motion.p>
      </div>

      {/* edge chrome */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="pointer-events-none absolute inset-x-4 bottom-5 flex items-end justify-between font-mono text-[11px] uppercase tracking-widest text-muted sm:inset-x-6"
      >
        <Clock label="LOCAL" />
        <a
          href="#work"
          className="pointer-events-auto flex items-center gap-2 transition-colors hover:text-fg"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent"
          >
            ↓
          </motion.span>
        </a>
        <span className="hidden sm:block">Building in public</span>
      </motion.div>
    </section>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute text-accent/70 ${className}`}
      aria-hidden
    >
      +
    </span>
  );
}
