---
target: apps/larice-review-journal.jsx
total_score: 21
p0_count: 2
p1_count: 3
timestamp: 2026-06-15T18-11-30Z
slug: apps-larice-review-journal-jsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Action-status pattern is strong; AI calls lack a real progress indicator |
| 2 | Match System / Real World | 3 | "Launch Week 1 of 13" is excellent; KPI inputs lack unit suffixes |
| 3 | User Control and Freedom | 2 | Delete has no confirm or undo; AI calls can't be cancelled; review edits silently overwrite |
| 4 | Consistency and Standards | 1 | Wrong type pair (Playfair+Inter, not Cormorant+Outfit); leaks customer-suite archetype accents; three card treatments coexist |
| 5 | Error Prevention | 2 | No delete confirm; KPI fields accept any string; draft not visibly auto-saved |
| 6 | Recognition Rather Than Recall | 3 | Tabs + sub-nav + schema-driven labels make state obvious |
| 7 | Flexibility and Efficiency | 1 | Daily-use power tool with zero keyboard shortcuts |
| 8 | Aesthetic and Minimalist Design | 1 | Four absolute-ban hits; 4-band sticky top eats ~140px |
| 9 | Error Recovery | 2 | AI calls return a single inline string with no retry; OAuth-gated features fail silently |
| 10 | Help and Documentation | 3 | Schema sub/note lines do real work inline |
| **Total** | | **21/40** | **Acceptable** |

## Anti-patterns

Banned hits: em dashes (50+), side-stripe borders (10), decorative drop shadows (16), radial gradients on breath/reward modals (2), wrong font pair via inline @import (1), cross-register color leak (3 archetype colors from the customer suite).

Detector engine not bundled (degraded). Browser unavailable in this environment (degraded). Manual scan only.

## Priority Issues

**[P0] Wrong type pair — Playfair Display + Inter instead of Cormorant Garamond + Outfit**
- Suggested command: `impeccable typeset`

**[P0] Cross-register color leak — ARCH.Rooted / Reclaimer / Regulator used as functional state colors**
- Suggested command: `impeccable colorize`

**[P1] Side-stripe borders are the section signature (10 hits)**
- Suggested command: `impeccable distill`

**[P1] Decorative drop shadows on every card (16 hits)**
- Suggested command: `impeccable quieter`

**[P1] Zero keyboard shortcuts in a daily-use power-user tool**
- Suggested command: `impeccable adapt`

**[P2] Modal-as-first-thought for breath/reward, plus glow-halo gradient ring**
- Suggested command: `impeccable quieter`

## Persona Red Flags

Marisa (sole user, 4-6 opens/day): no bulk-mark on practice checkboxes, no keyboard, no autosave indicator, no delete confirm, no designed mobile breakpoint.

Trent (advisor screenshot test): teal+green+rose+gold on one screen reads as four products. Glowing breath modal reads as wellness app.

## What's Working

1. Action-status pattern on every section header — keep.
2. Schema-driven review forms — declarative, consistent.
3. Launch-context strip — system-status meets real-world.
