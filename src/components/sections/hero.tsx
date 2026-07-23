"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SplitText } from "../reveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pt-32 pb-8 sm:px-8"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1400px]">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Independent Builder — Innovation Lab
        </motion.div>

        {/* headline */}
        <h1 className="mt-8 font-display text-[clamp(3rem,12vw,10.5rem)] leading-[0.9] tracking-[-0.03em]">
          <SplitText as="span" text="I build systems" className="block" delay={0.45} />
          <SplitText as="span" text="that do the" className="block" delay={0.6} />
          <span className="block">
            <SplitText as="span" text="quiet work." className="inline-block text-accent" delay={0.75} />
          </span>
        </h1>
      </motion.div>

      {/* bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <p className="max-w-md text-balance text-sm leading-relaxed text-muted sm:text-base">
          I work at the seam of AI, automation, and systems design — building the
          tools and pipelines that let people skip the busywork. This site is an
          open lab of what I&apos;m making.
        </p>

        <a
          href="#work"
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent"
          >
            ↓
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
