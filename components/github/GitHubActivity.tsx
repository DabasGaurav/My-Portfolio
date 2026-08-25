import { getRecentRepos } from "@/lib/github";
import { timeAgo } from "@/lib/time";
import type { GithubRepo } from "@/types/github";

export async function GitHubActivity() {
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
    <ul className="grid gap-4 md:grid-cols-2">
      {repos.map((repo) => (
        <li key={repo.id} className="card-pop p-6">
          <div className="flex items-baseline justify-between gap-4">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {repo.name}
            </a>
            <span className="shrink-0 font-sans text-xs font-medium text-muted">
              {timeAgo(repo.updatedAt)}
            </span>
          </div>

          {repo.description && (
            <p className="mt-2 text-muted">{repo.description}</p>
          )}

          <div className="mt-4 flex gap-4 font-sans text-xs font-medium text-muted">
            {repo.language && <span>{repo.language}</span>}
            <span className="tabular-nums">&#9733; {repo.stars}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
