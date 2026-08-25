import { getRecentRepos } from "@/lib/github";
import { timeAgo } from "@/lib/time";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { GithubRepo } from "@/types/github";

/**
 * The site's "what I've built" section, sourced entirely from live GitHub
 * data — no separate hand-maintained project list. One source of truth,
 * always current, no risk of a stale/fake card sitting next to real data.
 */
export async function ProjectsGrid() {
  let repos: GithubRepo[] | null = null;
  try {
    repos = await getRecentRepos();
  } catch {
    repos = null;
  }

  if (repos === null) {
    return (
      <p className="font-sans text-sm font-medium text-muted">
        GitHub activity is unavailable right now — try again shortly.
      </p>
    );
  }

  if (repos.length === 0) {
    return <p className="text-muted">No public repos yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {repos.map((repo) => (
        <article key={repo.id} className="card-pop p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl italic">{repo.name}</h3>
            <span className="shrink-0 font-sans text-xs font-medium text-muted">
              {timeAgo(repo.updatedAt)}
            </span>
          </div>

          <p className="mt-3 text-muted">
            {repo.description || "No description yet on GitHub."}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {repo.language && (
              <span className="rounded-full border-2 border-hairline px-3 py-1 font-sans text-xs font-medium text-muted">
                {repo.language}
              </span>
            )}
            <span className="font-sans text-xs font-medium tabular-nums text-muted">
              &#9733; {repo.stars}
            </span>
          </div>

          <TrackedLink
            event="project_link_click"
            properties={{ repo: repo.name }}
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-70"
          >
            GitHub &rarr;
          </TrackedLink>
        </article>
      ))}
    </div>
  );
}
