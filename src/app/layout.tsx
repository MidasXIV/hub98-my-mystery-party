import "./globals.css";
import { Geist, Geist_Mono, Blinker } from "next/font/google";
import type { Metadata, Viewport } from "next";
import RootClient from "../components/root-client";

// Server-side font declarations
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const blinkerFont = Blinker({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-blinker" });

function getBase() {
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
  const site = process.env.NEXT_PUBLIC_SITE_URL || vercelHost || "https://hub98-my-mystery-party.vercel.app";
  return site.replace(/\/$/, "");
}

const base = getBase();
// NOTE: Root-level OG/Twitter images removed to prevent precedence over route-level
// dynamic images (e.g. /play/[slug]/opengraph-image). Individual pages now fully
// control their own image arrays. Provide only fallback twitter image as needed.
const twitterDynamic = `${base}/twitter-image`;

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "My Mystery Party – Unravel Every Mystery",
    template: "%s | My Mystery Party",
  },
  description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
  // NOTE: Intentionally omitting openGraph.images at the root to ensure
  // segment-level generateMetadata (cases/play) fully controls image order.
  // Root page will define its own images via generateMetadata in page.tsx.
  openGraph: {
    type: "website",
    siteName: "My Mystery Party",
    url: base,
    title: "My Mystery Party – Unravel Every Mystery",
    description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Mystery Party – Unravel Every Mystery",
    description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
    // Provide only a generic fallback; route-level metadata will override with specific images.
    images: [twitterDynamic],
  },
  alternates: { canonical: base },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${blinkerFont.variable} antialiased`}>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
