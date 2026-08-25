import type { ExperienceEntry } from "@/types/experience";
import { socialConfig } from "@/config/social.config";

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceEntry[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {experience.map((entry) => (
          <li
            key={`${entry.company}-${entry.role}`}
            className={
              entry.placeholder
                ? "border border-dashed border-hairline p-6"
                : "border border-ink/15 p-6"
            }
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl">{entry.role}</h3>
              {entry.placeholder && (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  Placeholder
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted">
              {entry.company} &middot; {entry.period}
            </p>
            <p className="mt-3 text-muted">{entry.summary}</p>
          </li>
        ))}
      </ul>

      <a
        href={socialConfig.linkedin.url}
        target="_blank"
        rel="noreferrer"
        className="self-start font-mono text-xs uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-80"
      >
        View full profile on LinkedIn &rarr;
      </a>
    </div>
  );
}
