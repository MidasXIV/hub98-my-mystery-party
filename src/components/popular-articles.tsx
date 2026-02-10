import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { getPostHeroImageOrBanner } from "@/lib/images/blog-banner";

export default function PopularArticles({ excludeSlug }: { excludeSlug?: string }) {
  const all = getAllPosts();
  const popularCandidates = all.filter((p) => p.slug !== excludeSlug);
  // Prefer posts tagged 'popular'; else fall back to latest
  const popularTagged = popularCandidates.filter((p) => (p.tags || []).some((t) => t.toLowerCase() === "popular"));
  const popular = (popularTagged.length ? popularTagged : popularCandidates).slice(0, 5);

  if (!popular.length) return null;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-border/60 bg-card/60 p-3 md:p-4">
        <h2 className="text-sm font-semibold">Popular Articles</h2>
        <ul className="mt-3 space-y-3">
          {popular.map((p) => (
            <li key={p.slug} className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image
                  src={getPostHeroImageOrBanner(p)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="min-w-0">
                <Link href={`/blog/${p.slug}`} className="block truncate text-sm font-medium hover:underline">
                  {p.title}
                </Link>
                <div className="mt-0.5 truncate text-xs text-foreground/60">
                  {new Date(p.date).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
