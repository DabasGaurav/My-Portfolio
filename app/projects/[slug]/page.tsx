import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getRepoByName, projectDisplayName } from "@/lib/github";
import { getProjectDetail } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";
import { CaseStudyNav, type CaseStudySection } from "@/components/projects/CaseStudyNav";

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  if (slug.toLowerCase() === "creatoros") redirect("/projects/creatorsignal.ai");
  const detail = getProjectDetail(slug);
  if (detail) return { title: detail.name, description: detail.summary };
  const repo = await getRepoByName(slug);
  return repo ? { title: projectDisplayName(repo), description: repo.description ?? undefined } : {};
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  if (slug.toLowerCase() === "creatoros") redirect("/projects/creatorsignal.ai");
  const detail = getProjectDetail(slug);
  const repo = detail ? null : await getRepoByName(slug);
  if (!detail && !repo) notFound();

  const name = detail?.name ?? projectDisplayName(repo!);
  const githubUrl = repo?.htmlUrl ?? `https://github.com/${socialConfig.github.username}/${detail!.repo}`;

  if (!detail) return (
    <article className="case-study-fallback">
      <Link href="/#work">← Back to selected work</Link>
      <p className="eyebrow">Project</p>
      <h1>{name}</h1>
      <p>{repo?.description ?? "Explore this project on GitHub."}</p>
      <a className="button button-coral" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub ↗</a>
    </article>
  );

  const sections: CaseStudySection[] = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "decisions", label: detail.decisions ? "Decisions" : "Product choices" },
    ...(detail.evaluation ? [{ id: "evaluation", label: "Evaluation" }] : []),
    ...(detail.lessons ? [{ id: "lessons", label: "Lessons" }] : []),
    ...(detail.gaps ? [{ id: "gaps", label: "Not yet" }] : []),
    { id: "next", label: "Next test" },
  ];

  return (
    <article className="case-study-page">
      <header className="case-study-hero">
        <div className="case-study-hero-inner">
          <Link href="/#work" className="case-study-back">← Back to selected work</Link>
          <p className="eyebrow">{detail.kind} · {detail.status}</p>
          <h1>{name}</h1>
          <p className="case-study-hook">{detail.hook}</p>
          <p className="case-study-summary">{detail.summary}</p>
          {detail.role && <p className="case-study-role">{detail.role}</p>}
        </div>
      </header>
      <CaseStudyNav sections={sections} />
      {detail.stats && (
        <div className="case-study-stats">
          {detail.stats.map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
        </div>
      )}
      <div className="case-study-content">
        <section id="problem" className="case-study-row scroll-mt-32">
          <h2>The problem</h2>
          <p>{detail.problem}</p>
        </section>
        <section id="approach" className="case-study-row scroll-mt-32">
          <h2>How it works</h2>
          <div className="case-study-approach">
            {detail.approach.map((step) => <p key={step}>{step}</p>)}
          </div>
        </section>
        <section id="decisions" className="case-study-row scroll-mt-32">
          <h2>{detail.decisions ? "Decisions and trade-offs" : "Product choices"}</h2>
          {detail.decisions ? (
            <div className="case-study-decisions">
              {detail.decisions.map((decision) => (
                <div key={decision.title} className="case-study-decision">
                  <h3>{decision.title}</h3>
                  <dl>
                    <div><dt>Chose</dt><dd>{decision.chose}</dd></div>
                    <div><dt>Turned down</dt><dd>{decision.rejected}</dd></div>
                    <div><dt>Why</dt><dd>{decision.why}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          ) : (
            <div className="case-study-choices">
              {detail.productChoices.map((choice) => <p key={choice}>{choice}</p>)}
            </div>
          )}
        </section>
        {detail.evaluation && (
          <section id="evaluation" className="case-study-row scroll-mt-32">
            <h2>How I&apos;ll know it works</h2>
            <div className="case-study-stack">
              <p className="case-study-lead">{detail.evaluation.intro}</p>
              <div className="case-study-choices">
                {detail.evaluation.points.map((point) => <p key={point}>{point}</p>)}
              </div>
            </div>
          </section>
        )}
        {detail.lessons && (
          <section id="lessons" className="case-study-row scroll-mt-32">
            <h2>What reality changed</h2>
            <div className="case-study-lessons">
              {detail.lessons.map((lesson) => (
                <dl key={lesson.assumed}>
                  <div><dt>Assumed</dt><dd>{lesson.assumed}</dd></div>
                  <div><dt>Found</dt><dd>{lesson.found}</dd></div>
                  <div><dt>Changed</dt><dd>{lesson.changed}</dd></div>
                </dl>
              ))}
            </div>
          </section>
        )}
        {detail.gaps && (
          <section id="gaps" className="case-study-row scroll-mt-32">
            <h2>What doesn&apos;t work yet</h2>
            <div className="case-study-choices case-study-gaps">
              {detail.gaps.map((gap) => <p key={gap}>{gap}</p>)}
            </div>
          </section>
        )}
        <section id="next" className="case-study-row scroll-mt-32">
          <h2>What I&apos;d test next</h2>
          {detail.nextSteps ? (
            <div className="case-study-stack">
              <p className="case-study-lead">{detail.next}</p>
              <ol className="case-study-steps">
                {detail.nextSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          ) : (
            <p>{detail.next}</p>
          )}
        </section>
        {detail.loomUrl && (
          <section className="case-study-walkthrough">
            <h2>Walkthrough</h2>
            <div><iframe src={detail.loomUrl} title={`${name} walkthrough`} allow="fullscreen" /></div>
          </section>
        )}
        <div className="case-study-actions">
          {detail.demoUrl && <a className="button button-dark" href={detail.demoUrl} target="_blank" rel="noreferrer">Try the demo ↗</a>}
          <a className="button button-outline-dark" href={githubUrl} target="_blank" rel="noreferrer">Explore the code ↗</a>
        </div>
      </div>
    </article>
  );
}
