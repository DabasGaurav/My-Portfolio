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
  topics?: string[];
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
    .map(mapRepo);
}

function mapRepo(repo: GithubApiRepo): GithubRepo {
  return {
    id: repo.id,
    name: repo.name,
    htmlUrl: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    topics: repo.topics ?? [],
  };
}

type PinnedGraphqlRepo = {
  databaseId: number;
  name: string;
  url: string;
  description: string | null;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  updatedAt: string;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
};

/**
 * Pinned repos ("featured" on the GitHub profile) — this is what
 * "Currently Cooking" shows, kept in sync with whatever you pin on
 * GitHub. Unlike the REST endpoint above, GitHub's GraphQL API requires
 * an authenticated token for every request (no anonymous access, even
 * for public data), so this needs GITHUB_TOKEN set. Falls back to the
 * most recently updated repos if no token is configured, so the section
 * degrades gracefully instead of breaking.
 */
export async function getPinnedRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return getRecentRepos();
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
    body: JSON.stringify({
      query: `
        query ($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  databaseId
                  name
                  url
                  description
                  primaryLanguage { name }
                  stargazerCount
                  updatedAt
                  repositoryTopics(first: 10) { nodes { topic { name } } }
                }
              }
            }
          }
        }
      `,
      variables: { login: socialConfig.github.username },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL API responded with ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { user: { pinnedItems: { nodes: PinnedGraphqlRepo[] } } };
    errors?: unknown;
  };

  if (json.errors || !json.data) {
    throw new Error(`GitHub GraphQL API returned errors: ${JSON.stringify(json.errors)}`);
  }

  const nodes = json.data.user.pinnedItems.nodes;
  if (nodes.length === 0) {
    return getRecentRepos();
  }

  return nodes.map((repo) => ({
    id: repo.databaseId,
    name: repo.name,
    htmlUrl: repo.url,
    description: repo.description,
    language: repo.primaryLanguage?.name ?? null,
    stars: repo.stargazerCount,
    updatedAt: repo.updatedAt,
    topics: repo.repositoryTopics.nodes.map((n) => n.topic.name),
  }));
}

/**
 * Fetches a repo's README (rendered to plain-ish text, stripped of
 * markdown noise) for the RAG corpus — used only by scripts/ingest.ts,
 * never at request time. Returns null if there's no README or the repo
 * is private/inaccessible.
 */
export async function getRepoReadme(name: string): Promise<string | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.raw+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${socialConfig.github.username}/${name}/readme`,
    { headers },
  );

  if (!res.ok) return null;

  const raw = await res.text();
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/[*_`>]/g, "")
    .replace(/\n{2,}/g, "\n\n")
    .trim()
    .slice(0, 4000);
}

/** Single repo lookup, for project detail pages (app/projects/[slug]). */
export async function getRepoByName(name: string): Promise<GithubRepo | null> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${socialConfig.github.username}/${name}`,
    { headers, next: { revalidate: 3600 } },
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

  return mapRepo((await res.json()) as GithubApiRepo);
}
