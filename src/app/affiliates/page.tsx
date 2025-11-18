import AffiliateSignupForm from "@/components/affiliate-signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Interest (Quiet Early Access) | My Mystery Party",
  description: "Low-key early access interest form for potential future referral experiments.",
  openGraph: {
    title: "Referral Interest – My Mystery Party",
    description: "Request quiet early access – no guarantees, just exploratory.",
  },
};

export default function AffiliatesPage() {
  return (
    <div className="relative py-16 px-4 sm:px-8">
      {/* Background embossed word */}
      <div className="embossed-backdrop select-none">AFFILIATE</div>
      <div className="relative max-w-3xl mx-auto space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">Referral Interest (Quiet)</h1>
          <p className="text-muted-foreground leading-relaxed max-w-prose">
            This is an exploratory interest form—not a formal affiliate launch. We&apos;re selectively gathering potential partners who create authentic investigative or mystery content. Nothing here guarantees codes, payouts, dashboards, or timelines.
          </p>
        </header>
        <section>
          <h2 className="text-lg font-medium mb-3">Request Early Consideration</h2>
          <AffiliateSignupForm />
        </section>
        <section className="border border-border rounded-lg p-6 bg-white/60 dark:bg-black/30 backdrop-blur-md space-y-3 text-sm">
          <h3 className="font-medium text-base">Important Notes</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>This is a quiet exploratory list; we may never formalize it.</li>
            <li>No guaranteed codes, payouts, timing, or access.</li>
            <li>We may reach out privately before anything goes public.</li>
            <li>Submitting helps us understand potential collaboration interest only.</li>
          </ul>
          <p className="text-xs text-muted-foreground">Questions? Reach out (low volume inbox): <span className="font-mono">affiliates@my-mystery-party.test</span></p>
        </section>
      </div>
    </div>
  );
}
