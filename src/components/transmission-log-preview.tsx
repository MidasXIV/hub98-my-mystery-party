"use client";

import React, { useMemo } from "react";
import { parseTransmissionLog } from "@/lib/transmission-log-utils"; // Assume utils

const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Oswald:wght@500&display=swap');

    .transmission-card {
      background-color: #f3f4f6; /* Cool Grey */
      background-image: 
        linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
      background-size: 10px 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .header-stripe {
      background: repeating-linear-gradient(
        45deg,
        #1f2937,
        #1f2937 10px,
        #374151 10px,
        #374151 20px
      );
    }

    .font-term { font-family: 'JetBrains Mono', monospace; }
    .font-label { font-family: 'Oswald', sans-serif; }
  `}</style>
);

export default function TransmissionLogPreview({ content, title }: { content: string, title?: string }) {
  const data = useMemo(() => parseTransmissionLog(content, title), [content, title]);

  return (
    <div className="w-full h-full p-2 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* Visual Stack Effect (Page behind) */}
      <div className="absolute top-1 right-1 w-full h-full bg-white border border-gray-300 shadow-sm rotate-2 rounded-sm z-0" />

      {/* Main Card */}
      <div className="w-full h-full transmission-card border border-gray-400 relative z-10 flex flex-col overflow-hidden rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
        
        {/* Header */}
        <div className="header-stripe h-4 w-full flex items-center justify-center">
           <span className="text-[8px] text-white font-bold tracking-[0.2em] bg-black px-2">
             AEGIS CORP
           </span>
        </div>

        {/* Meta Info */}
        <div className="p-3 border-b border-gray-300 bg-white">
           <div className="font-term text-[7px] uppercase text-gray-500 mb-1">
             Ref: {data.caseRef}
           </div>
           <div className="font-label font-bold text-[11px] leading-tight uppercase line-clamp-2">
             {data.title}
           </div>
        </div>

        {/* Content Snippet */}
        <div className="flex-1 p-3 bg-white/50 relative">
           <div className="font-term text-[8px] text-gray-800 space-y-2 opacity-80">
              {data.entries.slice(0, 3).map((entry, i) => (
                <div key={i} className="flex gap-2">
                   <span className="font-bold text-gray-500">{entry.time}</span>
                   <span className="truncate">{entry.notes.substring(0, 40)}...</span>
                </div>
              ))}
           </div>
           
           {/* Fade Out */}
           <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#f3f4f6] to-transparent" />
        </div>

        {/* Footer Barcode Visual */}
        <div className="h-6 bg-white border-t border-gray-300 flex items-center justify-between px-2">
           <div className="h-3 w-24 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5d/UPC-A-036000291452.png')] bg-contain bg-repeat-x opacity-40 mix-blend-multiply" />
           <span className="font-term text-[6px] text-red-700 font-bold">SECURE LOG</span>
        </div>

      </div>
    </div>
  );
}