import type { Metadata } from "next";
import Footer from "@/components/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, renderMarkdownToHtml, getBaseUrl, getMarkdownHeadings } from "@/lib/blog";
import Markdown from "@/components/markdown";
import Toc from "@/components/toc";
import PopularArticles from "@/components/popular-articles";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const base = getBaseUrl();
  const url = `${base}/blog/${post.slug}`;
  const images = post.heroImage ? [post.heroImage] : undefined;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const html = await renderMarkdownToHtml(post.content);
  const hasBanner = Boolean(post.heroImage);

  const base = getBaseUrl();
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    image: post.heroImage ? `${base}${post.heroImage}` : undefined,
    mainEntityOfPage: `${base}/blog/${post.slug}`,
  };

  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-20 px-4 md:px-6 font-sans">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-foreground/60 mb-6">
            <Link href="/blog" className="hover:underline">Blog</Link> <span>›</span> {post.category.replace(/-/g, " ")}
          </nav>

          {hasBanner && (
            <div className="bg-black p-1 md:p-4 mb-8 rounded-4xl">
              <section className="relative isolate min-h-[42vh] w-full overflow-hidden rounded-3xl">
                <Image
                  src={post.heroImage || "/opengraph/hero.png"}
                  alt={post.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center opacity-80"
                />
                {/* Dotted overlay pattern */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff0f_2px,transparent_3px)] [background-size:20px_20px]"
                />
                {/* Soft dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                {/* Title + description */}
                <div className="relative z-10 flex h-full items-end p-6 md:p-10">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/95">{post.title}</h1>
                    {post.description ? (
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-white/85">{post.description}</p>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>
          )}
          {/* Mobile TOC above content */}
          <div className="mb-8 lg:hidden">
            <Toc headings={getMarkdownHeadings(post.content)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar (desktop): TOC */}
            <div className="hidden lg:block lg:col-span-2">
              <Toc headings={getMarkdownHeadings(post.content)} />
            </div>

            {/* Main content */
            }
            <div className="lg:col-span-8">
              <article>
                <header className="mb-6">
                  {!hasBanner && (
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-foreground/50">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    {post.readingTimeMinutes ? (
                      <>
                        <span>•</span>
                        <span>{post.readingTimeMinutes} min read</span>
                      </>
                    ) : null}
                    {post.author ? (
                      <>
                        <span>•</span>
                        <span>By {post.author}</span>
                      </>
                    ) : null}
                  </div>
                </header>
                <Markdown html={html} />
              </article>

              <div className="mt-12">
                <Link href={`/blog/category/${post.category}`} className="text-sm text-primary hover:underline">
                  ← Back to {post.category.replace(/-/g, " ")}
                </Link>
              </div>
            </div>

            {/* Right sidebar (desktop): Popular */}
            <div className="hidden lg:block lg:col-span-2">
              <PopularArticles excludeSlug={post.slug} />
            </div>
          </div>

          {/* Mobile Popular below content */}
          <div className="mt-10 lg:hidden">
            <PopularArticles excludeSlug={post.slug} />
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        </div>
      </div>
      <Footer />
    </>
  );
}
