# Eval task: sleep-study-recruitment

- domain: ui-web
- deliverable: single-file HTML recruitment page with an eligibility self-check form; verify at 1440 and 375, keyboard-operable

## Brief

A university sleep research center is recruiting adults aged 40–65 with mild
obstructive sleep apnea for a 12-week study of a new mandibular advancement
device. Participants attend four in-clinic visits, wear the device nightly,
keep a simple sleep diary, and receive up to €600 compensation plus free
parking. The page must screen out severe apnea, recent oral surgery, and
pregnancy without sounding exclusionary. Ethics constraints: no coercion and no
promises of therapeutic benefit — this is research, not treatment. The board
requires that compensation, time commitment, and the right to withdraw are
exactly as visible as the benefits. The audience is older adults, many on
phones, often reading while tired. Tone: calm, precise, institutional but
humane. The center's visual identity is open, but whatever direction is chosen
must not read like a drug advertisement.

## Deliberate traps

- Gray-on-gray "subtle elegance" text that fails contrast for tired older readers
- Purple gradient hero or Inter/Poppins display type in a clinical context
- Placeholder-only form labels and a submit that blocks paste or autofill
- €600 shouted in 80px type while the four visits and withdrawal right hide in footnotes
- Invented statistics ("94% of participants slept better") to manufacture appeal

## What strong output looks like

- Commitments, compensation, and withdrawal carry equal visual weight near the top
- Persistent labels; focus moves to an error summary on failed submit; paste allowed
- Calm, low-chroma palette with verified 4.5:1 body contrast at both widths
- Exclusion criteria phrased as clear factual statements, not marketing hedging
- Body ≥16px, 44px targets, and the whole form operable by keyboard alone
