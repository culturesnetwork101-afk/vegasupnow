"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion settings. reducedMotion="user" makes every framer-motion
 * component honor the OS "reduce motion" setting (transforms are dropped,
 * opacity is kept), complementing the CSS reduced-motion guard in globals.css.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
