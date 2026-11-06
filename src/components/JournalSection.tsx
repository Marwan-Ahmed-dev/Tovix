"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/fx/Counter";
import { Eyebrow, HudCorners, SignalBar } from "@/components/fx/Hud";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { journal } from "@/data/studio";

const slots = [
  { issue: "Issue 00", title: "Awaiting first dispatch", meta: "No date" },
  { issue: "Issue 01", title: "Reserved", meta: "No date" },
  { issue: "Issue 02", title: "Reserved", meta: "No date" },
  { issue: "Issue 03", title: "Reserved", meta: "No date" },
];

/**
 * Chapter 06 — the journal. Empty on purpose, staged as a filing system that
 * is waiting for its first entry.
 */
export function JournalSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scanX = useTransform(scrollYProgress, [0, 1], ["-30%", "130%"]);

  return (
    <section
      id="journal"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-[var(--line)] py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-y-0 w-1/4"
          style={{
            x: scanX,
            background:
              "linear-gradient(90deg, transparent, rgba(0,229,255,0.10), transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 50% at 70% 0%, rgba(0,229,255,0.07), transparent 65%)",
          }}
        />
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-10">
        <Reveal>
          <Eyebrow tone="cyan">Chapter 06 — Dispatches</Eyebrow>
        </Reveal>
        <SplitText as="h2" lines={["The Journal"]} className="display mt-5" delay={0.05} />

        <div className="mt-12 md:mt-16">
          <Reveal>
            <div className="relative isolate overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
              <HudCorners />

              <div className="relative px-6 py-12 md:px-12 md:py-16">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="chip">
                      <span className="chip-dot chip-dot-red" />
                      {journal.count} entries published
                    </span>
                    <p className="mt-6 flex items-baseline gap-2">
                      <Counter
                        to={journal.count}
                        className="font-display text-[clamp(3rem,8vw,5.5rem)] font-bold leading-none text-[var(--ink)]"
                      />
                      <span className="hud text-[var(--muted-dim)]">dispatches</span>
                    </p>
                  </div>
                  <p className="max-w-sm leading-relaxed text-[var(--muted)]">{journal.note}</p>
                </div>

                <div className="mt-12 border-t border-[var(--line)]">
                  {slots.map((slot, index) => (
                    <Reveal key={slot.issue} delay={index * 0.07}>
                      <div className="group grid gap-3 border-b border-[var(--line)] py-7 md:grid-cols-12 md:items-center">
                        <span className="hud-sm text-[var(--muted-dim)] md:col-span-2">
                          {slot.issue}
                        </span>
                        <span className="font-display text-lg font-semibold tracking-[0.04em] text-[var(--muted)] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--ink)] md:col-span-7">
                          {slot.title}
                        </span>
                        <span className="hud-sm text-[var(--muted-dim)] md:col-span-3 md:text-right">
                          {slot.meta}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <SignalBar />
        </Reveal>
      </div>
    </section>
  );
}

export default JournalSection;
