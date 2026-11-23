# Deployment

UI Effects Lab is a static Vite SPA — `npm run build` emits a self-contained
`dist/` with no server or database. Two deploy paths are wired up.

## GitHub Pages (live — https://effects.aidaon.com)

`.github/workflows/deploy.yml` builds the app and publishes `dist/` to GitHub
Pages on every push to `main` (it can also be run from the **Actions** tab →
"Deploy to GitHub Pages" → **Run workflow**).

The site uses the custom domain **effects.aidaon.com** (Settings → Pages →
Custom domain, with a DNS `CNAME effects → antdailycraft.github.io`). A custom
domain is served from the root, so Vite's `base` is `/`. The old project URL
`https://antdailycraft.github.io/ui-effects-lab/` redirects to it.

## Vercel (alternative)

`vercel.json` declares the Vite framework, `npm run build`, and `dist/` output.
Import the repo at vercel.com (or `vercel` / `vercel --prod` with the CLI). Vercel
also serves from `/`, so no extra configuration is needed.

## Base path, in short

| Target                          | Vite `base` |
| ------------------------------- | ----------- |
| Local dev / preview             | `/`         |
| GitHub Pages (effects.aidaon.com) | `/`       |
| Vercel                          | `/`         |

There is no client-side router, so no SPA 404 fallback is required.
