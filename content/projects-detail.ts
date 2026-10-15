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
    status: "Built end to end, pre-beta",
    hook: "One Reel to make next, and the evidence for it.",
    summary: "It reads a creator's own Reels and what their niche is searching for, picks one idea, writes the script, and shows the working behind the pick. Then it checks the next Reel to see whether the idea was used and how it did.",
    role: "Solo project: the spec, the product decisions and the build.",
    stats: [
      { value: "1", label: "recommendation per request, not a list of ideas" },
      { value: "1 of 7", label: "pipeline steps is an AI agent; the rest are fixed" },
      { value: "5", label: "simpler baselines logged next to every pick" },
      { value: "178", label: "automated tests; the core runs against a real Instagram account" },
    ],
    problem: "A creator who posts a few Reels a week faces the same question every time: what should the next one be? Instagram's Insights answers a different question, how the last one did. Getting from that to a decision means reading your own numbers, checking what your niche is searching for on YouTube, Reddit and Google, and then guessing. Generic AI idea tools skip the first half. They don't know what has worked for you, so their ideas fit anyone, which means they fit no one in particular.",
    approach: [
      "Learn the creator. Pull their Reels and insights through Instagram's API, embed every caption, and build a \"Creator DNA\": winning and weak topics, hooks that work, strong formats, and topics they've used too often lately.",
      "Research the niche. An agent decides which source to check next (YouTube, Reddit or Google Trends), writes the query, and stops as soon as the evidence is enough. A hard cap of five rounds is enforced in code.",
      "Generate options. One model call turns the DNA and the evidence into 20 to 50 concrete ideas, each a topic plus an angle plus a format, never a bare topic.",
      "Score them in plain code. Five factors (fit with the creator, audience demand, trend momentum, novelty, expected engagement) add up to a composite score. No model is involved in the ranking.",
      "Pick one, then explain it. Code makes the final pick: the top idea 85% of the time, a strong runner-up 15% of the time. Only then does a model write why this, why now and why you, plus the hook, script, storyboard, caption and call to action.",
      "Close the loop. After the creator posts, the system finds their next Reel, scores how closely it matches the idea, records actual against predicted engagement, and refreshes their DNA.",
    ],
    productChoices: [
      "One recommendation with an evidence receipt, instead of another analytics dashboard or a long list of ideas.",
      "The model writes ideas and explanations; plain code ranks them and makes the final pick, so the pick is testable and stable.",
      "Only one step is an agent: market research, where the next move really does depend on what was just found.",
      "A 15% exploration rate with a quality floor, so the system learns beyond what it already believes without wasting a creator's post.",
      "Honest defaults: equal factor weights and a neutral engagement prior until real outcomes exist, rather than invented benchmarks.",
    ],
    decisions: [
      {
        title: "One pick, not a dashboard",
        chose: "A single recommendation with a receipt showing how each factor scored.",
        rejected: "A ranked list of ten ideas, or a richer analytics view.",
        why: "Creators already have Insights. The hard part is the decision, and a list hands the decision back to them. One pick also makes the product measurable: either they posted it or they didn't.",
      },
      {
        title: "The model writes, code decides",
        chose: "Models generate ideas and write explanations. Plain Python ranks and picks.",
        rejected: "Letting the language model read the top candidates and choose the winner.",
        why: "A model-made pick can't be unit-tested and can quietly override the exploration split, making it meaningless. It also turned out the current Sonnet model doesn't accept a temperature setting, so the \"same input, same pick\" guarantee had to come from code. Now it holds by construction.",
      },
      {
        title: "An agent only where the path is uncertain",
        chose: "One agentic step, market research, inside an otherwise fixed pipeline.",
        rejected: "Calling it \"multi-agent\", or a fixed sequence that always queries every source.",
        why: "Research is the only step where the right next action depends on what was just found. Everywhere else a fixed step is cheaper, faster and easier to debug. The five-round cap lives in a code loop, not in the prompt, so the agent can't run away with cost.",
      },
      {
        title: "A score you can take apart",
        chose: "A weighted sum of five factors, each between 0 and 1, called a \"composite score\".",
        rejected: "Multiplying factors together, a single learned score, or calling it a \"confidence\" score.",
        why: "A sum shows each factor's contribution on the receipt, and one weak factor doesn't zero out the rest. \"Confidence\" would imply a calibration that doesn't exist yet.",
      },
      {
        title: "Explore, but safely",
        chose: "Epsilon-greedy selection: 85% top pick, 15% a runner-up from the top 40% of the rest.",
        rejected: "Always recommending the top-scored idea.",
        why: "Always taking the top pick means the system only ever learns about ideas it already likes. But a creator gets one post per cycle, so exploring has to stay within ideas that are still good.",
      },
      {
        title: "No invented data",
        chose: "Equal weights and a flat expected-engagement prior until real outcomes exist.",
        rejected: "Training the engagement model on synthetic \"benchmark\" data so the factor looks smart on day one.",
        why: "Synthetic training data would misrepresent the model to the creator reading the receipt. A small per-creator LightGBM model is built to take over once a creator has at least ten real outcomes to train on.",
      },
    ],
    evaluation: {
      intro: "The goal is to prove the full pipeline beats simpler ways of choosing an idea, not just that it produces something plausible. So every run logs what five simpler rules would have picked from the same candidates, and the outcome loop records what actually happened.",
      points: [
        "Baselines logged with every pick: trending only, audience demand only, random, the creator's all-time best topic, and their most recent hit. An \"ask the model for an idea, no ranking\" baseline is written and tested but not yet wired into the pipeline.",
        "Did they use it? Topic match compares the recommendation with the creator's next Reel using embeddings, so no one has to paste links or tag posts.",
        "Did it work? Actual engagement (likes, comments, shares and saves over reach) is recorded next to the prediction made at the time.",
        "Every pick is tagged explore or exploit, so the two can be compared once outcomes come in.",
      ],
    },
    lessons: [
      {
        assumed: "Instagram data needs Facebook Login and a linked Facebook Page.",
        found: "Meta's newer Instagram Login API works without a Page, on different hosts and OAuth endpoints.",
        changed: "Rebuilt the connection on it. Onboarding lost a requirement that would have blocked many creators.",
      },
      {
        assumed: "Reel length would be a feature.",
        found: "The API has no duration field at all, on any version.",
        changed: "Length-based features now degrade to \"unknown\" instead of failing.",
      },
      {
        assumed: "Scoring each idea separately was fine.",
        found: "Each idea was being embedded three times, which broke the embedding API's free-tier limit of 3 requests a minute on a real batch.",
        changed: "Embed every candidate once per run in a batch and pass the vectors around.",
      },
      {
        assumed: "A failing research source would just be skipped.",
        found: "A misconfigured Reddit app returned an error that crashed the whole recommendation run.",
        changed: "Every source is now optional. A failure means \"try another source\", and results are cached for 12 hours.",
      },
    ],
    gaps: [
      "It has run on one real account with nine Reels, below the 15-Reel threshold it uses to mark a profile as early. Nothing yet says the recommendations are good.",
      "Research happens once per run for the whole niche, so audience demand and trend momentum come out the same for every candidate. Right now ranking really separates ideas on creator fit and novelty only.",
      "Expected engagement is a flat 0.5 for now, so it doesn't change the ranking yet. The model and its training function exist, but nothing calls them in a live run.",
      "The schema has a table for freezing each pick's features at the moment it was made, so later training can't use information that didn't exist yet. Nothing writes to it yet, and it has to before any model is trained.",
      "The outcome loop assumes the creator's next Reel is the one the recommendation was for. The topic-match score shows when that's wrong, but it doesn't fix it.",
      "Factor weights are equal on purpose. Equal is the honest \"we don't know yet\". Learning them needs outcome data.",
    ],
    next: "Put it in front of a small group of creators (the setup is sized for 15 to 30) and answer two questions in order: do they actually post what it recommends, and when they do, does it beat both their usual Reel and the simpler baselines?",
    nextSteps: [
      "Adoption first: the share of recommendations whose topic match shows the creator really used the idea. If they don't post it, engagement doesn't matter.",
      "Then lift: engagement on adopted picks against the creator's own recent median, and against what each baseline would have picked.",
      "Guardrails: cost and time per recommendation, and how often research hits its cap without enough evidence.",
      "Fix the biggest modelling gap: give each candidate its own demand and momentum signal instead of one number for the whole niche.",
    ],
    preview: {
      observe: "Insights show creators how the last Reel did. Nothing tells them what to post next.",
      decide: "The model writes ideas. Plain code ranks them, picks one, and shows its working.",
      test: "Whether creators post the pick, and whether it beats their usual Reel and simpler baselines.",
    },
    accent: "blue",
  },
];

export function getProjectDetail(repo: string): ProjectDetail | undefined {
  return projectDetails.find((project) => project.repo.toLowerCase() === repo.toLowerCase());
}
