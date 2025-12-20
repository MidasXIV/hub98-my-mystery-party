"use client";

import React, { useMemo } from "react";

// --- CSS Assets (Scoped for Green Alibi Card) ---
const AlibiStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Special+Elite&display=swap');
    
    .sage-paper {
      /* Subtle Green Tinge */
      background-color: #e4e8e1; 
      /* Noise Filter for texture */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
    }

    /* Green ink for stamps/borders */
    .ink-green {
      color: #2f4f2f;
    }
  `}</style>
);

/**
 * Intelligent parser to extract Name, Date, and Statement
 * from either JSON or Raw Text formats.
 */
function parseAlibiData(content: string) {
  // 1. Try JSON
  try {
    const json = JSON.parse(content);
    return {
      // Prefer explicit keys per provided schema; fall back to older aliases
      name: json.witnessName || json.name || json.suspect || json.subject || "Unknown Witness",
      date: json.date || json.time || "Undated",
      statement: json.statementBody || json.statement || json.body || content,
      isRaw: false
    };
  } catch {
    // 2. Fallback: Regex for text formats like "**Subject:** John Doe"
  const nameMatch = content.match(/\*\*(Subject|Name|Witness):\*\*\s*(.*)/i);
    const dateMatch = content.match(/\*\*(Date|Time):\*\*\s*(.*)/i);
    
    // Remove headers from body text for the preview
    const cleanBody = content
      .replace(/\*\*(Subject|Name|Witness|Date|Time|Case File).*?\*\*\s*.*?\n/gi, "")
      .trim();

    return {
      name: nameMatch ? nameMatch[2].trim() : "Unknown Witness",
      date: dateMatch ? dateMatch[2].trim() : "Undated",
      statement: cleanBody || content,
      isRaw: true
    };
  }
}

/**
 * FormalAlibiPreview
 * A sage-green, bureaucratic witness form card.
 */
export default function FormalAlibiPreview({ content }: { content: string }) {
  const data = useMemo(() => parseAlibiData(content), [content]);

  // Truncate text for the preview card
  const previewText = data.statement.length > 120 
    ? data.statement.slice(0, 120) + "..." 
    : data.statement;

  return (
    <div className="w-full h-full relative group cursor-pointer font-mono">
      <AlibiStyles />
      
      {/* --- The Card Container --- */}
      <div className="w-full h-full sage-paper border border-[#b4bea8] shadow-sm rounded-sm flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
        
        {/* --- Header Section (The "Form" Look) --- */}
        <div className="px-3 py-2 border-b border-[#aeb8a2] flex justify-between items-end bg-[#dce2d9]">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-[#556b55] font-bold">
              Form 12-B
            </div>
            <div className="text-[11px] font-bold text-[#1a2e1a] leading-none mt-0.5 font-['Special_Elite']">
              WITNESS STATEMENT
            </div>
          </div>
          {/* Date Stamp */}
          <div className="text-[9px] text-[#2f4f2f] font-semibold border border-[#aeb8a2] px-1 bg-[#eef2ec]">
            {data.date}
          </div>
        </div>

        {/* --- Main Content --- */}
        <div className="p-3 flex flex-col h-full">
          
          {/* Witness Name Field */}
          <div className="mb-3">
            <span className="text-[8px] uppercase text-[#667a66] block mb-[1px]">
              Sworn By:
            </span>
            <div className="text-sm font-bold text-[#1a1a1a] border-b border-dotted border-[#889988] pb-1 w-full font-['Courier_Prime']">
              {data.name}
            </div>
          </div>

          {/* Statement Snippet */}
          <div className="flex-1 relative">
            <p className="text-[10px] leading-relaxed text-[#2c2c2c] font-['Courier_Prime'] opacity-90">
              &quot;{previewText}&quot;
            </p>
            
            {/* Fade out effect at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#e4e8e1] to-transparent" />
          </div>
        </div>

        {/* --- Footer / Stamp --- */}
        <div className="absolute bottom-2 right-2 opacity-50">
           <div className="border border-green-800/40 text-green-900/60 text-[8px] px-1 uppercase -rotate-6 mix-blend-multiply font-bold">
             Verified
           </div>
        </div>

        {/* Visual Decoration: Staple Marks or Hole Punch */}
        <div className="absolute top-[6px] left-[50%] -translate-x-1/2 w-8 h-[2px] bg-[#9caea9] opacity-70" />

      </div>
    </div>
  );
}