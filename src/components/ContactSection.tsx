"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { AnchorLink } from "@/components/fx/AnchorLink";
import { Eyebrow, SignalBar } from "@/components/fx/Hud";
import { Magnetic } from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { studio } from "@/data/studio";

/**
 * Chapter 07 — contact. The transmission band and the form live in the same
 * chapter so the whole site stays on a single scroll.
 */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: reduce ? 0 : glowY, scale: reduce ? 1 : glowScale }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,26,51,0.20), rgba(0,229,255,0.12) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-5 md:px-10 md:pt-32">
        <Reveal>
          <Eyebrow tone="red">Chapter 07 — Contact</Eyebrow>
        </Reveal>
        <SplitText as="h2" lines={["Open a channel."]} className="display mt-5" delay={0.05} />

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal direction="left">
              <p className="body-lg text-[var(--muted)]">
                Press, collaboration, and playtest access all route to the studio inbox.
                No forms behind logins, no ticket bots.
              </p>

              <a
                href={`mailto:${studio.email}`}
                className="group mt-8 flex items-center justify-between gap-4 border border-[var(--line)] bg-[var(--void)] p-5 transition-colors duration-300 hover:border-[var(--line-hi)]"
              >
                <span>
                  <span className="hud-sm block text-[var(--muted-dim)]">Direct email</span>
                  <span className="mt-1.5 block font-display text-lg font-semibold tracking-[0.04em] text-[var(--ink)]">
                    {studio.email}
                  </span>
                </span>
                <span className="text-[var(--red)] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="border border-[var(--line)] bg-[var(--void)] p-5">
                  <span className="hud-sm block text-[var(--muted-dim)]">Based</span>
                  <span className="mt-1.5 block font-display text-[15px] font-semibold tracking-[0.08em] text-[var(--ink)]">
                    {studio.location}
                  </span>
                </div>
                <div className="border border-[var(--line)] bg-[var(--void)] p-5">
                  <span className="hud-sm block text-[var(--muted-dim)]">Socials</span>
                  <span className="mt-1.5 block font-display text-[15px] font-semibold tracking-[0.08em] text-[var(--muted)]">
                    Not linked yet
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" className="md:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-5 md:px-10 md:pb-28">
        <Reveal>
          <div className="grid gap-3 py-8 md:grid-cols-12 md:items-center">
            <span className="hud text-[var(--muted-dim)] md:col-span-3">Careers</span>
            <p className="font-display text-xl font-semibold tracking-[0.02em] text-[var(--ink)] md:col-span-6">
              We are not hiring publicly yet.
            </p>
            <span className="hud-sm text-[var(--muted-dim)] md:col-span-3 md:text-right">
              Updates via journal
            </span>
          </div>
        </Reveal>
        <SignalBar />

        <div className="pt-16 text-center md:pt-20">
          <Reveal>
            <p className="hud text-[var(--muted-dim)]">End of transmission</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic strength={0.22} className="mt-6 inline-block">
              <AnchorLink href="#top" className="btn btn-ghost">
                <span>Return to signal</span>
                <span aria-hidden>↑</span>
              </AnchorLink>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
