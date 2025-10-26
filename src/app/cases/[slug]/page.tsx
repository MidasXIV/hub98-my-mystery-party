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

// Helper to build absolute URLs for social crawlers (Twitter/Facebook require absolute og:image)
function absoluteUrl(path: string): string {
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  const site = process.env.NEXT_PUBLIC_SITE_URL || vercelHost || 'https://hub98-my-mystery-party.vercel.app/'
  return site.replace(/\/$/, '') + path
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(slug);
  if (!caseFile) {
    return {
      title: "Case Not Found",
      description: "The requested mystery case could not be found.",
    };
  }

  const ogImagePath = `/cases/${caseFile.slug}/opengraph-image`
  const ogImageUrl = absoluteUrl(ogImagePath)
  // Static thumbnail fallback: some crawlers (Signal, older bots) ignore dynamically generated OG routes.
  const staticThumbUrl = caseFile ? absoluteUrl(caseFile.imageUrl) : ogImageUrl
  const twitterImagePath = `/cases/${caseFile.slug}/twitter-image`
  const twitterImageUrl = absoluteUrl(twitterImagePath)

  return {
    title: `${caseFile.title} | Cold Case File`,
    description: caseFile.description,
    openGraph: {
      type: "article",
      title: caseFile.title,
      description: caseFile.description,
      url: absoluteUrl(`/cases/${caseFile.slug}`),
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${caseFile.title} – My Mystery Party`,
        },
        {
          url: staticThumbUrl, 
          secureUrl: staticThumbUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: caseFile.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: caseFile.title,
      description: caseFile.description,
      images: [twitterImageUrl, staticThumbUrl], // Place dynamic first
    },
    alternates: {
      canonical: `/cases/${caseFile.slug}`,
    },
  };
}
export default async function CaseDetailPage({ params }: CasePageProps) {
  // 1. Resolve params and destructure slug once for cleaner code
  const { slug } = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(slug);

  if (!caseFile) {
    notFound();
  }

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

          {/* SUGGESTION: For better text readability against the embossed background,
              you could add a subtle background color to this div in your CSS.
              e.g., `bg-background/90 backdrop-blur-sm` if using Tailwind. */}
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
                    <strong className="text-text-primary">Difficulty:</strong>{" "}
                    {caseFile.difficulty}
                  </li>
                )}
                {caseFile.players && (
                  <li>
                    <strong className="text-text-primary">Players:</strong>{" "}
                    {caseFile.players}
                  </li>
                )}
                {caseFile.duration && (
                  <li>
                    <strong className="text-text-primary">
                      Estimated Duration:
                    </strong>{" "}
                    {caseFile.duration}
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-auto">
              {/* 2. Moved price above the actions for better context */}
              {caseFile.price != null && (
                <div className="text-4xl font-bold mb-6">
                  ${caseFile.price.toFixed(2)}
                </div>
              )}
              <CaseActions slug={slug} />
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-subtle-stroke pt-12 relative z-10">
          {/* 3. Using a regular apostrophe for better code readability */}
          <h2 className="text-2xl font-semibold mb-4">
            What You&apos;ll Receive
          </h2>
          <p className="text-text-secondary max-w-3xl leading-relaxed">
            Each Cold Case File contains high-quality printable evidence,
            immersive documents, layered clues, and hidden codes that challenge
            your logic and creativity. Perfect for an unforgettable evening of
            mystery and deduction.
          </p>
        </div>
      </div>
    </div>
  );
}
