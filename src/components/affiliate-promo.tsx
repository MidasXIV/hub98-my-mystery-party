import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AffiliatePromo() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-muted/40 dark:bg-muted/10 border-y border-border">
      <div className="embossed-backdrop pointer-events-none select-none">IDEAS</div>
      <div className="relative max-w-5xl mx-auto grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Help shape our next mysteries.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            We&apos;re inviting creators, true-crime fans, and community organizers to pitch case ideas; from themes and settings to suspects, clues, and puzzle mechanics. Share what you&apos;d love to investigate and help guide upcoming releases. Thoughtful contributors may be credited in future cases.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Reserve a unique code (first come, first served)</li>
            <li>• Propose themes, locations, and time periods</li>
            <li>• Suggest clue types or puzzle mechanics</li>
            <li>• Share character concepts and backstories</li>
            <li>• Volunteer for early playtesting and feedback</li>
          </ul>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button asChild>
              <a href="mailto:support@mymystery.party?subject=Mystery%20Idea%20Suggestion">Email an Idea</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/roadmap">View Roadmap</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/affiliates">Affiliate Program</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Purchasing isn&apos;t live yet—community ideas help us prioritize and design upcoming cases.
          </p>
        </div>
        <div className="space-y-4 text-sm md:text-base bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-lg p-6 shadow-lg">
          <h3 className="font-medium text-lg">Who should apply?</h3>
          <p>
            Content creators, mystery puzzle communities, true crime discussion hosts, game night organizers, educators using narrative problem solving - anyone excited to help players step into an investigator role.
          </p>
          <h4 className="font-medium">Next milestones</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Collect and review community case pitches</li>
            <li>Host concept votes to prioritize ideas</li>
            <li>Open playtest sign-ups for early builds</li>
            <li>Credit contributors in released cases</li>
          </ol>
          <p className="text-xs text-muted-foreground">Questions? Email <span className="font-mono">support@mymystery.party</span></p>
        </div>
      </div>
    </section>
  );
}
