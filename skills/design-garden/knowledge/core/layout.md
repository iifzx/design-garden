---
id: layout
kind: core
applies: [any]
status: core
source: "distilled: design-taste-frontend, hallmark, ui-ux-pro-max, design-system, huashu-design"
updated: 2026-11-16
---

# Layout — grids, rhythm, screens, and surfaces

## Grid & container

- One content wrap per page: `min(100% − 2×gutter, 1280px)`. At 1920+, gutters grow — columns never widen. Capped centered container is a floor, not a suggestion.
- 12 columns, 24px gutter as the default grammar; 2 text alignments only (left-aligned line + split line at column 6/7). Splits always text-left / visual-right — mirrored alternation reads as template.
- Image grids use `minmax(0,1fr)` tracks (never raw fr that lets media overflow).
- `overflow-x: clip` on html/body; `100vw` is banned (scrollbar drift).
- Equal left/right edges everywhere. One section that breaks the edge system breaks the page.

## Spacing rhythm

- Scale: 2 / 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96 / 144 (4/8pt base). Vertical rhythm tiers: 16 / 24 / 32 / 48.
- **Section gaps vary**: 120 / 144 / 176 mixed at 1440. The same gap at every seam is the single most reliable "machine-made" signal.
- Grouping by proximity: intra-group spacing < inter-group spacing, always, visibly. If you need a border to explain grouping, fix spacing first.
- Density dial: spacious 24–96px rhythm for marketing/content; dense 8–32px for dashboards and tools — pick per product, not per page.

## The screen as a unit (web & slides)

- One section per screen: at 1440×900 a screen holds ~708px of content — content <360px tall merges into a neighbor; 495–708px stands alone; 708–1320px splits; >1600px splits into 2+ sections.
- Top-aligned h2; never vertical centering of section content. Fill ≥0.55 — no half-empty sections; dead band >160px before the fold is a fail.
- Hero discipline: hero + one sentence + primary action visible without scrolling at 1280×800. ~80 words per screen on marketing pages.
- Anatomy first: before layout, answer the page's job (subscribe / buy / visit / attend / hire / learn) — where the action lives, what the category's own sections are (menu, lineup, pricing, docs), and how the page ends (the ending is a design decision, not always an email band).
- Adjacent sections never share the same layout form. A complete landing page uses 5–6 distinct section forms (product UI, demo, data-as-image, before/after, timeline, spec list, quote, action ending).
- The "deviate twice" rule for card decks: in any set of similar cards (features, pricing), drop one base card and promote/reorder one — full uniformity is the template tell.

## Surface ladder & seams

- Weakest to strongest: whitespace → hairline → tinted well → card. Different seams climb different rungs; border AND shadow on one element is a fail.
- A seam needs only ONE device. If whitespace already separates, don't add a hairline.
- Centered blocks never wider than half the wrap — full-width centered text has no anchor.
- Z-index ladder (fixed conventions): dropdown 1000 / sticky 1100 / overlay 1200 / modal 1300 / tooltip 1400 — never ad-hoc z-index escalation.

## Responsive

- Mobile-first layering: base styles for 375, min-width media queries upward. Verify 1440 AND 375 — landscape orientation too for apps.
- Reflow plan before breakpoints: what stacks, what hides, what moves. A design that only shrinks is not responsive.
- Touch targets ≥44px at every breakpoint; hover-only affordances fail on touch by definition.
- Type: clamp() for fluid display sizes (`clamp(32px, 6vw, 80px)`); body size fixed, not fluid.

## Practical composition patterns

- The rule of thirds is a starting grid, not a law — asymmetric placement with one dominant mass usually beats centered symmetry for energy.
- Photo-led and type-led alternate: never two photo-led sections in a row; photos ≤⅓ of page area below the hero on editorial pages.
- "Big or not at all": imagery either earns 6+ columns / 440px+ height, or it's a thumbnail — mid-size imagery is the weakest use.
- Charts and data areas reserve annotation space at layout time (annotations added after layout always collide).
- Consistency numbers worth memorizing: 4/8pt spacing base · 12col/24px gutter · 708px screen window @1440×900 · 44px targets · 120/144/176 section gaps · 16px web body · 24px deck body.
