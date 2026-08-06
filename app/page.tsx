import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { projects } from "@/content/projects";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { experience } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="projects" eyebrow="Selected work" title="Projects">
        <ProjectsGrid projects={projects} />
      </Section>

      <Section id="github" eyebrow="Live activity" title="GitHub">
        <GitHubActivity />
      </Section>

      <Section id="experience" eyebrow="Background" title="Experience">
        <ExperienceCard experience={experience} />
      </Section>

      <Section id="blog" eyebrow="Writing" title="Blog">
        <BlogPreview />
      </Section>
    </>
  );
}
