/**
 * Site-wide floating chat entry point. Disabled stub until Milestone 6
 * wires up retrieval + generation — kept here (not as a homepage section)
 * because the chatbot is meant to be available from anywhere on the site.
 */
export function ChatDock() {
  return (
    <div id="chat" className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        disabled
        title="Coming in Milestone 6"
        className="rounded-full border border-hairline bg-surface px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted shadow-sm disabled:cursor-not-allowed"
      >
        Ask about me — soon
      </button>
    </div>
  );
}
