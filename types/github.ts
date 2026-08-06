export type GithubRepo = {
  id: number;
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
};
