"use client";
import React from "react";
import Link from "next/link";
import { roadmapFeatures, statusLabels } from "@/data/roadmapFeatures";
import { cn } from "@/lib/utils";

/**
 * RoadmapPreview
 * Lightweight homepage ribbon showing the top trending features (by vote count).
 * Assumption: User wanted the roadmap "above the header" in visual stacking order.
 * Implemented as a fixed bar ABOVE the existing fixed header for visibility without dominating the hero.
 * This is intentionally compact; for full interactions (filter/search/vote) visit /roadmap.
 * Future: Could hydrate live counts from an API & allow direct voting.
 */
export default function RoadmapPreview() {
  // derive top 3 trending features
  const top = [...roadmapFeatures]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <div className="fixed left-1/2 top-0 z-50 w-[700px] max-w-[92%] -translate-x-1/2">
      <div className="relative rounded-b-2xl border border-border bg-gradient-to-r from-background/95 via-background/90 to-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground shrink-0">
            Roadmap
          </span>
          {top.map((f) => (
            <Link
              key={f.id}
              href="/roadmap"
              className={cn(
                "group relative flex items-center gap-2 rounded-lg border px-3 py-1 text-xs hover:bg-accent/40 transition-colors",
                "bg-card/70 border-border/60"
              )}
              aria-label={`View roadmap feature: ${f.title}`}
            >
              <span className="font-medium whitespace-nowrap">
                {f.title}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide border",
                  f.status === "in-progress" && "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-300/50",
                  f.status === "planned" && "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 border-blue-300/50",
                  f.status === "idea" && "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-200 border-gray-300/50",
                  f.status === "beta" && "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 border-purple-300/50",
                  f.status === "launched" && "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 border-green-300/50"
                )}
              >
                {statusLabels[f.status]}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-3 opacity-70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.679 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                {f.votes}
              </span>
            </Link>
          ))}
          <Link
            href="/roadmap"
            className="ml-auto text-xs rounded-md px-2 py-1 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shrink-0"
          >
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
}
