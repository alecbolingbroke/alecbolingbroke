/**
 * AB monogram — a monoline mark where the A's right leg doubles as the B's
 * stem, so the two letters interlock. Inherits color via currentColor and
 * scales to any size (nav, favicon, footer).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
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
