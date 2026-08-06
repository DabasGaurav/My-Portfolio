"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { isTextUIPart } from "ai";
import { OPEN_CHAT_EVENT } from "@/lib/chat-events";

function linkifyParts(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: Array<{ text: string } | { label: string; url: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }
    parts.push({ label: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

function MessageBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "self-end max-w-[85%]" : "self-start max-w-[85%]"}>
      <p
        className={`whitespace-pre-wrap px-3 py-2 text-sm ${
          isUser
            ? "bg-ink text-surface"
            : "border border-hairline bg-surface text-ink"
        }`}
      >
        {linkifyParts(text).map((part, i) =>
          "text" in part ? (
            <span key={i}>{part.text}</span>
          ) : (
            <a
              key={i}
              href={part.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline underline-offset-2"
            >
              {part.label}
            </a>
          ),
        )}
      </p>
    </div>
  );
}

export function ChatDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  const isBusy = status === "submitted" || status === "streaming";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col border border-hairline bg-surface shadow-lg">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Ask about me
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="font-mono text-muted transition-colors hover:text-ink"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <p className="text-sm text-muted">
                Ask a question about my projects, experience, or writing.
              </p>
            )}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role === "user" ? "user" : "assistant"}
                text={message.parts
                  .filter(isTextUIPart)
                  .map((part) => part.text)
                  .join("")}
              />
            ))}
            {isBusy && <p className="text-sm text-muted">Thinking&hellip;</p>}
            {error && (
              <p className="text-sm text-accent">
                {error.message || "Something went wrong — try again shortly."}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-hairline p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 border border-hairline bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={isBusy}
              className="bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-hairline bg-surface px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink shadow-sm transition-colors hover:border-accent"
      >
        {open ? "Close" : "Ask about me"}
      </button>
    </div>
  );
}
