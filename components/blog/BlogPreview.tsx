import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/time";

export function BlogPreview({ limit = 3 }: { limit?: number }) {
  const posts = getAllPosts().slice(0, limit);

  if (posts.length === 0) {
    return <p className="text-muted">No posts published yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="block border border-hairline p-6 transition-colors hover:border-accent"
        >
          <h3 className="font-display text-xl">{post.title}</h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {formatDate(post.date)}
          </p>
          <p className="mt-3 text-muted">{post.summary}</p>
        </Link>
      ))}

      <Link
        href="/blog"
        className="mt-2 self-start font-mono text-xs uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-80"
      >
        View all posts &rarr;
      </Link>
    </div>
  );
}
