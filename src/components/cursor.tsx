"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/**
 * Big vintage arrow pointer in the hyperlink blue. Replaces the native cursor
 * (hidden via globals.css on fine-pointer devices) and tracks 1:1 with the tip
 * at the pointer position. Desktop only.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x, y }}
    >
      <svg
        width="31"
        height="45"
        viewBox="0 0 16 23"
        fill="none"
        style={{ overflow: "visible", display: "block" }}
      >
        {/* classic arrow pointer, tip at (0,0) */}
        <path
          d="M0 0 L0 20.5 L5.4 15.4 L8.6 22.1 L11.7 20.6 L8.5 14.1 L15.5 14.1 Z"
          fill="var(--accent)"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
