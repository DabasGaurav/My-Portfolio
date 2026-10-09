import {
  streamText,
  convertToModelMessages,
  isTextUIPart,
  type UIMessage,
} from "ai";
import { google } from "@/lib/rag/google-provider";
import { SYSTEM_PROMPT, buildCurrentPortfolioContext } from "@/lib/rag/prompt";

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
  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      "The portfolio guide is temporarily unavailable.",
      { status: 503 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const question = latestUserText(messages);
  if (!question) return new Response("Please ask a question.", { status: 400 });

  const result = streamText({
    model: google("gemini-3.6-flash"),
    system: `${SYSTEM_PROMPT}\n\nContext:\n${buildCurrentPortfolioContext()}`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
