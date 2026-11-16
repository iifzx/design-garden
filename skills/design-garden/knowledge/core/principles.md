---
id: principles
kind: core
applies: [any]
status: core
source: "distilled: huashu-design, hallmark, frontend-design, ui-ux-pro-max, canvas-design"
updated: 2026-11-16
---

# Principles — universal composition & hierarchy

These apply to every domain. Domain files add specifics; nothing here is optional.

## Hierarchy

- **The squint test is the judge.** Blur the design (or zoom to 25%): you should still see exactly one dominant element, 2–3 secondary clusters, and clear reading order. If everything has equal weight, nothing is being said.
- Build hierarchy as a **set**: size + weight + color + position move together. One lever alone (size only) reads as a mistake.
- Title-to-body ratio ≥2.5× (aim 3×). Section heads under 40px at 1440 viewport are the most common "unfinished page" signal.
- One star per screen. If two elements compete for primary attention, demote one or split the screen.
- Boldness budget: one element at 120%, everything else at 80%. "Remove one accessory before leaving the house."
- Numbered markers (01/02/03) only when the content is truly a sequence.

## Contrast — the engine of attention

- Contrast is not only color: size, weight, spacing, texture, and alignment all create it. When color contrast is capped by brand rules, push the other levers.
- Make differences **decisive**: 16px vs 20px reads as error; 16px vs 32px reads as hierarchy. Either 1.25× steps minimum, or identical.
- Dark-on-light or light-on-dark must hold ≥4.5:1 for body text, ≥3:1 for large text and UI parts. Gray-on-gray is a hard fail.

## Gestalt — grouping without boxes

- Proximity beats borders: things that belong sit closer than things that don't. If you need a box to make grouping legible, the spacing is wrong.
- Similar things look similar: same card treatment = same importance. A row of identical cards says "these are interchangeable" — if they aren't, differentiate by treatment.
- Enclosure is the strongest grouping tool; use it last (whitespace → hairline → tinted well → card, and never border AND shadow on the same element).
- Continuity: align to lines that already exist. A new alignment axis must earn its place.

## Composition

- **Asymmetric balance** beats centered everything: one heavy mass + one light counterweight reads as composed; symmetric stacking reads as template.
- **Fill ≥0.55**: no section half-empty at the bottom. Either fill the composition or cut the section.
- Whitespace ≥40% on most canvases — it is composition, not absence. Crowding is not richness.
- Extreme scale beats medium balance: one element at extreme scale (a cropped headline, a full-bleed number) creates more energy than many medium elements balanced.
- Nothing overlaps unintentionally; nothing falls off the canvas; margins are non-negotiable. For art canvases: breathing room everywhere.
- **Form follows content** — the five form questions (ask before every screen/canvas/shot):
  1. Narrative role: hero, transition, data, quote, ending?
  2. Viewing distance: 10cm phone / 1m laptop / 10m projection?
  3. Temperature: bold, neutral, quiet?
  4. Capacity: how much fits in three 5-second sketches?
  5. Motif: what visual idea comes from *this* content's world?
  If you can't answer #5, you're decorating, not designing.

## The addition test

Every element must pass all three:
1. **Origin**: does it come from this subject's world, or from "pages generally have this"?
2. **Subtraction**: remove it — is the information clearer or muddier? (Clearer = it was decoration.)
3. **Sovereignty**: is it the only star of this screen?

Structural elements (rules, numbers, dividers, color fields) must encode content relationships: a rule that separates a fact from its commentary is information; a rule that decorates a heading is residue.

## Surfaces & depth

- Surface ladder, weakest first: whitespace → hairline → tinted well → card. Climb different rungs at different seams; never jump from flat to card everywhere.
- A card takes a border OR a shadow, never both.
- On dark themes, elevation is expressed by lightness steps (+3% per level), not shadows.
- Depth supports meaning: modal dims-to-focus; parallel panels offset without scrim; never translucent-on-translucent where text must be read.

## Unknown client facts

Briefs often arrive without the shop name, dates, prices, or offer — and inventing any of them is a hard fail (no fake brands, no plausible-looking discounts). Design the unknowns as **first-class visible slots**: a bracketed `[店名]`, `[X月X日 — X月X日]`, `[促销主打]` set at the layout's real hierarchy, styled as actual copy at actual size. Never hide the slot in small muted type — if the piece needs that information, the slot sits where the eye lands. The layout must feel finished; the client fills the blanks.

## Restraint

- Quality floor is unannounced: accessibility, responsiveness, and polish are not features to mention — they're assumed.
- Chanel's rule applies to screens: before delivery, remove one thing you like.
- The swap test: if a headline/motif would work unchanged on a competitor's page, it isn't specific yet. Rewrite until only this subject could carry it.
- Complexity without visual noise is the craftsman's bar — order without rigidity, randomness with composition.
