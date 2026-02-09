import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Security & Responsible Disclosure",
  description:
    "How to report security issues responsibly and what to expect during the My Mystery Party beta.",
  openGraph: {
    title: "Security & Responsible Disclosure | My Mystery Party",
    description:
      "How to report security issues responsibly and what to expect during the My Mystery Party beta.",
  },
  twitter: {
    title: "Security & Responsible Disclosure | My Mystery Party",
    description:
      "How to report security issues responsibly and what to expect during the My Mystery Party beta.",
  },
};

const lastUpdated = "November 22, 2025";

export default function SecurityPolicyPage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Security &amp; Responsible Disclosure
            </h1>
            <p className="text-sm opacity-70">Last updated: {lastUpdated}</p>
            <p className="text-lg text-muted-foreground max-w-prose">
              Thanks for helping keep My Mystery Party safe. If you believe you’ve
              found a security issue, please report it privately so we can fix it.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to report</h2>
            <p className="text-muted-foreground leading-relaxed">
              Email details to{" "}
              <a
                href="mailto:security@mymystery.party"
                className="underline hover:opacity-80"
              >
                security@mymystery.party
              </a>
              {" "}including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Steps to reproduce</li>
              <li>Impact assessment (what could an attacker do?)</li>
              <li>Any suggested fix or mitigation</li>
              <li>Screenshots/recordings if helpful</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Please don’t</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Publicly disclose issues before we’ve had time to respond</li>
              <li>Access other users’ data</li>
              <li>Run disruptive tests (e.g., DDoS, spam, brute force)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">More detail</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Terms of Service include additional beta-era security and
              disclosure notes in Appendix B.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
