"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/**
 * Big vintage arrow pointer in the hyperlink blue, replacing the native cursor
 * (hidden via globals.css on fine-pointer devices). The tip sits at the pointer
 * position. Hidden when the pointer leaves the page (or the window loses focus)
 * so it doesn't freeze at the edge. On touch devices there's no mousemove, so
 * it simply stays hidden.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15, ease: "linear" }}
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
