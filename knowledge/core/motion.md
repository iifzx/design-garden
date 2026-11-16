---
id: motion
kind: core
applies: [ui-web, ui-mobile, video-motion, slides, any]
status: core
source: "distilled: emil-design-eng, apple-design, ui-ux-pro-max, design-taste-frontend"
updated: 2026-11-16
---

# Motion — decisions, values, and physics

## Should it animate at all? (frequency test first)

| Frequency | Verdict |
|---|---|
| 100+ times/day (tool actions, list ops) | Never animate |
| Tens per day | Remove or reduce |
| Occasional (modals, toasts, drawers) | Standard motion |
| Rare (onboarding, celebration) | Delight allowed |

Purpose must be one of: spatial consistency, state indication, explanation, feedback, preventing jarring change. "It looks cool" + frequent = don't. Never animate keyboard-initiated actions.

## Easing decision tree

- Entering or exiting → **ease-out** (custom: `cubic-bezier(0.23,1,0.32,1)`)
- Moving while staying on screen → **ease-in-out** (custom: `cubic-bezier(0.77,0,0.175,1)`)
- Hover/color changes → **ease**
- Constant motion (spinners, progress) → **linear**
- Never ease-in for UI — it delays the moment the user watches most closely.
- Drawers/sheets: `cubic-bezier(0.32,0.72,0,1)`.

## Duration table

| Element | Duration |
|---|---|
| Button press / active | 100–160ms |
| Tooltips, popovers | 125–200ms |
| Dropdowns | 150–250ms |
| Modals, drawers | 200–500ms |
| Anything UI | <300ms |

Exits run at 60–75% of enter duration. Stagger siblings 30–80ms. One duration for everything is a fail. Perceived-performance tricks: a fast spinner feels faster than a slow one; tooltips open instantly after the first one.

## Springs (for gesture-driven motion)

- Parameterize by damping ratio + response: damping 1.0 = critically damped (no bounce) — the default; <1.0 overshoots. Add bounce (~0.8) only when the gesture itself carried momentum.
- Shipped-value references: move/PiP 1.0/0.4s, rotation 0.8/0.4s, drawer 0.8/0.3s.
- **Velocity handoff**: pass release velocity as the spring's initial velocity; for relative-velocity APIs normalize by dividing by (target − current).
- **Momentum projection**: project where the flick lands (`(v/1000)·0.998/(1−0.998)`), snap to nearest sensible point.
- Animate from the **live on-screen value**, never from the target; blend velocity on reversal (no brick-wall stops); decompose X/Y into independent springs.
- Rubber-band at boundaries: `(overshoot × dim × 0.55) / (dim + 0.55·|overshoot|)` — progressive resistance, never a hard stop.

## Component recipes

- `:active` → `scale(0.97)` (0.95–0.98). Never animate from `scale(0)` — start at 0.9–0.95 + opacity fade.
- Popovers scale from their trigger via `transform-origin` (set from trigger position); modals stay centered.
- Crossfade two objects with `filter: blur(2px)` on the outgoing layer (≤20px, expensive in Safari) — masks the overlap seam.
- Highlight on pointer-down, commit on release; continuous feedback during drag (1:1 tracking).
- Interruptible always: use transitions (not one-shot keyframes) for dynamic UI; cancellable transitions never depend on `animationend`.
- Tab color morph: duplicate the content and clip the active copy — cheaper than animating gradient text.
- `@starting-style` for entry states instead of mount-effects; `transition-behavior: allow-discrete` for display toggles.

## Choreography

- One orchestrated load moment per page (a composed entrance sequence), not fade-up on every section.
- Spatial consistency: enter and exit along the same path; anchor motion to its source element.
- Hierarchy-motion: enter-from-below = going deeper; exit-upward = going back.
- Opacity never lingers below 0.2 mid-transition.
- Avoid ~0.2Hz oscillations and large semi-transparent moving objects (vestibular triggers); respect `prefers-reduced-motion` with real static alternatives, and `prefers-reduced-transparency` with frostier surfaces.

## Performance

- Only `transform`/`opacity` composite cheaply; everything else jank-prone.
- Never `transition: all` — name the properties.
- Updating a CSS variable on a parent recalculates all descendants — set transforms directly when animating.
- CSS animations survive main-thread load better than JS-driven ones; use WAAPI (`element.animate`) for programmatic CSS-performance animation.
- WebGL budget: ≤4 contexts per page.
- Debug motion at 0.25× speed or frame-by-frame; re-review with fresh eyes (next day beats same-hour).
