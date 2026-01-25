export type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  date: string; // ISO string
  author?: string;
  category: string;
  tags?: string[];
  heroImage?: string;
  readingTimeMinutes?: number;
};

export type Post = PostMeta & {
  content: string; // raw markdown content
  html?: string; // rendered HTML
};

export type HeadingItem = { id: string; text: string; depth: number };
