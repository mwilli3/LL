# LoveLarice Apps — Deploy (Vite multi-app → Netlify)

One Vite project builds seven React apps to `dist/` and deploys to Netlify
(`apps.lovelarice.com`). Free apps load for anyone; paid apps gate on a Shopify
purchase check and redirect non-buyers to the product page.

## Routes
| Path | App | Source | Access |
|---|---|---|---|
| `/quiz` | Archetype Quiz | `apps/archetype-quiz.jsx` | free (first touch) |
| `/calm` | NS Reset Guide | `apps/ns-reset-guide.jsx` | free |
| `/rooted` | 7-Day Foundation Tracker | `apps/foundation-tracker.jsx` | free |
| `/reclaim` | Boundary Journal | `apps/boundary-journal.jsx` | free |
| `/regulation-mastery` | Regulation Mastery Kit | `apps/regulation-mastery.jsx` | **gated** |
| `/rooted-challenge` | Rooted Reset Challenge Kit | `apps/rooted-challenge.jsx` | **gated** |
| `/boundary-mastery` | Boundary Mastery Kit | `apps/boundary-mastery.jsx` | **gated** |

`index.html` is a simple landing linking to all of the above.

## Handoff steps (human)
1. **Merge `deploy/larice-apps` → `main`** and point the Netlify "lovelarice" site at `main`.
2. **Netlify UI build settings** — set these (and CLEAR any auto-detected UI overrides so `netlify.toml` wins):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: *(repo root — leave blank)*
   - Functions directory: `netlify/functions`
3. **Environment variables** (Site config → Env):
   - `ANTHROPIC_API_KEY` — for the AI analysis proxy (`netlify/functions/analyze.js`).
   - `SHOPIFY_STORE_DOMAIN` — e.g. `lovelarice.myshopify.com`.
   - `SHOPIFY_ACCESS_TOKEN` — Admin API token with **`read_orders`** (Larice store).
   - `REGULATION_MASTERY_PRODUCT_TITLE`
   - `BOUNDARY_MASTERY_PRODUCT_TITLE`
   - `ROOTED_CHALLENGE_PRODUCT_TITLE`
   The `*_PRODUCT_TITLE` values must match the exact Shopify product titles so
   `verify-purchase.js` can match order line items.
   - `VITE_POSTHOG_KEY` — PostHog project API key for the quiz analytics
     (`apps/analytics.js`). **Build-time** var (Vite inlines `VITE_*`), so it must be
     present at build; the quiz silently disables analytics if it's unset.
     Optional `VITE_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`).
   - `VITE_KLAVIYO_PUBLIC_KEY` — Klaviyo **public** company_id (e.g. `abc123`).
     **Build-time** var. Used by the free-app email gate (`apps/email-gate.jsx`) and
     by the quiz reveal to call Klaviyo Client Subscriptions. If unset, the gate
     grants access without subscribing (logged warning); the quiz silently skips
     the list subscribe.

   **Klaviyo list mapping** (per-app archetype lists, single opt-in):
   | App / Route | Source tag | Klaviyo list ID |
   |---|---|---|
   | CALM (`/calm`) | `calm` | `XpHLZZ` (Regulator) |
   | ROOTED (`/rooted`) | `rooted` | `WZKZmK` (Rooted) |
   | RECLAIM (`/reclaim`) | `reclaim` | `RdVj9G` (Reclaimer) |
   | QUIZ (`/quiz`) | `quiz` | routed by result: `reg→XpHLZZ`, `root→WZKZmK`, `rec→RdVj9G` |

   Each subscription includes a `source_app` profile property so flows can
   segment by entry point.
4. **Do NOT** touch domain/HTTPS config (already verified). Do not reconnect the repo.

## TODOs / confirmations
- **Shopify product handles** are set in each paid app's `verifyPurchase()`
  (`apps/regulation-mastery.jsx`, `apps/boundary-mastery.jsx`,
  `apps/rooted-challenge.jsx`), taken from the quiz's own purchase CTAs:
  `regulation-mastery-kit`, `rooted-reset-challenge-kit`, `boundary-mastery-kit`.
  Confirm these are the live handles.
- Confirm the three `*_PRODUCT_TITLE` env values.

## Notes
- The AI function is named **`analyze.js`** (not `ai-proxy.js`) because the apps call
  `/.netlify/functions/analyze`. Same role (Anthropic proxy, key server-side).
- **Gating lives in each paid app's own styled gate screen** (`verifyPurchase()`), not a
  pre-mount prompt. On load the paid app mounts and shows its email-entry gate; on submit
  it POSTs `{ email, app }` to `/.netlify/functions/verify-purchase`. On success it caches
  access (`larice_access_<app>` + the app's verified key) and renders; on a non-match **or
  any error it redirects to the Shopify product page (fails closed)**. Returning buyers skip
  the gate via the cached verified key.
- `verify-purchase.js` accepts `{ email, app }` **and** `{ email, product }`, and **fails
  closed** (`{verified:false}`) if Shopify env is missing or the lookup errors.
- Local proof: `npm install && npm run build` emits all 8 HTML entries; `npm run preview`
  shows free routes rendering, and paid routes showing the styled gate → submitting an email
  redirects to Shopify (no real purchase / no function locally — expected, fails closed).
