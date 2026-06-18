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

// ───────────────────────────────────────────────────────────────────────────
// Rate limiting — per-IP daily cap. Stops email-enumeration: an attacker
// scraping for paying-customer emails can only test 30 candidates/day per IP.
// Legit buyers verify ~once per session, so this never hits real users.
// Inlined to avoid the Netlify subdirectory bundling problem (same reason as
// the checkPurchase code above).
// ───────────────────────────────────────────────────────────────────────────

const VERIFY_RATE_LIMIT_PER_IP_PER_DAY = 30;

function rateLimitStore() {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (siteID && token) return getStore({ name: "rate-limits", siteID, token });
  return getStore("rate-limits");
}

async function checkAndIncRate({ id, limit }) {
  if (!id || !limit || limit <= 0) return { allowed: true, count: 0, limit, resetAt: null };
  const store = rateLimitStore();
  const date = new Date().toISOString().slice(0, 10);
  const key = `rl:${date}:${id}`;
  try {
    const cur = parseInt((await store.get(key)) || "0", 10);
    if (cur >= limit) return { allowed: false, count: cur, limit, resetAt: `${date}T23:59:59Z` };
    await store.set(key, String(cur + 1));
    return { allowed: true, count: cur + 1, limit, resetAt: `${date}T23:59:59Z` };
  } catch (e) {
    // Fail OPEN on storage outage so a Blobs hiccup doesn't break the gate.
    console.warn("[rate-limit] Blobs unreachable, failing open:", e?.message || e);
    return { allowed: true, count: 0, limit, resetAt: null };
  }
}

function clientIp(event) {
  const h = event.headers || {};
  return (
    h["x-nf-client-connection-ip"] ||
    (h["x-forwarded-for"] || "").split(",")[0].trim() ||
    h["client-ip"] ||
    "unknown"
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Response shell
//   - CORS: kept "*" so the gate stays callable from anywhere we deploy;
//     no sensitive data is in the response body (just verified true/false).
//   - Cache-Control: no-store, private — the verify result IS personal data;
//     no CDN, browser, or proxy should cache it.
// ───────────────────────────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store, private",
};

const ok = (verified) => ({ statusCode: 200, headers: CORS, body: JSON.stringify({ verified }) });

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // Per-IP rate limit. Closes the email-enumeration attack: open CORS + no
  // limit would let anyone POST candidate emails and read back whether
  // they're paying customers. Uniform 429 (no email leak in error text).
  const rl = await checkAndIncRate({
    id: `verify:${clientIp(event)}`,
    limit: VERIFY_RATE_LIMIT_PER_IP_PER_DAY,
  });
  if (!rl.allowed) {
    return {
      statusCode: 429,
      headers: CORS,
      body: JSON.stringify({ verified: false, error: "Too many requests" }),
    };
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
