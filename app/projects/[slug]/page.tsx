import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getRepoByName, projectDisplayName } from "@/lib/github";
import { getProjectDetail } from "@/content/projects-detail";
import { socialConfig } from "@/config/social.config";

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

  return (
    <article className="mx-auto max-w-5xl px-6 pb-20 pt-12 md:pt-20">
      <Link href="/#work" className="font-sans text-sm font-semibold text-accent hover:underline">← Back to selected work</Link>
      {detail ? (
        <>
          <div className="relative mt-8 overflow-hidden rounded-xl bg-[#102e31] p-7 text-[#f7f3e9] sm:p-10 md:p-14">
            <div className="signal-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d9a47e]">Project file · {detail.kind} · {detail.status}</p>
              <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-tight md:text-6xl">{name}</h1>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[#c7d8d4]">{detail.hook}</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/5 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[#d9a47e]">The short version</p>
              <p className="mt-3 leading-relaxed">{detail.summary}</p>
            </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 border-b border-hairline py-5 font-mono text-xs uppercase tracking-wider text-accent" aria-label="Case study sections">
            <a href="#problem" className="hover:underline">01 / Problem</a>
            <a href="#approach" className="hover:underline">02 / Approach</a>
            <a href="#decisions" className="hover:underline">03 / Decisions</a>
            <a href="#next" className="hover:underline">04 / Next test</a>
          </nav>

          <div id="problem" className="grid scroll-mt-24 gap-12 py-12 md:grid-cols-[0.35fr_1fr]">
            <h2 className="font-display text-xl font-bold text-accent">01 / The problem</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{detail.problem}</p>
          </div>
          <div id="approach" className="grid scroll-mt-24 gap-12 border-t border-hairline py-12 md:grid-cols-[0.35fr_1fr]">
            <h2 className="font-display text-xl font-bold text-accent">02 / How it works</h2>
            <ol className="grid gap-4 md:grid-cols-3">
              {detail.approach.map((step, index) => (
                <li key={step} className="card-pop-flat p-5">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <p className="mt-3 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div id="decisions" className="grid scroll-mt-24 gap-12 border-t border-hairline py-12 md:grid-cols-[0.35fr_1fr]">
            <h2 className="font-display text-xl font-bold text-accent">03 / Product choices</h2>
            <ul className="grid gap-4">
              {detail.productChoices.map((choice) => <li key={choice} className="border-l-2 border-accent pl-5 leading-relaxed text-muted">{choice}</li>)}
            </ul>
          </div>
          <div id="next" className="grid scroll-mt-24 gap-12 border-t border-hairline py-12 md:grid-cols-[0.35fr_1fr]">
            <h2 className="font-display text-xl font-bold text-accent">04 / What I would test next</h2>
            <p className="max-w-2xl leading-relaxed text-muted">{detail.next}</p>
          </div>
          {detail.loomUrl && (
            <div className="border-t border-hairline py-12">
              <h2 className="font-display text-2xl font-bold">Walkthrough</h2>
              <div className="card-pop-flat mt-5 aspect-video overflow-hidden">
                <iframe src={detail.loomUrl} title={`${name} walkthrough`} allow="fullscreen" className="h-full w-full" />
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 border-t border-hairline pt-10">
            {detail.demoUrl && <a href={detail.demoUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-accent px-6 py-3 font-sans text-sm font-semibold text-on-accent hover:opacity-90">Try the demo ↗</a>}
            <a href={githubUrl} target="_blank" rel="noreferrer" className="card-pop-flat rounded-xl px-6 py-3 font-sans text-sm font-semibold hover:border-accent">Explore the code ↗</a>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-8 font-display text-5xl font-bold">{name}</h1>
          <p className="mt-5 text-lg text-muted">{repo?.description ?? "Explore this project on GitHub."}</p>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="mt-8 inline-block font-semibold text-accent">View on GitHub ↗</a>
        </>
      )}
    </article>
  );
}
