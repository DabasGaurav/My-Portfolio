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
                ? "card-pop-flat border-dashed p-6 opacity-70"
                : "card-pop p-6"
            }
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl italic">{entry.role}</h3>
              {entry.placeholder && (
                <span className="shrink-0 rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                  Placeholder
                </span>
              )}
            </div>
            <p className="mt-1 font-sans text-sm font-medium text-muted">
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
        className="self-start font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-70"
      >
        View full profile on LinkedIn &rarr;
      </a>
    </div>
  );
}
