"use client";

import { motion, useReducedMotion, type MotionValue } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useIsBooted } from "@/lib/useBootReady";

type IgnitionMarkProps = {
  className?: string;
  delay?: number;
  priority?: boolean;
  /** Scrubbed transforms driven by the scroll position of the hero. */
  scale?: MotionValue<number>;
  y?: MotionValue<number>;
  opacity?: MotionValue<number>;
};

/**
 * The emblem ignition. The official mark is split on its centre seam and the
 * red and cyan halves are driven into each other, then a light streak rakes
 * across the seam.
 *
 * `mix-blend-mode: screen` lives on the root so the PNG's black plate
 * dissolves into the void and only the emblem lights up. It has to be on the
 * outermost element of the group — a stacking context in between (a
 * transformed wrapper, for example) traps the backdrop and the plate
 * reappears as a visible square.
 */
export function IgnitionMark({
  className = "",
  delay = 0,
  priority = true,
  scale,
  y,
  opacity,
}: IgnitionMarkProps) {
  const reduce = useReducedMotion();
  const booted = useIsBooted();
  const src = "/brand/tovix-mark-512.png";

  // On a first visit the emblem waits for the ignition veil to clear.
  const t0 = booted ? 0 : 1.75;
  const play = !reduce;

  const rootStyle: CSSProperties = { mixBlendMode: "screen" };

  const half = (side: "left" | "right") => (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={
          play ? { x: side === "left" ? -34 : 34, opacity: 0, filter: "blur(14px)" } : false
        }
        animate={play ? { x: 0, opacity: 1, filter: "blur(0px)" } : undefined}
        transition={{
          duration: 0.85,
          delay: t0 + delay + 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 140px, (max-width: 1024px) 170px, 210px"
          className="object-contain"
          priority={priority}
        />
      </motion.div>
    </div>
  );

  return (
    <motion.div
      className={`relative aspect-square w-full ${className}`}
      style={{ ...rootStyle, scale, y, opacity }}
      role="img"
      aria-label="Tovix emblem"
    >
      {/* bloom — glow belongs on the emblem only */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: "blur(26px)" }}
        initial={play ? { opacity: 0 } : false}
        animate={play ? { opacity: [0, 0.95, 0.55] } : undefined}
        transition={{
          duration: 1.6,
          delay: t0 + delay + 0.45,
          times: [0, 0.35, 1],
          ease: "easeOut",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 140px, (max-width: 1024px) 170px, 210px"
          className="object-contain"
          priority={priority}
        />
      </motion.div>

      {/* seam charge line */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--red) 45%, var(--cyan) 55%, transparent)",
          boxShadow: "0 0 18px rgba(255,26,51,0.7), 0 0 18px rgba(0,229,255,0.5)",
        }}
        initial={play ? { scaleX: 0, opacity: 0 } : false}
        animate={play ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] } : undefined}
        transition={{
          duration: 1.05,
          delay: t0 + delay + 0.2,
          times: [0, 0.45, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {half("left")}
      {half("right")}

      {/* light streak raking across the seam */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={play ? { opacity: 0 } : false}
        animate={play ? { opacity: [0, 1, 0] } : undefined}
        transition={{ duration: 0.7, delay: t0 + delay + 0.95, times: [0, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22) 45%, rgba(0,229,255,0.35) 55%, transparent)",
            mixBlendMode: "screen",
          }}
          initial={play ? { x: "-120%" } : false}
          animate={play ? { x: "420%" } : undefined}
          transition={{ duration: 0.7, delay: t0 + delay + 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export default IgnitionMark;
