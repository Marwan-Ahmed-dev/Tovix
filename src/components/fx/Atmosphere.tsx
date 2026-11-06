"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type AtmosphereProps = {
  className?: string;
  intensity?: number;
};

/**
 * Full-bleed atmospheric background: drifting dual-signal glow, a perspective
 * floor grid, the brand seam beam, a scan sweep and film grain — all reacting
 * subtly to the pointer.
 */
export function Atmosphere({ className = "", intensity = 1 }: AtmosphereProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const blobX = useTransform(sx, (v) => v * 26 * intensity);
  const blobY = useTransform(sy, (v) => v * 18 * intensity);
  const gridX = useTransform(sx, (v) => v * 10 * intensity);
  const gridY = useTransform(sy, (v) => v * 6 * intensity);

  return (
    <div
      className={`atmos ${className}`}
      aria-hidden
      onPointerMove={
        reduce
          ? undefined
          : (event) => {
              const w = window.innerWidth || 1;
              const h = window.innerHeight || 1;
              mx.set((event.clientX / w - 0.5) * 2);
              my.set((event.clientY / h - 0.5) * 2);
            }
      }
    >
      <motion.div className="absolute inset-0" style={{ x: blobX, y: blobY }}>
        <div className="atmos-blob atmos-red" />
        <div className="atmos-blob atmos-cyan" />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ x: gridX, y: gridY }}>
        <div className="grid-floor" />
      </motion.div>

      <div className="beam" />
      <div className="scanline" />
      <div className="grain" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default Atmosphere;
