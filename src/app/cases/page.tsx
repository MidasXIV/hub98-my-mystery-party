import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import CaseCard from "@/components/case-card";
import CasesFilterGrid from "@/components/cases-filter-grid";
import Footer from "@/components/footer";
import {
  buildBadgeSummary,
  buildCaseRows,
  getCatalogCases,
  getSeriesPartLabel,
  mergeProgressWithCatalog,
  MIN_CASES_FOR_ROW,
  normalizeUserCaseProgress,
} from "@/lib/case-discovery";
import {
  normalizePlayerProgressMetadata,
  PLAYER_PROGRESS_PUBLIC_METADATA_KEY,
} from "@/lib/player-progress";

export const metadata = {
  title: "All Cold Case Files | Mystery Party",
  description:
    "Browse all immersive cold case investigation games and pick your next challenge.",
};

function getObjectiveCountFromEvidence(evidence: unknown): number | null {
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return null;
  }

  const maybeObjectives = (evidence as { objectives?: unknown }).objectives;
  if (!Array.isArray(maybeObjectives)) return null;

  return maybeObjectives.length;
}

function CaseRow({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: import("react").ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-block h-5 w-1 rounded-full border border-emerald-300/30 bg-emerald-500/40" />
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              {title}
            </h2>
          </div>
          {subtitle ? (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div
        className="flex overflow-x-auto space-x-6 md:space-x-8 pb-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {children}
      </div>
    </section>
  );
}

export default async function CasesIndexPage() {
  const allCases = getCatalogCases();
  const { userId } = await auth();

  let mergedProgress = mergeProgressWithCatalog("guest", [], allCases);

  if (userId) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = normalizePlayerProgressMetadata(
      user.publicMetadata?.[PLAYER_PROGRESS_PUBLIC_METADATA_KEY],
    );
    const normalized = normalizeUserCaseProgress(userId, metadata);
    mergedProgress = mergeProgressWithCatalog(userId, normalized, allCases);
  }

  const rows = buildCaseRows(allCases, mergedProgress);
  const badgeSummary = buildBadgeSummary(allCases, mergedProgress);
  const starterCase = rows.startHereRow.cases[0];
  const progressByCaseId = new Map(
    mergedProgress.map((entry) => [entry.case_id, entry]),
  );
  const objectiveTotalsByCaseId = new Map(
    allCases.map((caseFile) => [
      caseFile.slug,
      getObjectiveCountFromEvidence(caseFile.evidence),
    ]),
  );

  const isNewOrAnonymousUser =
    !userId || !mergedProgress.some((entry) => entry.status !== "not_started");

  return (
    <>
      <div className="bg-background text-text-primary min-h-screen px-4 sm:px-6 lg:px-8 py-20 font-sans">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            All Cold Case Files
          </h1>
          <p className="max-w-2xl text-text-secondary">
            Explore by starter picks, series arcs, themes, and challenge level.
            Every new case slots itself automatically based on metadata.
          </p>

          {isNewOrAnonymousUser && starterCase?.title ? (
            <p className="mt-5 rounded-2xl border border-emerald-300/40 bg-emerald-100/80 dark:border-emerald-500/25 dark:bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-100">
              New here? Start with <strong>{starterCase.title}</strong> —{" "}
              {starterCase.is_free ? "free" : "premium"}, ~
              {starterCase.est_time_minutes} min, {starterCase.difficulty_level.replace("_", " ")}.
            </p>
          ) : null}

          {userId ? (
            <p className="mt-4 text-sm text-text-secondary">
              Badge Wall progress: <strong>{badgeSummary.earned}/{badgeSummary.total}</strong> earned. {" "}
              <Link href="/badges" className="underline underline-offset-4 hover:text-white">
                View your badges
              </Link>
              .
            </p>
          ) : null}
        </div>

        <div className="max-w-7xl mx-auto">
          {userId && rows.continueRow && rows.continueRow.cases.length > 0 ? (
            <CaseRow title={rows.continueRow.title} subtitle="Pick up where you left off">
              {rows.continueRow.cases.map((caseFile) => {
                const progressEntry = progressByCaseId.get(caseFile.slug);
                const solvedCount = progressEntry?.objectives_solved;
                const totalCount = objectiveTotalsByCaseId.get(caseFile.slug);
                const showObjectiveProgress = typeof solvedCount === "number";

                return (
                  <CaseCard
                    key={`continue-${caseFile.slug}`}
                    caseData={caseFile}
                    disableHoverScale
                    size="compact"
                    statusChip={
                      showObjectiveProgress ? (
                        <span className="inline-flex items-center rounded-full border border-sky-200/35 bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-wide text-sky-100 backdrop-blur">
                          Objectives: {solvedCount}
                          {typeof totalCount === "number" ? `/${totalCount}` : ""}
                        </span>
                      ) : undefined
                    }
                  />
                );
              })}
            </CaseRow>
          ) : null}

          <CaseRow title={rows.startHereRow.title} subtitle={rows.startHereRow.subtitle}>
            {rows.startHereRow.cases.map((caseFile) => (
              <CaseCard
                key={`starter-${caseFile.slug}`}
                caseData={caseFile}
                seriesLabel={getSeriesPartLabel(caseFile, allCases)}
                disableHoverScale
                size="compact"
              />
            ))}
          </CaseRow>

          {rows.seriesRows.map((row) => (
            <CaseRow key={row.id} title={row.title} subtitle={row.subtitle}>
              {row.cases.map((caseFile) => (
                <CaseCard
                  key={`${row.id}-${caseFile.slug}`}
                  caseData={caseFile}
                  seriesLabel={getSeriesPartLabel(caseFile, allCases)}
                  disableHoverScale
                  size="compact"
                />
              ))}
            </CaseRow>
          ))}

          {rows.promotedRows.map((row) => (
            <CaseRow key={row.id} title={row.title}>
              {row.cases.map((caseFile) => (
                <CaseCard
                  key={`${row.id}-${caseFile.slug}`}
                  caseData={caseFile}
                  seriesLabel={getSeriesPartLabel(caseFile, allCases)}
                  disableHoverScale
                  size="compact"
                />
              ))}
            </CaseRow>
          ))}

          <CasesFilterGrid
            allCases={allCases}
            cases={rows.remainingPlayableGridCases}
          />

          {rows.promotedRows.length === 0 ? (
            <p className="mb-12 text-xs text-text-secondary">
              Theme/difficulty rows auto-promote once they reach {MIN_CASES_FOR_ROW}+ playable cases.
            </p>
          ) : null}

          <CaseRow title={rows.comingSoonRow.title} subtitle={rows.comingSoonRow.subtitle}>
            {rows.comingSoonRow.cases.map((caseFile) => (
              <CaseCard
                key={`soon-${caseFile.slug}`}
                caseData={caseFile}
                muted
                disableLink
                disableHoverScale
                size="compact"
                footerAction={
                  <Link
                    href="/waitlist"
                    className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold tracking-wide text-white/95 hover:bg-black/55"
                  >
                    Join Waitlist
                  </Link>
                }
              />
            ))}
          </CaseRow>
        </div>
      </div>

      <Footer />
    </>
  );
}
