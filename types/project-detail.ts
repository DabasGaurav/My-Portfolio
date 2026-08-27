export type ProjectDetail = {
  /** Must match the GitHub repo name exactly — used as the URL slug too. */
  repo: string;
  /** Longer write-up for the detail page. Falls back to the GitHub description if omitted. */
  explanation?: string;
  loomUrl?: string;
  demoUrl?: string;
};
