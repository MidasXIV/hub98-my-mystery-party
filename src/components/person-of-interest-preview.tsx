"use client";

import React, { useMemo } from "react";

// --- CSS Assets ---
const Styles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Oswald:wght@500&family=Roboto+Condensed:wght@700&display=swap');

    /* Pale Apricot / Manila Card Stock */
    .poi-index-card {
      background-color: #fff8f0; /* Very pale orange/cream */
      background-image: 
        linear-gradient(#e5e7eb 1px, transparent 1px), /* Faint ruled lines */
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
      background-size: 100% 20px, auto; /* Line spacing */
    }

    /* The "Table" Borders */
    .data-grid {
      border: 2px solid #5c4033; /* Dark Brown Ink */
    }
    .data-cell {
      border-bottom: 1px solid #5c4033;
      border-right: 1px solid #5c4033;
    }
    .data-cell:last-child {
      border-right: none;
    }

    /* Typography */
    .label-tiny {
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 0.55rem; /* ~9px */
      color: #785a48;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
    }
    .value-type {
      font-family: 'Courier Prime', monospace;
      color: #1a1a1a;
      font-size: 0.75rem; /* ~12px */
      font-weight: 700;
      line-height: 1.1;
    }
  `}</style>
);

// --- Parsing Logic ---
function parsePreviewData(content: string) {
  try {
    const json = JSON.parse(content);
    return {
      // Prefer explicit keys from provided schema; fall back to older aliases
      name: (json.firstName && json.lastName)
        ? `${json.firstName} ${json.lastName}`
        : json.name || json.subject || "UNK",
      occupation: json.occupation || "UNK",
      employer: json.employer || "",
      ref: json.id || `POI-${Math.floor(Math.random() * 999)}`
    };
  } catch {
    const nameMatch = content.match(/\*\*(Subject|Name):\*\*\s*(.*?)(\n|$)/i);
    const occMatch = content.match(/\*\*(Occupation):\*\*\s*(.*?)(\n|$)/i);
    return {
      name: nameMatch ? nameMatch[2].trim() : "UNKNOWN",
      occupation: occMatch ? occMatch[2].trim() : "UNKNOWN",
      employer: "",
      ref: `POI-${Math.floor(Math.random() * 999)}`
    };
  }
}

export default function PersonOfInterestPreview({ content }: { content: string }) {
  const data = useMemo(() => parsePreviewData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none rounded-sm">
      <Styles />

      {/* --- Card Container --- */}
      <div className="rounded-sm w-full h-full poi-index-card border border-[#d6cbb8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-2 relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex justify-between items-end mb-1 border-b-2 border-[#5c4033] pb-1">
          <span className="font-['Oswald'] text-[10px] uppercase tracking-widest text-[#5c4033]">
            Suspect Data
          </span>
          <span className="font-mono text-[9px] text-gray-500">
            REF: {data.ref}
          </span>
        </div>

        {/* --- Intricate Table Grid --- */}
        <div className="data-grid flex-1 flex flex-col bg-white/40">
          
          {/* Row 1: Subject Name (Full Width) */}
          <div className="data-cell p-1.5 flex flex-col justify-center h-1/2">
            <span className="label-tiny">Person of Interest</span>
            <div className="value-type uppercase truncate" title={data.name}>
              {data.name}
            </div>
          </div>

          {/* Row 2: Split Columns */}
          <div className="flex flex-1 h-1/2">
            
            {/* Col A: Occupation */}
            <div className="data-cell w-2/3 p-1.5 flex flex-col justify-center border-b-0">
              <span className="label-tiny">Occupation / Role</span>
              <div className="value-type text-[10px] leading-tight line-clamp-2" title={data.occupation}>
                {data.occupation}
              </div>
              {data.employer && (
                <div className="value-type text-[9px] leading-tight opacity-80 mt-0.5" title={data.employer}>
                  Employer: {data.employer}
                </div>
              )}
            </div>

            {/* Col B: Status Code (Visual Decoration) */}
            <div className="w-1/3 p-1 flex flex-col items-center justify-center bg-[#5c4033]/5 border-b-0">
               <span className="label-tiny text-center text-[7px] mb-1">Status</span>
               <div className="w-full h-full border border-dashed border-[#5c4033]/30 flex items-center justify-center">
                 <span className="font-mono text-[10px] font-bold text-[#5c4033]">
                   ACT
                 </span>
               </div>
            </div>

          </div>
        </div>

        {/* --- Footer "Hole Punch" Visual --- */}
        <div className="absolute top-1/2 right-1 -translate-y-1/2 w-3 h-3 rounded-full bg-[#333] opacity-5 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] pointer-events-none" />

      </div>
    </div>
  );
}