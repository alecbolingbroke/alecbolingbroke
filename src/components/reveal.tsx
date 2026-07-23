"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Blur into focus once, when scrolled into view.
 *
 * The hidden state is server-rendered, so the `reveal` class is load-bearing:
 * the inline fallback script in layout.tsx uses it to force these visible if
 * hydration never happens. Without that, a failed bundle would leave the About
 * copy and the footer's email CTA invisible rather than merely un-animated.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className ? `reveal ${className}` : "reveal"}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
