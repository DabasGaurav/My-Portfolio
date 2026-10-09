import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/time";

export const metadata: Metadata = { title: "Writing" };

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="blog-page">
      <header className="blog-hero"><div><p className="eyebrow">Ideas and observations</p><h1>Writing.</h1></div></header>
      <div className="blog-list">
        {posts.length === 0 && <p>More writing is on its way.</p>}
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-list-item">
            <div><span className="eyebrow">{formatDate(post.date)}</span><h2>{post.title}</h2><p>{post.summary}</p></div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
