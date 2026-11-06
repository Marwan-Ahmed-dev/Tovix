"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Eyebrow } from "@/components/fx/Hud";

const STATEMENT =
  "Tovix exists to take the opposite course — specialized systems, a visual language that means something, and respect for the intelligence and time of the person holding the controller.";

function Ignite({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: string;
}) {  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const color = useTransform(progress, [start, end], ["#4a2b30", "#f4f6f8"]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span style={{ opacity, color, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Chapter 02 — the studio statement. The words ignite one by one as the
 * section scrubs through the viewport.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = STATEMENT.split(" ");
  const total = words.length;

  return (
    <section
      id="studio"
      ref={ref}
      className="relative h-[260vh]"
      aria-labelledby="manifesto-heading"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 50%, rgba(255,26,51,0.08), transparent 65%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <Eyebrow tone="red">Studio</Eyebrow>
              <p className="hud mt-6 text-[var(--muted-dim)]">Chapter 02 / 07</p>
              <div className="mt-6 h-px w-24 bg-[linear-gradient(90deg,var(--red),transparent)]" />
            </div>

            <div className="md:col-span-9">
              <h2
                id="manifesto-heading"
                className="display-md max-w-4xl text-[clamp(1.7rem,3.6vw,3rem)]"
              >
                {words.map((word, index) => (
                  <Ignite
                    key={`${word}-${index}`}
                    progress={scrollYProgress}
                    start={Math.max(0, index / total - 0.06)}
                    end={(index + 1) / total}
                  >
                    {`${word}${index < total - 1 ? " " : ""}`}
                  </Ignite>
                ))}
              </h2>

              <div className="mt-10 flex flex-col gap-4 border-t border-[var(--line)] pt-6 md:flex-row md:items-center md:justify-between">
                <p className="max-w-md leading-relaxed text-[var(--muted)]">
                  Every project starts from a single, stubborn question — what feeling
                  does the system create when stripped bare? We answer that in playable
                  builds before we decorate it.
                </p>
                <span className="hud-sm text-[var(--muted-dim)]">Scroll to continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Manifesto;
