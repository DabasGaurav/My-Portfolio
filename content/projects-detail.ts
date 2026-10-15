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
    kind: "Two-sided marketplace · Social impact",
    status: "Live MVP",
    hook: "Make backing out easy, and volunteers start turning up.",
    summary: "A live volunteering app built from 30 interviews: NGOs share one link, volunteers save a spot in a minute, and a two-day check-in tells both sides who is really coming.",
    problem: "Every NGO we interviewed loses volunteers who sign up and don't come, with no warning. Volunteers drop out because plans change and there is no guilt-free way to say so, so NGOs over-recruit and chase people the night before.",
    approach: [
      "NGOs post a short activity in under five minutes and share one link in their own WhatsApp groups.",
      "Volunteers save a spot in one tap, get a \"Still on?\" check-in two days before, and can free the spot in one tap.",
      "The NGO sees who's coming before the day, marks who came after it, and every volunteer builds a visible track record.",
    ],
    productChoices: [
      "Made the early exit easy instead of punishing no-shows: freeing a spot a day ahead costs nothing.",
      "Cut the first spec by two thirds: no ratings, ID checks or standby lists in the first version.",
      "Measured one number: the share of spots where the person came or freed it early, target 80% against a ~60% baseline.",
    ],
    next: "Run the pilot with partner NGOs (three events, about 40 spots) and test whether a two-day check-in is early enough to refill freed spots.",
    preview: {
      observe: "10 of 10 NGOs lose volunteers who sign up and don't come, with no warning.",
      decide: "Make \"I can't make it\" one tap and penalty-free a day ahead, so spots come back in time.",
      test: "Whether 80% of spots end with the person coming or freeing it early, against ~60% today.",
    },
    accent: "clay",
    demoUrl: "https://showup-mvp-rosy.vercel.app",
    demoLabel: "Open the live app",
    sections: [
      { id: "problem", label: "Problem" },
      { id: "research", label: "Research" },
      { id: "bet", label: "The bet" },
      { id: "decisions", label: "Decisions" },
      { id: "ngos", label: "NGO side" },
      { id: "build", label: "Build" },
      { id: "metric", label: "Metric" },
      { id: "next", label: "Next" },
      { id: "learnings", label: "Learnings" },
    ],
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
