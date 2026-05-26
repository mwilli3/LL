# Design System: LoveLarice Wellness Apps
**Skill:** impeccable · **Register:** brand (design IS the product)
**Surfaces:** 7-Day Foundation Tracker · Boundary Journal · Nervous System Reset Guide (and the Regulation Mastery Kit, which shares the NS-states diagram)

---

## 1. Overview — Visual Theme & Atmosphere
Warm, editorial, clinical-but-tender. The interface reads like a printed wellness journal: a cream page, deep espresso ink, one archetype accent per surface, and a Cormorant Garamond display voice that carries all the drama. Body copy and UI chrome stay quiet in Outfit so the serif headlines and oversized numerals do the emotional work. Density is low-to-medium (long-form, single-column, phone-width). Motion is a single restrained entrance: content rises and settles on `cubic-bezier(.22,1,.36,1)`, never bouncy or theatrical. The overall impression: considered, grounded, expensive in its restraint.

Each app is scoped to **one archetype** and wears exactly **one accent**. Neutrals, type, logo, spacing, and motion are shared verbatim across all surfaces; only the accent triplet swaps.

---

## 2. Colors — Palette & Roles

### Shared neutrals (identical across every app — source of truth)
- **Clay / Primary** (#A84A30) — Brand terracotta. Alerts and "not done yet" reminder banners only. NOT an archetype accent.
- **Clay Light / Sec** (#D4856A) — Reserved tint of the clay; sparingly.
- **Slate / Acc** (#5C5470) — Neutral state hue. Used for the *Dorsal Vagal / hypoarousal* state, never as a brand accent.
- **Cream Canvas** (#FAF6F2) — Primary background. Warm, never blue-white.
- **Surface White** (#FFFFFF) — Card and input fill.
- **Espresso Ink** (#3A2018) — Primary text. Never pure black.
- **Muted Brown** (#6B5B52) — Body copy, descriptions, supporting lines.
- **Taupe** (#A69890) — Tertiary text, captions, placeholders, hairline color (`{tx}12`–`{tx}` mixes).
- **Clay Fill** (#F5E8E1) — Warm tint surface (hyperarousal zone, soft callouts).

### Archetype accents (one per app — locked, do not substitute)
- **Regulator — Teal** (#2C6E6A) · tint **#E0EFED** · deep **#1A4A47** → Nervous System Reset Guide
- **Rooted — Green** (#5A7F3C) · tint **#ECF2E6** · deep **#3D5A28** → 7-Day Foundation Tracker
- **Reclaimer — Rose** (#8B3A4A) · tint **#F5ECF0** · deep **#6B2A38** → Boundary Journal

Each accent ships as a triplet: **base** (eyebrows, numerals, streak, active controls, focus rings), **light** (callout backgrounds, "checked-in" banners, hover fills), **deep** (button hover / pressed).

### Banned colors
- Pure black (#000000) — always Espresso Ink.
- Any accent outside the three locked archetype hues. No purple/violet "AI" gradients.
- Mixing two archetype accents on one surface.
- Hardcoded hexes in new code — reference the `B` token object.

## 3. Typography
- **Display — `Cormorant Garamond`** (serif). Weights 400–700. The entire expressive voice: mastheads, eyebrow labels (italic), list numerals (italic), pull-quote mantras (italic), the giant streak numeral. Tight leading (`.8`–`.96`), negative tracking on large sizes (`-1` to `-3`).
  > Note: Impeccable/Stitch generically bans Garamond-class serifs. LoveLarice **overrides** this — Cormorant Garamond is the locked brand face. The ban does not apply here.
- **Body — `Outfit`** (sans). Weights 300–700. All running copy, UI labels, buttons, captions, uppercase eyebrow sub-labels. Leading `1.6`–`1.8`.
- **Scale (fluid, phone-first):**
  - Masthead headline: `clamp(40px, 13vw, 58px)`, weight 600, line-height `.96`
  - Streak numeral: `clamp(72px, 24vw, 108px)`, weight 600, line-height `.8`
  - Section eyebrow (Lbl): serif italic 20px on a 26px hairline
  - List numerals (`01`–`04`): serif italic 30px
  - Mantra pull-quotes: serif italic 24px
  - Body: 15px · supporting/caption: 13px · micro-eyebrow (uppercase Outfit): 11–13px, letter-spacing 2–2.5
- **Casing:** Headlines sentence case. Micro-eyebrows and footer lines UPPERCASE with wide tracking.

## 4. Elevation & Depth
Flat and paper-like. Hierarchy comes from hairlines and negative space, not shadow.
- **No drop shadows anywhere.** Depth is communicated by a 1px hairline (`{accent}12`–`{accent}20`) and the cream/white surface contrast.
- **Hairline rules** (`1px solid {tx}12`) separate editorial list rows and bracket the streak block (top + bottom rule).
- **Surface cards** (white fill, `borderRadius:10–12`, 1px accent-tint border) are reserved for *interactive containers only*: input groups, the breath-timer stage, the NS-diagram frame.
- **Callout panels** use an accent-light fill (`{accent}L`) with a faint accent border — for "why this works" / "the rule" / window-of-tolerance explainers.
- Corner radius scale: inputs/checkboxes 6–10, cards 10–12. No pill shapes on content.

## 5. Components
- **Logo** — `Nerve_Branch_Woman_Logo-11.svg`, injected via `dangerouslySetInnerHTML`. Container `width:500 / maxWidth:100% / margin:0 auto / overflow:hidden`; SVG `width` forced to `100%`, `height` removed, `viewBox="0 110 824.88 110"` (crops to the wordmark band). Centered at top of every app.
- **Masthead** — Centered. Serif headline with the second line in accent italic; one supporting line in Muted Brown (`maxWidth:400, margin:0 auto`). Optional centered serif-italic kicker (e.g. "Day 3 — of seven").
- **Section label (`Lbl`)** — Serif italic 20px accent text preceded by a 26px / 1px accent hairline, baseline-aligned. Replaces uppercase micro-eyebrows for section headers.
- **Editorial list row** — Flat row: large serif-italic numeral (`01`+) in accent, title in Espresso, description in Muted Brown, separated by `{tx}12` hairlines. Used for foundations, journal questions, NS states.
- **Reminder banner** — Full-width rounded bar. Not-done state: Clay (#A84A30) fill, white text, pulsing dot. Done state: accent-light fill, accent text + accent dot.
- **Checkbox** — 28px square, 6px radius, 2px border; accent fill + white check when done.
- **Text input / textarea** — White fill, 1px accent-tint border, 10px radius; border brightens to full accent on focus. Label/eyebrow sits above.
- **Primary button** — Accent fill, white text, weight 600, 8px radius; hover → accent-deep. (CTA blocks, e.g. the Tracker's "Rooted Reset Challenge Kit," use an accent-filled card.)
- **Streak block** — Signature moment. Oversized serif numeral + two-line uppercase Outfit caption, bracketed top and bottom by hairlines.
- **Mantra pull-quotes** — Serif italic 24px lines separated by hairlines.
- **Breath timer (NS Reset)** — White card stage; animated circle (accent border, scales with in/out breath), count numeral, phase label.
- **NS-states diagram** — Stacked-zone SVG: **Hyperarousal** (clay tint, "FIGHT ↑"), **Window of Tolerance** (teal tint, regulated center, "SAFE ZONE"), **Hypoarousal** (slate tint, "FREEZE ↓"). Appears in the NS Reset Guide and the Regulation Mastery Kit. Treat as a shared, locked component.
- **Footer** — Centered uppercase tracked tagline + `@lovelarice` handle.

## 6. Do's and Don'ts

### Do's
- Do scope each app to one archetype and one accent triplet; keep neutrals, type, logo, and motion identical across all surfaces.
- Do let Cormorant Garamond carry the drama (masthead, eyebrows, numerals, streak, mantras); keep Outfit quiet.
- Do separate content with hairlines and whitespace; reserve white cards for interactive containers only.
- Do reference the `B` token object for every color — including inside SVGs.
- Do center mastheads; keep section bodies left-aligned editorial.
- Do use the single `cubic-bezier(.22,1,.36,1)` rise for entrances, with small staggered delays.
- Do use Clay (#A84A30) strictly for "not yet / attention" reminders.

### Don'ts
- Don't introduce a fourth accent or mix two archetype accents on one surface (Slate #5C5470 is a *state* color, not a brand accent).
- Don't add drop shadows, glows, pill content, or rounded "3 equal cards" feature rows.
- Don't hardcode hex values in components or SVGs — drift from the `B` object is a bug.
- Don't use pure black or blue-white; stay on Espresso Ink and Cream Canvas.
- Don't let the Clay reminder color leak into archetype-accent roles (or vice versa).
- Don't apply the generic "no serif / no Garamond" rule here — Cormorant Garamond is locked brand.
- Don't use `ease`/`linear`/bouncy easings for entrances; one settle curve only.
- Don't leave decorative dividers, banners, or list styles inconsistent between the three apps.
