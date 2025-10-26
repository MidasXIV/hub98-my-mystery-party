"use client";
import React from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Header from "./header";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function RootClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGlobalHeader = pathname.startsWith("/play/");
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!hideGlobalHeader && <Header />}
      <div id="smooth-content">{children}</div>
      <Analytics />
    </ThemeProvider>
  );
}
