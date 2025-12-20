"use client";

import React, { useMemo } from "react";
import { parseBriefingData } from "@/lib/case-briefing-utils"; 

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Oswald:wght@500;700&family=Playfair+Display:wght@700&display=swap');

    /* 1. Official Letterhead Paper */
    .official-letterhead {
      background-color: #fffefb; /* Ivory Bond */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      color: #111;
    }

    /* 2. Watermark */
    .watermark-seal {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%23000' stroke-width='2' fill='none' opacity='0.05'/%3E%3Ctext x='50' y='55' text-anchor='middle' font-family='serif' font-weight='bold' font-size='20' fill='%23000' opacity='0.05'%3EOFFICIAL%3C/text%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
      z-index: 0;
    }

    /* 3. Typography */
    .font-dept { font-family: 'Playfair Display', serif; }
    .font-meta { font-family: 'Oswald', sans-serif; }
    .font-body { font-family: 'Courier Prime', monospace; }

    /* 4. Ink Signature Simulation */
    .ink-signature {
      font-family: 'Courier Prime', monospace;
      color: #000080; /* Blue Ink */
      font-style: italic;
      font-weight: bold;
      transform: rotate(-2deg);
    }
  `}</style>
);

export default function CaseBriefingViewer({ content }: { content: string }) {
  const data = useMemo(() => parseBriefingData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- A4 Paper Container --- */}
      <div className="relative w-full max-w-[800px] min-h-[1100px] official-letterhead p-10 md:p-14 flex flex-col">
        
        {/* Watermark */}
        <div className="watermark-seal" />

        {/* --- Header --- */}
        <header className="border-b-4 border-black pb-4 mb-8 z-10 relative">
           <div className="text-center">
              <h1 className="font-dept text-3xl md:text-4xl font-bold uppercase tracking-wide mb-1">
                {data.department}
              </h1>
              <h2 className="font-meta text-sm uppercase tracking-[0.3em] text-gray-600">
                {data.bureau}
              </h2>
           </div>
           
           {/* Date & Ref */}
           <div className="flex justify-between mt-6 font-body text-xs md:text-sm font-bold">
              <div>DATE: {data.date}</div>
              <div>CLASSIFICATION: {data.classification}</div>
           </div>
        </header>

        {/* --- Meta Block (To/From) --- */}
        <section className="mb-8 z-10 relative">
           <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-body text-sm md:text-base">
              <div className="font-bold text-gray-500 uppercase">To:</div>
              <div>{data.to}</div>
              
              <div className="font-bold text-gray-500 uppercase">From:</div>
              <div>{data.from}</div>
              
              <div className="font-bold text-gray-500 uppercase">Subject:</div>
              <div className="font-bold border-b border-black/20 w-full">{data.subject}</div>
           </div>
        </section>

        {/* --- Body Text --- */}
        <main className="flex-1 font-body text-sm md:text-base leading-relaxed whitespace-pre-wrap text-justify z-10 relative">
           {data.body}
        </main>

        {/* --- Footer / Signature --- */}
        <footer className="mt-12 z-10 relative">
           <div className="w-1/2 ml-auto text-center">
              <div className="mb-4 ink-signature text-xl">
                {data.from.split(' ').pop()}
              </div>
              <div className="border-t border-black pt-1 font-meta text-xs uppercase tracking-wider opacity-60">
                Authorized Signature
              </div>
           </div>
           
           <div className="mt-8 text-center font-meta text-[10px] text-gray-400">
              OFFICIAL DOCUMENT • DO NOT DUPLICATE • {new Date().getFullYear()}
           </div>
        </footer>

      </div>
    </div>
  );
}