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
};
