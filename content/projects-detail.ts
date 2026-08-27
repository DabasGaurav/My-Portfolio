import type { ProjectDetail } from "@/types/project-detail";

/**
 * Optional per-project write-ups for the "Currently Cooking" detail pages
 * (app/projects/[slug]). A repo with no entry here still gets a page —
 * it just falls back to the GitHub description with no explanation/loom/
 * demo sections shown. Add entries here as you write them up; keyed by
 * exact GitHub repo name.
 */
export const projectDetails: ProjectDetail[] = [];

export function getProjectDetail(repo: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.repo === repo);
}
