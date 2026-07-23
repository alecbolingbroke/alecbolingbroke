"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * On load, the whole page is blurry for ~a second, then focuses. The filter is
 * removed imperatively once the intro finishes so it can't create a containing
 * block for the fixed nav or flatten the hero's 3D rotation afterward.
 */
export function LoadBlur({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(18px)", opacity: 0.75 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 1.1, ease: EASE_OUT }}
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.filter = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
