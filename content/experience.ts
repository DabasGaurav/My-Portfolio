import type { TimelineEntry } from "@/types/experience";

/**
 * Work + education timeline, rendered on the homepage. Ordered newest
 * first. Placeholder entries are marked — replace with real roles/degrees
 * pulled from LinkedIn and drop the `placeholder` flag as they go real.
 * Nothing else references these entries directly except the RAG corpus
 * (lib/rag/corpus.ts), which embeds them for the chatbot.
 */
export const timeline: TimelineEntry[] = [
  {
    type: "work",
    role: "Technical Product Manager",
    org: "Your Company",
    period: "2024 — Present",
    summary:
      "Replace with a one- or two-sentence summary of scope and impact in this role.",
    placeholder: true,
  },
  {
    type: "work",
    role: "Previous Role",
    org: "Previous Company",
    period: "2022 — 2024",
    summary: "Replace with a one- or two-sentence summary of this role.",
    placeholder: true,
  },
  {
    type: "education",
    role: "Degree",
    org: "University",
    period: "20XX — 20XX",
    summary: "Replace with your real degree and university from LinkedIn.",
    placeholder: true,
  },
];
