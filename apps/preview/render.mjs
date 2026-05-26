// Local preview/screenshot harness for the LoveLarice single-file React apps.
// Builds each app with esbuild, seeds localStorage to surface conditional
// states, and screenshots full-page via the preinstalled Playwright chromium.
//
//   node render.mjs            -> render every app, every state
//   node render.mjs tracker    -> render only matching app id(s)
//
// Output: apps/preview/out/<id>-<state>.png

import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const HERE = dirname(fileURLToPath(import.meta.url));
const APPS = resolve(HERE, "..");
const OUT = resolve(HERE, "out");
const NM = resolve(HERE, "node_modules");

// Resolve the globally-installed Playwright (browsers preinstalled at PLAYWRIGHT_BROWSERS_PATH).
const pw = await import(resolve(process.execPath, "../../lib/node_modules/playwright/index.js"))
  .catch(() => import("/opt/node22/lib/node_modules/playwright/index.js"));
const { chromium } = pw.default ?? pw;

// Dates relative to "today" so a seeded 3-day streak always lands on the day-3 insight.
const iso = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() - offset); return d.toISOString().slice(0, 10); };
const days3 = (val) => ({ [iso(2)]: val, [iso(1)]: val, [iso(0)]: val });

const apps = [
  {
    id: "tracker", file: "foundation-tracker.jsx", key: "larice_7day_tracker",
    seed: { startDate: iso(2), hydrationTarget: "80 oz", sleepWindow: "10pm-6am",
            days: days3({ hydration: true, sleep: true, movement: true, nourish: true }) },
  },
  {
    id: "journal", file: "boundary-journal.jsx", key: "larice_boundary_journal",
    seed: { entries: days3({ no: "Declined a last-minute ask I didn't have capacity for.",
            protect: "My evening — no work after 7.", claim: "Rest without earning it first." }) },
  },
  {
    id: "reset", file: "ns-reset-guide.jsx", key: "larice_ns_reset",
    seed: { startDate: iso(2), days: days3({ morning: true, midday: true, evening: true }) },
  },
];

const filter = process.argv.slice(2);
const selected = filter.length ? apps.filter(a => filter.some(f => a.id.includes(f))) : apps;

mkdirSync(OUT, { recursive: true });

async function bundle(file) {
  const entry = resolve(OUT, `_entry_${file}.jsx`);
  writeFileSync(entry,
    `import React from "react";\nimport { createRoot } from "react-dom/client";\nimport App from ${JSON.stringify(resolve(APPS, file))};\ncreateRoot(document.getElementById("root")).render(React.createElement(App));\n`);
  const res = await build({
    entryPoints: [entry], bundle: true, write: false, format: "iife",
    loader: { ".js": "jsx", ".jsx": "jsx" }, jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    absWorkingDir: HERE, nodePaths: [NM],
  });
  return res.outputFiles[0].text;
}

function html(js) {
  return `<!doctype html><html><head><meta charset="utf8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0}</style></head>
<body><div id="root"></div><script>${js}</script></body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 900 }, deviceScaleFactor: 2 });

for (const app of selected) {
  if (!existsSync(resolve(APPS, app.file))) { console.log("MISSING", app.file); continue; }
  const js = await bundle(app.file);
  const pagePath = resolve(OUT, `_page_${app.id}.html`);
  writeFileSync(pagePath, html(js));

  for (const [state, seed] of [["empty", null], ["seeded", app.seed]]) {
    await page.addInitScript(({ key, value }) => {
      try { localStorage.clear(); if (value) localStorage.setItem(key, JSON.stringify(value)); } catch {}
    }, { key: app.key, value: seed });
    await page.goto("file://" + pagePath, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const out = resolve(OUT, `${app.id}-${state}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log("OK", app.id, state, "->", out);
  }
}
await browser.close();
console.log("DONE");
