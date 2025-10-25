"use client";
import gsap from "gsap";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono, Blinker } from "next/font/google";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./globals.css";

import Header from "../components/header";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const blinkerFont = Blinker({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-blinker",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideGlobalHeader = pathname.startsWith("/play/");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${blinkerFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!hideGlobalHeader && <Header />}
          <div id="smooth-content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
