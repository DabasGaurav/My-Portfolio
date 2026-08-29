import { unstable_cache } from "next/cache";
import { generateText } from "ai";
import { google } from "@/lib/rag/google-provider";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { siteConfig } from "@/config/site.config";

export type Teaser = {
  slug: string;
  title: string;
  url: string;
  teaser: string;
  publishedAt: string;
};

function buildPrompt(title: string, summary: string): string {
  return `Write a LinkedIn teaser post announcing a new blog post.

Title: ${title}
Summary: ${summary}

Rules:
- 3-4 sentences, conversational, no hashtags, no emoji.
- Hook first sentence, then the value the reader gets, then an implicit or explicit reason to click.
- Do not include the link — it's appended separately.
- Return only the teaser text, nothing else.`;
}

async function generateTeaser(title: string, summary: string): Promise<string> {
  const { text } = await generateText({
    model: google("gemini-3.6-flash"),
    prompt: buildPrompt(title, summary),
  });
  return text.trim();
}

/**
 * Cached per post slug — a new post (new slug) triggers one fresh
 * generation; re-running the cron job for the same latest post reuses the
 * cached teaser instead of regenerating (and re-billing) every run. This
 * uses Next's own Data Cache as the "already posted" ledger, so there's
 * no separate database to provision.
 */
const getCachedTeaser = unstable_cache(
  async (slug: string, title: string, summary: string) =>
    generateTeaser(title, summary),
  ["crosspost-teaser"],
  { revalidate: 60 * 60 * 24 * 7 },
);

/**
 * Newest-first, capped at `limit`. Used by the Zapier-facing feed
 * (app/api/crosspost/feed) so a polling trigger has a little history to
 * dedupe against on its first run, not just whatever's newest right now.
 */
export async function getRecentTeasers(limit = 5): Promise<Teaser[]> {
  const metas = getAllPosts().slice(0, limit);

  const teasers = await Promise.all(
    metas.map(async (meta) => {
      const post = getPostBySlug(meta.slug);
      if (!post) return null;
      const teaser = await getCachedTeaser(post.slug, post.title, post.summary);
      return {
        slug: post.slug,
        title: post.title,
        url: `${siteConfig.url}/blog/${post.slug}`,
        teaser,
        publishedAt: post.date,
      };
    }),
  );

  return teasers.filter((t): t is Teaser => t !== null);
}

export async function getLatestTeaser(): Promise<Teaser | null> {
  const [latest] = await getRecentTeasers(1);
  return latest ?? null;
}
