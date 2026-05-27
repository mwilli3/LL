// verify-purchase.js — confirm a buyer purchased a given paid app.
// Looks up Shopify orders by email and checks line-item titles against the
// product title for the requested app. Fails closed ({ verified: false }).
//
// Accepts either:
//   { email, app }      app = "regulation-mastery" | "boundary-mastery" | "rooted-challenge"
//   { email, product }  product = exact/partial product title (used by the apps' built-in gate)
//
// Env (set in Netlify):
//   SHOPIFY_STORE_DOMAIN          e.g. lovelarice.myshopify.com
//   SHOPIFY_ACCESS_TOKEN          Admin API token with read_orders
//   REGULATION_MASTERY_PRODUCT_TITLE
//   BOUNDARY_MASTERY_PRODUCT_TITLE
//   ROOTED_CHALLENGE_PRODUCT_TITLE

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function productTitleFor(app) {
  switch (app) {
    case "regulation-mastery": return process.env.REGULATION_MASTERY_PRODUCT_TITLE;
    case "boundary-mastery":   return process.env.BOUNDARY_MASTERY_PRODUCT_TITLE;
    case "rooted-challenge":   return process.env.ROOTED_CHALLENGE_PRODUCT_TITLE;
    default: return null;
  }
}

const ok = (verified) => ({ statusCode: 200, headers: CORS, body: JSON.stringify({ verified }) });

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return ok(false); }

  const email = (body.email || "").trim().toLowerCase();
  const wantedTitle = (body.product || productTitleFor(body.app) || "").trim();
  if (!email || !wantedTitle) return ok(false);

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!domain || !token) return ok(false); // not configured → fail closed

  try {
    const url = `https://${domain}/admin/api/2024-01/orders.json?status=any&email=${encodeURIComponent(email)}&fields=line_items,email&limit=250`;
    const res = await fetch(url, {
      headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" },
    });
    if (!res.ok) return ok(false);
    const data = await res.json();
    const want = wantedTitle.toLowerCase();
    const purchased = (data.orders || []).some((o) =>
      (o.line_items || []).some((li) => (li.title || "").toLowerCase().includes(want))
    );
    return ok(purchased);
  } catch {
    return ok(false);
  }
};
