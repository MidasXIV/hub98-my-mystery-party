import type { PostMeta } from "@/lib/blog-types";

function safeText(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function getBlogBannerUrl(input: {
  title?: string;
  description?: string;
  category?: string;
}): string {
  const title = safeText(input.title);
  const description = safeText(input.description);
  const category = safeText(input.category);

  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (description) params.set("description", description);
  if (category) params.set("category", category);

  return `/blog/banner${params.toString() ? `?${params.toString()}` : ""}`;
}

export function getPostHeroImageOrBanner(post: Pick<
  PostMeta,
  "title" | "description" | "category" | "heroImage"
>): string {
  const hero = safeText(post.heroImage);
  const isRemote = /^https?:\/\//i.test(hero);
  const isRelative = hero.startsWith("/");
  const ok = Boolean(hero) && (isRemote || isRelative);

  return ok
    ? hero
    : getBlogBannerUrl({
        title: post.title,
        description: post.description,
        category: post.category,
      });
}
