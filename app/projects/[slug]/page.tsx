import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getRepoByName, projectDisplayName } from "@/lib/github";
import { getProjectDetail } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";

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

  return (
    <article className="case-study-page">
      <header className="case-study-hero">
        <div className="case-study-hero-inner">
          <Link href="/#work" className="case-study-back">← Back to selected work</Link>
          <p className="eyebrow">{detail.kind} · {detail.status}</p>
          <h1>{name}</h1>
          <p className="case-study-hook">{detail.hook}</p>
          <p className="case-study-summary">{detail.summary}</p>
        </div>
      </header>
      <CaseStudyNav />
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
          <h2>Product choices</h2>
          <div className="case-study-choices">
            {detail.productChoices.map((choice) => <p key={choice}>{choice}</p>)}
          </div>
        </section>
        <section id="next" className="case-study-row scroll-mt-32">
          <h2>What I&apos;d test next</h2>
          <p>{detail.next}</p>
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
