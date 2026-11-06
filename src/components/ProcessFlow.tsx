"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { steps } from "@/data/studio";

export function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-12 md:mt-16">
      {/* seam that draws itself as you scroll */}
      <div
        aria-hidden
        className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--line)] md:block"
      >
        <motion.div
          className="h-full w-full origin-top bg-[linear-gradient(180deg,var(--red),var(--cyan))]"
          style={reduce ? { scaleY: 1 } : { scaleY }}
        />
        <motion.span
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--cyan)] shadow-[0_0_14px_rgba(0,229,255,0.9)]"
          style={reduce ? { top: "0%" } : { top: dotTop }}
        />
      </div>

      <ol className="space-y-10 md:space-y-14">
        {steps.map((step, index) => (
          <Reveal key={step.n} delay={index * 0.06} direction="left">
            <li className="group relative grid gap-4 md:grid-cols-12 md:gap-8 md:pl-16">
              <span className="absolute left-0 top-1.5 hidden h-10 w-10 place-items-center border border-[var(--line-hi)] bg-[var(--void)] font-display text-sm font-bold tracking-[0.1em] text-[var(--red)] md:grid">
                {step.n}
              </span>
              <div className="md:col-span-4">
                <h3 className="display-md transition-transform duration-500 group-hover:translate-x-1">
                  {step.title}
                </h3>
              </div>
              <p className="leading-relaxed text-[var(--muted)] md:col-span-7">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default ProcessFlow;
