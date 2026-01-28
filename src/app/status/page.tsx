import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live system status for My Mystery Party services (site, AI checks, and more).",
};

type ServiceStatus =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage";

type StatusComponent = {
  id: string;
  name: string;
  description?: string;
  status: ServiceStatus;
  /** Human-readable explanation shown only during incidents. */
  reason?: string;
};

function statusLabel(status: ServiceStatus) {
  switch (status) {
    case "operational":
      return "Operational";
    case "degraded":
      return "Degraded";
    case "partial_outage":
      return "Partial outage";
    case "major_outage":
      return "Major outage";
  }
}

function statusPillClasses(status: ServiceStatus) {
  // Keep these readable in both themes.
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-tight";

  switch (status) {
    case "operational":
      return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300`;
    case "degraded":
      return `${base} border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300`;
    case "partial_outage":
      return `${base} border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300`;
    case "major_outage":
      return `${base} border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300`;
  }
}

function statusDotClasses(status: ServiceStatus) {
  const base = "h-2.5 w-2.5 rounded-full";
  switch (status) {
    case "operational":
      return `${base} bg-emerald-500`;
    case "degraded":
      return `${base} bg-amber-500`;
    case "partial_outage":
      return `${base} bg-orange-500`;
    case "major_outage":
      return `${base} bg-red-500`;
  }
}

function overallStatus(components: StatusComponent[]): ServiceStatus {
  const rank: Record<ServiceStatus, number> = {
    operational: 0,
    degraded: 1,
    partial_outage: 2,
    major_outage: 3,
  };

  return components.reduce<ServiceStatus>((worst, c) => {
    return rank[c.status] > rank[worst] ? c.status : worst;
  }, "operational");
}

export default function StatusPage() {
  // For now this is a static snapshot (easy to ship).
  // Next step: wire `status` to live health checks in an API route.
  const components: StatusComponent[] = [
    {
      id: "site",
      name: "Website",
      description: "Main site and pages.",
      status: "operational",
    },
    {
      id: "ai-objective-checking",
      name: "AI Objective Checking",
      description: "Automated case objective validation.",
      status: "partial_outage",
      reason:
        "Some requests are failing or timing out while we investigate an upstream dependency.",
    },
    {
      id: "case-files",
      name: "Cold Case Content",
      description: "Case files, evidence, and downloads.",
      status: "operational",
    },
  ];

  const impacted = components.filter((c) => c.status !== "operational");

  const overall = overallStatus(components);
  const allOperational = impacted.length === 0;

  return (
    <>
      <main className="relative min-h-screen px-4 pt-36 md:pt-40 pb-28">
        {/* Subtle grid + vignette to avoid the page feeling flat/pale */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            backgroundPosition: "-2px -2px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 65%)",
          }}
        />

        <div className="mx-auto w-full max-w-5xl">
          <header className="relative overflow-hidden border-b border-border pb-8">
            <div aria-hidden className="embossed-backdrop">
              STATUS
            </div>

            <h1 className="relative text-4xl md:text-5xl font-bold tracking-tight">
              Status
            </h1>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground max-w-2xl">
                {allOperational
                  ? "Everything is working."
                  : "Some parts of the site are having issues."}
              </p>
              <div className="flex items-center gap-3">
                <span className={statusDotClasses(overall)} aria-hidden />
                <span className={statusPillClasses(overall)}>
                  {allOperational ? "All good" : statusLabel(overall)}
                </span>
              </div>
            </div>
          </header>

          <div className="mt-10">
            {allOperational ? (
              <div className="border-t border-border pt-8">
                <p className="text-sm text-muted-foreground">
                  No problems right now.
                </p>
              </div>
            ) : (
              <section aria-label="Current issues" className="border-t border-border">
                {impacted.map((c) => (
                  <div key={c.id} className="py-8 border-b border-border">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={statusDotClasses(c.status)} aria-hidden />
                          <h2 className="text-xl font-semibold">{c.name}</h2>
                        </div>
                        {c.description ? (
                          <p className="text-sm text-muted-foreground">
                            {c.description}
                          </p>
                        ) : null}
                      </div>
                      <div className={statusPillClasses(c.status)}>
                        {statusLabel(c.status)}
                      </div>
                    </div>

                    {c.reason ? (
                      <p className="mt-4 text-sm">
                        <span className="font-semibold">What’s going on:</span>{" "}
                        <span className="text-muted-foreground">{c.reason}</span>
                      </p>
                    ) : null}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              If you think something is broken, email{" "}
              <a
                className="underline underline-offset-4 hover:opacity-80"
                href="mailto:support@mymystery.party"
              >
                support@mymystery.party
              </a>
              .
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
