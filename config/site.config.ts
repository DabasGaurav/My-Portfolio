/**
 * Central site identity + connection settings.
 * Change the domain here (and in Vercel's env vars) — nothing else in the
 * codebase should hardcode a URL.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Gaurav Dabas",
  title: "Gaurav Dabas — Product Manager & Builder",
  tagline: "Product manager with an engineering background, building useful things.",
  description:
    "Explore Gaurav Dabas's product work, project case studies, and the decisions behind what he builds.",
  url: rawSiteUrl,
  domain: {
    // gauravdabas.in is connected (NEXT_PUBLIC_SITE_URL in Vercel).
    current: rawSiteUrl,
  },
} as const;

export type SiteConfig = typeof siteConfig;
