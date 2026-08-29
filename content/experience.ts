import type { TimelineEntry } from "@/types/experience";

/**
 * Work + education timeline, rendered on the homepage. Ordered newest
 * first. Nothing else references these entries directly except the RAG
 * corpus (lib/rag/corpus.ts), which embeds them for the chatbot.
 *
 * Sourced from LinkedIn (dabasgaurav) — last synced Aug 2026. Work
 * entries carry `raw`, the exact text from the LinkedIn PDF export,
 * shown verbatim in the entry's detail modal (Timeline.tsx) — copy
 * changes to `summary` (the curated one-liner shown on the card) but
 * never edit `raw`.
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
    raw: `Product Manager
Apr 2025 - Mar 2026 · 1 yr

• Owned the product strategy and roadmap for an exchange fee & tax computation engine
processing high-frequency trading data, aligning multiple cross-functional teams to deliver at…

Product Management, Agile Methodologies and +3 skills`,
  },
  {
    type: "work",
    role: "Software Engineer",
    org: "ION",
    period: "Jun 2021 — Apr 2025",
    summary:
      "Built and led the migration of FeesModule, a fintech back-office platform calculating fees, brokerage, tax, and commission for 1M+ trades in real time across 90+ worldwide exchanges. Migrated the platform core from a monolithic EJB/JMS/JSF stack to Spring Boot microservices + Angular, cutting processing time 6x. Served as SME for exchange fee and GST/VAT computation, and built an automated testing framework that raised code coverage from 55% to 90%.",
    raw: `Software Engineer
Jun 2021 - Apr 2025 · 3 yrs 11 mos
India

• Worked with and mentored a team of engineers while building a back-office fintech solution -
FeesModule, a configurable application to calculate fees, brokerage, tax, and commission for
1M+ trades in real-time across 90+ worldwide exchanges through custom high-throughput
messaging systems.
• Led the migration of the platform core from a monolithic EJB/JMS/JSF architecture to a
Spring Boot, microservices, and Angular-based API-first stack, reducing processing time 6x
and improving platform capability to support large client workloads.
• Served as the subject matter expert (SME) for exchange fee calculation and GST/VAT
computation workflows, designing calculation engines, exchange-specific rule configurations,
and processing algos.
• Built automated testing framework using Selenium, Robot Framework, upstream/downstream
system mocking, and CI/CD integration, increasing code coverage from 55% to 90% and
reducing production incidents from daily to rare.

Microservices, Distributed Systems and +5 skills`,
  },
  {
    type: "work",
    role: "Software Engineer Intern",
    org: "Reliance Industries Limited",
    period: "Jul 2020 — Aug 2020",
    summary:
      "Built an intelligent document search solution for RIL's Oil & Gas knowledge base, applying NLP and semantic search to surface relevant information across large volumes of technical documents — an early precursor to today's RAG-driven enterprise knowledge systems.",
    raw: `Software Engineer Intern
Reliance Industries Limited · Internship
Jul 2020 - Aug 2020 · 2 mos
Mumbai, Maharashtra, India

Built an intelligent document search solution for RIL's Oil & Gas knowledge base, applying NLP
and semantic search to surface relevant information across large volumes of technical
documents, laying the foundation for what today would be an RAG-driven enterprise
knowledge system.

Python (Programming Language), Natural Language Processing (NLP) and +2 skills`,
  },
  {
    type: "education",
    role: "Bachelor of Technology, Computer Science",
    org: "Delhi College of Engineering (now Delhi Technological University)",
    period: "2017 — 2021",
    summary:
      "Research Intern (May–Jun 2020): built a sentiment-enhanced movie recommendation system that combined user reviews and viewing history to personalize recommendations across story, acting, visuals, and overall experience.",
  },
];
