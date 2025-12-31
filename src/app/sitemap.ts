import { getAllPosts, getCategories, getBaseUrl } from "@/lib/blog";

export default function sitemap() {
  const base = getBaseUrl();
  const routes = ["", "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const cats = getCategories().map((c) => ({
    url: `${base}/blog/category/${c}`,
    lastModified: new Date().toISOString(),
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
  }));

  return [...routes, ...cats, ...posts];
}
