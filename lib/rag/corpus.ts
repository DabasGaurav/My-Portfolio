import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { chunkMarkdown } from "./chunk";
import { getPinnedRepos, getRepoReadme } from "@/lib/github";
import { timeline } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { testimonials } from "@/content/testimonials";
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

/**
 * Sourced live from your pinned GitHub repos — same data "Currently
 * Cooking" shows — instead of a separately maintained project list, so
 * the chatbot can never describe a project differently than the site
 * does. Each chunk links to the project's own detail page, not straight
 * to GitHub, so the chatbot's citations match what a visitor can click.
 */
async function projectChunks(): Promise<Chunk[]> {
  const repos = await getPinnedRepos();
  const chunks: Chunk[] = [];

  for (const repo of repos) {
    const summary = [
      `${repo.name}.`,
      repo.description || "No description set on GitHub yet.",
      repo.language ? `Written primarily in ${repo.language}.` : "",
      repo.topics.length ? `Topics: ${repo.topics.join(", ")}.` : "",
    ]
      .filter(Boolean)
      .join(" ");

    chunks.push({
      id: `project-${repo.id}`,
      text: summary,
      metadata: {
        source: "project",
        title: repo.name,
        url: `${siteConfig.url}/projects/${repo.name}`,
        text: summary,
      },
    });

    // README gives the chatbot real depth on how/why each project was
    // built, not just the one-line GitHub description.
    const readme = await getRepoReadme(repo.name);
    if (readme) {
      chunkMarkdown(readme).forEach((text, i) => {
        chunks.push({
          id: `project-${repo.id}-readme-${i}`,
          text: `${repo.name} — from its README: ${text}`,
          metadata: {
            source: "project",
            title: `${repo.name} (README)`,
            url: `${siteConfig.url}/projects/${repo.name}`,
            text,
          },
        });
      });
    }
  }

  return chunks;
}

function timelineChunks(): Chunk[] {
  return timeline.map((e) => {
    const base =
      e.type === "education"
        ? `Education: ${e.role} at ${e.org} (${e.period}). ${e.summary}`
        : `${e.role} at ${e.org} (${e.period}). ${e.summary}`;
    // Include the verbatim LinkedIn text too, when there is one, so the
    // chatbot can answer with the exact bullet-level detail, not just
    // the curated one-line summary shown on the timeline card.
    const text = e.raw ? `${base}\n\nFull LinkedIn entry:\n${e.raw}` : base;
    return {
      id: `timeline-${e.org}-${e.role}`.toLowerCase().replace(/\s+/g, "-"),
      text,
      metadata: { source: "experience", title: `${e.role} at ${e.org}`, text },
    };
  });
}

function certificationChunks(): Chunk[] {
  return certifications
    .filter((c) => !c.placeholder)
    .map((c) => {
      const text = `Certification: ${c.name}, issued by ${c.issuer} (${c.year}).`;
      return {
        id: `certification-${c.name}`.toLowerCase().replace(/\s+/g, "-"),
        text,
        metadata: { source: "certification", title: c.name, text },
      };
    });
}

function testimonialChunks(): Chunk[] {
  return testimonials
    .filter((t) => !t.placeholder)
    .map((t) => {
      const text = `Testimonial from ${t.name}${t.role ? ` (${t.role})` : ""}: "${t.quote}"`;
      return {
        id: `testimonial-${t.name}`.toLowerCase().replace(/\s+/g, "-"),
        text,
        metadata: { source: "testimonial", title: `Testimonial from ${t.name}`, text },
      };
    });
}

/**
 * Optional plain-text resume content (content/resume.md), if you've
 * added one — separate from the downloadable PDF at public/resume.pdf,
 * since embedding a PDF directly would need an extraction step this
 * project doesn't have yet. Returns no chunks if the file doesn't exist.
 */
function resumeChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "content", "resume.md");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return chunkMarkdown(content).map((text, i) => ({
    id: `resume-${i}`,
    text,
    metadata: { source: "resume", title: "Resume", text },
  }));
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

export async function buildCorpus(): Promise<Chunk[]> {
  return [
    ...aboutChunks(),
    ...(await projectChunks()),
    ...timelineChunks(),
    ...certificationChunks(),
    ...testimonialChunks(),
    ...resumeChunks(),
    ...blogChunks(),
  ];
}
