---
id: glassmorphism
kind: style
applies: [ui-web, ui-mobile, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Glassmorphism

**Identity:** Frosted panels floating over a vivid gradient — depth through translucency, light edges, and layered blur.
**Temperature:** neutral
**Best for:** mobile OS surfaces, media and creative tools, hero sections, dashboards needing hierarchy without heaviness.
**Avoid when:** accessibility budget is tight, content is text-dense, or the brand is austere and mono.

## Palette
- Backdrop gradient stops: indigo `#4F46E5` → violet `#9333EA` → rose `#EC4899`
- Glass fill: white at 10–14% alpha
- Glass border: white at 30–40% alpha, 1px, brighter on the top edge
- Text on light scenes `#181B2C`; on dark scenes `#F2F3FA`
- Scrim under long copy: black at 45% + blur, or a solid panel
- The gradient must stay vivid — pastel washes make glass invisible

## Type
- Display: **Space Grotesk** (open license); body: **Inter** (open license)
- Scale 1.25: 16 / 20 / 25 / 31 / 39
- Weights 400 / 500 / 600; display tracking -1%
- Body text ≥16px; small glass captions bump to 600 weight for legibility
- Numerals tabular in stats, players, and meters

## Layout grammar
- Maximum TWO glass layers stacked; the background gradient stays solid-blurred
- Cards: radius 16–24px, padding 24–32px
- `backdrop-filter: blur(20px) saturate(180%)` on every glass surface
- Soft ambient shadow under glass: 0 8px 32px rgba(0,0,0,0.12)
- Background blobs drift slowly; foreground stays anchored
- Body copy sits on scrim or solid — glass is for chrome, not paragraphs

## Signature moves
- 1px gradient border: brighter at top-left, fading to transparent bottom-right
- Specular highlight line along the card's top edge
- Vivid color visibly refracting through the blur
- 2–3% noise overlay to stop gradient banding
- Parallax: backdrop moves at 0.3x scroll speed, glass at 1x

## Motion & interaction
- 200–400ms spring; hover lifts card 4px and adds +2px blur
- Backdrop elements orbit or drift on 20–40s loops
- Sheet transitions slide 24px with fade, gentle spring damping
- Animate blur smoothly; never toggle it on/off abruptly

## Do / Don't
- Do: keep contrast ≥4.5:1 for any text crossing glass
- Do: let one saturated gradient power the whole depth illusion
- Do: vary glass alpha by layer (12% front, 8% back) for readable depth
- Don't: stack glass on glass on glass — the classic unreadable pileup
- Don't: set paragraphs directly on glass without a scrim
- Don't: gray down the gradient; translucency needs vivid color behind it
- Don't: use blur as a fix for busy backgrounds — simplify the background first
- AI failure mode: three nested frosted cards with 13px gray text — cap layers at two, put body copy on solid ground, and test contrast through the blur

## Prompt handles
- glassmorphism UI
- frosted glass card
- backdrop blur 20px saturate 180%
- translucent layered depth
- vivid gradient background
- 1px light border highlight
- Apple-style material design
- glass over color blobs
