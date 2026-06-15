import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

/* ── Larice palette (locked) ─────────────────────────────── */
const C = {
  offwhite: "#F7F5F2",
  sand: "#EAE3DC",
  taupe: "#CBB8A9",
  clay: "#A47C63",
  brown: "#4A3A32",
  gold: "#C6A77D",
  charcoal: "#2B2B2B",
};

const STORAGE_KEY = "larice-review-journal-v1";
const MODEL = "claude-sonnet-4-6";

/* ── Launch anchor — Monday, June 15, 2026 (90-day calendar → Sept 12) ── */
const LAUNCH = new Date("2026-06-15T00:00:00");
const LAUNCH_END = new Date("2026-09-12T00:00:00");
function launchContext() {
  const now = new Date();
  const days = Math.floor((now - LAUNCH) / 86400000);
  if (days < 0) return { pre: true, days: -days, week: null, label: `Launch in ${-days} day${days === -1 ? "" : "s"}` };
  const week = Math.floor(days / 7) + 1;
  return { pre: false, days, week, label: week <= 13 ? `Launch Week ${week} of 13` : `Day ${days} · post-launch` };
}
/* Keyword activations by launch week (June 15 schedule) */
const ACTIVATIONS = {
  1: ["@lovelarice — CALM + QUIZ", "@regulatedchild — BODY"],
  3: ["@lovelarice — ROOTED", "@regulatedchild — DECODE"],
  5: ["@regulatedchild — REGULATE"],
  7: ["@lovelarice — STACK", "@regulatedchild — SCRIPTS"],
  9: ["@regulatedchild — QUIZ-TRC"],
  11: ["@lovelarice — PROTOCOL"],
};

/* ── Date helpers ────────────────────────────────────────── */
const pad = (n) => String(n).padStart(2, "0");
function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return { year: date.getUTCFullYear(), week: wk };
}
function periodKey(type, d = new Date()) {
  if (type === "daily") return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (type === "weekly") { const { year, week } = isoWeek(d); return `${year}-W${pad(week)}`; }
  if (type === "monthly") return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  return `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
}
function shiftPeriod(type, d, back) {
  const x = new Date(d);
  if (type === "daily") x.setDate(x.getDate() - back);
  else if (type === "weekly") x.setDate(x.getDate() - back * 7);
  else if (type === "monthly") x.setMonth(x.getMonth() - back);
  else x.setMonth(x.getMonth() - back * 3);
  return x;
}
function lastNKeys(type, n) {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => periodKey(type, shiftPeriod(type, now, n - 1 - i)));
}
function streakOf(entries, type) {
  const keys = new Set(entries.filter((e) => e.type === type).map((e) => e.period));
  let s = 0;
  const now = new Date();
  for (let i = 0; i < 104; i++) {
    if (keys.has(periodKey(type, shiftPeriod(type, now, i)))) s++;
    else break;
  }
  return s;
}
function fiveStreak(entries, goal) {
  const map = {};
  entries.filter((e) => e.type === "daily").forEach((e) => { map[e.period] = (e.data?.practices || []).length; });
  const now = new Date();
  // allow the streak to count from today if today already hit goal, else start from yesterday
  let start = (map[periodKey("daily", now)] || 0) >= goal ? 0 : 1;
  let s = 0;
  for (let i = start; i < 400; i++) {
    if ((map[periodKey("daily", shiftPeriod("daily", now, i))] || 0) >= goal) s++;
    else break;
  }
  return s;
}
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/* ── Review schemas (sourced from §12.11) ────────────────── */
const SCHEMAS = {
  weekly: {
    label: "Weekly Review",
    altitude: "Tactical",
    cadence: "Every Monday · 9:00–9:30 AM · 30 minutes",
    note: "The flywheel maintenance session. Run it before any content production.",
    accent: C.clay,
    sections: [
      { key: "wins", title: "Wins", type: "triple",
        sub: "Three specific wins — one each.", labels: ["Brand", "Doctorate", "Communication"] },
      { key: "metrics", title: "Metrics", type: "metrics",
        sub: "Pull the CEO Dashboard. These feed the charts on the Dashboard tab." },
      { key: "bottleneck", title: "Bottleneck", type: "fields",
        sub: "Where execution stalled. Don't carry the same bottleneck two weeks running.",
        fields: [
          { k: "failure", label: "System failure", type: "textarea", ph: "One specific place execution stalled this week." },
          { k: "action", label: "Resolving action", type: "textarea", ph: "One specific action — done before next Friday." },
        ] },
      { key: "commitments", title: "Next-Week Commitments", type: "triple",
        sub: "Three outcomes — one from each pillar.", labels: ["Brand", "Doctorate", "Personal"] },
    ],
  },
  monthly: {
    label: "Monthly CEO Review",
    altitude: "Strategic",
    cadence: "First Monday of the month · 60 minutes",
    note: "A board meeting with one attendee. Decisions for the next 30–90 days.",
    accent: C.gold,
    sections: [
      { key: "doctorate", title: "Doctorate Status", type: "fields", fields: [
        { k: "onTrack", label: "On track for milestone?", type: "select", opts: ["On track", "Slightly behind", "Behind", "Ahead"] },
        { k: "words", label: "Words written this month", type: "number" },
        { k: "target", label: "Target", type: "number" },
        { k: "advisor", label: "Advisor meetings", type: "number" },
        { k: "notes", label: "Notes", type: "textarea", ph: "Standing against the Section 1 backward plan." },
      ] },
      { key: "audience", title: "Audience Growth", type: "fields", fields: [
        { k: "growth", label: "Month-over-month growth by platform", type: "textarea", ph: "@lovelarice, @regulatedchild — rate + read." },
        { k: "top", label: "Series that drove the most growth", type: "text" },
        { k: "under", label: "Series that underperformed", type: "text" },
        { k: "direction", label: "What this tells us about direction", type: "textarea" },
      ] },
      { key: "revenue", title: "Revenue + Offer Performance", type: "fields", fields: [
        { k: "mrr", label: "MRR ($)", type: "number" },
        { k: "recurring", label: "% recurring", type: "number" },
        { k: "topOffer", label: "Highest-conversion offer", type: "text" },
        { k: "lowOffer", label: "Lowest-conversion offer", type: "text" },
        { k: "push", label: "Offer to push more traffic to", type: "text" },
      ] },
      { key: "comms", title: "Communication Skill Trend", type: "fields", fields: [
        { k: "scoreNow", label: "Rubric avg this month (/10)", type: "number" },
        { k: "scoreLast", label: "Last month (/10)", type: "number" },
        { k: "bestDrill", label: "Drill with most improvement", type: "text" },
        { k: "lagging", label: "Most lagging skill", type: "text" },
        { k: "focus", label: "Focus for next month", type: "text" },
      ] },
      { key: "system", title: "System Health", type: "fields", fields: [
        { k: "broken", label: "Most broken Notion workflow", type: "text" },
        { k: "sop", label: "SOP needing an update", type: "text" },
        { k: "automation", label: "Automation misfiring or unused", type: "text" },
      ] },
      { key: "team", title: "Team Capacity", type: "fields", fields: [
        { k: "capacity", label: "Anyone at capacity?", type: "text" },
        { k: "trigger", label: "Next hire-trigger status", type: "select", opts: ["Not close", "Approaching", "Met"] },
        { k: "founderOnly", label: "The one thing only the founder can provide now", type: "textarea" },
      ] },
    ],
  },
  quarterly: {
    label: "Quarterly Strategic Reset",
    altitude: "Architectural",
    cadence: "Every 90 days · 2 hours · paired with the Claim Card audit",
    note: "The highest-altitude review. Holds the 5-Year Arc on course.",
    accent: C.brown,
    sections: [
      { key: "goals", title: "Review 90-Day Goals", type: "fields", fields: [
        { k: "review", label: "Each goal — achieved / partial / missed", type: "textarea", ph: "For partial or missed: was the goal wrong, or did execution slip?" },
      ] },
      { key: "pillars", title: "Pillar Relevance", type: "fields", fields: [
        { k: "heat", label: "Most frequent pain points this quarter", type: "textarea", ph: "From the Pain Point Heat Map." },
        { k: "shift", label: "Same as last quarter, or shifted?", type: "select", opts: ["Same", "Shifting", "Clearly shifted"] },
      ] },
      { key: "targets", title: "New 90-Day Targets", type: "fields", fields: [
        { k: "brand", label: "Brand growth (specific metric)", type: "text" },
        { k: "revenue", label: "Revenue (MRR target $)", type: "number" },
        { k: "doctorate", label: "Doctorate (deliverable by quarter end)", type: "text" },
        { k: "team", label: "Team (one hire or SOP improvement)", type: "text" },
      ] },
      { key: "partners", title: "Brand Partnership Audit", type: "fields", fields: [
        { k: "served", label: "Collaborations that served the brand", type: "textarea" },
        { k: "didnt", label: "Collaborations that did not", type: "textarea" },
        { k: "cultivate", label: "The one relationship to cultivate next", type: "text" },
      ] },
      { key: "tech", title: "Tech Stack Review", type: "fields", fields: [
        { k: "drop", label: "Underused tool to drop", type: "text" },
        { k: "replace", label: "Friction tool to replace", type: "text" },
        { k: "justify", label: "Phase 2/3 tool now justified by revenue", type: "text" },
      ] },
      { key: "sustainability", title: "Founder Sustainability", type: "fields", fields: [
        { k: "cap", label: "Did the 35-hour cap hold?", type: "select", opts: ["Yes", "Mostly", "No"] },
        { k: "blocks", label: "Doctoral writing blocks protected?", type: "select", opts: ["Yes", "Partly", "No"] },
        { k: "slipped", label: "What slipped (family / personal / wellness)", type: "textarea" },
        { k: "protect", label: "How to protect it next quarter", type: "textarea" },
      ] },
    ],
  },
};

const KPIS = [
  { k: "mrr", label: "MRR", unit: "$", color: C.clay, fmt: (v) => `$${Number(v).toLocaleString()}` },
  { k: "emailList", label: "Email list", unit: "", color: C.gold, fmt: (v) => Number(v).toLocaleString() },
  { k: "doctoralWords", label: "Doctoral words", unit: "/wk", color: C.brown, fmt: (v) => Number(v).toLocaleString() },
  { k: "contentSaveRate", label: "Content save rate", unit: "%", color: C.taupe, fmt: (v) => `${v}%` },
  { k: "commScore", label: "Comm rubric", unit: "/10", color: "#8a6f5e", fmt: (v) => `${v}` },
];

const MOVEMENT = [
  { t: "Pilates", c: C.clay }, { t: "Strength", c: C.brown }, { t: "Walk", c: C.gold },
  { t: "Yoga", c: "#8a9a7e" }, { t: "Run", c: "#a85a4a" }, { t: "Rest", c: C.taupe },
];
const MOVE_COLOR = Object.fromEntries(MOVEMENT.map((m) => [m.t, m.c]));
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STEP_GOAL = 8000;
const uid = () => Math.random().toString(36).slice(2, 9);

/* Larice palette functional roles — no customer-suite archetype colors leak in.
   `arch` data stays as source-of-truth attribution (Regulator/Rooted/Reclaimer/All);
   the color it maps to is a Larice token chosen for functional separation, not
   for matching the customer app it came from. */
const ARCH = { Regulator: C.brown, Rooted: C.brown, Reclaimer: C.clay, All: C.gold };

/* ── Real LL nervous-system reset practices (from the apps + Claim Cards) ── */
const PRACTICES = [
  { id: "exhale", name: "Extended-exhale breathing", arch: "Regulator", dur: "1 min",
    desc: "60 seconds — 4-count inhale, 8-count exhale. The longer exhale is the lever; it supports parasympathetic recovery faster than cognitive techniques.", src: "CALM app · CC-L-01–08" },
  { id: "bodyscan", name: "Two-minute body scan", arch: "Regulator", dur: "2 min",
    desc: "Move attention slowly through the body, noticing without fixing. Part of the 5-minute morning practice.", src: "CALM app" },
  { id: "affirm", name: "Affirmation journaling", arch: "Regulator", dur: "2 min",
    desc: "Two minutes of written affirmation before checking your phone — the identity anchor of the morning practice.", src: "CALM app" },
  { id: "state", name: "Current-state check-in (1–10)", arch: "Regulator", dur: "1 min",
    desc: "Log where your activation sits on a 1–10 scale. Builds your personal regulation pattern over time.", src: "CALM app · CC-L-INT-01" },
  { id: "intero", name: "Interoception minute", arch: "All", dur: "1 min",
    desc: "One minute, hand on the sternum. Where is my breath, where is my jaw, what is my body asking for. Notice — don't fix.", src: "CC-L-INT-01" },
  { id: "nature", name: "20-minute nature block", arch: "Regulator", dur: "20 min",
    desc: "Twenty minutes in a natural setting, phone away. Research indicates ~20 minutes is associated with measurable cortisol drops, dose-responsive in the 20–30 minute window.", src: "CC-L-14" },
  { id: "sleepwin", name: "Protect the sleep window", arch: "Rooted", dur: "nightly",
    desc: "Hold one consistent bedtime 5 of 7 nights. Research suggests consistent timing trains circadian rhythm more than longer hours at varying times.", src: "ROOTED app · CC-L-SLP-01" },
  { id: "hydrate", name: "Hydration", arch: "Rooted", dur: "daily",
    desc: "One of the four ROOTED foundation metrics — steady hydration before any habit-stacking.", src: "ROOTED app" },
  { id: "move", name: "Daily movement", arch: "Rooted", dur: "daily",
    desc: "Foundation metric — daily movement that fits your baseline, not an override of it.", src: "ROOTED app" },
  { id: "meal", name: "One nourishing meal", arch: "Rooted", dur: "daily",
    desc: "Foundation metric — one genuinely nourishing meal, chosen deliberately.", src: "ROOTED app" },
  { id: "ninety", name: "The 90-second window after no", arch: "Reclaimer", dur: "90 sec",
    desc: "After you say no and feel the wave hit, set a 90-second timer. Don't apologize, qualify, or backtrack. Let it pass — the pattern retrains when 'no' and 'safe' happen in the same 90 seconds.", src: "CC-L-03 + CC-L-19" },
  { id: "coreg", name: "20 minutes of co-regulation", arch: "All", dur: "20 min/wk",
    desc: "Twenty minutes with one regulated person, no agenda — not venting, not problem-solving. Polyvagal research indicates adult systems still settle by borrowing another's tone.", src: "CC-L-COR-01" },
];
const PRACTICE_GOAL = 5;

/* Runnable in-app players (mirrors the CALM app's timer + state logger) */
const RUN = {
  exhale: { mode: "breath", inhale: 4, exhale: 8, seconds: 60 },
  bodyscan: { mode: "timer", seconds: 120, cues: ["Feet and legs — let them soften.", "Belly and chest — let the breath fall.", "Shoulders and jaw — unclench.", "Whole body — notice, don't fix."] },
  affirm: { mode: "note", seconds: 120 },
  state: { mode: "state" },
  intero: { mode: "timer", seconds: 60, cues: ["Where is my breath?", "Where is my jaw?", "What is my body asking for?"] },
  nature: { mode: "timer", seconds: 1200, cues: ["Phone away.", "Let your eyes find something far.", "Nothing to fix — just be outside."] },
  ninety: { mode: "timer", seconds: 90, cues: ["Don't apologize.", "Don't qualify.", "Don't backtrack.", "Let the wave pass."] },
};
PRACTICES.forEach((p) => { if (RUN[p.id]) p.run = RUN[p.id]; });

/* ── 5-Year Roadmap (Section 12) + Monetization (Section 6), anchored to June 15 launch ── */
function monthIndexNow() {
  const now = new Date();
  let m = (now.getFullYear() - LAUNCH.getFullYear()) * 12 + (now.getMonth() - LAUNCH.getMonth());
  if (now.getDate() < LAUNCH.getDate()) m -= 1;
  return m + 1; // 1-based; <= 0 means pre-launch
}
function phaseIndexForMonth(mi) {
  if (mi <= 3) return 0; if (mi <= 9) return 1; if (mi <= 24) return 2; if (mi <= 36) return 3; return 4;
}
const PHASES = [
  { n: 1, name: "Foundation", tag: "Build the foundation", months: "Mo 1–3", dates: "Jun 15 – Sep 14, 2026",
    mrr: [3000, 6000], mrrLabel: "$3K–6K MRR (end)", cum: "$5K–12K cumulative", emails: [3000, 4500], emailLabel: "3,000–4,500 combined",
    focus: "Validation over revenue. Prove the content system, the research engine, and the 35-hour week.",
    exit: ["4–7 posts/wk per handle, 8+ weeks unbroken", "2,000–3,000 combined email subscribers", "35%+ Stage 4 open rate (last 4 emails)", "All 7 Notion systems weekly + top-5 SOPs", "34 Claim Cards approved / in resolution; weekly log", "100+ supplement orders; 30+ active S&S", "Lit review chapter draft submitted; streak unbroken", "60+ recorded talks with rubric scoring", "35-hour cap held 10+ of 13 weeks", "Voice of Audience reports Mo 2 + Mo 3 routed"] },
  { n: 2, name: "Scale", tag: "Scale to $10K MRR", months: "Mo 4–9", dates: "Aug 2026 – Feb 2027",
    mrr: [10000, 15000], mrrLabel: "$10K–15K MRR (end)", cum: "$80K–140K cumulative", emails: [8000, 13000], emailLabel: "8,000–13,000 combined",
    focus: "Stress-test systems under 5–10x load. Memberships launch, S&S proves out, first TRC cohort.",
    exit: ["$10K+ MRR sustained 2 consecutive months", "100+ Inner Circle + 75+ RPC; 80%+ 90-day retention", "200+ active S&S subscribers; 75%+ 90-day retention", "5K–8K LoveLarice + 3K–5K TRC subscribers", "First TRC cohort 70%+ completion; NPS 50+", "Editor + Script Researcher + Community Manager operational", "55,000+ doctoral words; 2 of 4 chapters drafted", "35-hour cap held on average; no major burnout"] },
  { n: 3, name: "Category Leadership", tag: "$500K–$1M ARR", months: "Mo 10–24", dates: "Mar 2027 – May 2028",
    mrr: [60000, 80000], mrrLabel: "$60K–80K MRR (end)", cum: "$500K–1.2M cumulative", emails: [23000, 37000], emailLabel: "23K–37K combined",
    focus: "Founder-led to systems-led. Premium tier, partnerships, doctoral defense, first retreat.",
    exit: ["Quarterly MRR: $15–22K → $22–32K → $32–45K → $45–60K → $60–80K", "Premium tier live (Group Coaching $997; retreat $1.5–2.5K)", "1–2 brand partnerships/quarter at $5K+ floor", "All 3 paid Larice apps live", "Doctoral defense locked (Fall 2027 / Spring 2028)", "Ops Assistant + Legal retainer operational"] },
  { n: 4, name: "Expansion", tag: "Post-doctorate authority", months: "Yr 3 · Mo 25–36", dates: "May 2028 – May 2029",
    mrr: [80000, 130000], mrrLabel: "$80K–130K MRR", cum: "$1.2M–1.8M annual", emails: null, emailLabel: "—",
    focus: "Degree conferred Fall 2028. Book deal ($25–75K advance), 4–8 keynotes ($10–25K), media tour.",
    exit: ["Book proposal with agent / publisher", "4–8 paid keynotes per year", "Top-100 podcast + media appearances", "Director-level hire absorbs strategic execution"] },
  { n: 5, name: "Portfolio", tag: "Strategist, not operator", months: "Yr 4–5", dates: "May 2029 – May 2031",
    mrr: [120000, 200000], mrrLabel: "$120K–200K+ MRR", cum: "$1.5M–3M+ annual", emails: null, emailLabel: "—",
    focus: "Runs from documented systems. 20–25h founder week. Second book, retreats, speaking.",
    exit: ["20–25h founder week (voluntary)", "Daily ops run by team of 6–12", "2,000–5,000 active recurring members", "BdyAlign 6–8 SKUs, 50%+ S&S adoption", "Speaking circuit + book(s) established"] },
];
const HIRES = [
  { role: "Video Editor", phase: 2, when: "Mo 4–5", pay: "$400–800/batch", trigger: "Editing 8+ h/wk; 10+ videos/wk scheduled" },
  { role: "Script Researcher", phase: 2, when: "Mo 4–5", pay: "$25–40/hr", trigger: "6+ h/wk on Stage 1–2; 5+ source backlog" },
  { role: "Community Manager", phase: 2, when: "Mo 5–6", pay: "$2.5–4K/mo", trigger: "50+ members; 200+ comments/DMs per week" },
  { role: "Ops Assistant", phase: 3, when: "MRR > $15K", pay: "$3–5K/mo", trigger: "MRR sustained > $15K; 3+ contractors" },
  { role: "Legal Counsel", phase: 3, when: "First $10K+ deal", pay: "$500–1.5K/mo retainer", trigger: "First brand partnership over $10K signed" },
  { role: "Director-level", phase: 4, when: "ARR > $1M", pay: "—", trigger: "Founder > 40 h/wk despite team capacity" },
];
const STREAMS = [
  { k: "bdOneTime", label: "BdyAlign one-time", p: [[1500, 1500], [3000, 5000], [8000, 12000]] },
  { k: "bdSS", label: "BdyAlign Subscribe & Save", p: [[0, 0], [5000, 7000], [15000, 25000]] },
  { k: "llApps", label: "LoveLarice paid apps", p: [[500, 2000], [2000, 4000], [5000, 10000]] },
  { k: "trcApps", label: "TRC paid apps", p: [[300, 1000], [1500, 3000], [3000, 8000]] },
  { k: "ic", label: "Inner Circle", p: [[0, 0], [5000, 8000], [22000, 30000]] },
  { k: "rpc", label: "Regulated Parent Collective", p: [[0, 0], [3000, 5000], [13000, 18000]] },
  { k: "rrr", label: "RRR Course", p: [[0, 0], [1000, 3000], [3000, 5000]] },
  { k: "trcCourse", label: "TRC Course", p: [[0, 0], [1000, 3000], [3000, 5000]] },
  { k: "premium", label: "Premium (coaching/retreats)", p: [[0, 0], [0, 0], [5000, 10000]] },
  { k: "partner", label: "Brand partnerships", p: [[0, 0], [0, 0], [5000, 8000]] },
  { k: "affiliate", label: "Affiliate", p: [[100, 500], [500, 1500], [2000, 5000]] },
];
const WEEKBLOCKS = [
  { b: "A", name: "Content & Creative", note: "Delegable Phase 3+" },
  { b: "B", name: "Doctoral Writing", note: "Founder-only · 6–9 AM" },
  { b: "C", name: "Ops & Community", note: "Partly delegable P3+" },
  { b: "D", name: "Communication Practice", note: "Founder-only" },
  { b: "E", name: "Strategy & Review", note: "Founder-only" },
];
const streamTargetCol = (phaseIdx) => phaseIdx <= 0 ? 0 : phaseIdx === 1 ? 1 : 2;
const verdict = (val, band) => {
  if (val == null || val === "" || Number.isNaN(+val)) return { label: "—", color: C.taupe };
  const v = +val;
  if (v < band[0]) return { label: "below baseline", color: "#a85a4a" };
  if (v > band[1]) return { label: "ahead of baseline", color: "#5d7a5e" };
  return { label: "on track", color: ARCH.Rooted };
};
const fmtUSD = (n) => `$${Math.round(+n).toLocaleString()}`;

/* ── Communication Mastery (Section 9) ── */
ARCH.Comm = C.brown;
const COMM = ARCH.Comm;
const DRILLS = [
  { id: "spine", name: "Story Spine", min: 5, why: "Default to story structure under pressure, not information dumping.",
    steps: ["Once upon a time… (setup)", "Every day… (the normal pattern)", "Until one day… (inciting moment)", "Because of that… (×2 consequences)", "Until finally… (resolution)", "And ever since then… (new normal)"], rec: "5-min voice memo / selfie · one take" },
  { id: "ask", name: "Clear Ask", min: 3, why: "Precise, bounded asks produce precise responses.",
    steps: ["Context — one sentence", "Ask — exactly what, by when, in what form", "Rationale — why it matters", "Alternative — acceptable fallback"], rec: "60-sec memo · all four elements" },
  { id: "loop", name: "Looping + Labeling", min: 5, why: "Reflect before you respond; name the emotion underneath.",
    steps: ["Loop: \u201cWhat I\u2019m hearing is\u2026\u201d (their words)", "Label: \u201cIt sounds like you\u2019re feeling\u2026\u201d", "Only then respond", "No \u201cbut / however\u201d \u2014 never erase the loop"], rec: "5-min audio · two looped responses" },
  { id: "pause", name: "One-Breath Pause", min: 2, why: "Train restraint — let silence do the work.",
    steps: ["Read a passage aloud", "Pause one full breath after each key line", "Resist filling the silence", "Log restraint on a 1\u201310 scale"], rec: "log restraint 1\u201310" },
  { id: "voice", name: "Voice + Presence", min: 5, why: "The voice is a physical instrument — trainable like any skill.",
    steps: ["Read aloud 90 sec, recording", "Pace 150\u2013180 wpm (slower than feels natural)", "Prosody \u2014 vary pitch + emphasis", "Pause at the breath points", "Stillness \u2014 grounded, hands quiet", "3 takes \u00b7 note your weakest variable"], rec: "3 \u00d7 90-sec takes" },
];
const HARDREPS = [
  { id: "talk", name: "Recorded Talk", cadence: "weekly", scored: true, desc: "3\u20137 min monologue from a 5-bullet outline, one take. HOOK \u2192 SHIFT \u2192 SCIENCE \u2192 STORY \u2192 TOOL \u2192 CTA. Score it on the rubric." },
  { id: "conversation", name: "Difficult Conversation", cadence: "weekly", desc: "One real-stakes conversation + a 5-sentence written debrief within 24 hours." },
  { id: "facilitation", name: "Facilitation Rep", cadence: "weekly", desc: "Run one 20-min live Q&A or community call. Review against the 5-part architecture." },
  { id: "public", name: "Public Presence Rep", cadence: "monthly", desc: "One per month, scaling: podcast \u2192 partner video \u2192 workshop \u2192 keynote." },
];
const RUBRIC = [
  { k: "hook", label: "Hook quality", hint: "First 7 sec name a specific failure / pattern" },
  { k: "structure", label: "Structure adherence", hint: "HOOK \u2192 SHIFT \u2192 SCIENCE \u2192 STORY \u2192 TOOL \u2192 CTA" },
  { k: "voice", label: "Voice quality", hint: "150\u2013180 wpm, prosody, deliberate pauses" },
  { k: "pause", label: "Pause use", hint: "Pauses after key lines; resist filling silence" },
  { k: "cta", label: "CTA clarity", hint: "Specific keyword + matched archetype" },
];
const TALKS_TARGET = 60; // Phase 1 exit: 60+ recorded talks logged
const rubricBand = (t) => t >= 50 ? "world-class" : t >= 35 ? "strong · public-ready" : t >= 25 ? "developing" : "re-do the basics";

/* ── Content posting (Pipeline Cadence v2 grid) ── */
const TRC_COLOR = "#A84A30";
const BRANDS = [
  { key: "ll", name: "LoveLarice", handle: "@lovelarice", platforms: "TikTok · IG", color: C.clay },
  { key: "trc", name: "The Regulated Child", handle: "@regulatedchild", platforms: "TikTok · IG", color: TRC_COLOR },
];
// getDay(): 0 Sun … 6 Sat
const POSTING_GRID = {
  1: { format: "Track A video", kind: "Video" },
  2: { format: "Track A video", kind: "Video" },
  3: { format: "Track A video", kind: "Video" },
  4: { format: "Carousel", kind: "Carousel" },
  5: { format: "Track B · trend response", kind: "Track B" },
  6: { format: "Carousel", kind: "Carousel" },
  0: { format: "Rest day", kind: "Rest" },
};

/* ── Grouped navigation ── */
const NAV = [
  { key: "daily", label: "Today" },
  { key: "plan", label: "Plan" },
  { key: "train", label: "Train", subs: [["practices", "Reset practices"], ["comms", "Communication"]] },
  { key: "reviews", label: "Reviews", subs: [["weekly", "Weekly"], ["monthly", "Monthly"], ["quarterly", "Quarterly"]] },
  { key: "roadmap", label: "Roadmap" },
  { key: "dashboard", label: "Dashboard" },
];
function groupOf(t) {
  if (["practices", "comms"].includes(t)) return "train";
  if (["weekly", "monthly", "quarterly"].includes(t)) return "reviews";
  return t;
}

/* ── Storage ─────────────────────────────────────────────── */
async function loadAll() {
  try {
    if (typeof window === "undefined") return { entries: [], plans: { weekly: {}, monthly: {} }, manych: {}, live: null, roadmap: { exit: {}, streams: {} }, comm: { talks: [], drills: {}, reps: {} } };
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const d = raw ? JSON.parse(raw) : {};
    return { entries: d.entries || [], plans: d.plans || { weekly: {}, monthly: {} }, manych: d.manych || {}, live: d.live || null, roadmap: d.roadmap || { exit: {}, streams: {} }, comm: d.comm || { talks: [], drills: {}, reps: {} } };
  } catch { return { entries: [], plans: { weekly: {}, monthly: {} }, manych: {}, live: null, roadmap: { exit: {}, streams: {} }, comm: { talks: [], drills: {}, reps: {} } }; }
}
async function saveAll(data) {
  try { if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch (e) { console.error("save failed", e); }
}

/* ── Nerve-branch signature ──────────────────────────────── */
function NerveBranch({ h = 220, active }) {
  return (
    <svg width="40" height={h} viewBox={`0 0 40 ${h}`} aria-hidden="true">
      <line x1="20" y1="6" x2="20" y2={h - 6} stroke={C.taupe} strokeWidth="1.5" />
      {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, i) => {
        const y = h * t;
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <g key={i} stroke={C.taupe} strokeWidth="1.2" fill="none" opacity="0.8">
            <path d={`M20 ${y} q ${dir * 9} -4 ${dir * 14} -12`} />
            <circle cx={20 + dir * 14} cy={y - 12} r="1.6" fill={C.taupe} stroke="none" />
          </g>
        );
      })}
      {[ "weekly", "monthly", "quarterly" ].map((t, i) => {
        const cy = h - 24 - i * ((h - 48) / 2);
        const on = active === t;
        return <circle key={t} cx="20" cy={cy} r={on ? 7 : 4.5}
          fill={on ? SCHEMAS[t].accent : C.offwhite} stroke={SCHEMAS[t].accent}
          strokeWidth="2" style={{ transition: "all .35s" }} />;
      })}
    </svg>
  );
}

/* ── App ─────────────────────────────────────────────────── */
export default function LariceReviewJournal() {
  const [entries, setEntries] = useState([]);
  const [plans, setPlans] = useState({ weekly: {}, monthly: {} });
  const [manych, setManych] = useState({});
  const [live, setLive] = useState(null);
  const [roadmap, setRoadmap] = useState({ exit: {}, streams: {} });
  const [comm, setComm] = useState({ talks: [], drills: {}, reps: {} });
  const [drillPlayer, setDrillPlayer] = useState(null);
  const [scorer, setScorer] = useState(false);
  const [reward, setReward] = useState(null);
  const [liveStatus, setLiveStatus] = useState({ loading: false, error: "" });
  const [player, setPlayer] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("daily"); // daily | plan | weekly | monthly | quarterly | dashboard
  const [draft, setDraft] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [dayDate, setDayDate] = useState(periodKey("daily"));
  const [toast, setToast] = useState("");
  const [ai, setAi] = useState({ open: false, loading: false, data: null, error: "" });
  const [scan, setScan] = useState({ loading: false, data: null, error: "" });
  const [notion, setNotion] = useState({ loading: false, msg: "", error: "" });
  const topRef = useRef(null);
  const lc = launchContext();

  useEffect(() => { (async () => { const d = await loadAll(); setEntries(d.entries || []); setPlans(d.plans || { weekly: {}, monthly: {} }); setManych(d.manych || {}); setLive(d.live || null); setRoadmap(d.roadmap || { exit: {}, streams: {} }); setComm(d.comm || { talks: [], drills: {}, reps: {} }); setReady(true); })(); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(""), 2600); return () => clearTimeout(t); } }, [toast]);

  const REVIEW_TABS = ["weekly", "monthly", "quarterly"];
  const isReview = REVIEW_TABS.includes(tab);
  const schema = isReview ? SCHEMAS[tab] : null;

  const setField = (sectionKey, fieldKey, val) =>
    setDraft((d) => ({ ...d, [sectionKey]: { ...(d[sectionKey] || {}), [fieldKey]: val } }));

  function newDraft() { setDraft({}); setEditingId(null); setAi({ open: false, loading: false, data: null, error: "" }); }

  function loadEntry(e) {
    if (e.type === "daily") { setTab("daily"); setDayDate(e.period); topRef.current?.scrollIntoView({ behavior: "smooth" }); return; }
    setTab(e.type); setDraft(e.data || {}); setEditingId(e.id);
    setAi({ open: !!e.ai, loading: false, data: e.ai || null, error: "" });
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function persist(next) { setEntries(next); await saveAll({ entries: next, plans, manych, live, roadmap, comm }); }
  async function persistPlans(next) { setPlans(next); await saveAll({ entries, plans: next, manych, live, roadmap, comm }); }
  function saveManych(next) { setManych(next); saveAll({ entries, plans, manych: next, live, roadmap, comm }); }
  function saveLive(next) { setLive(next); saveAll({ entries, plans, manych, live: next, roadmap, comm }); }
  function saveRoadmap(next) { setRoadmap(next); saveAll({ entries, plans, manych, live, roadmap: next, comm }); }
  function saveComm(next) { setComm(next); saveAll({ entries, plans, manych, live, roadmap, comm: next }); }

  /* ── Communication Mastery handlers ── */
  function logDrill(dateKey, id) {
    const cur = comm.drills?.[dateKey] || [];
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    saveComm({ ...comm, drills: { ...(comm.drills || {}), [dateKey]: next } });
    if (dateKey === periodKey("daily") && cur.length < 5 && next.length >= 5) setToast("Daily drill block complete · 20 min");
  }
  function saveTalk(t) {
    const talk = { id: `talk-${Date.now()}`, date: new Date().toISOString(), ...t };
    saveComm({ ...comm, talks: [talk, ...(comm.talks || [])] });
    setToast(`Talk scored · ${t.total}/50`);
  }
  function deleteTalk(id) { saveComm({ ...comm, talks: (comm.talks || []).filter((x) => x.id !== id) }); }
  function toggleRep(weekKey, repId) {
    const cur = comm.reps?.[weekKey] || {};
    saveComm({ ...comm, reps: { ...(comm.reps || {}), [weekKey]: { ...cur, [repId]: !cur[repId] } } });
  }
  function setCommEnergy(weekKey, n) {
    const cur = comm.reps?.[weekKey] || {};
    saveComm({ ...comm, reps: { ...(comm.reps || {}), [weekKey]: { ...cur, energy: n } } });
  }

  async function saveReview() {
    const now = new Date().toISOString();
    if (editingId) {
      const next = entries.map((e) => e.id === editingId ? { ...e, data: draft, ai: ai.data, updated: now } : e);
      await persist(next); setToast("Review updated");
    } else {
      const entry = { id: `${tab}-${Date.now()}`, type: tab, period: periodKey(tab),
        created: now, data: draft, ai: ai.data };
      await persist([entry, ...entries]); setEditingId(entry.id); setToast("Review saved");
    }
  }

  async function deleteEntry(id) {
    await persist(entries.filter((e) => e.id !== id));
    if (editingId === id) newDraft();
    setToast("Deleted");
  }

  /* ── Daily check-in (generic upsert by date) ── */
  const dayEntry = entries.find((e) => e.type === "daily" && e.period === dayDate);
  const dayData = dayEntry?.data || {};
  function upsertDay(dateKey, patch) {
    const now = new Date().toISOString();
    const e = entries.find((x) => x.type === "daily" && x.period === dateKey);
    const created = e?.created || new Date(dateKey + "T12:00:00").toISOString();
    const data = { ...(e?.data || {}), ...patch };
    const next = e ? entries.map((x) => x.id === e.id ? { ...x, data, updated: now } : x)
                   : [{ id: `daily-${Date.now()}`, type: "daily", period: dateKey, created, data }, ...entries];
    persist(next);
  }
  const setDay = (field, val) => upsertDay(dayDate, { [field]: val });
  function maybeReward(dateKey, before, after) {
    if (dateKey === periodKey("daily") && before < PRACTICE_GOAL && after >= PRACTICE_GOAL) {
      // streak including today (entries not yet updated, so +1 for today)
      const priorStreak = fiveStreak(entries.filter((e) => e.period !== dateKey), PRACTICE_GOAL);
      setReward({ streak: priorStreak + 1 });
    }
  }
  function togglePractice(dateKey, id) {
    const e = entries.find((x) => x.type === "daily" && x.period === dateKey);
    const cur = e?.data?.practices || [];
    const next = cur.includes(id) ? cur.filter((p) => p !== id) : [...cur, id];
    maybeReward(dateKey, cur.length, next.length);
    upsertDay(dateKey, { practices: next });
  }
  function markPracticeDone(dateKey, id, extra) {
    const e = entries.find((x) => x.type === "daily" && x.period === dateKey);
    const cur = e?.data?.practices || [];
    const practices = cur.includes(id) ? cur : [...cur, id];
    maybeReward(dateKey, cur.length, practices.length);
    upsertDay(dateKey, { practices, ...(extra || {}) });
  }
  const practicesDone = (dateKey) => (entries.find((x) => x.type === "daily" && x.period === dateKey)?.data?.practices || []).length;

  /* ── Live performance pull (Shopify + Klaviyo via MCP) ── */
  async function fetchLive() {
    setLiveStatus({ loading: true, error: "" });
    const prompt = `Pull current headline performance metrics for this business using the connected tools.
From Shopify: total sales and order count for the last 30 days, and the store currency.
From Klaviyo: total active/subscribed profile count, and the open rate of the most recent sent email campaign.
Respond with ONLY a JSON object, no other text, in this exact shape (use null for anything unavailable):
{"shopify":{"revenue30d":number,"orders30d":number,"currency":string},"klaviyo":{"subscribers":number,"lastCampaignOpenRate":number}}`;
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL, max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
          mcp_servers: [
            { type: "url", url: "https://setup.shopify.com/mcp", name: "shopify" },
            { type: "url", url: "https://mcp.klaviyo.com/mcp", name: "klaviyo" },
          ],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      const snap = { ...parsed, at: new Date().toISOString() };
      saveLive(snap);
      setLiveStatus({ loading: false, error: "" });
    } catch (e) {
      setLiveStatus({ loading: false, error: "Couldn't pull live data. Make sure Shopify and Klaviyo connectors are enabled, then retry." });
    }
  }

  /* ── Plan: weekly objectives + movement + monthly goals ── */
  const wkKey = periodKey("weekly");
  const moKey = periodKey("monthly");
  const wkPlan = plans.weekly[wkKey] || { theme: "", objectives: [], movement: {} };
  const moPlan = plans.monthly[moKey] || { goals: [] };
  function setWeekPlan(updater) {
    const next = { ...plans, weekly: { ...plans.weekly, [wkKey]: updater(wkPlan) } };
    persistPlans(next);
  }
  function setMonthPlan(updater) {
    const next = { ...plans, monthly: { ...plans.monthly, [moKey]: updater(moPlan) } };
    persistPlans(next);
  }

  /* ── AI: synthesize current review ── */
  function flattenDraft() {
    const lines = [];
    schema.sections.forEach((s) => {
      const v = draft[s.key] || {};
      if (s.type === "triple") {
        s.labels.forEach((lb, i) => { if (v[i]) lines.push(`${s.title} — ${lb}: ${v[i]}`); });
      } else if (s.type === "metrics") {
        KPIS.forEach((m) => { if (v[m.k] !== undefined && v[m.k] !== "") lines.push(`${m.label}: ${v[m.k]}`); });
      } else {
        s.fields.forEach((f) => { if (v[f.k]) lines.push(`${f.label}: ${v[f.k]}`); });
      }
    });
    return lines.join("\n");
  }

  async function synthesize() {
    const body = flattenDraft();
    if (!body.trim()) { setAi({ open: true, loading: false, data: null, error: "Fill in a few fields first." }); return; }
    setAi({ open: true, loading: true, data: null, error: "" });
    const prompt = `You are a calm, exacting strategic advisor reading a founder's ${schema.label} (${schema.altitude} altitude). She runs a bootstrapped multi-brand wellness-education company on a strict 35-hour weekly cap while completing a doctorate. Be specific and grounded, never motivational-guru, never generic.

REVIEW ENTRY:
${body}

Respond with ONLY a JSON object (no markdown, no preamble) with keys:
- "reflection": 2-3 sentences naming what this review actually reveals beneath the surface.
- "action": the single highest-leverage move for the next period, concrete and small enough to finish.
- "watch": one risk or pattern to monitor.
Avoid the words: journey, healing, transformation, proven.`;
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
      let parsed;
      try { parsed = JSON.parse(text.replace(/```json|```/g, "").trim()); }
      catch { parsed = { reflection: text.trim(), action: "", watch: "" }; }
      setAi({ open: true, loading: false, data: parsed, error: "" });
    } catch (e) {
      setAi({ open: true, loading: false, data: null, error: "Couldn't reach the model. Try again in a moment." });
    }
  }

  /* ── AI: pattern scan across weekly reviews ── */
  async function patternScan() {
    const weeklies = entries.filter((e) => e.type === "weekly").slice(0, 6);
    if (weeklies.length < 2) { setScan({ loading: false, data: null, error: "Log at least two weekly reviews to scan for patterns." }); return; }
    setScan({ loading: true, data: null, error: "" });
    const digest = weeklies.map((e, i) => {
      const b = e.data?.bottleneck || {}; const w = e.data?.wins || {};
      return `Week ${i + 1} (${fmtDate(e.created)}) — Bottleneck: ${b.failure || "—"} | Action: ${b.action || "—"} | Wins: ${[w[0], w[1], w[2]].filter(Boolean).join("; ") || "—"}`;
    }).join("\n");
    const prompt = `You are reviewing the last ${weeklies.length} weekly reviews of a bootstrapped founder (35-hour cap, doctorate in progress). The system rule: never carry the same bottleneck two consecutive weeks without naming why.

${digest}

Respond with ONLY a JSON object (no markdown) with keys:
- "recurring": any bottleneck repeating across weeks, named plainly — or "No recurring bottleneck detected."
- "momentum": where wins are clustering (which pillar is compounding).
- "recommendation": one concrete steering adjustment for next week.
Avoid the words: journey, healing, transformation, proven.`;
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
      let parsed; try { parsed = JSON.parse(text.replace(/```json|```/g, "").trim()); }
      catch { parsed = { recurring: text.trim(), momentum: "", recommendation: "" }; }
      setScan({ loading: false, data: parsed, error: "" });
    } catch { setScan({ loading: false, data: null, error: "Couldn't reach the model. Try again." }); }
  }

  /* ── Build a readable digest of all reviews ── */
  function buildDigest() {
    const fmtEntry = (e) => {
      const sc = SCHEMAS[e.type];
      const parts = [`### ${sc.label} — ${fmtDate(e.created)}`];
      sc.sections.forEach((s) => {
        const v = e.data?.[s.key] || {};
        if (s.type === "triple") {
          const items = s.labels.map((lb, i) => v[i] ? `${lb}: ${v[i]}` : null).filter(Boolean);
          if (items.length) parts.push(`**${s.title}** — ${items.join(" · ")}`);
        } else if (s.type === "metrics") {
          const items = KPIS.map((m) => (v[m.k] !== undefined && v[m.k] !== "") ? `${m.label}: ${v[m.k]}` : null).filter(Boolean);
          if (items.length) parts.push(`**Metrics** — ${items.join(" · ")}`);
        } else {
          const items = s.fields.map((f) => v[f.k] ? `${f.label}: ${v[f.k]}` : null).filter(Boolean);
          if (items.length) parts.push(`**${s.title}** — ${items.join(" · ")}`);
        }
      });
      if (e.ai) parts.push(`**Synthesis** — ${[e.ai.reflection, e.ai.action && `Move: ${e.ai.action}`, e.ai.watch && `Watch: ${e.ai.watch}`].filter(Boolean).join(" / ")}`);
      return parts.join("\n");
    };
    const reviews = entries.filter((e) => SCHEMAS[e.type]).sort((a, b) => new Date(b.created) - new Date(a.created)).map(fmtEntry);

    // recent daily check-ins
    const dailies = entries.filter((e) => e.type === "daily").sort((a, b) => b.period.localeCompare(a.period)).slice(0, 10)
      .map((e) => { const d = e.data || {}; const bits = [d.movement && `movement: ${d.movement}`, d.steps && `${Number(d.steps).toLocaleString()} steps`, (d.practices?.length != null) && `${d.practices.length}/${PRACTICE_GOAL} reset practices`, d.brandHours && `${d.brandHours}h brand`, d.focus && `focus: ${d.focus}`, d.win && `win: ${d.win}`].filter(Boolean); return `- ${e.period}: ${bits.join(" · ") || "logged"}`; });
    const dailyBlock = dailies.length ? `### Recent daily check-ins\n${dailies.join("\n")}` : "";

    // current plan
    const wk = plans.weekly[periodKey("weekly")];
    const mo = plans.monthly[periodKey("monthly")];
    const planLines = [];
    if (wk) {
      if (wk.theme) planLines.push(`Theme: ${wk.theme}`);
      if (wk.objectives?.length) planLines.push(`Objectives:\n${wk.objectives.map((o) => `  - [${o.done ? "x" : " "}] ${o.text}`).join("\n")}`);
      const sched = WEEKDAYS.map((d) => wk.movement?.[d] ? `${d}: ${wk.movement[d]}` : null).filter(Boolean);
      if (sched.length) planLines.push(`Movement: ${sched.join(" · ")}`);
    }
    if (mo?.goals?.length) planLines.push(`Monthly goals:\n${mo.goals.map((g) => `  - [${g.done ? "x" : " "}] ${g.text}`).join("\n")}`);
    const planBlock = planLines.length ? `### Current plan\n${planLines.join("\n")}` : "";

    return [...reviews, dailyBlock, planBlock].filter(Boolean).join("\n\n");
  }

  async function exportToNotion() {
    if (!buildDigest().trim()) { setNotion({ loading: false, msg: "", error: "Log a daily check-in, plan, or review first." }); return; }
    setNotion({ loading: true, msg: "", error: "" });
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const prompt = `Create a new page in Notion that summarizes a founder's review log. Place it under the Larice Command Center if you can find it (search the workspace); otherwise create it at the workspace root.

Page title: "Larice Review Summary — ${today}"

Structure the page with a short intro line, then a "Latest signals" callout with the most recent weekly metrics and the current week's plan, then sections grouped by type (Plan, Weekly, Monthly, Quarterly reviews, and recent daily check-ins), most recent first. Keep it clean and scannable with headings and bullets. Do not invent data — use only what is below.

LOG:
${buildDigest()}

After creating the page, reply in one sentence with the page title and its URL.`;
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL, max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
          mcp_servers: [{ type: "url", url: "https://mcp.notion.com/mcp", name: "notion" }],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      const created = (data.content || []).some((b) => b.type === "mcp_tool_use");
      setNotion({ loading: false, error: "", msg: text || (created ? "Summary created in Notion." : "Done.") });
    } catch (e) {
      setNotion({ loading: false, msg: "", error: "Couldn't reach Notion. Enable the Notion connector in your tools menu and try again." });
    }
  }

  /* ── derived data for dashboard ── */
  const weeklySorted = useMemo(
    () => entries.filter((e) => e.type === "weekly").sort((a, b) => new Date(a.created) - new Date(b.created)),
    [entries]
  );
  const chartData = useMemo(() => weeklySorted.map((e) => {
    const m = e.data?.metrics || {};
    const o = { name: fmtDate(e.created).replace(/, \d{4}/, "") };
    KPIS.forEach((k) => { const v = parseFloat(m[k.k]); if (!Number.isNaN(v)) o[k.k] = v; });
    return o;
  }), [weeklySorted]);

  const kpiStat = (k) => {
    const vals = weeklySorted.map((e) => parseFloat(e.data?.metrics?.[k])).filter((v) => !Number.isNaN(v));
    if (!vals.length) return { latest: null, delta: null };
    const latest = vals[vals.length - 1];
    const prev = vals.length > 1 ? vals[vals.length - 2] : null;
    return { latest, delta: prev !== null ? latest - prev : null };
  };

  const counts = {
    daily: entries.filter((e) => e.type === "daily").length,
    weekly: entries.filter((e) => e.type === "weekly").length,
    monthly: entries.filter((e) => e.type === "monthly").length,
    quarterly: entries.filter((e) => e.type === "quarterly").length,
  };

  /* steps + movement + hours for the last 14 days */
  const stepsData = useMemo(() => {
    return lastNKeys("daily", 14).map((pk) => {
      const e = entries.find((x) => x.type === "daily" && x.period === pk);
      const d = e?.data || {};
      const label = pk.slice(5).replace("-", "/");
      return { name: label, steps: d.steps ? parseInt(d.steps, 10) : 0, hours: d.brandHours ? parseFloat(d.brandHours) : 0, move: d.movement || "" };
    });
  }, [entries]);

  const weekStats = useMemo(() => {
    const keys = new Set(lastNKeys("daily", 7));
    const days = entries.filter((e) => e.type === "daily" && keys.has(e.period));
    const steps = days.map((e) => parseInt(e.data?.steps, 10)).filter((n) => !Number.isNaN(n));
    const avgSteps = steps.length ? Math.round(steps.reduce((a, b) => a + b, 0) / steps.length) : null;
    const moveDays = days.filter((e) => e.data?.movement && e.data.movement !== "Rest").length;
    const hours = days.reduce((a, e) => a + (parseFloat(e.data?.brandHours) || 0), 0);
    return { avgSteps, moveDays, hours: Math.round(hours * 10) / 10 };
  }, [entries]);

  /* ── styles ── */
  const S = {
    page: { minHeight: "100vh", background: C.offwhite, color: C.charcoal, fontFamily: "'Outfit', system-ui, sans-serif" },
    shell: { maxWidth: 1180, margin: "0 auto", padding: "0 20px 80px" },
    serif: { fontFamily: "'Cormorant Garamond', Georgia, serif" },
  };

  return (
    <div style={S.page}>
      <style>{`
        * { box-sizing: border-box; }
        .lj-tab { transition: all .2s ease; cursor: pointer; }
        .lj-card { animation: ljfade .45s ease both; }
        @keyframes ljfade { from { opacity: 0; transform: translateY(8px);} to { opacity:1; transform:none;} }
        textarea, input, select { font-family: inherit; }
        .lj-in:focus { outline: 2px solid ${C.clay}; outline-offset: 1px; }
        button:focus-visible { outline: 2px solid ${C.clay}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce){ .lj-card{ animation:none; } .breath-ring{ animation:none !important; } }
        ::placeholder { color: #b7aaa0; opacity:.7; }
        @keyframes breathe { 0%{ transform: scale(.55);} 33.33%{ transform: scale(1);} 100%{ transform: scale(.55);} }
        @keyframes ljovl { from{ opacity:0;} to{ opacity:1;} }
        .breath-ring{ animation: breathe 12s ease-in-out infinite; }
        @keyframes ljpop { 0%{ transform: scale(.7); opacity:0;} 55%{ transform: scale(1.04);} 100%{ transform: scale(1); opacity:1;} }
        @keyframes ljrise { from{ transform: translateY(14px); opacity:0;} to{ transform:none; opacity:1;} }
        @keyframes spark { 0%{ transform: scale(0) rotate(0); opacity:0;} 30%{ opacity:1;} 100%{ transform: scale(1) rotate(35deg); opacity:0;} }
      `}</style>

      {/* Header */}
      <div ref={topRef} style={{ borderBottom: `1px solid ${C.sand}`, background: C.offwhite, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ ...S.shell, padding: "16px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ ...S.serif, fontSize: 24, fontWeight: 700, letterSpacing: ".06em", color: C.brown }}>LARICE</div>
            <div style={{ fontSize: 10.5, letterSpacing: ".26em", textTransform: "uppercase", color: C.clay, marginTop: 2 }}>Accountability across every front</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {NAV.map((item) => {
              const on = groupOf(tab) === item.key;
              return (
                <button key={item.key} className="lj-tab" onClick={() => {
                  if (item.subs) { if (groupOf(tab) !== item.key) { const first = item.subs[0][0]; setTab(first); if (REVIEW_TABS.includes(first)) newDraft(); } }
                  else { setTab(item.key); }
                }}
                  style={{ border: "none", padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                    background: on ? C.brown : "transparent", color: on ? C.offwhite : C.brown,
                    boxShadow: on ? "none" : `inset 0 0 0 1px ${C.taupe}` }}>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* sub-nav for grouped sections */}
        {(() => {
          const g = NAV.find((i) => i.key === groupOf(tab));
          if (!g?.subs) return <div style={{ height: 12 }} />;
          return (
            <div style={{ ...S.shell, padding: "8px 20px 12px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {g.subs.map(([k, lb]) => {
                const on = tab === k;
                return (
                  <button key={k} className="lj-tab" onClick={() => { setTab(k); if (REVIEW_TABS.includes(k)) newDraft(); }}
                    style={{ border: "none", padding: "6px 13px", borderRadius: 999, fontSize: 12.5, fontWeight: 600,
                      background: on ? C.clay : C.sand, color: on ? C.offwhite : C.brown }}>
                    {lb}{REVIEW_TABS.includes(k) && counts[k] ? ` · ${counts[k]}` : ""}
                  </button>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Launch context strip */}
      <div style={{ background: C.brown, color: C.offwhite }}>
        <div style={{ ...S.shell, padding: "8px 20px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", fontSize: 12.5 }}>
          <span style={{ fontWeight: 600, letterSpacing: ".04em", color: C.gold }}>{lc.label}</span>
          <span style={{ opacity: .55 }}>·</span>
          <span style={{ opacity: .85 }}>90-day calendar · Jun 15 – Sep 12, 2026</span>
          {!lc.pre && lc.week && ACTIVATIONS[lc.week] && (
            <>
              <span style={{ opacity: .55 }}>·</span>
              <span style={{ opacity: .85 }}>Activating this week: {ACTIVATIONS[lc.week].join(" / ")}</span>
            </>
          )}
        </div>
      </div>

      <div style={S.shell}>
        {!ready && <div style={{ padding: 60, textAlign: "center", color: C.clay }}>Opening your journal…</div>}

        {/* DAILY CHECK-IN */}
        {ready && tab === "daily" && (
          <DailyView
            S={S} dayDate={dayDate} setDayDate={setDayDate} dayData={dayData} setDay={setDay}
            entries={entries} loadEntry={loadEntry} deleteEntry={deleteEntry} lc={lc}
            togglePractice={togglePractice} comm={comm}
            personal={plans.personal || []} savePersonal={(n) => persistPlans({ ...plans, personal: n })}
          />
        )}

        {/* WEEKLY PLAN */}
        {ready && tab === "plan" && (
          <PlanView
            S={S} wkPlan={wkPlan} setWeekPlan={setWeekPlan} moPlan={moPlan} setMonthPlan={setMonthPlan}
            wkKey={wkKey} lc={lc}
          />
        )}

        {/* PRACTICES LIBRARY */}
        {ready && tab === "practices" && (
          <PracticesView
            S={S} today={periodKey("daily")} entries={entries} togglePractice={togglePractice} practicesDone={practicesDone}
            openPlayer={(p) => setPlayer(p)}
          />
        )}

        {/* COMMUNICATION MASTERY */}
        {ready && tab === "comms" && (
          <CommView
            S={S} comm={comm} today={periodKey("daily")} wkKey={periodKey("weekly")}
            logDrill={logDrill} toggleRep={toggleRep} setCommEnergy={setCommEnergy} deleteTalk={deleteTalk}
            openDrill={(d) => setDrillPlayer({ ...d, arch: "Comm", run: { mode: "timer", seconds: d.min * 60, cues: d.steps } })}
            openScorer={() => setScorer(true)} mi={monthIndexNow()}
          />
        )}

        {/* ROADMAP */}
        {ready && tab === "roadmap" && (
          <RoadmapView
            S={S} roadmap={roadmap} saveRoadmap={saveRoadmap} manych={manych} weeklySorted={weeklySorted}
          />
        )}

        {ready && isReview && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 28, marginTop: 28 }} className="lj-grid">
            {/* Composer column */}
            <div>
              {/* altitude banner */}
              <div className="lj-card" style={{ display: "flex", gap: 18, alignItems: "center", padding: "22px 24px", borderRadius: 16,
                background: C.sand, borderLeft: `5px solid ${schema.accent}` }}>
                <NerveBranch h={120} active={tab} />
                <div>
                  <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: schema.accent, fontWeight: 600 }}>{schema.altitude} altitude</div>
                  <div style={{ ...S.serif, fontSize: 28, fontWeight: 600, color: C.brown, margin: "2px 0 4px" }}>{schema.label}</div>
                  <div style={{ fontSize: 13, color: C.clay }}>{schema.cadence}</div>
                  <div style={{ ...S.serif, fontStyle: "italic", fontSize: 15, color: C.charcoal, marginTop: 8, opacity: .85 }}>{schema.note}</div>
                  {tab === "weekly" && !lc.pre && lc.week && (
                    <div style={{ marginTop: 10, fontSize: 12.5, color: schema.accent, fontWeight: 600 }}>
                      {lc.label}{ACTIVATIONS[lc.week] ? ` · keywords going live: ${ACTIVATIONS[lc.week].join(" / ")}` : " · no new keyword activations"}
                    </div>
                  )}
                  {tab === "weekly" && lc.pre && (
                    <div style={{ marginTop: 10, fontSize: 12.5, color: schema.accent, fontWeight: 600 }}>{lc.label} · pre-launch build</div>
                  )}
                </div>
              </div>

              {editingId && (
                <div style={{ marginTop: 14, fontSize: 13, color: C.clay, display: "flex", gap: 10, alignItems: "center" }}>
                  Editing a saved review.
                  <button onClick={newDraft} style={ghostBtn}>Start a new one</button>
                </div>
              )}

              {/* sections */}
              {schema.sections.map((s) => (
                <div key={s.key} className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 1px 0 ${C.sand}, 0 8px 24px -18px rgba(74,58,50,.4)` }}>
                  <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>{s.title}</div>
                  {s.sub && <div style={{ fontSize: 12.5, color: C.clay, marginTop: 3, marginBottom: 14 }}>{s.sub}</div>}

                  {s.type === "triple" && (
                    <div style={{ display: "grid", gap: 12 }}>
                      {s.labels.map((lb, i) => (
                        <label key={i} style={{ display: "block" }}>
                          <span style={fieldLabel(schema.accent)}>{lb}</span>
                          <input className="lj-in" value={(draft[s.key]?.[i]) || ""} onChange={(e) => setField(s.key, i, e.target.value)}
                            placeholder={`A specific ${lb.toLowerCase()} win…`} style={inputStyle} />
                        </label>
                      ))}
                    </div>
                  )}

                  {s.type === "metrics" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
                      {KPIS.map((m) => (
                        <label key={m.k} style={{ display: "block" }}>
                          <span style={fieldLabel(schema.accent)}>{m.label} {m.unit && <em style={{ fontStyle: "normal", color: C.taupe }}>{m.unit}</em>}</span>
                          <input className="lj-in" type="number" value={(draft[s.key]?.[m.k]) ?? ""} onChange={(e) => setField(s.key, m.k, e.target.value)}
                            placeholder="0" style={inputStyle} />
                        </label>
                      ))}
                    </div>
                  )}

                  {s.type === "fields" && (
                    <div style={{ display: "grid", gridTemplateColumns: s.fields.length > 3 ? "repeat(auto-fit,minmax(200px,1fr))" : "1fr", gap: 12 }}>
                      {s.fields.map((f) => (
                        <label key={f.k} style={{ display: "block", gridColumn: f.type === "textarea" ? "1 / -1" : "auto" }}>
                          <span style={fieldLabel(schema.accent)}>{f.label}</span>
                          {f.type === "textarea" ? (
                            <textarea className="lj-in" rows={3} value={(draft[s.key]?.[f.k]) || ""} onChange={(e) => setField(s.key, f.k, e.target.value)} placeholder={f.ph || ""} style={{ ...inputStyle, resize: "vertical" }} />
                          ) : f.type === "select" ? (
                            <select className="lj-in" value={(draft[s.key]?.[f.k]) || ""} onChange={(e) => setField(s.key, f.k, e.target.value)} style={inputStyle}>
                              <option value="">Select…</option>
                              {f.opts.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          ) : (
                            <input className="lj-in" type={f.type === "number" ? "number" : "text"} value={(draft[s.key]?.[f.k]) ?? ""} onChange={(e) => setField(s.key, f.k, e.target.value)} placeholder={f.ph || ""} style={inputStyle} />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* actions */}
              <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                <button onClick={saveReview} style={primaryBtn}>{editingId ? "Update review" : "Save review"}</button>
                <button onClick={synthesize} style={goldBtn}>✦ Synthesize with Claude</button>
              </div>

              {/* AI output */}
              {ai.open && (
                <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: C.brown, color: C.offwhite }}>
                  <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: C.gold, fontWeight: 600 }}>Synthesis</div>
                  {ai.loading && <div style={{ marginTop: 10, opacity: .8 }}>Reading your review…</div>}
                  {ai.error && <div style={{ marginTop: 10, color: C.taupe }}>{ai.error}</div>}
                  {ai.data && (
                    <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
                      {[["What this reveals", ai.data.reflection], ["Highest-leverage move", ai.data.action], ["Watch", ai.data.watch]]
                        .filter(([, v]) => v).map(([t, v]) => (
                        <div key={t}>
                          <div style={{ ...S.serif, fontSize: 16, color: C.gold }}>{t}</div>
                          <div style={{ fontSize: 14, lineHeight: 1.55, marginTop: 3 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Side rail: this type's history + streak */}
            <div>
              <div className="lj-card" style={{ padding: "18px 18px", borderRadius: 14, background: C.sand }}>
                <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.clay, fontWeight: 600 }}>Cadence</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                  <span style={{ ...S.serif, fontSize: 40, fontWeight: 700, color: schema.accent }}>{streakOf(entries, tab)}</span>
                  <span style={{ fontSize: 13, color: C.clay }}>{tab === "weekly" ? "weeks" : tab === "monthly" ? "months" : "quarters"} in a row</span>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 12, flexWrap: "wrap" }}>
                  {lastNKeys(tab, tab === "weekly" ? 12 : tab === "monthly" ? 6 : 4).map((pk) => {
                    const done = entries.some((e) => e.type === tab && e.period === pk);
                    return <span key={pk} title={pk} style={{ width: 16, height: 16, borderRadius: 4, background: done ? schema.accent : "#fff", boxShadow: `inset 0 0 0 1px ${C.taupe}` }} />;
                  })}
                </div>
                <div style={{ fontSize: 11, color: C.taupe, marginTop: 8 }}>Recent periods · filled = completed</div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.clay, fontWeight: 600, marginBottom: 8 }}>Past {schema.label.toLowerCase()}s</div>
                {entries.filter((e) => e.type === tab).length === 0 && (
                  <div style={{ fontSize: 13, color: C.taupe }}>None yet. Your first one anchors the cadence.</div>
                )}
                <div style={{ display: "grid", gap: 8 }}>
                  {entries.filter((e) => e.type === tab).map((e) => (
                    <div key={e.id} style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", boxShadow: `inset 0 0 0 1px ${C.sand}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <button onClick={() => loadEntry(e)} style={{ ...ghostBtn, padding: 0, color: C.brown, fontWeight: 600, fontSize: 13 }}>{fmtDate(e.created)}</button>
                      <button onClick={() => deleteEntry(e.id)} aria-label="Delete" style={{ ...ghostBtn, color: C.taupe, fontSize: 12 }}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {ready && tab === "dashboard" && (
          <div style={{ marginTop: 28 }}>
            <div className="lj-card" style={{ ...S.serif, fontSize: 30, fontWeight: 600, color: C.brown }}>CEO Dashboard</div>
            <div style={{ fontSize: 13, color: C.clay, marginBottom: 20 }}>Quantified from your weekly metrics. {weeklySorted.length} week{weeklySorted.length === 1 ? "" : "s"} logged.</div>

            {/* Roadmap pulse — actuals vs phase targets */}
            {(() => {
              const mi = monthIndexNow();
              const pIdx = phaseIndexForMonth(Math.max(1, mi));
              const ph = PHASES[pIdx];
              const lm = weeklySorted[weeklySorted.length - 1]?.data?.metrics || {};
              const mrrV = verdict(lm.mrr ? +lm.mrr : null, ph.mrr);
              const emV = ph.emails ? verdict(lm.emailList ? +lm.emailList : null, ph.emails) : { label: "—", color: C.taupe };
              const exitN = (roadmap.exit?.[ph.n] || []).length;
              const fs = fiveStreak(entries, PRACTICE_GOAL);
              const talksAsc2 = [...(comm.talks || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
              const lastTalk = talksAsc2.length ? talksAsc2[talksAsc2.length - 1].total : null;
              const talkV = lastTalk == null ? { label: "score a talk", color: C.taupe } : { label: lastTalk >= 35 ? "public-ready" : lastTalk >= 25 ? "developing" : "rebuild basics", color: lastTalk >= 35 ? ARCH.Rooted : lastTalk >= 25 ? C.gold : "#a85a4a" };
              return (
                <div className="lj-card" style={{ padding: "18px 22px", borderRadius: 16, background: C.sand, marginBottom: 18, borderLeft: `5px solid ${C.clay}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>{mi <= 0 ? "Pre-launch" : `Month ${mi}`} · Phase {ph.n} — {ph.name}</div>
                    <span style={{ fontSize: 12, color: C.clay }}>{ph.dates}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 12 }}>
                    <PulseStat label="MRR" actual={lm.mrr ? fmtUSD(+lm.mrr) : "—"} target={ph.mrrLabel} v={mrrV} />
                    <PulseStat label="Email list" actual={lm.emailList ? (+lm.emailList).toLocaleString() : "—"} target={ph.emailLabel} v={emV} />
                    <PulseStat label="Exit criteria" actual={`${exitN} / ${ph.exit.length}`} target="phase gate" v={{ label: exitN === ph.exit.length ? "gate clear" : "in progress", color: exitN === ph.exit.length ? ARCH.Rooted : C.clay }} />
                    <PulseStat label="Reset streak" actual={fs ? `${fs} days` : "—"} target="5/5 daily" v={{ label: fs >= 7 ? "strong" : fs > 0 ? "building" : "start today", color: fs > 0 ? ARCH.Rooted : C.taupe }} />
                    <PulseStat label="Comm rubric" actual={lastTalk != null ? `${lastTalk}/50` : "—"} target="35+ public-ready" v={talkV} />
                  </div>
                  <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 10 }}>Full phase view, exit checklist, and revenue mix on the Roadmap tab.</div>
                </div>
              );
            })()}

            {/* Live performance (Shopify + Klaviyo via connectors) */}
            <div className="lj-card" style={{ padding: "22px 24px", borderRadius: 16, background: C.brown, color: C.offwhite, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ ...S.serif, fontSize: 20, fontWeight: 600, color: C.gold }}>Live performance</div>
                  <div style={{ fontSize: 12.5, opacity: .85, marginTop: 2 }}>
                    Pulls current numbers from Shopify + Klaviyo on demand. {live?.at ? `As of ${new Date(live.at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}` : "Not pulled yet."}
                  </div>
                </div>
                <button onClick={fetchLive} disabled={liveStatus.loading} style={{ ...goldBtn, background: liveStatus.loading ? C.taupe : C.gold, borderColor: C.gold, color: C.brown }}>
                  {liveStatus.loading ? "Pulling…" : "↻ Refresh"}
                </button>
              </div>
              {liveStatus.error && <div style={{ marginTop: 12, color: "#f0c9bf", fontSize: 13 }}>{liveStatus.error}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 16 }}>
                <LiveStat S={S} label="Revenue · 30d" value={live?.shopify?.revenue30d != null ? `${live.shopify.currency || "$"}${Number(live.shopify.revenue30d).toLocaleString()}` : "—"} src="Shopify" />
                <LiveStat S={S} label="Orders · 30d" value={live?.shopify?.orders30d != null ? Number(live.shopify.orders30d).toLocaleString() : "—"} src="Shopify" />
                <LiveStat S={S} label="Subscribers" value={live?.klaviyo?.subscribers != null ? Number(live.klaviyo.subscribers).toLocaleString() : "—"} src="Klaviyo" />
                <LiveStat S={S} label="Last campaign open" value={live?.klaviyo?.lastCampaignOpenRate != null ? `${live.klaviyo.lastCampaignOpenRate}%` : "—"} src="Klaviyo" />
              </div>
              {/* ManyChat — manual */}
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid rgba(247,245,242,.18)` }}>
                <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.gold }}>ManyChat · entered by hand</div>
                <div style={{ fontSize: 11.5, opacity: .75, marginTop: 2, marginBottom: 10 }}>No ManyChat connector exists, so these are typed in — update them when you check ManyChat.</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
                  {[["contacts", "Total contacts"], ["keywordDMs", "Keyword DMs · this wk"], ["optinRate", "Opt-in rate %"]].map(([k, lb]) => (
                    <label key={k} style={{ display: "block" }}>
                      <span style={{ fontSize: 11, color: C.gold }}>{lb}</span>
                      <input type="number" value={manych[k] ?? ""} onChange={(e) => saveManych({ ...manych, [k]: e.target.value })}
                        placeholder="0" style={{ width: "100%", marginTop: 4, padding: "8px 10px", borderRadius: 8, border: "none", fontSize: 14, background: "rgba(247,245,242,.12)", color: C.offwhite }} />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
              {KPIS.map((k) => {
                const st = kpiStat(k.k);
                return (
                  <div key={k.k} className="lj-card" style={{ padding: "16px 16px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)`, borderTop: `3px solid ${k.color}` }}>
                    <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: C.clay }}>{k.label}</div>
                    <div style={{ ...S.serif, fontSize: 26, fontWeight: 700, color: C.brown, marginTop: 4 }}>
                      {st.latest === null ? "—" : k.fmt(st.latest)}
                    </div>
                    {st.delta !== null && (
                      <div style={{ fontSize: 12, marginTop: 2, color: st.delta >= 0 ? "#5d7a5e" : "#a85a4a" }}>
                        {st.delta >= 0 ? "▲" : "▼"} {k.fmt(Math.abs(st.delta))} vs last week
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {chartData.length === 0 ? (
              <div className="lj-card" style={{ marginTop: 22, padding: 40, borderRadius: 14, background: C.sand, textAlign: "center", color: C.clay }}>
                No metrics yet. Run a Weekly Review and fill in the Metrics section — the charts build themselves from there.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }} className="lj-charts">
                <ChartCard title="MRR" serif={S.serif}>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ left: -10, right: 8, top: 8 }}>
                      <CartesianGrid stroke={C.sand} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.clay }} />
                      <YAxis tick={{ fontSize: 11, fill: C.clay }} />
                      <Tooltip contentStyle={tipStyle} />
                      <Line type="monotone" dataKey="mrr" stroke={C.clay} strokeWidth={2.5} dot={{ r: 3, fill: C.clay }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Email list growth" serif={S.serif}>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ left: -10, right: 8, top: 8 }}>
                      <CartesianGrid stroke={C.sand} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.clay }} />
                      <YAxis tick={{ fontSize: 11, fill: C.clay }} />
                      <Tooltip contentStyle={tipStyle} />
                      <Line type="monotone" dataKey="emailList" stroke={C.gold} strokeWidth={2.5} dot={{ r: 3, fill: C.gold }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Doctoral output (words / week)" serif={S.serif}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} margin={{ left: -10, right: 8, top: 8 }}>
                      <CartesianGrid stroke={C.sand} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.clay }} />
                      <YAxis tick={{ fontSize: 11, fill: C.clay }} />
                      <Tooltip contentStyle={tipStyle} />
                      <Bar dataKey="doctoralWords" fill={C.brown} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Save rate & comm rubric" serif={S.serif}>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ left: -10, right: 8, top: 8 }}>
                      <CartesianGrid stroke={C.sand} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.clay }} />
                      <YAxis tick={{ fontSize: 11, fill: C.clay }} />
                      <Tooltip contentStyle={tipStyle} />
                      <Line type="monotone" dataKey="contentSaveRate" stroke={C.taupe} strokeWidth={2.5} dot={{ r: 3 }} name="Save rate %" />
                      <Line type="monotone" dataKey="commScore" stroke="#8a6f5e" strokeWidth={2.5} dot={{ r: 3 }} name="Comm /10" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {/* Pattern scan */}
            <div className="lj-card" style={{ marginTop: 24, padding: "22px 24px", borderRadius: 16, background: C.sand }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ ...S.serif, fontSize: 20, fontWeight: 600, color: C.brown }}>Bottleneck pattern scan</div>
                  <div style={{ fontSize: 12.5, color: C.clay, marginTop: 2 }}>Claude reads your recent weekly bottlenecks — flags anything carried two weeks running.</div>
                </div>
                <button onClick={patternScan} style={goldBtn}>✦ Scan recent weeks</button>
              </div>
              {scan.loading && <div style={{ marginTop: 14, color: C.clay }}>Scanning…</div>}
              {scan.error && <div style={{ marginTop: 14, color: "#a85a4a" }}>{scan.error}</div>}
              {scan.data && (
                <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
                  {[["Recurring bottleneck", scan.data.recurring], ["Where momentum is building", scan.data.momentum], ["Steering adjustment", scan.data.recommendation]]
                    .filter(([, v]) => v).map(([t, v]) => (
                    <div key={t} style={{ padding: "12px 14px", background: "#fff", borderRadius: 10, borderLeft: `4px solid ${C.clay}` }}>
                      <div style={{ ...S.serif, fontSize: 15, color: C.brown }}>{t}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.5, color: C.charcoal, marginTop: 3 }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Daily wellness */}
            <div style={{ marginTop: 24, ...S.serif, fontSize: 20, fontWeight: 600, color: C.brown }}>Daily wellness</div>
            <div style={{ fontSize: 12.5, color: C.clay, marginBottom: 12 }}>From your daily check-ins (last 7–14 days). Steps are entered by hand.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
              <StatCard S={S} label="Avg steps · 7-day" value={weekStats.avgSteps === null ? "—" : weekStats.avgSteps.toLocaleString()} color={C.gold} foot={weekStats.avgSteps !== null ? `goal ${STEP_GOAL.toLocaleString()}` : ""} />
              <StatCard S={S} label="Movement days · this week" value={`${weekStats.moveDays} / 7`} color={C.clay} foot="Pilates, strength, walks" />
              <StatCard S={S} label="Brand hours · this week" value={`${weekStats.hours}h`} color={C.brown} foot={`of 35h cap · ${Math.max(0, 35 - weekStats.hours).toFixed(1)}h left`} />
              <StatCard S={S} label="Reset practices · today" value={`${practicesDone(periodKey("daily"))} / ${PRACTICE_GOAL}`} color={ARCH.Rooted} foot={practicesDone(periodKey("daily")) >= PRACTICE_GOAL ? "goal met" : "from the Practices tab"} />
            </div>
            {stepsData.some((d) => d.steps > 0) && (
              <div style={{ marginTop: 14 }}>
                <ChartCard title="Steps · last 14 days" serif={S.serif}>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={stepsData} margin={{ left: -10, right: 8, top: 8 }}>
                      <CartesianGrid stroke={C.sand} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: C.clay }} interval={0} />
                      <YAxis tick={{ fontSize: 11, fill: C.clay }} />
                      <Tooltip contentStyle={tipStyle} />
                      <Bar dataKey="steps" fill={C.gold} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}

            {/* Export to Notion */}
            <div className="lj-card" style={{ marginTop: 18, padding: "22px 24px", borderRadius: 16, background: "#fff", boxShadow: `0 8px 26px -20px rgba(74,58,50,.5)`, borderLeft: `5px solid ${C.gold}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ ...S.serif, fontSize: 20, fontWeight: 600, color: C.brown }}>Export summary to Notion</div>
                  <div style={{ fontSize: 12.5, color: C.clay, marginTop: 2 }}>Sends a clean, grouped summary of every saved review to your workspace — placed under the Command Center.</div>
                </div>
                <button onClick={exportToNotion} disabled={notion.loading} style={{ ...primaryBtn, background: notion.loading ? C.taupe : C.clay }}>
                  {notion.loading ? "Sending…" : "Send to Notion"}
                </button>
              </div>
              {notion.error && <div style={{ marginTop: 12, color: "#a85a4a", fontSize: 13 }}>{notion.error}</div>}
              {notion.msg && <div style={{ marginTop: 12, padding: "12px 14px", background: C.sand, borderRadius: 10, fontSize: 14, color: C.brown }}>{notion.msg}</div>}
              <div style={{ fontSize: 11, color: C.taupe, marginTop: 10 }}>Requires the Notion connector enabled in your tools menu.</div>
            </div>

            {/* full history */}
            <div style={{ marginTop: 24 }}>
              <div style={{ ...S.serif, fontSize: 20, fontWeight: 600, color: C.brown, marginBottom: 10 }}>All reviews</div>
              {entries.length === 0 && <div style={{ color: C.taupe }}>Nothing logged yet.</div>}
              <div style={{ display: "grid", gap: 8 }}>
                {entries.filter((e) => SCHEMAS[e.type]).sort((a, b) => new Date(b.created) - new Date(a.created)).map((e) => (
                  <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fff", borderRadius: 10, boxShadow: `inset 0 0 0 1px ${C.sand}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: SCHEMAS[e.type].accent }} />
                      <span style={{ fontWeight: 600, color: C.brown, fontSize: 14 }}>{SCHEMAS[e.type].label}</span>
                      <span style={{ color: C.clay, fontSize: 13 }}>{fmtDate(e.created)}</span>
                      {e.ai && <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>✦ synthesized</span>}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => loadEntry(e)} style={ghostBtn}>Open</button>
                      <button onClick={() => deleteEntry(e.id)} style={{ ...ghostBtn, color: C.taupe }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {reward && <RewardOverlay streak={reward.streak} onClose={() => setReward(null)} />}

      {drillPlayer && (
        <PracticePlayer
          practice={drillPlayer}
          onClose={() => setDrillPlayer(null)}
          onComplete={(id) => { logDrill(periodKey("daily"), id); }}
        />
      )}

      {scorer && (
        <RubricScorer onClose={() => setScorer(false)} onSave={(t) => { saveTalk(t); setScorer(false); }} />
      )}

      {player && (
        <PracticePlayer
          practice={player}
          onClose={() => setPlayer(null)}
          onComplete={(id, extra) => { markPracticeDone(periodKey("daily"), id, extra); setToast("Practice logged"); }}
        />
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: C.brown, color: C.offwhite, padding: "10px 20px", borderRadius: 999, fontSize: 13, boxShadow: "0 10px 30px -10px rgba(0,0,0,.4)", zIndex: 50 }}>{toast}</div>
      )}

      <style>{`
        @media (max-width: 880px){
          .lj-grid{ grid-template-columns: 1fr !important; }
          .lj-charts{ grid-template-columns: 1fr !important; }
          .lj-glance{ grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

/* ── small pieces ── */
function StatCard({ S, label, value, color, foot }) {
  return (
    <div className="lj-card" style={{ padding: "16px 16px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)`, borderTop: `3px solid ${color}` }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.clay }}>{label}</div>
      <div style={{ ...S.serif, fontSize: 26, fontWeight: 700, color: C.brown, marginTop: 4 }}>{value}</div>
      {foot && <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 2 }}>{foot}</div>}
    </div>
  );
}

function LiveStat({ S, label, value, src }) {
  return (
    <div style={{ padding: "14px 14px", borderRadius: 12, background: "rgba(247,245,242,.08)" }}>
      <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", opacity: .75 }}>{label}</div>
      <div style={{ ...S.serif, fontSize: 24, fontWeight: 700, color: C.offwhite, marginTop: 3 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: C.gold, marginTop: 2 }}>{src}</div>
    </div>
  );
}

function PulseStat({ label, actual, target, v }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "12px 13px", boxShadow: `inset 0 0 0 1px rgba(203,184,169,.5)` }}>
      <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: C.clay }}>{label}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: C.brown, marginTop: 2 }}>{actual}</div>
      <div style={{ fontSize: 10.5, color: C.taupe }}>{target}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: v.color, marginTop: 2 }}>{v.label}</div>
    </div>
  );
}

function ChartCard({ title, children, serif }) {
  return (
    <div className="lj-card" style={{ padding: "16px 16px 8px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 26px -20px rgba(74,58,50,.5)` }}>
      <div style={{ ...serif, fontSize: 16, fontWeight: 600, color: C.brown, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", marginTop: 5, padding: "9px 11px", border: `1px solid ${C.taupe}`,
  borderRadius: 9, fontSize: 14, color: C.charcoal, background: C.offwhite,
};
const fieldLabel = (accent) => ({ fontSize: 12, fontWeight: 600, color: accent, letterSpacing: ".02em" });
const primaryBtn = { border: "none", background: C.clay, color: C.offwhite, padding: "11px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const goldBtn = { border: `1px solid ${C.gold}`, background: "#fff", color: C.brown, padding: "11px 18px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const ghostBtn = { border: "none", background: "transparent", cursor: "pointer", fontSize: 13 };
const tipStyle = { background: C.brown, border: "none", borderRadius: 8, color: C.offwhite, fontSize: 12 };
const serifStyle = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

/* ── Daily check-in view ── */
function DailyView({ S, dayDate, setDayDate, dayData, setDay, entries, loadEntry, deleteEntry, lc, togglePractice, comm, personal, savePersonal }) {
  const dateObj = new Date(dayDate + "T12:00:00");
  const isToday = dayDate === periodKey("daily");
  const stepPct = Math.min(100, Math.round(((parseInt(dayData.steps, 10) || 0) / STEP_GOAL) * 100));
  const shiftDay = (n) => setDayDate(periodKey("daily", new Date(dateObj.getTime() + n * 86400000)));
  const recent = entries.filter((e) => e.type === "daily").sort((a, b) => b.period.localeCompare(a.period)).slice(0, 10);
  const energyLabels = ["Depleted", "Low", "Steady", "Good", "Charged"];
  const [newCommit, setNewCommit] = useState("");

  // content posting for the day
  const slot = POSTING_GRID[dateObj.getDay()];
  const restDay = slot.kind === "Rest";
  const posted = dayData.posted || [];
  const togglePosted = (k) => setDay("posted", posted.includes(k) ? posted.filter((x) => x !== k) : [...posted, k]);

  // weekly posting consistency (Mon–Sat schedule, 6 slots/brand; Phase 1 gate 4–7/wk per handle)
  const POSTS_MIN = 4, POSTS_MAX = 6;
  const weekStartMon = (() => { const d = new Date(dateObj); const dow = (d.getDay() + 6) % 7; d.setDate(d.getDate() - dow); return d; })();
  const weekKeys = [...Array(7)].map((_, i) => periodKey("daily", new Date(weekStartMon.getTime() + i * 86400000)));
  const weekPosted = (bk) => weekKeys.reduce((n, k) => { const e = entries.find((x) => x.type === "daily" && x.period === k); return n + ((e?.data?.posted || []).includes(bk) ? 1 : 0); }, 0);

  // personal commitments
  const personalDone = dayData.personalDone || [];
  const togglePersonal = (id) => setDay("personalDone", personalDone.includes(id) ? personalDone.filter((x) => x !== id) : [...personalDone, id]);
  const addCommit = () => { const t = newCommit.trim(); if (!t) return; savePersonal([...(personal || []), { id: `p-${Date.now()}`, label: t }]); setNewCommit(""); };
  const removeCommit = (id) => savePersonal((personal || []).filter((p) => p.id !== id));
  const personalN = (personal || []).filter((p) => personalDone.includes(p.id)).length;

  // glance figures
  const resetN = (dayData.practices || []).length;
  const drillN = (comm?.drills?.[dayDate] || []).length;
  const contentN = restDay ? 0 : posted.length;
  const glance = [
    { label: "Content", v: restDay ? "rest" : `${contentN}/${BRANDS.length}`, color: restDay ? C.taupe : (contentN >= BRANDS.length ? ARCH.Rooted : C.clay) },
    { label: "Resets", v: `${resetN}/${PRACTICE_GOAL}`, color: resetN >= PRACTICE_GOAL ? ARCH.Rooted : C.gold },
    { label: "Drills", v: `${drillN}/5`, color: drillN >= 5 ? ARCH.Rooted : COMM },
    { label: "Move", v: dayData.movement ? (dayData.movement === "Rest" ? "rest" : "✓") : "—", color: dayData.movement && dayData.movement !== "Rest" ? ARCH.Rooted : C.taupe },
    { label: "Steps", v: dayData.steps ? Number(dayData.steps).toLocaleString() : "—", color: C.brown },
    { label: "Brand h", v: dayData.brandHours ? `${dayData.brandHours}h` : "—", color: C.brown },
    { label: "Personal", v: (personal || []).length ? `${personalN}/${personal.length}` : "—", color: personalN && personalN === (personal || []).length ? ARCH.Rooted : C.clay },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 28, marginTop: 28 }} className="lj-grid">
      <div>
        <div className="lj-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "22px 24px", borderRadius: 16, background: C.sand, borderLeft: `5px solid ${C.gold}`, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: C.gold, fontWeight: 600 }}>{isToday ? (lc.pre ? "Pre-launch" : lc.label) : "Daily check-in"}</div>
            <div style={{ ...serifStyle, fontSize: 26, fontWeight: 600, color: C.brown, margin: "2px 0" }}>
              {isToday ? "Today" : dateObj.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
            <div style={{ fontSize: 13, color: C.clay }}>{dateObj.toLocaleDateString("en-US", { weekday: isToday ? undefined : "long", month: "long", day: "numeric", year: "numeric" })}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => shiftDay(-1)} style={goldBtn} aria-label="Previous day">←</button>
            {!isToday && <button onClick={() => setDayDate(periodKey("daily"))} style={goldBtn}>Today</button>}
            <button onClick={() => shiftDay(1)} disabled={isToday} style={{ ...goldBtn, opacity: isToday ? .4 : 1 }} aria-label="Next day">→</button>
          </div>
        </div>

        {/* glance */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))", gap: 8, marginTop: 14 }} className="lj-glance">
          {glance.map((g) => (
            <div key={g.label} style={{ background: "#fff", borderRadius: 12, padding: "10px 8px", textAlign: "center", boxShadow: `inset 0 0 0 1px ${C.sand}` }}>
              <div style={{ ...serifStyle, fontSize: 17, fontWeight: 700, color: g.color, lineHeight: 1.1 }}>{g.v}</div>
              <div style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: C.taupe, marginTop: 3 }}>{g.label}</div>
            </div>
          ))}
        </div>

        {/* content posting schedule */}
        <DCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <Lbl c={C.clay}>Content posting · {dateObj.toLocaleDateString("en-US", { weekday: "long" })}</Lbl>
            <span style={{ fontSize: 12, fontWeight: 600, color: restDay ? C.taupe : (contentN >= BRANDS.length ? ARCH.Rooted : C.clay) }}>{restDay ? "rest day" : `${contentN}/${BRANDS.length} posted`}</span>
          </div>
          {restDay ? (
            <div style={{ fontSize: 13, color: C.taupe, marginTop: 8 }}>No scheduled posts today. Rest is part of the cadence.</div>
          ) : (
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              {BRANDS.map((b) => {
                const on = posted.includes(b.key);
                return (
                  <button key={b.key} onClick={() => togglePosted(b.key)} style={{ display: "flex", alignItems: "center", gap: 11, textAlign: "left", border: "none", background: on ? C.sand : C.offwhite, padding: "11px 13px", borderRadius: 11, cursor: "pointer", width: "100%", boxShadow: `inset 0 0 0 1px ${C.sand}` }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${b.color}`, background: on ? b.color : "#fff", color: "#fff", flexShrink: 0, fontSize: 12, lineHeight: "16px", textAlign: "center" }}>{on ? "✓" : ""}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.brown }}>{b.name}</span>
                      <span style={{ fontSize: 12, color: b.color, fontWeight: 600 }}> · {slot.kind}</span>
                      <div style={{ fontSize: 11.5, color: C.taupe }}>{b.handle} · {b.platforms} · {slot.format}</div>
                    </span>
                  </button>
                );
              })}
              {!lc.pre && lc.week && ACTIVATIONS[lc.week] && (
                <div style={{ fontSize: 11.5, color: C.clay, marginTop: 2 }}>Activating this week: {ACTIVATIONS[lc.week].join(" / ")}</div>
              )}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.sand}`, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: C.taupe, fontWeight: 600 }}>This week</span>
            {BRANDS.map((b) => {
              const n = weekPosted(b.key);
              const col = n >= POSTS_MIN ? ARCH.Rooted : n > 0 ? C.gold : C.taupe;
              return (
                <span key={b.key} style={{ fontSize: 12, fontWeight: 600, color: col, background: C.sand, padding: "3px 10px", borderRadius: 999 }}>
                  {b.name === "LoveLarice" ? "LL" : "TRC"} {n}/{POSTS_MAX}
                </span>
              );
            })}
            <span style={{ fontSize: 11, color: C.taupe }}>gate: {POSTS_MIN}–7/wk per handle · 8+ wks</span>
          </div>
        </DCard>

        {/* focus */}
        <DCard><Lbl c={C.gold}>Top focus today</Lbl>
          <input className="lj-in" value={dayData.focus || ""} onChange={(e) => setDay("focus", e.target.value)} placeholder="The one thing that matters most today." style={inputStyle} />
        </DCard>

        {/* personal front */}
        <DCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <Lbl c={ARCH.Reclaimer}>Personal</Lbl>
            {(personal || []).length > 0 && <span style={{ fontSize: 12, fontWeight: 600, color: personalN === personal.length ? ARCH.Rooted : C.clay }}>{personalN}/{personal.length} kept</span>}
          </div>
          <input className="lj-in" value={dayData.personalIntention || ""} onChange={(e) => setDay("personalIntention", e.target.value)} placeholder="One intention for your life outside the work today." style={inputStyle} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {(personal || []).map((p) => {
              const on = personalDone.includes(p.id);
              return (
                <span key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: on ? ARCH.Reclaimer : C.sand, color: on ? "#fff" : C.brown, padding: "7px 10px 7px 12px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
                  <button onClick={() => togglePersonal(p.id)} style={{ border: "none", background: "transparent", color: "inherit", cursor: "pointer", padding: 0, fontWeight: 600 }}>{on ? "✓ " : ""}{p.label}</button>
                  <button onClick={() => removeCommit(p.id)} aria-label="Remove" style={{ border: "none", background: "transparent", color: on ? "#fff" : C.taupe, cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0, opacity: .8 }}>×</button>
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input className="lj-in" value={newCommit} onChange={(e) => setNewCommit(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addCommit(); }}
              placeholder="Add a personal commitment (e.g. protected doctoral block · off-screen by 9)" style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addCommit} style={{ ...goldBtn, background: ARCH.Reclaimer, color: "#fff", border: "none" }}>Add</button>
          </div>
          {(personal || []).length === 0 && <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 8 }}>Set 2–4 daily commitments for your life outside the business — they'll carry across days and you check them off here.</div>}
        </DCard>

        {/* movement */}
        <DCard><Lbl c={C.gold}>Movement</Lbl>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {MOVEMENT.map((m) => {
              const on = dayData.movement === m.t;
              return (
                <button key={m.t} onClick={() => setDay("movement", on ? "" : m.t)}
                  style={{ border: `1px solid ${on ? m.c : C.taupe}`, background: on ? m.c : "#fff", color: on ? "#fff" : C.brown,
                    padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{m.t}</button>
              );
            })}
          </div>
        </DCard>

        {/* reset practices */}
        <DCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <Lbl c={C.gold}>Nervous-system reset practices</Lbl>
            <span style={{ fontSize: 13, fontWeight: 700, color: (dayData.practices || []).length >= PRACTICE_GOAL ? ARCH.Rooted : C.clay }}>
              {(dayData.practices || []).length} / {PRACTICE_GOAL} today
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "#fff", boxShadow: `inset 0 0 0 1px ${C.taupe}`, overflow: "hidden", margin: "8px 0 12px" }}>
            <div style={{ width: `${Math.min(100, ((dayData.practices || []).length / PRACTICE_GOAL) * 100)}%`, height: "100%", background: (dayData.practices || []).length >= PRACTICE_GOAL ? ARCH.Rooted : C.gold, transition: "width .4s" }} />
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {PRACTICES.map((p) => {
              const on = (dayData.practices || []).includes(p.id);
              return (
                <button key={p.id} onClick={() => togglePractice(dayDate, p.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left", border: "none",
                    background: on ? C.sand : "transparent", padding: "8px 10px", borderRadius: 9, cursor: "pointer", width: "100%" }}>
                  <span style={{ width: 19, height: 19, borderRadius: 6, border: `2px solid ${ARCH[p.arch]}`, background: on ? ARCH[p.arch] : "#fff", color: "#fff", flexShrink: 0, fontSize: 12, lineHeight: "16px", textAlign: "center" }}>{on ? "✓" : ""}</span>
                  <span style={{ flex: 1, fontSize: 13.5, color: on ? C.brown : C.charcoal, fontWeight: on ? 600 : 400 }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: C.taupe }}>{p.dur}</span>
                </button>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: C.taupe, marginTop: 8 }}>Full descriptions live in the Practices tab. Goal: {PRACTICE_GOAL} a day.</div>
        </DCard>

        {/* steps */}
        <DCard><Lbl c={C.gold}>Steps <em style={{ fontStyle: "normal", color: C.taupe }}>· entered by hand</em></Lbl>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
            <input className="lj-in" type="number" value={dayData.steps ?? ""} onChange={(e) => setDay("steps", e.target.value)} placeholder="0" style={{ ...inputStyle, maxWidth: 160 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 10, borderRadius: 999, background: "#fff", boxShadow: `inset 0 0 0 1px ${C.taupe}`, overflow: "hidden" }}>
                <div style={{ width: `${stepPct}%`, height: "100%", background: C.gold, transition: "width .4s" }} />
              </div>
              <div style={{ fontSize: 11.5, color: C.clay, marginTop: 4 }}>{stepPct}% of {STEP_GOAL.toLocaleString()} goal</div>
            </div>
          </div>
        </DCard>

        {/* energy / regulation */}
        <DCard><Lbl c={C.gold}>Regulation / energy</Lbl>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5].map((n) => {
              const on = Number(dayData.energy) === n;
              return (
                <button key={n} onClick={() => setDay("energy", n)}
                  style={{ border: `1px solid ${on ? C.clay : C.taupe}`, background: on ? C.clay : "#fff", color: on ? "#fff" : C.brown,
                    padding: "8px 12px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", minWidth: 70 }}>
                  <div style={{ fontSize: 16 }}>{n}</div><div style={{ fontSize: 10, opacity: .85 }}>{energyLabels[n - 1]}</div>
                </button>
              );
            })}
          </div>
        </DCard>

        {/* win + hours */}
        <DCard><Lbl c={C.gold}>One win</Lbl>
          <input className="lj-in" value={dayData.win || ""} onChange={(e) => setDay("win", e.target.value)} placeholder="Something that moved, however small." style={inputStyle} />
          <div style={{ marginTop: 12 }}>
            <Lbl c={C.gold}>Brand hours today <em style={{ fontStyle: "normal", color: C.taupe }}>· feeds the 35h cap</em></Lbl>
            <input className="lj-in" type="number" step="0.5" value={dayData.brandHours ?? ""} onChange={(e) => setDay("brandHours", e.target.value)} placeholder="0" style={{ ...inputStyle, maxWidth: 160 }} />
          </div>
        </DCard>
        <div style={{ fontSize: 12, color: C.taupe, marginTop: 10 }}>Saved automatically as you type.</div>
      </div>

      {/* side rail */}
      <div>
        <div className="lj-card" style={{ padding: 18, borderRadius: 14, background: C.sand }}>
          <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.clay, fontWeight: 600 }}>Daily streak</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span style={{ ...serifStyle, fontSize: 40, fontWeight: 700, color: C.gold }}>{streakOf(entries, "daily")}</span>
            <span style={{ fontSize: 13, color: C.clay }}>days in a row</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 12, flexWrap: "wrap" }}>
            {lastNKeys("daily", 14).map((pk) => {
              const e = entries.find((x) => x.type === "daily" && x.period === pk);
              const col = e?.data?.movement ? (MOVE_COLOR[e.data.movement] || C.gold) : (e ? C.gold : "#fff");
              return <span key={pk} title={pk} style={{ width: 15, height: 15, borderRadius: 4, background: e ? col : "#fff", boxShadow: `inset 0 0 0 1px ${C.taupe}`, cursor: "pointer" }} onClick={() => setDayDate(pk)} />;
            })}
          </div>
          <div style={{ fontSize: 11, color: C.taupe, marginTop: 8 }}>Last 14 days · color = movement type · tap to open</div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.clay, fontWeight: 600, marginBottom: 8 }}>Recent days</div>
          {recent.length === 0 && <div style={{ fontSize: 13, color: C.taupe }}>No check-ins yet.</div>}
          <div style={{ display: "grid", gap: 8 }}>
            {recent.map((e) => (
              <div key={e.id} style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", boxShadow: `inset 0 0 0 1px ${C.sand}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <button onClick={() => setDayDate(e.period)} style={{ ...ghostBtn, padding: 0, color: C.brown, fontWeight: 600, fontSize: 13 }}>
                  {new Date(e.period + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {e.data?.movement && <span style={{ color: MOVE_COLOR[e.data.movement] || C.clay, fontWeight: 600 }}> · {e.data.movement}</span>}
                  {e.data?.steps ? <span style={{ color: C.taupe, fontWeight: 400 }}> · {Number(e.data.steps).toLocaleString()} steps</span> : null}
                </button>
                <button onClick={() => deleteEntry(e.id)} style={{ ...ghostBtn, color: C.taupe, fontSize: 12 }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Weekly plan view ── */
function PlanView({ S, wkPlan, setWeekPlan, moPlan, setMonthPlan, wkKey, lc }) {
  const monthName = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <div style={{ marginTop: 28 }}>
      <div className="lj-card" style={{ padding: "22px 24px", borderRadius: 16, background: C.sand, borderLeft: `5px solid ${C.clay}` }}>
        <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: C.clay, fontWeight: 600 }}>Forward plan</div>
        <div style={{ ...serifStyle, fontSize: 26, fontWeight: 600, color: C.brown, margin: "2px 0 2px" }}>This week's plan</div>
        <div style={{ fontSize: 13, color: C.clay }}>{wkKey}{!lc.pre && lc.week ? ` · ${lc.label}` : ""}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 18, marginTop: 18 }} className="lj-grid">
        <div>
          <DCard><Lbl c={C.clay}>Theme of the week</Lbl>
            <input className="lj-in" value={wkPlan.theme || ""} onChange={(e) => setWeekPlan((p) => ({ ...p, theme: e.target.value }))} placeholder="The through-line that ties the week together." style={inputStyle} />
          </DCard>
          <DCard><Lbl c={C.clay}>Weekly objectives</Lbl>
            <div style={{ fontSize: 12, color: C.taupe, marginBottom: 6 }}>Concrete outcomes — checked off as you finish.</div>
            <Checklist items={wkPlan.objectives || []} accent={C.clay}
              onChange={(items) => setWeekPlan((p) => ({ ...p, objectives: items }))} placeholder="Add an objective…" />
          </DCard>
        </div>

        <div>
          <DCard><Lbl c={C.clay}>Movement schedule</Lbl>
            <div style={{ fontSize: 12, color: C.taupe, marginBottom: 8 }}>Set Pilates / strength / walks for each day.</div>
            <div style={{ display: "grid", gap: 7 }}>
              {WEEKDAYS.map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 38, fontSize: 13, fontWeight: 600, color: C.brown }}>{d}</span>
                  <select className="lj-in" value={(wkPlan.movement || {})[d] || ""}
                    onChange={(e) => setWeekPlan((p) => ({ ...p, movement: { ...(p.movement || {}), [d]: e.target.value } }))}
                    style={{ ...inputStyle, marginTop: 0, flex: 1, borderColor: (wkPlan.movement || {})[d] ? (MOVE_COLOR[(wkPlan.movement || {})[d]] || C.taupe) : C.taupe }}>
                    <option value="">—</option>
                    {MOVEMENT.map((m) => <option key={m.t} value={m.t}>{m.t}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.taupe, marginTop: 8 }}>
              {WEEKDAYS.filter((d) => (wkPlan.movement || {})[d] && wkPlan.movement[d] !== "Rest").length} active sessions planned
            </div>
          </DCard>
          <DCard><Lbl c={C.brown}>Monthly goals · {monthName}</Lbl>
            <div style={{ fontSize: 12, color: C.taupe, marginBottom: 6 }}>Carry across the whole month.</div>
            <Checklist items={moPlan.goals || []} accent={C.brown}
              onChange={(items) => setMonthPlan((p) => ({ ...p, goals: items }))} placeholder="Add a monthly goal…" />
          </DCard>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.taupe, marginTop: 12 }}>Everything here saves automatically and stays tied to this week and month.</div>
    </div>
  );
}

/* ── Practices library view ── */
function PracticesView({ S, today, entries, togglePractice, practicesDone, openPlayer }) {
  const done = entries.find((x) => x.type === "daily" && x.period === today)?.data?.practices || [];
  const count = done.length;
  const groups = [
    { key: "Regulator", label: "Regulator · CALM" },
    { key: "Rooted", label: "Rooted One · ROOTED" },
    { key: "Reclaimer", label: "Power Reclaimer · RECLAIM" },
    { key: "All", label: "Cross-archetype" },
  ];
  return (
    <div style={{ marginTop: 28 }}>
      <div className="lj-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "22px 24px", borderRadius: 16, background: C.sand, borderLeft: `5px solid ${ARCH.Rooted}`, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ARCH.Rooted, fontWeight: 600 }}>Reset library</div>
          <div style={{ ...serifStyle, fontSize: 26, fontWeight: 600, color: C.brown, margin: "2px 0" }}>Nervous-system reset practices</div>
          <div style={{ fontSize: 13, color: C.clay }}>Drawn from the CALM, ROOTED and RECLAIM apps. Each is tied to an approved Claim Card.</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...serifStyle, fontSize: 34, fontWeight: 700, color: count >= PRACTICE_GOAL ? ARCH.Rooted : C.clay }}>{count} / {PRACTICE_GOAL}</div>
          <div style={{ fontSize: 12, color: C.clay }}>completed today</div>
          {fiveStreak(entries, PRACTICE_GOAL) > 0 && (
            <div style={{ fontSize: 12, fontWeight: 600, color: ARCH.Rooted, marginTop: 4 }}>🔥 {fiveStreak(entries, PRACTICE_GOAL)}-day 5/5 streak</div>
          )}
        </div>
      </div>

      {groups.map((g) => {
        const items = PRACTICES.filter((p) => p.arch === g.key);
        if (!items.length) return null;
        return (
          <div key={g.key} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: ARCH[g.key] }} />
              <span style={{ ...serifStyle, fontSize: 17, fontWeight: 600, color: C.brown }}>{g.label}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
              {items.map((p) => {
                const on = done.includes(p.id);
                return (
                  <div key={p.id} className="lj-card" style={{ padding: "16px 18px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)`, borderTop: `3px solid ${ARCH[p.arch]}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ ...serifStyle, fontSize: 17, fontWeight: 600, color: C.brown }}>{p.name}</div>
                      <span style={{ fontSize: 11, color: C.taupe, whiteSpace: "nowrap" }}>{p.dur}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: C.charcoal, lineHeight: 1.5, margin: "8px 0 10px" }}>{p.desc}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: C.taupe }}>{p.src}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        {p.run && (
                          <button onClick={() => openPlayer(p)}
                            style={{ border: "none", background: ARCH[p.arch], color: "#fff", padding: "7px 16px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                            ▶ Start
                          </button>
                        )}
                        <button onClick={() => togglePractice(today, p.id)}
                          style={{ border: `1px solid ${ARCH[p.arch]}`, background: on ? ARCH[p.arch] : "#fff", color: on ? "#fff" : ARCH[p.arch],
                            padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                          {on ? "✓ Done" : "Mark done"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 12, color: C.taupe, marginTop: 16 }}>Completing a practice here checks it on today's daily review too. Goal: {PRACTICE_GOAL} a day.</div>
    </div>
  );
}

/* ── reusable checklist ── */
function Checklist({ items, onChange, accent, placeholder }) {  const [text, setText] = useState("");
  const add = () => { if (!text.trim()) return; onChange([...(items || []), { id: uid(), text: text.trim(), done: false }]); setText(""); };
  const toggle = (id) => onChange(items.map((it) => it.id === id ? { ...it, done: !it.done } : it));
  const remove = (id) => onChange(items.filter((it) => it.id !== id));
  return (
    <div>
      <div style={{ display: "grid", gap: 6 }}>
        {(items || []).map((it) => (
          <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <button onClick={() => toggle(it.id)} aria-label="Toggle"
              style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${accent}`, background: it.done ? accent : "#fff", color: "#fff", cursor: "pointer", flexShrink: 0, fontSize: 12, lineHeight: 1 }}>{it.done ? "✓" : ""}</button>
            <span style={{ flex: 1, fontSize: 14, color: it.done ? C.taupe : C.charcoal, textDecoration: it.done ? "line-through" : "none" }}>{it.text}</span>
            <button onClick={() => remove(it.id)} style={{ ...ghostBtn, color: C.taupe, fontSize: 12 }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input className="lj-in" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }} placeholder={placeholder} style={{ ...inputStyle, marginTop: 0 }} />
        <button onClick={add} style={{ ...primaryBtn, padding: "9px 16px", background: accent }}>Add</button>
      </div>
    </div>
  );
}

/* ── In-app practice player (breath pacer / guided timer / state log) ── */
function PracticePlayer({ practice, onClose, onComplete }) {
  const run = practice.run;
  const accent = ARCH[practice.arch];
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(run.mode === "timer" || run.mode === "breath" || run.mode === "note");
  const [finished, setFinished] = useState(false);
  const [note, setNote] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!running || !run.seconds) return;
    const t = setInterval(() => setElapsed((e) => e + 0.25), 250);
    return () => clearInterval(t);
  }, [running, run.seconds]);

  useEffect(() => {
    if (run.seconds && elapsed >= run.seconds && !doneRef.current) {
      doneRef.current = true; setRunning(false); setFinished(true);
      onComplete(practice.id, run.mode === "note" ? { affirmation: note } : undefined);
    }
  }, [elapsed]); // eslint-disable-line

  const remaining = Math.max(0, Math.ceil((run.seconds || 0) - elapsed));
  const mmss = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;

  // breath phase
  const cyclePos = elapsed % (run.inhale + run.exhale || 12);
  const inhaling = cyclePos < (run.inhale || 4);
  const phaseLabel = inhaling ? "Breathe in" : "Breathe out";
  const phaseCount = inhaling ? Math.ceil((run.inhale || 4) - cyclePos) : Math.ceil((run.inhale + run.exhale) - cyclePos);

  // timer cue
  const cueIdx = run.cues ? Math.min(run.cues.length - 1, Math.floor(elapsed / (run.seconds / run.cues.length))) : 0;

  const endEarly = () => { if (!doneRef.current) { doneRef.current = true; onComplete(practice.id, run.mode === "note" ? { affirmation: note } : undefined); } onClose(); };

  const overlay = { position: "fixed", inset: 0, background: "rgba(43,43,43,.62)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20, animation: "ljovl .25s ease both" };
  const card = { width: "100%", maxWidth: 460, background: C.offwhite, borderRadius: 22, padding: "26px 26px 24px", boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)", textAlign: "center" };

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div style={card} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: accent, fontWeight: 600 }}>{practice.arch === "All" ? "Cross-archetype" : practice.arch}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: C.brown }}>{practice.name}</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", fontSize: 22, color: C.clay, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {/* BREATH */}
        {run.mode === "breath" && (
          <div style={{ padding: "18px 0 6px" }}>
            <div style={{ position: "relative", height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="breath-ring" style={{ width: 200, height: 200, borderRadius: "50%", background: accent, animationPlayState: running ? "running" : "paused", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#fff" }}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{finished ? "Done" : phaseLabel}</div>
                  {!finished && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700 }}>{phaseCount}</div>}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.clay, marginTop: 4 }}>4 counts in · 8 counts out · {mmss} left</div>
          </div>
        )}

        {/* TIMER */}
        {run.mode === "timer" && (
          <div style={{ padding: "20px 0 8px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 60, fontWeight: 700, color: finished ? accent : C.brown }}>{finished ? "✓" : mmss}</div>
            <div style={{ fontSize: 16, color: C.charcoal, minHeight: 24, marginTop: 6 }}>{finished ? "That's logged." : (run.cues ? run.cues[cueIdx] : "")}</div>
          </div>
        )}

        {/* NOTE */}
        {run.mode === "note" && (
          <div style={{ padding: "16px 0 4px", textAlign: "left" }}>
            <div style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: finished ? accent : C.brown }}>{finished ? "✓" : mmss}</div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your affirmation…" rows={4}
              style={{ width: "100%", marginTop: 12, padding: "11px 12px", border: `1px solid ${C.taupe}`, borderRadius: 10, fontSize: 14, color: C.charcoal, background: "#fff", resize: "vertical", fontFamily: "inherit" }} />
          </div>
        )}

        {/* STATE 1–10 */}
        {run.mode === "state" && (
          <div style={{ padding: "18px 0 6px" }}>
            <div style={{ fontSize: 14, color: C.clay, marginBottom: 12 }}>Where is your activation right now?</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => { onComplete(practice.id, { state: n }); onClose(); }}
                  style={{ width: 38, height: 44, borderRadius: 10, border: `1px solid ${accent}`, background: "#fff", color: accent, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{n}</button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.taupe, marginTop: 8, padding: "0 4px" }}><span>1 · settled</span><span>10 · highly activated</span></div>
          </div>
        )}

        {/* controls */}
        {run.mode !== "state" && (
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
            {!finished && run.mode !== "note" && (
              <button onClick={() => setRunning((r) => !r)} style={{ border: `1px solid ${C.taupe}`, background: "#fff", color: C.brown, padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {running ? "Pause" : "Resume"}
              </button>
            )}
            {finished ? (
              <button onClick={onClose} style={{ border: "none", background: accent, color: "#fff", padding: "10px 26px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Close</button>
            ) : (
              <button onClick={endEarly} style={{ border: "none", background: accent, color: "#fff", padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {run.mode === "note" ? "Save & log" : "End & log now"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Streak reward (short celebration) ── */
function RewardOverlay({ streak, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4200); return () => clearTimeout(t); }, [onClose]);
  const line = streak >= 30 ? "Thirty days. This is who you are now."
    : streak >= 14 ? "Two weeks of resets. The baseline is shifting."
    : streak >= 7 ? "A full week. Your body is learning the pattern."
    : streak >= 3 ? "Three days running. The reps are compounding."
    : "Five resets logged. That's a full day's regulation.";
  const branch = ARCH.Rooted;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(43,43,43,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "ljovl .25s ease both" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: 360, background: C.offwhite, borderRadius: 22, padding: "32px 26px 26px", textAlign: "center", boxShadow: "0 4px 20px -8px rgba(74,58,50,.25)", animation: "ljpop .4s ease both" }}>
        {[..."✦✦✦✦✦"].map((s, i) => (
          <span key={i} style={{ position: "absolute", top: 18 + (i % 2) * 8, left: `${12 + i * 18}%`, color: C.gold, fontSize: 14, animation: `spark 1.1s ${i * 0.12}s ease-out both` }}>✦</span>
        ))}
        <div style={{ width: 84, height: 84, borderRadius: "50%", margin: "0 auto 14px", background: branch, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#fff" }}>{streak}</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: branch, fontWeight: 600 }}>{streak === 1 ? "5 / 5 today" : `${streak}-day 5/5 streak`}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: C.brown, margin: "6px 0 4px", lineHeight: 1.3 }}>{line}</div>
        <button onClick={onClose} style={{ marginTop: 14, border: "none", background: branch, color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Keep going</button>
      </div>
    </div>
  );
}

/* ── Roadmap view (Sections 12 + 6, quantified) ── */
function RoadmapView({ S, roadmap, saveRoadmap, manych, weeklySorted }) {
  const mi = monthIndexNow();
  const prelaunch = mi <= 0;
  const pIdx = phaseIndexForMonth(Math.max(1, mi));
  const phase = PHASES[pIdx];
  const latest = weeklySorted[weeklySorted.length - 1]?.data?.metrics || {};
  const curMRR = latest.mrr ? +latest.mrr : null;
  const curEmail = latest.emailList ? +latest.emailList : null;

  const exitDone = roadmap.exit?.[phase.n] || [];
  const toggleExit = (i) => {
    const cur = roadmap.exit?.[phase.n] || [];
    const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
    saveRoadmap({ ...roadmap, exit: { ...(roadmap.exit || {}), [phase.n]: next } });
  };
  const setStream = (k, v) => saveRoadmap({ ...roadmap, streams: { ...(roadmap.streams || {}), [k]: v } });
  const streamTotal = STREAMS.reduce((a, s) => a + (parseFloat(roadmap.streams?.[s.k]) || 0), 0);
  const col = streamTargetCol(pIdx);
  const mrrV = verdict(curMRR ?? (streamTotal || null), phase.mrr);
  const emailV = phase.emails ? verdict(curEmail, phase.emails) : { label: "—", color: C.taupe };

  return (
    <div style={{ marginTop: 28 }}>
      {/* phase strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {PHASES.map((p, i) => {
          const on = i === pIdx;
          return (
            <div key={p.n} style={{ flex: "1 0 auto", minWidth: 130, padding: "12px 14px", borderRadius: 12, background: on ? C.brown : "#fff", color: on ? C.offwhite : C.brown, boxShadow: on ? "none" : `inset 0 0 0 1px ${C.sand}` }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: on ? C.gold : C.clay }}>Phase {p.n}</div>
              <div style={{ ...S.serif, fontSize: 15, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11, opacity: .8 }}>{p.months}</div>
            </div>
          );
        })}
      </div>

      {/* current phase header */}
      <div className="lj-card" style={{ marginTop: 16, padding: "22px 24px", borderRadius: 16, background: C.sand, borderLeft: `5px solid ${C.clay}` }}>
        <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: C.clay, fontWeight: 600 }}>
          {prelaunch ? "Pre-launch · Phase 1 begins June 15" : `Month ${mi} · Phase ${phase.n}`}
        </div>
        <div style={{ ...S.serif, fontSize: 26, fontWeight: 600, color: C.brown, margin: "2px 0" }}>{phase.name} — {phase.tag}</div>
        <div style={{ fontSize: 13, color: C.clay }}>{phase.dates} · {phase.months}</div>
        <div style={{ ...S.serif, fontStyle: "italic", fontSize: 15, color: C.charcoal, marginTop: 8, opacity: .85 }}>{phase.focus}</div>
      </div>

      {/* targets vs actuals */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 16 }}>
        <TargetCard S={S} label="MRR vs phase target" target={phase.mrrLabel}
          actual={curMRR != null ? fmtUSD(curMRR) : (streamTotal ? fmtUSD(streamTotal) + " (mix)" : "—")}
          band={phase.mrr} value={curMRR ?? (streamTotal || null)} v={mrrV} />
        <TargetCard S={S} label="Email list vs phase target" target={phase.emailLabel}
          actual={curEmail != null ? curEmail.toLocaleString() : "—"} band={phase.emails} value={curEmail} v={emailV} />
        <div className="lj-card" style={{ padding: "16px 16px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)`, borderTop: `3px solid ${C.gold}` }}>
          <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.clay }}>Cumulative target</div>
          <div style={{ ...S.serif, fontSize: 20, fontWeight: 700, color: C.brown, marginTop: 6 }}>{phase.cum}</div>
          <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 4 }}>Conservative baseline (Section 6.5)</div>
        </div>
      </div>

      {/* exit criteria */}
      <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>Phase {phase.n} exit criteria</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: exitDone.length === phase.exit.length ? ARCH.Rooted : C.clay }}>{exitDone.length} / {phase.exit.length} met</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: C.sand, overflow: "hidden", margin: "8px 0 14px" }}>
          <div style={{ width: `${(exitDone.length / phase.exit.length) * 100}%`, height: "100%", background: exitDone.length === phase.exit.length ? ARCH.Rooted : C.clay, transition: "width .4s" }} />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {phase.exit.map((c, i) => {
            const on = exitDone.includes(i);
            return (
              <button key={i} onClick={() => toggleExit(i)} style={{ display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left", border: "none", background: on ? C.sand : "transparent", padding: "9px 11px", borderRadius: 9, cursor: "pointer", width: "100%" }}>
                <span style={{ width: 19, height: 19, borderRadius: 6, border: `2px solid ${C.clay}`, background: on ? C.clay : "#fff", color: "#fff", flexShrink: 0, fontSize: 12, lineHeight: "16px", textAlign: "center", marginTop: 1 }}>{on ? "✓" : ""}</span>
                <span style={{ flex: 1, fontSize: 13.5, color: on ? C.brown : C.charcoal, fontWeight: on ? 600 : 400 }}>{c}</span>
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 10 }}>Phases are quality gates, not timelines. Advance when every criterion is met — holding is not failure; premature advancement is.</div>
      </div>

      {/* revenue mix vs targets */}
      <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>Revenue mix vs phase targets</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: mrrV.color }}>{streamTotal ? fmtUSD(streamTotal) + " / mo · " + mrrV.label : "enter current MRR by stream"}</span>
        </div>
        <div style={{ fontSize: 12, color: C.taupe, margin: "4px 0 12px" }}>Enter this month's MRR per stream. Each is checked against its Section 6.5 band for {phase.name}.</div>
        <div style={{ display: "grid", gap: 7 }}>
          {STREAMS.map((s) => {
            const band = s.p[col];
            const val = roadmap.streams?.[s.k];
            const sv = (band[1] === 0 && band[0] === 0) ? { label: "not active yet", color: C.taupe } : verdict(val, band);
            return (
              <div key={s.k} style={{ display: "grid", gridTemplateColumns: "1fr 90px 120px", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: C.charcoal }}>{s.label}</span>
                <input type="number" value={val ?? ""} onChange={(e) => setStream(s.k, e.target.value)} placeholder="0"
                  style={{ width: "100%", padding: "6px 9px", border: `1px solid ${C.taupe}`, borderRadius: 8, fontSize: 13, background: C.offwhite, color: C.charcoal }} />
                <span style={{ fontSize: 11, color: sv.color, textAlign: "right" }}>
                  {band[1] === 0 ? "—" : `$${(band[0] / 1000).toLocaleString()}–${(band[1] / 1000).toLocaleString()}K`}<br /><span style={{ fontWeight: 600 }}>{sv.label}</span>
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.sand}` }}>
          <span style={{ ...S.serif, fontSize: 16, fontWeight: 600, color: C.brown }}>Total MRR</span>
          <span style={{ ...S.serif, fontSize: 16, fontWeight: 700, color: mrrV.color }}>{fmtUSD(streamTotal)} · target {phase.mrrLabel}</span>
        </div>
      </div>

      {/* hire triggers */}
      <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
        <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown, marginBottom: 10 }}>Hire-trigger framework</div>
        <div style={{ display: "grid", gap: 8 }}>
          {HIRES.map((h) => {
            const status = h.phase < pIdx + 1 ? "window open" : h.phase === pIdx + 1 ? "this phase" : "later phase";
            const col2 = status === "this phase" ? ARCH.Rooted : status === "window open" ? C.clay : C.taupe;
            return (
              <div key={h.role} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", padding: "10px 12px", borderRadius: 10, background: C.sand }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.brown }}>{h.role} <span style={{ fontWeight: 400, color: C.clay }}>· {h.pay}</span></div>
                  <div style={{ fontSize: 12, color: C.charcoal, opacity: .8 }}>{h.trigger}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.taupe }}>{h.when}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: col2 }}>{status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-block week + MVD */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }} className="lj-grid">
        <div className="lj-card" style={{ padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
          <div style={{ ...S.serif, fontSize: 18, fontWeight: 600, color: C.brown }}>The 5-block week</div>
          <div style={{ fontSize: 12, color: C.taupe, marginBottom: 10 }}>35-hour cap (Phases 1–3) → 20–25h by Phase 5. Blocks don't bleed.</div>
          <div style={{ display: "grid", gap: 6 }}>
            {WEEKBLOCKS.map((w) => (
              <div key={w.b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, background: C.brown, color: C.offwhite, fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{w.b}</span>
                <span style={{ flex: 1, fontSize: 13.5, color: C.charcoal }}>{w.name}</span>
                <span style={{ fontSize: 11, color: C.taupe }}>{w.note}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lj-card" style={{ padding: "20px 22px", borderRadius: 14, background: C.brown, color: C.offwhite, boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
          <div style={{ ...S.serif, fontSize: 18, fontWeight: 600, color: C.gold }}>Minimum Viable Day</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 8, opacity: .9 }}>
            For crisis days only — illness, family emergency, doctoral crunch. A 50-minute protocol that keeps forward motion on every outcome without the full 35-hour week. Return to full schedule within 1–2 weeks of the crisis stabilizing.
          </div>
          <div style={{ fontSize: 11.5, color: C.gold, marginTop: 10 }}>Section 12.12.1 · the floor, not the default</div>
        </div>
      </div>

      <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 16 }}>Targets are conservative baselines from Sections 6.5 + 12.7. Beating them means the system is above baseline; missing them is a signal that operational discipline has slipped — both are information for the next review.</div>
    </div>
  );
}

function TargetCard({ S, label, target, actual, band, value, v }) {
  const pct = band && value != null && band[1] ? Math.min(100, (+value / band[1]) * 100) : 0;
  return (
    <div className="lj-card" style={{ padding: "16px 16px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)`, borderTop: `3px solid ${v.color}` }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.clay }}>{label}</div>
      <div style={{ ...S.serif, fontSize: 24, fontWeight: 700, color: C.brown, marginTop: 4 }}>{actual}</div>
      <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 2 }}>target {target}</div>
      {band && (
        <div style={{ height: 6, borderRadius: 999, background: C.sand, overflow: "hidden", margin: "8px 0 4px" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: v.color, transition: "width .4s" }} />
        </div>
      )}
      <div style={{ fontSize: 11.5, fontWeight: 600, color: v.color }}>{v.label}</div>
    </div>
  );
}

/* ── Communication Mastery view ── */
function CommView({ S, comm, today, wkKey, logDrill, toggleRep, setCommEnergy, deleteTalk, openDrill, openScorer, mi }) {
  const todayDrills = comm.drills?.[today] || [];
  const talks = (comm.talks || []);
  const talksAsc = [...talks].sort((a, b) => new Date(a.date) - new Date(b.date));
  const latest = talksAsc.length ? talksAsc[talksAsc.length - 1].total : null;
  const last4 = talksAsc.slice(-4);
  const avg4 = last4.length ? Math.round(last4.reduce((a, t) => a + t.total, 0) / last4.length) : null;
  let streak = 0;
  { const now = new Date(); const has = (k) => (comm.drills?.[k] || []).length >= 5;
    let start = has(periodKey("daily", now)) ? 0 : 1;
    for (let i = start; i < 400; i++) { if (has(periodKey("daily", shiftPeriod("daily", now, i)))) streak++; else break; } }
  const reps = comm.reps?.[wkKey] || {};
  const chartData = talksAsc.map((t) => ({ name: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), total: t.total }));
  const energyLabels = ["Depleted", "Low", "Steady", "Good", "Charged"];

  return (
    <div style={{ marginTop: 28 }}>
      <div className="lj-card" style={{ padding: "22px 24px", borderRadius: 16, background: C.sand, borderLeft: `5px solid ${COMM}` }}>
        <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: COMM, fontWeight: 600 }}>Fifth outcome · Deliberate practice</div>
        <div style={{ ...S.serif, fontSize: 26, fontWeight: 600, color: C.brown, margin: "2px 0" }}>Communication Mastery</div>
        <div style={{ fontSize: 13, color: C.clay }}>20-minute drill block + weekly hard reps. Record every rep — playback is the feedback loop. Gains compound on a 60–90 day horizon.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 16 }}>
        <StatCard S={S} label="Recorded talks" value={`${talks.length} / ${TALKS_TARGET}`} color={COMM} foot="Phase 1 exit gate" />
        <StatCard S={S} label="Latest rubric" value={latest != null ? `${latest} / 50` : "—"} color={C.gold} foot={latest != null ? rubricBand(latest) : "score a talk"} />
        <StatCard S={S} label="Avg · last 4 talks" value={avg4 != null ? `${avg4} / 50` : "—"} color={C.clay} foot="35+ = public-ready" />
        <StatCard S={S} label="Drill block streak" value={streak ? `${streak} d` : "—"} color={ARCH.Rooted} foot="5/5 drills/day" />
      </div>

      <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>The 5 daily drills</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: todayDrills.length >= 5 ? ARCH.Rooted : COMM }}>{todayDrills.length} / 5 · 20-min block</span>
        </div>
        <div style={{ fontSize: 12, color: C.taupe, margin: "3px 0 12px" }}>Morning, before email. Each runs on a timer with the method cues — record as you go.</div>
        <div style={{ display: "grid", gap: 10 }}>
          {DRILLS.map((d) => {
            const on = todayDrills.includes(d.id);
            return (
              <div key={d.id} style={{ padding: "12px 14px", borderRadius: 11, background: on ? C.sand : C.offwhite, boxShadow: `inset 0 0 0 1px ${C.sand}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: C.brown }}>{d.name} <span style={{ fontWeight: 400, color: C.taupe }}>· {d.min} min</span></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openDrill(d)} style={{ border: "none", background: COMM, color: "#fff", padding: "7px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>▶ {d.min}:00</button>
                    <button onClick={() => logDrill(today, d.id)} style={{ border: `1px solid ${COMM}`, background: on ? COMM : "#fff", color: on ? "#fff" : COMM, padding: "7px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{on ? "✓" : "Done"}</button>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: C.charcoal, opacity: .85, marginTop: 5 }}>{d.why}</div>
                <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 4 }}>{d.rec}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.sand}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COMM, marginBottom: 8 }}>Record a drill for review</div>
          <Recorder />
        </div>
      </div>

      <div className="lj-card" style={{ marginTop: 18, padding: "20px 22px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ ...S.serif, fontSize: 19, fontWeight: 600, color: C.brown }}>This week's hard reps</div>
          <button onClick={openScorer} style={{ border: `1px solid ${C.gold}`, background: "#fff", color: C.brown, padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>✦ Score a recorded talk</button>
        </div>
        <div style={{ fontSize: 12, color: C.taupe, margin: "3px 0 12px" }}>A rep only counts if it's recorded, reviewed on the rubric, and debriefed in writing within 24 hours.</div>
        <div style={{ display: "grid", gap: 8 }}>
          {HARDREPS.map((h) => {
            const on = !!reps[h.id];
            return (
              <button key={h.id} onClick={() => toggleRep(wkKey, h.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left", border: "none", background: on ? C.sand : "transparent", padding: "10px 12px", borderRadius: 10, cursor: "pointer", width: "100%" }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${COMM}`, background: on ? COMM : "#fff", color: "#fff", flexShrink: 0, fontSize: 12, lineHeight: "16px", textAlign: "center", marginTop: 1 }}>{on ? "✓" : ""}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.brown }}>{h.name} </span>
                  <span style={{ fontSize: 11, color: COMM, fontWeight: 600 }}>· {h.cadence}</span>
                  <div style={{ fontSize: 12.5, color: C.charcoal, opacity: .8, marginTop: 2 }}>{h.desc}</div>
                </span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.sand}`, flexWrap: "wrap" }}>
          <button onClick={() => toggleRep(wkKey, "scorecard")} style={{ border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${ARCH.Rooted}`, background: reps.scorecard ? ARCH.Rooted : "#fff", color: "#fff", fontSize: 11, lineHeight: "14px", textAlign: "center" }}>{reps.scorecard ? "✓" : ""}</span>
            <span style={{ fontSize: 13, color: C.brown, fontWeight: 600 }}>Friday scorecard filled in</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.clay }}>Practice energy</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setCommEnergy(wkKey, n)} title={energyLabels[n - 1]}
                style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${COMM}`, background: Number(reps.energy) === n ? COMM : "#fff", color: Number(reps.energy) === n ? "#fff" : COMM, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{n * 2}</button>
            ))}
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="lj-card" style={{ marginTop: 18, padding: "16px 18px 8px", borderRadius: 14, background: "#fff", boxShadow: `0 8px 24px -20px rgba(74,58,50,.5)` }}>
          <div style={{ ...S.serif, fontSize: 17, fontWeight: 600, color: C.brown, marginBottom: 2 }}>Rubric trend · talk totals /50</div>
          <div style={{ fontSize: 11.5, color: C.taupe, marginBottom: 8 }}>Compare talks 60–90 days apart — that's where the jump shows. 35+ = public-ready, 25–34 developing.</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid stroke={C.sand} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: C.clay }} />
              <YAxis domain={[0, 50]} tick={{ fontSize: 11, fill: C.clay }} />
              <Tooltip contentStyle={tipStyle} />
              <Line type="monotone" dataKey="total" stroke={COMM} strokeWidth={2.5} dot={{ r: 3, fill: COMM }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {talks.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ ...S.serif, fontSize: 17, fontWeight: 600, color: C.brown, marginBottom: 8 }}>Scored talks</div>
          <div style={{ display: "grid", gap: 8 }}>
            {talks.slice(0, 12).map((t) => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "10px 14px", background: "#fff", borderRadius: 10, boxShadow: `inset 0 0 0 1px ${C.sand}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ ...S.serif, fontSize: 18, fontWeight: 700, color: t.total >= 35 ? ARCH.Rooted : t.total >= 25 ? C.gold : "#a85a4a" }}>{t.total}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.brown }}>{t.topic || "Recorded talk"}</div>
                    <div style={{ fontSize: 11.5, color: C.taupe }}>{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {rubricBand(t.total)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {t.link && <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: COMM, textDecoration: "none" }}>▶ Listen</a>}
                  <button onClick={() => deleteTalk(t.id)} style={{ ...ghostBtn, color: C.taupe, fontSize: 12 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 11.5, color: C.taupe, marginTop: 16 }}>Section 9 · Monthly: compare your earliest and most recent talk, name the gap, set one focus drill. The Monthly review captures that reflection.</div>
    </div>
  );
}

/* ── Best-effort in-session audio recorder (mic where permitted) ── */
function Recorder() {
  const [status, setStatus] = useState("idle"); // idle | recording | recorded | error
  const [url, setUrl] = useState("");
  const [secs, setSecs] = useState(0);
  const recRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (url) URL.revokeObjectURL(url);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, [url]);

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") { setStatus("error"); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || "audio/webm" });
        setUrl(URL.createObjectURL(blob));
        setStatus("recorded");
        stream.getTracks().forEach((t) => t.stop());
      };
      recRef.current = mr; mr.start(); setStatus("recording"); setSecs(0);
      timerRef.current = setInterval(() => setSecs((s) => s + 1), 1000);
    } catch { setStatus("error"); }
  }
  function stop() { if (recRef.current && status === "recording") recRef.current.stop(); if (timerRef.current) clearInterval(timerRef.current); }
  const mmss = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div style={{ background: C.sand, borderRadius: 11, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {status !== "recording" && status !== "error" && (
          <button onClick={start} style={{ border: "none", background: "#a85a4a", color: "#fff", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>● Record audio</button>
        )}
        {status === "recording" && (
          <button onClick={stop} style={{ border: "none", background: C.brown, color: "#fff", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>■ Stop · {mmss}</button>
        )}
        {status === "recorded" && url && (
          <a href={url} download={`talk-${new Date().toISOString().slice(0, 10)}.webm`} style={{ fontSize: 13, fontWeight: 600, color: COMM, textDecoration: "none" }}>↓ Download</a>
        )}
        {status === "recording" && <span style={{ width: 9, height: 9, borderRadius: 999, background: "#a85a4a", animation: "breathe 1.4s ease-in-out infinite" }} />}
      </div>
      {status === "recorded" && url && <audio controls src={url} style={{ width: "100%", marginTop: 10, height: 34 }} />}
      {status === "error" && (
        <div style={{ fontSize: 12, color: C.charcoal, opacity: .85 }}>Mic access isn't available in this frame. Record on your phone's voice-memo app and paste the link below — that's the workflow the handbook recommends anyway.</div>
      )}
      <div style={{ fontSize: 10.5, color: C.taupe, marginTop: 8 }}>Plays back this session for self-review · download to keep (it isn't stored in the app).</div>
    </div>
  );
}

/* ── Recorded-talk rubric scorer ── */
function RubricScorer({ onClose, onSave }) {
  const [scores, setScores] = useState({ hook: 7, structure: 7, voice: 7, pause: 7, cta: 7 });
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");
  const total = RUBRIC.reduce((a, r) => a + (scores[r.k] || 0), 0);
  const set = (k, v) => setScores((s) => ({ ...s, [k]: +v }));
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(43,43,43,.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "ljovl .25s ease both" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 460, background: C.offwhite, borderRadius: 20, padding: "24px 24px 22px", boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: COMM, fontWeight: 600 }}>Record · review · score</div>
            <div style={{ ...serifStyle, fontSize: 21, fontWeight: 600, color: C.brown }}>Recorded-talk rubric</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", fontSize: 22, color: C.clay, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ marginTop: 12 }}><Recorder /></div>

        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (e.g. Regulator pattern)" style={{ ...inputStyle, marginTop: 12 }} />
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Recording link (Drive / voice memo URL — optional)" style={{ ...inputStyle, marginTop: 10 }} />

        <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
          {RUBRIC.map((r) => (
            <div key={r.k}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.brown }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COMM }}>{scores[r.k]}/10</span>
              </div>
              <div style={{ fontSize: 11, color: C.taupe, marginBottom: 4 }}>{r.hint}</div>
              <input type="range" min="1" max="10" value={scores[r.k]} onChange={(e) => set(r.k, e.target.value)} style={{ width: "100%", accentColor: COMM }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.sand}` }}>
          <div>
            <span style={{ ...serifStyle, fontSize: 26, fontWeight: 700, color: total >= 35 ? ARCH.Rooted : total >= 25 ? C.gold : "#a85a4a" }}>{total}</span>
            <span style={{ fontSize: 13, color: C.clay }}> /50 · {rubricBand(total)}</span>
          </div>
          <button onClick={() => onSave({ scores, total, topic: topic.trim(), link: link.trim() })} style={{ ...primaryBtn, background: COMM }}>Save talk</button>
        </div>
      </div>
    </div>
  );
}

/* ── tiny layout helpers for daily/plan ── */
function DCard({ children }) {
  return <div className="lj-card" style={{ marginTop: 16, padding: "18px 20px", borderRadius: 14, background: "#fff", boxShadow: `0 1px 0 ${C.sand}, 0 8px 24px -18px rgba(74,58,50,.4)` }}>{children}</div>;
}
function Lbl({ children, c }) {
  return <div style={{ fontSize: 12, fontWeight: 600, color: c, letterSpacing: ".02em" }}>{children}</div>;
}
