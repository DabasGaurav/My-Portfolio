import type { Project } from "@/types/project";

/**
 * Project cards for the homepage. Edit or reorder freely — nothing else
 * references these entries directly. Placeholder entries are marked and
 * render a visible label; replace them with real projects and drop the
 * `placeholder` flag as they go live.
 */
export const projects: Project[] = [
  {
    slug: "this-portfolio",
    title: "This portfolio",
    summary:
      "The AI-native product you're looking at right now: components, a live GitHub embed, an MDX blog, a RAG chatbot, and an assisted crossposting agent, built and shipped one milestone at a time.",
    stack: ["Next.js", "TypeScript", "Tailwind", "RAG"],
    links: {
      github: "https://github.com/DabasGaurav/portfolio",
    },
  },
  {
    slug: "placeholder-two",
    title: "Project two",
    summary:
      "Swap this for your next real build — a one- or two-sentence description of what it does and why it matters.",
    stack: ["Add", "your", "stack"],
    links: {},
    placeholder: true,
  },
  {
    slug: "placeholder-three",
    title: "Project three",
    summary:
      "Another slot, ready to go. Add a live demo link, a GitHub link, or a short demo video once it exists.",
    stack: ["Add", "your", "stack"],
    links: {},
    placeholder: true,
  },
];
