"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/**
 * Big vintage arrow pointer in the hyperlink blue, replacing the native cursor
 * (hidden via globals.css on fine-pointer devices). The tip sits at the pointer
 * position. Hidden when the pointer leaves the page (or the window loses focus)
 * so it doesn't freeze at the edge.
 *
 * Touch devices don't render it at all — the same media query that hides the
 * native cursor in globals.css — so phones skip the fixed element and the
 * mousemove listeners entirely rather than carrying an invisible one around.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine) return;

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
  }, [x, y, fine]);

  if (!fine) return null;

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
