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
const heroStatic = `${base}/hero_wideshot/woman-vanishing.png`;
const ogDynamic = `${base}/opengraph-image`;
const twitterDynamic = `${base}/twitter-image`;

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: "My Mystery Party – Unravel Every Mystery",
  description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
  openGraph: {
    type: "website",
    siteName: "My Mystery Party",
    url: base,
    title: "My Mystery Party – Unravel Every Mystery",
    description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
    images: [
      {
        url: heroStatic,
        secureUrl: heroStatic,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "My Mystery Party – Hero Image",
      },
      {
        url: ogDynamic,
        secureUrl: ogDynamic,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "My Mystery Party – Dynamic Open Graph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Mystery Party – Unravel Every Mystery",
    description: "Interactive case files. Collaborative sleuthing. New stories weekly.",
    images: [twitterDynamic, heroStatic],
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
