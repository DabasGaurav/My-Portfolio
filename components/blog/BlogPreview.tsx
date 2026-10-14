import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/time";

/** Latest posts for the homepage. Renders nothing until there is a post. */
export function BlogPreview({ limit = 3 }: { limit?: number }) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-list-item">
          <div>
            <span className="eyebrow">{formatDate(post.date)}</span>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </div>
          <span aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}
