"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CaseAnalyticsRow } from "@/lib/case-analytics";

type Props = {
  row: CaseAnalyticsRow;
  casePoster?: string;
  minPlayersForDistribution: number;
};

function formatMinutes(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0m";

  if (minutes < 60) {
    return `${minutes.toFixed(1)}m`;
  }

  const hours = minutes / 60;
  return `${hours.toFixed(2)}h`;
}

function formatPercent(decimal: number): string {
  if (!Number.isFinite(decimal) || decimal <= 0) return "0%";
  return `${(decimal * 100).toFixed(1)}%`;
}

function getBarHeight(value: number, maxValue: number): string {
  if (maxValue <= 0) return "0%";
  const percentage = (value / maxValue) * 100;
  return `${Math.max(0, Math.min(100, percentage)).toFixed(1)}%`;
}

function SolvedDistributionChart({ row }: { row: CaseAnalyticsRow }) {
  const maxPlayers = Math.max(
    1,
    ...row.objectivesSolvedDistribution.map((bucket) => bucket.players),
  );

  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">Objectives solved distribution</h4>
        <p className="text-xs text-muted-foreground">Players by exact solved count</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max items-end gap-2 rounded-lg border border-border/50 bg-card/40 px-3 py-3">
          {row.objectivesSolvedDistribution.map((bucket) => (
            <div
              key={`${row.caseSlug}-solved-${bucket.solvedCount}`}
              className="w-14 shrink-0"
            >
              <div className="h-24 flex items-end rounded-sm border border-border/40 bg-background/50 px-1">
                <div
                  className="w-full rounded-sm bg-[oklch(var(--color-chart-2))]"
                  style={{ height: getBarHeight(bucket.players, maxPlayers) }}
                  aria-label={`${bucket.players} players solved exactly ${bucket.solvedCount} objectives`}
                />
              </div>
              <p className="mt-1 text-center text-[10px] text-muted-foreground">{bucket.solvedCount}</p>
              <p className="text-center text-xs font-semibold">{bucket.players}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObjectiveCompletionChart({ row }: { row: CaseAnalyticsRow }) {
  const maxPlayersSolved = Math.max(
    1,
    ...row.objectiveCompletionDistribution.map((entry) => entry.playersSolved),
  );

  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">Objective-wise completion distribution</h4>
        <p className="text-xs text-muted-foreground">Solve funnel in canonical objective order</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max items-end gap-2 rounded-lg border border-border/50 bg-card/40 px-3 py-3">
          {row.objectiveCompletionDistribution.map((objective) => (
            <div
              key={`${row.caseSlug}-objective-${objective.objectiveId}`}
              className="w-14 shrink-0"
            >
              <div className="h-24 flex items-end rounded-sm border border-border/40 bg-background/50 px-1">
                <div
                  className="w-full rounded-sm bg-[oklch(var(--color-chart-1))]"
                  style={{ height: getBarHeight(objective.playersSolved, maxPlayersSolved) }}
                  aria-label={`${objective.playersSolved} players solved objective ${objective.objectiveIndex}`}
                />
              </div>
              <p className="mt-1 text-center text-[10px] text-muted-foreground">O{objective.objectiveIndex}</p>
              <p className="text-center text-xs font-semibold">{objective.playersSolved}</p>
              <p className="text-center text-[10px] text-muted-foreground">
                {formatPercent(objective.solveRate)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-4 space-y-1 text-xs text-muted-foreground">
        {row.objectiveCompletionDistribution.map((objective) => (
          <li key={`${row.caseSlug}-objective-label-${objective.objectiveId}`}>
            <span className="font-semibold text-foreground">Obj {objective.objectiveIndex}:</span>{" "}
            {objective.objectiveLabel}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function CaseAnalyticsRowItem({
  row,
  casePoster,
  minPlayersForDistribution,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const insufficientData = row.playersAttempted < minPlayersForDistribution;

  const distributionSegments = useMemo(() => {
    const attempted = row.playersAttempted;
    if (attempted <= 0) {
      return {
        zero: 0,
        one: 0,
        twoPlus: 0,
      };
    }

    const zero =
      row.objectivesSolvedDistribution.find((bucket) => bucket.solvedCount === 0)?.players ??
      0;
    const one =
      row.objectivesSolvedDistribution.find((bucket) => bucket.solvedCount === 1)?.players ??
      0;
    const twoPlus = Math.max(0, attempted - zero - one);

    return {
      zero: (zero / attempted) * 100,
      one: (one / attempted) * 100,
      twoPlus: (twoPlus / attempted) * 100,
    };
  }, [row.objectivesSolvedDistribution, row.playersAttempted]);

  return (
    <>
      <tr className="border-b border-border/40">
        <td className="px-4 py-3 align-top">
          <div className="flex items-center gap-3">
            {casePoster ? (
              <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded border border-border/50">
                <Image
                  src={casePoster}
                  alt={`${row.caseTitle} poster`}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="min-w-0">
              <p className="truncate font-semibold">{row.caseTitle}</p>
              <p className="truncate text-xs text-muted-foreground">{row.caseSlug}</p>
              {insufficientData ? (
                <span
                  className="mt-1 inline-flex rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-200"
                  title={`Low sample size: n=${row.playersAttempted}. Interpret distributions carefully until at least ${minPlayersForDistribution} players.`}
                >
                  n={row.playersAttempted}
                </span>
              ) : null}
            </div>
          </div>
        </td>

        <td className="px-4 py-3 text-right font-semibold">{row.playersAttempted}</td>
        <td className="px-4 py-3 text-right font-semibold">{formatPercent(row.completionRate)}</td>
        <td className="px-4 py-3 text-right font-semibold">{formatMinutes(row.averageMinutesSpent)}</td>

        <td className="px-4 py-3">
          <div className="w-full min-w-[180px]">
            <div
              className="flex h-2 overflow-hidden rounded-full border border-border/60"
              role="img"
              aria-label="Objectives solved mini distribution"
            >
              <span
                className="bg-[oklch(var(--color-chart-4))]"
                style={{ width: `${distributionSegments.zero}%` }}
                title={`0 solved: ${distributionSegments.zero.toFixed(1)}%`}
              />
              <span
                className="bg-[oklch(var(--color-chart-2))]"
                style={{ width: `${distributionSegments.one}%` }}
                title={`1 solved: ${distributionSegments.one.toFixed(1)}%`}
              />
              <span
                className="bg-[oklch(var(--color-chart-1))]"
                style={{ width: `${distributionSegments.twoPlus}%` }}
                title={`2+ solved: ${distributionSegments.twoPlus.toFixed(1)}%`}
              />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              0: {distributionSegments.zero.toFixed(0)}% · 1: {distributionSegments.one.toFixed(0)}% · 2+: {distributionSegments.twoPlus.toFixed(0)}%
            </p>
          </div>
        </td>

        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs font-medium hover:bg-accent"
          >
            {expanded ? "Hide" : "View"} breakdown
            <span aria-hidden>{expanded ? "▲" : "▼"}</span>
          </button>
        </td>
      </tr>

      {expanded ? (
        <tr className="border-b border-border/40 bg-background/30">
          <td colSpan={6} className="px-4 py-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <SolvedDistributionChart row={row} />
              <ObjectiveCompletionChart row={row} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Median time spent: {formatMinutes(row.medianMinutesSpent)}
            </p>
          </td>
        </tr>
      ) : null}
    </>
  );
}
