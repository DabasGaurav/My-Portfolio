export type TimelineEntry = {
  type: "work" | "education";
  role: string;
  org: string;
  period: string;
  summary: string;
  orgUrl?: string;
  /** Rendered with a visible "Placeholder" label — the honest-data convention used site-wide. */
  placeholder?: boolean;
  /**
   * Verbatim text copied from the LinkedIn profile PDF export — shown as-is
   * (whitespace preserved, not reformatted) in the entry's detail modal
   * when present. Leave unset for entries that don't need one.
   */
  raw?: string;
};
