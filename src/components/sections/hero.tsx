"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";

const DWELL = 350; // ms the pointer must rest on the name before it spins

export function Hero() {
  const rotateY = useMotionValue(0);
  const loop = useRef<ReturnType<typeof animate> | null>(null);
  const spinning = useRef(false);
  const isOver = useRef(false);
  const timer = useRef<number | null>(null);

  const start = () => {
    loop.current?.stop();
    spinning.current = true;
    loop.current = animate(rotateY, rotateY.get() + 360, {
      duration: 14, // slow — one revolution every 14s
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  const stop = () => {
    loop.current?.stop();
    spinning.current = false;
    // keep turning at the SAME speed to the nearest flat orientation, no quick swing
    const current = rotateY.get();
    const target = Math.round(current / 360) * 360;
    const distance = Math.abs(target - current);
    animate(rotateY, target, {
      duration: (distance / 360) * 14,
      ease: "linear",
    });
  };

  const clearTimer = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // (re)arm the dwell timer — only spins if the pointer is still resting on the
  // name when it fires
  const arm = () => {
    clearTimer();
    timer.current = window.setTimeout(() => {
      if (isOver.current) start();
    }, DWELL);
  };

  const onEnter = () => {
    isOver.current = true;
    arm();
  };

  const onLeave = () => {
    isOver.current = false;
    clearTimer();
    stop();
  };

  // Scrolling with the cursor over the name must NOT start the spin: every
  // scroll re-arms the dwell, so it only fires after the page has been still.
  useEffect(() => {
    const onScroll = () => {
      if (isOver.current && !spinning.current) arm();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      clearTimer();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 sm:px-6"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* the name — slow continuous horizontal rotation after a hover pause */}
        <div style={{ perspective: 1200 }} className="inline-block">
          <motion.div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
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
