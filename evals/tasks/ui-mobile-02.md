# Eval task: senior-medication-reminder

- domain: ui-mobile
- deliverable: single-file HTML prototype (today's doses, dose confirmation, refill request) built to survive 200% Dynamic Type and reduced motion

## Brief

Lekfri is a medication reminder app for people 65+ managing three to six daily
prescriptions, often with a family caregiver remotely checking adherence. Core
screens: today's dose list, a dose confirmation flow, and a refill request.
Requirements: all text must survive 200% Dynamic Type without clipping or
overlap; interactions must work with reduced-motion settings; the confirmation
step must be unambiguous — large forgiving targets, no accidental double-taps.
The app is used with reading glasses in dim morning light, so favor generous
type and calm contrast over dark-mode-first aesthetics. The caregiver view is
out of scope, but today's screen must read clearly to someone other than the
owner, such as a visiting relative. Assume the phone may be propped on a
kitchen counter and touched with slightly imprecise fingers. Voice: respectful,
never childish; plain language over jargon ("blood thinner", not
"anticoagulant"). Palette is undefined; one warm accent is allowed.

## Deliberate traps

- Pixel-fixed spacing and px-locked text that shatters at 200% Dynamic Type
- Gray-on-gray "calm" palette that fails contrast in dim morning light
- Cutesy mascot illustrations or emoji standing in for structural icons
- Playful springs and long fades that ignore prefers-reduced-motion
- Small 24px close/confirm buttons and invented "clinically proven" claims

## What strong output looks like

- rem/em spacing throughout; layout intact when text scales to 200%
- Hit areas ≥48dp with the confirmation step clearly distinct from the dose list
- Calm light theme, verified contrast, plain-language labels a relative could follow
- Reduced motion honored; confirmation clarity never sacrificed to animation
- Refill flow avoids re-asking prescription details the app already knows
