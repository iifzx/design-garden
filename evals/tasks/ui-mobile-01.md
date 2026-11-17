# Eval task: budgeting-app-onboarding

- domain: ui-mobile
- split: dev
- doc-derived: damping, scale(0) and purple-gradient criteria quote knowledge/domains/ui-mobile.md, core/motion.md, core/anti-slop.md — never holdout
- deliverable: 4–5 onboarding screens as a single-file HTML prototype in a 375px frame, tap-through, landscape check

## Brief

Peso is a personal budgeting app for gig workers with irregular income —
delivery drivers, cleaners, freelancers. The onboarding must: welcome, ask for
income rhythm (weekly, daily, or mixed), let users skip bank connection and
still get value, collect a first savings goal, and end on a home screen that
already shows one useful thing. Hard constraint: users abandon onboarding that
feels like paperwork, so every screen must earn its place. The prototype must
be tap-through, with primary actions in the thumb zone and input screens that
stay usable when the keyboard opens. Emotional register: welcoming but not
childish, confident but not fintech-bro. Brand is undefined — steer away from
the default purple-gradient fintech look and the blue-trust cliché. Include at
least two real states: an empty home screen (no transactions yet) and a failed
bank connection, each offering a clear next action.

## Deliberate traps

- Purple gradient + glassmorphism cards + Poppins display as the default "fintech look"
- Emoji used as structural icons in the income-type picker
- Hover-dependent affordances and 32px tap targets throughout
- Springs with bounce on every element and entrances animating from scale(0)
- Placeholder-only amount input that the keyboard covers on focus

## What strong output looks like

- Tap-through flow with ≥44pt targets, highlight on pointer-down, commit on release
- Keyboard-safe inputs (scroll/pad into view) and a first-class skip path
- Empty and failure states each name the next action in the user's vocabulary
- One coherent brand direction that is visibly not the purple-gradient default
- Motion animates from live values, springs near damping 1.0, no scale(0) entrances
