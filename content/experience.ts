import type { TimelineEntry } from "@/types/experience";

/**
 * Work + education timeline, rendered on the homepage. Ordered newest
 * first. Nothing else references these entries directly except the RAG
 * corpus (lib/rag/corpus.ts), which embeds them for the chatbot.
 *
 * ISB program name is a placeholder ("Postgraduate Programme in
 * Management") — confirm the exact title and update `role` below.
 */
export const timeline: TimelineEntry[] = [
  {
    type: "education",
    role: "Postgraduate Programme in Management",
    org: "Indian School of Business",
    period: "Apr 2026 — Present",
    summary: "Sports Club President.",
  },
  {
    type: "education",
    role: "Bachelor of Technology, Computer Science",
    org: "Delhi College of Engineering (now Delhi Technological University)",
    period: "2017 — 2021",
    summary: "",
  },
  {
    type: "work",
    role: "Research Intern",
    org: "Delhi Technological University (formerly DCE)",
    period: "May 2020 — Jun 2020",
    summary:
      "Built a sentiment-enhanced movie recommendation system that combined user reviews and viewing history to personalize recommendations across story, acting, visuals, and overall experience.",
  },
];
