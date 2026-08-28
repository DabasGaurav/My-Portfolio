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
          className="card-pop block p-6"
        >
          <h3 className="font-display text-xl font-bold">{post.title}</h3>
          <p className="mt-2 font-sans text-sm font-medium text-muted">
            {formatDate(post.date)}
          </p>
          <p className="mt-3 text-muted">{post.summary}</p>
        </Link>
      ))}

      <Link
        href="/blog"
        className="mt-2 self-start font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-70"
      >
        View all posts &rarr;
      </Link>
    </div>
  );
}
