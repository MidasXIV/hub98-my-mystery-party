export const PLAYER_PROGRESS_PUBLIC_METADATA_KEY = "playerProgress";

export type PlayerObjectiveProgress = {
  objectiveId: string;
  solvedAt: string;
  score?: number;
  attempts?: number;
};

export type PlayerCaseProgress = {
  caseSlug: string;
  firstPlayedAt: string;
  lastPlayedAt: string;
  status: "started" | "completed";
  objectives: PlayerObjectiveProgress[];
  lastObjectiveId?: string;
  completedAt?: string;
};

export type PlayerProgressPublicMetadata = {
  version: 1;
  cases: PlayerCaseProgress[];
  /** Optional separate tracking for kits (printable kits / hosted kits) */
  kits?: PlayerCaseProgress[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toIsoDate(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? fallback : new Date(parsed).toISOString();
}

function normalizeObjectiveProgress(
  value: unknown,
): PlayerObjectiveProgress | null {
  if (!isRecord(value) || typeof value.objectiveId !== "string") return null;

  const fallbackNow = new Date().toISOString();
  return {
    objectiveId: value.objectiveId,
    solvedAt: toIsoDate(value.solvedAt, fallbackNow),
    score: typeof value.score === "number" ? value.score : undefined,
    attempts: typeof value.attempts === "number" ? value.attempts : undefined,
  };
}

function normalizeCaseProgress(value: unknown): PlayerCaseProgress | null {
  if (!isRecord(value) || typeof value.caseSlug !== "string") return null;

  const fallbackNow = new Date().toISOString();
  const objectives = Array.isArray(value.objectives)
    ? value.objectives
        .map(normalizeObjectiveProgress)
        .filter((entry): entry is PlayerObjectiveProgress => Boolean(entry))
    : [];

  return {
    caseSlug: value.caseSlug,
    firstPlayedAt: toIsoDate(value.firstPlayedAt, fallbackNow),
    lastPlayedAt: toIsoDate(value.lastPlayedAt, fallbackNow),
    status: value.status === "completed" ? "completed" : "started",
    objectives,
    lastObjectiveId:
      typeof value.lastObjectiveId === "string" ? value.lastObjectiveId : undefined,
    completedAt:
      typeof value.completedAt === "string"
        ? toIsoDate(value.completedAt, fallbackNow)
        : undefined,
  };
}

export function normalizePlayerProgressMetadata(
  value: unknown,
): PlayerProgressPublicMetadata {
  if (!isRecord(value)) {
    return { version: 1, cases: [], kits: [] };
  }

  const cases = Array.isArray(value.cases)
    ? value.cases
        .map(normalizeCaseProgress)
        .filter((entry): entry is PlayerCaseProgress => Boolean(entry))
    : [];

  const kits = Array.isArray(value.kits)
    ? value.kits
        .map(normalizeCaseProgress)
        .filter((entry): entry is PlayerCaseProgress => Boolean(entry))
    : [];

  return {
    version: 1,
    cases,
    kits,
  };
}

type MergeProgressEvent =
  | {
      type: "case-opened";
      caseSlug: string;
      occurredAt?: string;
      /** If true, treat this event as applying to the 'kits' collection instead of 'cases' */
      isKit?: boolean;
    }
  | {
      type: "objective-solved";
      caseSlug: string;
      objectiveId: string;
      score?: number;
      occurredAt?: string;
      markCaseComplete?: boolean;
      /** If true, treat this event as applying to the 'kits' collection instead of 'cases' */
      isKit?: boolean;
    };

export function mergePlayerProgressEvent(
  currentValue: unknown,
  event: MergeProgressEvent,
): PlayerProgressPublicMetadata {
  const now = toIsoDate(event.occurredAt, new Date().toISOString());
  const current = normalizePlayerProgressMetadata(currentValue);
  // Choose target collection: 'kits' when event.isKit === true, otherwise 'cases'
  const targetKey: "cases" | "kits" = event.isKit ? "kits" : "cases";
  // Ensure both collections exist locally
  current.kits = current.kits ?? [];
  const existingCase = (targetKey === "cases" ? current.cases : current.kits).find(
    (entry) => entry.caseSlug === event.caseSlug,
  );

  const nextCase: PlayerCaseProgress = existingCase
    ? {
        ...existingCase,
        objectives: [...existingCase.objectives],
      }
    : {
        caseSlug: event.caseSlug,
        firstPlayedAt: now,
        lastPlayedAt: now,
        status: "started",
        objectives: [],
      };

  nextCase.lastPlayedAt = now;

  if (event.type === "objective-solved") {
    nextCase.lastObjectiveId = event.objectiveId;
    const objectiveIndex = nextCase.objectives.findIndex(
      (objective) => objective.objectiveId === event.objectiveId,
    );

    const previousAttempts =
      objectiveIndex >= 0 ? nextCase.objectives[objectiveIndex]?.attempts ?? 0 : 0;
    const objectiveProgress: PlayerObjectiveProgress = {
      objectiveId: event.objectiveId,
      solvedAt:
        objectiveIndex >= 0
          ? nextCase.objectives[objectiveIndex]!.solvedAt
          : now,
      score: typeof event.score === "number" ? event.score : undefined,
      attempts: previousAttempts + 1,
    };

    if (objectiveIndex >= 0) {
      nextCase.objectives[objectiveIndex] = objectiveProgress;
    } else {
      nextCase.objectives.push(objectiveProgress);
    }

    if (event.markCaseComplete) {
      nextCase.status = "completed";
      nextCase.completedAt = now;
    }
  }

  if (targetKey === "cases") {
    const remainingCases = current.cases.filter((entry) => entry.caseSlug !== nextCase.caseSlug);
    return {
      version: 1,
      cases: [...remainingCases, nextCase].sort((a, b) => a.caseSlug.localeCompare(b.caseSlug)),
      kits: current.kits ?? [],
    };
  }

  // target is kits
  const remainingKits = (current.kits ?? []).filter((entry) => entry.caseSlug !== nextCase.caseSlug);
  return {
    version: 1,
    cases: current.cases,
    kits: [...remainingKits, nextCase].sort((a, b) => a.caseSlug.localeCompare(b.caseSlug)),
  };
}
