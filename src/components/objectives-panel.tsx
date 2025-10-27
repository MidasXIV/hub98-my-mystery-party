import { useState } from "react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 left-0 z-[200] bg-gray-900/80 backdrop-blur-sm border-y border-r border-gray-600 rounded-r-lg shadow-lg transition-transform duration-300 ease-in-out ${
        isCollapsed ? "-translate-x-[calc(100%-2rem)]" : "translate-x-0"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-16 bg-gray-700/80 hover:bg-gray-600/80 rounded-r-md flex items-center justify-center text-gray-300 focus:outline-none"
        aria-label={isCollapsed ? "Show objectives" : "Hide objectives"}
        style={{ transform: `translateX(100%)` }}
      >
        <span
          className={`transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
          {"<"}
        </span>
      </button>
      <div className="p-4 w-64">
        <h2 className="text-xl font-staatliches tracking-wider text-yellow-400 border-b border-gray-600 pb-2 mb-3">
          Mission Objectives
        </h2>
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
                        : "text-gray-300 group-hover:text-white"
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
    </div>
  );
}