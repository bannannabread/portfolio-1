---
target: homepage (src/pages/index.astro)
total_score: 24
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-13T22-37-35Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "See the work" gives no signal its destination duplicates the "Selected work" section already on the page |
| 2 | Match System / Real World | 4 | Plain first-person copy throughout; domain tags read naturally to a recruiter audience |
| 3 | User Control and Freedom | 3 | No in-page anchor from hero to the work section — reaching content already on-page requires a manual scroll or a full navigation |
| 4 | Consistency and Standards | 3 | Two "go deeper" affordance vocabularies: filled/ghost pill buttons in the Hero vs. plain underlined text links on project cards and the about-teaser |
| 5 | Error Prevention | 4 | `comingSoon` projects render no `href`, so the FACT placeholder card cannot produce a dead click |
| 6 | Recognition Rather Than Recall | 4 | All nav labels are text, all tags/actions visible in place |
| 7 | Flexibility and Efficiency | n/a | Portfolio landing page has no repeat-use/expert workflow to accelerate |
| 8 | Aesthetic and Minimalist Design | 3 | The FACT Conference empty-state card sits at full size/position parity with the two real cards but with drastically less visual weight |
| 9 | Error Recovery | n/a | No forms or destructive/error-producing interactions on this static page |
| 10 | Help and Documentation | n/a | Portfolio marketing surface; no help affordance expected |
| **Total** | | **24/28 (86%)** | **Good** (heuristics 7, 9, 10 scored n/a — mode-inapplicable on a Persuade/Experience surface) |

## Design Specificity Verdict

**LLM assessment**: The content is genuinely grounded in this product — first-person "I designed…/I rebuilt…" captions, the specific "product designer who engineers" line, the honest dashed-placeholder for the unfinished FACT slot, and the gradient-card-plus-device-with-real-reflection material would not fall out of a generic template. But the first viewport's actual *composition* — name, one-line positioning, two pill CTAs on plain cream — is structurally identical to thousands of other portfolios. The one genuinely distinctive material is deliberately withheld until after a full scroll, so specificity currently lives in copy and below-the-fold material, not in the first five seconds a skimming recruiter actually judges.

**Deterministic scan**: `detect.mjs` returned exit 2 with 11 findings, all rule `design-system-font-size` (advisory), spanning 5 of the 6 scanned files — `index.astro` (2), `SiteNav.astro` (3), `SiteFooter.astro` (2), `Hero.astro` (2), `ProjectCard.astro` (2). Only `Layout.astro` came back clean. None of the flagged literals (`1.5rem`, `1.25rem`, `0.9375rem`, `0.85rem`, `0.875rem`, `1.1875rem`) match DESIGN.md's documented type ramp (display/headline/title/body/label). Two are responsive step-downs of already-flagged base sizes, not independently invented — but still off the documented scale either way. This is a real pattern Assessment A's manual read did not surface: a scattered, systemic type-scale drift across nearly every homepage component, not a one-off.

The injected browser detector separately reported two findings: `cream-palette` (`#fbf5ee` background) and `dark-glow` (zero-offset shadow, `#d97757`). The first is a **confirmed false positive** — `#fbf5ee` is DESIGN.md's own documented `--ground` token, named explicitly as the intended page background in the system's Do's list. The second, `dark-glow`, **could not be verified** — a full DOM/stylesheet search for `#d97757` / `rgb(217, 119, 87)` and a repo grep both came back empty; flagging as unresolved rather than confirmed.

**Visual overlays**: injection succeeded and console findings were captured, but the evidence-gathering pass tore down its own ephemeral server and tab afterward — there is no overlay currently visible in a browser tab. The findings above are the full captured record.

## Overall Impression

The page is well-built and honest — no fabricated content, no dead links, a real signature visual material (the gradient device cards) — but it plays its strongest card too late and undersells its own closing moment. The biggest opportunity: the hero and the footer are the two highest-leverage beats on the page (first impression, final decision point) and both are currently the most generic/quietest sections, while the one truly distinctive material sits passively in the middle.

## What's Working

- **The hero's positioning line** ("a product designer who engineers") states identity directly in one confident sentence, correctly skipping both a "Hi, I'm X" greeting scaffold and a kicker label per DESIGN.md's named rules.
- **The ProjectCard gradient panel + floating device** — radial warm-aura gradient, real screenshot, genuine `scaleY(-1)` mirrored reflection — is a distinctive, non-template material and the strongest single piece of "evidence of craft" on the page.
- **The FACT Conference honest placeholder** — dashed ghost, muted italic "coming soon," no invented tags/metrics/link — is a real trust-building choice most portfolios fake instead.

## Priority Issues

**[P1] Footer credit drops "coded," undercutting the core positioning**
- What: `SiteFooter.astro` reads "Designed by Megan · {year}."
- Why it matters: DESIGN.md's Brand Commitments explicitly specify a footer line "in the vein of 'Designed + coded by Megan.'" The whole brand thesis is the hybrid designer-who-engineers identity — the footer is the one place the system asks to assert both halves, and as shipped it claims only design.
- Fix: Change the credit line to name both — "Designed + coded by Megan."
- Suggested command: `/impeccable clarify`

**[P1] "See the work" routes to a full-page duplicate of content already on screen**
- What: The Hero's primary CTA links to `/work`, which renders the identical 3-project grid from the same data — the only difference is a longer intro sentence. The homepage's own "Selected work" section already shows all three cards.
- Why it matters: PRODUCT.md's own principle states recruiters are "scanning, not reading" — the primary hero CTA spends a full page load on déjà vu content at the highest-intent moment.
- Fix: Either make "See the work" an in-page anchor to the existing section (reserving `/work` for something genuinely additional), or differentiate the two surfaces.
- Suggested command: `/impeccable shape`

**[P2] Systemic type-scale drift off the documented ramp**
- What: 11 detector-confirmed font-size literals across `index.astro`, `SiteNav.astro`, `SiteFooter.astro`, `Hero.astro`, and `ProjectCard.astro` — none match DESIGN.md's documented display/headline/title/body/label steps.
- Why it matters: A pinned type ramp that nearly every component quietly ignores isn't a system anymore; it erodes the "every page is evidence of design skill" principle from the inside, in a way a single visual scan won't catch.
- Fix: Either fold each flagged size into the nearest documented step, or — if these are legitimate intermediate sizes — add them to DESIGN.md's ramp as intentional steps so the system stays honest about what it actually contains.
- Suggested command: `/impeccable typeset`

**[P2] No reinforced closing CTA before the footer**
- What: After the hero's single "Get in touch" pill (shown once, above the fold), the rest of the page offers only a same-weight "More about how I work →" link and an equally-weighted "Email" link among footer socials.
- Why it matters: The page's actual closing emotional beat — where a recruiter decides to act — carries no persuasive push, right when Product Principle #4 calls for making that action easy everywhere.
- Fix: Add a short closing band before the footer with a direct, confident restatement of the invitation to reach out.
- Suggested command: `/impeccable layout`

**[P2] First viewport is compositionally generic**
- What: The hero is name + one-line positioning + two pill CTAs on plain cream, with none of the product's signature gradient/device material visible without scrolling past roughly a full viewport.
- Why it matters: PRODUCT.md states the site itself must function as a design work sample, not describe one elsewhere — but the first thing a skimming recruiter sees carries none of the material that visually differentiates this from a generic template.
- Fix: Introduce one small authored touch within the hero itself (a sparing hand-touch accent, or pulling enough of the first project card into view) so the first screen carries at least one piece of the site's own visual signature.
- Suggested command: `/impeccable bolder`

## Persona Red Flags

**Jordan (Confused First-Timer)**
- Clicking "See the work" lands her on a page showing the same 3 cards in the same order she just scrolled past, with only a reworded intro sentence — she may wonder if the click did anything.
- Tags like "AI-Integrated Design" and "HackIllinois 2026" assume hackathon-culture familiarity a non-technical recruiter may not have, with no inline context.
- The FACT Conference dashed silhouette isn't a UI convention she'd necessarily recognize as an intentional placeholder rather than a broken image.

**Riley (Deliberate Stress Tester)**
- Would methodically confirm `/` and `/work` render identical project data and flag it as a real IA defect rather than a deliberate choice.
- Would try clicking the FACT Conference card specifically because it sits in the same grid position/size as the two clickable cards — finds no href, no cursor change, no disabled affordance beyond passive styling, inconsistent against the other two cards' clear clickable signals.

**Casey (Distracted Mobile User)**
- The single "Get in touch" CTA appears only once, at the very top; on mobile, three stacked cards (`min-height: 22rem` each, unchanged across breakpoints) sit between an interrupted-and-returning Casey and any second chance at contact.
- Footer links use `padding-block: 0.7rem` around ~14px text — likely under the 44×44pt touch-target guideline for reliable one-handed tapping.
- The single-column card stack under 640px means substantial full-width vertical scrolling per card before reaching caption/tags/link.

## Minor Observations

- `imageAlt` values ("I-Study cover image", "Cat Inspect cover image") are generic placeholders rather than descriptive alt text.
- `:focus-visible` outline is correctly implemented site-wide — a solid, uncredited baseline for keyboard users.
- The about-teaser's `--ground-alt` background band is a nice, restrained rhythm break consistent with the system's flat-hairline-not-shadow philosophy.
- In the 3-column "Selected work" grid, the FACT Conference placeholder's honest-but-flat treatment means a third of the primary evidence-of-craft row reads as visibly unfinished; a small status caption (e.g. a target timeframe) could soften that without fabricating content.
- The browser detector's `dark-glow` (`#d97757`, zero-offset shadow) finding could not be traced to any DOM element or stylesheet rule — worth a manual look if it recurs on a future run, but not actionable evidence today.

## Questions to Consider

- If the homepage already shows all three projects, what is `/work` actually *for* — should it exist as a separate destination in its current form?
- The footer is the site's very last impression before a recruiter decides to act — why does the page's most important closing beat carry the least visual confidence of any section?
- Is withholding the gradient-card material from the hero really serving the "site as work sample" thesis, or is it costing the first five seconds of a skim that matter most?
