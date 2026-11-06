export const studio = {
  name: "Tovix",
  nameLong: "Tovix Games",
  tagline:
    "Independent studio building sharp, high-energy games under a dual-signal mark.",
  bio: "Tovix is a game studio focused on bold interactive experiences with clean systems and strong visual identity. We ship player-first titles with precision craft — from first prototype to launch — keeping the brand’s red/cyan split as a reminder to balance intensity with clarity.",
  email: "hello@tovix.studio",
  location: "Remote / Worldwide",
} as const;

export const nav = [
  { href: "#studio", label: "Studio" },
  { href: "#games", label: "Games" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
] as const;

/**
 * The scroll chapters of the single-page site. The number is used by the
 * fixed chapter rail so every scroll position has a readable coordinate.
 */
export const chapters = [
  { id: "top", n: "01", label: "Signal" },
  { id: "studio", n: "02", label: "Studio" },
  { id: "principles", n: "03", label: "Tenets" },
  { id: "method", n: "04", label: "Method" },
  { id: "games", n: "05", label: "Games" },
  { id: "journal", n: "06", label: "Journal" },
  { id: "contact", n: "07", label: "Contact" },
] as const;

export const ticker = [
  "Split Voltage",
  "Player First",
  "Precision Craft",
  "Independent",
  "Build To Play",
  "Signal Over Noise",
] as const;

export const tenets = [
  {
    n: "01",
    kicker: "Precision craft",
    title: "Mechanical Integrity",
    quote: "“Gameplay first, spectacle second.”",
    body: "We do not manufacture excuses to announce calendars. A world is only committed if it holds up in play — tactile, systemic, and worth returning to.",
    skill: "Systems design",
    level: 92,
  },
  {
    n: "02",
    kicker: "Atelier model",
    title: "Sustainable Craft",
    quote: "“Independent ownership means staying accountable for the long haul.”",
    body: "We keep the crew small, the decisions close, and the schedule honest. No feature creep dressed up as a roadmap.",
    skill: "Production discipline",
    level: 86,
  },
  {
    n: "03",
    kicker: "Player pact",
    title: "Community Dialogue",
    quote: "“Respect, transparent development, evidence over marketing noise.”",
    body: "When we speak, it is because something is playable. Notes stay specific. Trust is earned in the build, not the trailer.",
    skill: "Live operations",
    level: 78,
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Question",
    body: "One stubborn question about the feeling a system should create when it is stripped bare.",
  },
  {
    n: "02",
    title: "Prototype",
    body: "A playable build, not a pitch deck. If it does not feel good in the hands, it does not survive.",
  },
  {
    n: "03",
    title: "Art direction",
    body: "A visual language that carries the mechanic. Bold identity, clean systems, nothing decorative.",
  },
  {
    n: "04",
    title: "Launch & listen",
    body: "Ship, then stay. Community feedback goes straight back into the build, permanently.",
  },
] as const;

/**
 * The catalog and the journal are intentionally empty until there is a real
 * title or dispatch to publish. Placeholders are not shipped.
 */
export const catalog = {
  count: 0,
  note: "The catalog opens with our first release. Nothing placeholder ships here.",
  standby: ["Unannounced", "In production", "Playtest", "Announced", "Live"],
} as const;

export const journal = {
  count: 0,
  note: "No dispatch has been published yet. Notes land when there is a build worth talking about.",
} as const;
