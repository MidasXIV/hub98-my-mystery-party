"use client";

import React, { useMemo } from "react";
import { parseTicketData } from "@/lib/ticket-utils"; // Assume same utils

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');

    .ticket-full-paper {
      /* Cardstock texture */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E");
      box-shadow: 2px 4px 10px rgba(0,0,0,0.3);
    }

    /* Side notches using masks */
    .notched-sides {
      -webkit-mask-image: radial-gradient(circle at 0 20px, transparent 10px, black 11px),
                          radial-gradient(circle at 100% 20px, transparent 10px, black 11px);
      -webkit-mask-position: 0 0, 0 0;
      -webkit-mask-size: 100% 100%;
      -webkit-mask-composite: destination-in; /* Combine masks */
      mask-composite: intersect;
    }
    
    /* Perforated Line (Tear off) */
    .perf-line {
      border-right: 2px dashed rgba(0,0,0,0.3);
      position: relative;
    }

    .ink-stamp {
       mix-blend-mode: multiply;
       opacity: 0.85;
    }
  `}</style>
);

const getViewerTheme = (type: string) => {
  switch (type) {
    case 'movie': return { bg: '#d6453e', text: '#fcf6e8', accent: '#b02e28' }; 
    case 'train': return { bg: '#ebe6d8', text: '#292929', accent: '#4a4a4a' }; 
    case 'parking': return { bg: '#9abdd4', text: '#0f2436', accent: '#0f2436' };
    default: return { bg: '#d4c5a9', text: '#333', accent: '#5c5243' };
  }
};

export default function TicketStubViewer({ content }: { content: string }) {
  const data = useMemo(() => parseTicketData(content), [content]);
  const theme = getViewerTheme(data.type);

  return (
    <div className="w-full flex justify-center py-20 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />
      
      {/* Container to center and rotate slightly */}
      <div className="relative rotate-[-2deg]">
        
        {/* --- The Ticket --- */}
        <div 
          className="relative w-[600px] h-[240px] ticket-full-paper flex rounded-sm overflow-hidden"
          style={{ backgroundColor: theme.bg, color: theme.text }}
        >
          {/* Side Notches Visual Hack (Background colored circles) */}
          <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 z-10" />
          <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 z-10" />

          {/* --- Left Section (Main Ticket) --- */}
          <div className="flex-1 p-8 flex flex-col border-r-2 border-dashed border-black/20 relative">
             
             {/* Header */}
             <div className="flex justify-between items-start border-b-2 border-current pb-2 mb-4" style={{ borderColor: theme.accent }}>
                <div>
                   <h2 className="font-['Abril_Fatface'] text-4xl uppercase tracking-wide leading-none">
                     {data.venue}
                   </h2>
                   <div className="font-['Oswald'] text-sm uppercase tracking-[0.2em] opacity-80 mt-1">
                     Admit One
                   </div>
                </div>
                {data.price && (
                  <div className="font-['Share_Tech_Mono'] text-2xl font-bold border-2 border-current p-1 px-2 rounded-sm opacity-90">
                    {data.price}
                  </div>
                )}
             </div>

             {/* Body */}
             <div className="flex-1 flex flex-col justify-center">
                {data.title && (
                   <div className="text-2xl font-bold font-['Oswald'] uppercase mb-2">
                     {data.title}
                   </div>
                )}
                <div className="flex gap-8 text-lg font-mono opacity-90">
                   <div>
                      <span className="text-xs uppercase block opacity-60">Date</span>
                      {data.date}
                   </div>
                   {data.time && (
                     <div>
                        <span className="text-xs uppercase block opacity-60">Time</span>
                        {data.time}
                     </div>
                   )}
                </div>
             </div>

             {/* Footer */}
             <div className="text-[10px] uppercase font-sans opacity-50 mt-auto">
                No Refunds or Exchanges • Valid only on stamped date
             </div>
             
             {/* Punched Hole */}
             {data.isPunched && (
               <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-gray-900 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.8)] z-20" />
             )}
          </div>

          {/* --- Right Section (Stub) --- */}
          <div className="w-[140px] p-4 flex flex-col items-center justify-center text-center relative bg-black/5">
             <div className="font-['Oswald'] text-xs uppercase tracking-widest opacity-70 mb-2">
               Stub
             </div>
             
             {/* Vertical Serial Number */}
             <div className="font-['Share_Tech_Mono'] text-sm tracking-widest -rotate-90 whitespace-nowrap opacity-80 my-auto">
               {data.serial}
             </div>

             <div className="mt-auto w-full border-t border-current pt-2 opacity-60">
                <div className="w-8 h-8 mx-auto border border-current rounded-full flex items-center justify-center">
                   <span className="text-[8px] font-bold">CHK</span>
                </div>
             </div>
          </div>

        </div>

        {/* Shadow cast by ticket */}
        <div className="absolute inset-0 shadow-2xl z-[-1] rounded-sm"></div>

      </div>
    </div>
  );
}