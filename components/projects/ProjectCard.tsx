import type { Project } from "@/types/project";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const linkLabels = {
  demo: "Live demo",
  github: "GitHub",
  video: "Demo video",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const linkEntries = (
    Object.entries(project.links) as [keyof Project["links"], string][]
  ).filter(([, href]) => Boolean(href));

  return (
    <article
      className={
        project.placeholder
          ? "card-pop-flat border-dashed p-6 opacity-70"
          : "card-pop p-6"
      }
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl italic">{project.title}</h3>
        {project.placeholder && (
          <span className="shrink-0 rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
            Placeholder
          </span>
        )}
      </div>

      <p className="mt-3 text-muted">{project.summary}</p>

      {project.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border-2 border-hairline px-3 py-1 font-sans text-xs font-medium text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {linkEntries.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
          {linkEntries.map(([key, href]) => (
            <TrackedLink
              key={key}
              event="project_link_click"
              properties={{ project: project.slug, linkType: key }}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-70"
            >
              {linkLabels[key]} &rarr;
            </TrackedLink>
          ))}
        </div>
      )}
    </article>
  );
}
