import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
