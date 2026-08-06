export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
};

export type Post = PostMeta & {
  content: string;
};
