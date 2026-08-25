import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/time";
import { Figure } from "@/components/mdx/Figure";
import { Chart } from "@/components/mdx/Chart";
import { Pullquote } from "@/components/mdx/Pullquote";
import { Callout } from "@/components/mdx/Callout";

const mdxComponents = { Figure, Chart, Pullquote, Callout };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-muted">
        {formatDate(post.date)}
      </p>
      <h1 className="mt-2 text-balance font-display text-5xl italic">
        {post.title}
      </h1>
      <div className="prose mt-10 max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
