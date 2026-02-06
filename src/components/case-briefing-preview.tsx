"use client";

import React, { useMemo } from "react";
import { parseBriefingData } from "@/lib/case-briefing-utils"; // Assume utils

const PreviewStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Courier+Prime:wght@700&display=swap");

    /* 1. Envelope Texture */
    .manila-envelope {
      background-color: #dcbfa3; /* Classic Manila */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.2),
        inset 0 0 20px rgba(0, 0, 0, 0.05);
    }

    /* 2. The Flap Shadow (Triangular look) */
    .envelope-flap {
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.05) 0%,
        transparent 40%
      );
      pointer-events: none;
    }

    /* 3. String & Button Closure */
    .closure-button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #8d6e63; /* Darker brown cardboard */
      border: 1px solid #5d4037;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    .closure-button::after {
      content: ""; /* The tiny hole in center */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 2px;
      background-color: #333;
      border-radius: 50%;
    }

    /* 4. String Shadow */
    .string-wrap {
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
    }

    /* 5. Stamp */
    .stamp-top-secret {
      color: #b91c1c;
      border: 2px solid #b91c1c;
      font-family: "Black Ops One", cursive;
      font-size: 10px;
      padding: 2px 4px;
      text-transform: uppercase;
      transform: rotate(-5deg);
      mix-blend-mode: multiply;
      opacity: 0.8;
    }
  `}</style>
);

export default function CaseBriefingPreview({ content }: { content: string }) {
  const data = useMemo(() => parseBriefingData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none rounded-sm">
      <PreviewStyles />

      {/* --- Envelope Container --- */}
      <div className="w-full h-full manila-envelope rounded-sm flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
        {/* Top Flap Crease (Visual) */}
        <div className="absolute top-0 left-0 w-full h-[30%] border-b border-black/10 envelope-flap z-0" />

        {/* Header Label (Matches Alibi Preview Tone) */}
        <div className="absolute top-2 left-3 z-10">
          <div className="text-[8px] uppercase tracking-widest text-black/60 font-mono">
            Case Briefing
          </div>
          <div className="text-[11px] font-bold text-black/80 font-['Courier_Prime'] leading-none mt-0.5">
            UNSOLVED CASE FILE
          </div>
        </div>

        {/* --- Closure Mechanism (Center) --- */}
        <div className="absolute top-[25%] right-4 z-20 flex flex-col items-center gap-4">
          {/* Top Button */}
          <div className="closure-button" />
          {/* String (SVG) */}
          <div className="absolute top-[6px] left-[5px] w-4 h-10 pointer-events-none string-wrap">
            <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
              {/* String winding around buttons */}
              <path
                d="M0 0 C 10 5, 10 15, 0 20 C -10 25, 10 35, 0 40"
                stroke="#d84315"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          {/* Bottom Button */}
          <div className="closure-button" />
        </div>

        {/* --- Content Labels --- */}
        <div className="flex-1 flex flex-col justify-end p-3 z-10 mt-8">
          {/* "To" Block */}
          <div className="mb-2">
            <span className="font-mono text-[8px] uppercase text-gray-600 block mb-0.5">
              Delivery To:
            </span>
            <div className="font-['Courier_Prime'] font-bold text-xs uppercase text-black leading-tight border-b border-black/20 pb-1 inline-block min-w-[80%]">
              {data.to}
            </div>
          </div>

          {/* Case Name */}
          <div className="font-['Courier_Prime'] font-bold text-[10px] text-black/80 leading-tight">
            RE: {data.subject}
          </div>
        </div>

        {/* Stamp */}
        <div className="absolute bottom-2 right-2 z-20">
          <div className="stamp-top-secret">{data.classification}</div>
        </div>
      </div>
    </div>
  );
}
