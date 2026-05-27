// gate.js — gate a paid app behind a Shopify purchase check.
// 7-day localStorage cache; redirect non-buyers to the Shopify product page.
//
// On a successful verify it also writes the app's own "verified" localStorage
// key, so the paid app's built-in gate screen recognizes the buyer and does not
// prompt a second time (no double gate). Free apps never import this.
//
// TODO (human): confirm these product URLs match the live Shopify handles.
// Sourced from the archetype quiz's purchase CTAs (apps/archetype-quiz.jsx),
// which already link buyers to these pages.
const PRODUCT_URLS = {
  "regulation-mastery": "https://lovelarice.com/products/regulation-mastery-kit",
  "boundary-mastery":   "https://lovelarice.com/products/boundary-mastery-kit",
  "rooted-challenge":   "https://lovelarice.com/products/rooted-reset-challenge-kit",
};

// The localStorage key each paid app's own gate checks for a verified buyer.
const APP_VERIFIED_KEY = {
  "regulation-mastery": "larice_reg_mastery_email",
  "boundary-mastery":   "larice_boundary_mastery_email",
  "rooted-challenge":   "larice_rooted_kit_email",
};

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function grant(app, email) {
  try {
    localStorage.setItem(`larice_access_${app}`, JSON.stringify({ app, ts: Date.now() }));
    const k = APP_VERIFIED_KEY[app];
    if (k) localStorage.setItem(k, email || "verified");
  } catch {}
}

export async function requirePurchase(app) {
  const KEY = `larice_access_${app}`;
  try {
    const cached = JSON.parse(localStorage.getItem(KEY) || "null");
    if (cached && Date.now() - cached.ts < SEVEN_DAYS) {
      const k = APP_VERIFIED_KEY[app];
      if (k && !localStorage.getItem(k)) localStorage.setItem(k, "verified");
      return true;
    }
  } catch {}

  const email = window.prompt("Enter the email you used at checkout:");
  if (!email) { window.location.href = PRODUCT_URLS[app]; return false; }

  try {
    const res = await fetch("/.netlify/functions/verify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), app }),
    });
    const data = await res.json();
    if (data && data.verified) { grant(app, email.trim()); return true; }
  } catch {}

  window.location.href = PRODUCT_URLS[app];
  return false;
}
