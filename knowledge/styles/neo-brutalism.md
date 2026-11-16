---
id: neo-brutalism
kind: style
applies: [ui-web, poster-banner, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Neo-Brutalism

**Identity:** Thick ink borders, hard offset shadows with zero blur, clashing color blocks that refuse to apologize — raw honesty as charm.
**Temperature:** bold
**Best for:** indie products, dev tools, event sites, portfolios, community brands that want personality over polish.
**Avoid when:** trust and calm are the product — banking, healthcare, enterprise dashboards — or information density is extreme.

## Palette
- Bone `#F5F1E6` — warm paper base; ~45%
- Ink `#1A1A17` — borders, type, shadows; never pure #000; ~20%
- Acid yellow `#FFD23F` — highlight blocks; ~12%
- Cobalt `#4E7CFF` — secondary block; ~10%
- Hot pink `#FF6FA5` — third block; ~8%
- Clashing is the point, but one base must stay dominant; swap pink for lime `#B7E94C` freely

## Type
- Display: **Archivo Black** (open license) — one weight; use size, not weight, for range
- Body and labels: **Space Mono** (open license) — the monospace voice is structural, not optional
- Scale 1.333: 15 / 20 / 27 / 36 / 48 / 64
- Display leading 0.95; highlight one word with a marker block behind it
- Mono body at 15–16px minimum; tags written in brackets like [ NEW ]

## Layout grammar
- Card grids where every element carries a 2–4px solid ink border
- Hard offset shadows: 4–8px, one direction (down-right), one color (ink), everywhere
- Radius 0–8px max; pill buttons allowed but still bordered
- Dense but rhythmic: consistent 16/24px gaps, no orphan margins
- Section dividers as thick ink bars, not hairlines
- Sticker badges may rotate ±3°; nothing else rotates

## Signature moves
- The uniform hard shadow — 6px 6px 0 ink — applied to every elevated element
- Marker-highlight block behind one display word
- Monospace tags, badges, and bracket labels
- Oversized borders on inputs; focus swaps to inset shadow
- Ticker/marquee strip announcing something loudly

## Motion & interaction
- 120–180ms; crisp ease-out, no slow curves
- Press: element translates 4px into its shadow while the shadow shrinks to 2px
- Hover: shadow grows 2px and the element lifts — motion lives in the shadow, not the box
- No blur transitions, no fades over 200ms

## Do / Don't
- Do: pick one shadow vector and enforce it globally
- Do: let clashing colors sit adjacent with no gradient between them
- Do: keep body text on the bone base for legibility
- Don't: blur the shadows or add soft glows — that is genericism, not brutalism
- Don't: default to dark background with neon green; this style is light, loud, and colorful
- Don't: rotate more than the badges; rotation everywhere reads chaotic
- Don't: mix border thicknesses (2px vs 4px) across sibling components
- AI failure mode: inconsistent shadow directions and sizes across components — audit every card, button, and input against the same vector and thickness

## Prompt handles
- neobrutalism
- hard offset shadow, no blur
- thick black border
- clashing bright color blocks
- monospace labels and tags
- sticker badge UI
- raw anti-design web
- marker highlight headline

## Field QA (v0.2.0 gallery run)

- Stacking-context gotcha: CSS entrance animations create stacking contexts — a shadowed card silently painted over a rotated sticker that had no z-index. Give every rotated/offset decorative element an explicit z-index when siblings animate.
- The ink-border mass dominates visually even on the bone ground: audit contrast against the ink, not the bone.
- Keep radius 0 throughout for the raw feel — the 0–8px allowance is a trap toward softness.
