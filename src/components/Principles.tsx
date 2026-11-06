"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Eyebrow, SignalBar } from "@/components/fx/Hud";
import { Reveal } from "@/components/fx/Reveal";
import { tenets } from "@/data/studio";

function Meter({ level, delay }: { level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="h-px w-full overflow-hidden bg-[var(--line)]">
      <motion.div
        className="h-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--red) 0%, var(--red) 34%, var(--cyan) 66%, var(--cyan) 100%)",
        }}
        initial={reduce ? { scaleX: level / 100 } : { scaleX: 0 }}
        animate={inView ? { scaleX: level / 100 } : undefined}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Principles() {
  return (
    <section id="principles" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-10 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow tone="cyan">Chapter 03 — Operating constraints</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-md mt-4 max-w-2xl">Tenets of the atelier</h2>
          </Reveal>
        </div>
        <Reveal delay={0.16} direction="right">
          <p className="max-w-sm text-[var(--muted)]">
            Three commitments that decide what ships and what gets cut. They have never
            changed since the studio opened.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 border-t border-[var(--line)] md:mt-16">
        {tenets.map((item, index) => (
          <Reveal key={item.n} delay={index * 0.06}>
            <article className="group relative grid gap-6 border-b border-[var(--line)] py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-[linear-gradient(180deg,var(--red),var(--cyan))] transition-transform duration-500 group-hover:scale-y-100"
              />

              <p className="hud text-[var(--red)] md:col-span-1">{item.n}</p>

              <div className="md:col-span-4">
                <p className="hud-sm text-[var(--muted-dim)]">{item.kicker}</p>
                <h3 className="display-md mt-3 transition-transform duration-500 group-hover:translate-x-1">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] italic text-[var(--muted)]">{item.quote}</p>
              </div>

              <div className="md:col-span-7">
                <p className="leading-relaxed text-[var(--muted)]">{item.body}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="hud-sm w-32 shrink-0 text-[var(--muted-dim)]">
                    {item.skill}
                  </span>
                  <Meter level={item.level} delay={0.2 + index * 0.08} />
                  <span className="hud-sm w-10 shrink-0 text-right text-[var(--cyan)]">
                    {item.level}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12">
        <SignalBar />
      </Reveal>
    </section>
  );
}
