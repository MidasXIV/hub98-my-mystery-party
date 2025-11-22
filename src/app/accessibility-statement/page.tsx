import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to inclusive, accessible mystery experiences that meet evolving WCAG standards.",
  openGraph: {
    title: "Accessibility Statement | My Mystery Party",
    description: "hub98 Entertainment strives toward WCAG AA compliance and iterative accessibility improvements.",
  },
  twitter: {
    title: "Accessibility Statement | My Mystery Party",
    description: "hub98 Entertainment strives toward WCAG AA compliance and iterative accessibility improvements.",
  },
};

const lastUpdated = "November 22, 2025";

export default function AccessibilityStatementPage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Accessibility Statement</h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              We want <strong>My Mystery Party</strong> to be playable and enjoyable for as many people as possible. Accessibility is a continuing effort—especially during beta—and we welcome feedback.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Standards & Goals</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our target conformance level is WCAG 2.2 AA. Some areas may currently fall short while rapid iteration is underway (animation density, color contrast in edge cases, keyboard focus visuals). We triage accessibility issues alongside functional bugs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Current Focus Areas</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Keyboard navigation improvements for scrollable panels and modals.</li>
              <li>Providing reduced motion alternatives for heavy animation sections.</li>
              <li>Improved contrast for subtle UI affordances in dark mode.</li>
              <li>ARIA labeling for dynamic evidence & objective controls.</li>
              <li>Live-region patterns for asynchronous state changes (loading case data).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Assistive Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We test primarily in modern Chromium and Firefox browsers with screen reader spot checks (NVDA/VoiceOver). Broader assistive device testing will expand post-beta as feature volatility decreases.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Feedback & Accommodation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Need a reasonable accommodation or found a blocker? Email <a href="mailto:accessibility@mymystery.party" className="underline hover:opacity-80">accessibility@mymystery.party</a> or <a href="mailto:support@mymystery.party" className="underline hover:opacity-80">support@mymystery.party</a> with details (browser, device, assistive tech, steps). We prioritize systemic fixes over one-off workarounds.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Continuous Improvement</h2>
            <p className="text-muted-foreground leading-relaxed">
              As new cases introduce varied document formats (audio transcripts, scanned clippings, diagrams) we will expand accessible alternatives—structured text layers, alt descriptions, and adjustable contrast modes.
            </p>
          </section>

          <footer className="pt-8 text-xs opacity-60">© {new Date().getFullYear()} hub98 Entertainment.</footer>
        </div>
      </div>
      <Footer />
    </>
  );
}
