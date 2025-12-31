import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Tokens } from "marked";

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

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).map((d) => d.name);
  } catch {
    return [];
  }
}

export function getCategories(): string[] {
  return safeReadDir(CONTENT_ROOT).filter((name) => {
    try {
      const stat = fs.statSync(path.join(CONTENT_ROOT, name));
      return stat.isDirectory();
    } catch {
      return false;
    }
  });
}

function fileToSlug(filename: string): string {
  return filename.replace(/\.mdx?$/i, "");
}

function estimateReadingTimeMinutes(text: string): number {
  const words = (text || "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = words / 200; // ~200 wpm
  return Math.max(1, Math.round(minutes));
}

export function getAllPosts(): PostMeta[] {
  const categories = getCategories();
  const posts: PostMeta[] = [];
  for (const cat of categories) {
    const dir = path.join(CONTENT_ROOT, cat);
    const files = safeReadDir(dir).filter((f) => /\.mdx?$/i.test(f));
    for (const f of files) {
      const full = path.join(dir, f);
      const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
      const slug = data.slug || fileToSlug(f);
  const stats = estimateReadingTimeMinutes(content || raw);
      posts.push({
        slug,
        title: data.title || slug,
        description: data.description,
        date: data.date || new Date().toISOString(),
        author: data.author,
        category: data.category || cat,
        tags: data.tags || [],
        heroImage: data.heroImage,
        readingTimeMinutes: stats,
      });
    }
  }
  // Sort by date desc
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): Post | null {
  const categories = getCategories();
  for (const cat of categories) {
    const dir = path.join(CONTENT_ROOT, cat);
    const files = safeReadDir(dir).filter((f) => /\.mdx?$/i.test(f));
    for (const f of files) {
      const full = path.join(dir, f);
      const raw = fs.readFileSync(full, "utf8");
      const parsed = matter(raw);
      const effectiveSlug = parsed.data.slug || fileToSlug(f);
      if (effectiveSlug === slug) {
        const stats = estimateReadingTimeMinutes(parsed.content || raw);
        return {
          slug: effectiveSlug,
          title: parsed.data.title || effectiveSlug,
          description: parsed.data.description,
          date: parsed.data.date || new Date().toISOString(),
          author: parsed.data.author,
          category: parsed.data.category || cat,
          tags: parsed.data.tags || [],
          heroImage: parsed.data.heroImage,
          readingTimeMinutes: stats,
          content: parsed.content || raw,
        };
      }
    }
  }
  return null;
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  marked.setOptions({ gfm: true, breaks: false });
  const renderer = new marked.Renderer();
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  renderer.heading = (text, level) => {
    const id = slugify(text);
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  return marked.parse(markdown, { renderer });
}

export function getBaseUrl(): string {
  const vercelHost = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    vercelHost ||
    "https://hub98-my-mystery-party.vercel.app";
  return site.replace(/\/$/, "");
}

export type HeadingItem = { id: string; text: string; depth: number };

export function getMarkdownHeadings(markdown: string): HeadingItem[] {
  // Use marked lexer to read heading tokens and generate matching ids
  const tokens = marked.lexer(markdown);
  const headings: HeadingItem[] = [];
  for (const t of tokens) {
    if ("type" in t && t.type === "heading") {
      const ht = t as Tokens.Heading;
      const id = ht.text
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text: ht.text, depth: ht.depth });
    }
  }
  return headings;
}
