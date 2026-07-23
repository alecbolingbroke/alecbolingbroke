/**
 * AB monogram — a monoline mark where the A's right leg doubles as the B's
 * stem, so the two letters interlock. Inherits color via currentColor and
 * scales to any size (nav, favicon, footer).
 *
 * width/height are set as attributes so the mark still renders at a sane size
 * if the stylesheet ever fails to load — an SVG with neither would fall back to
 * the 300x150 replaced-element default and swallow the screen. Any `h-*`/`w-*`
 * class still wins, since CSS beats presentation attributes.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={36}
      height={36}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={11}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Alec Bolingbroke"
    >
      {/* A */}
      <path d="M18 88 L38 14 L58 88" />
      <path d="M27 57 L49 57" />
      {/* B — stem shared with the A's right leg */}
      <path d="M58 14 L58 88" />
      <path d="M58 14 C80 14 80 51 58 51" />
      <path d="M58 51 C84 51 84 88 58 88" />
    </svg>
  );
}
