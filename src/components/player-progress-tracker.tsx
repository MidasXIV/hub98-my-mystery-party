"use client";

import { useEffect, useRef } from "react";

type ProgressTrackerProps = {
  caseSlug: string;
  completedObjectiveIds: string[];
  totalObjectives?: number;
  alreadySyncedObjectiveIds?: string[];
  /** If true, mark events as applying to the 'kits' collection */
  isKit?: boolean;
};

async function sendProgressEvent(payload: Record<string, unknown>) {
  try {
    await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "player-progress", ...payload }),
    });
  } catch (error) {
    console.error("Failed to sync player progress", error);
  }
}

export default function PlayerProgressTracker({
  caseSlug,
  completedObjectiveIds,
  totalObjectives,
  alreadySyncedObjectiveIds,
  isKit,
}: ProgressTrackerProps) {
  const hasTrackedCaseOpenRef = useRef(false);
  const syncedObjectiveIdsRef = useRef(new Set<string>());

  useEffect(() => {
    if (hasTrackedCaseOpenRef.current) return;
    hasTrackedCaseOpenRef.current = true;
    void sendProgressEvent({
      type: "case-opened",
      caseSlug,
      occurredAt: new Date().toISOString(),
      isKit: isKit === true,
    });
  }, [caseSlug, isKit]);

  useEffect(() => {
    if (Array.isArray(alreadySyncedObjectiveIds)) {
      for (const objectiveId of alreadySyncedObjectiveIds) {
        if (typeof objectiveId === "string" && objectiveId.length > 0) {
          syncedObjectiveIdsRef.current.add(objectiveId);
        }
      }
    }

    const unsyncedObjectiveIds = completedObjectiveIds.filter(
      (objectiveId) => !syncedObjectiveIdsRef.current.has(objectiveId),
    );

    if (unsyncedObjectiveIds.length === 0) return;

    unsyncedObjectiveIds.forEach((objectiveId, index) => {
      const nextCompletedCount =
        syncedObjectiveIdsRef.current.size + (index + 1);
      const shouldMarkCaseComplete =
        typeof totalObjectives === "number" &&
        totalObjectives > 0 &&
        nextCompletedCount >= totalObjectives;

      syncedObjectiveIdsRef.current.add(objectiveId);
      void sendProgressEvent({
        type: "objective-solved",
        caseSlug,
        objectiveId,
        occurredAt: new Date().toISOString(),
        markCaseComplete: shouldMarkCaseComplete,
        isKit: isKit === true,
      });
    });
  }, [alreadySyncedObjectiveIds, caseSlug, completedObjectiveIds, isKit, totalObjectives]);

  return null;
}
