// verify-purchase.js — confirm a buyer is allowed into a paid LoveLarice app.
//
// Self-contained on purpose — Netlify's esbuild bundler does not reliably
// resolve the `_lib/` subdirectory at runtime, so the shared library was
// inlined back into each function that needs it (here and in analyze.js).
// The duplication is small (~30 lines) and removes a class of deploy bugs.
//
// Checks three sources, in order:
//   1. Netlify Blobs "purchases" store — populated by shopify-order-webhook
//      on every paid order from Shopify.
//   2. purchases-backfill.json — past orders seeded once.
//   3. ALLOWED_EMAILS env var — manual override (comma-separated).

const { getStore } = require("@netlify/blobs");

function purchasesStore() {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (siteID && token) return getStore({ name: "purchases", siteID, token });
  return getStore("purchases");
}

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
  backfill = require("./purchases-backfill.json");
} catch {
  // Missing file is fine -> Blobs + env override still work.
}

function resolveApp(input) {
  if (input.app) {
    if (APP_TITLE_ENV[input.app]) return input.app;
    if (KIT_TO_APP[input.app]) return KIT_TO_APP[input.app];
  }
  const product = (input.product || "").trim().toLowerCase();
  if (!product) return null;
  for (const [app, envKey] of Object.entries(APP_TITLE_ENV)) {
    const title = (process.env[envKey] || "").trim().toLowerCase();
    if (title && product.includes(title)) return app;
  }
  return null;
}

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

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const ok = (verified) => ({ statusCode: 200, headers: CORS, body: JSON.stringify({ verified }) });

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return ok(false); }

  const { verified } = await checkPurchase(body);
  return ok(verified);
};

// Exported so analyze.js can re-verify on every call. Both files inline
// their own copy of the implementation above to avoid the Netlify
// Functions subdirectory bundling issue; this export is only relied on
// if some future top-level Netlify function imports it (no subdirs).
module.exports.checkPurchase = checkPurchase;
