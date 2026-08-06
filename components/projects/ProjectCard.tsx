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
    <article className="border border-hairline p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl">{project.title}</h3>
        {project.placeholder && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
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
              className="rounded-sm border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
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
              className="font-mono text-xs uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-80"
            >
              {linkLabels[key]} &rarr;
            </TrackedLink>
          ))}
        </div>
      )}
    </article>
  );
}
