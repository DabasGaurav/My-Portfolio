import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { Timeline } from "@/components/timeline/Timeline";
import { timeline } from "@/content/experience";
import { CertificationsGrid } from "@/components/certifications/CertificationsGrid";
import { certifications } from "@/content/certifications";
import { TeardownsGrid } from "@/components/teardowns/TeardownsGrid";
import { teardowns } from "@/content/teardowns";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="work-education"
        eyebrow="My Work & Impact"
        title="Work & Education"
        highlight="Education"
        description="A timeline of roles and degrees, pulled from LinkedIn."
      >
        <Timeline entries={timeline} />
      </Section>

      <Section
        id="cooking"
        eyebrow="GitHub, live"
        title="Currently Cooking"
        highlight="Cooking"
        description="Projects and code repositories I'm actively building."
      >
        <ProjectsGrid />
      </Section>

      <Section
        id="certifications"
        eyebrow="Professional Credentials"
        title="Certifications & Badges"
        highlight="Badges"
        description="Certifications and credentials, pulled from LinkedIn."
      >
        <CertificationsGrid certifications={certifications} />
      </Section>

      <Section
        id="teardowns"
        eyebrow="Deep dives"
        title="Product Teardowns"
        highlight="Teardowns"
        description="Analyses of products I admire, uncovering patterns and insights."
      >
        <TeardownsGrid teardowns={teardowns} />
      </Section>

      <Section
        id="blog"
        eyebrow="Writing"
        title="Latest Thoughts"
        highlight="Thoughts"
        description="Insights on AI, building, and product development."
      >
        <BlogPreview />
      </Section>
    </>
  );
}
