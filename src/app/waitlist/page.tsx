import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import WaitlistSignupForm from "@/components/waitlist-signup-form";

export const metadata = {
  title: "Waitlist • My Mystery Party",
  description:
    "Join the beta waitlist for early access perks and behind-the-scenes updates.",
};

export default function WaitlistPage() {
  return (
    <div className="bg-background text-text-primary">
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              Beta Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Join the Waitlist.
              <span className="block text-muted-foreground">Get perks, drops, and early access.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              We’re building new cold cases, investigation tools, and party-ready experiences.
              Join the waitlist and we’ll email you when the next beta releases go live.
            </p>

            <div className="rounded-xl border border-border bg-card/60 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Get notified</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Drop your email. We’ll only message you for beta drops and major launches.
              </p>
              <div className="mt-4">
                <WaitlistSignupForm />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/roadmap">View the roadmap</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/affiliates">Creator/partner?</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Right now the waitlist stores signups via a minimal server action (for beta). We can wire it to your email provider next.
            </p>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Exclusive perks (beta)</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <li className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <span className="font-medium text-foreground">Early case drops</span> before they hit the main menu.
                </li>
                <li className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <span className="font-medium text-foreground">Prototype tools</span> (board upgrades, evidence filters, quality-of-life).
                </li>
                <li className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <span className="font-medium text-foreground">Feedback loop</span> — tell us what to build next.
                </li>
                <li className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <span className="font-medium text-foreground">Member-only surprises</span> when we launch.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-br from-background via-muted/20 to-background p-6">
              <h3 className="text-lg font-semibold">Want to help shape it?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vote on features and see what’s actively in progress.
              </p>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/roadmap">Go to Roadmap →</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
