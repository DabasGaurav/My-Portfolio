export type CaseStudyStat = { value: string; label: string };

/** A fork in the road: what was chosen, what was turned down, and why. */
export type CaseStudyDecision = {
  title: string;
  chose: string;
  rejected: string;
  why: string;
};

/** A lesson from building against real systems: what the plan assumed, what was true, what changed. */
export type CaseStudyLesson = { assumed: string; found: string; changed: string };

export type ProjectDetail = {
  repo: string;
  name: string;
  kind: string;
  status: string;
  hook: string;
  summary: string;
  problem: string;
  approach: string[];
  productChoices: string[];
  next: string;
  preview: { observe: string; decide: string; test: string };
  accent: "teal" | "clay" | "blue";
  demoUrl?: string;
  loomUrl?: string;

  // Optional depth for fuller case studies. Each renders only when present.
  role?: string;
  stats?: CaseStudyStat[];
  /** Replaces the plain productChoices list on the case page when present. */
  decisions?: CaseStudyDecision[];
  evaluation?: { intro: string; points: string[] };
  lessons?: CaseStudyLesson[];
  /** Honest gaps: what does not work yet, or works only in a limited way. */
  gaps?: string[];
  /** Concrete follow-ups shown under "What I'd test next". */
  nextSteps?: string[];
};
