import type { TimelineEntry } from "@/types/experience";
import { socialConfig } from "@/config/social.config";

const dotColor: Record<TimelineEntry["type"], string> = {
  work: "bg-accent",
  education: "bg-accent-2",
};

const typeLabel: Record<TimelineEntry["type"], string> = {
  work: "Work",
  education: "Education",
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="flex flex-col gap-8">
      <a
        href={socialConfig.linkedin.url}
        target="_blank"
        rel="noreferrer"
        className="card-pop inline-flex w-fit items-center gap-2 bg-surface-raised px-5 py-2.5 font-sans text-sm font-semibold text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M3.6 5.4h2.3v7H3.6v-7Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM7.4 5.4h2.2v.96h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.76 1.53 2.76 3.53v3.7h-2.3V9.13c0-.86-.02-1.97-1.2-1.97-1.2 0-1.39.94-1.39 1.9v3.34H7.4v-7Z" />
        </svg>
        View full profile on LinkedIn
      </a>

      <ol className="relative flex flex-col gap-8 border-l border-hairline pl-8">
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.role}`} className="relative">
            <span
              className={`absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-surface ${dotColor[entry.type]}`}
              aria-hidden="true"
            />
            <div
              className={
                entry.placeholder
                  ? "card-pop-flat border-dashed p-6 opacity-70"
                  : "card-pop p-6"
              }
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold">{entry.role}</h3>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-surface-sunken px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                    {typeLabel[entry.type]}
                  </span>
                  {entry.placeholder && (
                    <span className="rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                      Placeholder
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-1 font-sans text-sm font-medium text-muted">
                {entry.org} &middot; {entry.period}
              </p>
              {entry.summary && <p className="mt-3 text-muted">{entry.summary}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
