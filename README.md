# Portfolio

Gaurav Dabas's interactive portfolio — a Next.js (App Router) site built as a
first end-to-end AI-native product. Full context and roadmap live in `PRD.md`
(kept alongside this repo, not committed here).

**Status:** Milestone 7 — crossposting agent. All 7 milestones are shipped.

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

Open [http://localhost:3000](http://localhost:3000)

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

## Chatbot setup (Milestone 6)

The site works fully without this — the chat widget just shows a clear
"not configured" message until you add these two free-tier accounts:

1. **Gemini API key** — [aistudio.google.com/apikey](https://aistudio.google.com/apikey),
   free tier, no billing required. Set `GEMINI_API_KEY`.
2. **Pinecone API key** — [app.pinecone.io](https://app.pinecone.io), free
   Starter plan. Set `PINECONE_API_KEY`. `PINECONE_INDEX` is optional
   (defaults to `portfolio-rag`) — the ingest script creates the index
   automatically if it doesn't exist yet, so no manual dashboard setup.
3. Add both to `.env.local` (local dev) **and** to the Vercel project's
   environment variables (production) — `vercel env add GEMINI_API_KEY production`
   and same for `PINECONE_API_KEY`.
4. Run `npm run ingest` locally to embed `content/about.md`, `content/projects.ts`,
   `content/experience.ts`, and every post in `content/blog/` into Pinecone.
   Re-run it any time that content changes — it's a manual step, not part
   of the build.
5. Redeploy (`vercel deploy --prod`) so the deployed API route picks up
   the new env vars.

## Crossposting agent setup (Milestone 7)

Reuses the same `GEMINI_API_KEY` from Milestone 6 — nothing new to sign up
for. What it does: `vercel.json` schedules a daily hit to `/api/crosspost`,
which generates a LinkedIn teaser for the latest blog post (Gemini) and
caches it per post slug via Next's Data Cache (`lib/crosspost.ts`) — a new
post gets a fresh teaser; re-running the cron for the same post reuses the
cached one instead of re-generating. Visit `/admin/crosspost` (unlisted,
not in Nav — no auth per the PRD's no-CMS/no-auth constraint, so treat the
URL as unlisted-but-not-secret) to read and copy the current teaser,
ready to paste into LinkedIn — there's no API that allows posting to a
personal profile automatically, so this last step stays manual by design.

Optional: set `CRON_SECRET` (any random string, e.g. `openssl rand -hex 32`)
in Vercel's env vars — Vercel sends it automatically as a bearer token on
cron-triggered requests once it's set, which stops random visitors from
triggering `/api/crosspost` directly. Cron schedule is set to run once
daily; Vercel's Hobby plan doesn't allow more frequent cron invocations.

## Milestones

See `PRD.md` §7. MVP is milestones 1–3 (scaffold, projects, GitHub embed).
This repo builds one milestone at a time, each independently deployable.
All 7 are shipped as of this commit.
