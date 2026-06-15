# Product: Larice CEO Operating System

**Skill:** impeccable · **Register:** product (design SERVES the task)
**Scope:** the private founder review journal at `/journal`. NOT the customer-facing LoveLarice / Regulated Child / BdyAlign suite — those have their own register and are documented in `DESIGN.md`.

This file describes the Larice CEO layer: Marisa's private command center. It's an internal tool, not a consumer brand surface, and it lives behind a password gate. Design choices here serve a single power-user in a high-density daily workflow; they should not match the customer apps and should not be confused with them.

---

## Users

There is one user: Marisa.

She runs a bootstrapped multi-brand wellness/education company (LoveLarice consumer apps, BdyAlign supplements, The Regulated Child) while completing a doctorate. The schedule is governed by a 35-hour weekly cap. The journal is the surface where she runs the business: daily check-ins, weekly/monthly/quarterly reviews, communication drills, 5-year roadmap, AI synthesis of patterns across reviews.

She opens this tool **multiple times a day on multiple devices**, often in 5–15 minute slots between deep-work blocks. She is fluent in product UI — uses Notion, Linear-style tools, dashboards — and will pause at strangeness. Familiarity is a feature. The tool should disappear into the task; she should not have to think about the interface.

Tabs in the current build: Today · Plan · Train (Reset practices · Communication) · Reviews (Weekly · Monthly · Quarterly) · Roadmap · Dashboard.

## Product purpose

A single private surface that holds:

1. The daily action loop (movement, steps, 5/day reset practices, daily focus, daily win).
2. The review cadence at three altitudes (Weekly tactical, Monthly strategic, Quarterly architectural).
3. The communication-mastery practice log (drills, recorded talks scored on a rubric, weekly reps).
4. The 5-year roadmap and current-phase exit criteria.
5. AI synthesis of the most recent review and pattern detection across recent reviews.
6. A live-metrics pull from Shopify + Klaviyo (when the MCP auth is wired) and a Notion export for the review log.

The system rules baked into the tool — and that the design must reinforce — include: never carry the same bottleneck two weeks running without naming why; one bottleneck per week, one resolving action; never let the 35-hour cap break two quarters in a row; the action precedes the streak (action first, reward after).

## Voice and tone

A calm, exacting strategic advisor. Direct. Specific. Grounded. Never motivational-guru, never generic, never therapist. The AI synthesis prompt in the codebase makes this explicit: it avoids the words *journey, healing, transformation, proven* — those are the tells of the category Marisa is trying to avoid by tone. The same anti-references should govern UI copy.

Acceptable: "Bottleneck repeats from last week. Name why before logging another."
Not acceptable: "Take a deep breath and reflect on your journey this week."

## Anti-references

The journal is **not** any of these, and surface decisions should resist drift toward them:

- Wellness-app pastel cliché. Soft round cards, mint and lavender, hand-drawn icons. The Larice palette is warm and editorial on purpose — taupe, clay, brown, gold, off-white — to signal *founder's tool*, not *consumer wellness app*.
- The motivational-guru / coaching-platform aesthetic. No "you've got this," no peppy progress chrome.
- SaaS-cream dashboard with gradient hero metrics. No big-number-over-small-label hero cliché, no SaaS hero gradient accent.
- The LoveLarice consumer suite. Same type pair (Cormorant Garamond + Outfit) is intentional — Marisa's hand is consistent across brands — but the palette and density must read as a *separate, more private surface.* If someone looking at CALM would mistake this for "another LL app," it's failed.

## Strategic principles

- **Density is allowed and often correct.** This is a power user in a task. Information-dense screens beat split-screen wizards. Tables, lists, side-by-side panels are fine when the user reads them every day.
- **Familiarity is a feature.** Standard nav, tab bars, form patterns. Reinventing affordances for flavor is a regression.
- **Action precedes reward.** Every surface that captures input should put the action on top and the streak/score/output below it. The tool already does this; design must protect it.
- **Three altitudes.** Tactical (week) / Strategic (month) / Architectural (quarter) is the spine of the review system. Visual hierarchy should signal which altitude the user is currently at without re-reading the label.
- **Single-device persistence today, sync optional later.** Don't add UI for sync that doesn't exist; don't add multi-user affordances; don't show a user avatar.
- **The Larice palette is locked.** Off-white, sand, taupe, clay, brown, gold, charcoal — these are the only colors. No archetype accents from the customer suite leak in.

## Register

**product** — this is an authenticated internal tool the user lives inside. The full [reference/product.md](.agents/skills/impeccable/reference/product.md) applies: system-font legitimacy, predictable grids, state-rich semantic colors, motion that conveys state (150–250 ms), familiarity over surprise.

The one register override: Cormorant Garamond + Outfit is the locked Larice type pair and replaces the product-register default of "one well-tuned sans." Cormorant carries display moments (mastheads, review section titles, the streak numeral) only; Outfit carries everything else (running copy, labels, buttons, data). Do not use Cormorant for labels, buttons, or table data.
