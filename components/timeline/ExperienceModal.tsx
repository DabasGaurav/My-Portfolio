"use client";

import { useEffect, useRef } from "react";
import { haptic } from "@/lib/haptics";
import type { TimelineEntry } from "@/types/experience";

export function ExperienceModal({
  entry,
  onClose,
}: {
  entry: TimelineEntry;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="animate-modal-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          haptic("tap");
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${entry.role} at ${entry.org} — full LinkedIn entry`}
        className="animate-modal-pop card-pop max-h-[85vh] w-full max-w-lg overflow-y-auto bg-surface-raised p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold">{entry.role}</h3>
            <p className="mt-0.5 font-sans text-sm font-medium text-muted">
              {entry.org} &middot; {entry.period}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              haptic("tap");
              onClose();
            }}
            aria-label="Close"
            className="card-pop-flat shrink-0 rounded-full p-2 text-muted transition-transform hover:text-ink active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="m3 3 10 10M13 3 3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-wide text-muted">
          Exactly as written on LinkedIn
        </p>
        <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-surface-sunken p-4 font-sans text-sm leading-relaxed text-ink">
          {entry.raw}
        </pre>
      </div>
    </div>
  );
}
