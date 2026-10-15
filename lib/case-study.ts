import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "projects");

/** A long-form case study written in MDX (content/projects/{repo}.mdx), if the project has one. */
export function getCaseStudyBody(repo: string): string | null {
  const file = path.join(DIR, `${repo.toLowerCase()}.mdx`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}
