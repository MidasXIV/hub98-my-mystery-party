"use client";

import React, { useMemo } from "react";

// --- CSS Assets ---
const Styles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Courier+Prime:wght@700&family=Permanent+Marker&display=swap');

    .poi-card-bg {
      background-color: #d89f75; /* Burnt Orange Base */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: inset 0 0 15px rgba(0,0,0,0.1);
    }

    .polaroid-texture {
      background-color: #f8f8f8;
      box-shadow: 2px 3px 5px rgba(0,0,0,0.2);
    }

    .scotch-tape {
      background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      backdrop-filter: blur(1px);
      transform: rotate(-25deg);
    }
  `}</style>
);

// --- Parsing Logic ---
function parsePreviewData(content: string) {
  try {
    const json = JSON.parse(content);
    return {
      name: json.name || json.subject || "Unknown",
      occupation: json.occupation || "Unknown",
    };
  } catch {
    const nameMatch = content.match(/\*\*(Subject|Name):\*\*\s*(.*?)(\n|$)/i);
    const occMatch = content.match(/\*\*(Occupation):\*\*\s*(.*?)(\n|$)/i);
    return {
      name: nameMatch ? nameMatch[2].trim() : "Unknown",
      occupation: occMatch ? occMatch[2].trim() : "Unknown",
    };
  }
}

export default function PersonOfInterestPreview({ content }: { content: string }) {
  const data = useMemo(() => parsePreviewData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none overflow-hidden p-2">
      <Styles />

      {/* --- 1. The Backing Card (Burnt Orange) --- */}
      <div className="absolute inset-0 poi-card-bg border border-[#bd875f]" />

      {/* --- 2. The "Paperclip" (SVG) --- */}
      {/* Positioned to look like it's holding the photo to the card */}
      <div className="absolute top-[-5px] right-[25%] z-30 w-6 h-12 drop-shadow-sm">
        <svg viewBox="0 0 30 60" fill="none" stroke="#6b7280" strokeWidth="4">
           <path d="M10 5 L10 45 C10 55 25 55 25 45 L25 5" /> {/* Front loop */}
           <path d="M10 5 L10 40 C10 45 2 45 2 40 L2 15" stroke="#4b5563" /> {/* Back loop */}
        </svg>
      </div>

      {/* --- 3. The "Polaroid" Photo (Tilted) --- */}
      <div className="absolute inset-3 bottom-8 polaroid-texture p-1.5 pb-6 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.02] z-10 flex flex-col">
        
        {/* The "Image" Area (Silhouette) */}
        <div className="w-full h-full bg-[#2a2a2a] relative overflow-hidden grayscale contrast-125">
          {/* Silhouette SVG */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] opacity-50">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          
          {/* Noise overlay for the photo */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
          
          {/* "SUSPECT" Stamp on the photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-red-600/60 text-red-600/60 font-['Black_Ops_One'] text-[14px] uppercase px-1 py-0.5 -rotate-[15deg] mix-blend-hard-light tracking-widest opacity-80">
            Suspect
          </div>
        </div>
      </div>

      {/* --- 4. The Tape Label (Name) --- */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] z-20">
         {/* Tape Strip visual */}
         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 scotch-tape opacity-60"></div>

         <div className="bg-[#f0f0e0] shadow-sm border border-gray-300 p-1 text-center rotate-[1deg]">
            <div className="font-['Courier_Prime'] font-bold text-[10px] leading-none uppercase text-black truncate">
              {data.name}
            </div>
            {data.occupation && (
              <div className="font-sans text-[7px] text-gray-500 uppercase tracking-wide truncate mt-0.5">
                {data.occupation}
              </div>
            )}
         </div>
      </div>

    </div>
  );
}