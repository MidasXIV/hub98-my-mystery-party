"use client";

import { useEffect, useRef } from "react";

type ProgressTrackerProps = {
  caseSlug: string;
  completedObjectiveIds: string[];
  /** If true, mark events as applying to the 'kits' collection */
  isKit?: boolean;
};

async function sendProgressEvent(payload: Record<string, unknown>) {
  try {
    await fetch("/api/player-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to sync player progress", error);
  }
}

export default function PlayerProgressTracker({
  caseSlug,
  completedObjectiveIds,
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
  }, [caseSlug]);

  useEffect(() => {
    const unsyncedObjectiveIds = completedObjectiveIds.filter(
      (objectiveId) => !syncedObjectiveIdsRef.current.has(objectiveId),
    );

    if (unsyncedObjectiveIds.length === 0) return;

    unsyncedObjectiveIds.forEach((objectiveId) => {
      syncedObjectiveIdsRef.current.add(objectiveId);
      void sendProgressEvent({
        type: "objective-solved",
        caseSlug,
        objectiveId,
        occurredAt: new Date().toISOString(),
          isKit: isKit === true,
      });
    });
  }, [caseSlug, completedObjectiveIds]);

  return null;
}
