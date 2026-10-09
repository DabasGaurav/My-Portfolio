import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Timeline } from "@/components/timeline/Timeline";
import { timeline } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y border-hairline bg-[#102e31] text-[#f7f3e9]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#d9a47e]">The way I work</p>
          <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm font-semibold">
            <li>Observe the problem</li><li className="text-[#d9a47e]" aria-hidden="true">→</li>
            <li>Make a choice</li><li className="text-[#d9a47e]" aria-hidden="true">→</li>
            <li>Build and learn</li>
          </ol>
        </div>
      </div>

      <Section
        id="work"
        eyebrow="02 / Selected work · Explore the decisions"
        title="Things I've Built"
        highlight="Built"
        description="Choose a project to see the problem, the product decisions, and what I would test next."
      >
        <ProjectsGrid />
      </Section>

      <section id="background" className="scroll-mt-20 border-t border-hairline">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-center md:py-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">03 / The path here</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">From code to product.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">The work above is the story. Here&apos;s the short version of how I got here.</p>
          </div>
          <Timeline entries={timeline} />
        </div>
      </section>
    </>
  );
}
