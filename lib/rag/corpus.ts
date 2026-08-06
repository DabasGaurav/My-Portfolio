import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { chunkMarkdown } from "./chunk";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { siteConfig } from "@/config/site.config";
import type { Chunk } from "@/types/rag";

/**
 * Node-only (uses fs) — import this only from scripts/ingest.ts, never
 * from a route handler or client component.
 */

function stripMdx(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[A-Za-z][\w.-]*[^>]*\/>/g, " ")
    .replace(/<\/?[A-Za-z][\w.-]*[^>]*>/g, " ")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

function aboutChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "content", "about.md");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return chunkMarkdown(content).map((text, i) => ({
    id: `about-${i}`,
    text,
    metadata: { source: "about", title: "About", text },
  }));
}

function projectChunks(): Chunk[] {
  return projects.map((p) => {
    const text = `${p.title}. ${p.summary} Built with: ${p.stack.join(", ")}.`;
    return {
      id: `project-${p.slug}`,
      text,
      metadata: {
        source: "project",
        title: p.title,
        url: p.links.github ?? p.links.demo ?? p.links.video,
        text,
      },
    };
  });
}

function experienceChunks(): Chunk[] {
  return experience.map((e) => {
    const text = `${e.role} at ${e.company} (${e.period}). ${e.summary}`;
    return {
      id: `experience-${e.company}-${e.role}`.toLowerCase().replace(/\s+/g, "-"),
      text,
      metadata: { source: "experience", title: `${e.role} at ${e.company}`, text },
    };
  });
}

function blogChunks(): Chunk[] {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  return files.flatMap((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data, content } = matter(raw);
    const cleaned = stripMdx(content);

    return chunkMarkdown(cleaned).map((text, i) => ({
      id: `blog-${slug}-${i}`,
      text,
      metadata: {
        source: "blog" as const,
        title: data.title as string,
        url: `${siteConfig.url}/blog/${slug}`,
        text,
      },
    }));
  });
}

export function buildCorpus(): Chunk[] {
  return [
    ...aboutChunks(),
    ...projectChunks(),
    ...experienceChunks(),
    ...blogChunks(),
  ];
}
