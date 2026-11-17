# Eval task: video-motion-02
- domain: video-motion
- split: dev
- doc-derived: 100–160ms / 200–500ms / 60–75% bands quote knowledge/core/motion.md and domains/video-motion.md — never holdout
- deliverable: Motion spec doc: per-transition duration/easing/spring values +
  choreography rules + reduced-motion fallbacks

## Brief

Fern is a budgeting app. Spec the onboarding motion: splash → 3-screen
value-prop carousel → two permission primers (notifications, bank link) →
home dashboard reveal. Design tokens: indigo #4F46E5 primary, 8pt spacing
grid, 12px radius. The deliverable is a motion spec, not a video: for
every transition give duration, easing curve or spring response/damping,
stagger values, and enter/exit paths. Constraints: each step-transition
keeps pure animation under 4s; everything is interruptible and
cancellable with the end state applied instantly on cancel; the home
reveal is the single orchestrated load moment. Follow the reference bands
— press feedback 100-160ms, modals 200-500ms, exits at 60-75% of enter,
stagger 30-50ms, ease-out enters, ease-in-out on-screen moves. Include
reduced-motion fallbacks as static frames, an opacity floor of 0.2, and a
note that no logic may wait on animationend events. Target 60fps on
mid-range Android.

## Deliberate traps

- Dramatic 800ms modal entrances outside the 200-500ms band
- Bounce springs on everything — momentum unjustified, damping ignored
- Elements exiting along a different path than they entered; sheets
  detached from their triggers
- Stagger chains so long that content lands after users start reading;
  opacity resting at 0.1
- Transitions gated on animationend, so cancelling freezes the UI
  half-way

## What strong output looks like

- Every value inside the reference bands; exits 60-75% of enter
- Enter/exit path symmetry and anchor-to-source behavior written explicitly
- One orchestrated home reveal; interruptible and cancellable everywhere
- Reduced-motion static fallbacks defined per transition
- Spec is directly implementable: concrete ms values, curves, spring
  params
