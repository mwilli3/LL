// purchase.js — shared purchase-allowlist check.
// Used by /functions/verify-purchase (the explicit gate) AND by the v2
// path in /functions/analyze (server-side re-verification on every call).
//
// Checks three sources, in order:
//   1. Netlify Blobs "purchases" store — populated by shopify-order-webhook
//      on every paid order from Shopify.
//   2. purchases-backfill.json — past orders seeded once.
//   3. ALLOWED_EMAILS env var — manual override (comma-separated).

const fs = require("node:fs");
const path = require("node:path");
const { getStore } = require("@netlify/blobs");

function purchasesStore() {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (siteID && token) return getStore({ name: "purchases", siteID, token });
  return getStore("purchases");
}

// App slug ↔ env var carrying the matching Shopify product title.
const APP_TITLE_ENV = {
  "regulation-mastery": "REGULATION_MASTERY_PRODUCT_TITLE",
  "boundary-mastery":   "BOUNDARY_MASTERY_PRODUCT_TITLE",
  "rooted-challenge":   "ROOTED_CHALLENGE_PRODUCT_TITLE",
};

// The v2 analyze flow uses "-kit" suffixes for its config keys. Map them
// back to the canonical app slugs the purchase allowlist is keyed by.
const KIT_TO_APP = {
  "regulation-kit": "regulation-mastery",
  "rooted-kit":     "rooted-challenge",
  "boundary-kit":   "boundary-mastery",
};

let backfill = { emails: {} };
try {
  backfill = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "purchases-backfill.json"), "utf8"));
} catch {
  // Missing file is fine -> Blobs + env override still work.
}

function resolveApp(input) {
  // Explicit app slug (canonical or -kit variant).
  if (input.app) {
    if (APP_TITLE_ENV[input.app]) return input.app;
    if (KIT_TO_APP[input.app]) return KIT_TO_APP[input.app];
  }
  // Or resolve from a product title needle.
  const product = (input.product || "").trim().toLowerCase();
  if (!product) return null;
  for (const [app, envKey] of Object.entries(APP_TITLE_ENV)) {
    const title = (process.env[envKey] || "").trim().toLowerCase();
    if (title && product.includes(title)) return app;
  }
  return null;
}

// Returns { verified: boolean, app: string|null } so callers can log/branch
// on the resolved app slug. Failures are silent (verified: false) — the
// caller decides whether to expose specifics in the response.
async function checkPurchase(input) {
  const email = (input.email || "").trim().toLowerCase();
  const app = resolveApp(input);
  if (!email || !app) return { verified: false, app };

  // 1. Live webhook allowlist (Netlify Blobs).
  try {
    const rec = await purchasesStore().get(email, { type: "json" });
    if (rec?.apps?.includes(app)) return { verified: true, app };
  } catch {
    // Blobs not configured yet -> fall through.
  }

  // 2. Backfilled past orders.
  const seeded = backfill?.emails?.[email];
  if (Array.isArray(seeded) && seeded.includes(app)) return { verified: true, app };

  // 3. Manual env-var override.
  const allowed = (process.env.ALLOWED_EMAILS || "")
    .toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
  if (allowed.includes(email)) return { verified: true, app };

  return { verified: false, app };
}

module.exports = { checkPurchase, APP_TITLE_ENV, KIT_TO_APP };
