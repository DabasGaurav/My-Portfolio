import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/time";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Writing
      </p>
      <h1 className="mt-2 font-display text-4xl">Blog</h1>

      <ul className="mt-10 flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-hairline pt-8">
            <Link
              href={`/blog/${post.slug}`}
              className="font-display text-2xl transition-colors hover:text-accent"
            >
              {post.title}
            </Link>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              {formatDate(post.date)}
            </p>
            <p className="mt-3 text-muted">{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
