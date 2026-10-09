"use client";

import { useState } from "react";
import Link from "next/link";
import { projectDetails } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";

export function ProjectsGrid() {
  const [active, setActive] = useState(0);
  const project = projectDetails[active];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr]">
      <div className="flex flex-col gap-3" aria-label="Choose a project">
        {projectDetails.map((item, index) => (
          <button
            type="button"
            key={item.repo}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={`group relative rounded-xl border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active === index ? "border-accent bg-surface-raised shadow-lg shadow-black/5" : "border-hairline bg-surface-raised/60 hover:border-accent/50 hover:bg-surface-raised"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs tracking-widest text-accent">0{index + 1} / 03</span>
              <span className={`h-2 w-2 rounded-full transition-all ${active === index ? "bg-accent ring-4 ring-accent/15" : "bg-hairline group-hover:bg-accent"}`} aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-display text-xl font-bold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted">{item.kind}</p>
            <p className={`mt-3 max-w-xs text-sm leading-relaxed text-muted ${active === index ? "block" : "hidden lg:block"}`}>{item.summary}</p>
          </button>
        ))}
      </div>

      <div key={project.repo} className="project-reveal relative flex min-h-[34rem] flex-col overflow-hidden rounded-xl border border-accent/30 bg-[#102e31] p-6 text-[#f7f3e9] shadow-xl shadow-teal-950/10 sm:p-9">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#a6d2c5]/20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-5 top-8 h-44 w-44 rounded-full border border-[#a6d2c5]/30" aria-hidden="true" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a6d2c5]">
          <span>Project file / 0{active + 1}</span><span>{project.status}</span>
        </div>
        <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d9a47e]">The question</p>
          <h3 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">{project.hook}</h3>
          <p className="mt-4 max-w-xl leading-relaxed text-[#c7d8d4]">{project.summary}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/5 p-4"><span className="font-mono text-[10px] uppercase tracking-widest text-[#d9a47e]">01 / Observe</span><p className="mt-2 text-sm leading-relaxed">{project.preview.observe}</p></div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-4"><span className="font-mono text-[10px] uppercase tracking-widest text-[#d9a47e]">02 / Decide</span><p className="mt-2 text-sm leading-relaxed">{project.preview.decide}</p></div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-4"><span className="font-mono text-[10px] uppercase tracking-widest text-[#d9a47e]">03 / Test</span><p className="mt-2 text-sm leading-relaxed">{project.preview.test}</p></div>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3 border-t border-white/20 pt-5">
          <Link href={`/projects/${project.repo}`} className="rounded-lg bg-[#e7c39b] px-5 py-3 font-sans text-sm font-bold text-[#102e31] transition-transform hover:-translate-y-0.5">Open case study ↗</Link>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-white/30 px-5 py-3 font-sans text-sm font-semibold hover:bg-white/10">Try live demo ↗</a>}
          <a href={`https://github.com/${socialConfig.github.username}/${project.repo}`} target="_blank" rel="noreferrer" className="px-2 py-3 font-sans text-sm font-semibold text-[#c7d8d4] hover:text-white">GitHub ↗</a>
        </div>
      </div>
    </div>
  );
}
