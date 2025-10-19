import { notFound } from "next/navigation";
import Image from "next/image";
import { coldCases, getCaseBySlug } from "@/data/coldCases";
import { CaseActions } from "@/components/case-actions";

// Next.js 15: params is now async (a Promise) in certain dynamic APIs.
interface CasePageProps {
  params: Promise<{ slug: string }> | { slug: string }; // Support both for forward/back compat
}

export async function generateStaticParams() {
  return coldCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const resolved = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(resolved.slug);
  if (!caseFile) return { title: "Case Not Found" };
  return {
    title: `${caseFile.title} | Cold Case File`,
    description: caseFile.description,
  };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const resolved = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(resolved.slug);
  if (!caseFile) return notFound();

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={caseFile.imageUrl}
              alt={caseFile.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
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
            {caseFile.price != null && (
              <div className="text-3xl font-semibold mb-6">${caseFile.price.toFixed(2)}</div>
            )}
            <CaseActions slug={resolved.slug} />
          </div>
        </div>
        <div className="mt-16 border-t border-subtle-stroke pt-10">
          <h2 className="text-2xl font-semibold mb-4">What You&apos;ll Receive</h2>
          <p className="text-text-secondary max-w-3xl leading-relaxed">
            Each Cold Case File contains high-quality printable evidence, immersive
            documents, layered clues, and hidden codes that challenge your logic
            and creativity. Perfect for an unforgettable evening of mystery and
            deduction.
          </p>
        </div>
      </div>
    </div>
  );
}
