// ═══════════════════════════════════════════════════════════════════════════════
// POSTHOG ANALYTICS — LARICE ARCHETYPE QUIZ
// Single source of analytics for the quiz. Wired into apps/archetype-quiz.jsx;
// initialized once from src/quiz/main.jsx.
//
// Key is read from the Vite env var VITE_POSTHOG_KEY (set in Netlify) so no key
// is committed. Optional: VITE_POSTHOG_HOST (defaults to US cloud).
//
// EVENTS:
//   quiz_started            → quiz app mounts
//   quiz_question_answered  → each question completed (per-question dropoff)
//   quiz_completed          → all questions answered (before email gate)
//   email_captured          → email gate submitted (THE conversion event; no email sent to PostHog)
//   results_page_viewed     → archetype reveal displays
//   offer_block_viewed      → paid-app offer scrolls into viewport (once)
//   checkout_opened         → cart/checkout CTA clicked
//   bdyalign_shop_clicked   → BdyAlign "Shop now" CTA clicked on the results page
//   full_profile_expanded   → "full profile" expanded on the results page
// ═══════════════════════════════════════════════════════════════════════════════

import posthog from "posthog-js";

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

// Call once at app startup (src/quiz/main.jsx, before render).
export function initAnalytics() {
  if (initialized) return;
  if (!POSTHOG_API_KEY) {
    console.warn("[PostHog] VITE_POSTHOG_KEY not set — analytics disabled.");
    return;
  }
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    persistence: "localStorage",
    loaded: (ph) => {
      if (navigator.doNotTrack === "1") ph.opt_out_capturing();
    },
  });
  initialized = true;
}

// All tracking goes through this so the quiz never breaks if PostHog fails.
function safeCapture(eventName, properties = {}) {
  if (!initialized) return;
  try {
    posthog.capture(eventName, { brand: "lovelarice", ...properties });
  } catch (err) {
    console.warn(`[PostHog] Failed to capture ${eventName}:`, err);
  }
}

export function trackQuizStarted() {
  safeCapture("quiz_started");
}

// questionNumber: 1-based; answer: the chosen option key.
export function trackQuestionAnswered(questionNumber, answer) {
  safeCapture("quiz_question_answered", { question_number: questionNumber, answer });
}

export function trackQuizCompleted(archetype) {
  safeCapture("quiz_completed", { archetype });
}

// THE conversion event. Email is intentionally NOT sent to PostHog.
export function trackEmailCaptured(archetype) {
  safeCapture("email_captured", { archetype });
  try {
    if (initialized) posthog.setPersonProperties({ archetype });
  } catch (err) { /* non-critical */ }
}

export function trackResultsViewed(archetype) {
  safeCapture("results_page_viewed", { archetype });
}

// Observes `element`; fires once when 50% visible. Returns a cleanup fn.
export function trackOfferBlockViewed(element, archetype) {
  if (!element || !initialized) return () => {};
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          safeCapture("offer_block_viewed", { archetype });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(element);
  return () => observer.disconnect();
}

export function trackCheckoutOpened(archetype) {
  safeCapture("checkout_opened", { archetype, product: "paid_app", discount: "ARCHETYPE10" });
}

// Cross-brand BdyAlign supplement CTA on the quiz results page. Separate from
// checkout_opened because the funnel, destination, and revenue attribution are
// all different — this leaves the LL checkout entirely and lands on bdyalign.com.
export function trackBdyAlignClicked(archetype, product, url) {
  safeCapture("bdyalign_shop_clicked", { archetype, product, url });
}

export function trackProfileExpanded(archetype) {
  safeCapture("full_profile_expanded", { archetype });
}
