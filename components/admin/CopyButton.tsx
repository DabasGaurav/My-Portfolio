"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="card-pop bg-surface px-4 py-2 font-sans text-sm font-semibold text-ink"
    >
      {copied ? "Copied" : "Copy teaser + link"}
    </button>
  );
}
