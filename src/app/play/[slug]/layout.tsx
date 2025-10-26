import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import type { Metadata } from "next";

// Simplify params typing (Promise form not required for generateMetadata) and
// rely on root metadataBase for resolving relative image URLs.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseFile = getCaseBySlug(params.slug);
  const titleBase = caseFile ? caseFile.title : "Case Not Found";
  const title = `${titleBase} | My Mystery Party`;
  const description = caseFile?.description || "Interactive mystery experience on My Mystery Party.";

  // Prefer dynamic composite FIRST so crawlers that only take the first image use it.
  // Provide static thumbnail as a fallback second.
  const ogImages = [
    {
      url: `/play/${params.slug}/opengraph-image`,
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
    `/play/${params.slug}/twitter-image`,
    caseFile?.imageUrl || `/play/${params.slug}/opengraph-image`,
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "My Mystery Party",
      url: `/play/${params.slug}`,
  images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
    alternates: { canonical: `/play/${params.slug}` },
  };
}

export default function PlaySlugLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen overflow-hidden bg-background">{children}</div>;
}
