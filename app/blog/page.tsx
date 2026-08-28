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
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-muted">
        Writing
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold">Blog</h1>

      <ul className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="card-pop block p-6">
              <span className="font-display text-xl font-bold transition-colors">
                {post.title}
              </span>
              <p className="mt-2 font-sans text-sm font-medium text-muted">
                {formatDate(post.date)}
              </p>
              <p className="mt-3 text-muted">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
