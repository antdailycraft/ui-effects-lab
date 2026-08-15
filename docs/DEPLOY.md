# Deployment

UI Effects Lab is a static Vite SPA — `npm run build` emits a self-contained
`dist/` with no server or database. Two deploy paths are wired up.

## Vercel (recommended — works today)

`vercel.json` declares the Vite framework, `npm run build`, and `dist/` output.
Import the repo at vercel.com (or `vercel` / `vercel --prod` with the CLI). Vercel
serves from `/`, so `DEPLOY_TARGET` is left unset and Vite's `base` stays `/` —
no extra configuration needed. This works while the repo stays private.

## GitHub Pages (needs a public repo or a paid plan)

A workflow at `.github/workflows/deploy.yml` builds with `DEPLOY_TARGET=gh-pages`
(which sets Vite's `base` to `/ui-effects-lab/` so the project-site asset URLs
resolve) and publishes `dist/` to Pages.

> **Note:** GitHub Pages is not available for this repository on its current plan
> ("Your current plan does not support GitHub Pages for this repository"). Pages
> for a **private** repo requires GitHub Pro/Team/Enterprise; alternatively, make
> the repo **public** and Pages is free. Until one of those is true, the workflow
> is set to **manual-only** (`workflow_dispatch`) so it doesn't redden `main`.

Once Pages is available:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Run it from the **Actions** tab → "Deploy to GitHub Pages" → **Run workflow**
   (or add a `push: { branches: [main] }` trigger to the workflow for automatic
   deploys). The live URL is `https://<owner>.github.io/ui-effects-lab/`.

## Base path, in short

| Target                | `DEPLOY_TARGET` | Vite `base`         |
| --------------------- | --------------- | ------------------- |
| Local dev / preview   | _(unset)_       | `/`                 |
| Vercel                | _(unset)_       | `/`                 |
| GitHub Pages          | `gh-pages`      | `/ui-effects-lab/`  |

There is no client-side router, so no SPA 404 fallback is required.
