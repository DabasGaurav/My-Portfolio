import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { experience } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="experience" index={1} eyebrow="Background" title="Experience">
        <ExperienceCard experience={experience} />
      </Section>

      <Section id="projects" index={2} eyebrow="Live from GitHub" title="Projects">
        <ProjectsGrid />
      </Section>

      <Section id="blog" index={3} eyebrow="Writing" title="Blog">
        <BlogPreview />
      </Section>
    </>
  );
}
