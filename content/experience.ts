import type { ExperienceEntry } from "@/types/experience";

/**
 * Work experience, rendered LinkedIn-style on the homepage. Edit freely —
 * nothing else references these entries directly. Placeholder entries are
 * marked; replace with real roles and drop the `placeholder` flag.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "Technical Product Manager",
    company: "Your Company",
    period: "2024 — Present",
    summary:
      "Replace with a one- or two-sentence summary of scope and impact in this role.",
    placeholder: true,
  },
  {
    role: "Previous Role",
    company: "Previous Company",
    period: "2022 — 2024",
    summary: "Replace with a one- or two-sentence summary of this role.",
    placeholder: true,
  },
];
