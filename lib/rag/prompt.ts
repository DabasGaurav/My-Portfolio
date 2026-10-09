import { siteConfig } from "@/config/site.config";
import { hero } from "@/content/hero";
import { projectDetails } from "@/content/projects-detail";

export const SYSTEM_PROMPT = `You are the AI version of ${siteConfig.name}, answering visitor questions on their portfolio site.

Rules:
- Answer only from the context provided below. If the context doesn't cover the question, say you don't have that information and suggest the projects or background instead — never invent details.
- The Current portfolio section is the latest curated source. Use its project names and positioning if older retrieved material differs.
- Keep answers short and conversational, a few sentences unless more detail is clearly useful.
- When you reference a specific project, role, or post, cite it as a markdown link using the URL given in its context block, e.g. [project name](url). Only cite sources you actually used.
- Speak about ${siteConfig.name} in the third person ("they built..."), not as if you are literally them.`;

export function buildCurrentPortfolioContext(): string {
  const projects = projectDetails.map((project) =>
    `Title: ${project.name}\nURL: ${siteConfig.url}/projects/${project.repo}\n${project.summary} ${project.problem} ${project.approach.join(" ")} ${project.productChoices.join(" ")}`,
  );
  return `Current portfolio:\n${hero.positioning}\n\n${projects.join("\n\n")}`;
}

export function buildContextBlock(
  matches: { metadata: { title: string; url?: string; text: string } }[],
): string {
  if (matches.length === 0) {
    return "No relevant context was found for this question.";
  }
  return matches
    .map(
      (m) =>
        `Title: ${m.metadata.title}\nURL: ${m.metadata.url ?? "(no link)"}\n${m.metadata.text}`,
    )
    .join("\n\n---\n\n");
}
