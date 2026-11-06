# Tovix — UI Design Prompt

Copy everything below the line into another AI (design / frontend / v0 / Claude / etc.). Attach the official logo image: `brand/logo/tovix-mark-rgb-black.png`.

---

## Role

You are a senior product designer + frontend engineer who has shipped premium game-studio and entertainment marketing sites (quality bar: Riot / Infinity Ward / Remedy / indie studios like Supergiant — not generic SaaS landing pages). Design and implement a **production-quality website UI** for Tovix. Do not produce a bland “AI template.” Commit to one bold visual system and execute it with craft.

## Project

**Tovix** is a new online game development studio. This site is our public identity: show who we are, showcase our games, and let people contact us.

**Stack preference (if coding):** Next.js (App Router) + TypeScript + Tailwind + Motion (Framer Motion). Mobile-first, accessible, `prefers-reduced-motion` respected.

## Official logo (must drive the brand)

Attached: geometric split **T** mark on pure black.

- Left half: neon **red** with soft glow  
- Right half: neon **cyan / electric blue** with soft glow  
- Thin black vertical gap down the center — never remove or fill this gap  
- Sharp, symmetrical, tech / competitive-gaming emblem  

**Brand rule:** Glow belongs on the logo (and rare CTA accents). Do **not** cover the whole site in neon bloom, purple cyberpunk fog, or particle spam.

## Brand tokens

```
Background:  #000000
Surface:     #0A0A0C
Text:        #F4F6F8
Accent red:  #FF1A33   (primary CTA, left energy)
Accent blue: #00E5FF   (links, Live status, right energy)
Muted:       #8A9099
Border:      #1A1A1F
```

**Fonts:** Distinctive display + refined body. Prefer **Oxanium** (display / wordmark) + **Rajdhani** (UI body). Do **not** use Inter, Roboto, Arial, system UI, or Space Grotesk.

**Voice / bios**

- 1-line: Independent studio building sharp, high-energy games under a dual-signal mark.
- Longer: Tovix is a game studio focused on bold interactive experiences with clean systems and strong visual identity. We ship player-first titles with precision craft—from first prototype to launch—keeping the brand’s red/cyan split as a reminder to balance intensity with clarity.

## Site map (only these pages)

1. **Home** — brand-first hero  
2. **Games** — showcase list / gallery of titles  
3. **About** — studio story  
4. **Contact** — email + short contact form (mailto or simple form) + Discord / X / YouTube links  

**Out of scope:** Team page, Join/careers page, press kit page, blog, store, user accounts, CMS admin, worker application forms.

## Design requirements (non-negotiable)

### Hero (Home, first viewport)

- One composition, not a dashboard.  
- **Brand is the hero:** large official mark + **TOVIX** wordmark must dominate. No smaller-than-nav branding.  
- One short supporting line + one primary CTA group (e.g. See Games / Contact).  
- Full-bleed atmospheric background (edge-to-edge). No inset hero card, no floating badge stickers, no stat strips, no “this week” widgets in the first viewport.  
- No cards in the hero.

### Visual quality bar

- Feels like a **real game studio** site: cinematic, intentional, expensive — not a Bootstrap theme, not a purple SaaS template, not a cream editorial magazine layout.  
- Use depth: layered atmospheres, glass sparingly, sharp typography, split red|cyan motifs inspired by the logo gap.  
- Motion that creates presence: mark ignition, wordmark settle, scroll reveals, hover states, magnetic or spring CTAs, frosted nav on scroll. Aim for 4–8 intentional motion moments — not endless micro-animation noise.  
- Games presentation should feel premium (large titles, media-ready rows or editorial bands). Placeholder games OK if clearly labeled.  
- Contact should feel polished (glass/surface panel, cyan focus rings, red primary submit).  

### Hard anti-patterns (do not ship)

- Purple / indigo gradient SaaS look  
- Warm cream backgrounds + terracotta + generic serif  
- Broadsheet / newspaper dense columns  
- Rounded-full pill button clusters, emoji, multi-layer soft shadows everywhere  
- Glow on every element  
- Generic card grids for everything  
- Centered “Hero + 3 feature cards + logos strip + FAQ” SaaS skeleton  

## Placeholder content

Games (editable later):

1. **Signal Rift** — Competitive arena shooter where every round flips the map’s voltage. Status: In progress. PC.  
2. **Voidline** — Precision platformer through neon corridors and split-path puzzles. Status: Prototype. PC / Console.  
3. **Tovix Labs** — Experimental drops and playtests. Status: Live. Online.

Contact email: `hello@tovix.studio`  
Socials: Discord, X, YouTube (placeholder URLs OK).

## Deliverable

1. Complete UI for all four pages, responsive (desktop + mobile).  
2. Reuse the attached logo as favicon / hero mark.  
3. Cohesive design system (tokens, type, button styles, section rhythm).  
4. If coding: clean component structure, production build must pass.  
5. If designing only: high-fidelity frames for Home (desktop + mobile) plus Games / About / Contact key screens, with interaction notes for motion.

## Success criteria

Someone who removes the nav should still instantly recognize this as **Tovix** from the first viewport. It should look like a studio that ships games — sharp, dual-signal, black void, red/cyan energy — not like “another AI website.”
