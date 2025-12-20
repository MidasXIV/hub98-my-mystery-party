"use client";

import React, { useMemo } from "react";
import { parseActivityLog } from "@/lib/activity-log-utils"; // Assume same utils

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Cedarville+Cursive&family=Courier+Prime:wght@400;700&display=swap');

    .ledger-sheet {
      background-color: #fcfbf9;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    /* The Classic "Ledger Grid" */
    .ledger-grid-row {
      border-bottom: 1px solid #e2a8a8; /* Pink line */
      height: 2.5rem; /* Specific height for handwriting */
    }
    
    .ledger-col-line {
      border-right: 1px solid #e2a8a8;
    }

    /* Typography */
    .font-header { font-family: 'Oswald', sans-serif; }
    .font-type { font-family: 'Courier Prime', monospace; }
    .font-hand { 
      font-family: 'Cedarville Cursive', cursive;
      color: #1a237e; /* Navy Ink */
      font-size: 1.1rem;
    }

    /* Ink variations for realism */
    .ink-variation-1 { color: #1a237e; transform: rotate(0.5deg); }
    .ink-variation-2 { color: #0d47a1; transform: rotate(-0.5deg); opacity: 0.9; }
    .ink-variation-3 { color: #311b92; transform: translate(1px, -1px); opacity: 0.85; }
  `}</style>
);

export default function ActivityLogViewer({ content }: { content: string }) {
  const data = useMemo(() => parseActivityLog(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Main Ledger Page --- */}
      <div className="relative w-full max-w-[800px] min-h-[1000px] ledger-sheet p-8 shadow-2xl text-black">
        
        {/* --- Header --- */}
        <div className="border-b-[3px] border-black mb-6 pb-2">
           <div className="flex justify-between items-end">
              <div>
                 <h1 className="font-header text-4xl uppercase tracking-tighter">
                   Telephone Log
                 </h1>
                 <p className="font-type text-xs uppercase tracking-widest opacity-70">
                   {data.location}
                 </p>
              </div>
              <div className="text-right">
                 <div className="font-header text-lg bg-black text-white px-2 py-0.5 inline-block mb-1">
                   DATE: {data.date}
                 </div>
                 <div className="font-type text-xs">
                   REF: {data.caseRef}
                 </div>
              </div>
           </div>
        </div>

        {/* --- Table Header --- */}
        <div className="flex border-b-2 border-black bg-gray-100 text-[10px] font-bold uppercase tracking-widest font-sans">
           <div className="w-24 p-2 border-r border-black/20">Time</div>
           <div className="w-16 p-2 border-r border-black/20 text-center">Dir</div>
           <div className="w-32 p-2 border-r border-black/20">Number / Ext</div>
           <div className="w-20 p-2 border-r border-black/20">Duration</div>
           <div className="flex-1 p-2">Message / Notes</div>
        </div>

        {/* --- Table Body (The Grid) --- */}
        <div className="flex flex-col relative">
           
           {/* Background Lines (CSS Gradient purely for visual guide) */}
           <div className="absolute inset-0 pointer-events-none opacity-5" 
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2.4rem, #000 2.4rem, #000 2.5rem)' }}>
           </div>

           {data.entries.map((entry, i) => {
             // Randomize ink look slightly
             const inkClass = `ink-variation-${(i % 3) + 1}`;
             
             return (
               <div key={i} className="flex ledger-grid-row items-center hover:bg-black/5 transition-colors">
                  
                  {/* Time (Typed or Handwritten - let's do typed for machine logging) */}
                  <div className="w-24 p-2 ledger-col-line font-type text-sm font-bold">
                    {entry.time}
                  </div>
                  
                  {/* Direction */}
                  <div className="w-16 p-2 ledger-col-line text-center">
                    <span className={`text-[9px] px-1 rounded border ${entry.direction === 'IN' ? 'border-green-700 text-green-800' : 'border-red-700 text-red-800'} font-mono font-bold`}>
                      {entry.direction}
                    </span>
                  </div>

                  {/* Number (Handwritten) */}
                  <div className={`w-32 p-2 ledger-col-line font-hand ${inkClass} text-lg`}>
                    {entry.number}
                  </div>

                  {/* Duration (Handwritten) */}
                  <div className={`w-20 p-2 ledger-col-line font-hand ${inkClass}`}>
                    {entry.duration}
                  </div>

                  {/* Notes (Handwritten) */}
                  <div className={`flex-1 p-2 font-hand ${inkClass} leading-tight`}>
                    {entry.notes}
                  </div>

               </div>
             );
           })}

           {/* Empty Rows Filler */}
           {[...Array(5)].map((_, i) => (
              <div key={`empty-${i}`} className="flex ledger-grid-row h-10">
                 <div className="w-24 ledger-col-line"></div>
                 <div className="w-16 ledger-col-line"></div>
                 <div className="w-32 ledger-col-line"></div>
                 <div className="w-20 ledger-col-line"></div>
                 <div className="flex-1"></div>
              </div>
           ))}

        </div>

        {/* --- Footer --- */}
        <div className="mt-8 flex justify-between items-center opacity-70">
           <div className="w-1/3 border-t border-black pt-1 text-center">
             <div className="font-hand text-xl -rotate-2">{data.operator}</div>
             <div className="font-type text-[9px] uppercase mt-1">Operator Signature</div>
           </div>
           
           <div className="font-type text-[10px]">
              PAGE 1 OF 1
           </div>
        </div>

        {/* Coffee Stain */}
        <div className="absolute top-1/4 right-8 w-24 h-24 rounded-full border-[8px] border-[#4e342e] opacity-[0.08] blur-[3px] pointer-events-none mix-blend-multiply" />

      </div>
    </div>
  );
}