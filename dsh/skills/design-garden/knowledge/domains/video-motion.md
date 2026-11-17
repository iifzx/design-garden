---
id: video-motion
kind: domain
applies: [video-motion, slides, illustration-art]
status: core
source: "distilled: apple-design, emil-design-eng, slides"
updated: 2026-11-16
---

# Video & motion design

## Two product types, two workflows
- UI/micro motion: specs and code built from the reference tables below —
  no storyboard needed.
- Narrative video: storyboard first. Shot list with per-shot duration,
  purpose, and a visual-density clause — anything ≥20s needs real density
  in every shot, not looped padding.
- Write the director script (VO, on-screen text, shot notes) before
  rendering a single frame.

## Storyboard discipline
- Continuous motion narrative: hero elements morph or persist across
  scenes instead of resetting to blank.
- Never "PowerPoint with voiceover" — if every shot is a static frame
  plus a hard cut, redo the storyboard.
- Motion should demonstrate the product's logic, not decorate it.

## Pacing and sound
- SFX density: ~6 per 10s for hero/emotional pieces; 0–2 per 10s for tool
  demos.
- BGM and SFX both present, both ducked under voice — voice always wins
  the mix.
- Cut on motion, never mid-rest; movement hides the cut.
- One transition grammar per piece: match cut, whip, or morph. Pick one
  and repeat it.
- The first 2 seconds show the subject. No logo stings on short content —
  nobody waits through branding.

## Frame rules
- No fake browser/device chrome in frame unless the chrome itself is the
  subject.
- Captions inside safe margins (~10% from edges; more on 9:16 where
  platform UI overlaps).
- Captions are a design element: fixed position, size, and rhythm across
  the piece.
- Aspect ratios: 16:9 YouTube/web, 9:16 shorts/stories, 1:1 feeds.
- Export 30 or 60fps. For GIFs, design the loop point — first and last
  frames must match.

## Gen-AI video prompting
- Formula: subject + action + camera move + light + style.
- One moving subject per shot; multiple movers confuse the model.
- Never generate text inside video — add all text in post for legibility.
- Specify lens and movement: "slow dolly-in, 35mm, soft window light"
  beats "cinematic".
- Always produce a static fallback frame for reduced-motion playback.

## Tool pipelines — choose by determinism needs
- HTML/CSS/JS animation → screen-record: fastest path for UI demos.
- Remotion: React → MP4, deterministic and versionable — best for
  data-driven or repeated renders.
- ffmpeg: concat, xfade, scale, loop trimming — the compositing glue.
- moviepy: Python-scripted edits when logic gets complex.
- GSAP timelines: frame-accurate choreography for web-native motion.

## UI micro-motion reference
| Interaction | Duration |
|---|---|
| Press / tap | 100–160ms |
| Tooltip | 125–200ms |
| Dropdown / select | 150–250ms |
| Modal / sheet | 200–500ms |

- Exits run 60–75% of enter duration.
- Stagger siblings 30–50ms.
- Easing: ease-out for enters, ease-in-out for on-screen moves, linear
  only for constant loops.
- Springs: damping ~1.0, response 0.3–0.4s. Bounce only when momentum
  justifies it.
- Every animation is interruptible — never lock the user inside a
  transition.

## Choreography
- One orchestrated load moment per screen — elements arrive as an
  ensemble, not independently.
- Spatial consistency: enter and exit along the same path; sheets anchor
  to their trigger.
- Hierarchy motion: enter-from-below = going deeper; exit-up = going back.
- Opacity never rests below 0.2 — ghost UI breaks hit-testing and trust.
- Never gate logic on `animationend`: cancelled transitions must land
  their end state instantly.

## Critique checklist
- [ ] Narrative video starts from a storyboard with per-shot duration and purpose
- [ ] Shots in ≥20s pieces carry real visual density
- [ ] Director script written before any render
- [ ] Hero elements persist or morph across scenes
- [ ] Subject visible within the first 2 seconds; no logo sting on short content
- [ ] One transition grammar per piece; cuts land on motion
- [ ] SFX density matches piece type (~6/10s emotional, 0–2/10s demos)
- [ ] BGM and SFX ducked under voice
- [ ] No fake device chrome unless it is the subject
- [ ] Captions consistent and inside safe margins
- [ ] Aspect ratio and fps deliberate; GIF loop points designed
- [ ] AI prompts follow subject+action+camera+light+style, one moving subject
- [ ] No text generated in-video; text added in post
- [ ] Static fallback frame exists for reduced motion
- [ ] Pipeline chosen by determinism needs (Remotion for repeatable, screen-record for quick demos)
- [ ] Micro-motion durations within reference bands; exits 60–75% of enter
- [ ] Stagger 30–50ms; ease-out enters; springs damped ~1.0
- [ ] Transitions interruptible and cancellable, not gated on animationend; opacity ≥0.2
