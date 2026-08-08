---
name: Megan — Product Designer Who Engineers
description: A warm, classy evidence-based portfolio where process is the product.
colors:
  ground: "#fbf5ee"
  ground-alt: "#f5ebdf"
  ground-deep: "#efe1d1"
  ink: "#241c17"
  ink-soft: "#5b4c41"
  ink-faint: "#6b5847"
  accent: "#a8431f"
  accent-soft: "#e8926b"
  accent-tint: "#f6ddc9"
  card-peach: "#ffd9b3"
  card-coral: "#f3a38a"
  card-rose: "#e38aa0"
  card-violet: "#d9a3c2"
typography:
  display:
    fontFamily: "'Fraunces Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 2rem + 3vw, 5.5rem)"
    fontWeight: 480
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Fraunces Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 1.6rem + 1.6vw, 3.25rem)"
    fontWeight: 480
    lineHeight: 1.08
  title:
    fontFamily: "'Fraunces Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.875rem)"
    fontWeight: 480
    lineHeight: 1.08
  body:
    fontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  caption-italic:
    fontFamily: "'Fraunces Variable', ui-serif, Georgia, serif"
    fontStyle: "italic"
    fontWeight: 420
    fontVariation: "'opsz' 30, 'SOFT' 25"
  label:
    fontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    letterSpacing: "0.02em"
rounded:
  control: "0.6rem"
  card: "1.75rem"
  pill: "999px"
spacing:
  1: "0.5rem"
  2: "0.75rem"
  3: "1.25rem"
  4: "2rem"
  5: "3.25rem"
  6: "5.25rem"
  7: "8.5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  project-card:
    backgroundColor: "{colors.card-coral}"
    rounded: "{rounded.card}"
    padding: "3.25rem 2rem"
---

# Design System: Megan — Product Designer Who Engineers

## Overview

**Creative North Star: "The Warm Evidence Room"**

A cream-ground, editorial portfolio in the classy structural register of Rachel Chen and Sanvithi — generous whitespace, elegant serif display type, sentence-case (never label-and-heading) framing — with warmth carried by a single recurring device: a floating gradient-field card holding a soft device mockup and its own genuine reflection. That warmth is deliberately confined to card and hero-panel fields (peach → coral → dusty rose → violet radial gradients); the page ground itself stays a flat warm cream, never gradient. The system reads as restrained and evidentiary: one carried terracotta accent, one signature material (the floating device), full-sentence section headings instead of label+heading pairs, and an honest placeholder state for unfinished project slots rather than fabricated content.

The build deliberately rejected two things its own references model: the small-caps "eyebrow" label sitting directly above a heading (used by the pinned reference, Rachel Chen), and the "Hi, I'm X" greeting-frame hero opener. Both were caught at the craft floor and resolved without losing the underlying structure — sticky in-page section navigation stayed, the framing folded into the heading sentence instead of sitting above it as a separate label.

**Key Characteristics:**
- Warm cream ground (`#fbf5ee`) throughout; gradient warmth confined to card/hero-panel fields only
- One carrying accent (terracotta `#a8431f`), used sparingly — links, focus rings, CTAs, active nav state
- Fraunces Variable (serif, optical-size axis) for display type and italic first-person captions; Inter Variable for body/UI/metadata
- Signature component: the floating device — gradient-fill card face plus a real `scaleY(-1)` masked reflection, never fake screen content
- Full-sentence section headings; no kicker/eyebrow labels anywhere in the system
- Honest empty state for placeholder projects: dashed-outline device ghost, muted italic "coming soon" caption, no invented content

## Colors

A warm, low-saturation neutral field (cream ground, umber ink) carries one terracotta accent and a four-stop warm gradient family reserved for card and hero surfaces.

### Primary
- **Terracotta** (`#a8431f`, token `accent`): the single carrying accent — links, focus outlines, caret color, ::selection background, active nav underline, primary CTA fill, scrollbar thumb.
- **Soft Apricot** (`#e8926b`, token `accent-soft`): secondary accent weight — scrollbar track pairing, hover states on tag/underline elements.
- **Pale Apricot Tint** (`#f6ddc9`, token `accent-tint`): the floating-device face gradient endpoint and underline color on card links.

### Secondary — Warm Aura Gradient Family
- **Peach** (`#ffd9b3`), **Coral** (`#f3a38a`), **Dusty Rose** (`#e38aa0`), **Violet** (`#d9a3c2`): four gradient stops combined into radial "aura" fields (`peach`/`coral`/`rose`/`violet` variants), used exclusively as backgrounds for the case-study hero panel and project cards. Never used as text, border, or UI-chrome color; never spread across a full page background.

### Neutral
- **Warm Cream** (`#fbf5ee`, token `ground`): the page background everywhere, including the hero section.
- **Warm Cream Alt** (`#f5ebdf`, token `ground-alt`): secondary surface — scrollbar track, CTA band background (About page), empty-state card base (mixed with gradient tints via `color-mix()`).
- **Warm Cream Deep** (`#efe1d1`, token `ground-deep`): hairline border/divider color — section-nav rail, footer top border, pull-quote top border, principle-list dividers.
- **Umber Ink** (`#241c17`, token `ink`): primary text color, headings, pagination links.
- **Soft Umber** (`#5b4c41`, token `ink-soft`): body copy, dek/lede paragraphs, back-links.
- **Faint Umber** (`#6b5847`, token `ink-faint`): metadata, tag rows, dt labels, muted captions — tuned specifically to clear 4.5:1 contrast against both `ground` and `ground-alt`.

### Named Rules
**The One Accent Rule.** Terracotta (`accent`) is the only saturated color allowed outside the card/hero gradient fields. It never appears as a page background or large fill — only as text, border, focus, or small CTA surfaces.

**The Confined Gradient Rule.** The four-stop warm gradient family (`card-peach`/`card-coral`/`card-rose`/`card-violet`) is a card-and-hero-panel material, never a page background. If a surface needs warmth outside a card or hero panel, use the accent color on cream, not the gradient.

**The Contrast Floor Rule.** `--ink-faint` (`#6b5847`) was tuned to clear 4.5:1 against both `--ground` and `--ground-alt`. Do not re-lighten this token without re-verifying contrast on both grounds.

## Typography

**Display Font:** Fraunces Variable (optical-size axis, `@fontsource-variable/fraunces`), with `ui-serif, Georgia, serif` fallback.
**Body Font:** Inter Variable, with `ui-sans-serif, system-ui, sans-serif` fallback.

**Character:** A confident editorial serif at large sizes paired with a plain, legible sans for reading and UI — Fraunces carries the "classy" register at headline scale and softens into an italic first-person voice for captions; Inter stays invisible and functional everywhere else.

### Hierarchy
- **Display** (480 weight, `clamp(2.75rem, 2rem + 3vw, 5.5rem)`, 1.08 line-height): `h1` — hero name/positioning line, case-study titles. Uses `'opsz' 72, 'SOFT' 40` variation settings; capped at 22ch max-width.
- **Headline** (480 weight, `clamp(2rem, 1.6rem + 1.6vw, 3.25rem)`, 1.08 line-height): `h2` — case-study section headings, written as full sentences (never a kicker+heading pair).
- **Title** (480 weight, `clamp(1.375rem, 1.2rem + 0.7vw, 1.875rem)`, 1.08 line-height): `h3` — About-page principle headings.
- **Body** (400 weight, 1.0625rem, 1.6 line-height): default paragraph text; capped at `--measure` (68ch).
- **Italic Serif Caption** (420 weight, italic, `'opsz' 30, 'SOFT' 25`): first-person project captions ("I designed…"), pull-quotes, empty-state "coming soon" text.
- **Label/Tag Row** (Inter, 0.8125rem, 0.02em tracking, `--ink-faint`, sentence-case not uppercase): project metadata tags, `dt` labels, footer credit line.

### Named Rules
**The No-Kicker Rule.** Never place a small-caps/eyebrow label directly above a heading, even when a pinned visual reference (Rachel Chen) uses one. Fold the section's framing into the heading itself as a full sentence. Functional navigation labels (the sticky in-page section-nav links) are exempt — they are wayfinding, not a kicker sitting on a heading.
**The Italic-Voice Rule.** Italic Fraunces is reserved for first-person, quote-register text (captions, pull-quotes) — never used for structural headings or UI labels.

## Layout

Content sits in a centered `.wrap` container (`min(100% - 3rem, 74rem)`, narrowing to `100% - 2.5rem` under 640px). Vertical rhythm runs on a 7-step spacing scale from `0.5rem` to `8.5rem` (`--space-1` … `--space-7`); large section padding uses `--space-5`/`--space-6`, tight inline gaps use `--space-1`/`--space-2`.

Case-study pages use a two-column grid below the hero panel (`12rem` sticky section-nav rail + fluid content column, `gap: var(--space-5)`), collapsing to a single column with a horizontal, top-bordered nav strip under 800px. The hero panel itself insets from the page edge via `margin-inline: max(1.5rem, calc((100% - 74rem) / 2))`, distinguishing it as an inset "panel" rather than a full-bleed section. Project index/home grids use card lists (`ProjectCard`) in the standard `.wrap` width.

## Elevation & Depth

Hybrid: the page body is flat (no shadow on nav, footer, or text blocks — dividers use 1px `--ground-deep` hairlines instead), but gradient surfaces (hero panel, project cards, the floating device) carry warm-tinted, soft-diffused offset shadows to lift them off the cream ground.

### Shadow Vocabulary
- **`--shadow-card`** (`0 1.5rem 3rem -1.25rem rgba(88, 51, 30, 0.35)`): case-study hero panel, project-card panels — the primary "lifted surface" shadow.
- **`--shadow-lift`** (`0 0.75rem 1.75rem -0.75rem rgba(88, 51, 30, 0.28)`): defined for smaller-scale lifted elements.
- **Device shadow** (`0 1.25rem 1.5rem -0.75rem rgba(36, 28, 23, 0.35)`): the floating-device face specifically, distinct from the card-panel shadow.

### Named Rules
**The Warm-Shadow Rule.** All elevation shadows are tinted warm umber (`rgba(88, 51, 30, …)` or `rgba(36, 28, 23, …)`), never neutral black — shadow color follows the palette, not a generic gray.
**The Hairline-Not-Shadow Rule.** Flat content dividers (nav borders, footer border, pull-quote top rule, pagination border) use 1px `--ground-deep` borders, not shadows. Shadows are reserved for the gradient-field surfaces (hero panels, cards, the device).

## Shapes

Two radius scales: a large `--radius-card` (1.75rem) for gradient-field surfaces (hero panel, project-card panels, floating-device face at 1.35rem), and a small `--radius-control` (0.6rem) reserved for compact controls. CTA buttons use full pill radius (999px), distinct from both card and control scale. No sharp corners anywhere in the system; no clipped/angled geometry. Borders are thin (1px) and low-contrast (`--ground-deep` or `rgba(36,28,23,0.14)`), used for hairline dividers and the device-face edge, never as a heavy structural line.

## Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`).
- **Primary:** `background: var(--accent)`, `color: var(--ground)`, padding `0.85rem 1.5rem`.
- **Hover:** background shifts to `var(--ink)`, `translateY(-0.1rem)` lift, `0.2s var(--ease-out)` transition.
- **Ghost:** transparent background, `var(--ink)` text, `1px solid var(--ground-deep)` border; hover darkens border to `var(--ink)`, background stays transparent (no fill on hover).

### Cards / Containers — Project Card
- **Corner Style:** `--radius-card` (1.75rem).
- **Background:** one of four radial warm-aura gradients (`peach`/`coral`/`rose`/`violet`), each with a bottom scrim (`linear-gradient(to top, rgba(36,28,23,0.14), transparent)`) for the device to sit against.
- **Shadow Strategy:** `--shadow-card` at rest; device inside lifts an extra `-0.35rem` on card hover (`0.4s var(--ease-out)`).
- **Border:** none on real cards.
- **Internal Padding:** `--space-5` block, `--space-4` inline; minimum height 22rem.
- **Caption:** italic serif, ≤32ch; tag row beneath in Inter label style; "View case study →" link with arrow micro-animation on hover.

### Empty / Placeholder State (honest empty-state, not a generic loading skeleton)
- **Background:** the same gradient family desaturated via `color-mix(in srgb, <card-color> 16-20%, var(--ground-alt))` — a muted echo of the real card, not a different material.
- **Shadow/Border:** no shadow; a plain `1px solid var(--ground-deep)` border instead — visually quieter than a real card.
- **Content:** a dashed-outline (`stroke-dasharray: 4 6`) device silhouette in `--ink-faint`, plus muted italic caption "New case study — coming soon." Never a title, tags, metrics, or CTA link.

### Navigation
- **Site nav:** wordmark in display serif (`'opsz' 30, 'SOFT' 35`) left, flat text links right; active page gets `--accent` text + `--accent` bottom border (`aria-current="page"`); no background pill or box on active state.
- **Case-study section nav:** sticky rail (12rem, `top: var(--space-3)`), left-bordered list of plain-text links in `--ink-faint`, hover shifts to `--accent`. Collapses to a horizontal top-bordered strip under 800px. This is functional wayfinding tied to real in-page anchors — not decorative labeling, and exempt from the No-Kicker Rule for that reason.

### Floating Device (signature component)
The system's single most distinctive material: a device-face rectangle (`linear-gradient(155deg, #fffaf4, var(--accent-tint))`, 1.35rem radius, thin dark-tinted border, own drop shadow) paired directly beneath with a genuine mirrored reflection — the same face `scaleY(-1)`'d, masked to a top-fading gradient, and set to 0.7 opacity. No fake screen content, icons, or UI chrome is drawn inside the face; it is a pure abstracted material object. Used at large scale (200×320) in case-study hero panels and smaller (150×260) inside project cards. Reused verbatim as the honest empty-state silhouette (dashed outline, no fill) when a project has no content yet.

## Do's and Don'ts

### Do:
- **Do** keep the page ground flat warm cream (`--ground`) everywhere, including the hero — reserve the warm gradient family strictly for card/hero-panel fields.
- **Do** write case-study section headings as full sentences that carry their own framing.
- **Do** use the floating-device pattern (face + real mirrored reflection) as the system's one signature material rather than inventing new hero devices.
- **Do** keep placeholder project cards honest: dashed silhouette, muted italic "coming soon" caption, no invented titles/tags/metrics/clients.
- **Do** tint all shadows warm umber, never neutral gray/black.

### Don't:
- **Don't** add a kicker/eyebrow label (small-caps line sitting directly above a heading) anywhere in the system, even to match a pinned reference screenshot that uses one — fold that framing into the heading sentence instead.
- **Don't** open the hero (or any page) with a "Hi, I'm X" greeting-frame line — the hero states name + positioning directly, no greeting scaffold.
- **Don't** spread the warm gradient family across a full-page background — it is a confined card/hero-panel device, not a page treatment.
- **Don't** re-lighten `--ink-faint` without re-checking 4.5:1 contrast against both `--ground` and `--ground-alt`.
- **Don't** fabricate case-study content (metrics, client names, outcomes) for `comingSoon` project slots — the empty state is the honest answer until real content exists.
