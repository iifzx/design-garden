---
id: dark-tech
kind: style
applies: [ui-web, data-viz, video-motion, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Dark Tech

**Identity:** Deep tinted charcoal with ONE electric accent and monospace data — terminal-adjacent but fully readable, glow used as emphasis, never wallpaper.
**Temperature:** neutral
**Best for:** engineering tools, observability dashboards, API products, systems keynote decks, tech title sequences.
**Avoid when:** audience is consumer-casual or output will be printed on paper.

## Palette
- Base `#14161C` — blue-tinted dark, L≈14; ~70%
- Surface `#1B1E26` — panels; ~15%
- Raised `#232734` — elevated elements; ~8%
- Hairline `#2E3340` — 1px borders
- Text `#E9EBF2` — never pure white; ~5%
- Accent: ONE electric hue — signal green `#3FDE7C` or amber `#FFB224`; ≤3%

## Type
- **IBM Plex Sans** (open license) for prose + **IBM Plex Mono** (open license) for all data
- Scale 1.25: 14 / 17.5 / 22 / 27 / 34
- Weights 400 / 600; mono at 400 with tabular numerals everywhere
- Labels uppercase +0.08em in 13px mono
- Unit suffixes (ms, %, req/s) in muted 0.8em

## Layout grammar
- Elevation by lightness steps (+4–6% L per layer), never by shadow
- 1px hairline borders delineate every panel
- Dense 8px grid; data rows 32–40px tall with generous column gutters
- Charts on transparent background, axes in muted text
- Left-aligned everything; terminal-adjacent reading rhythm
- Status colors (green/amber/red) appear only in genuine status contexts

## Signature moves
- A single glow — text-shadow 0 0 12px accent at 40% — on the ONE most important datum
- Grid or scanline texture at ≤3% opacity in the background
- Mono numerals with unit suffixes as visual rhythm
- Breadcrumb paths styled like terminal prompts (~/org/service)
- Inline sparklines, accent-colored only for alerts

## Motion & interaction
- 100–200ms; instant-feel state changes with an 80ms opacity ease
- Data updates tick — swap values, never tween numbers
- Charts draw in 300ms left-to-right on load
- Glow pulses only for critical alerts: 1.5s loop, ±20% intensity

## Do / Don't
- Do: keep background L 12–18 with a hue tint; pure #000 flattens layering
- Do: reserve the accent for the single metric that matters most
- Do: verify body text contrast ≥7:1 on the base
- Don't: purple-cyan neon glow on everything — the cliché that dates instantly
- Don't: aurora gradient blobs; this style is flat surfaces and lightness steps
- Don't: decorate non-status elements with status colors
- Don't: tween counting numbers; real dashboards snap, and so should yours
- AI failure mode: neon rainbow glow soup on #000 — strip to one accent, tint the dark, and let elevation-by-lightness do the depth work

## Prompt handles
- dark technical UI
- deep charcoal tinted surfaces
- single accent glow
- monospace data typography
- engineering dashboard
- restrained sci-fi
- elevation by lightness
- terminal aesthetic readable

## Field QA (v0.2.0 gallery run)

- Add a muted-text token: text at 62% alpha (~6.3:1 on the base) — hairline color as text is 1.43:1, unusable.
- The 1.25 scale tops at 34px (dashboard-tuned): heroes add +1–2 ratio steps (53px+).
- "Accent ≤3%" vs "one glow on the key datum" vs status rows: keep every accent use either the CTA, the glowing datum, or a genuine alert — never decoration.
