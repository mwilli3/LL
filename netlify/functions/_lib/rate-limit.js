// rate-limit.js — daily per-identifier counters backed by Netlify Blobs.
//
// Atomicity note: Blobs are not transactional, so under burst load a few
// extra requests can squeak through. Acceptable at LoveLarice scale; if it
// matters later, swap the implementation for a Redis-backed atomic INCR
// without changing the call sites.

const { getStore } = require("@netlify/blobs");

function rateLimitStore() {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (siteID && token) return getStore({ name: "rate-limits", siteID, token });
  return getStore("rate-limits");
}

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

// Increment-and-check. Returns { allowed, count, limit, resetAt }.
// If the Blobs store is unreachable, fail OPEN (allowed: true) so a Blobs
// outage doesn't take the whole API down. Logged for visibility.
async function checkAndInc({ id, limit }) {
  if (!id || !limit || limit <= 0) return { allowed: true, count: 0, limit, resetAt: null };
  const store = rateLimitStore();
  const date = todayKey();
  const key = `rl:${date}:${id}`;
  try {
    const cur = parseInt((await store.get(key)) || "0", 10);
    if (cur >= limit) {
      return { allowed: false, count: cur, limit, resetAt: `${date}T23:59:59Z` };
    }
    await store.set(key, String(cur + 1));
    return { allowed: true, count: cur + 1, limit, resetAt: `${date}T23:59:59Z` };
  } catch (e) {
    console.warn("[rate-limit] Blobs unreachable, failing open:", e?.message || e);
    return { allowed: true, count: 0, limit, resetAt: null };
  }
}

// Best-effort client IP from Netlify headers. Falls back to "unknown" so a
// missing IP doesn't cause a divide-by-zero in identification.
function clientIp(event) {
  const h = event.headers || {};
  return (
    h["x-nf-client-connection-ip"] ||
    (h["x-forwarded-for"] || "").split(",")[0].trim() ||
    h["client-ip"] ||
    "unknown"
  );
}

module.exports = { checkAndInc, clientIp };
