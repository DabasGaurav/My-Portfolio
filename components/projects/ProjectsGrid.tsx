import Link from "next/link";
import { projectDetails } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";

const accents = {
  teal: "from-emerald-950 via-teal-800 to-cyan-600",
  clay: "from-amber-950 via-orange-800 to-amber-500",
  blue: "from-slate-950 via-indigo-900 to-violet-600",
};

export function ProjectsGrid() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {projectDetails.map((project, index) => (
          <article key={project.repo} className={`card-pop group overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}>
            <Link href={`/projects/${project.repo}`} className={`block ${index === 0 ? "md:grid md:grid-cols-[1fr_1.15fr]" : ""}`}>
              <div className={`relative flex min-h-52 items-end overflow-hidden bg-gradient-to-br p-6 text-white ${accents[project.accent]}`}>
                <div aria-hidden="true" className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-125" />
                <div aria-hidden="true" className="absolute right-12 top-9 h-32 w-32 rounded-full border border-white/25 transition-transform duration-500 group-hover:-translate-x-4" />
                <div className="relative z-10">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">0{index + 1} / Selected work</span>
                  <p className="mt-3 max-w-sm font-display text-2xl font-bold leading-tight md:text-3xl">{project.hook}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <span>{project.kind}</span><span aria-hidden="true">·</span><span>{project.status}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{project.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent">
                  Explore the case study <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
                </span>
              </div>
            </Link>
            <div className="border-t border-hairline px-6 py-3 md:px-8">
              <a href={`https://github.com/${socialConfig.github.username}/${project.repo}`} target="_blank" rel="noreferrer" className="font-sans text-xs font-semibold text-muted hover:text-accent">
                View source on GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <a href={socialConfig.github.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex font-sans text-sm font-semibold text-accent hover:underline">
        Browse all repositories ↗
      </a>
    </div>
  );
}
