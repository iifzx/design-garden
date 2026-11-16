---
id: minimal-clean
kind: style
applies: [ui-web, ui-mobile, data-viz, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Minimal Clean

**Identity:** Modern product minimalism — one confident accent on quiet neutral surfaces, hairlines instead of boxes, typography carrying all hierarchy.
**Temperature:** quiet
**Best for:** developer tools, SaaS products, analytics, documentation, decks where the content is the hero.
**Avoid when:** brand needs warmth or spectacle, or the audience is non-technical and needs visual guidance.

## Palette
- Canvas `#FAFAF8` — page ground; ~65%
- Surface `#FDFDFC` — cards, sheets; ~15%
- Ink `#1C1C1E` — primary text; ~12%
- Muted `#75757D` — secondary text, icons; ~6%
- Hairline `#E6E6E2` — 1px dividers and borders
- Accent: ONE hue (e.g. indigo `#4F46E5`); ≤3% of pixels, interactive elements only

## Type
- Single family: **Inter** (open license); fallback system-ui stack
- Variable weights 400–600; 450 for body where supported
- Scale 1.25: 14 / 17.5 / 22 / 27 / 34 / 42, body 15–16px
- Display tracking -1.5%; body leading 1.5–1.6
- Tabular numerals for all data and metrics

## Layout grammar
- Content column max 1120–1200px, centered
- Strict 8px spacing scale; 96px+ between sections, 24–32px between groups
- Hairline dividers instead of boxed cards wherever possible
- One primary action per view; everything else is secondary or ghost
- Whitespace IS the hierarchy — never fill a gap that already reads fine
- Density allowed in tables and logs; compensate with generous page padding

## Signature moves
- Accent reserved strictly for links, active states, and the primary button
- Hover = 3–4% background tint or underline, 150ms, nothing lifts
- Data-viz: one accent series + gray context series, no rainbow legends
- Empty states set in typography, not mascot illustration
- Keyboard hints and kbd chips used as texture

## Motion & interaction
- 150–250ms ease-out; opacity plus 4px translateY
- No springs, no parallax, no scale transforms
- Focus rings: 2px accent at 50% alpha, offset 2px
- Skeletons shimmer once, then resolve — no infinite pulsing

## Do / Don't
- Do: push type contrast — near-black ink on near-white canvas
- Do: let one accent do all the pointing
- Do: match icon stroke weight to text weight (≈1.5–2px at 20px)
- Don't: gray everything into lifelessness — that is unfinished, not minimal
- Don't: import gradients, glows, or glass from flashier styles
- Don't: box every element in a card; hairlines and spacing group better
- Don't: use the accent on static decoration; it loses its pointing power
- AI failure mode: gray-on-gray timidity plus accent sprinkled on decoration — darken ink to near-black, confine accent to interactive elements, and delete one layer of boxes per view

## Prompt handles
- minimal product UI
- clean neutral surfaces
- single accent color
- hairline borders
- generous whitespace
- Linear Vercel aesthetic
- modern SaaS design
- quiet hover states
