import { getAllPosts, getCategories, getBaseUrl } from "@/lib/blog";
import { invitationDesigns } from "@/data/invitations";
import { coldCases } from "@/data/coldCases";
import { mysteryKits } from "@/data/mysteryKits";

export default function sitemap() {
  const base = getBaseUrl();
  const routes = [
    "",
    "/blog",
    "/invitations",
    "/invitations/dashboard",
    "/cases",
    "/kits",
  ].map((route) => ({
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

  const caseRoutes = coldCases.map((c) => ({
    url: `${base}/cases/${c.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const kitRoutes = mysteryKits.map((k) => ({
    url: `${base}/kits/${k.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const kitPlayRoutes = mysteryKits.map((k) => ({
    url: `${base}/kits/${k.slug}/play`,
    lastModified: new Date().toISOString(),
  }));

  const kitCharacterRoutes = mysteryKits.flatMap((k) =>
    (k.characters ?? []).map((character) => ({
      url: `${base}/kits/${k.slug}/play/characters/${character.slug}`,
      lastModified: new Date().toISOString(),
    })),
  );

  return [
    ...routes,
    ...cats,
    ...posts,
    ...invitationRoutes,
    ...caseRoutes,
    ...kitRoutes,
    ...kitPlayRoutes,
    ...kitCharacterRoutes,
  ];
}
