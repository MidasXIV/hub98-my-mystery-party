import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Plain-language rules for using My Mystery Party responsibly during beta and beyond.",
  openGraph: {
    title: "Acceptable Use Policy | My Mystery Party",
    description:
      "Plain-language rules for using My Mystery Party responsibly during beta and beyond.",
  },
  twitter: {
    title: "Acceptable Use Policy | My Mystery Party",
    description:
      "Plain-language rules for using My Mystery Party responsibly during beta and beyond.",
  },
};

const lastUpdated = "November 22, 2025";

export default function AcceptableUsePage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Acceptable Use Policy
            </h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              This policy describes how you may (and may not) use My Mystery Party.
              It’s intended to keep the experience fair, safe, and reliable for
              everyone.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">The short version</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Don’t attack, overload, or probe the site or infrastructure.</li>
              <li>Don’t scrape or bulk-extract content without permission.</li>
              <li>Don’t upload/transmit malicious code or abusive content.</li>
              <li>Don’t impersonate others or misrepresent your identity.</li>
              <li>Respect the story content and creators’ rights.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Related policies</h2>
            <p className="text-muted-foreground leading-relaxed">
              For the complete legal terms (including a consolidated appendix and
              additional detail), see our{" "}
              <Link href="/terms-of-service" className="underline hover:opacity-80">
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Questions</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you’re unsure whether something is allowed, email{" "}
              <a
                className="underline hover:opacity-80"
                href="mailto:support@mymystery.party"
              >
                support@mymystery.party
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
