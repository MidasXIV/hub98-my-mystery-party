import "./globals.css";
import {
  Geist,
  Geist_Mono,
  Blinker,
  Special_Elite,
  Staatliches,
  Kalam,
} from "next/font/google";
import type { Metadata, Viewport } from "next";
import RootClient from "../components/root-client";
import HeaderClientSlot from "../components/header-client-slot";
import Header from "../components/header";
import type { GuidesMenuPayload } from "../components/header-guides-menu";
import { getAllPosts, getCategories } from "../lib/blog";
import { ThemeProvider } from "../components/theme-provider";

// Server-side font declarations
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const blinkerFont = Blinker({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-blinker",
});
// Decorative / thematic fonts (handwritten / display)
// Each of these fonts is single-style; specify explicit weights required by types
const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});
const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-staatliches",
});
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

function getBase() {
  const vercelHost = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    vercelHost ||
    "https://hub98-my-mystery-party.vercel.app";
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
  description:
    "Interactive case files. Collaborative sleuthing. New stories weekly.",
  // NOTE: Intentionally omitting openGraph.images at the root to ensure
  // segment-level generateMetadata (cases/play) fully controls image order.
  // Root page will define its own images via generateMetadata in page.tsx.
  openGraph: {
    type: "website",
    siteName: "My Mystery Party",
    url: base,
    title: "My Mystery Party – Unravel Every Mystery",
    description:
      "Interactive case files. Collaborative sleuthing. New stories weekly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Mystery Party – Unravel Every Mystery",
    description:
      "Interactive case files. Collaborative sleuthing. New stories weekly.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guidesData: GuidesMenuPayload = {
    categories: getCategories(),
    featured: getAllPosts()
      .slice(0, 3)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        heroImage: p.heroImage,
      })),
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="p:domain_verify"
          content="9a25a6bb9453f23e496ad1750b3fe069"
        />
        <meta name="msvalidate.01" content="FEC44A25DD8E4802152191B8C1CB3BC9" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${blinkerFont.variable} ${specialElite.variable} ${staatliches.variable} ${kalam.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderClientSlot>
            <Header guidesData={guidesData} />
          </HeaderClientSlot>
          <RootClient>{children}</RootClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
