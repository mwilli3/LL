# DESIGN.md

Design tokens and conventions for LoveLarice Wellness. Sourced from `preview/index.html` and `sections/lovelarice-home.liquid`, which are the canonical brand surfaces. Any new surface defers to these tokens before introducing its own.

## Color

Tinted neutrals on a cream base. Every color is warmed toward the brand hue; nothing is a pure cool gray and nothing is `#000` or `#fff`.

| Token         | Hex       | Role                                                   |
|---------------|-----------|--------------------------------------------------------|
| `cream`       | `#f7f5f2` | Default page surface.                                  |
| `warm-beige`  | `#eae3dc` | Alternate section surface, pattern-insight blocks.     |
| `taupe`       | `#cbb8a9` | Hairlines, low-emphasis text, decorative rules.        |
| `warm-brown`  | `#a47c63` | Primary action, eyebrow text, hover accents.           |
| `gold`        | `#c6a77d` | Editorial rules, scroll progress, restrained accent.   |
| `dark-brown`  | `#4a3a32` | Inverted surfaces (offer block, footer), body text.    |
| `near-black`  | `#2b2b2b` | Display type when contrast is needed.                  |

**Archetype accents** (analytical use only, never drenched surfaces):

| Token | Hex       | Pillar              |
|-------|-----------|---------------------|
| `reg` | `#2C6E6A` | Regulated Living    |
| `root`| `#5A7F3C` | Rooted Wellness     |
| `rec` | `#8B3A4A` | Reclaimed Power     |

**Color strategy:** Restrained on most surfaces (cream + dark-brown text + ≤10% warm-brown/gold accent). Committed only on the offer block (dark-brown surface, ~60% of the card). Never Drenched. Never Full Palette.

## Typography

Two families, both Google Fonts, both with `display=swap`:

- **Cormorant Garamond** (`'Cormorant Garamond', Georgia, serif`) — display, italic emphasis, mantras, ritual names, prices. Weights used: 300, 400, 500, 600. Italic 400 and 500.
- **Outfit** (`'Outfit', system-ui, sans-serif`) — body, labels, eyebrows, buttons. Weights used: 300, 400, 500, 600.

**Scale** (fluid, 1.25 ratio between display steps; body fixed for readability):

| Token       | Value                              |
|-------------|------------------------------------|
| eyebrow     | `0.7rem` (uppercase, tracked +0.28em) |
| caption     | `0.85rem`                           |
| body        | `1.05rem` (line-height 1.75)        |
| lede        | `clamp(1.1rem, 1vw + 0.9rem, 1.2rem)` |
| h4          | `clamp(1.25rem, 0.5vw + 1.15rem, 1.4rem)` |
| h3          | `clamp(1.4rem, 0.7vw + 1.25rem, 1.6rem)` |
| h2          | `clamp(2rem, 4vw, 3.1rem)`          |
| display     | `clamp(2.8rem, 6vw, 5.4rem)`        |
| quote       | `clamp(1.45rem, 2.6vw + 0.4rem, 1.95rem)` |

**Letter-spacing:** Cormorant display gets `-0.018em` to `-0.022em` (it sets loose by default). Outfit eyebrows get `+0.22em` to `+0.32em`.

**Emphasis pattern:** the Cormorant `em` inside an `h1` or `h2` shifts to italic, weight 500, color `warm-brown` (or the archetype accent in archetype contexts). This is the brand's single italic move. No bold display.

**Line-length cap:** body copy maxes at 62–65ch. Hard.

**Font features:** `font-feature-settings: "kern","liga","calt"` on body; add `"dlig"` on Cormorant display sizes.

## Layout

- Default mobile content column: 560px max, 24px horizontal padding.
- Spacing rhythm: vary deliberately. Editorial blocks separated by `borderTop: 1px solid taupe55`. Pattern/ritual blocks bleed slightly past the column (`margin: 0 -8px`) and pull back to `0` below 480px (the `.ll-bleed` pattern).
- Cards are the lazy answer. Use them only when they're truly the best affordance: the welcome form card and the dark-brown offer card qualify; the "voice you are building" block qualifies. The "voice you are leaving behind" block deliberately is **not** a card — strike-through stanza on the page surface.
- No nested cards. No identical card grids. No side-stripe borders (full borders, leading numbers, or background tints instead).

## Motion

**Curves** (named):
```
ease-out-quart:   cubic-bezier(0.23, 1, 0.32, 1)
ease-in-out-quint: cubic-bezier(0.77, 0, 0.175, 1)
ease-drawer:      cubic-bezier(0.32, 0.72, 0, 1)
```

**Durations:**
- Micro (focus, button press): 220ms
- Reveal up: 700ms
- Page hover wipes: 380ms
- Breath pacer loop: 11s (4s in, 7s hold, 8s out, collapsed)

**Rules:**
- Only animate `transform`, `opacity`, `clip-path`, `filter`. Never `width`, `height`, `top`, `left`, or anything that triggers layout.
- Wipe-up CTA hover: `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` with the darker surface beneath.
- Active scale feedback on every pressable element: `:active { transform: scale(0.97); }` (smaller for surfaces, 0.985 for large buttons).
- Honor `prefers-reduced-motion: reduce` globally — gentler, not zero: stop looping/entrance movement (animation `0.001ms`, single iteration) but keep short opacity/color transitions (`~200ms`) that aid comprehension. First touch for a nervous-system audience should feel calm, not abruptly snap.

## Components (canonical patterns)

**Eyebrow** (used on every section): horizontal hairline + tracked uppercase Outfit, color matches accent context.
```
<short hairline 22–24px wide>  CORE IDENTITY
```

**Section title**: Cormorant 300, with one `<em>` for emphasis. `text-wrap: balance`.

**Pressable surface**: warm-brown background, cream text, wipe-up dark-brown hover, `active scale 0.97`, focus ring 2px warm-brown offset 3px. On dark surfaces the ring is gold instead.

**Numbered list** (mantras, rituals): italic Cormorant counter in archetype color, 16–18px, `0X` zero-padded. Never a bullet, never a side stripe.

**Hero/reveal**: stagger words or blocks with 60–80ms `transition-delay` increments. IntersectionObserver-gated, `.is-in` class.

## Absolute bans (project-level)

In addition to the impeccable shared bans:

- No leaf, lotus, or chakra glyphs.
- No soft-focus woman photography. (If photography is needed: ask before adding.)
- No green-and-cream watercolor textures.
- No "wellness sans" geometric display fonts (Visby, Aktiv, etc.).
- No emoji in product copy.
- No countdown timers below five minutes of remaining time (urgency feels predatory).

## Surface inventory

Where each pattern lives:

| Surface                        | File                                       |
|--------------------------------|--------------------------------------------|
| Home page (canonical brand)    | `preview/index.html`                       |
| Home section (Shopify)         | `sections/lovelarice-home.liquid`          |
| Archetype quiz (React)         | `larice_archetype_quiz.jsx`                |
| Quiz mobile preview            | `preview/quiz.html`                        |

New surfaces start by importing the color tokens, the type scale, and the easing curves from this file. If something here needs to change, change it in `preview/index.html` first and back-propagate.
