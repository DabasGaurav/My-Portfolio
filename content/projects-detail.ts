import type { ProjectDetail } from "@/types/project-detail";

/** Curated stories. Code remains the source of truth for implementation details. */
export const projectDetails: ProjectDetail[] = [
  {
    repo: "vcg-proposal-copilot",
    name: "Proposal Copilot",
    kind: "AI workflow · B2B",
    status: "Working demo",
    hook: "From a long RFP to a proposal someone can actually review.",
    summary: "A source-grounded proposal workflow that keeps a human in control of the final answer.",
    problem: "Responding to an RFP means finding relevant material, drafting a coherent answer, and checking that every claim is supported. The repetitive work is expensive, but an unverified AI draft is risky.",
    approach: [
      "Break the RFP into requirements and retrieve relevant source material.",
      "Generate draft responses with citations back to the supplied corpus.",
      "Run deterministic checks and keep an explicit human review gate before export.",
    ],
    productChoices: [
      "Made evidence visible alongside the draft so a reviewer can verify it quickly.",
      "Separated automated checks from judgment calls instead of treating model output as final.",
      "Built a deterministic hosted demo around synthetic material so the workflow is easy to explore.",
    ],
    next: "The next useful test is with real proposal writers: where do they trust the draft, and where do they still return to the source documents?",
    preview: { observe: "RFPs demand speed without unsupported claims.", decide: "Put source evidence beside every answer.", test: "See what proposal writers trust or override." },
    accent: "teal",
    demoUrl: "https://rfp-proposal.streamlit.app/",
  },
  {
    repo: "show-up",
    name: "Show Up",
    kind: "Marketplace · Community",
    status: "Prototype",
    hook: "Volunteering should be easier to commit to, and easier to plan around.",
    summary: "A volunteering product that connects short local opportunities with people ready to take part.",
    problem: "Volunteers need a simple way to find a relevant opportunity. Organizers need a more reliable sense of who is coming, especially when a missed spot means less help on the day.",
    approach: [
      "Let organizations post short activities with clear capacity and timing.",
      "Give volunteers a simple path to reserve a place.",
      "Ask for confirmation close to the event, then release unconfirmed places.",
    ],
    productChoices: [
      "Focused the flow on a specific commitment rather than an endless opportunity feed.",
      "Used a confirmation step to address no-shows as a product problem.",
      "Designed for both sides of the marketplace: volunteer discovery and organizer planning.",
    ],
    next: "Validate the confirmation timing with organizers and volunteers, then measure whether it improves attendance.",
    preview: { observe: "Organizers cannot plan around uncertain attendance.", decide: "Ask volunteers to reconfirm before the event.", test: "Measure attendance and refilled places." },
    accent: "clay",
  },
  {
    repo: "creatorsignal.ai",
    name: "CreatorSignal.ai",
    kind: "Creator tools · AI",
    status: "In development",
    hook: "A clearer signal for what to create next.",
    summary: "A product exploring how creators can turn Instagram Reels data into actionable content decisions.",
    problem: "Creators have plenty of performance data, but turning it into a useful next move still takes manual interpretation and guesswork.",
    approach: [
      "Build a reliable data foundation for a creator's Reels and performance signals.",
      "Turn those signals into recommendations a creator can inspect and act on.",
      "Shape the experience around content decisions, not another analytics dashboard.",
    ],
    productChoices: [
      "Started with trustworthy data and transparent recommendations before broad automation.",
      "Kept the core question practical: what should I try next, and why?",
      "Built the product and technical foundation together so the recommendation flow can evolve.",
    ],
    next: "Keep testing whether recommendations are specific enough to change what creators actually publish.",
    preview: { observe: "Data rarely suggests a clear next content move.", decide: "Show one recommendation with its evidence.", test: "See whether creators publish differently." },
    accent: "blue",
  },
];

export function getProjectDetail(repo: string): ProjectDetail | undefined {
  return projectDetails.find((project) => project.repo.toLowerCase() === repo.toLowerCase());
}
