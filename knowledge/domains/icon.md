---
id: icon
kind: domain
applies: [icon, ui-web, ui-mobile]
status: core
source: "distilled: design, ui-styling"
updated: 2026-11-16
---

# Icon design

## Grid
- Draw on a 24px canvas; treat 16/32/48 as exports of the same source,
  not independent redraws.
- Live area is 20×20 with 2px padding — no glyph touches the canvas edge.
- Keyline shapes (circle, square, portrait and landscape rectangles,
  orthogonals) define silhouettes. Fit every glyph to a keyline so the
  set shares proportion.
- Pixel-fit at 16px: land strokes on whole or half pixels so edges stay
  crisp on 1x displays.

## Optical corrections
- Circles and diagonals overshoot their keyline by ~2–3% to match the
  optical weight of squares. A circle sized exactly to the square reads
  small.
- Center dots and holes optically, not mathematically — nudge until it
  looks centered at 100% zoom; trust the eye over the ruler.
- Example: a mathematically centered 6px dot in a rounded square usually
  needs a 0.25–0.5px nudge up and left.

## Set consistency
- One stroke width per visual layer: choose 1.5px or 2px at 24px and hold
  it across every glyph and every detail level.
- One corner-radius family across the set (e.g. outer 2px, inner 1px).
- Same metaphor density: a one-line glyph must not sit beside a fully
  rendered illustration.
- One perspective, forever — flat and isometric never mix in a set.

## Style selection
| Style | Use for |
|---|---|
| Outlined | UI default |
| Filled | Active/selected states, mobile nav bars |
| Duotone | Marketing surfaces |
| Rounded | Friendly consumer products |
| Sharp | Fintech, technical tools |

- Export 16/24/32/48. Simplify as size drops: remove interior details
  first, then thicken strokes relatively. A 16px glyph carries roughly a
  third of the 24px detail.

## Tests — run on every set
- Silhouette: fill each glyph solid black; still identifiable.
- 16px squint: view at 16px or blur your eyes; nothing turns to gray mush.
- Pair test: any two icons side by side are distinguishable at a glance.
- Metaphor frequency: magnifier=search, gear=settings, house=home,
  heart=like. Ship the conventional metaphor; invent only when none
  exists — then validate with real users before shipping.

## Semantics and accessibility
- Decorative icons: `aria-hidden="true"`.
- Meaningful icons need accessible names (`aria-label` or `<title>`).
- Icon-only buttons need labels — a bare glyph is an unlabeled control.
- One concept = one icon everywhere in the product. Trash never means
  both delete and archive.

## SVG craft
- Stroke and fill use `currentColor` so icons track text color and states.
- Same viewBox across the set (typically `0 0 24 24`).
- Clean paths: coordinates ≤2 decimals, no stray nodes, no transforms
  baked into path data.
- Name by concept (`search.svg`, `invoice.svg`), never by appearance
  (`magnifying-glass-tilted.svg`).

## AI-tells — reject on review
- Stroke weights drifting between glyphs of one set.
- Mixed corner radii — some glyphs rounded, some sharp.
- Perspective drift: one glyph quietly isometric among flat ones.
- Over-detailed glyphs that blur at 24px.
- Emoji pasted in as icon substitutes.

## Critique checklist
- [ ] Every glyph drawn on the 24px grid with 20px live area
- [ ] Every glyph fits a keyline shape
- [ ] Circles and diagonals overshoot ~2–3%
- [ ] Dots and holes optically centered
- [ ] Single stroke width per layer across the whole set
- [ ] One corner-radius family
- [ ] One perspective — no flat/isometric mixing
- [ ] 16/24/32/48 exports simplify progressively
- [ ] Silhouette test passes for every glyph
- [ ] 16px squint leaves nothing illegible
- [ ] Pair test passes for every adjacent pair
- [ ] Conventional metaphors used where they exist
- [ ] Decorative icons aria-hidden; meaningful ones labeled
- [ ] Icon-only buttons carry labels
- [ ] One concept maps to one icon product-wide
- [ ] currentColor used for stroke and fill
- [ ] Paths ≤2 decimals with a consistent viewBox
- [ ] Files named by concept, not appearance
