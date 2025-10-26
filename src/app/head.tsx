import React from "react";

// Root <head> for metadata & social cards. Using head.tsx since current layout/page are client components.
// If later converting layout to a Server Component, move this into export const metadata.

const SITE_TITLE = "My Mystery Party – Unravel Every Mystery";
const SITE_DESCRIPTION = "Interactive case files. Collaborative sleuthing. New stories weekly.";
const SITE_ALT = "My Mystery Party – Interactive Mystery Cases";

function getBaseUrl() {
  // Prefer explicit environment override
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  // Fallback placeholder (update with production domain)
  return process.env.VERCEL_URL;
}

export default function Head() {
  const base = getBaseUrl();
  const ogImage = `${base}/opengraph-image`;
  const twitterImage = `${base}/twitter-image`;
  return (
    <>
      <title>{SITE_TITLE}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="My Mystery Party" />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_ALT} />
      {/* Provide second image reference (some crawlers pick first) */}
      <meta property="og:image" content={twitterImage} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SITE_TITLE} />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={SITE_ALT} />
      {/* Theme / misc */}
      <meta name="theme-color" content="#000000" />
    </>
  );
}
