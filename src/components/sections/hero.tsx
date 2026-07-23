"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";

const REVOLUTION_MS = 14_000; // one full turn — slow
const DWELL_MS = 350; // pointer must rest on the name this long before it spins

export function Hero() {
  const rotateY = useMotionValue(0);
  const nameRef = useRef<HTMLDivElement>(null);

  // All the hover-intent logic lives in one effect so it stays self-contained.
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let over = false;
    let spinning = false;
    let timer: number | undefined;
    let loop: ReturnType<typeof animate> | undefined;

    const start = () => {
      loop?.stop();
      spinning = true;
      loop = animate(rotateY, rotateY.get() + 360, {
        duration: REVOLUTION_MS / 1000,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
    };

    // Wind down at the same speed to the nearest flat orientation — no swing-back.
    const stop = () => {
      loop?.stop();
      spinning = false;
      const current = rotateY.get();
      const target = Math.round(current / 360) * 360;
      animate(rotateY, target, {
        duration: (Math.abs(target - current) / 360) * (REVOLUTION_MS / 1000),
        ease: "linear",
      });
    };

    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => over && start(), DWELL_MS);
    };

    const onEnter = () => {
      over = true;
      arm();
    };
    const onLeave = () => {
      over = false;
      window.clearTimeout(timer);
      stop();
    };
    // Scrolling re-arms the dwell, so passing under a still cursor won't trigger it.
    const onScroll = () => {
      if (over && !spinning) arm();
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
    };
  }, [rotateY]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 sm:px-6"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div style={{ perspective: 1200 }} className="inline-block">
          <motion.div
            ref={nameRef}
            style={{ rotateY, transformStyle: "preserve-3d" }}
            className="inline-block"
          >
            <h1 className="max-w-[14ch] font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              Alec Bolingbroke
            </h1>
          </motion.div>
        </div>

        <p className="mt-8 text-base text-muted sm:text-lg">
          I make AI systems that handle the busywork.
        </p>
      </div>
    </section>
  );
}
