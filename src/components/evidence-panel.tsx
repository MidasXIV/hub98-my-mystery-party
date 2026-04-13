"use client";
import React from "react";
import GenericFloatingPanel from "./floating-panel";
import { parseClueContent } from "@/lib/clue-utils";

// Align with BoardItem shape used in play/[slug]/page.tsx
export interface EvidencePanelItem {
  id: string;
  title?: string;
  type: string; // We'll accept raw type strings; consumer ensures validity.
  content: string;
}

export interface EvidencePanelProps {
  items: EvidencePanelItem[];
  onFocus: (id: string) => void; // Called when user selects an evidence item
  objectiveUnlocks?: Array<{
    objectiveId: string;
    label: string;
    itemIds: string[];
  }>;
  onClose?: () => void;
  className?: string;
}

// Display order (mirrors ITEM_TYPES ordering for familiarity)
const TYPE_ORDER = [
  "case-briefing",
  "photo",
  "document",
  "note",
  "folder-tab",
  "autopsy-report",
  "formal-alibi",
  "interrogation-transcript",
  "newspaper",
  "diary", // newly supported journal/log items
  "clue",
  "person-of-interest-report",
  "bank-statement",
  "receipt",
  "ticket",
  "phoneLog",
  "activity-log",
  "map",
  "search-and-rescue-report",
  "missing-person-report",
  "electronic-messages",
  "transmission-log",
];

// Utility: group items by type preserving defined type order
function groupByType(items: EvidencePanelItem[]) {
  const map: Record<string, EvidencePanelItem[]> = {};
  for (const item of items) {
    if (!map[item.type]) map[item.type] = [];
    map[item.type].push(item);
  }
  return TYPE_ORDER.filter((t) => map[t] && map[t].length > 0).map((t) => ({
    type: t,
    items: map[t],
  }));
}

export default function EvidencePanel({
  items,
  onFocus,
  objectiveUnlocks = [],
  onClose,
}: EvidencePanelProps) {
  const [activeObjectiveFilter, setActiveObjectiveFilter] = React.useState<string>("all");

  React.useEffect(() => {
    if (activeObjectiveFilter === "all") return;
    const exists = objectiveUnlocks.some((o) => o.objectiveId === activeObjectiveFilter);
    if (!exists) setActiveObjectiveFilter("all");
  }, [activeObjectiveFilter, objectiveUnlocks]);

  const filteredItems = React.useMemo(() => {
    if (activeObjectiveFilter === "all") return items;
    const selected = objectiveUnlocks.find(
      (o) => o.objectiveId === activeObjectiveFilter,
    );
    if (!selected) return items;
    const idSet = new Set(selected.itemIds);
    return items.filter((item) => idSet.has(item.id));
  }, [activeObjectiveFilter, objectiveUnlocks, items]);

  const grouped = React.useMemo(() => groupByType(filteredItems), [filteredItems]);

  return (
    <GenericFloatingPanel
      trigger={
        <div
          className="font-staatliches tracking-wider text-xs md:text-sm px-3 py-2 rounded-md bg-white/80 dark:bg-black/40 border border-gray-300/60 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 shadow-sm transition pointer-events-auto cursor-pointer"
          aria-label="Open evidence list"
        >
          Evidence
        </div>
      }
      title={
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h4l3 12 4-16 3 12h4"
            />
          </svg>
          <span>Evidence</span>
        </span>
      }
      onClose={onClose}
      //   initialSize={{ height: 420 }}
      contentStyle={{
        height: "100%",
        maxHeight: "420px",
        display: "flex",
        flexDirection: "column",
      }}
      bodyClassName="flex flex-col gap-4 flex-1 overflow-y-auto px-0"
      headerActions={
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-mono text-gray-500 dark:text-gray-400"
            aria-hidden
          >
            {filteredItems.length}/{items.length} items
          </span>
        </div>
      }
    >
      <div className="flex flex-col gap-4 px-3 pb-3">
        {objectiveUnlocks.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="font-staatliches tracking-wider text-[11px] uppercase text-gray-700 dark:text-gray-300">
              Filter by objective unlock
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setActiveObjectiveFilter("all")}
                className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-wide border transition ${
                  activeObjectiveFilter === "all"
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-gray-100/70 dark:bg-white/10 border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                }`}
              >
                All
              </button>
              {objectiveUnlocks.map((objective) => (
                <button
                  key={objective.objectiveId}
                  type="button"
                  onClick={() => setActiveObjectiveFilter(objective.objectiveId)}
                  className={`px-2 py-1 rounded-md text-[10px] border transition ${
                    activeObjectiveFilter === objective.objectiveId
                      ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
                      : "bg-gray-100/70 dark:bg-white/10 border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                  }`}
                  title={objective.label}
                >
                  <span className="font-special-elite">
                    {objective.label}
                  </span>{" "}
                  <span className="font-mono opacity-70">({objective.itemIds.length})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {grouped.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono px-1">
            {activeObjectiveFilter === "all"
              ? "No evidence items yet."
              : "No evidence unlocked for this objective yet."}
          </p>
        )}
        {grouped.map(({ type, items }) => {
          return (
            <div key={type} className="flex flex-col gap-1">
              <h4 className="font-staatliches tracking-wider text-[11px] uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <span>{type.replace(/-/g, " ")}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  ({items.length})
                </span>
              </h4>
              <ul className="flex flex-col gap-1">
                {items.map((it) => {
                  // Derive a short label from content (first 40 chars),
                  // with clue-specific parsing to avoid showing raw JSON.
                  const sourceText =
                    it.type === "clue"
                      ? parseClueContent(it.content).clue
                      : it.content;
                  const compactSource = sourceText.replace(/\n+/g, " ").trim();
                  const preview =
                    it.title && it.title.trim().length > 0
                      ? it.title
                      : compactSource.slice(0, 40) +
                        (compactSource.length > 40 ? "…" : "");
                  return (
                    <li key={it.id}>
                      <button
                        onClick={() => onFocus(it.id)}
                        title={it.content}
                        className="group w-full text-left px-2 py-1 rounded-md text-[11px] leading-tight font-mono bg-gray-100/70 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-200 transition flex items-start gap-2"
                      >
                        <span
                          className="flex-1 truncate"
                          aria-label={`${type} content`}
                        >
                          {preview || "(empty)"}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-3 h-3 opacity-40 group-hover:opacity-80 transition"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v14m7-7H5"
                          />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </GenericFloatingPanel>
  );
}
