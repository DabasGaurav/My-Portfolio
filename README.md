# Gaurav Dabas — portfolio

Live at [gauravdabas.in](https://gauravdabas.in). This is a product portfolio: the selected work comes first, with short background context and deeper case studies behind each project.

## What's here

- An interactive project explorer for Proposal Copilot, Show Up, and CreatorSignal.ai
- Case studies covering the problem, approach, product choices, and next test
- A rotating portrait with manual and pause controls
- A portfolio guide that opens on arrival and answers from the current curated project and background content

## Run locally

```bash
npm ci
npm run dev
```

The site uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Vercel. The portfolio guide needs `GEMINI_API_KEY` in `.env.local`; the rest of the site works without it.

## Where to edit

- `content/hero.ts` — intro, role labels, portrait rotation
- `content/projects-detail.ts` — selected projects and case-study content
- `content/experience.ts` — background details
- `components/projects/ProjectsGrid.tsx` — interactive project explorer
- `components/chatbot/ChatDock.tsx` — open chat and suggested question
- `lib/rag/prompt.ts` — the guide's current source of truth
- `styles/tokens.css` — color system

The chat route uses curated content directly so portfolio answers stay aligned with the site. The older Pinecone ingestion files remain in `lib/rag/` for future search experiments but are not required by the live guide.
