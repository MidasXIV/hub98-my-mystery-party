"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { parseMapData } from "@/lib/map-utils"; // Assume utils or inline

const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Courier+Prime:wght@700&display=swap');

    /* 1. Map Paper Texture */
    .map-preview-paper {
      background-color: #f7f5f0; /* Warm Off-White */
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z'/%3E%3C/g%3E%3C/svg%3E");
    }

    /* 2. Fold Lines (The "Cool" factor) */
    .map-fold-creases {
      background: linear-gradient(
        90deg, 
        transparent 0%, 
        transparent 31%, 
        rgba(0,0,0,0.1) 33%, 
        rgba(255,255,255,0.4) 34%, 
        transparent 36%, 
        transparent 64%, 
        rgba(0,0,0,0.1) 66%, 
        rgba(255,255,255,0.4) 67%, 
        transparent 69%
      );
      mix-blend-mode: multiply;
      pointer-events: none;
    }

    .font-header { font-family: 'Oswald', sans-serif; }
    .font-mono { font-family: 'Courier Prime', monospace; }
  `}</style>
);

export default function MapPreview({ content }: { content: string }) {
  const data = useMemo(() => parseMapData(content), [content]);

  return (
    <div className="w-full h-full p-1 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* Container */}
      <div className="w-full h-full map-preview-paper border-2 border-slate-600 shadow-sm relative overflow-hidden flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
        
        {/* --- The Map Image (Cropped) --- */}
        <div className="flex-1 relative overflow-hidden grayscale-[10%] contrast-[0.9] opacity-80">
           {data.imageUrl && (
             <Image 
               src={data.imageUrl} 
               alt="Map Preview" 
               fill 
               className="object-cover"
             />
           )}
           {/* Fallback Grid if no image */}
           {!data.imageUrl && (
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
           )}

           {/* Red Circle Marker (Visual Cue) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-red-600 rounded-full opacity-70 flex items-center justify-center animate-pulse">
              <div className="w-1 h-1 bg-red-600 rounded-full" />
           </div>
        </div>

        {/* --- Fold Creases Overlay --- */}
        <div className="absolute inset-0 map-fold-creases z-10" />

        {/* --- Footer Label --- */}
        <div className="h-10 bg-[#e5e7eb] border-t-2 border-slate-600 flex items-center justify-between px-3 relative z-20">
           <div className="flex flex-col">
              <span className="font-header text-[10px] uppercase tracking-wider text-slate-800 leading-none">
                {data.region}
              </span>
              <span className="font-mono text-[8px] text-slate-500">
                SCALE {data.scale}
              </span>
           </div>
           {/* Folded Corner Visual */}
           <div className="w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-slate-400 absolute bottom-0 right-0" />
        </div>

      </div>
    </div>
  );
}