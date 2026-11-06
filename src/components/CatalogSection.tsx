"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/fx/Counter";
import { Eyebrow, HudCorners, SignalBar } from "@/components/fx/Hud";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { catalog } from "@/data/studio";

/**
 * Chapter 05 — the catalog. It stays empty on purpose; the radar keeps
 * sweeping and rotates with the scroll so the void still feels alive.
 */
export function CatalogSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sweep = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9]);
  const glow = useTransform(scrollYProgress, [0, 1], ["rgba(0,229,255,0.10)", "rgba(255,26,51,0.12)"]);

  return (
    <section
      id="games"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-[var(--line)] py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 40%, rgba(0,229,255,0.05), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-10">
        <Reveal>
          <Eyebrow tone="red">Chapter 05 — Catalog</Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          lines={["Projects & Releases"]}
          className="display mt-5"
          delay={0.05}
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <Reveal direction="left" className="md:col-span-5">
            <p className="body-lg text-[var(--muted)]">
              Every Tovix title lives here the moment it has something real to show — a
              playable build, a date, a community.
            </p>
            <p className="mt-6 leading-relaxed text-[var(--muted)]">{catalog.note}</p>

            <div className="mt-10">
              <p className="hud-sm text-[var(--muted-dim)]">Pipeline</p>
              <div className="mt-4 space-y-2">
                {catalog.standby.map((stage, index) => (
                  <Reveal key={stage} delay={index * 0.07}>
                    <div className="group flex items-center gap-4">
                      <span className="hud-sm w-6 text-[var(--muted-dim)]">
                        0{index + 1}
                      </span>
                      <span className="shimmer-line h-px flex-1" />
                      <span className="hud-sm text-[var(--muted-dim)] transition-colors duration-500 group-hover:text-[var(--muted)]">
                        {stage}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="md:col-span-7">
            <div className="relative isolate overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
              <div aria-hidden className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
                  style={{ rotate: sweep, scale }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(0,229,255,0.20) 0deg, transparent 46deg, transparent 360deg)",
                    }}
                  />
                </motion.div>

                {[12, 28, 44].map((inset) => (
                  <span key={inset} className="radar-ring" style={{ inset: `${inset}%` }} />
                ))}

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(244,246,248,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,246,248,0.05) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage:
                      "radial-gradient(closest-side at 50% 50%, #000 25%, transparent 88%)",
                    WebkitMaskImage:
                      "radial-gradient(closest-side at 50% 50%, #000 25%, transparent 88%)",
                  }}
                />

                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(60% 60% at 50% 50%, ${glow}, transparent 70%)`,
                  }}
                />
                <div className="grain" />
              </div>

              <HudCorners />

              <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span className="chip">
                  <span className="chip-dot" />
                  Scanning for releases
                </span>

                <p className="mt-8 flex items-baseline gap-2">
                  <Counter
                    to={catalog.count}
                    className="font-display text-[clamp(3.6rem,11vw,7rem)] font-bold leading-none text-[var(--ink)]"
                  />
                  <span className="hud text-[var(--muted-dim)]">titles</span>
                </p>

                <h3 className="display-md mt-6 max-w-lg text-[var(--ink)]">
                  Nothing on the shelf yet
                </h3>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-12">
          <SignalBar />
        </Reveal>
      </div>
    </section>
  );
}

export default CatalogSection;
