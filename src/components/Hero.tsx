"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnchorLink } from "@/components/fx/AnchorLink";
import { Atmosphere } from "@/components/fx/Atmosphere";
import { HudCorners } from "@/components/fx/Hud";
import { IgnitionMark } from "@/components/fx/IgnitionMark";
import { Magnetic } from "@/components/fx/Magnetic";
import { SplitText } from "@/components/fx/SplitText";
import { useIsBooted } from "@/lib/useBootReady";
import { studio } from "@/data/studio";

export function Hero() {
  const booted = useIsBooted();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // On a first visit the whole composition waits for the ignition veil.
  const t0 = booted ? 0 : 1.75;

  // The emblem powers down as the chapter leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.9,
      delay: t0 + delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <Atmosphere />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-5 md:px-10 md:py-16">
        <div className="relative flex flex-col items-center text-center">
          <HudCorners className="-inset-x-4 -inset-y-6 sm:-inset-x-8 md:-inset-x-14 md:-inset-y-8" />

          <motion.div {...fade(0.05)} className="mb-5 flex items-center gap-3">
            <span className="chip">
              <span className="chip-dot" />
              Independent game studio
            </span>
            <span className="chip">
              <span className="chip-dot chip-dot-red" />
              {studio.location}
            </span>
          </motion.div>

          <div className="w-[140px] sm:w-[170px] md:w-[210px]">
            <IgnitionMark
              scale={reduce ? undefined : markScale}
              y={reduce ? undefined : markY}
              opacity={reduce ? undefined : markOpacity}
            />
          </div>

          <motion.div
            style={reduce ? undefined : { y: typeY, opacity: typeOpacity }}
            className="mt-4 md:mt-5"
          >
            <SplitText
              as="h1"
              words="chars"
              delay={t0 + 0.55}
              stagger={0.07}
              className="wordmark text-[clamp(2.6rem,8.4vw,6.4rem)] leading-[0.9]"
            >
              TOVIX
            </SplitText>
          </motion.div>

          <motion.p
            {...fade(1.0)}
            className="mt-5 max-w-xl text-balance text-[clamp(0.95rem,1.9vw,1.2rem)] font-medium leading-relaxed text-[var(--muted)] md:mt-6"
          >
            {studio.tagline}
          </motion.p>

          <motion.div
            {...fade(1.18)}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:mt-8"
          >
            <Magnetic strength={0.24}>
              <AnchorLink href="#games" className="btn btn-primary">
                <span>See Games</span>
                <span aria-hidden>→</span>
              </AnchorLink>
            </Magnetic>
            <Magnetic strength={0.2}>
              <AnchorLink href="#contact" className="btn btn-ghost">
                <span>Contact</span>
              </AnchorLink>
            </Magnetic>
          </motion.div>

          <motion.div
            {...fade(1.4)}
            className="mt-8 flex flex-col items-center gap-2.5 md:mt-10"
            aria-hidden
          >
            <span className="hud-sm text-[var(--muted-dim)]">Scroll to receive</span>
            <span className="relative block h-10 w-px overflow-hidden bg-[var(--line)]">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-[linear-gradient(180deg,transparent,var(--cyan))]"
                animate={reduce ? undefined : { y: ["-100%", "300%"] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
