"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { parseMissingPersonData } from "@/lib/missing-person-utils"; 

// --- CSS Assets ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Courier+Prime:wght@700&family=Oswald:wght@700&display=swap');

    /* Pink File Card Texture */
    .mp-card-bg {
      background-color: #e8b4b8; /* Desaturated Pink */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
    }

    .polaroid-texture {
      background-color: #f8f8f8;
      box-shadow: 2px 3px 5px rgba(0,0,0,0.25);
    }

    .scotch-tape {
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      backdrop-filter: blur(1px);
      transform: rotate(-1deg);
    }
    
    .stamp-missing-preview {
      border: 2px solid #b91c1c;
      color: #b91c1c;
      font-family: 'Black Ops One', cursive;
      font-size: 16px;
      padding: 2px 6px;
      transform: rotate(-12deg);
      mix-blend-mode: multiply;
      opacity: 0.9;
      letter-spacing: 2px;
    }
  `}</style>
);

export default function MissingPersonPreview({ content }: { content: string }) {
  const data = useMemo(() => parseMissingPersonData(content), [content]);

  return (
    <div className="w-full h-full p-2 relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* 1. Backing Card (Pink) */}
      <div className="w-full h-full mp-card-bg border border-[#c48b8f] relative overflow-hidden flex flex-col">
        
        {/* Header Text on Card */}
        <div className="absolute top-2 left-2 text-[7px] font-mono uppercase text-red-900/60 tracking-widest">
          File: {data.caseNumber}
        </div>

        {/* 2. Paperclip SVG */}
        <div className="absolute top-[-5px] right-[20%] z-30 w-5 h-10 drop-shadow-sm">
          <svg viewBox="0 0 30 60" fill="none" stroke="#555" strokeWidth="4">
             <path d="M10 5 L10 45 C10 55 25 55 25 45 L25 5" />
             <path d="M10 5 L10 40 C10 45 2 45 2 40 L2 15" stroke="#333" />
          </svg>
        </div>

        {/* 3. The Photo (Tilted) */}
        <div className="absolute inset-x-3 inset-y-6 polaroid-texture p-1.5 pb-8 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.02] z-10 flex flex-col items-center justify-center">
           {/* Photo Area */}
           <div className="w-full h-full bg-[#222] relative overflow-hidden">
            {/* Noise */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              {/* Actual Image */}
              <Image
                src={data.imageUrl}
                alt={data.name || "Missing person photo"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Film grain overlay */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              {/* STAMP */}
              <div className="absolute bottom-2 right-2 stamp-missing-preview">
                MISSING
              </div>
           </div>
        </div>

        {/* 4. The Label (Taped) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20">
           {/* Tape */}
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 scotch-tape opacity-50"></div>
           
           <div className="bg-[#fffdf5] shadow-sm border border-gray-300 p-1 text-center rotate-[1deg]">
              <div className="font-['Courier_Prime'] font-bold text-[11px] leading-none uppercase text-black truncate">
                {data.name}
              </div>
              <div className="text-[7px] font-sans text-red-800 uppercase tracking-wide truncate mt-0.5 font-bold">
                LAST SEEN: {data.lastSeenDate}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}