import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/blog";
import PostCard from "@/components/post-card";
import NoiseBackground from "@/components/noise-background";

export const metadata: Metadata = {
  title: "Blog & Guides",
  description:
    "Party Planning Tips, Top Costumes, and Mystery Party Guides—expert advice and inspiration for unforgettable mystery nights.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog & Guides | My Mystery Party",
    description:
      "Party Planning Tips, Top Costumes, and Mystery Party Guides—expert advice and inspiration for unforgettable mystery nights.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Guides | My Mystery Party",
    description:
      "Tips, costumes, and guides to plan the perfect mystery party.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  const latest = posts.slice(0, 6);

  return (
    <>
      <div className="relative bg-background text-foreground min-h-screen py-20 px-4 md:px-6 font-sans">
        <NoiseBackground />
        <div className="mx-auto max-w-7xl">
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog & Guides</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
              Friendly, practical advice for unforgettable mystery nights—party planning, costume ideas, and step‑by‑step guides.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold">Browse Categories</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${cat}`}
                  className="group rounded-xl border border-border bg-card text-card-foreground p-4 hover:border-foreground/20 hover:shadow-sm transition cursor-pointer"
                >
                  <h3 className="text-lg font-semibold capitalize">
                    {cat.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {posts.filter((p) => p.category === cat).length} articles
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm text-primary group-hover:underline">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Latest Articles</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          {/* Controlled chaos: sections per category with dense grids */}
          <div className="mt-16 space-y-12">
            {categories.map((cat) => {
              const catPosts = getPostsByCategory(cat).slice(0, 6);
              if (!catPosts.length) return null;
              const label = cat.replace(/-/g, " ");
              return (
                <section key={cat}>
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-xl font-semibold capitalize">{label}</h2>
                    <Link href={`/blog/category/${cat}`} className="text-sm text-primary hover:underline">View all →</Link>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-dense">
                    {catPosts.map((post, i) => {
                      const span = i % 5 === 0 ? "md:col-span-2 lg:col-span-2" : ""; // occasional wider cards
                      return (
                        <div key={post.slug} className={span}>
                          <PostCard post={post} />
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
