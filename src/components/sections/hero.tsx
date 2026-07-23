"use client";

import { motion } from "motion/react";
import { SplitText } from "../reveal";
import { Clock } from "../clock";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      {/* eyebrow — who */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
        className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted sm:text-xs"
      >
        Head of Applied AI — Building in the open
      </motion.p>

      {/* the name — front and center, the first thing you see */}
      <SplitText
        as="h1"
        text="Alec Bolingbroke"
        delay={0.5}
        className="mt-5 max-w-[15ch] font-display text-[clamp(2.75rem,13vw,11rem)] font-black leading-[0.85] tracking-[-0.03em]"
      />

      {/* what — one line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 1 }}
        className="mt-8 max-w-xl text-lg leading-snug text-fg sm:text-xl"
      >
        I build AI systems and automations that make the busywork disappear.
      </motion.p>

      {/* how to reach me */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 1.15 }}
        className="mt-8"
      >
        <a
          href="mailto:alec.bolingbroke35@gmail.com"
          className="text-base underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
        >
          alec.bolingbroke35@gmail.com ↗
        </a>
      </motion.div>

      {/* edge chrome */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="pointer-events-none absolute inset-x-4 bottom-5 flex items-end justify-between font-mono text-[11px] uppercase tracking-widest text-muted sm:inset-x-6"
      >
        <Clock label="LOCAL" />
        <span className="hidden sm:block">Lindon, UT</span>
      </motion.div>
    </section>
  );
}
