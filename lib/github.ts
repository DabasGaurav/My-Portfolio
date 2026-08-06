import { socialConfig } from "@/config/social.config";
import type { GithubRepo } from "@/types/github";

type GithubApiRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

/**
 * Server-side fetch of recent public repo activity. Unauthenticated (60
 * req/hr) is plenty for a personal portfolio's traffic once combined with
 * ISR caching below — add GITHUB_TOKEN in .env if that ever changes.
 */
export async function getRecentRepos(limit = 6): Promise<GithubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${socialConfig.github.username}/repos?sort=updated&per_page=${limit}`,
    {
      headers,
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const repos = (await res.json()) as GithubApiRepo[];

  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      htmlUrl: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
    }));
}
