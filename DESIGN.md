# Design System: LoveLarice Wellness App Suite
**Skill:** impeccable · **Register:** brand (design IS the product)
**Suite:** one free entry app + one paid depth app per archetype. The free app converts to its paid counterpart through the Day-3 AI insight CTA.

| Archetype | Accent | Free app | Paid app |
|---|---|---|---|
| Regulator | Teal `#2C6E6A` | Nervous System Reset Guide | Regulation Mastery Kit |
| Rooted | Green `#5A7F3C` | 7-Day Foundation Tracker | Rooted Reset Challenge Kit |
| Reclaimer | Rose `#8B3A4A` | Boundary Journal | Boundary Mastery Kit |

Every app — free or paid — is built from the same tokens, type, logo, motion, and recurring components below. Only the archetype accent swaps. Free apps run a 7-day protocol; paid apps run a 30-day protocol with tabs, a live AI analysis, and a purchase gate (see §5 paid-tier components).

---

## 1. Overview — Visual Theme & Atmosphere
Warm, editorial, clinical-but-tender — like a printed wellness journal. A cream page, deep espresso ink, one archetype accent per surface, and a Cormorant Garamond display voice that carries all the drama while Outfit keeps the UI quiet. Density is low-to-medium (long-form, single-column, phone-width). Motion is a single restrained entrance: content rises and settles on the `--ease-out` curve (`cubic-bezier(0.23,1,0.32,1)`) with small staggered delays — never bouncy or theatrical. The impression: considered, grounded, expensive in its restraint.

**Motion source of truth:** [`tokens/motion-tokens.css`](tokens/motion-tokens.css) and [`tokens/motion-tokens.ts`](tokens/motion-tokens.ts) (derived from the emil-design-eng skill) define all easing + durations, shared with the LoveLarice website. These apps are the **"occasional" tier** (opened <10×/day), so standard animation is correct: real entrance reveals (`--dur-reveal`), modals/drawers at normal timing, and genuine delight reserved for rare/first-time moments (archetype reveal, streak completion). Do **not** animate micro-actions a user repeats in one session (a tracker checkbox gets instant press feedback only). Primary buttons use `.pressable` (scale `0.97` on `:active`) for "the UI heard you"; every app honors `prefers-reduced-motion` (gentler, not zero) — important for a nervous-system audience.

Each app is scoped to **one archetype** and wears exactly **one accent triplet**. Neutrals, typography, logo, spacing, motion, and the recurring components are shared verbatim across the entire suite.

## 2. Colors — Palette & Roles

### Shared neutrals (identical across every app — source of truth)
- **Clay / Primary** (#A84A30) — Brand terracotta. The "attention / not-yet" color: reminder banners only. NOT an archetype accent.
- **Clay Soft / Sec** (#D4856A) — Reserved warm tint of the clay.
- **Slate / Acc** (#5C5470) — Neutral state hue (Dorsal Vagal / hypoarousal). Never a brand accent.
- **Slate Light / AccL** (#EEEDF5) — Hypoarousal zone tint. *(Newly named token — previously hardcoded in the NS-states SVG.)*
- **Cream Canvas** (#FAF6F2) — Primary background. Warm, never blue-white.
- **Surface White** (#FFFFFF) — Card and input fill.
- **Espresso Ink** (#3A2018) — Primary text. Never pure black.
- **Muted Brown** (#6B5B52) — Body copy, descriptions, supporting lines.
- **Taupe** (#A69890) — Tertiary text, captions, placeholders, hairlines (`{tx}12`–`{tx}` mixes).
- **Clay Fill** (#F5E8E1) — Warm tint surface; doubles as the hyperarousal zone tint.

### Archetype accents (locked — do not substitute)
- **Regulator Teal** (#2C6E6A) · light **#E0EFED** · deep **#1A4A47** → Nervous System Reset Guide + Regulation Mastery Kit
- **Rooted Green** (#5A7F3C) · light **#ECF2E6** · deep **#3D5A28** → 7-Day Foundation Tracker + Rooted Reset Challenge Kit
- **Reclaimer Rose** (#8B3A4A) · light **#F5ECF0** · deep **#6B2A38** → Boundary Journal + Reclaimer paid app

### Token contract (shared accent key — applies to every app)
Each app exposes its accent under **one shared key set**, not a per-archetype name. Use `accent` / `accentL` / `accentD` (never `grn`/`rose`/`teal`). This is what makes the recurring components portable across the suite. Per app: `accent` = the archetype base, `accentL` = light tint, `accentD` = deep.

### NS-states diagram zone tokens
- Hyperarousal zone → `fill` (#F5E8E1) with Clay stroke
- Window of tolerance → `accentL` (Regulator teal #E0EFED) with `accent` stroke
- Hypoarousal zone → `accL` (#EEEDF5) with Slate stroke

### Banned colors
- Pure black (#000000) — always Espresso Ink.
- Any accent outside the three locked archetype hues; no purple/violet "AI" gradients.
- Mixing two archetype accents on one surface.
- Hardcoded hex literals in components or SVGs — every color references the `B` token object.

## 3. Typography
Cormorant Garamond carries the entire expressive voice — mastheads, italic eyebrow labels, italic list numerals, italic mantra pull-quotes, and the giant streak numeral. Outfit stays quiet for all running copy and UI chrome. Headlines are sentence case with tight leading and negative tracking; micro-eyebrows and footer lines are uppercase with wide tracking.

- **Display (Cormorant Garamond):** serif, weights 400–700. All headlines, eyebrows, numerals, mantras, streak. Tight leading (`.8`–`.96`), negative tracking on large sizes.
- **Body (Outfit):** sans, weights 300–700. All running copy, UI labels, buttons, captions, uppercase sub-labels. Leading `1.6`–`1.8`.

### Hierarchy
- **Masthead** (Cormorant, 600, clamp(40px,13vw,58px), line-height .96, tracking -1): centered hero; second line in accent italic.
- **Streak numeral** (Cormorant, 600, clamp(72px,24vw,108px), line-height .8, tracking -3): the signature figure.
- **Section eyebrow / Lbl** (Cormorant italic, 600, 20px): on a 26px hairline.
- **List numeral** (Cormorant italic, 600, 30px): row markers `01`–`04`.
- **Mantra pull-quote** (Cormorant italic, 600, 24px): hairline-separated.
- **Body** (Outfit, 400, 15px, line-height 1.7): running copy.
- **Supporting / caption** (Outfit, 400–500, 13px): descriptions, notes.
- **Micro-eyebrow** (Outfit, 600, 11–13px, uppercase, tracking 2–2.5): banner labels, footer, streak caption.

> Note: Impeccable/Stitch generically bans Garamond-class serifs. LoveLarice **overrides** this — Cormorant Garamond is the locked brand face and the ban does not apply.

## 4. Elevation & Depth
Flat and paper-like. Hierarchy comes from hairlines and negative space, not shadow.
- **No drop shadows or glows anywhere.** Depth = a 1px hairline (`{accent}12`–`{accent}20` or `{tx}12`) plus cream/white surface contrast.
- **Hairline rules** separate editorial list rows and bracket the streak block (top + bottom rule).
- **Surface cards** (white fill, radius 10–12, 1px accent-tint border) are reserved for *interactive containers only*: input groups, the breath-timer stage, the NS-diagram frame.
- **Accent-filled card** (solid `accent` fill, white text) is reserved for the Day-3 AI insight / paid CTA block.
- **Callout panels** use `accentL` fill + faint accent border for explainer blocks ("why this works", "the rule", "window of tolerance").
- Corner radius scale: checkboxes/inputs 6–10, cards 10–12. No pill shapes on content.

## 5. Components

### Logo
`Nerve_Branch_Woman_Logo-11.svg`, injected via `dangerouslySetInnerHTML`. Container `width:500 / maxWidth:100% / margin:0 auto / overflow:hidden`; SVG `width` forced to `100%`, `height` removed, `viewBox="0 110 824.88 110"` (crops to the wordmark band). Centered at the top of every app.

### Masthead
Centered. Serif headline with the second line in accent italic; one supporting line in Muted Brown (`maxWidth:400, margin:0 auto`). **No decorative divider.** The **day index is the masthead kicker** — a centered serif-italic line "Day {n} of seven" (free) or "Day {n} of thirty" (paid) sitting above the headline. This is the single canonical location for the day index in every app. Paid apps split the product name across two headline lines (line 2 in accent italic), e.g. "Regulation / *Mastery Kit*"; an optional small uppercase sub-line under the kicker carries phase context (e.g. "Week 1 · Notice").

### Section label (`Lbl`)
Serif italic 20px accent text preceded by a 26px / 1px accent hairline, baseline-aligned. Replaces uppercase micro-eyebrows for section headers.

### Editorial list row (standard list pattern)
Flat row: large serif-italic numeral (`01`+) in `accent`, title in Espresso, description in Muted Brown, rows separated by `{tx}12` hairlines. **This is the standard list component** — used for foundations, journal questions, NS states, and reset practices. Cards are not used for content lists.

### Action header with status (recurring)
Every app leads with its primary daily action, not a passive notice. The action's section header carries a live status on the right: a small uppercase Outfit count (`{accent}` when in progress, brightening to `accent` at completion) reading `"{n} of {total}"`, `"Complete ✓"`, or `"Optional"` for the journals. This replaces the old "you haven't checked in today" reminder banner, which is **retired across the suite** — the action now states its own status. (Clay `#A84A30` is therefore no longer used for a banner; it remains the diagram's hyperarousal/alert hue only.)

### Streak counter (recurring)
The completion reward, shown **right after the primary action** (single-screen apps) so finishing reveals progress.
- **Single-screen apps (free):** oversized Cormorant numeral (`clamp(64px,20vw,92px)`, 600, line-height .8) beside a two-line uppercase Outfit caption (line 1 "consecutive"; line 2 archetype-voiced — "days rooted" / "nights held" / "days regulated"), with an optional serif-italic "Day {n} of seven" line. **Center-aligned**, bracketed top and bottom by `{tx}12` hairlines.
- **Tabbed apps (paid):** a compact centered reward strip — `clamp`-free 46px serif numeral + a wrapped uppercase caption — placed **under the masthead, above the tabs**, so the streak is visible on first paint regardless of active tab. Same hairline brackets.

### Day-3 AI insight block + paid CTA (recurring)
Appears once the protocol reaches **day 3**. An **accent-filled card** (`accent` fill, white text, radius 12):
- Eyebrow: uppercase Outfit, 10–11px, tracking 3, `rgba(255,255,255,.5)` — e.g. "Your first pattern".
- Insight body: Outfit 13–15px, `rgba(255,255,255,.85)` — one AI-generated observation drawn from the user's logged data (not a generic tip).
- Paid CTA: one white-filled button, `accent` text, weight 600, routing to this archetype's paid app (Regulator→Regulation Mastery Kit, Rooted→Rooted Reset Challenge Kit, Reclaimer→Boundary Mastery Kit). Hover: `-1px translateY`. Maximum one CTA; no secondary link.
- Every app gets exactly one of these; copy and destination vary by archetype, structure does not.

### Checkbox / Inputs
Checkbox: 28px square, 6px radius, 2px border; `accent` fill + white check when done. Text input/textarea: white fill, 1px accent-tint border, radius 10; border brightens to full `accent` on focus; label/eyebrow above.

### Collapsible accordion (recurring)
Demotes rationale, science, and one-time config below the action so first paint is action-first. A `{tx}12` top hairline, a full-width header button (serif-italic `accent` title + a `+`/`−` toggle in `accent`), and tap-to-expand content that rises on the shared curve. Used for "Why this works", "Understand your nervous system", "All reset practices", and "Your targets". Single-screen free apps use accordions for this; tabbed paid apps lean on their tab bar (Research / Insights / Program) for the same separation.

### Starter chips (journals)
Under each empty journal prompt: a small "Start with" row of sentence-stem buttons (`accent` outline, 6px radius — not pills, Outfit 12px). Tapping seeds the stem (minus its ellipsis, plus a trailing space) into the field; the row disappears once the field has any text. Lowers the blank-page cold start in both the free Boundary Journal and paid Boundary Mastery.

### Tab bar (paid)
3 equal pill-outline tabs separating the daily action tab from depth/education tabs. Active: `accent` fill + white text; inactive: `accent` outline + `accent` text. Uppercase Outfit, tracking 1.

### NS-states diagram
Stacked-zone SVG, all colors via tokens (see §2 zone tokens): **Hyperarousal** (`fill`, "FIGHT ↑"), **Window of Tolerance** (`accentL`, regulated center, "SAFE ZONE"), **Hypoarousal** (`accL`, "FREEZE ↓"). Used in the Nervous System Reset Guide and the Regulation Mastery Kit. Treat as a shared, locked component.

### Footer
Centered uppercase tracked tagline + `@lovelarice` handle.

### Paid-tier components
Paid apps (Regulation Mastery / Rooted Reset Challenge / Boundary Mastery Kit) reuse everything above and add:
- **Purchase gate** — full-screen email-entry view shown until verified. Serif display product name (name split, accent-italic line 2), single underline email input (border brightens to `accent` on focus; `pri` on error), one uppercase `accent` "Verify purchase" button. Verification persists to `localStorage`. **Never restyle in a way that breaks the verify/gate logic.**
- **Tab bar** — 3 equal pill-outline tabs (e.g. Track / System / Research). Active tab: `accent` fill + white text; inactive: `accent` outline + `accent` text. Uppercase Outfit, tracking 1.
- **AI analysis block** — one full-width `accent` button ("Audit my foundations" / "Analyze my regulation") that calls the live `/.netlify/functions/analyze` endpoint. Result renders in an `accentL` callout panel (flowing paragraphs, `whiteSpace:pre-wrap`). **Backend contract is fixed — restyle only.** This is the paid payoff that the free apps' Day-3 teaser points toward; paid apps do **not** carry a Day-3 teaser.
- **BdyAlign product-recommendation card** — appears under the AI result. Intentionally uses the **Clay (`pri`/`fill`) accent, not the archetype accent**, to signal it's a cross-brand commerce module. Serif product name, Muted-Brown description, clay "Learn more" link to `bdyalign.com`, clay price. Driven by a pattern tag the AI returns.
- **30-day structures** — weekly habit/regulation audits (ruled rows or progress bars), identity/reflection prompts (accentL callout panels with a textarea), and a flat hairline 30-day summary row of serif numerals (same pattern as the journal stat row).
- **Breath-practice library** — multiple guided practices (extended exhale, box, 4-7-8, physiological sigh) sharing one animated `BreathTimer` (accent ring that scales with the breath; count numeral; phase label).

## 6. Do's and Don'ts

### Do's
- Do scope each app to one archetype and one accent triplet; keep neutrals, type, logo, motion, and recurring components identical across the suite.
- Do expose the accent under the shared `accent`/`accentL`/`accentD` keys so recurring components stay portable.
- Do let Cormorant Garamond carry the drama; keep Outfit quiet.
- Do separate content with hairlines and whitespace; reserve white cards for interactive containers and the accent-filled card for the Day-3 CTA.
- Do reference the `B` token object for every color — including inside SVGs.
- Do center mastheads with no divider; keep section bodies left-aligned editorial; surface the day index only as the masthead kicker.
- Do lead with the daily action and put its status on the action header; reveal the (center-aligned) streak as the reward right after it.
- Do demote rationale, science, and one-time config into collapsible accordions (free) or depth tabs (paid).
- Do give every free app exactly one Day-3 AI insight block routing to its paid counterpart; paid apps deliver the full AI analysis instead.
- Do animate entrances with the `--ease-out` rise (`cubic-bezier(0.23,1,0.32,1)`) plus small staggered delays; pull all easing/duration from `tokens/motion-tokens.*`.
- Do give primary/first-time buttons `.pressable` press feedback, and keep repeated micro-actions (checkboxes) instant; honor `prefers-reduced-motion`.

### Don'ts
- Don't introduce a fourth accent or mix two archetype accents on one surface (Slate #5C5470 is a *state* color, not a brand accent).
- Don't add drop shadows, glows, pill content, decorative dividers, or "3 equal cards" feature rows.
- Don't reinstate a passive "you haven't checked in" reminder banner — the action header carries its own status.
- Don't hardcode hex literals in components or SVGs — drift from the `B` object is a bug.
- Don't use pure black or blue-white; stay on Espresso Ink and Cream Canvas.
- Don't let Clay (`#A84A30`) leak into archetype-accent roles, or vice versa.
- Don't apply the generic "no serif / no Garamond" rule here — Cormorant Garamond is locked brand.
- Don't use `ease`/`linear`/bouncy easings for entrances; one settle curve only.
- Don't surface the day index in more than one place, or render content lists as cards.
