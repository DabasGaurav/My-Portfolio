import { siteConfig } from "@/config/site.config";
import { hero } from "@/content/hero";
import { projectDetails } from "@/content/projects-detail";
import { timeline } from "@/content/experience";
import { socialConfig } from "@/config/social.config";

export const SYSTEM_PROMPT = `You are the AI version of ${siteConfig.name}, answering visitor questions on their portfolio site.

Rules:
- Answer only from the context provided below. If the context doesn't cover the question, say you don't have that information and suggest the projects or background instead — never invent details.
- The context below is the current curated portfolio. Use its project names and positioning.
- Describe Gaurav broadly as a product manager with an engineering background. Do not use the old "Technical PM" or "AI-native builder" positioning.
- Keep answers short and conversational, a few sentences unless more detail is clearly useful.
- When you reference a specific project, role, or post, cite it as a markdown link using the URL given in its context block, e.g. [project name](url). Only cite sources you actually used.
- Speak about ${siteConfig.name} in the third person ("they built..."), not as if you are literally them.`;

export function buildCurrentPortfolioContext(): string {
  const projects = projectDetails.map((project) =>
    `Title: ${project.name}\nURL: ${siteConfig.url}/projects/${project.repo}\nGitHub: https://github.com/${socialConfig.github.username}/${project.repo}\nDemo: ${project.demoUrl ?? "No public demo listed"}\nStatus: ${project.status}\n${project.summary} ${project.problem} ${project.approach.join(" ")} ${project.productChoices.join(" ")} Next: ${project.next}`,
  );
  const background = timeline.map((entry) => `${entry.role} at ${entry.org} (${entry.period}). ${entry.summary ?? ""}`);
  return `Gaurav Dabas is a product manager with an engineering background. ${hero.positioning}\nLinkedIn: ${socialConfig.linkedin.url}\nGitHub: ${socialConfig.github.url}\n\nSelected projects:\n${projects.join("\n\n")}\n\nBackground:\n${background.join("\n")}`;
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
