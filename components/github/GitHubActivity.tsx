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
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
        GitHub activity is unavailable right now — try again shortly.
      </p>
    );
  }

  if (repos.length === 0) {
    return <p className="text-muted">No public repos yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {repos.map((repo) => (
        <li key={repo.id} className="border border-hairline p-6">
          <div className="flex items-baseline justify-between gap-4">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-ink transition-colors hover:text-accent"
            >
              {repo.name}
            </a>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              Updated {timeAgo(repo.updatedAt)}
            </span>
          </div>

          {repo.description && (
            <p className="mt-2 text-muted">{repo.description}</p>
          )}

          <div className="mt-4 flex gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {repo.language && <span>{repo.language}</span>}
            <span className="tabular-nums">&#9733; {repo.stars}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
