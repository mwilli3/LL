// verify-purchase.js — confirm a buyer is allowed into a paid LoveLarice app.
// Thin handler around _lib/purchase.checkPurchase, kept for the explicit
// gate flow (apps call this before mounting). The analyze.js v2 path
// re-verifies on every call using the same shared check.

const { checkPurchase } = require("./_lib/purchase");

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
