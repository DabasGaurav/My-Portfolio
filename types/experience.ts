export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  companyUrl?: string;
  /** See types/project.ts — same honest-data convention. */
  placeholder?: boolean;
};
