"use client";

import { useMemo, useState } from "react";
import CaseCard from "@/components/case-card";
import {
  type CatalogCase,
  getDifficultyRank,
  getSeriesPartLabel,
} from "@/lib/case-discovery";

type SortOption = "newest" | "difficulty" | "alphabetical";
type PriceFilter = "all" | "free" | "paid";

type CasesFilterGridProps = {
  allCases: CatalogCase[];
  cases: CatalogCase[];
};

const DIFFICULTY_OPTIONS: CatalogCase["difficulty_level"][] = [
  "easy",
  "medium",
  "hard",
  "high_difficulty",
];

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function formatDifficulty(level: CatalogCase["difficulty_level"]) {
  return level.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CasesFilterGrid({ allCases, cases }: CasesFilterGridProps) {
  const [themeFilters, setThemeFilters] = useState<string[]>([]);
  const [difficultyFilters, setDifficultyFilters] = useState<CatalogCase["difficulty_level"][]>([]);
  const [playerFilters, setPlayerFilters] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const availableThemes = useMemo(() => {
    return Array.from(
      new Set(
        cases.flatMap((entry) => entry.themes),
      ),
    ).sort((a, b) => a.localeCompare(b));
  }, [cases]);

  const availablePlayers = useMemo(() => {
    return Array.from(new Set(cases.map((entry) => entry.player_count))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [cases]);

  const hasActiveFilters =
    themeFilters.length > 0 ||
    difficultyFilters.length > 0 ||
    playerFilters.length > 0 ||
    priceFilter !== "all" ||
    sortBy !== "newest";

  const filteredCases = useMemo(() => {
    const filtered = cases.filter((entry) => {
      if (themeFilters.length > 0 && !themeFilters.every((theme) => entry.themes.includes(theme))) {
        return false;
      }

      if (difficultyFilters.length > 0 && !difficultyFilters.includes(entry.difficulty_level)) {
        return false;
      }

      if (playerFilters.length > 0 && !playerFilters.includes(entry.player_count)) {
        return false;
      }

      if (priceFilter === "free" && !entry.is_free) return false;
      if (priceFilter === "paid" && entry.is_free) return false;

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "difficulty") {
      sorted.sort((a, b) => getDifficultyRank(a.difficulty_level) - getDifficultyRank(b.difficulty_level));
    } else {
      // Newest fallback: larger numeric id first.
      sorted.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return sorted;
  }, [cases, difficultyFilters, playerFilters, priceFilter, sortBy, themeFilters]);

  const toggleTheme = (theme: string) => {
    setThemeFilters((prev) =>
      prev.includes(theme) ? prev.filter((value) => value !== theme) : [...prev, theme],
    );
  };

  const toggleDifficulty = (level: CatalogCase["difficulty_level"]) => {
    setDifficultyFilters((prev) =>
      prev.includes(level) ? prev.filter((value) => value !== level) : [...prev, level],
    );
  };

  const togglePlayers = (playerCount: string) => {
    setPlayerFilters((prev) =>
      prev.includes(playerCount)
        ? prev.filter((value) => value !== playerCount)
        : [...prev, playerCount],
    );
  };

  const clearFilters = () => {
    setThemeFilters([]);
    setDifficultyFilters([]);
    setPlayerFilters([]);
    setPriceFilter("all");
    setSortBy("newest");
  };

  return (
    <section className="mb-16">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-block h-5 w-1 rounded-full border border-emerald-300/30 bg-emerald-500/40" />
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Explore More Cases
          </h2>
        </div>
        <p className="text-sm text-text-secondary">
          Filter and sort the remaining playable investigations.
        </p>
      </div>

  <div className="mb-8 rounded-3xl border border-white/15 bg-[#111] p-5 md:p-6 space-y-5 shadow-xl shadow-black/20">
        <div>
          <h3 className="mb-2 font-sans text-sm font-semibold text-white/85">Theme</h3>
          <div className="flex flex-wrap gap-2">
            {availableThemes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => toggleTheme(theme)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  themeFilters.includes(theme)
                    ? "border-emerald-300/60 bg-emerald-500/35 text-white shadow-sm shadow-emerald-900/50"
                    : "border-white/10 bg-black/60 text-white/75 hover:border-white/25 hover:text-white"
                }`}
              >
                {toTitleCase(theme)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-sans text-sm font-semibold text-white/85">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_OPTIONS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleDifficulty(level)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  difficultyFilters.includes(level)
                    ? "border-emerald-300/60 bg-emerald-500/35 text-white shadow-sm shadow-emerald-900/50"
                    : "border-white/10 bg-black/60 text-white/75 hover:border-white/25 hover:text-white"
                }`}
              >
                {formatDifficulty(level)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-sans text-sm font-semibold text-white/85">Players</h3>
          <div className="flex flex-wrap gap-2">
            {availablePlayers.map((playerCount) => (
              <button
                key={playerCount}
                type="button"
                onClick={() => togglePlayers(playerCount)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  playerFilters.includes(playerCount)
                    ? "border-emerald-300/60 bg-emerald-500/35 text-white shadow-sm shadow-emerald-900/50"
                    : "border-white/10 bg-black/60 text-white/75 hover:border-white/25 hover:text-white"
                }`}
              >
                {playerCount} players
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm text-white/85">
            Free / Paid
            <div className="relative mt-1">
              <select
                className="w-full appearance-none rounded-full border border-white/15 bg-black/60 px-4 py-2.5 pr-10 text-sm text-white shadow-sm focus:border-emerald-300/60 focus:outline-none [&>option]:bg-[#111] [&>option]:text-white"
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value as PriceFilter)}
              >
                <option value="all">All</option>
                <option value="free">Free only</option>
                <option value="paid">Paid only</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.162l3.71-2.93a.75.75 0 01.92 1.18l-4.2 3.32a.75.75 0 01-.92 0l-4.2-3.32a.75.75 0 01.02-1.17z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>

          <label className="text-sm text-white/85">
            Sort by
            <div className="relative mt-1">
              <select
                className="w-full appearance-none rounded-full border border-white/15 bg-black/60 px-4 py-2.5 pr-10 text-sm text-white shadow-sm focus:border-emerald-300/60 focus:outline-none [&>option]:bg-[#111] [&>option]:text-white"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
              >
                <option value="newest">Newest</option>
                <option value="difficulty">Difficulty (easy → hard)</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.162l3.71-2.93a.75.75 0 01.92 1.18l-4.2 3.32a.75.75 0 01-.92 0l-4.2-3.32a.75.75 0 01.02-1.17z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>

          <div className="flex items-end md:justify-end">
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-amber-300/30 bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-500/25"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-text-secondary">
        Case board update: {filteredCases.length} {filteredCases.length === 1 ? "file matches" : "files match"} your current filters.
      </p>

      {filteredCases.length === 0 ? (
        <div className="rounded-3xl border border-amber-300/20 bg-black/35 px-6 py-8 text-amber-100/85">
          No active files match this filter mix yet. Clear a filter and widen the search perimeter.
        </div>
      ) : (
        <div className="grid gap-10 md:gap-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3 place-items-center">
          {filteredCases.map((caseFile) => (
            <CaseCard
              key={`filtered-${caseFile.slug}`}
              caseData={caseFile}
              seriesLabel={getSeriesPartLabel(caseFile, allCases)}
              disableHoverScale
              size="compact"
            />
          ))}
        </div>
      )}
    </section>
  );
}
