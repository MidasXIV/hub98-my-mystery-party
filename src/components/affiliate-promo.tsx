import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AffiliatePromo() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-muted/40 dark:bg-muted/10 border-y border-border">
      <div className="embossed-backdrop pointer-events-none select-none">AFFILIATE</div>
      <div className="relative max-w-5xl mx-auto grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Earn by helping others investigate.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Our affiliate program is opening early for creators, true-crime fans, and community organizers. Apply now to reserve your custom referral code before purchasing launches. Commission tiers will reward early adopters and consistent case solvers.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Reserve a unique code (first come, first served)</li>
            <li>• Higher intro commission for early partners</li>
            <li>• Dashboard with clicks & conversions (coming soon)</li>
            <li>• Promote on video, streams, newsletters, forums</li>
          </ul>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/affiliates">Apply to Program</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/roadmap">View Roadmap</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Purchasing isn&apos;t live yet—applications help us shape launch priorities.
          </p>
        </div>
        <div className="space-y-4 text-sm md:text-base bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-lg p-6 shadow-lg">
          <h3 className="font-medium text-lg">Who should apply?</h3>
          <p>
            Content creators, mystery puzzle communities, true crime discussion hosts, game night organizers, educators using narrative problem solving—anyone excited to help players step into an investigator role.
          </p>
          <h4 className="font-medium">Next milestones</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Finalize purchase flow</li>
            <li>Release affiliate dashboards</li>
            <li>Activate commission payouts</li>
            <li>Introduce seasonal bonus cases</li>
          </ol>
          <p className="text-xs text-muted-foreground">Questions? Email <span className="font-mono">affiliates@my-mystery-party.test</span></p>
        </div>
      </div>
    </section>
  );
}
