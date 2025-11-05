"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  roadmapFeatures as initialFeatures,
  categoryLabels,
  statusLabels,
  RoadmapFeature,
  RoadmapCategory,
  RoadmapFeatureStatus,
} from "@/data/roadmapFeatures";
import { cn } from "@/lib/utils";

// Small utility for formatting relative times
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
}

type SortMode = "trending" | "new" | "alphabetical";

interface LocalVoteState {
  [id: string]: number; // local vote adjustments
}

const STORAGE_KEY = "roadmapVotes_v1";
const STORAGE_VOTED = "roadmapVoted_v1";

export const RoadmapVoting: React.FC = () => {
  const [features, setFeatures] = React.useState<RoadmapFeature[]>(() => initialFeatures);
  const [sort, setSort] = React.useState<SortMode>("trending");
  const [categoryFilter, setCategoryFilter] = React.useState<RoadmapCategory | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<RoadmapFeatureStatus | "all">("all");
  const [search, setSearch] = React.useState("");
  const [votedIds, setVotedIds] = React.useState<string[]>([]);

  // Hydrate local votes & voted flags
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const votedRaw = localStorage.getItem(STORAGE_VOTED);
      if (raw) {
        const adjustments: LocalVoteState = JSON.parse(raw);
        setFeatures(f => f.map(feat => ({ ...feat, votes: feat.votes + (adjustments[feat.id] || 0) })));
      }
      if (votedRaw) setVotedIds(JSON.parse(votedRaw));
    } catch (e) {
      console.warn("Failed to hydrate roadmap votes", e);
    }
  }, []);

  function persistVote(id: string) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const adjustments: LocalVoteState = raw ? JSON.parse(raw) : {};
      adjustments[id] = (adjustments[id] || 0) + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adjustments));
      const votedRaw = localStorage.getItem(STORAGE_VOTED);
      const voted = votedRaw ? JSON.parse(votedRaw) : [];
      if (!voted.includes(id)) {
        voted.push(id);
        localStorage.setItem(STORAGE_VOTED, JSON.stringify(voted));
      }
    } catch (e) {
      console.warn("Failed to persist vote", e);
    }
  }

  function handleVote(id: string) {
    if (votedIds.includes(id)) return;
    setFeatures(f => f.map(feat => (feat.id === id ? { ...feat, votes: feat.votes + 1 } : feat)));
    setVotedIds(v => [...v, id]);
    persistVote(id);
  }

  const categories: (RoadmapCategory | "all")[] = ["all", "core", "ui", "performance", "gameplay", "integrations"];
  const statuses: (RoadmapFeatureStatus | "all")[] = ["all", "idea", "planned", "in-progress", "beta", "launched"];

  const filtered = features.filter(f => {
    if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      return (
        f.title.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term) ||
        f.tags?.some(t => t.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "trending":
        return b.votes - a.votes;
      case "new":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "alphabetical":
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16">
      <div className="embossed-backdrop">ROADMAP</div>
      <div className="relative z-10 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Community Roadmap</h1>
          <p className="text-muted-foreground max-w-2xl">
            Vote on features you&apos;d love to see. Your selections help us prioritize what ships next. This is a local prototype—votes are stored in your browser for now.
          </p>
        </header>
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={cat === categoryFilter ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-full",
                  cat === categoryFilter && "shadow-md"
                )}
              >
                {cat === "all" ? "All Categories" : categoryLabels[cat]}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {statuses.map(st => (
              <Button
                key={st}
                variant={st === statusFilter ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(st)}
                className="rounded-full"
              >
                {st === "all" ? "All Statuses" : statusLabels[st]}
              </Button>
            ))}
            <div className="flex-1" />
            <label className="relative">
              <input
                type="text"
                placeholder="Search features…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-60 rounded-md border bg-background/80 backdrop-blur px-3 py-2 text-sm focus-visible:ring-ring focus-visible:outline-none"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                🔍
              </span>
            </label>
            <div className="flex gap-1" role="radiogroup" aria-label="Sort features">
              {(["trending", "new", "alphabetical"] as SortMode[]).map(mode => (
                <Button
                  key={mode}
                  variant={sort === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSort(mode)}
                  className="rounded-full"
                  aria-pressed={sort === mode}
                >
                  {mode === "trending" && "Trending"}
                  {mode === "new" && "Newest"}
                  {mode === "alphabetical" && "A–Z"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature list */}
        <ul className="space-y-4">
          {sorted.map(f => {
            const voted = votedIds.includes(f.id);
            return (
              <li
                key={f.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-4">
                    <button
                      disabled={voted}
                      onClick={() => handleVote(f.id)}
                      className={cn(
                        "relative isolate flex flex-col items-center justify-center w-16 shrink-0 rounded-lg border text-xs font-medium py-2 transition",
                        voted
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/80 hover:bg-accent/50"
                      )}
                      aria-label={`Vote for ${f.title}`}
                    >
                      <span className="text-lg font-semibold leading-none">
                        {f.votes}
                      </span>
                      <span className="uppercase tracking-wide mt-1">
                        {voted ? "Voted" : "Vote"}
                      </span>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-lg ring-0 focus-visible:ring-2"
                      />
                    </button>
                    <div className="space-y-2 flex-1">
                      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                        {f.title}
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                            f.status === "in-progress" && "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-300/50",
                            f.status === "planned" && "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 border-blue-300/50",
                            f.status === "idea" && "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-200 border-gray-300/50",
                            f.status === "beta" && "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 border-purple-300/50",
                            f.status === "launched" && "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 border-green-300/50"
                          )}
                        >
                          {statusLabels[f.status]}
                        </span>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs rounded-full bg-secondary px-2 py-1 font-mono tracking-tight dark:bg-secondary/30">
                          {categoryLabels[f.category]}
                        </span>
                        {f.tags?.map(t => (
                          <span
                            key={t}
                            className="text-xs rounded-full bg-accent/40 dark:bg-accent/30 px-2 py-1 font-mono tracking-tight"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground w-20 text-right mt-1">
                      {timeAgo(f.createdAt)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {sorted.length === 0 && (
            <li className="text-center py-10 text-muted-foreground text-sm">
              No features match your filters.
            </li>
          )}
        </ul>
        <footer className="pt-8 text-xs text-muted-foreground">
          <p>
            Prototype only. Votes aren&apos;t shared globally yet. Backend integration will add auth, rate limiting, and anti‑fraud.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RoadmapVoting;
