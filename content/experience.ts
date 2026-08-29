import type { TimelineEntry } from "@/types/experience";

/**
 * Work + education timeline, rendered on the homepage. Ordered newest
 * first. Nothing else references these entries directly except the RAG
 * corpus (lib/rag/corpus.ts), which embeds them for the chatbot.
 *
 * Sourced from LinkedIn (dabasgaurav) — last synced Aug 2026.
 */
export const timeline: TimelineEntry[] = [
  {
    type: "education",
    role: "PGP (Post Graduate Programme in Management)",
    org: "Indian School of Business",
    period: "Apr 2026 — Present",
    summary: "Sports Club President.",
  },
  {
    type: "work",
    role: "Product Manager",
    org: "ION",
    period: "Apr 2025 — Mar 2026",
    summary:
      "Owned the product strategy and roadmap for an exchange fee & tax computation engine processing high-frequency trading data, aligning multiple cross-functional teams to deliver at pace.",
  },
  {
    type: "work",
    role: "Software Engineer",
    org: "ION",
    period: "Jun 2021 — Apr 2025",
    summary:
      "Built and led the migration of FeesModule, a fintech back-office platform calculating fees, brokerage, tax, and commission for 1M+ trades in real time across 90+ worldwide exchanges. Migrated the platform core from a monolithic EJB/JMS/JSF stack to Spring Boot microservices + Angular, cutting processing time 6x. Served as SME for exchange fee and GST/VAT computation, and built an automated testing framework that raised code coverage from 55% to 90%.",
  },
  {
    type: "work",
    role: "Software Engineer Intern",
    org: "Reliance Industries Limited",
    period: "Jul 2020 — Aug 2020",
    summary:
      "Built an intelligent document search solution for RIL's Oil & Gas knowledge base, applying NLP and semantic search to surface relevant information across large volumes of technical documents — an early precursor to today's RAG-driven enterprise knowledge systems.",
  },
  {
    type: "work",
    role: "Research Intern",
    org: "Delhi Technological University (formerly DCE)",
    period: "May 2020 — Jun 2020",
    summary:
      "Built a sentiment-enhanced movie recommendation system that combined user reviews and viewing history to personalize recommendations across story, acting, visuals, and overall experience.",
  },
  {
    type: "education",
    role: "Bachelor of Technology, Computer Science",
    org: "Delhi College of Engineering (now Delhi Technological University)",
    period: "2017 — 2021",
    summary: "",
  },
];
