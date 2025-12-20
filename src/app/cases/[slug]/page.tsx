import { notFound } from "next/navigation";
import Image from "next/image";
import { coldCases, getCaseBySlug } from "@/data/coldCases";
import { CaseActions } from "@/components/case-actions";
import Footer from "@/components/footer";
import TestimonialCard, { Testimonial } from "@/components/multi-media-testimonial";

// Next.js 15: params is now async (a Promise) in certain dynamic APIs.
interface CasePageProps {
  params: Promise<{ slug: string }> | { slug: string }; // Support both for forward/back compat
}

export async function generateStaticParams() {
  return coldCases.map((c) => ({ slug: c.slug }));
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  // 1. Resolve params and destructure slug once for cleaner code
  const { slug } = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(slug);

  if (!caseFile) {
    notFound();
  }

  // Map new ColdCase.preview entries into Testimonial cards
  const previews: Testimonial[] = Array.isArray(caseFile.preview)
    ? caseFile.preview.map((p) => ({
        name: p.name || caseFile.title,
        designation: p.typeOfPreview || "Preview",
        title: p.title || undefined,
        profile: p.profile || caseFile.imageUrl,
        content: p.content || "",
        mediaUrl: p.mediaUrl,
        thumbnail: p.thumbnail || p.profile || caseFile.imageUrl,
      }))
    : [];

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <div className="mx-auto max-w-6xl px-4 py-16 relative">
        <div aria-hidden className="embossed-backdrop">
          {caseFile.title}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">
          <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={caseFile.imageUrl}
              alt={caseFile.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-grow">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {caseFile.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {caseFile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs uppercase tracking-wide bg-white/10 text-text-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                {caseFile.description}
              </p>
              <ul className="mb-8 space-y-1 text-sm text-text-secondary">
                {caseFile.difficulty && (
                  <li>
                    <strong className="text-text-primary">Difficulty:</strong> {caseFile.difficulty}
                  </li>
                )}
                {caseFile.players && (
                  <li>
                    <strong className="text-text-primary">Players:</strong> {caseFile.players}
                  </li>
                )}
                {caseFile.duration && (
                  <li>
                    <strong className="text-text-primary">Estimated Duration:</strong> {caseFile.duration}
                  </li>
                )}
              </ul>
            </div>
            
            <div className="mt-auto">
              {caseFile.price != null && (
                <div className="text-4xl font-bold mb-6">${caseFile.price.toFixed(2)}</div>
              )}
              <CaseActions slug={slug} />
            </div>
          </div>
        </div>
        
        <div className="mt-24 border-t border-subtle-stroke pt-12 relative z-10">
          <h2 className="text-2xl font-semibold mb-4">What You&apos;ll Receive</h2>
          <p className="text-text-secondary max-w-3xl leading-relaxed">
            Each Cold Case File contains high-quality printable evidence, immersive
            documents, layered clues, and hidden codes that challenge your logic
            and creativity. Perfect for an unforgettable evening of mystery and
            deduction.
          </p>

          {/* Evidence previews as testimonial cards */}
          {Array.isArray(previews) && previews.length > 0 ? (
            <section className="mt-10">
              <h3 className="text-2xl font-semibold mb-6">Case Previews</h3>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
                {previews.map((t, i) => (
                  <TestimonialCard key={i} testimonial={t} hideProfile />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}