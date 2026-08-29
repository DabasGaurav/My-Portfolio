import type { Certification } from "@/types/certification";

/**
 * Certifications & badges. Nothing else references these entries
 * directly except the RAG corpus (lib/rag/corpus.ts).
 */
export const certifications: Certification[] = [
  {
    name: "Machine Learning",
    issuer: "Stanford Online (Coursera)",
    year: "2020",
    url: "https://coursera.org/verify/6R83895C6SGM",
  },
  {
    name: "Introduction to Web Development",
    issuer: "UC Davis (Coursera)",
    year: "2019",
    url: "https://coursera.org/verify/T7EKZNLJSN2R",
  },
];
