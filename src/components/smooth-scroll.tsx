"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

/**
 * App-wide smooth scrolling. Lenis drives the wheel/touch scroll so that
 * scroll-linked animations feel weighted instead of snapping.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  // Proof of life for the no-hydration fallback in layout.tsx — this is the
  // outermost client component, so if it mounts, the bundle arrived.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
