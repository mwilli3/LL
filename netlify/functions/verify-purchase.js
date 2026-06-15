// verify-purchase.js — confirm a buyer is allowed into a paid LoveLarice app.
// Checks three sources, in order:
//   1. Netlify Blobs "purchases" store — populated by shopify-order-webhook
//      on every paid order from Shopify.
//   2. purchases-backfill.json — past orders seeded once.
//   3. ALLOWED_EMAILS env var — manual override (comma-separated).
//
// Accepts either:
//   { email, app }      app = "regulation-mastery" | "boundary-mastery" | "rooted-challenge"
//   { email, product }  product = exact/partial product title; resolved to an app
//                       slug via the *_PRODUCT_TITLE env vars.
//
// No Shopify Admin API call at runtime.

const fs = require("node:fs");
const path = require("node:path");
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

let backfill = { emails: {} };
try {
  backfill = JSON.parse(fs.readFileSync(path.join(__dirname, "purchases-backfill.json"), "utf8"));
} catch {
  // Missing file is fine -> Blobs + env override still work.
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const ok = (verified) => ({ statusCode: 200, headers: CORS, body: JSON.stringify({ verified }) });

function resolveApp(body) {
  if (body.app && APP_TITLE_ENV[body.app]) return body.app;
  const product = (body.product || "").trim().toLowerCase();
  if (!product) return null;
  for (const [app, envKey] of Object.entries(APP_TITLE_ENV)) {
    const title = (process.env[envKey] || "").trim().toLowerCase();
    if (title && product.includes(title)) return app;
  }
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return ok(false); }

  const email = (body.email || "").trim().toLowerCase();
  const app = resolveApp(body);
  if (!email || !app) return ok(false);

  // 1. Live webhook allowlist (Netlify Blobs).
  try {
    const rec = await purchasesStore().get(email, { type: "json" });
    if (rec?.apps?.includes(app)) return ok(true);
  } catch {
    // Blobs not configured yet -> fall through.
  }

  // 2. Backfilled past orders.
  const seeded = backfill?.emails?.[email];
  if (Array.isArray(seeded) && seeded.includes(app)) return ok(true);

  // 3. Manual env-var override.
  const allowed = (process.env.ALLOWED_EMAILS || "")
    .toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
  if (allowed.includes(email)) return ok(true);

  return ok(false);
};
