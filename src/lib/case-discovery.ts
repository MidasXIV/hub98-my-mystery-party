import { coldCases, type ColdCase } from "@/data/coldCases";
import type { PlayerProgressPublicMetadata } from "@/lib/player-progress";

export type CaseStatus = "playable" | "coming_soon";
export type CaseDifficulty = "easy" | "medium" | "hard" | "high_difficulty";

export type CatalogCase = ColdCase & {
  status: CaseStatus;
  difficulty_level: CaseDifficulty;
  is_starter: boolean;
  series_id: string | null;
  series_order: number | null;
  themes: string[];
  player_count: string;
  est_time_minutes: number;
  is_free: boolean;
};

export type UserCaseProgress = {
  user_id: string;
  case_id: string;
  status: "not_started" | "in_progress" | "completed";
  last_opened_at?: string;
  completed_at?: string;
  progress_percent?: number;
  objectives_solved?: number;
  objectives_total?: number;
};

type DiscoveryRow = {
  id: string;
  title: string;
  subtitle?: string;
  cases: CatalogCase[];
  muted?: boolean;
};

export const MIN_CASES_FOR_ROW = 3;

const CASE_OVERRIDES: Record<string, Partial<CatalogCase>> = {
  "the-final-rehearsal": {
    is_starter: true,
    series_id: "oakwood-finals",
    series_order: 1,
    themes: ["school", "comedy", "family-friendly"],
    difficulty_level: "easy",
  },
  "the-final-bench-off": {
    series_id: "oakwood-finals",
    series_order: 2,
    themes: ["school", "comedy", "family-friendly"],
    difficulty_level: "medium",
  },
  "station-zero": {
    themes: ["sci-fi", "horror"],
    difficulty_level: "high_difficulty",
  },
  "sentinel-1-the-zero-sum-game": {
    themes: ["sci-fi", "tech-thriller"],
    difficulty_level: "hard",
  },
  "sins-of-saint-lazarus": {
    themes: ["medical", "thriller"],
    difficulty_level: "high_difficulty",
  },
  "the-last-check-in": {
    themes: ["locked-room", "thriller"],
    difficulty_level: "hard",
  },
  "the-murder-at-kismet-casino": {
    themes: ["crime", "neo-noir"],
    difficulty_level: "hard",
  },
  "palazzo-of-bones": {
    themes: ["historical", "mansion"],
    difficulty_level: "hard",
  },
  "her-shadows-name": {
    themes: ["horror", "missing-person"],
    difficulty_level: "high_difficulty",
  },
};

const THEME_LABELS: Record<string, string> = {
  "sci-fi": "Sci-Fi Mysteries",
  horror: "Horror Mysteries",
  school: "School Mysteries",
  comedy: "Comedy Mysteries",
  "family-friendly": "Family-Friendly Cases",
  crime: "Crime Mysteries",
  "neo-noir": "Neo-Noir Cases",
  medical: "Medical Mysteries",
  thriller: "Thriller Cases",
  "locked-room": "Locked-Room Mysteries",
  historical: "Historical Mysteries",
  mansion: "Mansion Mysteries",
  "tech-thriller": "Tech Thrillers",
  "missing-person": "Missing Person Mysteries",
};

export const DIFFICULTY_LABELS: Record<CaseDifficulty, string> = {
  easy: "Easy Cases",
  medium: "Medium Cases",
  hard: "Hard Cases",
  high_difficulty: "High Difficulty Cases",
};

export function formatThemeLabel(theme: string): string {
  return THEME_LABELS[theme] ?? `${theme[0]?.toUpperCase() ?? "M"}${theme.slice(1)} Mysteries`;
}

export function getDifficultyRank(level: CaseDifficulty): number {
  switch (level) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    case "high_difficulty":
      return 4;
    default:
      return 99;
  }
}

function parseDurationToMinutes(duration?: string): number {
  if (!duration) return 120;
  const normalized = duration.toLowerCase();
  const values = [...normalized.matchAll(/\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));
  if (values.length === 0) return 120;

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const isHours = normalized.includes("hour");
  return Math.max(30, Math.round((isHours ? average * 60 : average)));
}

function normalizeDifficulty(raw?: string): CaseDifficulty {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("high")) return "high_difficulty";
  if (value.includes("easy") && value.includes("medium")) return "medium";
  if (value.includes("easy")) return "easy";
  if (value.includes("hard")) return "hard";
  return "medium";
}

function inferThemes(caseFile: ColdCase): string[] {
  const tags = (caseFile.tags ?? []).map((tag) => tag.toLowerCase());
  const derived: string[] = [];

  if (tags.some((tag) => tag.includes("sci"))) derived.push("sci-fi");
  if (tags.some((tag) => tag.includes("horror"))) derived.push("horror");
  if (tags.some((tag) => tag.includes("school"))) derived.push("school");
  if (tags.some((tag) => tag.includes("family"))) derived.push("family-friendly");
  if (tags.some((tag) => tag.includes("comedy"))) derived.push("comedy");
  if (tags.some((tag) => tag.includes("medical"))) derived.push("medical");
  if (tags.some((tag) => tag.includes("thriller"))) derived.push("thriller");
  if (tags.some((tag) => tag.includes("historical"))) derived.push("historical");
  if (tags.some((tag) => tag.includes("locked room"))) derived.push("locked-room");
  if (tags.some((tag) => tag.includes("murder") || tag.includes("crime"))) derived.push("crime");
  if (derived.length === 0) derived.push("mystery");

  return Array.from(new Set(derived));
}

function toCatalogCase(caseFile: ColdCase): CatalogCase {
  const override = CASE_OVERRIDES[caseFile.slug] ?? {};
  const themes = override.themes ?? inferThemes(caseFile);
  const status = override.status ?? ((caseFile.isPlayable ?? false) ? "playable" : "coming_soon");
  const difficultyLevel = override.difficulty_level ?? normalizeDifficulty(caseFile.difficulty);

  return {
    ...caseFile,
    status,
    difficulty_level: difficultyLevel,
    is_starter: override.is_starter ?? false,
    series_id: override.series_id ?? null,
    series_order: override.series_order ?? null,
    themes,
    player_count: override.player_count ?? caseFile.players ?? "1-2",
    est_time_minutes: override.est_time_minutes ?? parseDurationToMinutes(caseFile.duration),
    is_free: override.is_free ?? (caseFile.price ?? 0) <= 0,
  };
}

export function getCatalogCases(): CatalogCase[] {
  return coldCases.map(toCatalogCase);
}

export function getCatalogCaseBySlug(slug: string): CatalogCase | undefined {
  return getCatalogCases().find((entry) => entry.slug === slug);
}

export function getSeriesPartLabel(caseFile: CatalogCase, allCases: CatalogCase[]): string | null {
  if (!caseFile.series_id || !caseFile.series_order) return null;
  const seriesEntries = allCases
    .filter((entry) => entry.series_id === caseFile.series_id)
    .sort((a, b) => (a.series_order ?? 0) - (b.series_order ?? 0));
  if (seriesEntries.length < 2) return null;
  return `Part ${caseFile.series_order} of ${seriesEntries.length}`;
}

export function normalizeUserCaseProgress(
  userId: string,
  metadata: PlayerProgressPublicMetadata,
): UserCaseProgress[] {
  return metadata.cases.map((entry) => {
    const status = entry.status === "completed" ? "completed" : "in_progress";
    const objectivesSolved = entry.objectives.length;
    const progressPercent = status === "completed" ? 100 : undefined;
    return {
      user_id: userId,
      case_id: entry.caseSlug,
      status,
      last_opened_at: entry.lastPlayedAt,
      completed_at: entry.completedAt,
      progress_percent: progressPercent,
      objectives_solved: objectivesSolved,
    } satisfies UserCaseProgress;
  });
}

export function mergeProgressWithCatalog(
  userId: string,
  progress: UserCaseProgress[],
  allCases: CatalogCase[],
): UserCaseProgress[] {
  const byCaseId = new Map(progress.map((entry) => [entry.case_id, entry]));
  return allCases.map((caseFile) => {
    return (
      byCaseId.get(caseFile.slug) ?? {
        user_id: userId,
        case_id: caseFile.slug,
        status: "not_started",
      }
    );
  });
}

export function buildCaseRows(
  allCases: CatalogCase[],
  progress: UserCaseProgress[],
): {
  continueRow?: DiscoveryRow;
  startHereRow: DiscoveryRow;
  seriesRows: DiscoveryRow[];
  promotedRows: DiscoveryRow[];
  remainingPlayableGridCases: CatalogCase[];
  comingSoonRow: DiscoveryRow;
} {
  const playable = allCases.filter((entry) => entry.status === "playable");
  const comingSoon = allCases.filter((entry) => entry.status === "coming_soon");

  const inProgressCaseIds = new Set(
    progress.filter((entry) => entry.status === "in_progress").map((entry) => entry.case_id),
  );

  const continueCases = playable
    .filter((entry) => inProgressCaseIds.has(entry.slug))
    .sort((a, b) => {
      const aProgress = progress.find((entry) => entry.case_id === a.slug)?.last_opened_at;
      const bProgress = progress.find((entry) => entry.case_id === b.slug)?.last_opened_at;
      return Date.parse(bProgress ?? "1970-01-01") - Date.parse(aProgress ?? "1970-01-01");
    });

  const startHere = playable.filter((entry) => entry.is_starter);

  const seriesGroups = new Map<string, CatalogCase[]>();
  playable.forEach((entry) => {
    if (!entry.series_id) return;
    const list = seriesGroups.get(entry.series_id) ?? [];
    list.push(entry);
    seriesGroups.set(entry.series_id, list);
  });

  const seriesRows: DiscoveryRow[] = Array.from(seriesGroups.entries())
    .map(([seriesId, entries]) => ({
      id: `series-${seriesId}`,
      title: "Series",
      subtitle: entries
        .slice()
        .sort((a, b) => (a.series_order ?? 0) - (b.series_order ?? 0))
        .map((entry) => entry.title)
        .join(" • "),
      cases: entries.sort((a, b) => (a.series_order ?? 0) - (b.series_order ?? 0)),
    }))
    .filter((row) => row.cases.length > 1);

  const usedInCurated = new Set<string>([
    ...startHere.map((entry) => entry.slug),
    ...seriesRows.flatMap((row) => row.cases.map((entry) => entry.slug)),
  ]);

  const remainingPlayable = playable.filter((entry) => !usedInCurated.has(entry.slug));

  const promotedRows: DiscoveryRow[] = [];
  const promotedCaseIds = new Set<string>();

  const remainingForPromotion = () =>
    remainingPlayable.filter((entry) => !promotedCaseIds.has(entry.slug));

  const themeBuckets = new Map<string, CatalogCase[]>();
  remainingPlayable.forEach((entry) => {
    entry.themes.forEach((theme) => {
      const list = themeBuckets.get(theme) ?? [];
      list.push(entry);
      themeBuckets.set(theme, list);
    });
  });

  const promotedThemes = Array.from(themeBuckets.entries())
    .map(([theme, entries]) => ({ theme, entries }))
    .filter(({ entries }) => entries.length >= MIN_CASES_FOR_ROW)
    .sort((a, b) => b.entries.length - a.entries.length || a.theme.localeCompare(b.theme));

  promotedThemes.forEach(({ theme }) => {
    const entries = remainingForPromotion().filter((entry) => entry.themes.includes(theme));
    if (entries.length < MIN_CASES_FOR_ROW) return;

    entries.forEach((entry) => promotedCaseIds.add(entry.slug));
    promotedRows.push({
      id: `theme-${theme}`,
      title: formatThemeLabel(theme),
      cases: entries,
    });
  });

  const difficultyBuckets = new Map<CaseDifficulty, CatalogCase[]>();
  remainingForPromotion().forEach((entry) => {
    const list = difficultyBuckets.get(entry.difficulty_level) ?? [];
    list.push(entry);
    difficultyBuckets.set(entry.difficulty_level, list);
  });

  Array.from(difficultyBuckets.entries())
    .filter(([, entries]) => entries.length >= MIN_CASES_FOR_ROW)
    .sort((a, b) => getDifficultyRank(a[0]) - getDifficultyRank(b[0]))
    .forEach(([level, entries]) => {
      entries.forEach((entry) => promotedCaseIds.add(entry.slug));
      promotedRows.push({
        id: `difficulty-${level}`,
        title: DIFFICULTY_LABELS[level],
        cases: entries,
      });
    });

  const remainingPlayableGridCases = remainingPlayable.filter(
    (entry) => !promotedCaseIds.has(entry.slug),
  );

  return {
    continueRow:
      continueCases.length > 0
        ? {
            id: "continue",
            title: "Continue Your Investigation",
            cases: continueCases,
          }
        : undefined,
    startHereRow: {
      id: "start-here",
      title: "Start Here",
      subtitle: "Recommended first case",
      cases: startHere,
    },
    seriesRows,
    promotedRows,
    remainingPlayableGridCases,
    comingSoonRow: {
      id: "coming-soon",
      title: "Coming Soon",
      subtitle: "In active development",
      cases: comingSoon,
      muted: true,
    },
  };
}

export function recommendNextCase(args: {
  currentCaseSlug: string;
  allCases: CatalogCase[];
  progress: UserCaseProgress[];
}): CatalogCase | null {
  const { currentCaseSlug, allCases, progress } = args;
  const current = allCases.find((entry) => entry.slug === currentCaseSlug);
  if (!current) return null;

  const played = new Set(
    progress
      .filter((entry) => entry.status === "in_progress" || entry.status === "completed")
      .map((entry) => entry.case_id),
  );

  const unplayedPlayable = allCases.filter(
    (entry) => entry.status === "playable" && !played.has(entry.slug) && entry.slug !== currentCaseSlug,
  );

  // Priority 1: next case in same series.
  const currentOrder = current.series_order;
  if (current.series_id && currentOrder != null) {
    const candidate = allCases.find(
      (entry) =>
        entry.series_id === current.series_id &&
        entry.series_order === currentOrder + 1 &&
        entry.status === "playable" &&
        !played.has(entry.slug),
    );
    if (candidate) return candidate;
  }

  // Priority 2: similar difficulty + theme overlap.
  const similar = unplayedPlayable
    .map((entry) => {
      const overlap = entry.themes.filter((theme) => current.themes.includes(theme)).length;
      const sameDifficulty = entry.difficulty_level === current.difficulty_level ? 1 : 0;
      return {
        entry,
        score: overlap * 10 + sameDifficulty * 5,
      };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  if (similar.length > 0) {
    return similar[0]!.entry;
  }

  // Priority 3: starter fallback.
  const starterFallback = unplayedPlayable.find((entry) => entry.is_starter);
  if (starterFallback) return starterFallback;

  return unplayedPlayable[0] ?? null;
}

export function buildBadgeSummary(allCases: CatalogCase[], progress: UserCaseProgress[]) {
  const playable = allCases.filter((entry) => entry.status === "playable");
  const completed = new Set(
    progress.filter((entry) => entry.status === "completed").map((entry) => entry.case_id),
  );

  const caseBadges = playable.map((entry) => ({
    id: `case-${entry.slug}`,
    title: entry.title,
    kind: "case" as const,
    earned: completed.has(entry.slug),
  }));

  const seriesMap = new Map<string, CatalogCase[]>();
  playable.forEach((entry) => {
    if (!entry.series_id) return;
    const list = seriesMap.get(entry.series_id) ?? [];
    list.push(entry);
    seriesMap.set(entry.series_id, list);
  });

  const seriesBadges = Array.from(seriesMap.entries())
    .filter(([, entries]) => entries.length > 1)
    .map(([seriesId, entries]) => ({
      id: `series-${seriesId}`,
      title: `${entries[0]!.title.split(":")[0]} Series Complete`,
      kind: "series" as const,
      earned: entries.every((entry) => completed.has(entry.slug)),
      progressLabel: `${entries.filter((entry) => completed.has(entry.slug)).length}/${entries.length}`,
    }));

  const themeMap = new Map<string, CatalogCase[]>();
  playable.forEach((entry) => {
    entry.themes.forEach((theme) => {
      const list = themeMap.get(theme) ?? [];
      list.push(entry);
      themeMap.set(theme, list);
    });
  });

  const themeBadges = Array.from(themeMap.entries())
    .filter(([, entries]) => entries.length >= 2)
    .map(([theme, entries]) => {
      const completedCount = entries.filter((entry) => completed.has(entry.slug)).length;
      return {
        id: `theme-${theme}`,
        title: `${THEME_LABELS[theme] ?? theme} Detective`,
        kind: "theme" as const,
        earned: completedCount === entries.length,
        progressLabel: `${completedCount}/${entries.length}`,
      };
    });

  const allBadges = [...caseBadges, ...seriesBadges, ...themeBadges];
  const earned = allBadges.filter((badge) => badge.earned).length;

  return {
    earned,
    total: allBadges.length,
    caseBadges,
    seriesBadges,
    themeBadges,
    allBadges,
  };
}
