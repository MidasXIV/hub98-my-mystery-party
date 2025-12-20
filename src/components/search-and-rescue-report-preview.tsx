"use client";

import React, { useMemo } from "react";
import { parseSARData } from "@/lib/sar-utils"; 

// --- CSS Assets ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@400;700&display=swap');

    .sar-preview-card {
      background-color: #f0fdf4; /* Very light topo green */
      background-image: 
        /* The Grid Lines */
        linear-gradient(#94a3b8 1px, transparent 1px),
        linear-gradient(90deg, #94a3b8 1px, transparent 1px);
      background-size: 20px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    
    .topo-lines-preview {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
      opacity: 0.3;
      mix-blend-mode: multiply;
    }
  `}</style>
);

export default function SearchAndRescuePreview({ content }: { content: string }) {
  const data = useMemo(() => parseSARData(content), [content]);

  return (
    <div className="w-full h-full p-1 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* Container */}
      <div className="w-full h-full sar-preview-card border-2 border-slate-500 relative overflow-hidden flex flex-col">
        
        {/* Topo Texture Layer */}
        <div className="absolute inset-0 topo-lines-preview pointer-events-none" />

        {/* Header Bar */}
        <div className="bg-slate-700 text-white p-1.5 flex justify-between items-center z-10">
          <div className="font-['Share_Tech_Mono'] text-[9px] uppercase tracking-widest">
            SAR MAP: {data.sector}
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Content */}
        <div className="flex-1 p-2 relative z-10 flex flex-col justify-between">
           
           {/* Mini Legend Preview */}
           <div className="bg-white/90 border border-black/20 p-1 w-2/3 shadow-sm backdrop-blur-[1px]">
              <div className="text-[7px] font-bold uppercase mb-1 border-b border-black/10">Legend</div>
              {data.legend.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-1 mb-0.5">
                   <div className="w-2 h-2 border border-black/20" style={{ backgroundColor: item.color }} />
                   <span className="text-[6px] uppercase truncate">{item.label}</span>
                </div>
              ))}
           </div>

           {/* Coordinates */}
           <div className="self-end text-right">
              <div className="font-['Share_Tech_Mono'] text-[14px] font-bold text-slate-800 leading-none">
                {data.gridReference}
              </div>
              <div className="text-[7px] uppercase font-bold text-slate-500">
                {data.operationName}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}