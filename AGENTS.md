<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Tovix site conventions

Brand source of truth: `brand/UI-DESIGN-PROMPT.md` and `brand/README.md`.
The site follows the "Split Voltage" system — black void canvas, red `#FF1A33`
left signal / cyan `#00E5FF` right signal, Oxanium display + Rajdhani body.
Never warm-cream/editorial, never rounded pill clusters, glow stays on the
emblem and rare CTA edges.

- The site is a **single scrollable page** (`src/app/page.tsx`). There are no
  sub-routes. Navigation is in-page anchors; `src/data/studio.ts` holds the
  `nav` and the `chapters` list (id, number, label) that the header, the
  footer and the fixed chapter rail all read from.
- Anchor links go through `src/components/fx/AnchorLink.tsx`, which dispatches
  a `tovix:navigate` event; `src/components/fx/Curtain.tsx` seals the screen
  shut on the brand seam, scrolls to the chapter, then retracts.
- Games and Journal are **intentionally empty** until a real title/dispatch
  exists — do not add placeholder games, counts, or press quotes.
- `src/data/studio.ts` holds the shared copy; `src/components/fx/*` holds the
  motion primitives (`Reveal`, `SplitText`, `Magnetic`, `Tilt`, `Counter`,
  `Marquee`, `Cursor`, `Preloader`, `IgnitionMark`, `Atmosphere`, `Curtain`,
  `AnchorLink`, `ChapterRail`).
- The emblem must keep `mix-blend-mode: screen` on its **root** element — a
  stacking context in between (a transformed wrapper, for example) traps the
  backdrop and the PNG's black plate reappears as a visible square.
- Lock the scroll on `document.documentElement`, never `body`: hiding the
  body's overflow makes the body stop being the scroll container and the
  sticky header un-sticks with it.
- Motion must respect `prefers-reduced-motion`: the boot veil and the curtain
  rely on their animation to reveal the page, so they are hidden entirely
  under reduced motion.


