import { AnchorLink } from "@/components/fx/AnchorLink";
import { BackToTop } from "@/components/fx/BackToTop";
import { Eyebrow, SignalBar } from "@/components/fx/Hud";
import { Reveal } from "@/components/fx/Reveal";
import { chapters, studio } from "@/data/studio";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 0%, rgba(255,26,51,0.09), transparent 60%), radial-gradient(60% 90% at 90% 100%, rgba(0,229,255,0.07), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-10">
        <div className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <Reveal className="md:col-span-5" direction="left">
            <Eyebrow tone="red">Studio</Eyebrow>
            <p className="body-lg mt-5 max-w-md text-[var(--muted)]">{studio.bio}</p>
            <a
              href={`mailto:${studio.email}`}
              className="text-link mt-6 inline-block font-display text-xl font-semibold tracking-[0.06em] text-[var(--ink)]"
            >
              {studio.email}
            </a>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.08} direction="right">
            <Eyebrow tone="cyan">Chapters</Eyebrow>
            <ul className="mt-5 space-y-3">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <AnchorLink
                    href={`#${chapter.id}`}
                    className="group inline-flex items-center gap-2.5 font-display text-[15px] font-medium tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    <span className="hud-sm w-6 text-[var(--muted-dim)]">{chapter.n}</span>
                    <span className="h-px w-0 bg-[var(--red)] transition-all duration-300 group-hover:w-6" />
                    {chapter.label.toUpperCase()}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.16} direction="right">
            <Eyebrow tone="muted">Signal</Eyebrow>
            <div className="panel mt-5 p-6">
              <p className="hud-sm text-[var(--muted-dim)]">Transmission</p>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Press, collabs, and playtest access all route through the studio inbox.
                Expect a reply from a human, not a ticket bot.
              </p>
              <AnchorLink href="#contact" className="btn btn-ghost mt-6 w-full">
                <span>Open channel</span>
              </AnchorLink>
            </div>
          </Reveal>
        </div>

        <SignalBar />

        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud-sm text-[var(--muted-dim)]">
            © {year} {studio.nameLong} — Built in the void
          </p>
          <BackToTop />
        </div>
      </div>

      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="translate-y-[14%] text-center font-display text-[clamp(4rem,19vw,16rem)] font-bold leading-none tracking-[0.08em] text-[rgba(244,246,248,0.07)]">
          TOVIX
        </p>
      </div>
    </footer>
  );
}
