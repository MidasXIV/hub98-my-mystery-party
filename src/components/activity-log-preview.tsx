"use client";

import React, { useMemo } from "react";
import { parseActivityLog } from "@/lib/activity-log-utils"; // Assume utils or inline

// --- CSS Assets ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Cedarville+Cursive&family=Courier+Prime:wght@700&display=swap');

    /* 1. Logbook Paper Texture */
    .log-paper {
      background-color: #fdfbf7; /* Cream */
      background-image: 
        /* Horizontal Rule Lines (Pink/Red) */
        linear-gradient(#eebbbb 1px, transparent 1px),
        /* Noise */
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
      background-size: 100% 20px, auto; /* Line height */
      box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    }

    /* 2. Left Binder Margin */
    .binder-margin {
      border-right: 2px solid #eebbbb; /* The vertical margin line */
    }

    /* 3. Hole Punches */
    .binder-hole {
      background-color: #222; /* Dark background behind board */
      box-shadow: inset 1px 1px 2px rgba(0,0,0,0.6);
    }

    /* 4. Handwriting */
    .font-cursive { 
      font-family: 'Cedarville Cursive', cursive; 
      color: #000080; /* Blue Bic Pen */
      opacity: 0.85;
    }
  `}</style>
);

export default function ActivityLogPreview({ content }: { content: string }) {
  const data = useMemo(() => parseActivityLog(content), [content]);
  const headers = data.headers;

  const columns = useMemo(() => {
    const legacyDefaultOrder = ["time", "notes", "number"];
    if (Array.isArray(data.columnOrder) && data.columnOrder.length > 0) {
      return data.columnOrder;
    }

    const headerKeys = headers ? Object.keys(headers) : [];
    if (headerKeys.length > 0) {
      return headerKeys;
    }

    const firstRow = data.entries?.[0];
    const rowKeys = firstRow && typeof firstRow === "object" ? Object.keys(firstRow) : [];
    const merged = [...legacyDefaultOrder, ...rowKeys];
    return Array.from(new Set(merged)).filter(Boolean);
  }, [data.columnOrder, data.entries, headers]);

  const timeKey = columns.includes("time") ? "time" : columns[0] || "time";
  const messageKey =
    columns.find((k) => k !== timeKey) ||
    (columns.length > 1 ? columns[1] : "notes");

  // Take first 3 entries for preview
  const previewEntries = data.entries.slice(0, 3);

  return (
    <div className="w-full h-full p-2 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* Paper Sheet */}
      <div className="w-full h-full log-paper flex relative overflow-hidden transition-transform duration-300 group-hover:rotate-1">
        
        {/* Left Margin (Pink Line) */}
        <div className="w-8 h-full binder-margin flex flex-col items-center justify-evenly py-4 bg-black/5">
           <div className="w-3 h-3 rounded-full binder-hole" />
           <div className="w-3 h-3 rounded-full binder-hole" />
           <div className="w-3 h-3 rounded-full binder-hole" />
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-3 px-2">
           {/* Header */}
           <div className="flex justify-between items-end border-b-2 border-black/80 mb-1 pb-1">
              <span className="font-['Oswald'] text-[9px] uppercase tracking-wide text-gray-700">
                {data.previewLabel ?? data.title ?? "Switchboard"}
              </span>
              <span className="font-mono text-[8px] text-red-800 font-bold">
                {data.date}
              </span>
           </div>

           {/* Grid Lines / Text */}
           <div className="flex flex-col gap-[7px] mt-1">
              {previewEntries.map((entry, i) => (
                <div key={i} className="flex items-baseline text-[10px] leading-none">
                   <span className="font-mono font-bold w-10 text-gray-600">
                     {String((entry as Record<string, unknown>)?.[timeKey] ?? "")}
                   </span>
                   <span className="font-cursive flex-1 truncate ml-1">
                     {String((entry as Record<string, unknown>)?.[messageKey] ?? "")}
                   </span>
                </div>
              ))}
              {/* Ellipsis if more */}
              {data.entries.length > 3 && (
                <div className="text-[8px] font-mono opacity-50 pl-10">...more records...</div>
              )}
           </div>
        </div>

        {/* "Confidential" Stamp */}
        <div className="absolute bottom-2 right-2 border border-red-800/40 text-red-900/50 text-[8px] px-1 uppercase rotate-[-8deg] mix-blend-multiply font-black tracking-widest">
           Logged
        </div>

      </div>
    </div>
  );
}