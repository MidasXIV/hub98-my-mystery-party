import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import { getPostsByCategory, getCategories } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const cats = getCategories();
  return cats.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = category.replace(/-/g, " ");
  return {
    title: `${label} – Blog Category`,
    description: `Articles for ${label}: curated posts to help you plan, style, and host mystery parties.`,
    alternates: { canonical: `/blog/category/${category}` },
    openGraph: {
      type: "website",
      title: `${label} – Blog Category`,
      description: `Curated posts under ${label}.`,
      url: `/blog/category/${category}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  if (!posts.length) return notFound();
  const label = category.replace(/-/g, " ");

  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6 font-sans">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-foreground/60 mb-6">
            <Link href="/blog" className="hover:underline">Blog</Link> <span>›</span> {label}
          </nav>

          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{label}</h1>
            <p className="mt-2 text-base text-foreground/70">
              Browse {label.toLowerCase()} articles.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-border bg-card text-card-foreground p-4">
                <h3 className="text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{post.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-foreground/50">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.readingTimeMinutes ? (
                    <>
                      <span>•</span>
                      <span>{post.readingTimeMinutes} min read</span>
                    </>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
