"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * The navigation curtain. In-page anchor links dispatch a `tovix:navigate`
 * event; the void seals shut on the brand seam, the target chapter is
 * scrolled to, then the curtain retracts to reveal it.
 */
export function Curtain() {
  const reduce = useReducedMotion();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    function onNavigate(event: Event) {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      if (reduce) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      setClosed(true);
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        window.setTimeout(() => setClosed(false), 80);
      }, 430);
    }

    window.addEventListener("tovix:navigate", onNavigate);
    return () => window.removeEventListener("tovix:navigate", onNavigate);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] flex" aria-hidden>
      <motion.span
        className="h-full w-1/2 bg-[var(--void)]"
        style={{
          transformOrigin: "left center",
          boxShadow: "inset -1px 0 0 rgba(255,26,51,0.5)",
        }}
        animate={{ scaleX: closed ? 1 : 0 }}
        transition={{ duration: closed ? 0.42 : 0.62, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className="h-full w-1/2 bg-[var(--void)]"
        style={{
          transformOrigin: "right center",
          boxShadow: "inset 1px 0 0 rgba(0,229,255,0.5)",
        }}
        animate={{ scaleX: closed ? 1 : 0 }}
        transition={{ duration: closed ? 0.42 : 0.62, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}

export default Curtain;
