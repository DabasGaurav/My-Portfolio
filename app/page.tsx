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

      <Section id="projects" index={1} eyebrow="Selected work" title="Projects">
        <ProjectsGrid projects={projects} />
      </Section>

      <Section id="github" index={2} eyebrow="Live activity" title="GitHub">
        <GitHubActivity />
      </Section>

      <Section id="experience" index={3} eyebrow="Background" title="Experience">
        <ExperienceCard experience={experience} />
      </Section>

      <Section id="blog" index={4} eyebrow="Writing" title="Blog">
        <BlogPreview />
      </Section>
    </>
  );
}
