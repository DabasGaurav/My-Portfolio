import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRepoByName } from "@/lib/github";
import { getProjectDetail } from "@/content/projects-detail";

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const repo = await getRepoByName(slug);
  if (!repo) return {};
  return { title: repo.name, description: repo.description ?? undefined };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const repo = await getRepoByName(slug);
  if (!repo) notFound();

  const detail = getProjectDetail(repo.name);
  const explanation = detail?.explanation || repo.description;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/#cooking"
        className="font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-70"
      >
        &larr; Back to Currently Cooking
      </Link>

      <h1 className="mt-6 text-balance font-display text-5xl italic">{repo.name}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {repo.language && (
          <span className="rounded-full bg-surface-sunken px-3 py-1 font-sans text-xs font-medium text-muted">
            {repo.language}
          </span>
        )}
        {repo.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-surface-sunken px-3 py-1 font-sans text-xs font-medium text-muted"
          >
            {topic}
          </span>
        ))}
      </div>

      {explanation && <p className="mt-8 text-lg text-muted">{explanation}</p>}

      {!explanation && (
        <p className="mt-8 font-sans text-sm text-muted">
          No write-up yet for this project — check back soon, or see the code on GitHub below.
        </p>
      )}

      {detail?.loomUrl && (
        <div className="mt-10">
          <h2 className="font-display text-2xl italic">Walkthrough</h2>
          <div className="card-pop-flat mt-4 aspect-video overflow-hidden">
            <iframe
              src={detail.loomUrl}
              title={`${repo.name} walkthrough`}
              allow="fullscreen"
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      {detail?.demoUrl && (
        <div className="mt-10">
          <h2 className="font-display text-2xl italic">Demo</h2>
          <div className="card-pop-flat mt-4 aspect-video overflow-hidden">
            <video src={detail.demoUrl} controls className="h-full w-full" />
          </div>
        </div>
      )}

      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="card-pop mt-10 inline-flex items-center gap-2 bg-accent px-6 py-3 font-sans text-sm font-semibold text-on-accent"
      >
        View on GitHub &rarr;
      </a>
    </article>
  );
}
