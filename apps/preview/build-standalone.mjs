// Build self-contained, interactive HTML files (one per app) into out/.
// Open any in a browser — no server needed. React is bundled inline.
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const HERE = dirname(fileURLToPath(import.meta.url));
const APPS = resolve(HERE, ".."); const OUT = resolve(HERE, "out"); const NM = resolve(HERE, "node_modules");
mkdirSync(OUT, { recursive: true });
const apps = [
  ["foundation-tracker","7-Day Foundation Tracker (free)"],
  ["boundary-journal","Boundary Journal (free)"],
  ["ns-reset-guide","Nervous System Reset Guide (free)"],
  ["rooted-challenge","Rooted Reset Challenge Kit (paid)"],
  ["regulation-mastery","Regulation Mastery Kit (paid)"],
  ["boundary-mastery","Boundary Mastery Kit (paid)"],
];
for (const [file,title] of apps) {
  const entry = resolve(OUT, `_e_${file}.jsx`);
  writeFileSync(entry, `import React from "react";import {createRoot} from "react-dom/client";import App from ${JSON.stringify(resolve(APPS,file+".jsx"))};createRoot(document.getElementById("root")).render(React.createElement(App));`);
  const res = await build({ entryPoints:[entry], bundle:true, write:false, format:"iife", loader:{".js":"jsx",".jsx":"jsx"}, jsx:"automatic", define:{"process.env.NODE_ENV":'"production"'}, absWorkingDir:HERE, nodePaths:[NM], minify:true });
  const html = `<!doctype html><html lang="en"><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LoveLarice — ${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#FAF6F2}</style></head>
<body><div id="root"></div><script>${res.outputFiles[0].text}</script></body></html>`;
  writeFileSync(resolve(OUT, `${file}.html`), html);
  console.log("built", `${file}.html`);
}
console.log("DONE");
