import Link from "next/link";
import { getPinnedRepos } from "@/lib/github";
import { socialConfig } from "@/config/social.config";
import type { GithubRepo } from "@/types/github";

/**
 * "Currently Cooking" — sourced from your pinned GitHub repos (via
 * getPinnedRepos, which needs GITHUB_TOKEN; falls back to recently
 * updated repos without it). Each card links to a detail page
 * (app/projects/[slug]) instead of straight to GitHub — the GitHub link
 * itself lives on that detail page and in the "View GitHub Profile"
 * link below, so it isn't duplicated all over the homepage.
 */
export async function ProjectsGrid() {
  let repos: GithubRepo[] | null = null;
  try {
    repos = await getPinnedRepos();
  } catch {
    repos = null;
  }

  return (
    <div className="flex flex-col gap-6">
      <a
        href={socialConfig.github.url}
        target="_blank"
        rel="noreferrer"
        className="card-pop inline-flex w-fit items-center gap-2 bg-surface-raised px-5 py-2.5 font-sans text-sm font-semibold text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
          />
        </svg>
        View GitHub Profile
      </a>

      {repos === null && (
        <p className="font-sans text-sm font-medium text-muted">
          GitHub activity is unavailable right now — try again shortly.
        </p>
      )}

      {repos !== null && repos.length === 0 && (
        <p className="text-muted">No public repos yet.</p>
      )}

      {repos !== null && repos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {repos.map((repo) => (
            <Link key={repo.id} href={`/projects/${repo.name}`} className="card-pop block p-6">
              <h3 className="font-display text-xl font-bold">{repo.name}</h3>

              <p className="mt-3 text-muted">
                {repo.description || "No description yet on GitHub."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {repo.language && (
                  <span className="rounded-full bg-surface-sunken px-3 py-1 font-sans text-xs font-medium text-muted">
                    {repo.language}
                  </span>
                )}
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-surface-sunken px-3 py-1 font-sans text-xs font-medium text-muted"
                  >
                    {topic}
                  </span>
                ))}
                <span className="font-sans text-xs font-medium tabular-nums text-muted">
                  &#9733; {repo.stars}
                </span>
              </div>

              <span className="mt-5 inline-block font-sans text-sm font-semibold text-accent">
                See details &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
