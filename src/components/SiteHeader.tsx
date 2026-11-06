"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnchorLink } from "@/components/fx/AnchorLink";
import { Magnetic } from "@/components/fx/Magnetic";
import { useActiveSection } from "@/lib/useActiveSection";
import { chapters, nav } from "@/data/studio";

function UtcClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="hud-sm hidden text-[var(--muted-dim)] xl:inline">
      UTC <span className="text-[var(--cyan)]">{time ?? "--:--:--"}</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const active = useActiveSection(chapters.map((chapter) => chapter.id));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    // Lock the scroll on <html>, not <body>: hiding the body's overflow makes
    // the body stop being the scroll container, which un-sticks the header.
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => active === href.slice(1);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[rgba(0,0,0,0.72)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:h-20 md:px-10">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Tovix home">
          <Image
            src="/brand/tovix-mark-512.png"
            alt=""
            width={34}
            height={34}
            priority
            className="h-[34px] w-[34px] shrink-0 object-contain mix-blend-screen transition-transform duration-500 group-hover:scale-110"
          />
          <span className="font-display text-[15px] font-bold tracking-[0.28em] text-[var(--ink)]">
            TOVIX
          </span>
          <span className="hidden font-display text-[11px] tracking-[0.24em] text-[var(--muted-dim)] lg:inline">
            / GAMES
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((link) => {
              const current = isActive(link.href);
              return (
                <AnchorLink
                  key={link.href}
                  href={link.href}
                  data-active={current}
                  className="nav-link relative px-4 py-2"
                >
                  {current && !reduce ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 border border-[var(--line-hi)] bg-white/[0.05]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                  {link.label}
                </AnchorLink>
              );
            })}
          </nav>

          <span className="hidden h-5 w-px bg-[var(--line)] md:block" aria-hidden />

          <UtcClock />

          <Magnetic className="hidden md:block" strength={0.22}>
            <AnchorLink href="#contact" className="btn btn-primary">
              <span>Contact</span>
            </AnchorLink>
          </Magnetic>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`menu-toggle ${open ? "is-open" : ""}`}>
              <span />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-[linear-gradient(90deg,var(--red),var(--cyan))]"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--line)] bg-[rgba(0,0,0,0.96)] backdrop-blur-xl md:max-h-[calc(100dvh-5rem)] lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {nav.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + index * 0.06, duration: 0.4 }}
              >
                <AnchorLink
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center justify-between border-t border-[var(--line)] px-5 font-display text-[clamp(1.6rem,7vw,2.2rem)] font-bold tracking-[0.06em] text-[var(--ink)]"
                >
                  <span className="uppercase">{link.label}</span>
                  <span className="hud-sm text-[var(--muted-dim)]">0{index + 1}</span>
                </AnchorLink>
              </motion.div>
            ))}
            <div className="border-t border-[var(--line)] px-5 py-6">
              <AnchorLink href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                <span>Start a conversation</span>
              </AnchorLink>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
