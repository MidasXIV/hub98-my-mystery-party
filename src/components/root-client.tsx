"use client";
import React from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Header from "./header";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import RoadmapPreview from "./roadmap-preview";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function RootClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGlobalHeader = pathname.startsWith("/play/") || pathname.startsWith("/print/");
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* Beta banner (skip /play and /print where we want max space) */}
      {!hideGlobalHeader && (
        <div className="sticky top-0 z-50 w-full">
          <Banner variant="border" size="sm" className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex w-full flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                Beta
              </span>
              <p className="text-sm text-muted-foreground">
                We’re actively building. Check the roadmap for what’s next, or join the waitlist for early perks.
              </p>
              <div className="ml-auto flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/roadmap">View roadmap</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/waitlist">Join waitlist</Link>
                </Button>
              </div>
            </div>
          </Banner>
        </div>
      )}

      {/* Roadmap preview ribbon (shows even when header hidden? Keep consistent with header visibility) */}
      {/* {!hideGlobalHeader && <RoadmapPreview />} */}
      {!hideGlobalHeader && <Header />}
      <div id="smooth-content">{children}</div>
      <Analytics />
    </ThemeProvider>
  );
}
