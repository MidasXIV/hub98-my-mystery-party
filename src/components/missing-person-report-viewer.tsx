"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { parseMissingPersonData } from "@/lib/missing-person-utils";

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Courier+Prime:wght@400;700&family=Nothing+You+Could+Do&display=swap');

    /* Page 1: Pink Carbon Copy */
    .paper-pink {
      background-color: #fce8e8;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }

    /* Page 2: White Bond Paper */
    .paper-white {
      background-color: #fdfdfd;
      background-image: repeating-linear-gradient(transparent, transparent 1.5rem, #e5e7eb 1.5rem, #e5e7eb 1.55rem);
      background-attachment: local;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }

    .mp-grid-row { border-bottom: 1px solid #991b1b; display: flex; }
    .mp-grid-col { border-right: 1px solid #991b1b; padding: 6px 8px; }
    .mp-grid-col:last-child { border-right: none; }
    .mp-border { border: 2px solid #991b1b; } 

    .font-label { 
      font-family: 'Roboto Condensed', sans-serif; 
      font-size: 0.7rem; 
      text-transform: uppercase; 
      color: #7f1d1d; 
      margin-bottom: 2px;
    }
    .font-data { 
      font-family: 'Courier Prime', monospace; 
      font-size: 1rem; 
      color: #1a1a1a;
    }
    .font-hand {
      font-family: 'Nothing You Could Do', cursive;
      color: #0f172a;
    }
  `}</style>
);

export default function MissingPersonViewer({ content }: { content: string }) {
  const data = useMemo(() => parseMissingPersonData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      <div className="flex flex-col gap-10 items-center w-full max-w-[850px]">
        
        {/* ================= PAGE 1: INTAKE FORM ================= */}
        <div className="paper-pink w-full min-h-[1100px] p-8 md:p-12 relative text-black">
          
          {/* Header Row */}
          <div className="flex justify-between items-start border-b-4 border-red-900 pb-4 mb-8">
             <div className="flex-1">
                <div className="font-label text-red-900 opacity-70 mb-1">Riverdale Police Dept.</div>
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-red-950 font-sans leading-none">
                  Missing Person<br/>Report
                </h1>
             </div>
             
             {/* Case Stamp */}
             <div className="text-right ml-4">
                <div className="font-label">Case Number</div>
                <div className="font-data text-xl font-bold bg-white/60 px-3 py-1 border border-red-900/30 shadow-sm">
                  {data.caseNumber}
                </div>
                <div className="font-data text-xs mt-2">
                  DATE: {data.dateFiled}
                </div>
             </div>
          </div>

          {/* Top Section: Identity & Photo */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
             
             {/* Left: Identity Fields */}
             <div className="flex-1 mp-border bg-red-50/50">
                <div className="bg-red-900/10 px-2 py-1 font-sans font-bold text-xs uppercase text-red-900 border-b border-red-900">
                  1. Subject Identity
                </div>
                <div className="mp-grid-row">
                   <div className="mp-grid-col w-full">
                      <div className="font-label">Full Name</div>
                      <div className="font-data uppercase font-bold text-lg">{data.name}</div>
                   </div>
                </div>
                <div className="mp-grid-row">
                   <div className="mp-grid-col w-1/2">
                      <div className="font-label">DOB</div>
                      <div className="font-data">{data.dob}</div>
                   </div>
                   <div className="mp-grid-col w-1/2">
                      <div className="font-label">Age</div>
                      <div className="font-data">{data.age}</div>
                   </div>
                </div>
                <div className="mp-grid-row border-b-0">
                   <div className="mp-grid-col w-1/2">
                      <div className="font-label">Sex</div>
                      <div className="font-data">{data.sex}</div>
                   </div>
                   <div className="mp-grid-col w-1/2">
                      <div className="font-label">Race</div>
                      <div className="font-data">{data.race}</div>
                   </div>
                </div>
             </div>

             {/* Right: PHOTO SLOT */}
             <div className="w-40 flex-shrink-0 flex flex-col">
                <div className="w-full aspect-[3/4] mp-border bg-white relative overflow-hidden shadow-inner">
                   <Image
                     src={data.imageUrl}
                     alt={data.name || "Missing person photo"}
                     fill
                     sizes="160px"
                     className="object-cover"
                   />
                   {/* Paperclip Visual (Top) */}
                   <div className="absolute -top-4 right-8 w-6 h-12 z-20">
                      <svg viewBox="0 0 30 60" fill="none" stroke="#555" strokeWidth="3">
                         <path d="M10 5 L10 45 C10 55 25 55 25 45 L25 5" />
                         <path d="M10 5 L10 40 C10 45 2 45 2 40 L2 15" stroke="#333" />
                      </svg>
                   </div>
                </div>
                <div className="text-center mt-1 font-label text-[9px] opacity-70">
                   Photo Provided by Family
                </div>
             </div>

          </div>

          {/* Section: Physical Description */}
          <div className="mp-border mb-6 bg-red-50/50">
             <div className="bg-red-900/10 px-2 py-1 font-sans font-bold text-xs uppercase text-red-900 border-b border-red-900">
               2. Physical Description
             </div>
             <div className="mp-grid-row">
                <div className="mp-grid-col w-1/4">
                   <div className="font-label">Height</div>
                   <div className="font-data">{data.height}</div>
                </div>
                <div className="mp-grid-col w-1/4">
                   <div className="font-label">Weight</div>
                   <div className="font-data">{data.weight}</div>
                </div>
                <div className="mp-grid-col w-1/4">
                   <div className="font-label">Hair</div>
                   <div className="font-data">{data.hair}</div>
                </div>
                <div className="mp-grid-col w-1/4">
                   <div className="font-label">Eyes</div>
                   <div className="font-data">{data.eyes}</div>
                </div>
             </div>
             <div className="mp-grid-row border-b-0">
                <div className="mp-grid-col w-1/2">
                   <div className="font-label">Scars / Marks / Tattoos</div>
                   <div className="font-data">{data.scarsMarks}</div>
                </div>
                <div className="mp-grid-col w-1/2">
                   <div className="font-label">Dental</div>
                   <div className="font-data">{data.dental}</div>
                </div>
             </div>
          </div>

          {/* Section: Last Seen */}
          <div className="mp-border mb-6 bg-red-50/50">
             <div className="bg-red-900/10 px-2 py-1 font-sans font-bold text-xs uppercase text-red-900 border-b border-red-900">
               3. Disappearance Details
             </div>
             <div className="mp-grid-row">
                <div className="mp-grid-col w-1/2">
                   <div className="font-label">Date Last Seen</div>
                   <div className="font-data">{data.lastSeenDate}</div>
                </div>
                <div className="mp-grid-col w-1/2">
                   <div className="font-label">Time Last Seen</div>
                   <div className="font-data">{data.lastSeenTime}</div>
                </div>
             </div>
             <div className="mp-grid-row">
                <div className="mp-grid-col w-full">
                   <div className="font-label">Last Known Location</div>
                   <div className="font-data font-bold">{data.lastSeenLocation}</div>
                </div>
             </div>
             <div className="mp-grid-row border-b-0">
                <div className="mp-grid-col w-full">
                   <div className="font-label">Clothing Last Worn</div>
                   <div className="font-data">{data.clothingWorn}</div>
                </div>
             </div>
          </div>

          {/* Section: Summary */}
          <div className="mp-border flex-1 flex flex-col bg-red-50/50">
             <div className="bg-red-900/10 px-2 py-1 font-sans font-bold text-xs uppercase text-red-900 border-b border-red-900">
               4. Statement / Summary
             </div>
             <div className="p-4 font-data leading-relaxed whitespace-pre-wrap flex-1 min-h-[250px]">
                {data.summary}
             </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between pt-4 border-t-2 border-red-900 opacity-60">
             <div className="text-xs font-sans">
               Reporting Officer: {data.reportingOfficer}<br/>
               Badge: 8821
             </div>
             <div className="text-xs font-sans text-right">
               FORM MP-40 (REV. 1946)<br/>
               RECORDS DIVISION
             </div>
          </div>

        </div>


        {/* ================= PAGE 2: FIELD NOTES ================= */}
        <div className="paper-white w-full min-h-[1100px] p-8 md:p-12 relative text-black">
          
          {/* Staple Visual */}
          <div className="absolute top-[-10px] left-8 w-4 h-12 bg-gray-400 rounded-full opacity-50 shadow-sm z-20 rotate-1"></div>

          {/* Header */}
          <div className="text-center mb-10 pt-4">
             <h2 className="font-sans font-bold text-2xl uppercase underline decoration-2 underline-offset-4">
               Supplementary Field Notes
             </h2>
             <p className="font-data text-xs mt-2 uppercase">
               Initial Canvas • Witness Inquiry • Timeline Check
             </p>
          </div>

          {/* Metadata Block */}
          <div className="flex justify-between font-data text-sm border-b border-black pb-2 mb-8">
             <span>REF: {data.caseNumber}</span>
             <span>SUB: {data.name}</span>
             <span>OFFICER: {data.reportingOfficer}</span>
          </div>

          {/* The Notes (Timeline Style) */}
          <div className="space-y-6">
             {data.fieldNotes.length === 0 && (
               <div className="text-center font-data italic opacity-50 mt-12">
                 -- No field notes attached to this file --
               </div>
             )}

             {data.fieldNotes.map((note, i) => (
               <div key={i} className="flex gap-6 group">
                  {/* Time Column */}
                  <div className="w-24 flex-shrink-0 text-right">
                     <div className="font-data font-bold text-sm bg-black text-white inline-block px-1">
                       {note.time}
                     </div>
                     <div className="font-label text-gray-500 mt-1">{note.location}</div>
                  </div>

                  {/* Note Column */}
                  <div className="flex-1 pb-4 border-b border-gray-200">
                     <div className="font-label text-xs font-bold text-gray-700 mb-1">
                       SOURCE: {note.source.toUpperCase()}
                     </div>
                     <div className="font-hand text-xl leading-8">
                       &quot;{note.note}&quot;
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-12 left-0 w-full text-center opacity-50 font-data text-xs">
             --- END OF SUPPLEMENTARY REPORT ---
          </div>

        </div>

      </div>
    </div>
  );
}