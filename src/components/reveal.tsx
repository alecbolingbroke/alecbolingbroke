"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Fade + rise into view once, on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

/**
 * Split a heading into words that swing up from behind a mask, staggered.
 * Pass the text as a plain string.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      variants={{ ...container, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
