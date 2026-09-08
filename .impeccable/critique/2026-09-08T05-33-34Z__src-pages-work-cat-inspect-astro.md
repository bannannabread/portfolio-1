---
target: cat inspect case study page
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
target_identity: "file:C:\\Users\\megan\\OneDrive\\Projects\\portfolio-1\\src\\pages\\work\\cat-inspect.astro"
target_fingerprint: "sha256:6369b035f11bbb0c0e3c93a938b67a074227ac238d754f40c805e9f0bba85456"
target_path: "C:\\Users\\megan\\OneDrive\\Projects\\portfolio-1\\src\\pages\\work\\cat-inspect.astro"
timestamp: 2026-09-08T05-33-34Z
slug: src-pages-work-cat-inspect-astro
closed: true
---
Method: dual-agent (A: design-review sub-agent · B: detector/evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Sticky nav only shows active section after a click (:target); scrolling gives no positional feedback |
| 2 | Match System / Real World | 3/4 | Copy describes a walk-around step; the hero image shows the dashboard instead |
| 3 | User Control and Freedom | 4/4 | Back-link, sticky nav, prev/next pagination — no dead ends |
| 4 | Consistency and Standards | 2/4 | FloatingDevice framed vs. mockup mode used inconsistently vs. sibling I-Study page; detector also caught a literal hex (#fffaf4) mixed with a design-token var() in FloatingDevice.astro:48 |
| 5 | Error Prevention | 2/4 | Nothing caught the image/alt mismatch or a broken export before it shipped |
| 6 | Recognition Rather Than Recall | 3/4 | Meta row + sticky nav help; nav gives no "you are here" without a click |
| 7 | Flexibility and Efficiency | n/a | Linear read-only case-study page — no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained per DESIGN.md, but doubled device chrome and one oversized figure puncture it |
| 9 | Error Recovery | 3/4 | Page is transparent about the project's real limits; not extended to the visual evidence |
| 10 | Help and Documentation | n/a | Not applicable to a static case-study surface |
| Total | | 23/32 | Good (72%) |

Detector (impeccable detect) ran clean: exit 0, zero findings across cat-inspect.astro, CaseStudy.astro, FloatingDevice.astro. Browser-overlay visualization was unavailable this session (no browser automation tool exposed) — substituted curl'd HTML + manual static checks.

## Design Specificity Verdict

LLM assessment: Copy is genuinely specific to this product (gloved hands, bright outdoor light, HackIllinois team framing, Normal/Monitor/Action Required/N/A taxonomy, honest "no judge feedback" disclosure). Visual evidence contradicts it: hero image and project-card thumbnail are byte-identical files (MD5 083d39409e175d9db80b009b69b422bc), and neither matches what the copy/alt text describes.

Deterministic scan: Zero rule-engine findings — this mismatch is a content-vs-copy problem the detector can't catch structurally.

Root cause: walkaround-hifi.png and device-mockup.png were both overwritten with cat-phone.png in a prior turn. cat-phone.png is a device-in-hand mockup photo (own bezel/buttons/notch) but is rendered through FloatingDevice's framed mode (no heroMockup prop on this page), doubling device chrome. The hero's alt text and two pull quotes describe content (guided walk-around, fluid systems check, color-coded status selector, voice/photo capture) that was in the ORIGINAL walkaround-hifi.png, not in cat-phone.png. The original screen was found unused at caterpillar-photos/High-Contrast Inspection Tool Screen.png — an exact match for the copy, and a flat screenshot (framed mode is correct for it, no prop change needed).

## Overall Impression

Strong, specific writing sitting on top of a visual layer knocked out of sync by a recent asset edit. Biggest opportunity: restore the walk-around screenshot to the hero so the page's strongest writing has evidence behind it, and fix the doubled device-frame chrome.

## What's Working

- The "no judge feedback yet" disclosure names exactly what shipped vs. what stayed conceptual — honesty, not an excuse.
- Field-condition specificity in copy passes the "not a template" test on prose alone.
- Accessibility foundation solid: skip-link, :focus-visible, aria-labels on nav landmarks, proper dl for meta.

## Priority Issues

[P0] Hero image forced through the wrong FloatingDevice mode, doubling device chrome
Why it matters: cat-phone.png is a photorealistic device-in-hand mockup; framed mode wraps it in a second synthetic device frame + CSS mirror reflection — the exact anti-pattern DESIGN.md's component contract warns against.
Fix: Restore caterpillar-photos/High-Contrast Inspection Tool Screen.png as walkaround-hifi.png. Framed mode is then correct as-is.

[P1] Hero alt text and pull quotes describe content that isn't in the image
Why it matters: Screen-reader users are told about UI that isn't in the rendered image — an active accessibility failure. Sighted skimmers hit the same evidence gap.
Fix: Same asset fix as P0 resolves this.

[P2] buttons-yellow.png is missing its Primary button swatch; Outcome section evidence is unbridged
Why it matters: "Color" row's top sample shows "Primary" label with no button rendered under it. Both spec sheets drop in right after "no judge or user feedback to report yet" with no connecting sentence — cold peak-end.
Fix: Re-export a clean buttons sheet with the Primary swatch present; add one bridging sentence before the evidence images.

[P3] dashboard-hifi.png is an extreme portrait crop with no height ceiling
Why it matters: Native 786x1870 (ratio 0.42) renders ~1200px tall on desktop, worse on mobile (max-height: none) — dwarfs surrounding copy.
Fix: Apply the same max-height treatment CaseStudy.astro already uses for data-fit="contain" mismatched pairs, or re-crop tighter.

## Persona Red Flags

Jordan (first-timer): Reads two pull quotes anticipating a guided walk-around flow, never sees it — reads as "unfinished." Ends on two cold spec screenshots right after an admission of no external validation.

Sam (accessibility-dependent): Hero alt text describes UI elements absent from the image. Pull quotes marked up as plain <p class="pull-quote">, not <blockquote> — no semantic signal for screen readers.

## Minor Observations

- "3-person team" (meta) vs. "a three-person team" (body copy) numeral inconsistency.
- skills meta value reads as a keyword dump, off-voice from sentence-case editorial tone elsewhere.
- The two white-background Figma exports are the coldest visual moment on an otherwise warm-cream page.

## Questions to Consider

- If both pull quotes are about the guided walk-around, why did the hero end up showing the dashboard instead?
- Is a color/button spec sheet actually persuasive evidence of design skill, or does it read as padding once the walk-around evidence gap is noticed?
