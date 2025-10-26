import React from 'react'
import { getCaseBySlug } from '@/data/coldCases'
import type { Metadata } from 'next'

// Match the dynamic params behavior (Next.js 15 may provide params as a Promise in some hooks)
interface CaseLayoutProps {
  params: Promise<{ slug: string }> | { slug: string }
  children: React.ReactNode
}

// Helper to build absolute URLs for social crawlers
function absoluteUrl(path: string): string {
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  const site = process.env.NEXT_PUBLIC_SITE_URL || vercelHost || 'http://localhost:3000'
  return site.replace(/\/$/, '') + path
}

export async function generateMetadata({ params }: CaseLayoutProps): Promise<Metadata> {
  const { slug } = params instanceof Promise ? await params : params
  const caseFile = getCaseBySlug(slug)
  const titleBase = caseFile ? caseFile.title : 'Case Not Found'
  const title = `${titleBase} | Cold Case File`
  const description = caseFile?.description || 'Interactive mystery experience on My Mystery Party.'

  const ogImagePath = `/cases/${slug}/opengraph-image`
  const ogImageUrl = absoluteUrl(ogImagePath)
  const staticThumbUrl = caseFile ? absoluteUrl(caseFile.imageUrl) : ogImageUrl
  const twitterImagePath = `/cases/${slug}/twitter-image`
  const twitterImageUrl = absoluteUrl(twitterImagePath)

  return {
    title,
    description,
    metadataBase: new URL(absoluteUrl('/')),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'My Mystery Party',
      url: absoluteUrl(`/cases/${slug}`),
      images: [
        {
          url: staticThumbUrl,
          secureUrl: staticThumbUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${titleBase} Thumbnail – My Mystery Party`
        },
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${titleBase} – My Mystery Party`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImageUrl, staticThumbUrl]
    },
    alternates: {
      canonical: absoluteUrl(`/cases/${slug}`)
    }
  }
}

// Dummy layout wrapper; keeps children untouched for now.
export default async function CaseLayout({ children }: CaseLayoutProps) {
  return <>{children}</>
}
