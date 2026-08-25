export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  companyUrl?: string;
  /** Rendered with a visible "Placeholder" label — the honest-data convention used site-wide. */
  placeholder?: boolean;
};
