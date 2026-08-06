import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { projects } from "@/content/projects";
import { GitHubActivity } from "@/components/github/GitHubActivity";

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
        <ComingSoon milestone="Milestone 5 — experience card" />
      </Section>

      <Section id="blog" eyebrow="Writing" title="Blog">
        <ComingSoon milestone="Milestone 4 — MDX posts" />
      </Section>
    </>
  );
}
