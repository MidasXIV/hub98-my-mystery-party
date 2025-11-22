import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Core terms plus consolidated acceptable use, security disclosure, and copyright (DMCA) policies.",
  openGraph: {
    title: "Terms of Service | My Mystery Party",
    description:
      "Understand the rules and conditions for using My Mystery Party during beta and beyond.",
  },
  twitter: {
    title: "Terms of Service | My Mystery Party",
    description:
      "Understand the rules and conditions for using My Mystery Party during beta and beyond.",
  },
};

const lastUpdated = "November 22, 2025";

export default function TermsOfServicePage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              Welcome to <strong>My Mystery Party</strong>, a hub98
              Entertainment product. By accessing or using the platform you
              agree to these Terms. If you do not agree, you may not use the
              Service.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Beta Status</h2>
            <p className="text-muted-foreground leading-relaxed">
              The platform is currently in open beta. Features may change,
              disappear, or reset without notice. We may modify or discontinue
              parts of the Service at any time. Feedback you provide can be used
              to improve the experience without obligation or attribution.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Acceptable Use</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                No automated scraping, reverse engineering, or unauthorized data
                extraction.
              </li>
              <li>
                No attempts to disrupt, overload, or probe the platform or
                infrastructure.
              </li>
              <li>
                No posting or transmitting malicious code or abusive content.
              </li>
              <li>Do not misrepresent your identity or impersonate others.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For a plain-language summary see our {" "}
              <a
                href="/acceptable-use"
                className="underline hover:opacity-80"
              >
                Acceptable Use Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Accounts & Access</h2>
            <p className="text-muted-foreground leading-relaxed">
              Account-based multiplayer and persistent profiles may roll out
              later. Until then, gameplay progress may be stored locally
              (browser storage) and not guaranteed to persist across devices or
              clearing of cache.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All narrative content, case files, puzzles, artwork, UI, and
              underlying technology are owned or licensed by hub98
              Entertainment. You are granted a limited, revocable,
              non-transferable right to access and interact with the Service for
              personal entertainment only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              5. Third-Party Links & Integrations
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              External links (social, newsletter tools, analytics) may appear.
              We are not responsible for the content, privacy, or practices of
              external services. Use them at your discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; DURING BETA WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. CASE CONTENT IS FICTIONAL OR FICTIONALIZED; ANY RESEMBLANCE TO REAL EVENTS OR PERSONS IS COINCIDENTAL. NOTHING HERE CONSTITUTES PROFESSIONAL LEGAL, MEDICAL, FORENSIC, OR PSYCHOLOGICAL ADVICE. SEE OUR {" "}
              <a href="/disclaimer" className="underline hover:opacity-80">Disclaimer</a> {" "}
              for an accessible summary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law hub98 Entertainment shall
              not be liable for indirect, incidental, special, consequential, or
              punitive damages, or any loss of data, use, or goodwill arising
              from use of the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms periodically. Continued use after
              changes become effective constitutes acceptance. Material changes
              will be noted by updating the revision date above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions? Reach us at{" "}
              <a
                href="mailto:support@mymystery.party"
                className="underline hover:opacity-80"
              >
                support@mymystery.party
              </a>
              .
            </p>
          </section>

          <footer className="pt-8 text-xs opacity-60">
            © {new Date().getFullYear()} hub98 Entertainment. All rights
            reserved.
          </footer>
          <div className="space-y-16 pt-16 border-t border-border">
            <section className="space-y-4" id="appendix-acceptable-use">
              <h2 className="text-2xl font-semibold">Appendix A – Acceptable Use Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                This appendix provides a concise overview of platform behavior expectations. It does not replace the Terms but supplements section 2.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="font-semibold">Be Fair</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>No exploiting bugs or logic flaws for unintended advantage.</li>
                    <li>No automated scraping of case content or system endpoints.</li>
                    <li>No tampering to access unreleased features.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Protect Integrity</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>Don’t probe infrastructure outside responsible disclosure process.</li>
                    <li>No malicious scripts, payloads, or obfuscated injection attempts.</li>
                    <li>Respect emerging rate limits & resource boundaries.</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Be Respectful</h3>
                <p className="text-muted-foreground text-sm">
                  Hateful, harassing, or defamatory conduct will result in restriction once accounts / communication features launch.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Unsure if something is allowed? Contact <a href="mailto:support@mymystery.party" className="underline hover:opacity-80">support@mymystery.party</a> before proceeding.
              </p>
            </section>

            <section className="space-y-4" id="appendix-security">
              <h2 className="text-2xl font-semibold">Appendix B – Security & Responsible Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                While in beta we apply a pragmatic, risk-based approach prioritizing issues affecting data confidentiality, content integrity, and availability.
              </p>
              <h3 className="font-semibold">Current Measures</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                <li>HTTPS/TLS transport security.</li>
                <li>Scoped server-side secrets; none embedded in client bundles.</li>
                <li>Minimal data retention (mostly ephemeral play state).</li>
                <li>Dependency monitoring for known vulnerabilities.</li>
                <li>Incremental validation & sanitization for interactive inputs.</li>
              </ul>
              <h3 className="font-semibold">Reporting</h3>
              <p className="text-muted-foreground text-sm">
                Email clear, private reports to <a href="mailto:security@mymystery.party" className="underline hover:opacity-80">security@mymystery.party</a> with reproduction steps, impact, and mitigation ideas. Avoid public disclosure prior to remediation.
              </p>
              <h3 className="font-semibold">Out of Scope (Beta)</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                <li>Mass-volume DoS (auto-scaling tuning in progress).</li>
                <li>Legacy browser quirks (we target current stable releases).</li>
                <li>Self‑XSS requiring user-driven console injection.</li>
              </ul>
              <h3 className="font-semibold">Future Enhancements</h3>
              <p className="text-muted-foreground text-sm">
                Planned: stronger rate limiting, session lifecycle controls, MFA (post account rollout), expanded content integrity checks, structured moderation audit logs.
              </p>
            </section>

            <section className="space-y-4" id="appendix-dmca">
              <h2 className="text-2xl font-semibold">Appendix C – Copyright / DMCA Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Platform content (stories, puzzles, artwork, UI code) is protected by copyright. Unauthorized reproduction or distribution is prohibited.
              </p>
              <h3 className="font-semibold">Takedown Notices</h3>
              <p className="text-muted-foreground text-sm">
                Send claims to <a href="mailto:copyright@mymystery.party" className="underline hover:opacity-80">copyright@mymystery.party</a> including: contact info; identification of the work; identification of allegedly infringing material (URL/description); good‑faith statement; accuracy + authority statement under penalty of perjury; signature.
              </p>
              <h3 className="font-semibold">Counter Notices</h3>
              <p className="text-muted-foreground text-sm">
                Provide identification of removed material, good‑faith belief of mistake, consent to jurisdiction, and contact details. We may restore unless original complainant seeks a court order.
              </p>
              <h3 className="font-semibold">Repeat Infringers</h3>
              <p className="text-muted-foreground text-sm">
                We may restrict future account access for repeat infringement once account systems launch.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
