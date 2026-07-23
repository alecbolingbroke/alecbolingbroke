import type { ReactNode } from "react";

/**
 * On load, the whole page is blurry for ~a second, then focuses.
 *
 * This is a plain CSS animation (`.load-focus` in globals.css), not a Motion
 * one, and deliberately so: the blur used to be an inline style rendered by the
 * server that only JavaScript could clear, so any deploy where the client
 * chunks failed to load left the entire site permanently out of focus. CSS
 * can't get stuck that way — and it costs the mobile GPU far less.
 *
 * The animation uses `fill-mode: backwards`, so once it ends the element falls
 * back to having no filter at all. That matters: a lingering filter would make
 * this a containing block for the fixed nav and would flatten the hero's 3D
 * rotation.
 */
export function LoadBlur({ children }: { children: ReactNode }) {
  return <div className="load-focus">{children}</div>;
}
