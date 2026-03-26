export function getBaseSiteUrl() {
  const vercelHost = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    vercelHost ||
    "https://hub98-my-mystery-party.vercel.app";

  return site.replace(/\/$/, "");
}

export function getMetadataBase() {
  return new URL(getBaseSiteUrl());
}
