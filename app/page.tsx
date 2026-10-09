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
        highlight="Built"
        description="Three products, three different problems. Open a project to see the thinking, the tradeoffs, and the code."
      >
        <ProjectsGrid />
      </Section>

      <section id="background" className="scroll-mt-20 border-t border-hairline">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-center md:py-16">
          <div>
            <p className="font-sans text-sm text-muted">A little context</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">From code to product.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">The work above is the story. Here&apos;s the short version of how I got here.</p>
          </div>
          <Timeline entries={timeline} />
        </div>
      </section>
    </>
  );
}
