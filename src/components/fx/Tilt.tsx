"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useState, type ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/**
 * Pointer-tracked 3D tilt with an optional glare sweep.
 */
export function Tilt({ children, className = "", max = 8, glare = true }: TiltProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const sgx = useSpring(gx, { stiffness: 120, damping: 20 });
  const sgy = useSpring(gy, { stiffness: 120, damping: 20 });

  const glareBackground = useTransform(
    [sgx, sgy],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(0, 229, 255, 0.16), transparent 62%)`,
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * max * 2);
        rx.set((0.5 - py) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
      }}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: glareBackground,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.35 }}
        />
      ) : null}
    </motion.div>
  );
}

export default Tilt;
