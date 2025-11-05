"use client";
import React from "react";
import Link from "next/link";
import { roadmapFeatures, statusLabels } from "@/data/roadmapFeatures";
import { cn } from "@/lib/utils";

/**
 * RoadmapHomePreview
 * A richer homepage spotlight section (not fixed) that shows the top 4 features.
 * Entire card is clickable and navigates to /roadmap for full details & voting.
 * This intentionally omits interactive voting to keep homepage lean.
 * Future Ideas: mini vote button, real-time counts, category tabs.
 */
export default function RoadmapHomePreview() {
  const top = [...roadmapFeatures].sort((a, b) => b.votes - a.votes).slice(0, 4);

  return (
    <section
      aria-labelledby="roadmap-heading"
      className="relative mx-auto max-w-6xl px-4 md:px-8 mt-10 md:mt-16 mb-20"
    >
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id="roadmap-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">
            Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mt-2">
            A quick glimpse at what the community wants next. Dive in for full filtering & voting.
          </p>
        </div>
        <Link
          href="/roadmap"
          className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow hover:bg-primary/90 transition"
        >
          View Full Roadmap →
        </Link>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {top.map((f) => (
          <Link
            key={f.id}
            href="/roadmap"
            className={cn(
              "group relative rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition",
              "hover:border-border"
            )}
            aria-label={`Open roadmap to view feature: ${f.title}`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold leading-snug line-clamp-2">
                {f.title}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-[3px] text-[10px] font-semibold uppercase tracking-wide border shrink-0",
                  f.status === "in-progress" && "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-300/50",
                  f.status === "planned" && "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 border-blue-300/50",
                  f.status === "idea" && "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-200 border-gray-300/50",
                  f.status === "beta" && "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 border-purple-300/50",
                  f.status === "launched" && "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 border-green-300/50"
                )}
              >
                {statusLabels[f.status]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">
              {f.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
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
                {f.votes} votes
              </span>
              <span className="text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition">
                Explore →
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-focus-visible:ring-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}
