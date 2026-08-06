import { unstable_cache } from "next/cache";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { siteConfig } from "@/config/site.config";

export type Teaser = {
  slug: string;
  title: string;
  url: string;
  teaser: string;
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
    model: google("gemini-2.5-flash"),
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

export async function getLatestTeaser(): Promise<Teaser | null> {
  const [latest] = getAllPosts();
  if (!latest) return null;

  const post = getPostBySlug(latest.slug);
  if (!post) return null;

  const teaser = await getCachedTeaser(post.slug, post.title, post.summary);

  return {
    slug: post.slug,
    title: post.title,
    url: `${siteConfig.url}/blog/${post.slug}`,
    teaser,
  };
}
