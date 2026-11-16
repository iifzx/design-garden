---
id: color
kind: core
applies: [any]
status: core
source: "distilled: huashu-design, brand, hallmark, design-system, ui-ux-pro-max"
updated: 2026-11-16
---

# Color — derivation protocol, systems, and safety

## The derivation protocol (run before adopting any palette)

Colors must be **derived from the subject**, not borrowed from a style tag. Three steps:

1. **Sample.** Pull candidates from: real brand assets → real content imagery → cultural color memory of the subject's world (a tea house is celadon and ink, not "pastel"; a steel mill is oxide and graphite, not "corporate blue").
2. **Converge.** Work in OKLCH. End with 2–3 chromatic colors + one neutral lightness ladder. Convergence rule: hues differ by Δ≥60°, or lightness differs by Δ≥0.3 — otherwise they fight.
3. **Justify.** Write one sentence per color: "this comes from X in the subject's world." If you can't write the sentence, you copied a recipe — go back to step 1.

## Palette architecture

- Structure: 1–2 primary (60–70% of surfaces) / 2–3 secondary accents (20–30%) / 1 accent used sparingly (5–10%) / 3–5 neutrals / 4 semantic (success, warning, error, info).
- Neutrals are tinted, never gray-gray: build a lightness ladder (e.g. L 0.15 / 0.35 / 0.65 / 0.92 / 0.98) all pulled slightly toward the primary's hue.
- Text is never pure #000 — use ~#111827 or an ink from the ladder. Never pure #FFF on pure #000 backgrounds; tint both ends.
- Chroma budget by area (OKLCH C): large fields 0.01–0.04; brand/primary 0.08–0.15; small accents 0.15–0.22; C>0.25 full-bleed only for deliberately electronic styles. Oversaturated large fields vibrate and read as AI.
- ≤2–3 colors per component. ≤20% of a design may sit off-palette.

## Contrast & accessibility

- Body text ≥4.5:1; large text (≥24px or ≥19px bold) and UI components ≥3:1; AAA ambitions 7:1.
- Never encode meaning in color alone — pair with label, icon, position, or pattern (colorblind users: ~8% of men have deuteranomaly).
- Semantic set is fixed and consistent everywhere: success green, warning amber, error red, info blue — with a text-readable variant of each.
- Focus rings and selection states get their own contrast check against adjacent surfaces.

## Color psychology — selection matrix with escape hatches

| Hue | Reads as | Use for | Avoid when |
|---|---|---|---|
| Blue | trust, competence | finance, tech, healthcare | food (appetite suppressant), playful kids brands |
| Red | energy, urgency, appetite | food, sales, entertainment | healthcare defaults, finance calm |
| Green | growth, nature, go | eco, health, fintech positive states | luxury pretension |
| Yellow | optimism, cheap & fast | quick-service, youth | luxury, long-form reading contexts |
| Purple | luxury, creativity | beauty, creative tools | broad-mass-market trust contexts |
| Black | premium, authority | fashion, high-end | friendly consumer apps |
| Orange | warmth, action | CTAs, community, food | calm/professional-only contexts |

The matrix is a starting hypothesis, not a verdict — the derivation protocol can override it with a justified cultural color (Forbidden-City red ≠ Coke red; indigo dye ≠ tech blue).

## Dark mode — parity, never inversion

- Re-derive every token: paper L 0.12–0.18 anchored toward the primary hue; elevation = lightness steps (+3% per level), shadows off.
- Accent: chroma −0.02–0.04, lightness +5–10%, hue never moves.
- Body text weight −50 units (dark text needs less weight); cards lighter than canvas; images never CSS-inverted; scrims measured against the actual background beneath.
- State contrast parity: hover/active/disabled must be as legible in dark as in light.

## Application discipline

- All colors through tokens (`--{category}-{item}-{variant}-{state}`); components never consume raw hex.
- Semantic layer enables theme switching — dark mode becomes a one-line override, not a redesign.
- Gradients: only with a job (scrim over photo, material simulation, deliberate style) — "gradient because flat felt boring" is the tell of a default. Never purple-blue by default.
- Verify palette in context, not in a strip: check text-on-primary, accent-on-paper, disabled-on-canvas before committing.
