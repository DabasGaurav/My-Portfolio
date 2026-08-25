import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { WorkGrid } from "@/components/work/WorkGrid";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { experience } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="work" index={1} eyebrow="Live from GitHub" title="Work">
        <WorkGrid />
      </Section>

      <Section id="experience" index={2} eyebrow="Background" title="Experience">
        <ExperienceCard experience={experience} />
      </Section>

      <Section id="blog" index={3} eyebrow="Writing" title="Blog">
        <BlogPreview />
      </Section>
    </>
  );
}
