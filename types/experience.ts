export type TimelineEntry = {
  type: "work" | "education";
  role: string;
  org: string;
  period: string;
  summary: string;
  orgUrl?: string;
  /** Rendered with a visible "Placeholder" label — the honest-data convention used site-wide. */
  placeholder?: boolean;
};
