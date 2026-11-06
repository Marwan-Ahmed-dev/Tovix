"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: Direction;
  blur?: boolean;
  once?: boolean;
  amount?: number;
};

/**
 * Scroll-triggered entrance. Uses Motion's whileInView so it works on every
 * browser (the old CSS `animation-timeline: view()` trick silently no-ops
 * on Safari/Firefox).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 26,
  direction = "up",
  blur = true,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();

  const offset =
    direction === "left"
      ? { x: -distance, y: 0 }
      : direction === "right"
        ? { x: distance, y: 0 }
        : direction === "none"
          ? { x: 0, y: 0 }
          : { x: 0, y: distance };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
