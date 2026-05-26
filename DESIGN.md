# DESIGN.md — TRC redesign system (v2, "bold reimagine")

This is the shared system established on the **Regulation Profile Quiz** (template app) and applied to the other four. Bold visual reimagine; brand color scheme preserved.

## Typography
Two families.
- **Display — `'Young Serif', serif`**: headlines, profile/section names, big numerals, pull-quotes. Earthy, grounded, warm. Single weight (400); scale carries the contrast.
- **UI / body — `'Outfit', sans-serif`**: everything functional — labels, buttons, body copy, options, kickers. Weights 400–800.
- Load both: `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Young+Serif&display=swap`.
- Headline scale uses `clamp()`. Body 15–16px, line-length capped ~68ch. Step ratio ≥1.25.
- Kickers: Outfit, 10–11px, uppercase, letter-spacing .12em. Use sparingly — not above every block.

## Color (OKLCH, brand hues preserved)
Tint every neutral warm; never pure #000/#fff.
- `text`   oklch(0.26 0.03 45)
- `muted`  oklch(0.50 0.02 55)
- `cite`   oklch(0.55 0.02 55)
- `bg`     oklch(0.975 0.008 70)  (warm cream)
- `surface`oklch(0.995 0.004 75)
- `line`   oklch(0.90 0.01 60)    (hairline border)
- **Brand**: terracotta `oklch(0.53 0.12 40)`, clay `oklch(0.68 0.09 44)`, plum `oklch(0.45 0.07 300)`, plum-dark `oklch(0.38 0.06 300)`.
- **Profiles (Committed — the profile color carries the result):**
  - Sensory Seeker (ss): terracotta `oklch(0.53 0.12 40)`  / tint `oklch(0.94 0.035 42)`
  - Sensitive Regulator (sr): plum `oklch(0.45 0.07 300)` / tint `oklch(0.93 0.025 300)`
  - Slow-to-Recover (sto): slate `oklch(0.50 0.035 250)` / tint `oklch(0.93 0.014 250)`

## Signature device — the arc
The three-arc logo is promoted to a structural motif:
- **ArcRing**: circular arc progress in step headers (replaces pill/segment bars).
- **ArcSeal**: large concentric-arc badge as the result/profile emblem (replaces the round letter chip).
- Oversized faint arcs may bleed off-edge as calm background texture.

## Layout
- Mobile-first (phone width; max content ~520px). Boldness comes from type scale, arc motif, and color — not desktop multi-column.
- Vary spacing for rhythm; no uniform padding everywhere.
- Avoid the centered white-card-on-grey template. Prefer open warm-cream surfaces, hairline separators, and a few committed tinted/drenched moments.
- Cards only when they're the right affordance; never identical icon-title-text grids; never nested cards.

## Absolute bans (enforced)
- **No side-stripe borders** (`borderLeft/right` ≥1px as accent). The old "A note" stripe → tinted block with an oversized Young Serif quote glyph. Callouts → full hairline border or background tint.
- No gradient text, no decorative glassmorphism, no hero-metric template, no identical card grids, no em dashes in copy.

## Motion
- Page-load: staggered `fadeUp` (opacity + small translateY), `animationDelay` per block.
- Transitions: ease-out-expo `cubic-bezier(0.16,1,0.3,1)`. No bounce/elastic. Never animate layout properties.
- Expand/collapse: animate opacity/transform, not height jumps.

## Artifact contract
Single-file React component, default export, inline styles, `useState`/`useEffect` only, fonts via `<link>`, optional `window.storage`. No external deps.
