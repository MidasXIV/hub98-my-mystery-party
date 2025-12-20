"use client";

import React, { useMemo, useState } from "react";

// --- Types ---
interface CaseBriefingData {
  title: string;
  caseNumber: string;
  classification: "CONFIDENTIAL" | "SECRET" | "UNCLASSIFIED";
  // Each string in this array is a separate A4 page
  pages: string[]; 
}

// --- CSS Assets ---
const BriefingStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Black+Ops+One&family=Special+Elite&display=swap');

    /* 1. The Desk Background (Wood/Dark surface) */
    .desk-surface {
      background-color: #1a1a1a;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23262626' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    /* 2. The Manila Folder Texture */
    .folder-texture {
      background-color: #dcbfa3; /* Manila */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
      box-shadow: 
        inset 0 0 40px rgba(0,0,0,0.1), /* Inner shadow for depth */
        0 10px 30px rgba(0,0,0,0.5); /* Drop shadow on desk */
    }

    /* 3. The A4 Paper inside */
    .briefing-paper {
      background-color: #fdfbf7;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      width: 100%;
      height: 100%;
      /* A4 Aspect Ratio logic is handled in container, this fills it */
    }

    /* 4. Stamps */
    .stamp-classified {
      font-family: 'Black Ops One', cursive;
      color: #b91c1c;
      border: 3px solid #b91c1c;
      padding: 0.5rem 1rem;
      text-transform: uppercase;
      opacity: 0.8;
      mix-blend-mode: multiply;
      transform: rotate(-12deg);
      mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    }

    /* 5. Typography */
    .typewriter { font-family: 'Courier Prime', monospace; }
    .folder-title { font-family: 'Special Elite', cursive; }
  `}</style>
);

// --- Parsing Logic ---
function parseBriefingData(content: string): CaseBriefingData {
  try {
    const json = JSON.parse(content);
    return {
      title: json.title || "CASE BRIEFING",
      caseNumber: json.caseNumber || "00-000",
      classification: json.classification || "CONFIDENTIAL",
      pages: Array.isArray(json.pages) ? json.pages : [json.body || content]
    };
  } catch {
    return {
      title: "CASE BRIEFING",
      caseNumber: "UNKNOWN",
      classification: "UNCLASSIFIED",
      pages: [content]
    };
  }
}

export default function CaseBriefingViewer({ content }: { content: string }) {
  const data = useMemo(() => parseBriefingData(content), [content]);
  // 0 = Cover, 1 = Page 1, 2 = Page 2...
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = data.pages.length;
  const isCover = pageIndex === 0;
  const isEnd = pageIndex === totalPages;

  const handleNext = () => {
    if (pageIndex < totalPages) setPageIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(prev => prev - 1);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center desk-surface overflow-hidden relative">
      <BriefingStyles />

      {/* --- The Folder Container --- */}
      {/* Aspect Ratio roughly mimicking a folder holding A4 paper */}
      <div className="relative w-full max-w-[800px] aspect-[3/4] md:aspect-[1.4/1] flex transition-all duration-500">
        
        {/* === STATE 1: CLOSED COVER === */}
        {isCover && (
          <div className="absolute inset-0 folder-texture rounded-r-md rounded-l-sm flex flex-col items-center justify-center cursor-pointer z-20 shadow-2xl" onClick={handleNext}>
             {/* Folder Tab */}
             <div className="absolute top-[-20px] right-0 w-1/3 h-[40px] folder-texture rounded-t-lg z-0" />
             
             {/* Cover Content */}
             <div className="z-10 text-center p-10 border-4 border-dashed border-[#5c4033]/30 m-8">
                <div className="folder-title text-[#5c4033] text-sm tracking-[0.5em] uppercase mb-4">
                  Investigative Services
                </div>
                <h1 className="typewriter text-4xl md:text-6xl font-bold text-[#3e2b26] mb-6">
                  {data.title}
                </h1>
                <div className="font-mono text-xl text-[#3e2b26]/70 mb-12">
                  CASE #: {data.caseNumber}
                </div>
                
                <div className="stamp-classified text-2xl md:text-4xl">
                  {data.classification}
                </div>
                
                <div className="mt-12 text-sm text-[#5c4033] animate-pulse">
                  ( Click to Open Dossier )
                </div>
             </div>
          </div>
        )}

        {/* === STATE 2: OPEN FOLDER (Background) === */}
        <div className={`absolute inset-0 folder-texture rounded-md p-4 md:p-8 flex transition-opacity duration-500 ${isCover ? 'opacity-0' : 'opacity-100'}`}>
           
           {/* Left Side (Inner Folder) */}
           <div className="hidden md:block w-1/2 h-full border-r border-[#bd9f7f] relative">
              <div className="absolute top-4 left-4 -rotate-12 opacity-40">
                 <div className="stamp-classified text-sm border-2">Clearance Req.</div>
              </div>
              
              {/* Previous Page Button (Left Side) */}
              <button 
                onClick={handlePrev}
                className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-black/5 transition-opacity"
              >
                <div className="bg-black/10 p-4 rounded-full">
                   <span className="text-2xl font-bold text-[#5c4033]">← PREVIOUS</span>
                </div>
              </button>
           </div>

           {/* Right Side (The Paper Stack) */}
           <div className="w-full md:w-1/2 h-full pl-0 md:pl-4 relative flex items-center justify-center">
              
              {/* Paper Stack Effect */}
              <div className="absolute top-1 left-5 w-[90%] h-[95%] bg-white border border-gray-300 rotate-1 shadow-sm" />
              <div className="absolute top-2 left-3 w-[90%] h-[95%] bg-white border border-gray-300 -rotate-1 shadow-sm" />

              {/* CURRENT PAGE CONTENT */}
              <div className="relative w-full h-full bg-[#fdfbf7] shadow-md p-8 md:p-10 typewriter text-sm md:text-base text-gray-900 leading-relaxed overflow-hidden flex flex-col">
                 
                 {/* Page Header */}
                 <div className="flex justify-between border-b border-black/20 pb-2 mb-6 text-xs text-gray-500 font-sans">
                    <span>PAGE {pageIndex} OF {totalPages}</span>
                    <span>{data.classification}</span>
                 </div>

                 {/* The Story Text */}
                 {/* overflow-y-auto is enabled just in case, but design encourages splitting pages */}
                 <div className="flex-1 overflow-y-auto whitespace-pre-wrap">
                    {data.pages[pageIndex - 1]}
                 </div>

                 {/* Next/Close Button (Bottom Right of Paper) */}
                 <div className="mt-4 flex justify-end">
                    <button 
                      onClick={pageIndex === totalPages ? undefined : handleNext}
                      className="text-xs font-bold uppercase tracking-widest border-b-2 border-black hover:text-red-800 hover:border-red-800 transition-colors"
                    >
                      {pageIndex === totalPages ? "End of Brief" : "Next Page →"}
                    </button>
                 </div>

              </div>
           </div>

        </div>

      </div>

      {/* --- Mobile Navigation Controls (Outside folder) --- */}
      {!isCover && (
        <div className="flex gap-4 mt-6 md:hidden">
           <button onClick={handlePrev} className="bg-[#dcbfa3] px-4 py-2 rounded shadow-lg font-bold text-[#3e2b26] text-sm">
             ← Back
           </button>
           <button 
             onClick={pageIndex === totalPages ? undefined : handleNext} 
             disabled={pageIndex === totalPages}
             className="bg-[#dcbfa3] px-4 py-2 rounded shadow-lg font-bold text-[#3e2b26] text-sm disabled:opacity-50"
           >
             Next →
           </button>
        </div>
      )}

    </div>
  );
}