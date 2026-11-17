---
id: ui-mobile
kind: domain
applies: [ui-mobile]
status: core
source: "distilled: apple-design, emil-design-eng, ui-ux-pro-max, design-taste-frontend"
updated: 2026-11-16
---

# Mobile app UI

## Targets & rhythm
- Hit areas ≥44pt (iOS HIG) / 48dp (Material), independent of the visible glyph size.
- Space on a 4/8dp rhythm; vertical rhythm tiers 16/24/32/48.
- Icon sizes are tokens: 24pt standard, 20pt dense. One icon style per hierarchy level.
- Keep stroke weight 1.5–2px consistent within an icon layer. Emoji are never structural icons.

## Touch is primary
- Nothing may rely on hover — it does not exist on touch screens.
- Feedback: highlight on pointer-down, commit the action on release. `:active` compresses to `scale(0.97)`.
- Dismissal is velocity-based: dismiss when |distance|/elapsed exceeds ~0.11 s⁻¹, even for short drags.
- Rubber-band edges with `(overshoot × dim × 0.55) / (dim + 0.55·|overshoot|)`; friction eases to rest, never hard stops.
- Guard against multi-touch conflicts; capture the pointer so drags survive leaving the element.

## Gesture-driven motion
- Animate from the live on-screen value, never the resting target.
- On release, inherit and blend the finger's velocity; run X and Y springs independently.
- No fixed CSS-style curves for gestures — springs only: damping 1.0, response 0.3–0.4s default.
- Add bounce (damping ~0.8) only when the gesture itself carried momentum.

## Screens & ergonomics
- Respect safe areas — notch, home indicator, corners — via `env(safe-area-inset-*)`.
- Primary actions live in the bottom half (thumb zone); pin the main CTA in a sticky bottom bar.
- On keyboard focus, scroll or pad the field into view — the keyboard never covers the input.
- Test at 375px width AND in landscape.

## Typography
- Support Dynamic Type / larger text: set spacing in rem/em so scaled text never clips or overlaps.
- Body ≥16px. Build hierarchy from weight + size + leading together, as a set.
- Tracking ~0 on body; negative tracking only on large display sizes.

## Dark mode & comfort
- Design dark separately and re-derive tokens — elevation by lightness steps, accent chroma trimmed with hue unmoved, images never inverted (parity rules in ui-web.md).
- State contrast (pressed / selected / disabled) must hold in both themes.
- Pause auto-rotating content while it has focus; honor reduced motion.

## Forms
- After a failed submit, focus the error summary.
- Authentication must allow password managers and paste — never block either.
- Do not re-ask what the app already knows; redundant entry erodes trust.

## Platform grammar
- Respect each OS's navigation model: back gestures, sheets, and tab bars behave as that platform's users expect.
- Wayfinding test at every screen: where am I, where can I go, how do I get out?
- Label destinations specifically — "Progress", not "Home".

## Icons & labels
- Decorative icons: `aria-hidden`. Meaningful icons: visible or accessible labels.
- Icon-only buttons must expose an accessible name.

## Performance feel
- After the first tooltip, subsequent ones appear instantly.
- A fast spinner reads as faster than a slow one; audit every latency source — debounces, timers, tap delay.
- Prefer transitions over keyframes for dynamic UI so motion stays interruptible.
- Use `@starting-style` for entry animations; CSS animations keep running under main-thread load.

## Critique checklist
- [ ] All hit areas ≥44pt/48dp, not just the visible glyphs
- [ ] No interaction depends on hover; highlight on down, commit on release
- [ ] Active states compress to `scale(0.97)`; dismissal uses the ~0.11 s⁻¹ velocity threshold
- [ ] Edge overscroll rubber-bands with the given formula; no hard stops
- [ ] Gesture animations start from live values and inherit release velocity
- [ ] Springs: damping 1.0 / response 0.3–0.4s; bounce only with real momentum
- [ ] Safe-area insets respected on all sides; nothing hides under notch or home indicator
- [ ] Primary actions sit in the bottom half; the keyboard never covers focused inputs
- [ ] Verified at 375px and in landscape
- [ ] Dynamic Type survives: spacing in rem/em, body ≥16px, no clipped labels
- [ ] Dark theme re-derived, not inverted; state contrast holds in both themes
- [ ] Auto-rotating content pauses on focus; reduced motion honored
- [ ] Error summary takes focus after failed submit; paste and password managers allowed
- [ ] Known information is never re-entered
- [ ] Platform navigation grammar respected; every screen passes the wayfinding test
- [ ] Icon-only buttons have accessible names; decorative icons are aria-hidden
- [ ] Latency sources audited; entry animations use `@starting-style`
