import { createGoogleGenerativeAI } from "@ai-sdk/google";

/**
 * The @ai-sdk/google package's default `google` export only reads
 * GOOGLE_GENERATIVE_AI_API_KEY from the environment. This project
 * standardized on GEMINI_API_KEY (matches the name on the AI Studio key
 * page) everywhere else — .env.local.example, README, the /api/chat and
 * ingest env checks — so wire the key through explicitly instead of
 * renaming the var everywhere else.
 */
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});
