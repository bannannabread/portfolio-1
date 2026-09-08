---
target: i-study case study page
total_score: 21
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\megan\\OneDrive\\Projects\\portfolio-1\\src\\pages\\work\\i-study.astro"
target_fingerprint: "sha256:21ed886cb75cd104ecd1ad46ca3d97264d550dfd39eadfd436a7ab59b6a44824"
target_path: "C:\\Users\\megan\\OneDrive\\Projects\\portfolio-1\\src\\pages\\work\\i-study.astro"
timestamp: 2026-09-08T02-47-42Z
slug: src-pages-work-i-study-astro
closed: true
---
# Critique: I-Study case study (src/pages/work/i-study.astro)

Method: dual-agent (isolated Assessment A design-review sub-agent + Assessment B detector/evidence sub-agent), synthesized.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Sticky section-nav never marks the current section while scrolling — hover only, no active state. |
| 2 | Match Between System & Real World | 4 | Real student vocabulary throughout (illinois.edu, ICard, GPA, schedule overlap) — no generic UX-speak. |
| 3 | User Control and Freedom | 4 | Back-link, in-page jump nav, and next-project pagination all present and working. |
| 4 | Consistency and Standards | 4 | Fully consistent with the shared CaseStudy template and sibling Cat Inspect page. |
| 5 | Error Prevention | n/a | Static content page, no user input or destructive actions. |
| 6 | Recognition Rather Than Recall | 4 | Sticky nav lets a reader jump to any section without memorizing position. |
| 7 | Flexibility and Efficiency of Use | n/a | Persuade/Experience-mode surface, no power-user path expected. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained palette/whitespace, but several sections are single dense 90-110 word paragraphs. |
| 9 | Error Recovery | n/a | No error states exist on this page. |
| 10 | Help and Documentation | n/a | Not applicable to a portfolio case study. |
| **Total** | | **21/24** | **Good** |

## Design Specificity Verdict

**Content is genuinely product-specific; container is deliberately systematized.** Copy anchors to the real product: "illinois.edu authentication," "ICard verification," "UIUC enrollment system APIs," a named sample match ("Ava Smith," 87% schedule overlap, 3 shared classes). Pull-quotes are first-person about this exact problem. This page is byte-identical `CaseStudy.astro` to Cat Inspect, differentiated only by `gradient="violet"` and swapped images — intentional per DESIGN.md's repeatable-format rule, so not a foul, but it does mean the only glance-level signal this is *this* project is one gradient hue and a phone screenshot.

**Deterministic scan**: Source-file scan (`i-study.astro` + `CaseStudy.astro`) returned zero findings. Live-rendered URL scan returned 14: 6 line-length warnings, 4 hairline-border-plus-wide-shadow slop advisories, 1 cramped-padding warning, 1 cream-palette slop warning. Five of the six line-length hits (~86 chars/line against the site's 68ch `--measure` token) and the cramped-padding hit (nav `<ul>` border-left with the inset actually implemented on the child `<a>`'s padding, not the `<ul>`) read as font-metric/detector-limitation artifacts, not real defects. The cream-palette flag matches an intentional, extensively-documented sitewide token, not an unreviewed default — false positive relative to stated intent. The 4× hairline-border-plus-28px-shadow-blur hit on `.evidence-figure img` is mechanically real and repeats on every case-study image sitewide (see Priority Issues). The one ~107-char/line outlier is most likely the pull-quote's italic serif inheriting the same 68ch cap with a narrower glyph-to-ch ratio — plausible artifact, not confirmed.

**Visual overlays**: Not available. No Playwright or other browser-automation tool is installed in this project; browser visualization was skipped and reported honestly rather than attempted with the wrong tool.

## Overall Impression

The writing is doing real work — specific, product-grounded, confident. The structural system (sticky nav, meta row, evidence figures) is consistent and disciplined. The single biggest gap is that the page hasn't fully reckoned with its own stated audience: PRODUCT.md commits to "recruiters are scanning, not reading," but the body copy is written for continuous reading, and one image pair (Process section) is paired at wildly mismatched aspect ratios that will look broken rather than intentional.

## What's Working

1. **Alt text is written as real content.** "High-fidelity match profile screen for Ava Smith showing 87% schedule overlap, 3 shared classes, and a Request Session action" gives a screen-reader user the same information a sighted skimmer gets from the screenshot — rare in portfolios, and it directly reinforces the accessibility story a design candidate should be telling.
2. **The Decision section's image pair is the strongest visual moment on the page.** Verified: `homepage-hifi.png` and `match-hifi.png` are both exactly 791×1707px — identical aspect ratio, so they sit cleanly side by side with matching caption heights in the new 2-column grid.
3. **Copy voice is specific and confident**, e.g. "Matchmaking built on shared schedules and learning styles — so finding help is always simple and accessible" — reads as written by someone who ran the research, not filled in from a template after the fact.

## Priority Issues

**[P1] Process section pairs two evidence images at wildly mismatched aspect ratios.**
- **What**: `storyboard.png` is 973×919px (near-square, ratio ~1.06); `match-lofi.png` is 4388×10267px (ratio ~0.43 — over 5x taller relative to width than storyboard). Both verified directly from the PNG headers. In the page's fixed `repeat(2, minmax(0,1fr))` evidence-figures grid, equal column widths force `match-lofi` to render roughly 5x taller than `storyboard` beside it.
- **Why it matters**: this session's grid fix solved the *overflow* bug but not the underlying content mismatch. This pair sits in the Process section — the section meant to establish research rigor — so a visibly broken-looking pairing undercuts exactly the credibility the section is trying to build. Every other paired section (Decision: 791×1707 / 791×1707; Outcome: 1632×1329 / 1175×1008) pairs cleanly, making this one look like an oversight.
- **Fix**: either recrop `match-lofi.png` to a landscape ratio closer to `storyboard.png`, or give `.evidence-figure` a fixed aspect-ratio box with `object-fit: cover` so mismatched source images crop to a consistent shape instead of rendering at native ratio.
- **Suggested command**: `/impeccable harden src/layouts/CaseStudy.astro` (or `/impeccable layout` if reframing the grid contract itself)

**[P1] Body copy is written for reading, not skimming, in tension with the product's own stated principle.**
- **What**: Problem, Process, and Decision sections are each a single ~70-110 word unbroken paragraph — no internal bolding, no shortened lead sentence, no visual chunking.
- **Why it matters**: PRODUCT.md Principle #2 states "Optimize for a fast, skimmable first pass — recruiters are scanning, not reading." A recruiter who reads only headings and pull-quotes (the design's own intended skim path) misses the strongest specifics (illinois.edu/ICard, the research method) because they're buried mid-paragraph.
- **Fix**: split each dense paragraph into two shorter ones, or lead with a bolded 4-6 word fragment that carries the point standalone before the elaboration.
- **Suggested command**: `/impeccable distill src/pages/work/i-study.astro`

**[P2] Sticky section-nav never indicates the current section.**
- **What**: `.section-nav a` only changes color on `:hover` — no active/current-section state as the reader scrolls, no `aria-current`, unlike the sitewide nav which does mark `aria-current="page"`.
- **Why it matters**: heuristic 1 (visibility of system status) — a reader using the nav to orient mid-scroll gets no confirmation of where they are.
- **Fix**: given the zero-JS stack rationale in PRODUCT.md, prefer a CSS-only approach (`:target` styling on click, or `scroll-timeline`/`view-timeline` where supported) over a scroll-spy script.
- **Suggested command**: `/impeccable polish src/layouts/CaseStudy.astro`

**[P2] No skip-to-content link sitewide, and section-nav exceeds the 4-item chunking guideline.**
- **What**: confirmed absent in `Layout.astro` and every component — no visually-hidden "skip to content" link anywhere on the site. Separately, the case-study section-nav lists 5 items (Problem/Process/Decision/Outcome/Reflection), one over the working-memory chunking guideline.
- **Why it matters**: compounds for a keyboard-only user who must tab through `SiteNav` and the back-link on every page load, including each hop through project pagination.
- **Fix**: add a visually-hidden "Skip to content" link as the first focusable element in `Layout.astro`. Nav-count is borderline — leave as-is unless it's grouped with a real IA change.
- **Suggested command**: `/impeccable harden src/layouts/Layout.astro`

**[P2] Hairline border + wide diffuse shadow on every evidence image is a confirmed "generated-UI" detector signature, and it conflicts with the project's own craft-floor rule.**
- **What**: mechanically confirmed — `.evidence-figure img` combines `border: 1px solid var(--ground-deep)` with `box-shadow: var(--shadow-lift)` (28px blur), repeating identically on all 6 evidence images sitewide.
- **Why it matters**: Impeccable's own craft floor states "a hairline border paired with a wide, diffuse shadow is a recurring generated-UI signature — commit to one." This is a named, intentional component in DESIGN.md, not an accident, but the floor's guidance applies regardless of intent.
- **Fix**: pick one — drop the border and let the warm-tinted shadow alone carry the lift (consistent with the system's own "Hairline-Not-Shadow Rule" already applied elsewhere), or drop the shadow and let the 1px border alone define the edge.
- **Suggested command**: `/impeccable polish src/layouts/CaseStudy.astro`

## Persona Red Flags

**Casey (distracted mobile user)**: Under 800px, the section-nav collapses to a wrapping horizontal strip of 5 labels — likely wraps to 2 lines before any case-study content appears, adding scroll-past friction right after the hero. Casey skims headings only; section headings are full 15-20 word sentences ("Grounding the user experience in qualitative research, storyboards, and iterative wireframing.") rather than short scannable phrases, costing more read-time than a punchier heading would on a small screen.

**Sam (accessibility-dependent)**: Strong alt text (see What's Working), but two real gaps — no skip-link to bypass site nav, and the sticky section-nav gives no active-state feedback, so a keyboard user activating a nav link gets no confirmation the jump landed on the intended section beyond re-reading the page.

**Riley (stress tester)**: Just above the 800px `body-grid` breakpoint, the fluid content column narrows enough that Process's already-mismatched evidence pair gets squeezed further. The evidence-figures grid collapses at 640px while the nav/body-grid collapses at 800px — a 160px-wide zone where the nav is already a horizontal strip but images are still forced 2-up.

## Minor Observations

- `match-lofi.png` is a 6.9MB source file, the largest asset in the folder by far — Astro's build-time optimization should neutralize this, but worth a sanity check on served weight given the "fast first paint" stack rationale.
- Reflection's two `<h3>` group labels ("Key Design Learnings", "What's Next for I-Study") are noun-phrase labels, not full sentences — structurally the same pattern the No-Kicker Rule bans one level up (h1/h2). Rule doesn't currently cover h3, but the underlying pattern is identical.
- The Process section's pull-quote closely restates the Problem section's pull-quote (skill gaps vs. scheduling/working-style mismatch) — mild redundancy across two of the page's four pull-quotes.
- "Team: Solo project (coursework)" reads slightly oddly beside Role/Timeline/Skills' parallel phrasing; consider "Solo (coursework project)".

## Questions to Consider

1. If the stated principle is "recruiters are scanning, not reading," why does every section commit to full-sentence continuous prose instead of a hybrid scan format — is the editorial voice serving the recruiter or the case-study genre it's borrowing from?
2. The Decision section's pairing works specifically because both source screenshots happen to share an aspect ratio — should the evidence-figure component enforce a shape contract so quality doesn't depend on which two images a future case study happens to pick?
3. The No-Kicker Rule targets label-above-heading at h1/h2 — does it also apply in spirit to the Reflection section's h3 group labels, or is that a deliberately different, narrower pattern?
