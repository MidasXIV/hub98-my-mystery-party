import type { ColdCase } from "@/data/coldCases";
import type {
  PlayerCaseProgress,
  PlayerProgressPublicMetadata,
} from "@/lib/player-progress";

export type CaseAnalyticsRow = {
  caseSlug: string;
  caseTitle: string;
  objectiveCount: number;
  playersAttempted: number;
  playersCompleted: number;
  completionRate: number;
  averageMinutesSpent: number;
  medianMinutesSpent: number;
  objectivesSolvedDistribution: Array<{
    solvedCount: number;
    players: number;
  }>;
  objectiveCompletionDistribution: Array<{
    objectiveId: string;
    objectiveLabel: string;
    objectiveIndex: number;
    playersSolved: number;
    solveRate: number;
  }>;
};

export type CaseAnalyticsSummary = {
  trackedPlayers: number;
  playersWithProgress: number;
  totalCaseAttempts: number;
  averageMinutesSpentPerCaseAttempt: number;
};

export type CaseAnalyticsResult = {
  generatedAt: string;
  summary: CaseAnalyticsSummary;
  rows: CaseAnalyticsRow[];
};

function getObjectiveCountFromEvidence(evidence: unknown): number {
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return 0;
  }

  const maybeObjectives = (evidence as { objectives?: unknown }).objectives;
  return Array.isArray(maybeObjectives) ? maybeObjectives.length : 0;
}

function getObjectivesFromEvidence(evidence: unknown): Array<{
  id: string;
  label: string;
}> {
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return [];
  }

  const maybeObjectives = (evidence as { objectives?: unknown }).objectives;
  if (!Array.isArray(maybeObjectives)) return [];

  return maybeObjectives
    .map((objective, index) => {
      if (!objective || typeof objective !== "object" || Array.isArray(objective)) {
        return null;
      }

      const candidateId = (objective as { id?: unknown }).id;
      const candidateDescription = (objective as { description?: unknown }).description;
      const objectiveId =
        typeof candidateId === "string" && candidateId.trim().length > 0
          ? candidateId
          : `objective_${index + 1}`;
      const objectiveLabel =
        typeof candidateDescription === "string" && candidateDescription.trim().length > 0
          ? candidateDescription
          : `Objective ${index + 1}`;

      return {
        id: objectiveId,
        label: objectiveLabel,
      };
    })
    .filter((objective): objective is { id: string; label: string } => Boolean(objective));
}

function minutesBetweenIsoDates(startIso: string, endIso: string): number | null {
  const startMs = Date.parse(startIso);
  const endMs = Date.parse(endIso);

  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return null;
  if (endMs < startMs) return null;

  return (endMs - startMs) / (1000 * 60);
}

function median(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle] ?? 0;
  }

  const left = sorted[middle - 1] ?? 0;
  const right = sorted[middle] ?? 0;
  return (left + right) / 2;
}

type AggregateAccumulator = {
  playersAttempted: number;
  playersCompleted: number;
  timeSpentMinutes: number[];
  solvedCountBuckets: Map<number, number>;
  objectiveSolvedById: Map<string, number>;
};

function hasCompletedStatus(entry: PlayerCaseProgress): boolean {
  // Primary completion logic: explicit status from PlayerCaseProgress
  if (entry.status === "completed") return true;

  // Backward-compatibility fallback for legacy records that only set completedAt
  return typeof entry.completedAt === "string" && entry.completedAt.length > 0;
}

function addCaseProgress(
  entry: PlayerCaseProgress,
  accumulator: AggregateAccumulator,
) {
  accumulator.playersAttempted += 1;

  if (hasCompletedStatus(entry)) {
    accumulator.playersCompleted += 1;
  }

  const uniqueSolvedObjectiveIds = Array.from(
    new Set(entry.objectives.map((objective) => objective.objectiveId)),
  );

  const solvedCount = uniqueSolvedObjectiveIds.length;
  const existingBucketValue = accumulator.solvedCountBuckets.get(solvedCount) ?? 0;
  accumulator.solvedCountBuckets.set(solvedCount, existingBucketValue + 1);

  for (const objectiveId of uniqueSolvedObjectiveIds) {
    const previousSolved = accumulator.objectiveSolvedById.get(objectiveId) ?? 0;
    accumulator.objectiveSolvedById.set(objectiveId, previousSolved + 1);
  }

  const minutesSpent = minutesBetweenIsoDates(entry.firstPlayedAt, entry.lastPlayedAt);
  if (typeof minutesSpent === "number" && Number.isFinite(minutesSpent)) {
    accumulator.timeSpentMinutes.push(minutesSpent);
  }
}

export function buildCaseAnalytics(
  allCases: ColdCase[],
  playerProgressRecords: PlayerProgressPublicMetadata[],
): CaseAnalyticsResult {
  const objectiveCountBySlug = new Map(
    allCases.map((caseFile) => [
      caseFile.slug,
      getObjectiveCountFromEvidence(caseFile.evidence),
    ]),
  );

  const titleBySlug = new Map(allCases.map((caseFile) => [caseFile.slug, caseFile.title]));
  const objectivesBySlug = new Map(
    allCases.map((caseFile) => [caseFile.slug, getObjectivesFromEvidence(caseFile.evidence)]),
  );

  const aggregateByCaseSlug = new Map<string, AggregateAccumulator>();

  let playersWithProgress = 0;

  for (const record of playerProgressRecords) {
    if (!Array.isArray(record.cases) || record.cases.length === 0) {
      continue;
    }

    playersWithProgress += 1;

    for (const caseEntry of record.cases) {
      const current =
        aggregateByCaseSlug.get(caseEntry.caseSlug) ?? {
          playersAttempted: 0,
          playersCompleted: 0,
          timeSpentMinutes: [],
          solvedCountBuckets: new Map<number, number>(),
          objectiveSolvedById: new Map<string, number>(),
        };

      addCaseProgress(caseEntry, current);
      aggregateByCaseSlug.set(caseEntry.caseSlug, current);
    }
  }

  const knownCaseSlugs = new Set(allCases.map((caseFile) => caseFile.slug));
  const discoveredCaseSlugs = Array.from(aggregateByCaseSlug.keys()).filter(
    (slug) => !knownCaseSlugs.has(slug),
  );

  const allSlugs = [...allCases.map((caseFile) => caseFile.slug), ...discoveredCaseSlugs];

  const rows = allSlugs.map<CaseAnalyticsRow>((caseSlug) => {
    const aggregate =
      aggregateByCaseSlug.get(caseSlug) ?? {
        playersAttempted: 0,
        playersCompleted: 0,
        timeSpentMinutes: [],
        solvedCountBuckets: new Map<number, number>(),
        objectiveSolvedById: new Map<string, number>(),
      };

    const totalMinutesSpent = aggregate.timeSpentMinutes.reduce(
      (total, minutes) => total + minutes,
      0,
    );

    const playersAttempted = aggregate.playersAttempted;
    const objectiveCount = objectiveCountBySlug.get(caseSlug) ?? 0;
    const canonicalObjectives = objectivesBySlug.get(caseSlug) ?? [];

    const maxSolvedCountObserved = Math.max(
      0,
      ...Array.from(aggregate.solvedCountBuckets.keys()),
    );
    const solvedBucketMax = Math.max(objectiveCount, maxSolvedCountObserved);

    const objectivesSolvedDistribution = Array.from(
      { length: solvedBucketMax + 1 },
      (_, solvedCount) => ({
        solvedCount,
        players: aggregate.solvedCountBuckets.get(solvedCount) ?? 0,
      }),
    );

    const objectiveCompletionDistribution =
      canonicalObjectives.length > 0
        ? canonicalObjectives.map((objective, index) => {
            const playersSolved = aggregate.objectiveSolvedById.get(objective.id) ?? 0;
            return {
              objectiveId: objective.id,
              objectiveLabel: objective.label,
              objectiveIndex: index + 1,
              playersSolved,
              solveRate: playersAttempted > 0 ? playersSolved / playersAttempted : 0,
            };
          })
        : Array.from(aggregate.objectiveSolvedById.entries())
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([objectiveId, playersSolved], index) => ({
              objectiveId,
              objectiveLabel: objectiveId,
              objectiveIndex: index + 1,
              playersSolved,
              solveRate: playersAttempted > 0 ? playersSolved / playersAttempted : 0,
            }));

    return {
      caseSlug,
      caseTitle: titleBySlug.get(caseSlug) ?? caseSlug,
      objectiveCount,
      playersAttempted,
      playersCompleted: aggregate.playersCompleted,
      completionRate:
        playersAttempted > 0 ? aggregate.playersCompleted / playersAttempted : 0,
      averageMinutesSpent:
        aggregate.timeSpentMinutes.length > 0
          ? totalMinutesSpent / aggregate.timeSpentMinutes.length
          : 0,
      medianMinutesSpent: median(aggregate.timeSpentMinutes),
      objectivesSolvedDistribution,
      objectiveCompletionDistribution,
    };
  });

  rows.sort((a, b) => {
    if (b.playersAttempted !== a.playersAttempted) {
      return b.playersAttempted - a.playersAttempted;
    }
    return a.caseTitle.localeCompare(b.caseTitle);
  });

  const totalCaseAttempts = rows.reduce(
    (total, row) => total + row.playersAttempted,
    0,
  );
  const totalMinutesSpent = rows.reduce((total, row) => {
    return (
      total +
      row.averageMinutesSpent *
        Math.max(row.playersAttempted, 0)
    );
  }, 0);

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      trackedPlayers: playerProgressRecords.length,
      playersWithProgress,
      totalCaseAttempts,
      averageMinutesSpentPerCaseAttempt:
        totalCaseAttempts > 0 ? totalMinutesSpent / totalCaseAttempts : 0,
    },
    rows,
  };
}
