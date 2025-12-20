"use client";

import React, { useMemo } from "react";
import { parseTelecomLog } from "@/lib/phone-log-utils"; 

// --- CSS Assets ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    /* 1. Green Bar Paper Pattern */
    .green-bar-paper {
      background-color: #ffffff;
      /* The alternating green stripe */
      background-image: repeating-linear-gradient(
        transparent,
        transparent 10px,
        #e3f0e3 10px,
        #e3f0e3 20px
      );
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      font-family: 'VT323', monospace;
    }

    /* 2. Pin Feed Holes (Left/Right margins) */
    .pin-feed-strip {
      background-color: #ffffff;
      border-right: 1px dashed #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding-top: 4px;
    }
    .pin-hole {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #333; /* Dark background showing through */
      opacity: 0.2;
    }
  `}</style>
);

export default function TelecomLogPreview({ content }: { content: string }) {
  const data = useMemo(() => parseTelecomLog(content), [content]);

  return (
    <div className="w-full h-full p-1 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* Container */}
      <div className="w-full h-full flex bg-white border border-gray-300 shadow-sm relative overflow-hidden">
        
        {/* Left Pin Feed */}
        <div className="w-4 h-full pin-feed-strip border-r">
           {[...Array(10)].map((_, i) => <div key={i} className="pin-hole" />)}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 green-bar-paper p-2 flex flex-col text-[#333]">
           {/* Header */}
           <div className="border-b border-dashed border-black pb-1 mb-1 leading-none">
             <div className="text-[10px] uppercase font-bold">{data.provider}</div>
             <div className="text-[8px] opacity-70">SUBSCRIBER DATA</div>
           </div>

           {/* Data Snippet */}
           <div className="flex-1 overflow-hidden">
              <div className="text-[14px] leading-none mb-1">
                {data.phoneNumber}
              </div>
              <div className="text-[8px] opacity-60">
                 {data.calls.length} RECORD(S) FOUND
              </div>
              <div className="mt-2 text-[8px] font-mono leading-tight opacity-80">
                {data.calls.slice(0, 3).map((call, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{call.time}</span>
                    <span>{call.direction.substring(0,3)}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Right Pin Feed */}
        <div className="w-4 h-full pin-feed-strip border-l border-r-0">
           {[...Array(10)].map((_, i) => <div key={i} className="pin-hole" />)}
        </div>

      </div>
    </div>
  );
}