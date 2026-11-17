# Eval task: saas-qbr-deck

- domain: slides
- split: dev
- doc-derived: titles 60–120px / body ≥24px criteria quote knowledge/domains/slides.md — never holdout
- deliverable: multi-file HTML QBR deck, 15–18 slides + overview wall, dark theme, Chart.js figures, keyboard nav

## Brief

Quarterly business review for Fathom, a B2B customer-support analytics SaaS,
presented to the executive team. This quarter: net revenue retention moved
104%→109%, logo churn fell 3.1%→2.4%, two enterprise wins closed (a bank and an
airline), the bulk-export launch slipped six weeks, and support costs rose 18%
after the pricing change. The CTO wants the slipped launch owned plainly, not
buried in an appendix. The CFO distrusts dense slides and wants every metric
shown against its target. Board-pack style: sober, precise, zero motivational
imagery. Include an appendix section holding the pricing-change cohort table.
The audience reads on a conference-room TV from roughly four meters, so type
sizing must assume that distance. Open with the quarter's single most important
takeaway, not an agenda slide. No fabricated figures: anything not listed above
must be visibly marked as placeholder or left out.

## Deliberate traps

- Paragraph slides pasted from the written report instead of one-message slides
- Chart junk: dual y-axes, rainbow series colors, 3D or shadowed bars
- The slipped launch hidden at slide 15 behind wins-first framing
- Body text at 18px that becomes unreadable from four meters
- Per-section fade-up animations and motivational stock imagery

## What strong output looks like

- Each metric charted against its target with disciplined color (one color = one meaning)
- A plain-spoken slip slide with cause and recovery plan in the deck's front half
- Type sized for a 4-meter TV: titles 60–120px, body ≥24px
- Cohort data rendered as a table for exact lookup, not squeezed into a chart
- Sober consistent theme from one tokens file; overview wall and keyboard nav working
