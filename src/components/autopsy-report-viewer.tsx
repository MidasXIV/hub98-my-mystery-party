/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

// --- Types ---
export interface AutopsyReportData {
  caseNumber?: string;
  victimName?: string;
  sex?: string;
  age?: string;
  race?: string;
  weight?: string;
  height?: string;
  
  description?: string;
  externalInjuries?: string;
  internalInjuries?: string;
  causeOfDeath?: string;
  mannerOfDeath?: string;
  
  investigatingOfficer?: string;
  recordingOfficer?: string;
  date?: string;
  time?: string;
  coroner?: string;
  policeStation?: string;
}

// --- CSS & Assets ---
const ReportStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Roboto+Condensed:wght@400;700&family=Patrick+Hand&display=swap');

    /* Clinical Blue Form Paper */
    .autopsy-paper {
      background-color: #e8eff5; /* Matching the preview color */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      color: #1e293b;
    }

    /* Form Borders */
    .form-border {
      border: 2px solid #334155;
    }
    .cell-border-r { border-right: 1px solid #334155; }
    .cell-border-b { border-bottom: 1px solid #334155; }
    .cell-border-t { border-top: 1px solid #334155; }

    /* Typography */
    .header-title {
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .field-label {
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 2px;
      line-height: 1;
    }

    /* Handwriting Style */
    .handwriting {
      font-family: 'Patrick Hand', cursive;
      color: #b91c1c; /* Dark Red Ink */
      font-size: 1.1rem;
      line-height: 1.6rem;
    }

    /* Ruled Lines Background */
    .ruled-bg {
      background-image: repeating-linear-gradient(transparent, transparent 1.55rem, rgba(51, 65, 85, 0.2) 1.55rem, rgba(51, 65, 85, 0.2) 1.6rem);
      background-attachment: local;
      line-height: 1.6rem;
      padding-top: 0.2rem;
    }
  `}</style>
);

// --- Parsing Logic ---
function parseAutopsyData(content: string): AutopsyReportData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    // Basic fallback mapping
    const victimMatch = content.match(/(?:Victim|Name):\s*(.*?)(?:\n|$)/i);
    const dateMatch = content.match(/(?:Date|Time):\s*(.*?)(?:\n|$)/i);
    const causeMatch = content.match(/(?:Cause|Cause of Death):\s*(.*?)(?:\n|$)/i);
    
    json = {
      victimName: victimMatch ? victimMatch[1].trim() : "Unknown",
      date: dateMatch ? dateMatch[1].trim() : "Unknown",
      causeOfDeath: causeMatch ? causeMatch[1].trim() : content.slice(0, 100),
    };
  }

  return {
    caseNumber: json.caseNumber || json.CaseID || "A03-05081998",
    victimName: json.victimName || json.victim || json.Name || "Jane Doe",
    sex: json.sex || "F",
    age: json.age || "28",
    race: json.race || "W",
    weight: json.weight || "125",
    height: json.height || "5'4\"",
    description: json.description || "Victim appears to be an average adult female in good health prior to incident.",
    externalInjuries: json.externalInjuries || "Blunt force trauma to right eye and anterior scalp. Multiple lacerations.",
    internalInjuries: json.internalInjuries || "Extensive skull fracture and severe hemorrhaging over the right eye socket.",
    causeOfDeath: json.causeOfDeath || "Blunt force trauma of the head. Victim died within moments of trauma.",
    mannerOfDeath: json.mannerOfDeath || "Homicide. Victim was struck by a single strike to the head inflicted by a hand or blunt object.",
    investigatingOfficer: json.investigatingOfficer || "Det. J. Stayson",
    recordingOfficer: json.recordingOfficer || "Ofc. John Geck",
    date: json.date || "5/9/1998",
    time: json.time || "09:00",
    coroner: json.coroner || "Dr. Tom Ellison MD",
    policeStation: json.policeStation || "Police Department",
  };
}

export default function AutopsyReportViewer({ content }: { content: string }) {
  const data = useMemo(() => parseAutopsyData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ReportStyles />

      {/* --- Paper Container --- */}
      <div className="relative w-full max-w-[950px] min-h-[1200px] autopsy-paper p-8 shadow-2xl text-slate-900">
        
        {/* --- Header --- */}
        <div className="flex border-b-[3px] border-slate-700 pb-2 mb-0">
          {/* Badge */}
          <div className="w-20 h-24 flex-shrink-0 mr-4 opacity-80">
            <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-800">
               <path d="M50 5 L85 20 L85 80 C85 100 50 115 50 115 C50 115 15 100 15 80 L15 20 L50 5 Z" fill="none"/>
               <path d="M50 10 L80 23 L80 78 C80 95 50 108 50 108 C50 108 20 95 20 78 L20 23 L50 10 Z" strokeWidth="1"/>
               <text x="50" y="32" fontSize="8" textAnchor="middle" fontFamily="serif" fontWeight="bold">POLICE</text>
               <path d="M50 55 L58 80 L35 65 L65 65 L42 80 Z" fill="currentColor" opacity="0.1"/>
            </svg>
          </div>
          
          {/* Title Block */}
          <div className="flex-1 text-center pt-2">
            <h1 className="header-title text-3xl md:text-4xl font-bold text-slate-800 mb-1">
              {data.policeStation}
            </h1>
            <h2 className="header-title text-xl md:text-2xl font-bold text-slate-700">
              Form C-652 (Coroner&apos;s Div.)
            </h2>
          </div>

          {/* Case No Box */}
          <div className="w-40 border-l-[3px] border-slate-700 pl-4 flex flex-col justify-center">
             <div className="header-title text-2xl font-bold text-right mb-1">AUTOPSY</div>
             <div className="field-label">Case No.</div>
             <div className="handwriting text-xl">{data.caseNumber}</div>
          </div>
        </div>

        {/* --- Top Row: Victim Details --- */}
        <div className="form-border border-t-0 mb-0">
           <div className="p-1 border-b border-slate-400">
              <div className="field-label">Victim&apos;s Name (Last, First, Middle)</div>
              <div className="handwriting px-2">{data.victimName}</div>
           </div>
           <div className="flex">
              <div className="w-16 cell-border-r p-1 text-center">
                 <div className="field-label">Sex</div>
                 <div className="handwriting">{data.sex}</div>
              </div>
              <div className="w-16 cell-border-r p-1 text-center">
                 <div className="field-label">Age</div>
                 <div className="handwriting">{data.age}</div>
              </div>
              <div className="w-20 cell-border-r p-1 text-center">
                 <div className="field-label">Race</div>
                 <div className="handwriting">{data.race}</div>
              </div>
              <div className="w-20 cell-border-r p-1 text-center">
                 <div className="field-label">Weight</div>
                 <div className="handwriting">{data.weight}</div>
              </div>
              <div className="w-16 p-1 text-center">
                 <div className="field-label">HT</div>
                 <div className="handwriting">{data.height}</div>
              </div>
              <div className="flex-1 bg-slate-200/50"></div>
           </div>
        </div>

        {/* --- Main Content Split --- */}
        <div className="flex form-border border-t-0 min-h-[700px]">
          
          {/* --- LEFT COLUMN (Narrative Fields) --- */}
          <div className="w-1/2 flex flex-col cell-border-r">
            
            {/* Description */}
            <div className="flex-1 cell-border-b p-2">
              <div className="field-label font-bold mb-1">Description of Corpse</div>
              <div className="ruled-bg handwriting h-full w-full min-h-[120px]">
                {data.description}
              </div>
            </div>

            {/* External Injuries */}
            <div className="flex-1 cell-border-b p-2">
              <div className="field-label font-bold mb-1">External Injuries</div>
              <div className="ruled-bg handwriting h-full w-full min-h-[140px]">
                {data.externalInjuries}
              </div>
            </div>

            {/* Internal Injuries */}
            <div className="flex-1 cell-border-b p-2">
              <div className="field-label font-bold mb-1">Internal Injuries</div>
              <div className="ruled-bg handwriting h-full w-full min-h-[140px]">
                {data.internalInjuries}
              </div>
            </div>

            {/* Cause of Death */}
            <div className="flex-1 p-2">
              <div className="field-label font-bold mb-1">Cause of Death:</div>
              <div className="ruled-bg handwriting h-full w-full min-h-[100px]">
                {data.causeOfDeath}
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Diagram & Manner) --- */}
          <div className="w-1/2 flex flex-col">
             
             {/* Body Diagram Area */}
             <div className="flex-grow relative p-4 flex items-center justify-center">
                {/* SVG Human Body Outline */}
                <svg viewBox="0 0 150 350" className="h-full w-auto opacity-70" fill="none" stroke="#334155" strokeWidth="1.5">
                   {/* Head */}
                   <path d="M75 10 C 60 10, 55 30, 55 45 C 55 55, 65 65, 75 65 C 85 65, 95 55, 95 45 C 95 30, 90 10, 75 10 Z" />
                   {/* Torso */}
                   <path d="M55 60 L 35 90 L 30 160 L 40 200 L 75 210 L 110 200 L 120 160 L 115 90 L 95 60" />
                   {/* Arms */}
                   <path d="M35 90 L 15 150 L 10 180 L 25 185 L 30 160" />
                   <path d="M115 90 L 135 150 L 140 180 L 125 185 L 120 160" />
                   {/* Legs */}
                   <path d="M40 200 L 45 280 L 40 340 L 65 345 L 70 280 L 75 210" />
                   <path d="M110 200 L 105 280 L 110 340 L 85 345 L 80 280 L 75 210" />
                   {/* Facial features hint */}
                   <path d="M70 30 L 80 30" opacity="0.5" /> 
                   <path d="M75 35 L 75 45" opacity="0.5" />
                </svg>

                {/* Optional: Red 'Handwritten' Annotation simulating the injury circle */}
                <div className="absolute top-[12%] right-[25%] pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="text-red-700 opacity-60">
                       <path d="M20,50 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,2" />
                       <path d="M80,30 L120,10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <div className="handwriting text-sm absolute top-[-20px] left-[50px] w-32 -rotate-12">
                      Skull Fracture
                    </div>
                </div>
             </div>

             {/* R/L Markers */}
             <div className="flex justify-between px-2 font-bold text-xs border-b border-slate-400">
                <span>R</span>
                <span>L</span>
             </div>

             {/* Manner of Death */}
             <div className="p-2 border-t border-slate-700 bg-white/10 flex-shrink-0">
               <div className="field-label font-bold mb-1">Manner of Death:</div>
               <div className="ruled-bg handwriting min-h-[140px]">
                 {data.mannerOfDeath}
               </div>
             </div>

          </div>
        </div>

        {/* --- Footer Grid --- */}
        <div className="form-border border-t-0 grid grid-cols-4">
           
           <div className="col-span-1 cell-border-r p-1">
             <div className="field-label">Investigating Officer</div>
             <div className="handwriting">{data.investigatingOfficer}</div>
           </div>
           
           <div className="col-span-1 cell-border-r p-1">
             <div className="field-label">Recording Officer</div>
             <div className="handwriting">{data.recordingOfficer}</div>
           </div>
           
           <div className="col-span-1 cell-border-r p-1">
             <div className="field-label">Date and Time</div>
             <div className="handwriting text-sm">{data.date} {data.time}</div>
           </div>
           
           <div className="col-span-1 p-1">
             <div className="field-label">Routed By</div>
             <div className="handwriting text-center">-</div>
           </div>
        </div>

        {/* --- Bottom Signature & Actions --- */}
        <div className="form-border border-t-0 flex">
           
           <div className="w-1/3 cell-border-r p-2 flex flex-col justify-between">
              <div className="field-label text-center">Coroner</div>
              <div className="handwriting text-xl text-center mt-2">{data.coroner}</div>
              <div className="h-[1px] bg-slate-400 w-3/4 mx-auto mt-1"></div>
           </div>

           <div className="w-1/3 cell-border-r p-2 flex items-center justify-between">
              <span className="field-label text-sm">Further Action</span>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                    <span className="field-label">YES</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border border-slate-800 bg-white flex items-center justify-center">
                        <span className="text-red-700 font-bold handwriting text-xl">X</span>
                    </div>
                    <span className="field-label">NO</span>
                 </div>
              </div>
           </div>

           <div className="w-1/3 p-2">
              <div className="field-label">Received By</div>
              <div className="handwriting text-lg ml-4 mt-2">{data.investigatingOfficer?.split(' ').pop()}</div>
           </div>
        </div>

      </div>
    </div>
  );
}