"use client";

import React, { useMemo } from "react";

// --- CSS Assets (Scoped for Preview) ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
    
    .manila-texture {
      background-color: #f0e6d2; /* Classic Folder Manila */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    }

    .folder-tab {
      background-color: #e6dabf;
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
  `}</style>
);

/**
 * Helper to extract specific fields from your raw text format
 */
function parsePreviewData(content: string) {
  // 1. Try JSON First
  try {
    const json = JSON.parse(content);
    return {
      subject: json.subject || "Unknown Subject",
      date: json.date || "Undated",
      caseNumber: json.caseNumber || "N/A",
      isRaw: false
    };
  } catch (e) {
    // 2. Fallback to Regex Parsing (matching your specific format)
    const subjectMatch = content.match(/\*\*Subject:\*\*\s*(.*)/i);
    const dateMatch = content.match(/\*\*Date:\*\*\s*(.*)/i);
    const caseMatch = content.match(/\*\*Case File:\*\*\s*(.*)/i);
    
    return {
      subject: subjectMatch ? subjectMatch[1].trim() : "Unknown Subject",
      date: dateMatch ? dateMatch[1].trim() : "Undated",
      caseNumber: caseMatch ? caseMatch[1].trim() : "---",
      isRaw: true
    };
  }
}

export function InterrogationTranscriptPreview({ content }: { content: string }) {
  const data = useMemo(() => parsePreviewData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer">
      <PreviewStyles />
      
      {/* --- The Folder Container --- */}
      <div className="w-full h-full manila-texture border border-[#d1c7b0] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden text-[#2c2c2c] font-mono">
        
        {/* Visual Tab (Top Left) */}
        <div className="absolute top-0 left-0 w-1/3 h-[18px] folder-tab rounded-br-lg z-0" />
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full p-4 pt-6">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-3 border-b border-black/10 pb-2">
            <div>
              <div className="text-[9px] uppercase tracking-widest opacity-60">Police Dept.</div>
              <div className="text-[10px] font-bold">CASE FILE</div>
            </div>
            {/* Case Number Badge */}
            <div className="text-[9px] bg-black/5 px-2 py-0.5 rounded text-black/70 font-bold">
              #{data.caseNumber}
            </div>
          </div>

          {/* Main Info: Subject */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[9px] uppercase tracking-wide opacity-50 mb-0.5">Subject</div>
            <div className="text-[13px] font-bold leading-tight line-clamp-2 text-black/90 font-serif">
              {data.subject}
            </div>
          </div>

          {/* Footer Info: Date */}
          <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase opacity-50">Date Filed</span>
              <span className="text-[10px] font-semibold">{data.date}</span>
            </div>
            
            {/* "Confidential" Mini Stamp */}
            <div className="border border-red-800/30 text-red-900/40 text-[8px] px-1 py-[1px] uppercase rotate-[-5deg] mix-blend-multiply">
              Confidential
            </div>
          </div>

        </div>

        {/* Paper Inside (Visual Hint) */}
        <div className="absolute top-1 right-2 w-[90%] h-[95%] bg-white border border-gray-200 rotate-[2deg] -z-0 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 translate-x-2" />
      </div>
    </div>
  );
}

export default InterrogationTranscriptPreview;