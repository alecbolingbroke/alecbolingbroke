"use client";

import { useEffect, useState } from "react";

/**
 * Live clock chrome, à la Otherkind's "SEOUL 11:10:33 AM". Renders nothing
 * until mounted so the server/client markup never mismatches.
 */
export function Clock({
  label = "LOCAL",
  timeZone,
  className,
}: {
  label?: string;
  timeZone?: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className={className}>
      {label} <span className="tabular-nums">{time ?? "--:--:--"}</span>
    </span>
  );
}
