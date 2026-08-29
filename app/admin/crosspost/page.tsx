import type { Metadata } from "next";
import { getLatestTeaser } from "@/lib/crosspost";
import { CopyButton } from "@/components/admin/CopyButton";

// Unlisted on purpose — not linked from Nav, no auth (PRD explicitly
// excludes CMS/auth). Low-stakes content, so obscurity is the guard.
export const metadata: Metadata = { robots: { index: false, follow: false } };

// Force dynamic so each visit reads the latest cron-refreshed teaser from
// the Data Cache, instead of freezing whatever was true at build time.
export const dynamic = "force-dynamic";

export default async function CrosspostAdminPage() {
  if (!process.env.GEMINI_API_KEY) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-muted">
          GEMINI_API_KEY isn&apos;t set — see .env.local.example.
        </p>
      </div>
    );
  }

  const teaser = await getLatestTeaser();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-muted">
        Crosspost review
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Latest teaser</h1>

      {!teaser ? (
        <p className="mt-8 text-muted">No blog posts to crosspost yet.</p>
      ) : (
        <div className="card-pop-flat mt-8 p-6">
          <h2 className="font-display text-xl font-bold">{teaser.title}</h2>
          <p className="mt-4 whitespace-pre-wrap text-ink">{teaser.teaser}</p>
          <p className="mt-4 font-mono text-xs text-accent">{teaser.url}</p>
          <div className="mt-6">
            <CopyButton text={`${teaser.teaser}\n\n${teaser.url}`} />
          </div>
        </div>
      )}

      <p className="mt-8 font-sans text-xs font-medium text-muted">
        Regenerated automatically when a new post is published (see
        vercel.json cron + lib/crosspost.ts). Auto-queued to LinkedIn via
        Zapier + Buffer (app/api/crosspost/feed) — this page is a manual
        preview/backup, not the only way it gets posted.
      </p>
    </div>
  );
}
