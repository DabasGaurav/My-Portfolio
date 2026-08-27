import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { Timeline } from "@/components/timeline/Timeline";
import { timeline } from "@/content/experience";
import { CertificationsGrid } from "@/components/certifications/CertificationsGrid";
import { certifications } from "@/content/certifications";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="work-education" index={1} eyebrow="Background" title="Work & Education">
        <Timeline entries={timeline} />
      </Section>

      <Section id="cooking" index={2} eyebrow="Live from GitHub" title="Currently Cooking">
        <ProjectsGrid />
      </Section>

      <Section id="certifications" index={3} eyebrow="Credentials" title="Certifications & Badges">
        <CertificationsGrid certifications={certifications} />
      </Section>

      <Section id="blog" index={4} eyebrow="Writing" title="Blog">
        <BlogPreview />
      </Section>
    </>
  );
}
