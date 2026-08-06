import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ComingSoon } from "@/components/layout/ComingSoon";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="projects" eyebrow="Selected work" title="Projects">
        <ComingSoon milestone="Milestone 2 — real project cards" />
      </Section>

      <Section id="github" eyebrow="Live activity" title="GitHub">
        <ComingSoon milestone="Milestone 3 — live GitHub API embed" />
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
