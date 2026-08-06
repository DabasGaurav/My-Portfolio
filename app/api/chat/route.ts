import {
  streamText,
  convertToModelMessages,
  isTextUIPart,
  type UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";
import { embedQuery } from "@/lib/rag/embeddings";
import { queryTopK } from "@/lib/rag/vectorstore";
import { SYSTEM_PROMPT, buildContextBlock } from "@/lib/rag/prompt";

export const maxDuration = 30;

function latestUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return "";
  return last.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join(" ");
}

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY || !process.env.PINECONE_API_KEY) {
    return new Response(
      "The chatbot isn't configured yet — add GEMINI_API_KEY and PINECONE_API_KEY (see .env.local.example), then run `npm run ingest`.",
      { status: 503 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const question = latestUserText(messages);

  let context = "No relevant context was found for this question.";
  try {
    const queryEmbedding = await embedQuery(question);
    const matches = await queryTopK(queryEmbedding, 5);
    context = buildContextBlock(matches);
  } catch (err) {
    console.error("RAG retrieval failed:", err);
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `${SYSTEM_PROMPT}\n\nContext:\n${context}`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
