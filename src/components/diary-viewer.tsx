"use client";
import React from "react";

/*
DiaryViewer
-----------
Parses a BoardItem.content JSON string for diary data.
Expected JSON shape:
{
  "title": "Agent Log",
  "entriesPerPage": 2, // optional, default 2
  "diaryEntries": [
     { "date": "2025-11-01", "entries": ["Entry text 1", "Entry text 2"] },
     { "date": "2025-11-02", "entries": ["Single entry for day"] }
  ]
}
If content is NOT valid JSON the raw text is shown as a single page.
*/

interface DiaryDay {
  date?: string;
  entries: string[];
}
interface DiaryData {
  title?: string;
  entriesPerPage?: number;
  diaryEntries?: DiaryDay[];
}

export function DiaryViewer({ content }: { content: string }) {
  let data: DiaryData = {};
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object") data = parsed as DiaryData;
  } catch {
    // fallback: treat raw content as single page with one entry
    data = {
      title: "Diary",
      diaryEntries: [{ entries: [content] }],
      entriesPerPage: 2,
    };
  }

  const entriesPerPage = Math.max(1, data.entriesPerPage ?? 2);
  const days: DiaryDay[] = Array.isArray(data.diaryEntries)
    ? data.diaryEntries.map((d) => ({ entries: d.entries || [], date: d.date }))
    : [];
  const totalPages = days.length === 0 ? 1 : Math.ceil(days.length / entriesPerPage);
  const [page, setPage] = React.useState(0);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const startIndex = page * entriesPerPage;
  const visibleDays = days.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="bg-[#f5efe5] text-gray-900 font-special-elite p-6 rounded-md shadow-xl max-w-3xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-staatliches tracking-wider">
          {data.title || "Field Diary"}
        </h2>
        <div className="flex items-center gap-2 text-sm font-mono">
          <span className="px-2 py-1 bg-gray-200 rounded">Page {page + 1}/{totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="px-2 py-1 bg-gray-300 disabled:bg-gray-400 text-gray-800 rounded-sm hover:bg-gray-400 transition"
              aria-label="Previous page"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              disabled={page >= totalPages - 1}
              className="px-2 py-1 bg-gray-300 disabled:bg-gray-400 text-gray-800 rounded-sm hover:bg-gray-400 transition"
              aria-label="Next page"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
      {visibleDays.length === 0 && (
        <p className="italic text-gray-500">No entries recorded.</p>
      )}
      {/* Render days vertically (rows). entriesPerPage determines number of rows per page now. */}
      <div className="flex flex-col gap-6">
        {visibleDays.map((day, idx) => (
          <div
            key={(day.date || "day") + idx}
            className="bg-[#fffaf2] border border-gray-300 rounded-sm p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-600">
                {day.date || `Day ${startIndex + idx + 1}`}
              </span>
              <span className="text-[10px] text-gray-400">
                {day.entries.length} entr{day.entries.length === 1 ? "y" : "ies"}
              </span>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              {day.entries.map((entry, eIdx) => (
                <p key={eIdx} className="whitespace-pre-wrap">
                  {entry}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-[11px] text-gray-500 font-mono flex justify-between items-center">
        <span>Entries/Page: {entriesPerPage}</span>
        <span>Total Days: {days.length}</span>
      </div>
      {/* <p className="mt-3 text-xs text-gray-400 italic">
        JSON schema: {`{ title?, entriesPerPage?, diaryEntries: [ { date?, entries: string[] } ] }`}
      </p> */}
    </div>
  );
}

export default DiaryViewer;
