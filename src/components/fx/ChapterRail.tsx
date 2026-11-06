"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { AnchorLink } from "@/components/fx/AnchorLink";
import { useActiveSection } from "@/lib/useActiveSection";
import { chapters } from "@/data/studio";

/**
 * Fixed chapter rail — a readable coordinate for every scroll position.
 */
export function ChapterRail() {
  const ids = chapters.map((chapter) => chapter.id);
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative flex flex-col items-end gap-4 pr-6">
        <span className="absolute right-0 top-0 h-full w-px bg-[var(--line)]" aria-hidden>
          <motion.span
            className="absolute inset-x-0 top-0 h-full origin-top bg-[linear-gradient(180deg,var(--red),var(--cyan))]"
            style={{ scaleY: progress }}
          />
        </span>

        {chapters.map((chapter) => {
          const isActive = active === chapter.id;
          return (
            <AnchorLink
              key={chapter.id}
              href={`#${chapter.id}`}
              className="pointer-events-auto group flex items-center gap-3"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`hud-sm transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted-dim)] group-hover:text-[var(--muted)]"
                }`}
              >
                {chapter.label}
              </span>
              <span
                className={`hud-sm transition-colors duration-300 ${
                  isActive ? "text-[var(--red)]" : "text-[var(--muted-dim)]"
                }`}
              >
                {chapter.n}
              </span>
            </AnchorLink>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterRail;
