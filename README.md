# Portfolio

Gaurav Dabas's interactive portfolio — a Next.js (App Router) site built as a
first end-to-end AI-native product. Full context and roadmap live in `PRD.md`
(kept alongside this repo, not committed here).

**Status:** Milestone 1 — scaffold + deploy skeleton.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config — see `app/globals.css` + `styles/tokens.css`)
- Fonts: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (data/labels)
- Hosting: Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

- `config/` — site identity and connection settings (domain, GitHub username,
  social links). Change the URL here (and in Vercel env vars) when the
  custom domain is connected — nothing else hardcodes it.
- `content/` — editable page copy as typed data files, not hardcoded JSX.
- `styles/tokens.css` — the color palette (validated for contrast/CVD via
  the dataviz skill's checker before being locked in).
- `lib/palette.ts` — the separate, pre-validated chart-series palette used
  by any data visualization on the site.
- `components/layout/Section.tsx` — every homepage section renders through
  this wrapper so spacing/heading treatment stay consistent site-wide.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in as milestones need them.

## Milestones

See `PRD.md` §7. MVP is milestones 1–3 (scaffold, projects, GitHub embed).
This repo builds one milestone at a time, each independently deployable.
