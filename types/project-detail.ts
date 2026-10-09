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
  accent: "teal" | "clay" | "blue";
  demoUrl?: string;
  loomUrl?: string;
};
