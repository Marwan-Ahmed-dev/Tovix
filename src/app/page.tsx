import { CatalogSection } from "@/components/CatalogSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { JournalSection } from "@/components/JournalSection";
import { Manifesto } from "@/components/Manifesto";
import { Principles } from "@/components/Principles";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Marquee } from "@/components/fx/Marquee";
import { Eyebrow } from "@/components/fx/Hud";
import { Reveal } from "@/components/fx/Reveal";
import { ticker } from "@/data/studio";

const interlude = [
  "No filler",
  "Playable or nothing",
  "Systems over spectacle",
  "Small crew",
  "Long haul",
  "Players first",
];

export default function HomePage() {
  return (
    <div>
      <Hero />

      <div className="border-y border-[var(--line)] bg-[var(--surface)] py-4">
        <Marquee items={[...ticker]} />
      </div>

      <Manifesto />

      <Principles />

      <div className="border-y border-[var(--line)] bg-[var(--surface)] py-4">
        <Marquee items={interlude} reverse />
      </div>

      <section id="method" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow tone="cyan">Chapter 04 — Method</Eyebrow>
          <h2 className="display-md mt-4 max-w-2xl">How a Tovix build happens</h2>
        </Reveal>
        <ProcessFlow />
      </section>

      <CatalogSection />
      <JournalSection />
      <ContactSection />
    </div>
  );
}
