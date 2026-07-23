"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { SplitText } from "../reveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const rotateY = useMotionValue(0);
  const spinning = useRef(false);

  const spin = () => {
    if (spinning.current) return;
    spinning.current = true;
    animate(rotateY, rotateY.get() + 360, {
      duration: 0.9,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        spinning.current = false;
      },
    });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 sm:px-6"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* the name — one full horizontal spin on hover */}
        <div style={{ perspective: 1200 }} className="inline-block">
          <motion.div
            onMouseEnter={spin}
            style={{ rotateY, transformStyle: "preserve-3d" }}
            className="inline-block"
          >
            <SplitText
              as="h1"
              text="Alec Bolingbroke"
              delay={0.3}
              className="max-w-[14ch] font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.9] tracking-[-0.04em]"
            />
          </motion.div>
        </div>

        {/* one quiet line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 1 }}
          className="mt-6 text-base text-muted sm:text-lg"
        >
          I make AI systems that handle the busywork.
        </motion.p>
      </div>
    </section>
  );
}
