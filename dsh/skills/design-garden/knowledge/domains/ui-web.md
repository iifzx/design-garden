---
id: ui-web
kind: domain
applies: [ui-web]
status: core
source: "distilled: design-taste-frontend, emil-design-eng, apple-design, ui-ux-pro-max, design-system, frontend-design"
updated: 2026-11-16
---

# Web & app UI craft

## Accessibility floors
- Body text ≥16px; inputs at 16px+ on mobile or iOS force-zooms on focus.
- Contrast ≥4.5:1 for body text, ≥3:1 for large text and UI parts (icons, borders, rings).
- Focus indicator appears instantly on `:focus-visible`: 2px ring, 2px offset, never removed.
- Touch targets ≥44×44px no matter how small the glyph looks.
- Disabled controls: opacity 0.5 plus `aria-disabled="true"`.

## Tokens only
- Every color, font, and spacing value flows through CSS custom properties; raw hex inside component CSS is a defect.
- Layer tokens primitive → semantic → component; dark mode then becomes a one-line override of the semantic layer.
- Name tokens `--{category}-{item}-{variant}-{state}`, e.g. `--color-surface-raised-hover`.

## State priority
- Highest wins: disabled > loading > active > focus > hover > default.
- In an error state the focus ring takes the error color, not the brand color.

## Spacing
- Scale: 2 / 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96 / 144 on a 4/8pt base.
- Vertical rhythm tiers inside sections: 16 / 24 / 32 / 48.
- Vary section gaps at 1440 across 120 / 144 / 176 — the same gap at every seam looks machine-made.

## Type
- Scale 1.25 from 16px at 1440: hero 84 / section 52 / title 25 / lead 21 / body 16 / label 14.
- Section headings under 40px at 1440 are the most common "unfinished page" tell.
- Max 3 weights, picked at the extremes (300 + 800 style), not clustered mid-scale.
- Measure 45–75ch. Track display sizes −0.02 to −0.04em.

## Surfaces
- Escalate separation rung by rung: whitespace → hairline → tinted well → card.
- Never border AND shadow on the same card; climb different rungs at different seams so hierarchy stays legible.
- On dark, elevation is lightness: +3% per level, shadows off.

## Dark mode
- Re-derive every token for parity — inversion is not translation.
- Paper anchors at L 12–18, tinted toward the brand hue rather than neutral gray.
- Accent: chroma −0.02–0.04, lightness +5–10%, hue never moves.
- Body weight drops ~50; cards sit lighter than the canvas; never CSS-invert images.
- Measure scrims against the real background behind them.

## Layout
- One capped centered container: at 1920 the gutters grow, the columns do not.
- Image-grid tracks: `minmax(0, 1fr)`. Put `overflow-x: clip` on html and body; never size anything to `100vw`.
- 12 columns, 24px gutter, one content wrap.
- At 1280×800 the hero, one sentence, and the primary action fit without scrolling; ~80 words per screen.

## One section per screen
- At 1440×900 a screen holds ~708px of content.
- Height map: <360px merge into a neighbor; 495–708px exactly one screen; 708–1320px split; >1608px split into 2+.
- Top-align headings; vertical centering is a tell.
- Fill ≥0.55 of the screen — no half-empty sections.
- Two text alignments only: left, and split at column 6/7 with text left, visual right.

## Motion
- Animate only transform and opacity. Never `transition: all`; never animate width/height/top/left.
- Durations: press 100–160ms, tooltips 125–200ms, dropdowns 150–250ms, modals 200–500ms; all UI <300ms.
- Enter/exit ease-out — `cubic-bezier(0.23, 1, 0.32, 1)`; on-screen moves ease-in-out; ease-in never touches UI.
- Exits run 60–75% of their enter duration; stagger children 30–80ms.
- `:active` → `scale(0.97)`. Entries start at scale 0.9–0.95 + opacity, never from `scale(0)`.
- Popovers scale from their trigger via `transform-origin`; modals stay centered.
- Springs: damping 1.0 default; bounce (~0.8) only when a gesture carried momentum.
- Transitions stay interruptible — never lock input mid-animation.
- One orchestrated load moment beats fade-up on every section.
- Honor `prefers-reduced-motion` and `prefers-reduced-transparency`; content renders without JS.

## Audit ladder — check in order
1. Accessibility → 2. Touch → 3. Performance → 4. Style selection → 5. Layout → 6. Typography & color → 7. Animation → 8. Forms → 9. Navigation → 10. Charts
- P1 focus rings exist; P2 44px targets and no hover-only affordance; P6 no gray-on-gray, no raw hex; P7 never one duration for everything.

## Forms
- After a failed submit, move focus to the error summary.
- Paste is never blocked; labels persist — placeholder-only labeling fails.

## Copy
- Buttons read verb + object: "Save changes", not "Submit".
- One action, one wording everywhere it appears; show it at most twice per screen.
- Errors name the fix; never apologize, never blame.
- Empty states invite the next action; use the user's words ("notifications", not "webhook config").

## Charts
- Never encode meaning in color alone — see data-viz.md.

## Process
- Two-pass: plan tokens (4–6 named hex values), typefaces + roles, and an ASCII wireframe first. Self-review — "would I produce this for any similar prompt?" — revise, then code.
- Verify at 1440 and 375 widths; test landscape, reduced motion, and Dynamic Type.

## Imagery
- Priority: user's images → real product screenshots captured in-build → product rebuilt in a data slot → CC-licensed photos (credited) → generated stills (on request only) → type at full scale.
- Deletion test: if removing a picture loses no fact, it was decoration — cut it.

## Critique checklist
- [ ] Body ≥16px at 4.5:1 contrast; large text and UI parts at 3:1
- [ ] Focus ring is 2px + 2px offset on `:focus-visible` and was never removed
- [ ] Touch targets ≥44px; nothing requires hover
- [ ] Disabled controls use opacity 0.5 + `aria-disabled`
- [ ] All colors/fonts/spacing route through tokens; zero raw hex in components
- [ ] Semantic token layer makes dark mode a one-line override
- [ ] States stack by priority (disabled > loading > active > focus > hover); error state recolors the ring
- [ ] Section gaps vary at 1440 (120/144/176), not one repeated value
- [ ] Section headings ≥40px at 1440; ≤3 weights picked at the extremes
- [ ] No card carries border and shadow together; dark elevation steps +3% lightness
- [ ] Dark mode re-derives tokens: paper L 12–18, accent hue unmoved, images never inverted
- [ ] Sections follow the 708px height map; fill ≥0.55; headings top-aligned
- [ ] Motion uses transform/opacity only; no `transition: all`; UI under 300ms
- [ ] Enter ease-out, exits 60–75% of enter, stagger 30–80ms, `scale(0.97)` on `:active`
- [ ] `prefers-reduced-motion` honored; content visible without JS
- [ ] Buttons are verb + object; error summary takes focus; paste never blocked
- [ ] Verified at 1440 and 375; every image passes the deletion test
