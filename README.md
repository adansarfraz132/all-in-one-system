# Sanabil Studio · All in One

Unified operations platform — pitch wireframe & clickable prototype.

One platform for HR, payroll, finance, IT, compliance and more. Companies turn on only the sub-features they need, so they only pay for what they actually use.

## What's inside

- **`Sanabil Studio All in One.html`** — main canvas: brief, design system, landing heroes, modules picker, HR dashboard, pricing, capture, clickable prototype.
- **`components/`** — React component modules (landings, modules, pricing, proto, primitives, subfunctions).
- **`styles.css`** — shared design tokens.
- **`assets/`** — Sanabil Studio & Sanabil Investments logos.
- **`design-canvas.jsx`** — pan/zoom canvas shell.

## Run locally

```bash
npx serve .
```

Then open `http://localhost:3000/Sanabil%20Studio%20All%20in%20One.html`.

## Deploy to Vercel (one-click)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
3. Framework preset: **Other** (no build step — pure static).
4. Click **Deploy**.

`vercel.json` rewrites `/` → the main HTML file so the site loads cleanly at the root.

## Stack

- Vanilla React 18 via UMD (no build step)
- Babel Standalone for inline JSX
- Pure CSS (no framework)

---

Incubated & backed by **Sanabil Studio** + **Sanabil Investments**.
