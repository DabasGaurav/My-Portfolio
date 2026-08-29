/**
 * Central site identity + connection settings.
 * Change the domain here (and in Vercel's env vars) — nothing else in the
 * codebase should hardcode a URL.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Gaurav Dabas",
  title: "Gaurav Dabas — Technical PM & Builder",
  tagline: "I build AI-native products end to end, and this site is the proof.",
  description:
    "Interactive portfolio of Gaurav Dabas: projects, live GitHub activity, an MDX blog, and a RAG chatbot you can ask questions to.",
  url: rawSiteUrl,
  domain: {
    // gauravdabas.in is connected (NEXT_PUBLIC_SITE_URL in Vercel).
    current: rawSiteUrl,
  },
} as const;

export type SiteConfig = typeof siteConfig;
