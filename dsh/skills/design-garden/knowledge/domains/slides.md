---
id: slides
kind: domain
applies: [slides]
status: core
source: "distilled: slides, design-system, design-taste-frontend, ui-ux-pro-max"
updated: 2026-11-16
---

# Presentation decks

## Readability floors
- Body ≥24px, labels ≥16px — floors, not targets.
- Titles 60–120px; hero statements up to 180–240px.
- Viewing distance sets the size: a 10m projection and a 40cm laptop are different decks. Design for the room.

## One message per slide
- The headline states the takeaway, not the topic: "Churn halved after onboarding redesign", never "Metrics".
- Pick the slide's form from audience distance + narrative role: hero, transition, data, quote, ending.

## Deck shape
- Seed pitch: 10–12 slides. QBR and board decks: 15–20. Apply 10/20/30 — 10 slides, 20 minutes, 30pt minimum font.
- Duarte sparkline: alternate "what is" (frustration) with "what could be" (hope); break the pattern at 1/3 and 2/3 through.
- Plan the emotion arc per deck type. Investor example: curiosity → frustration → hope → confidence → trust → urgency.

## Data slides
- First ask what relationship the numbers express: proportion, change, composition, contrast, scale. Never default to "three big numbers + bar chart".
- One color = one meaning across the whole deck.
- Big number + small label is a treatment to justify, not a template — use it only when genuinely best (see data-viz.md).

## Layout → animation mapping
- Title fade-up; problem stagger; solution scale; metrics stagger-scale; CTA pulse.
- One orchestrated load animation beats per-section fade-ups.
- Charts come from a real chart library (Chart.js), never CSS bars.
- Grid lines on dark: `rgba(255, 255, 255, 0.05)`.

## Deck mechanics
- ≥5 pages → multi-file deck plus an overview wall; single file only at ≤5 pages.
- Page numbers live in the shell; progress bar and keyboard navigation are mandatory.
- 16:9 letterbox: `max-width: calc(100vh * 16 / 9)`; slide crossfade 0.4s; keep content inside a safe-area wrapper.
- Fluid type via `clamp()`, e.g. `clamp(32px, 6vw, 80px)`.

## Copy
- Map formula to emotion: Problem → PAS; Traction → proof stack; CTA → AIDA / urgency.
- Headline patterns are options to choose from, not defaults to fill in.
- Every claim provable or sourced.
- Copy-paste trap: a deck is not a document — if a slide needs a paragraph, split it.

## Theme consistency
- Import one tokens file as the single source of truth; visual identity holds across every slide.
- Backgrounds: dark gradient overlay over a photo, tinted paper, or flat. Busy photo under text without a scrim is a hard fail.

## Critique checklist
- [ ] Body ≥24px, labels ≥16px, titles 60–120px
- [ ] Type sizes chosen for the actual viewing distance
- [ ] Every slide carries exactly one message; headlines state takeaways
- [ ] Slide count matches deck type (10–12 seed, 15–20 QBR)
- [ ] What-is / what-could-be alternation with pattern breaks at 1/3 and 2/3
- [ ] Chart form chosen by the relationship the numbers express
- [ ] One color = one meaning deck-wide
- [ ] Animations follow the title/problem/solution/metrics/CTA mapping; one orchestrated load
- [ ] Charts use a chart library; grid lines at rgba(255,255,255,0.05) on dark
- [ ] ≥5 pages → multi-file + overview wall; page numbers in the shell
- [ ] Progress bar and keyboard navigation work
- [ ] 16:9 letterbox via calc(100vh*16/9); crossfade 0.4s; safe-area wrapper
- [ ] Type uses clamp()
- [ ] Copy formula matches slide emotion; every claim provable or sourced
- [ ] No paragraph slides — dense text split across slides
- [ ] One tokens file drives all slides; no busy photo under unscrimed text
