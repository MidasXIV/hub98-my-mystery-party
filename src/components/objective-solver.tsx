"use client";

import { useEffect, useMemo, useState } from "react";
import type { BoardData, BoardItem, Objective } from "@/lib/boardTypes";

type ObjectiveSolveResponse = {
  allowed: boolean;
  category?: string;
  reason?: string;
  correct?: boolean;
  score?: number;
  items?: unknown[];
  connections?: unknown[];
};

function isRecord(val: unknown): val is Record<string, unknown> {
  return Boolean(val) && typeof val === "object";
}

function isBoardItem(val: unknown): val is BoardItem {
  return isRecord(val) && typeof val.id === "string";
}

function isConnection(val: unknown): val is { from: string; to: string } {
  return (
    isRecord(val) && typeof val.from === "string" && typeof val.to === "string"
  );
}

export type ObjectiveSolverProps = {
  caseSlug: string;
  boardData: BoardData;
  objective: Objective | null;
  isOpen: boolean;
  onClose: () => void;
  onSolved: (args: {
    objectiveId: string;
    correct: boolean;
    score: number;
    unlockedItems: BoardItem[];
    unlockedConnections: Array<{ from: string; to: string }>;
  }) => void;
  normalizeItemSize: (item: BoardItem) => BoardItem;
};

function normalizeText(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ObjectiveSolver({
  caseSlug,
  boardData,
  objective,
  isOpen,
  onClose,
  onSolved,
  normalizeItemSize,
}: ObjectiveSolverProps) {
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState<
    | { phase: "idle" }
    | { phase: "submitting" }
    | { phase: "result"; correct: boolean; score: number; evidenceAdded: number }
    | { phase: "error"; message: string }
  >({ phase: "idle" });

  useEffect(() => {
    if (!isOpen) return;
    setSolution("");
    setStatus({ phase: "idle" });
  }, [isOpen, objective?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const objectiveLabel = useMemo(() => {
    if (!objective) return "[unknown objective]";
    return objective.description || objective.id;
  }, [objective]);

  if (!isOpen || !objective) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective) return;

    setStatus({ phase: "submitting" });

    try {
      const res = await fetch("/api/board/objective", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseSlug,
          boardData,
          objectiveId: objective.id,
          objectiveDescription: objective.description,
          solutionText: solution,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | ObjectiveSolveResponse
        | null;

      if (!res.ok) {
        const msg =
          payload?.reason || payload?.["error" as keyof ObjectiveSolveResponse] || `HTTP ${res.status}`;
        setStatus({ phase: "error", message: String(msg) });
        return;
      }

      if (!payload?.allowed) {
        setStatus({
          phase: "error",
          message:
            payload?.reason ||
            "That submission was blocked. Please revise and try again.",
        });
        return;
      }

      const correct = Boolean(payload.correct);
      const scoreRaw = typeof payload.score === "number" ? payload.score : 0;
      const score = Math.max(0, Math.min(1, scoreRaw));

      const itemsToAdd = Array.isArray(payload.items)
        ? (payload.items
            .filter(isBoardItem)
            .map((it) => normalizeItemSize(it)))
        : [];

      const connectionsToAdd = Array.isArray(payload.connections)
        ? (payload.connections.filter(isConnection) as Array<{
            from: string;
            to: string;
          }>)
        : [];

      setStatus({
        phase: "result",
        correct,
        score,
        evidenceAdded: itemsToAdd.length,
      });

      onSolved({
        objectiveId: objective.id,
        correct,
        score,
        unlockedItems: itemsToAdd,
        unlockedConnections: connectionsToAdd,
      });

      // Auto-close shortly after showing result so it feels responsive
      setTimeout(() => {
        onClose();
      }, 900);
    } catch {
      setStatus({
        phase: "error",
        message: "Failed to process findings. Intel connection may be unstable.",
      });
    }
  };

  const isSubmitting = status.phase === "submitting";
  const canSubmit = normalizeText(solution).length > 0 && !isSubmitting;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[350] flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900 border border-yellow-500/50 rounded-md shadow-lg p-6 m-4 max-w-lg w-full"
        onClick={(ev) => ev.stopPropagation()}
      >
        <h2 className="text-xl font-staatliches tracking-wider text-yellow-400 mb-2">
          SOLVE OBJECTIVE
        </h2>
        <p className="font-special-elite text-gray-300 mb-4 border-t border-b border-gray-700 py-3">
          {objectiveLabel}
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="solution-text"
            className="font-special-elite text-sm text-gray-400"
          >
            Enter your findings or theory:
          </label>
          <textarea
            id="solution-text"
            value={solution}
            onChange={(ev) => setSolution(ev.target.value)}
            className="w-full h-32 p-2 mt-1 bg-gray-800 border border-gray-600 rounded-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono"
            placeholder="Detail your conclusions here..."
            required
          />

          {status.phase === "result" && (
            <div
              className={`mt-3 rounded-sm border px-3 py-2 font-special-elite text-sm ${
                status.correct
                  ? "border-green-500/40 bg-green-950/40 text-green-200"
                  : "border-red-500/40 bg-red-950/40 text-red-200"
              }`}
            >
              <div className="font-staatliches tracking-wide">
                {status.correct ? "Correct" : "Not quite"}
                {Number.isFinite(status.score) ? (
                  <span className="opacity-90"> · Score {Math.round(status.score * 100)}%</span>
                ) : null}
              </div>
              {status.correct && status.evidenceAdded > 0 ? (
                <div className="opacity-90">
                  {status.evidenceAdded} new evidence {status.evidenceAdded === 1 ? "item" : "items"} added to the board.
                </div>
              ) : null}
            </div>
          )}

          {status.phase === "error" && (
            <div className="mt-3 rounded-sm border border-red-500/40 bg-red-950/40 px-3 py-2 font-special-elite text-sm text-red-200">
              {status.message}
            </div>
          )}

          <div className="flex justify-end items-center mt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="font-staatliches tracking-wider px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="font-staatliches tracking-wider px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400 rounded-sm transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? "Analyzing..." : "Submit Findings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
