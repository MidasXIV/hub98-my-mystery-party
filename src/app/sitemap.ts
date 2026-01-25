import { getAllPosts, getCategories, getBaseUrl } from "@/lib/blog";
import { invitationDesigns } from "@/data/invitations";

export default function sitemap() {
  const base = getBaseUrl();
  const routes = ["", "/blog", "/invitations", "/invitations/dashboard"].map((route) => ({
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

  const invitationRoutes = invitationDesigns.map((d) => ({
    url: `${base}/invitations/${d.slug}`,
    lastModified: new Date().toISOString(),
  })).concat(
    invitationDesigns.map((d) => ({
      url: `${base}/invitations/customize/${d.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  return [...routes, ...cats, ...posts, ...invitationRoutes];
}
