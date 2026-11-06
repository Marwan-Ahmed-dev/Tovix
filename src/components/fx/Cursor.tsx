"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Dual-signal cursor: a hard dot plus a lagging ring that expands over
 * interactive elements. Desktop / fine-pointer only.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const fine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 34, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 320, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (reduce || !fine) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            "a, button, input, textarea, select, [data-cursor='active'], [role='button']",
          ),
        ),
      );
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, fine, x, y]);

  if (reduce || !fine) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <motion.span
        className="absolute rounded-full"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "#ff1a33",
          boxShadow: "0 0 12px rgba(255,26,51,0.9)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute rounded-full border"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "rgba(0,229,255,0.55)",
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  );
}

export default Cursor;
