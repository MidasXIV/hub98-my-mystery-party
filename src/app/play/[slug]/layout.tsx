import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import type { Metadata } from "next";

// Future-compatible: params may arrive as a Promise. Unwrap with React.use() when provided.
// Keeping function async to allow any data fetching additions later.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  // In server metadata functions we cannot call React.use(); just await if it's a Promise.
  const resolved = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(resolved.slug);
  const titleBase = caseFile ? caseFile.title : "Case Not Found";
  const title = `${titleBase} | My Mystery Party`;
  const description = caseFile?.description || "Interactive mystery experience on My Mystery Party.";

  // Prefer dynamic composite FIRST so crawlers that only take the first image use it.
  // Provide static thumbnail as a fallback second.
  const ogImages = [
    {
      url: `/play/${resolved.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      type: "image/png",
      alt: `${titleBase} – My Mystery Party`,
    },
    ...(caseFile
      ? [
          {
            url: caseFile.imageUrl,
            width: 1200,
            height: 630,
            type: "image/png",
            alt: `${titleBase} Thumbnail – My Mystery Party`,
          },
        ]
      : []),
  ];

  const twitterImages = [
  `/play/${resolved.slug}/twitter-image`,
  caseFile?.imageUrl || `/play/${resolved.slug}/opengraph-image`,
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "My Mystery Party",
  url: `/play/${resolved.slug}`,
  images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
    alternates: { canonical: `/play/${resolved.slug}` },
  };
}

export default function PlaySlugLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen overflow-hidden bg-background">{children}</div>;
}
