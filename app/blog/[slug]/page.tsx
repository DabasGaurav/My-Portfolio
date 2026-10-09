import Link from "next/link";
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

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="blog-post">
      <header className="blog-post-hero"><div><Link href="/blog">← All writing</Link><p className="eyebrow">{formatDate(post.date)}</p><h1>{post.title}</h1><p>{post.summary}</p></div></header>
      <div className="blog-post-content prose"><MDXRemote source={post.content} components={mdxComponents} /></div>
    </article>
  );
}
