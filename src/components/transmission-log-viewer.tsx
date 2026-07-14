"use client";

import React, { useMemo } from "react";
import { parseTransmissionLog, TransmissionEntry } from "@/lib/transmission-log-utils";

// --- CSS ---
const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@400;700&display=swap');

    /* A4 Sheet Logic */
    .tech-sheet {
      background-color: #ffffff;
      /* Subtle Grid */
      background-image: 
        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 20px 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 800px;
      /* Minimum height of A4 at screen resolution approx */
      min-height: 1100px; 
      margin-bottom: 2rem;
      position: relative;
      color: #111;
    }

    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-header { font-family: 'Oswald', sans-serif; }

    /* Table Styles */
    .log-row {
      border-bottom: 1px solid #e5e7eb;
    }
    .log-row:last-child { border-bottom: none; }
    
    .bg-stripe:nth-child(even) {
      background-color: #f9fafb;
    }

    /* Print pagination hardening */
    @media print {
      .tech-sheet {
        width: 210mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        margin: 0 !important;
        box-shadow: none !important;
        break-after: page;
        page-break-after: always;
        overflow: hidden;
      }

      .log-row,
      .log-entry-block,
      .log-notes {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  `}</style>
);

// --- Pagination Helper ---
// Deterministic page budgeting for A4 pages.
// Higher safety margin helps move tall rows to the next page instead of clipping.
function paginateEntries(entries: TransmissionEntry[]): TransmissionEntry[][] {
  const pages: TransmissionEntry[][] = [];
  let currentPage: TransmissionEntry[] = [];
  const headerFooterLoad = 20;
  const maxLoad = 108; // conservative usable budget for one A4 page
  const maxEntryLoad = maxLoad - headerFooterLoad - 2;
  let currentLoad = headerFooterLoad;

  const estimateWrappedLines = (text: string, charsPerLine: number) => {
    if (!text) return 1;
    return text
      .split("\n")
      .reduce((sum, line) => sum + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
  };

  entries.forEach((entry) => {
    // Estimate row height: base + wrapped content lines.
    const noteLines = estimateWrappedLines(entry.notes || "", 62);
    const numberLines = estimateWrappedLines(entry.number || "", 34);
    const entryLoad = 4 + noteLines + Math.min(2, numberLines);

    // Cap pathological rows so they still get placed on a page by themselves.
    const boundedEntryLoad = Math.min(entryLoad, maxEntryLoad);

    if (currentLoad + boundedEntryLoad > maxLoad) {
      // Push current page and reset
      if (currentPage.length > 0) {
        pages.push(currentPage);
      }
      currentPage = [];
      currentLoad = headerFooterLoad;
    }

    currentPage.push(entry);
    currentLoad += boundedEntryLoad;
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

export default function TransmissionLogViewer({ content }: { content: string }) {
  const data = useMemo(() => parseTransmissionLog(content), [content]);
  const pages = useMemo(() => paginateEntries(data.entries), [data.entries]);

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {pages.map((pageEntries, pageIndex) => (
        <div key={pageIndex} className="tech-sheet p-8 md:p-12 flex flex-col">
          
          {/* --- PAGE HEADER --- */}
          <div className="border-b-2 border-black pb-4 mb-6">
             <div className="flex justify-between items-start mb-2">
                <h2 className="font-header text-3xl font-bold uppercase tracking-tight">
                  Transmission Log
                </h2>
                <div className="text-right">
                   <div className="bg-black text-white px-2 py-1 font-mono text-xs font-bold inline-block mb-1">
                     CLASSIFIED // LEVEL 4
                   </div>
                   <div className="font-mono text-xs text-gray-500">
                     PAGE {pageIndex + 1} OF {pages.length}
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs mt-4">
                <div>
                   <span className="block text-gray-400 text-[9px] uppercase">Case Reference</span>
                   <span className="font-bold">{data.caseRef}</span>
                </div>
                <div>
                   <span className="block text-gray-400 text-[9px] uppercase">Date Range</span>
                   <span className="font-bold">{data.date}</span>
                </div>
                <div>
                   <span className="block text-gray-400 text-[9px] uppercase">Location / Source</span>
                   <span className="font-bold truncate">{data.location}</span>
                </div>
                <div>
                   <span className="block text-gray-400 text-[9px] uppercase">Operator</span>
                   <span className="font-bold">{data.operator}</span>
                </div>
             </div>
          </div>

          {/* --- LOG TABLE --- */}
          <div className="flex-1 font-mono text-xs md:text-sm">
             {/* Table Head */}
             <div className="grid grid-cols-12 border-b-2 border-gray-800 pb-2 mb-2 font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Dir</div>
                <div className="col-span-8">Message Data</div>
             </div>

             {/* Entries */}
             <div className="flex flex-col">
               {pageEntries.map((entry, i) => (
            <div key={i} className="grid grid-cols-12 py-3 log-row log-entry-block bg-stripe">
                    {/* Time */}
                    <div className="col-span-2 font-bold text-gray-800">
                      {entry.time}
                    </div>
                    
                    {/* Direction / Type */}
                    <div className="col-span-2 pr-2">
                       <span className={`inline-block px-1.5 py-0.5 rounded border text-[10px] font-bold ${
                         entry.direction.includes('IN') ? 'bg-green-100 text-green-800 border-green-200' : 
                         entry.direction.includes('OUT') ? 'bg-blue-100 text-blue-800 border-blue-200' :
                         entry.direction.includes('ERR') ? 'bg-red-100 text-red-800 border-red-200' :
                         'bg-gray-100 text-gray-700 border-gray-300'
                       }`}>
                         {entry.direction}
                       </span>
                       <div className="text-[9px] text-gray-400 mt-1">
                         {entry.duration}
                       </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-8 pl-2 border-l border-gray-200 log-notes">
                       <div className="font-bold mb-1 text-gray-900">
                         {entry.number}
                       </div>
                       <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                         {entry.notes}
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* --- PAGE FOOTER --- */}
          <div className="mt-auto pt-6 border-t border-gray-300 flex justify-between items-center opacity-60">
             <div className="font-mono text-[9px] uppercase">
                AegisCorp Secure Archives • Auto-Generated Report
             </div>
             <div className="font-mono text-[9px]">
           {`${data.caseRef} // SEQ-${pageIndex + 1}`}
             </div>
          </div>

        </div>
      ))}
    </div>
  );
}