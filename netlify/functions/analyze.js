// analyze.js — server-side AI proxy for the LoveLarice apps.
//
// Two paths, selected on the request shape:
//
//   A. v2 pattern-aware flow — when body.app ∈ APP_CONFIG (the three paid
//      kits). Implements the architecture in
//      analyze-v2-prompt-architecture.js: archetype-lensed system prompt,
//      JSON insight contract, compliance gates, rule-based fallback.
//
//   B. generic Anthropic proxy — when body.app is missing or unknown.
//      Preserves the legacy { model, max_tokens, messages, [system],
//      [mcp_servers] } shape used by the journal and any non-v2 caller.
//
// Keeps ANTHROPIC_API_KEY off the client. Set ANTHROPIC_API_KEY in Netlify env.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

// ───────────────────────────────────────────────────────────────────────────
// v2 — per-app config map
// Hardcoded archetype + the set of themeIds the model is allowed to emit.
// The client app maps themeId back to its product-recommendation card.
// ───────────────────────────────────────────────────────────────────────────

const APP_CONFIG = {
  "regulation-kit": {
    archetype: "regulator",
    validThemeIds: [
      "sympathetic-activation",
      "sleep-disruption",
      "hpa-overload",
      "stress-incomplete",
    ],
  },
  "rooted-kit": {
    archetype: "rooted",
    validThemeIds: [
      "consistency-gap",
      "energy-depletion",
      "hydration-cortisol",
      "foundation-building",
    ],
  },
  "boundary-kit": {
    archetype: "reclaimer",
    validThemeIds: [
      "chronic-depletion",
      "fawn-activation",
      "energy-imbalance",
      "nervous-system-fatigue",
    ],
  },
};

const ARCHETYPE_LENS = {
  regulator:
    "This user runs hot — hyperarousal-dominant. Frame insights around noticing activation earlier and widening the window. Tone: steadying, never urgent.",
  rooted:
    "This user trends toward hypoarousal/shutdown. Frame insights around gentle activation and energy patterns. Tone: encouraging momentum, never pushy.",
  reclaimer:
    "This user's pattern centers on boundaries and depletion from others' needs. Frame insights around capacity and what restores vs. drains. Tone: validating agency.",
};

// ───────────────────────────────────────────────────────────────────────────
// TODO(marisa): SAFE_PHRASING_BY_ARCHETYPE
// Populate each block verbatim from the approved Claim Cards before the v2
// flow ships AI-generated insights to users. Until populated, the v2 flow
// FAILS CLOSED to the rule-based fallback (see the guard in handleV2) so
// no un-anchored AI claim can ever reach the UI. This is intentional — the
// compliance posture must not depend on the model behaving correctly.
//
// Format: a single string per archetype. The string is inserted verbatim
// into the system prompt under the "APPROVED PHRASING" heading. Bullet
// points, paragraphs, and quoted snippets are all fine — the model just
// needs an unambiguous corpus to anchor its language to.
// ───────────────────────────────────────────────────────────────────────────
const SAFE_PHRASING_BY_ARCHETYPE = {
  regulator: `
Reference card: CC-RM-LW-01 — The Regulator (Sympathetic Activation)
Pillar: Regulated Living. NS science basis: Yes.

APPROVED PHRASING (use verbatim where possible; paraphrase only within these claims):
"Your nervous system has learned to stay in a state of readiness. This is a pattern — not a flaw. Generic calming advice doesn't work because your baseline is set toward sympathetic dominance."

KEY CLAIM (the central proposition you may reflect):
The Regulator pattern reflects sympathetic nervous system dominance — a learned state of heightened activation, not a character flaw or anxiety disorder.

WHAT YOU MAY NOT SAY:
- No "treats anxiety," "cures stress," or similar medical framing.
- Never diagnose.
- Never claim this replaces therapy or medical care.
- Never frame the archetype as a clinical assessment.
`.trim(),

  rooted: `
Reference card: CC-RM-LW-02 — The Rooted One (Identity Gap / Habit Formation)
Pillar: Rooted Wellness. NS science basis: Yes.

APPROVED PHRASING (use verbatim where possible; paraphrase only within these claims):
"Your nervous system treats unfamiliar patterns as potentially unsafe. Habit formation requires nervous system safety, not willpower. The start-stop cycle is your body protecting you from perceived threat of change."

KEY CLAIM (the central proposition you may reflect):
The Rooted pattern reflects a nervous system that treats change as threat — the gap between knowing and doing is neurological, not motivational.

WHAT YOU MAY NOT SAY:
- No diagnosing executive-function disorders.
- No "cures procrastination" or similar medical framing.
- Never position this as a replacement for ADHD assessment or treatment.
- Never claim the archetype identifies a clinical condition.
`.trim(),

  reclaimer: `
Reference card: CC-RM-LW-03 — The Power Reclaimer (Fawn Response / HPA Depletion)
Pillar: Reclaimed Power. NS science basis: Yes.

APPROVED PHRASING (use verbatim where possible; paraphrase only within these claims):
"Your nervous system learned that safety requires appeasement. The fawn response is an autonomic strategy — it operates faster than conscious thought. HPA axis depletion occurs when the stress response stays activated through chronic over-giving."

KEY CLAIM (the central proposition you may reflect):
The Reclaimer pattern reflects fawn response dominance and HPA axis depletion — boundary collapse is a nervous system survival strategy, not a personality weakness.

WHAT YOU MAY NOT SAY:
- No diagnosing codependency or people-pleasing as a disorder.
- No treating PTSD or trauma.
- Never position this as a replacement for therapy.
- Never say HPA "dysfunction" — use "depletion" or "fatigue" instead.
`.trim(),
};

// Banned phrasing. These never appear in any approved Claim Card; if the
// model emits one, fail closed to the rule-based fallback.
const BANNED_PATTERNS = [
  /\bcure(s|d|ing)?\b/i,
  /\bheal(ed|ing|s)?\b/i,
  /\bfix(ed|ing|es)?\b/i,
  /\bdisorder(s|ed)?\b/i,
  /\bdiagnos(e|is|es|ed|tic)/i,
  /\bremedy\b/i,
  /\bdysfunction\b/i,           // Reclaimer card: use "depletion" or "fatigue"
  /you are dysregulated/i,
];

// ───────────────────────────────────────────────────────────────────────────
// System prompt builder
// ───────────────────────────────────────────────────────────────────────────

function buildSystemPrompt(archetype, safePhrasingBlock, validThemeIds) {
  return `
You are the insight engine inside a nervous system self-tracking app.
You analyze a user's recent check-in history and return ONE pattern-based
observation. You are not a therapist, coach, or medical provider, and you
never diagnose.

## VOICE
- Warm, specific, grounded. Second person.
- Archetype lens: ${ARCHETYPE_LENS[archetype]}
- Never use banned phrasing: cure, heal, fix, disorder, diagnose, "you are dysregulated".

## WHAT COUNTS AS AN INSIGHT
An insight must reference at least TWO specific data points from the user's
actual entries (dates, states, triggers, practices, or named items).
Generic encouragement is a failure. "You've been doing great" = reject.

Pattern types you may surface, in priority order:
1. CORRELATION — a trigger / sleep / practice that co-occurs with a state
   ("3 of your 4 hyperarousal days followed nights under 6 hours")
2. SHIFT — a change between week 1 and week 2 of the window
3. PRACTICE SIGNAL — a practice the user marked as helping, tied to when
4. CONSISTENCY — streak-based, only if no stronger pattern exists

## HARD RULES
- All wellness claims must stay within the approved phrasing below. If a
  pattern can't be described inside approved phrasing, describe the data
  pattern neutrally instead.
- Do NOT recommend supplements or any product. Product logic is handled by
  static rules outside your scope.
- Do NOT repeat any theme listed in priorThemes.
- If fewer than 5 entries exist, return type "insufficient" — never
  fabricate a pattern.
- themeId MUST be one of: ${validThemeIds.join(", ")}

## APPROVED PHRASING (Claim Card excerpts)
${safePhrasingBlock}

## OUTPUT — JSON ONLY, no markdown, no preamble:
{
  "type": "correlation" | "shift" | "practice" | "consistency" | "insufficient",
  "themeId": "one of the allowed ids above",
  "headline": "max 9 words, names the pattern",
  "insight": "2-3 sentences, cites at least 2 specific data points",
  "tryThis": "one concrete micro-action under 20 words, drawn from the user's own practices when possible",
  "confidence": "high" | "tentative"
}
`.trim();
}

// ───────────────────────────────────────────────────────────────────────────
// Compliance gates
// ───────────────────────────────────────────────────────────────────────────

function parseJsonStrict(anthropicResponse) {
  const text = (anthropicResponse?.content || [])
    .filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  if (!text) return null;
  // Defensive: strip a stray markdown fence if the model misbehaved.
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function bannedPhraseScan(insight) {
  const blob = [insight.headline, insight.insight, insight.tryThis]
    .filter(Boolean).join(" ");
  return BANNED_PATTERNS.some((re) => re.test(blob));
}

// Cheap heuristic — the insight body must contain at least one specific
// reference: a date, weekday, "N of M" count, or a string that actually
// appears as a value in the entries array. Kills generic encouragement.
function citesData(insight, entries) {
  const text = (insight.insight || "").toLowerCase();
  if (!text) return false;

  if (/\b(mon|tues|wednes|thurs|fri|satur|sun)day\b/.test(text)) return true;
  if (/\b\d{4}-\d{2}-\d{2}\b/.test(text)) return true;
  if (/\b\d+\s+of\s+(?:your\s+)?\d+\b/.test(text)) return true;

  const tokens = new Set();
  for (const e of entries) {
    for (const v of Object.values(e || {})) {
      if (typeof v === "string" && v.length > 2) tokens.add(v.toLowerCase());
      else if (Array.isArray(v)) {
        for (const s of v) if (typeof s === "string" && s.length > 2) tokens.add(s.toLowerCase());
      }
    }
  }
  for (const t of tokens) if (text.includes(t)) return true;
  return false;
}

// Rule-based fallback. Fired when the model output fails any compliance
// gate, when JSON parsing fails, when Anthropic errors, or when the
// approved phrasing is unpopulated. Never blocks the UI; always returns
// a real card. Headline and insight are intentionally generic — the
// confidence flag tells the UI to treat it as "we couldn't surface a
// specific pattern this round."
function ruleBasedFallback(payload) {
  const cfg = APP_CONFIG[payload.app];
  return {
    type: "consistency",
    themeId: cfg?.validThemeIds?.[0] || "consistency",
    headline: "Your window is still loading",
    insight: `You've logged ${(payload.entries || []).length} check-ins so far. The pattern engine needs a denser window to surface a specific correlation, so today's card stays in the consistency lane.`,
    tryThis: "Log today's state to keep the window dense.",
    confidence: "tentative",
  };
}

// ───────────────────────────────────────────────────────────────────────────
// v2 flow — pattern-aware insight engine
// ───────────────────────────────────────────────────────────────────────────

async function handleV2(body, apiKey) {
  const cfg = APP_CONFIG[body.app];
  if (!cfg) return json(ruleBasedFallback(body));

  const entries = Array.isArray(body.entries) ? body.entries : [];

  // Minimum-data gate. Fires before spending a model token.
  if (entries.length < 5) {
    return json({
      type: "insufficient",
      themeId: "insufficient-data",
      headline: "Keep logging",
      insight: `Pattern insights unlock after 5 check-ins. You're at ${entries.length}.`,
      tryThis: "Log today's state — it takes 20 seconds.",
      confidence: "high",
    });
  }

  // TODO(marisa): rate limiting per email or IP — e.g. a Netlify Blobs
  // counter with a daily cap. Not present today.
  // TODO(marisa): server-side purchase re-verification. Currently the
  // purchase gate is client-side only (apps/*-mastery → verifyPurchase()
  // → /.netlify/functions/verify-purchase). Re-checking here would
  // prevent a leaked client gate from translating into AI usage.

  const safePhrasing = SAFE_PHRASING_BY_ARCHETYPE[cfg.archetype];
  if (!safePhrasing || safePhrasing.startsWith("[TODO")) {
    console.warn(`[analyze v2] SAFE_PHRASING for ${cfg.archetype} not populated — failing closed to rule-based fallback.`);
    return json(ruleBasedFallback(body));
  }

  const system = buildSystemPrompt(cfg.archetype, safePhrasing, cfg.validThemeIds);
  const userMessage = JSON.stringify({
    entries,
    streak: body.streak ?? 0,
    priorThemes: Array.isArray(body.priorThemes) ? body.priorThemes.slice(-3) : [],
    windowDays: body.windowDays || 14,
    lastInsightDate: body.lastInsightDate || null,
  });

  let upstreamData;
  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: body.model || "claude-sonnet-4-20250514",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    upstreamData = await upstream.json();
  } catch {
    return json(ruleBasedFallback(body));
  }

  const insight = parseJsonStrict(upstreamData);
  if (!insight || typeof insight !== "object") return json(ruleBasedFallback(body));
  if (insight.type === "insufficient") return json(insight); // model agreed
  if (!cfg.validThemeIds.includes(insight.themeId)) return json(ruleBasedFallback(body));
  if (bannedPhraseScan(insight)) return json(ruleBasedFallback(body));
  if (!citesData(insight, entries)) return json(ruleBasedFallback(body));

  return json(insight);
}

// ───────────────────────────────────────────────────────────────────────────
// Generic Anthropic proxy (journal, free apps, anything non-v2)
// Preserves the legacy contract verbatim so existing callers keep working.
// ───────────────────────────────────────────────────────────────────────────

async function handleGeneric(body, apiKey) {
  const payload = {
    model: body.model || "claude-sonnet-4-20250514",
    max_tokens: body.max_tokens || 1000,
    messages: body.messages || [],
  };
  if (body.system) payload.system = body.system;
  if (Array.isArray(body.mcp_servers) && body.mcp_servers.length) payload.mcp_servers = body.mcp_servers;

  const headers = {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json",
  };
  if (payload.mcp_servers) headers["anthropic-beta"] = "mcp-client-2025-04-04";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers, body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { statusCode: res.status, headers: CORS, body: JSON.stringify(data) };
  } catch {
    return { statusCode: 502, headers: CORS, body: JSON.stringify({ error: "Upstream request failed" }) };
  }
}

function json(payload, status = 200) {
  return { statusCode: status, headers: CORS, body: JSON.stringify(payload) };
}

// ───────────────────────────────────────────────────────────────────────────
// Entry point
// ───────────────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") return json({ error: "Method not allowed" }, 405);

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: "ANTHROPIC_API_KEY not configured" }, 500);

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch { return json({ error: "Invalid JSON" }, 400); }

  if (body.app && APP_CONFIG[body.app]) return handleV2(body, key);
  return handleGeneric(body, key);
};
