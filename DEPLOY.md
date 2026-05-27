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
4. **Do NOT** touch domain/HTTPS config (already verified). Do not reconnect the repo.

## TODOs / confirmations
- **Shopify product handles** in `src/lib/gate.js` were taken from the quiz's own
  purchase CTAs: `regulation-mastery-kit`, `rooted-reset-challenge-kit`,
  `boundary-mastery-kit`. Confirm these are the live handles.
- Confirm the three `*_PRODUCT_TITLE` env values.

## Notes
- The AI function is named **`analyze.js`** (not `ai-proxy.js`) because the apps call
  `/.netlify/functions/analyze`. Same role (Anthropic proxy, key server-side).
- `verify-purchase.js` accepts `{ email, app }` (from `gate.js`) **and** `{ email, product }`
  (used by each paid app's own built-in gate), and **fails closed** (`{verified:false}`)
  if Shopify env is missing or the lookup errors.
- Each paid app also ships its own styled email gate. `gate.js` writes that app's
  `verified` localStorage key on success, so buyers are asked **once** (the gate.js
  prompt), not twice. If you'd rather use the app's styled gate instead of the
  `window.prompt`, that's a small follow-up — the verify function already supports it.
- Local proof: `npm install && npm run build` emits all 8 HTML entries; `npm run preview`
  shows free routes rendering and paid routes hitting the gate (redirecting, since there's
  no real purchase locally — expected).
