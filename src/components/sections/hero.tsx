"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";

export function Hero() {
  const rotateY = useMotionValue(0);
  const loop = useRef<ReturnType<typeof animate> | null>(null);

  const start = () => {
    loop.current?.stop();
    loop.current = animate(rotateY, rotateY.get() + 360, {
      duration: 14, // slow — one revolution every 14s
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  const stop = () => {
    loop.current?.stop();
    // keep turning at the SAME speed to the nearest flat orientation, no quick swing
    const current = rotateY.get();
    const target = Math.round(current / 360) * 360;
    const distance = Math.abs(target - current);
    animate(rotateY, target, {
      duration: (distance / 360) * 14,
      ease: "linear",
    });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 sm:px-6"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* the name — slow continuous horizontal rotation while hovered */}
        <div style={{ perspective: 1200 }} className="inline-block">
          <motion.div
            onMouseEnter={start}
            onMouseLeave={stop}
            style={{ rotateY, transformStyle: "preserve-3d" }}
            className="inline-block"
          >
            <h1 className="max-w-[14ch] font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              Alec Bolingbroke
            </h1>
          </motion.div>
        </div>

        {/* one quiet line */}
        <p className="mt-8 text-base text-muted sm:text-lg">
          I make AI systems that handle the busywork.
        </p>
      </div>
    </section>
  );
}
