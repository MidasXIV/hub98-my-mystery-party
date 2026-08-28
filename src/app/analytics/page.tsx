import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import CaseAnalyticsRowItem from "@/components/admin/case-analytics-row";
import Footer from "@/components/footer";
import { coldCases } from "@/data/coldCases";
import { buildCaseAnalytics } from "@/lib/case-analytics";
import {
  normalizePlayerProgressMetadata,
  PLAYER_PROGRESS_PUBLIC_METADATA_KEY,
  type PlayerProgressPublicMetadata,
} from "@/lib/player-progress";

export const metadata: Metadata = {
  title: "Case Analytics",
  description:
    "Case-wise analytics across player progress metadata: attempts, objective completion, and time spent.",
};

const MIN_PLAYERS_FOR_DISTRIBUTION = 3;

function parseAllowedUserIds(): Set<string> {
  const raw = process.env.ANALYTICS_ALLOWED_USER_IDS;
  if (!raw) return new Set();

  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0),
  );
}

function formatMinutes(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0m";

  if (minutes < 60) {
    return `${minutes.toFixed(1)}m`;
  }

  const hours = minutes / 60;
  return `${hours.toFixed(2)}h`;
}

async function loadAllPlayerProgressMetadata(): Promise<PlayerProgressPublicMetadata[]> {
  const client = await clerkClient();
  const batchSize = 100;
  let offset = 0;
  const records: PlayerProgressPublicMetadata[] = [];

  while (true) {
    const result = await client.users.getUserList({
      limit: batchSize,
      offset,
    });

    const users = Array.isArray(result) ? result : result.data;

    for (const user of users) {
      const metadata = normalizePlayerProgressMetadata(
        user.publicMetadata?.[PLAYER_PROGRESS_PUBLIC_METADATA_KEY],
      );
      records.push(metadata);
    }

    offset += users.length;
    const totalCount = Array.isArray(result) ? null : result.totalCount;

    if (users.length < batchSize) {
      break;
    }

    if (typeof totalCount === "number" && offset >= totalCount) {
      break;
    }
  }

  return records;
}

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <>
        <main className="min-h-screen px-4 pt-36 pb-24">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-border/60 bg-background/80 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Case Analytics</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              You need to sign in before viewing analytics.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
              >
                Go home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const allowedUserIds = parseAllowedUserIds();
  const analyticsAllowlistConfigured = allowedUserIds.size > 0;
  const isAllowlisted = allowedUserIds.has(userId);

  if (!analyticsAllowlistConfigured || !isAllowlisted) {
    return (
      <>
        <main className="min-h-screen px-4 pt-36 pb-24">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-amber-300/40 bg-amber-500/10 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Case Analytics</h1>
            <p className="mt-4 text-sm text-amber-900 dark:text-amber-200">
              Analytics access is restricted. Add your signed-in Clerk user ID to
              <code className="mx-1 rounded bg-black/10 px-1 py-0.5">ANALYTICS_ALLOWED_USER_IDS</code>
              to enable this page.
            </p>
            <p className="mt-3 text-xs text-amber-800/80 dark:text-amber-200/80">
              Current mode: {analyticsAllowlistConfigured ? "allowlist configured" : "allowlist missing"}
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  let metadataRecords: PlayerProgressPublicMetadata[] = [];
  let loadError: string | null = null;

  try {
    metadataRecords = await loadAllPlayerProgressMetadata();
  } catch {
    loadError =
      "Could not load Clerk user data. Check Clerk backend credentials and permissions for server-side user listing.";
  }

  const analytics = buildCaseAnalytics(coldCases, metadataRecords);
  const casePosterBySlug = new Map(
    coldCases.map((caseFile) => [caseFile.slug, caseFile.imageUrl]),
  );

  return (
    <>
      <main className="min-h-screen px-4 pt-32 pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Case Analytics</h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
              Case-wise insights from player progress metadata. Metrics include player attempts,
              objective completion, and estimated time spent between first and last play timestamps.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Generated at: {new Date(analytics.generatedAt).toLocaleString()}
            </p>
          </header>

          {loadError ? (
            <div className="mb-8 rounded-2xl border border-red-300/40 bg-red-500/10 p-4 text-sm text-red-900 dark:text-red-200">
              {loadError}
            </div>
          ) : null}

          <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <article className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Tracked players</p>
              <p className="mt-2 text-2xl font-bold">{analytics.summary.trackedPlayers}</p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Players with progress</p>
              <p className="mt-2 text-2xl font-bold">{analytics.summary.playersWithProgress}</p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Case attempts</p>
              <p className="mt-2 text-2xl font-bold">{analytics.summary.totalCaseAttempts}</p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg time / attempt</p>
              <p className="mt-2 text-2xl font-bold">
                {formatMinutes(analytics.summary.averageMinutesSpentPerCaseAttempt)}
              </p>
            </article>
          </section>

          <section className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
            <table className="min-w-[1080px] w-full text-sm">
              <thead className="border-b border-border/60 bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Case</th>
                  <th className="px-4 py-3 text-right font-semibold">Attempted</th>
                  <th className="px-4 py-3 text-right font-semibold">Completion</th>
                  <th className="px-4 py-3 text-right font-semibold">Avg time</th>
                  <th className="px-4 py-3 text-left font-semibold">Solved mix (0 / 1 / 2+)</th>
                  <th className="px-4 py-3 text-right font-semibold">Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {analytics.rows.map((row) => (
                  <CaseAnalyticsRowItem
                    key={row.caseSlug}
                    row={row}
                    casePoster={casePosterBySlug.get(row.caseSlug)}
                    minPlayersForDistribution={MIN_PLAYERS_FOR_DISTRIBUTION}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
