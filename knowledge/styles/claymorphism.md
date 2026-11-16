---
id: claymorphism
kind: style
applies: [ui-mobile, illustration-art, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Claymorphism

**Identity:** Puffy, inflated softness — elements look blow-molded from pastel clay, with double shadows giving them weight and squish.
**Temperature:** bold
**Best for:** kids' products, habit and wellness apps, friendly onboarding, playful brand illustration.
**Avoid when:** the domain is serious — finance, security, medical — or icon density must stay high and neutral.

## Palette
- Sky wash `#E9EFFB` — background; ~55%
- Puff surface `#F7F9FF` — cards and elements; ~25%
- Ink `#3A3D56` — text, soft outlines; ~10%
- Juicy blue `#5B8DEF` — primary accent; ~7%
- Warm pop `#FFB35C` — secondary accent; ~3%
- Shadow tint derives from the base hue (e.g. `#A9B4DD`) — NEVER neutral gray

## Type
- Display: **Baloo 2** (open license) 700; body: **Nunito** (open license) 500–700
- Scale 1.25: 16 / 20 / 25 / 31 / 39
- Rounded terminals mandatory; no sharp grotesks
- Display tracking 0 to +1%; body leading 1.5–1.6
- Button labels 600–700 weight, sentence case

## Layout grammar
- Radius 16–32px on every container; pills for actions
- Double shadow recipe: inset 0 2px 0 rgba(255,255,255,0.6) top highlight + 0 12px 24px hue-tinted ambient
- Loose airy spacing: 24–48px between chunks
- Centered friendly compositions; one focal puff per screen
- Illustration and UI share the same inflation physics
- Empty space tinted, not white — the wash continues behind everything

## Signature moves
- The two-part shadow: white inner top light + colored ambient underneath
- Inflated pill buttons that visibly squash on press
- One saturated accent per screen against pastel everything
- Blob shapes with the same radius physics as UI cards
- Chunky 3D-look icons with tiny specular dots

## Motion & interaction
- 250–400ms with overshoot cubic-bezier(0.34, 1.56, 0.64, 1)
- Press squashes to 0.96 scale and springs back
- Idle elements float ±3–4px on 4–6s loops
- Success moments: a puff pops in at 1.1 then settles

## Do / Don't
- Do: tint every shadow with the base hue — gray shadows kill the clay
- Do: keep exactly one saturated accent per view
- Do: match illustration inflation to UI inflation
- Don't: use flat design shadows or hard edges
- Don't: let radii drop below 16px — square corners break the material
- Don't: stack multiple saturated puffs; it turns carnival fast
- Don't: rely on borders for definition; shadow physics does that job
- AI failure mode: neutral gray shadows (the number-one tell of fake claymorphism) and five competing accents — recolor shadows from the background hue and delete accents down to one

## Prompt handles
- claymorphism
- clay 3D elements
- puffy soft UI
- pastel inflated shapes
- double shadow, inner highlight
- cute rounded 3D icons
- toy-like depth
- squash and stretch interaction
