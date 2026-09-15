# VDOMATT — Matt Baer · Underwater Videography

Portfolio and booking site for Matt Baer ([@vdomatt](https://www.instagram.com/vdomatt/)), underwater videographer and dive instructor — Sail Rock / Koh Tao and the Red Sea.

## Stack

React 19 · Vite 7 · Tailwind v4 · framer-motion · Vercel serverless functions (`api/`) · Supabase.

The site is tuned for low-end hardware: no `backdrop-filter`, no large `blur()`, no blend modes or SVG filters, compositor-only animations, images ≤ 1600 px.

## Develop

```
npm install
cp .env.example .env.local   # fill in Supabase keys
npm run dev
```

`npm run build` type-checks and bundles to `dist/`; `npm run preview` serves the production build.

## Deploy

Deployed on Vercel. Environment variables are set in the Vercel dashboard (Project → Settings → Environment Variables), never committed.

## Photos

Web-ready images live in `public/img/` (`g1–g7` grid, `r1–r7` reel, `hero-poster`, `portrait`). Full-resolution originals are kept locally in `originals/` (git-ignored). To regenerate a web version:

```
magick originals/dive-photos/XXXX.JPG -auto-orient -resize "1300x1300>" -modulate 92,110,100 -sigmoidal-contrast 2x50% -strip -interlace Plane -sampling-factor 4:2:0 -quality 78 public/img/NAME.jpg
```
