# Deployment

UI Effects Lab is a static Vite SPA — `npm run build` emits a self-contained
`dist/` with no server or database. Two deploy paths are wired up.

## GitHub Pages (default, no external account)

A workflow at `.github/workflows/deploy.yml` builds and publishes on every push
to `main`. It builds with `DEPLOY_TARGET=gh-pages`, which sets Vite's `base` to
`/ui-effects-lab/` so the project-site asset URLs resolve.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
Actions**. (On a private repo this requires a plan that includes private Pages.)
After that, each push to `main` redeploys automatically; the live URL is:

```
https://<owner>.github.io/ui-effects-lab/
```

You can also trigger it manually from the Actions tab ("Deploy to GitHub Pages" →
Run workflow).

## Vercel (serves from root)

`vercel.json` declares the Vite framework, `npm run build`, and `dist/` output.
Import the repo at vercel.com (or `vercel` / `vercel --prod` with the CLI). Vercel
serves from `/`, so `DEPLOY_TARGET` is left unset and Vite's `base` stays `/` —
no extra configuration needed.

## Base path, in short

| Target                | `DEPLOY_TARGET` | Vite `base`         |
| --------------------- | --------------- | ------------------- |
| Local dev / preview   | _(unset)_       | `/`                 |
| Vercel                | _(unset)_       | `/`                 |
| GitHub Pages          | `gh-pages`      | `/ui-effects-lab/`  |

There is no client-side router, so no SPA 404 fallback is required.
