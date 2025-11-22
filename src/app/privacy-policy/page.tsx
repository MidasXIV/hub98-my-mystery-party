import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How My Mystery Party (hub98 Entertainment) collects, uses, and safeguards limited beta data.",
  openGraph: {
    title: "Privacy Policy | My Mystery Party",
    description:
      "Details on data handling, storage, and user privacy during the open beta phase.",
  },
  twitter: {
    title: "Privacy Policy | My Mystery Party",
    description:
      "Details on data handling, storage, and user privacy during the open beta phase.",
  },
};

const lastUpdated = "November 22, 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              This Privacy Policy explains how <strong>My Mystery Party</strong>
              , a hub98 Entertainment product, handles information during the
              open beta. We prioritize minimal data collection to deliver core
              gameplay while refining features.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              During beta we intentionally limit collection. We may process:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Basic technical data (browser type, device viewport, performance
                metrics).
              </li>
              <li>
                Anonymous usage events (feature clicks, panel opens) to improve
                UX.
              </li>
              <li>
                Optional feedback submissions (text you voluntarily provide).
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do <strong>not</strong> request or store sensitive personal
              identifiers (address, payment details) during open beta.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              2. Local Storage & Session Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Some progress (e.g., solved objectives, viewed evidence) may
              remain in your browser&#39;s local storage. Clearing browser data
              may reset this. Sync across devices is not yet available.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We currently avoid non-essential cookies. If analytics or
              authentication roll out later, a separate consent or banner may
              appear.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Operational tooling (deployment, analytics, email delivery) may
              process anonymized or aggregated usage patterns. These vendors are
              selected for security & modern compliance. They are restricted
              from selling or re-identifying collected data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              5. Children&#39;s Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The platform is not directed to children under 13. If we learn
              that underage data was submitted inadvertently we will remove it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We employ industry-standard hosting and transport security (TLS).
              As this is beta software, absolute security cannot be guaranteed;
              please report issues promptly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For details on reporting vulnerabilities, visit our {" "}
              <a
                href="/security-policy"
                className="underline hover:opacity-80"
              >
                Security &amp; Responsible Disclosure
              </a>{" "} page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Policy Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may revise this Policy as features evolve (accounts,
              purchases). Material updates will refresh the date above and may
              trigger an in-app notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions or data concerns? Reach us at{" "}
              <a
                href="mailto:privacy@mymystery.party"
                className="underline hover:opacity-80"
              >
                privacy@mymystery.party
              </a>{" "}
              or support@mymystery.party.
              {" "}Accessibility feedback? See our {" "}
              <a
                href="/accessibility-statement"
                className="underline hover:opacity-80"
              >
                Accessibility Statement
              </a>
            </p>
          </section>

          <footer className="pt-8 text-xs opacity-60">
            © {new Date().getFullYear()} hub98 Entertainment. All rights
            reserved.
          </footer>
        </div>
      </div>

      <Footer />
    </>
  );
}
