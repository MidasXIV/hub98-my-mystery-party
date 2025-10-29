"use client";
import React from "react";
import GenericFloatingPanel from "./floating-panel";

// Reuse board item shape minimally for timeline extraction
export interface TimelinePanelSourceItem {
  id: string;
  type: string;
  content: string;
}

export interface TimelinePanelProps {
  items: TimelinePanelSourceItem[]; // full board items
  onFocus: (id: string) => void; // focus single item on board
  onOpenFull: () => void; // open full timeline overlay
  onClose?: () => void; // optional close callback from floating panel
}

interface TimelineEntry {
  id: string;
  type: string;
  date: Date;
  title: string;
  summary: string;
}

function parseTimelineItems(items: TimelinePanelSourceItem[]): TimelineEntry[] {
  const parsed: TimelineEntry[] = [];
  for (const item of items) {
    if (item.type !== "newspaper" && item.type !== "interrogation-transcript") continue;
    try {
      if (item.type === "newspaper") {
        const data = JSON.parse(item.content);
        if (data?.date) {
          const date = new Date(data.date);
          if (!isNaN(date.getTime())) {
            parsed.push({
              id: item.id,
              type: item.type,
              date,
              title: typeof data.headline === "string" ? data.headline : "Newspaper Clipping",
              summary: typeof data.body === "string" ? (data.body.slice(0, 80).trim() + (data.body.length > 80 ? "…" : "")) : "",
            });
          }
        }
      } else if (item.type === "interrogation-transcript") {
        const dateMatch = item.content.match(/^INTERVIEW DATE: (.*)/m);
        const subjectMatch = item.content.match(/^SUBJECT: (.*)/m);
        if (dateMatch && dateMatch[1]) {
          const date = new Date(dateMatch[1]);
          if (!isNaN(date.getTime())) {
            const subject = subjectMatch && subjectMatch[1] ? subjectMatch[1].trim() : "Interview";
            // Strip header lines for summary
            const body = item.content
              .replace(/^INTERVIEW DATE: .*\n?/, "")
              .replace(/^SUBJECT: .*\n?/, "")
              .trim();
            parsed.push({
              id: item.id,
              type: item.type,
              date,
              title: `Interrogation: ${subject}`,
              summary: body.slice(0, 80).trim() + (body.length > 80 ? "…" : ""),
            });
          }
        }
      }
    } catch {
      // Non-fatal parse error; skip item silently
    }
  }
  return parsed.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export default function TimelinePanel({ items, onFocus, onOpenFull, onClose }: TimelinePanelProps) {
  const entries = React.useMemo(() => parseTimelineItems(items), [items]);

  return (
    <GenericFloatingPanel
      trigger={
        <div
          className="font-staatliches tracking-wider text-xs md:text-sm px-3 py-2 rounded-md bg-white/80 dark:bg-black/40 border border-gray-300/60 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 shadow-sm transition pointer-events-auto cursor-pointer"
          aria-label="Open timeline panel"
        >
          Timeline
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <span>Timeline</span>
        </span>
      }
      onClose={onClose}
      contentStyle={{
        height: "100%",
        maxHeight: "420px",
        display: "flex",
        flexDirection: "column",
      }}
      bodyClassName="flex flex-col gap-3 flex-1 overflow-y-auto px-0"
      headerActions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFull}
            className="text-[10px] font-mono px-2 py-1 rounded-md bg-gray-100/70 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-200 transition"
          >
            Full View
          </button>
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400" aria-hidden>
            {entries.length} events
          </span>
        </div>
      }
    >
      <div className="flex flex-col gap-3 px-3 pb-3">
        {entries.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono px-1">No timeline events yet.</p>
        )}
        {entries.map((ev) => (
          <button
            key={ev.id}
            onClick={() => onFocus(ev.id)}
            title={ev.title}
            className="group w-full text-left px-2 py-2 rounded-md text-[11px] leading-tight font-mono bg-gray-100/70 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-200 transition flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-staatliches tracking-wider text-[10px] uppercase text-yellow-600 dark:text-yellow-300">
                {ev.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <span className="text-[9px] text-gray-400 dark:text-gray-500">
                {ev.type === "newspaper" ? "Press" : "Interview"}
              </span>
            </div>
            <span className="truncate font-semibold text-gray-800 dark:text-gray-100">
              {ev.title}
            </span>
            <span className="truncate opacity-70 group-hover:opacity-100 transition">
              {ev.summary}
            </span>
          </button>
        ))}
      </div>
    </GenericFloatingPanel>
  );
}
