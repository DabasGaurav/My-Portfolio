import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { chunkMarkdown } from "./chunk";
import { getRepoReadme } from "@/lib/github";
import { projectDetails } from "@/content/projects-detail";
import { timeline } from "@/content/experience";
import { siteConfig } from "@/config/site.config";
import type { Chunk } from "@/types/rag";

/** Node-only: used by the indexer, never by the request handler. */
function aboutChunks(): Chunk[] {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "about.md"), "utf8");
  const { content } = matter(raw);
  return chunkMarkdown(content).map((text, index) => ({
    id: `about-${index}`,
    text,
    metadata: { source: "about", title: "About Gaurav", text },
  }));
}

async function projectChunks(): Promise<Chunk[]> {
  const chunks: Chunk[] = [];
  for (const project of projectDetails) {
    const text = [project.name, project.summary, project.problem, ...project.approach, ...project.productChoices].join(" ");
    const url = `${siteConfig.url}/projects/${project.repo}`;
    chunks.push({
      id: `project-${project.repo}`,
      text,
      metadata: { source: "project", title: project.name, url, text },
    });

    const readme = await getRepoReadme(project.repo);
    if (readme) {
      chunkMarkdown(readme).forEach((part, index) => {
        chunks.push({
          id: `project-${project.repo}-readme-${index}`,
          text: `${project.name}: ${part}`,
          metadata: { source: "project", title: `${project.name} code and README`, url, text: part },
        });
      });
    }
  }
  return chunks;
}

function backgroundChunks(): Chunk[] {
  return timeline.map((entry) => {
    const text = `${entry.role} at ${entry.org} (${entry.period}). ${entry.summary ?? ""}`;
    return {
      id: `background-${entry.org}-${entry.role}`.toLowerCase().replace(/\s+/g, "-"),
      text,
      metadata: { source: "experience", title: `${entry.role} at ${entry.org}`, text },
    };
  });
}

export async function buildCorpus(): Promise<Chunk[]> {
  return [...aboutChunks(), ...(await projectChunks()), ...backgroundChunks()];
}
