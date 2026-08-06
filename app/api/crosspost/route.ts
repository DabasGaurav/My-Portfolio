import { getLatestTeaser } from "@/lib/crosspost";

/**
 * Triggered daily by Vercel Cron (see vercel.json). Also safe to hit
 * manually to warm/refresh the cache. Generation itself is deduped by
 * lib/crosspost.ts's cache (keyed on the latest post's slug), so repeat
 * triggers for the same post are free.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set — see .env.local.example." },
      { status: 503 },
    );
  }

  const teaser = await getLatestTeaser();
  if (!teaser) {
    return Response.json({ error: "No blog posts to crosspost yet." }, { status: 404 });
  }

  return Response.json(teaser);
}
