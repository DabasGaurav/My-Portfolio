import { getRecentTeasers } from "@/lib/crosspost";

/**
 * Zapier-facing feed for the LinkedIn crosspost automation: point a
 * "Webhooks by Zapier" -> Retrieve Poll trigger at this URL. Zapier
 * dedupes on each item's `id`, so it only fires the Zap for posts it
 * hasn't seen before — new blog post shows up here, Zap fires once.
 *
 * Same teaser generation as /api/crosspost and app/admin/crosspost
 * (lib/crosspost.ts) — this endpoint only changes how the result gets
 * delivered (a small JSON array, machine-readable) not what gets said.
 *
 * Gated by CROSSPOST_FEED_SECRET, separate from CRON_SECRET (used by
 * Vercel's own cron hitting /api/crosspost) so the two consumers don't
 * share a credential.
 */
export async function GET(req: Request) {
  const secret = process.env.CROSSPOST_FEED_SECRET;
  if (secret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set — see .env.local.example." },
      { status: 503 },
    );
  }

  const teasers = await getRecentTeasers(5);

  return Response.json(
    teasers.map((t) => ({
      id: t.slug,
      title: t.title,
      url: t.url,
      teaser: t.teaser,
      // Pre-built so the Zap's Buffer step can map this one field
      // straight to the post text without a Formatter step.
      post_text: `${t.teaser}\n\n${t.url}`,
      published_at: t.publishedAt,
    })),
  );
}
