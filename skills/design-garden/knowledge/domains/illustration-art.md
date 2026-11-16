---
id: illustration-art
kind: domain
applies: [illustration-art, poster-banner, slides]
status: core
source: "distilled: algorithmic-art, canvas-design, design"
updated: 2026-11-16
---

# Illustration & generative art

## Philosophy first, execution second
- Phase 1: name the movement in 1–2 words — "Chromatic Silence",
  "Analog Meditation" — then write a 4–6 paragraph manifesto covering:
  space/form, color/material, scale/rhythm, composition, hierarchy.
- Phase 2: execute the manifesto as 90% visual, 10% text.
- The composition flows from the philosophy, not from a menu of pattern
  options. A flow field is a consequence of a stance, not a pick from a
  gallery.

## Text as art
- Text is sparse and essential — integrated as a visual element, never a
  caption layer bolted on.
- Typography may step onto the canvas as art: thin weights (200–300) for
  labels, oversized type for structure.

## Subtle reference
- Embed the topic as a niche conceptual thread. Those who know feel seen;
  everyone else just sees masterful composition.
- Refined, never literal. No labeled diagrams of the obvious, no
  decorated clip-art of the theme.

## Systematic framing
- Generative work thinks in systems: accumulated marks, repeated
  elements, layered patterns, sparse clinical typography.
- Target register: "a diagram from an imaginary discipline."

## Seeded randomness law
- `randomSeed(seed); noiseSeed(seed);` — the same seed always produces
  identical output. Non-reproducible art is a bug, not a feature.
- Seed navigation (prev / next / random) turns one algorithm into an
  explorable series.
- Parameters derive from "which qualities should be tunable" — counts,
  scales, probabilities, ratios, angles, thresholds — never "which
  pattern type".

## p5.js craft
- One `params` object: UI binding, reset, and serialization all read
  from it.
- Separate update logic from display logic.
- `noLoop()` + `redraw()` for user-triggered regeneration; animate only
  when asked.
- Many entities: precompute layers, spatial-hash collisions, hold the
  60fps bar.

## Craftsman bar — non-negotiable
- Nothing falls off the canvas; nothing overlaps unintentionally;
  breathing room everywhere.
- Limited intentional palette: 2–5 colors.
- Complexity without visual noise — even randomness must compose.

## Refinement
- Second pass refines what exists: weights, spacing, palette
  relationships. Do not add new graphics.
- Multi-page works share palette, type, and a compositional thread —
  each page adds one unique twist.

## Medium matrix
| Medium | Use for |
|---|---|
| SVG | Icons, flat illustration |
| HTML+CSS | Posters that need real text |
| Canvas / p5.js | Generative and algorithmic work |
| Image-gen prompts | Painted, textured, photographic art |

- Image prompts: subject + style + composition + light + palette;
  negative prompts against common artifacts. Generated images stay
  text-free — type is added in the design layer.
- If a style honestly needs WebGL or particle counts a laptop cannot
  hold, degrade the style deliberately and say so.

## Anti-cartoon rule
- Default away from: cartoony characters, text-heavy compositions,
  over-saturated gradients, generic blob mascots.
- Lift the rule only when the brief explicitly asks for playful/toy.

## Critique checklist
- [ ] Movement named in 1–2 words before any execution
- [ ] Manifesto runs 4–6 paragraphs across all five lenses
- [ ] Final work is 90% visual, 10% text
- [ ] Composition derives from the philosophy, not a pattern menu
- [ ] Text sparse and integrated as a visual element
- [ ] Topic embedded as a subtle thread, never literal decoration
- [ ] Systematic framing present (accumulation, repetition, layering)
- [ ] randomSeed and noiseSeed set; same seed reproduces identical output
- [ ] Seed navigation (prev/next/random) implemented
- [ ] Tunable parameters are qualities (counts, scales, probabilities, ratios, angles, thresholds)
- [ ] params object with separated update/display; noLoop+redraw where fitting
- [ ] 60fps held — precompute and spatial hashing used for many entities
- [ ] Nothing off-canvas; no unintentional overlaps; breathing room everywhere
- [ ] Palette limited to 2–5 intentional colors
- [ ] Second pass refined without adding graphics
- [ ] Series shares palette/type/thread with one twist per page
- [ ] Medium chosen per matrix; generated images are text-free
- [ ] No cartoonish defaults unless the brief demands playful
