"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { SplitText } from "../reveal";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  // 3D tilt driven by the pointer, springed so it feels weighted.
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(mvX, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useSpring(mvY, { stiffness: 150, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const max = 26; // degrees
    mvY.set(px * 2 * max); // left/right → rotateY
    mvX.set(-py * 2 * max); // up/down → rotateX
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 sm:px-6"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* the name — tilts in 3D on hover */}
        <div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1000 }}
          className="inline-block"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
