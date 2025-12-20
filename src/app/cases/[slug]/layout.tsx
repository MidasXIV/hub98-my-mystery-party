import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const resolved = params instanceof Promise ? await params : params;
  const slug = resolved.slug;
  const caseFile = getCaseBySlug(slug);
  const titleBase = caseFile ? caseFile.title : "Case Not Found";
  const title = `${titleBase} | Cold Case File`;
  const description =
    caseFile?.description ||
    "Interactive mystery experience on My Mystery Party.";

  const ogImages = [
    {
      url: `/cases/${slug}/opengraph-image`,
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
    `/cases/${slug}/twitter-image`,
    caseFile?.imageUrl || `/cases/${slug}/opengraph-image`,
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "My Mystery Party",
      url: `/cases/${slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
    alternates: { canonical: `/cases/${slug}` },
  };
}

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
