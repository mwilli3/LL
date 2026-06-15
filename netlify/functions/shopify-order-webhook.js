// Receives Shopify "orders/paid" webhooks for the LoveLarice store and
// records the buyer's email against the paid app slug(s) in Netlify Blobs.
// The /regulation-mastery, /boundary-mastery, and /rooted-challenge gates
// read from that allowlist via verify-purchase.
//
// Env (Netlify):
//   SHOPIFY_WEBHOOK_SECRET                signing secret from the Shopify
//                                         webhook config.
//   REGULATION_MASTERY_PRODUCT_TITLE      same titles the verify function uses;
//   BOUNDARY_MASTERY_PRODUCT_TITLE        a line item title that includes one
//   ROOTED_CHALLENGE_PRODUCT_TITLE        of these maps to that app slug.
//
// Webhook setup:
//   Shopify admin → Settings → Notifications → Webhooks → Create webhook
//     Event:  Order payment
//     Format: JSON
//     URL:    https://apps.lovelarice.com/.netlify/functions/shopify-order-webhook
//   Paste the signing secret Shopify reveals into SHOPIFY_WEBHOOK_SECRET.

const crypto = require("node:crypto");
const { getStore } = require("@netlify/blobs");

const APP_TITLE_ENV = {
  "regulation-mastery": "REGULATION_MASTERY_PRODUCT_TITLE",
  "boundary-mastery":   "BOUNDARY_MASTERY_PRODUCT_TITLE",
  "rooted-challenge":   "ROOTED_CHALLENGE_PRODUCT_TITLE",
};

function classifyTitles(titles) {
  const owned = new Set();
  const lower = titles.map((t) => (t || "").trim().toLowerCase());
  for (const [app, envKey] of Object.entries(APP_TITLE_ENV)) {
    const needle = (process.env[envKey] || "").trim().toLowerCase();
    if (!needle) continue;
    if (lower.some((t) => t.includes(needle))) owned.add(app);
  }
  return [...owned];
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) return { statusCode: 500, body: "Webhook secret not configured." };

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(event.body || "", "utf8");

  const sent = event.headers["x-shopify-hmac-sha256"] || event.headers["X-Shopify-Hmac-Sha256"];
  const computed = crypto.createHmac("sha256", secret).update(raw).digest("base64");
  const ok = sent && computed.length === sent.length &&
    crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(sent));
  if (!ok) return { statusCode: 401, body: "Invalid signature." };

  let order;
  try { order = JSON.parse(raw.toString("utf8")); }
  catch { return { statusCode: 400, body: "Invalid JSON." }; }

  const email = (order.email || order.contact_email || "").trim().toLowerCase();
  if (!email) return { statusCode: 200, body: "No email on order; ignored." };

  const status = String(order.financial_status || "").toLowerCase();
  if (!["paid", "partially_paid", "partially_refunded"].includes(status)) {
    return { statusCode: 200, body: `Ignored status=${status}.` };
  }

  const titles = (order.line_items || []).map((li) => li.title);
  const owned = classifyTitles(titles);
  if (owned.length === 0) return { statusCode: 200, body: "No gated product on order; ignored." };

  const store = getStore("purchases");
  const existing = (await store.get(email, { type: "json" })) || { apps: [] };
  const merged = [...new Set([...(existing.apps || []), ...owned])];
  await store.setJSON(email, { apps: merged, updatedAt: Date.now() });

  return { statusCode: 200, body: `Recorded ${email} -> ${merged.join(",")}` };
};
