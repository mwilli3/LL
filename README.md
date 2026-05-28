# LL / shopify-theme

This branch holds the **complete Shopify theme** (Horizon-based) for the
LoveLarice store and is **connected to Shopify via the GitHub integration**.

- **Connected theme:** `LL/shopify-theme` (currently an *unpublished* draft)
- **Theme root:** this branch's root (`assets/`, `blocks/`, `config/`,
  `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`)

## Auto-sync contract

The integration keeps this branch and the Shopify theme in lockstep, both ways:

| You do this | Result |
|---|---|
| Push a commit to `shopify-theme` | Shopify pulls it into the draft theme automatically |
| Edit in the Shopify theme editor / code editor / admin | Shopify auto-commits the change back to this branch (author: `shopify` bot) |

There is no manual upload step. Editing the theme = editing this branch.

## How to make a theme edit

```bash
git checkout shopify-theme
git pull origin shopify-theme        # always start from the latest (admin edits land here too)
# edit files under sections/, snippets/, assets/, etc.
git add -A
git commit -m "..."
git push origin shopify-theme        # Shopify pulls automatically
```

Then preview in Shopify: **Online Store → Themes → LL/shopify-theme → Preview**.

## Guardrails

- **Always `pull` before editing.** Admin/theme-editor changes are committed
  here by the Shopify bot; starting stale risks a conflict (resolve in GitHub
  or use *Actions → Reset to last commit* on the theme card).
- **Keep the default Shopify theme folder structure.** No `src/`/`dist/` or
  build pipeline on this branch — the integration only syncs the standard
  folders and ignores everything else (this `README.md` is ignored by Shopify).
- **This branch is intentionally separate** from the app/dev branches
  (e.g. `claude/*`, which build the Netlify-hosted React apps). Don't merge the
  Vite project into this branch.
- The custom homepage lives in `sections/lovelarice-home.liquid`.
