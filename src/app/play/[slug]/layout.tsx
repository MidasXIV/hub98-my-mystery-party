import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import { Metadata } from "next";

interface PlayPageProps {
  params: { slug: string };
}

// Helper to build absolute URLs for social crawlers (Twitter/Facebook require absolute og:image)
function absoluteUrl(path: string): string {
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  const site = process.env.NEXT_PUBLIC_SITE_URL || vercelHost || 'http://localhost:3000'
  return site.replace(/\/$/, '') + path
}

export async function generateMetadata({ params }: PlayPageProps): Promise<Metadata> {
  const caseFile = getCaseBySlug(params.slug)
  const titleBase = caseFile ? caseFile.title : 'Case Not Found'
  const title = `${titleBase} | My Mystery Party`
  const description = caseFile?.description || 'Interactive mystery experience on My Mystery Party.'
  const ogImagePath = `/play/${params.slug}/opengraph-image`
  const ogImageUrl = absoluteUrl(ogImagePath)
  const twitterImagePath = `/play/${params.slug}/twitter-image`
  const twitterImageUrl = absoluteUrl(twitterImagePath)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'My Mystery Party',
      url: absoluteUrl(`/play/${params.slug}`),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${titleBase} – My Mystery Party`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImageUrl]
    },
    alternates: {
      canonical: absoluteUrl(`/play/${params.slug}`)
    }
  }
}

export default function PlaySlugLayout({ children }: { children: React.ReactNode }) {
  // Header removed; page now mounts its own integrated PlayHeader with FilterMenu.
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {children}
    </div>
  );
}
