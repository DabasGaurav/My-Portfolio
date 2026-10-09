"use client";

import { useState } from "react";
import Link from "next/link";
import { projectDetails } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";
import { haptic } from "@/lib/haptics";

const lenses = [
  { label: "The problem", key: "observe" },
  { label: "The choice", key: "decide" },
  { label: "What I'd test", key: "test" },
] as const;

type Lens = typeof lenses[number]["key"];

export function ProjectsGrid() {
  const [active, setActive] = useState(0);
  const [lens, setLens] = useState<Lens>("observe");
  const project = projectDetails[active];

  function selectProject(index: number) {
    haptic("tap");
    setActive(index);
    setLens("observe");
  }

  return (
    <div className="project-explorer">
      <div className="project-selector" aria-label="Choose a project">
        {projectDetails.map((item, index) => (
          <button
            type="button"
            key={item.repo}
            onClick={() => selectProject(index)}
            aria-pressed={active === index}
            className={active === index ? "is-active" : ""}
          >
            <span><strong>{item.name}</strong><small>{item.kind}</small></span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <article key={project.repo} className="project-feature project-reveal" aria-live="polite">
        <div className="project-feature-main">
          <div>
            <p className="eyebrow">{project.status} · {project.kind}</p>
            <h3>{project.hook}</h3>
            <p className="project-feature-summary">{project.summary}</p>
          </div>
          <div className="project-feature-actions">
            <Link href={`/projects/${project.repo}`} className="project-case-link">Open case study ↗</Link>
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Try demo ↗</a>}
            <a href={`https://github.com/${socialConfig.github.username}/${project.repo}`} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="project-feature-story">
          <div className="story-tabs" aria-label="Explore the product story">
            {lenses.map((item) => (
              <button key={item.key} type="button" onClick={() => { haptic("tap"); setLens(item.key); }} aria-pressed={lens === item.key} className={lens === item.key ? "is-active" : ""}>{item.label}</button>
            ))}
          </div>
          <div className="story-answer" key={`${project.repo}-${lens}`} aria-live="polite">
            <p className="eyebrow">{lenses.find((item) => item.key === lens)?.label}</p>
            <p>{project.preview[lens]}</p>
          </div>
          <span className="story-hint">Choose a lens to explore the thinking behind the build.</span>
        </div>
      </article>
    </div>
  );
}
