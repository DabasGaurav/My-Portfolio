import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Timeline } from "@/components/timeline/Timeline";
import { timeline } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />
      <Section
        id="work"
        eyebrow="Selected work"
        title="Things I've Built"
        description="Choose a project. See the problem, the product decision, the working proof, and the code."
      >
        <ProjectsGrid />
      </Section>
      <section id="background" className="background-section scroll-mt-20">
        <div className="background-inner">
          <div>
            <p className="eyebrow">Background</p>
            <h2>From code<br />to product.</h2>
            <p>The brief version for anyone who wants it.</p>
          </div>
          <Timeline entries={timeline} />
        </div>
      </section>
    </>
  );
}
