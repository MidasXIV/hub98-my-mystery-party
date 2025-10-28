/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import GenericFloatingPanel from "./floating-panel";

interface Objective {
  id: string;
  description: string;
}

interface ObjectivesPanelProps {
  objectives: Objective[];
  completedObjectives: Set<string>;
  onAttemptSolve: (objectiveId: string) => void;
}

export default function ObjectivesPanel({
  objectives,
  completedObjectives,
  onAttemptSolve,
}: ObjectivesPanelProps) {
  
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <GenericFloatingPanel
      className="h-fit"
      trigger={
        <div className="font-staatliches tracking-wider text-xs md:text-sm px-3 py-2 rounded-md bg-white/80 dark:bg-black/40 border border-gray-300/60 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 shadow-sm transition">
          Objectives
        </div>
      }
      title="Objectives panel"
    >
      <div className="p-3">
        <ul className="space-y-2">
          {objectives.map(
            (obj: {
              id: React.Key;
              description:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => {
              const isCompleted = completedObjectives.has(String(obj.id));
              return (
                <li
                  key={obj.id}
                  onClick={() => !isCompleted && onAttemptSolve(String(obj.id))}
                  className={`flex items-start group ${
                    isCompleted ? "cursor-default" : "cursor-pointer"
                  }`}
                  role="button"
                  aria-disabled={isCompleted}
                  tabIndex={isCompleted ? -1 : 0}
                  onKeyDown={(e) =>
                    !isCompleted &&
                    (e.key === " " || e.key === "Enter") &&
                    onAttemptSolve(String(obj.id))
                  }
                >
                  <div
                    className={`mt-1 mr-3 w-4 h-4 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-colors ${
                      isCompleted
                        ? "bg-yellow-400 border-yellow-400"
                        : "border-gray-500 group-hover:border-yellow-300"
                    }`}
                  >
                    {isCompleted && (
                      <span className="text-black font-bold text-xs">✓</span>
                    )}
                  </div>
                  <span
                    className={`font-special-elite text-sm transition-colors ${
                      isCompleted
                        ? "line-through text-gray-500"
                        : "text-gray-700 dark:text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {obj.description}
                  </span>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </GenericFloatingPanel>
  );
}
