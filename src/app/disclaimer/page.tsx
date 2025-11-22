import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "General informational and fictional content disclaimer for My Mystery Party.",
  openGraph: {
    title: "Disclaimer | My Mystery Party",
    description: "Important disclaimers about fictionalization and non-professional content.",
  },
  twitter: {
    title: "Disclaimer | My Mystery Party",
    description: "Important disclaimers about fictionalization and non-professional content.",
  },
};

const lastUpdated = "November 22, 2025";

export default function DisclaimerPage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Disclaimer</h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              The experiences, case files, evidence items, and narrative elements provided within <strong>My Mystery Party</strong> are designed for entertainment. They do not constitute professional advice (legal, medical, forensic, psychological) and should not be relied upon as such.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Fictional & Fictionalized Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Stories may be wholly fictional or inspired by generalized true-crime patterns. Any resemblance to actual persons, living or dead, or real incidents is purely coincidental. We avoid using real-world victim or suspect names intentionally.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">No Real Investigations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gameplay mechanics, deduction tools, and analysis interfaces are abstractions. They are not formal investigative tools and should not be used outside the platform for real cases.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">User Decisions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Choices made during play (suspect identification, motive theory, timeline reconstruction) have no consequences beyond game progress. They do not represent factual determinations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              External references or links (if any) are provided for thematic or contextual flavor. We do not endorse or guarantee third-party content and are not responsible for its accuracy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about this disclaimer? Reach us at <a href="mailto:support@mymystery.party" className="underline hover:opacity-80">support@mymystery.party</a>.
            </p>
          </section>

          <footer className="pt-8 text-xs opacity-60">© {new Date().getFullYear()} hub98 Entertainment.</footer>
        </div>
      </div>
      <Footer />
    </>
  );
}
