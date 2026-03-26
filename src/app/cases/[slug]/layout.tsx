import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import type { Metadata } from "next";
import { getMetadataBase } from "@/lib/metadata-base";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const resolved = params instanceof Promise ? await params : params;
  const slug = resolved.slug;
  const caseFile = getCaseBySlug(slug);
  const titleBase = caseFile?.seoTitle || caseFile?.title || "Case Not Found";
  const title = `${titleBase} | Cold Case File`;
  const description =
    caseFile?.seoDescription ||
    caseFile?.shortDescription ||
    caseFile?.description ||
    "Interactive mystery experience on My Mystery Party.";

  return {
    metadataBase,
    title,
    description,
    keywords: caseFile?.seoKeywords,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "My Mystery Party",
      url: `/cases/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
