"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { isTextUIPart } from "ai";
import { OPEN_CHAT_EVENT } from "@/lib/chat-events";
import { haptic } from "@/lib/haptics";

const starters = [
  "Which project should I explore first?",
  "What product decisions did you make?",
  "How did you move into PM?",
];

function linkifyParts(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: Array<{ text: string } | { label: string; url: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index) });
    parts.push({ label: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

function MessageBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  return (
    <div className={`chat-message ${role === "user" ? "is-user" : "is-assistant"}`}>
      {linkifyParts(text).map((part, index) =>
        "text" in part ? <span key={index}>{part.text}</span> :
        <a key={index} href={part.url} target="_blank" rel="noreferrer">{part.label}</a>,
      )}
    </div>
  );
}

export function ChatDock() {
  const [open, setOpen] = useState(true);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => { setManuallyOpened(true); setOpen(true); };
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  useEffect(() => {
    if (manuallyOpened || messages.length > 0) return;
    const onScroll = () => {
      if (window.innerWidth <= 720 && window.scrollY > 180) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [manuallyOpened, messages.length]);

  useEffect(() => {
    if (messages.length > 0) endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, status]);

  const isBusy = status === "submitted" || status === "streaming";

  function ask(text: string) {
    if (isBusy) return;
    haptic("tap");
    sendMessage({ text });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    ask(text);
    setInput("");
  }

  return (
    <div className="chat-dock">
      {open ? (
        <section className={`chat-panel ${messages.length > 0 ? "has-messages" : ""}`} aria-label="Ask Gaurav chat">
          <div className="chat-header">
            <div><strong>Ask Gaurav</strong><span className="chat-live">LIVE</span></div>
            <button type="button" onClick={() => { haptic("tap"); setOpen(false); }} aria-label="Close chat">×</button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>Curious about a project or my background? Ask here.</p>
                <div className="chat-starters">
                  {starters.map((starter) => <button key={starter} type="button" onClick={() => ask(starter)} disabled={isBusy}>{starter}</button>)}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role === "user" ? "user" : "assistant"}
                text={message.parts.filter(isTextUIPart).map((part) => part.text).join("")}
              />
            ))}
            {isBusy && <p className="chat-thinking">Thinking…</p>}
            {error && <p className="chat-error" role="alert">{error.message || "Something went wrong. Please try again."}</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question…" aria-label="Your question" />
            <button type="submit" disabled={!input.trim() || isBusy} aria-label="Send question">↗</button>
          </form>
        </section>
      ) : (
        <button type="button" className="chat-launcher" onClick={() => { haptic("toggle"); setManuallyOpened(true); setOpen(true); }} aria-label="Open Ask Gaurav chat">Ask Gaurav <span aria-hidden="true">↗</span></button>
      )}
    </div>
  );
}
