"use client";

import React, { useMemo } from "react";

// --- Types ---

// This is the structure you can use for future data.
// The component currently parses raw text to fill this.
export interface WitnessStatementData {
  incidentNumber?: string;
  date?: string;
  witnessName?: string;
  witnessAddress?: string;
  witnessDOB?: string;
  witnessPhone?: string;
  statementBody?: string;
  pageNumber?: string;
}

// --- CSS & Assets ---
const FormStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Patrick+Hand&family=Roboto+Condensed:wght@400;700&display=swap');

    /* The specific Yellow Form Paper */
    .yellow-form-paper {
      background-color: #fce84e; /* Bright administrative yellow */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }

    /* The "Printed" Text (Form Labels) */
    .form-label {
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.75rem; /* 12px */
      color: #1a1a1a;
    }

    /* The "Handwritten" Text (User Input) */
    .handwriting {
      font-family: 'Patrick Hand', cursive;
      color: #0f172a; /* Dark Blue/Black Pen */
      font-size: 1.25rem;
      line-height: 1.4;
    }

    /* Heavy Black Header Bars */
    .black-bar {
      background-color: #111;
      color: #fce84e;
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `}</style>
);

// --- Parsing Logic ---
function parseWitnessData(content: string): WitnessStatementData {
  // 1. Try JSON parsing first
  try {
    const json = JSON.parse(content);
    return {
      incidentNumber: json.incidentNumber || `A0${Math.floor(Math.random()*9)}-${Math.floor(Math.random()*1000000)}`,
      date: json.date || json.time || "Unknown",
      // Prefer explicit keys from provided schema; fall back to older aliases
      witnessName: json.witnessName || json.name || json.subject || json.witness || "Unknown",
      witnessAddress: json.address || json.location || "N/A",
      witnessDOB: json.dob || "",
      witnessPhone: json.phone || "",
      // Prefer explicit key 'statementBody'; else use legacy aliases
      statementBody: json.statementBody || json.statement || json.body || content,
      pageNumber: json.pageNumber ? String(json.pageNumber) : "1",
    };
  } catch {
    // 2. Fallback: Parse the raw markdown-like string provided
    // Example Input: "## Witness Statement: Sofia Bianchi\n\n**Date:** October 26..."
    
    const nameMatch = content.match(/Witness Statement:\s*(.*?)(\n|$)/i) || content.match(/\*\*Re:\s*(.*?)–/i);
    const dateMatch = content.match(/\*\*Date:\*\*\s*(.*?)(\n|$)/i);
    const addressMatch = content.match(/residing at\s*(.*?),/i);
    
    // Clean the body: Remove headers/metadata lines
    const cleanBody = content
      .replace(/## Witness Statement:.*\n?/gi, "")
      .replace(/\*\*Date:.*\n?/gi, "")
      .replace(/\*\*Re:.*\n?/gi, "")
      .replace(/\*\*End of Statement\*\*/gi, "")
      .replace(/\*\*\(Signature\)\*\*/gi, "")
  .replace(/Signed,\n\n[\s\S]*/, "") // Remove signature block (dotall-safe)
      .trim();

    return {
      incidentNumber: "A03-05081998", // Hardcoded to match style or random
      date: dateMatch ? dateMatch[1].trim() : "Unknown",
      witnessName: nameMatch ? nameMatch[1].trim() : "Unknown Witness",
      witnessAddress: addressMatch ? addressMatch[1].trim() : "",
      witnessDOB: "", // Not present in current raw text
      witnessPhone: "", // Not present in current raw text
      statementBody: cleanBody,
      pageNumber: "1"
    };
  }
}

export default function FormalAlibiViewer({ content }: { content: string }) {
  const data = useMemo(() => parseWitnessData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-800 min-h-screen overflow-y-auto">
      <FormStyles />
      
      {/* --- Paper Container --- */}
      <div className="relative w-full max-w-[850px] min-h-[1100px] yellow-form-paper p-6 md:p-10 shadow-2xl text-black">
        
        {/* Page Number */}
        <div className="absolute top-6 right-8 text-xs font-bold font-sans">
          PAGE {data.pageNumber}
        </div>

        {/* --- Header Section --- */}
        <header className="flex flex-col items-center mb-6 relative">
          
          {/* Department Title */}
          <div className="text-sm font-bold uppercase tracking-[0.2em] mb-2 font-sans opacity-90">
            Riverdale Police Department
          </div>

          {/* Badge & Main Title Bar */}
          <div className="w-full flex items-center gap-4">
            {/* Badge SVG (Left) */}
            <div className="w-20 h-24 flex-shrink-0 z-10 drop-shadow-md">
               <svg viewBox="0 0 100 120" fill="#fce84e" stroke="currentColor" strokeWidth="1.5" className="text-black">
                 {/* Shield Shape */}
                 <path d="M50 2 L90 15 L90 75 C90 100 50 118 50 118 C50 118 10 100 10 75 L10 15 L50 2 Z" fill="#fce84e" stroke="black" strokeWidth="2"/>
                 {/* Inner Ring */}
                 <path d="M50 8 L84 19 L84 74 C84 94 50 110 50 110 C50 110 16 94 16 74 L16 19 L50 8 Z" fill="none" stroke="black" strokeWidth="1"/>
                 {/* Text Banner */}
                 <path d="M18 35 L82 35 L82 50 L50 55 L18 50 Z" fill="black"/>
                 <text x="50" y="46" fontSize="7" fill="#fce84e" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">RIVERDALE</text>
                 <text x="50" y="100" fontSize="8" fill="black" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">POLICE</text>
                 {/* Star */}
                 <path d="M50 60 L53 85 L35 70 L65 70 L47 85 Z" fill="none" stroke="black" opacity="0.5"/>
               </svg>
            </div>

            {/* Black Title Bar */}
            <div className="flex-1 black-bar text-2xl md:text-3xl font-bold py-2 text-center shadow-sm border-2 border-black">
              Witness Statement Form
            </div>
          </div>
        </header>

        {/* --- Metadata Grid --- */}
        <div className="border-2 border-black bg-transparent mb-1">
            
            {/* Row 1: Date & Incident */}
            <div className="flex border-b border-black">
                <div className="flex-[2] border-r border-black flex">
                    <div className="px-2 py-2 form-label w-16 border-r border-black/20 flex items-center bg-white/20">DATE</div>
                    <div className="px-3 py-1 handwriting self-center">{data.date}</div>
                </div>
                <div className="flex-[1] flex">
                    <div className="px-2 py-2 form-label w-24 border-r border-black/20 flex items-center bg-black/10">INCIDENT #</div>
                    <div className="px-3 py-1 handwriting self-center">{data.incidentNumber}</div>
                </div>
            </div>

            {/* Row 2: Name */}
            <div className="flex border-b border-black">
                <div className="px-2 py-2 form-label w-24 border-r border-black/20 flex items-center bg-white/20">NAME</div>
                <div className="px-3 py-1 handwriting self-center w-full">{data.witnessName}</div>
            </div>

            {/* Row 3: Address */}
            <div className="flex border-b border-black">
                <div className="px-2 py-2 form-label w-24 border-r border-black/20 flex items-center bg-white/20">ADDRESS</div>
                <div className="px-3 py-1 handwriting self-center w-full">{data.witnessAddress}</div>
            </div>

            {/* Row 4: DOB & Phone */}
            <div className="flex">
                <div className="flex-1 border-r border-black flex">
                    <div className="px-2 py-2 form-label w-24 border-r border-black/20 flex items-center bg-white/20">DATE OF BIRTH</div>
                    <div className="px-3 py-1 handwriting self-center">{data.witnessDOB}</div>
                </div>
                <div className="flex-[1.5] flex">
                    <div className="px-2 py-2 form-label w-24 border-r border-black/20 flex items-center bg-white/20">TELEPHONE #</div>
                    <div className="px-3 py-1 handwriting self-center">{data.witnessPhone}</div>
                </div>
            </div>
        </div>

        {/* --- Legal Disclaimer --- */}
        <div className="text-[9px] md:text-[10px] text-center leading-tight opacity-90 px-8 py-3 font-sans">
            I make the below statement voluntarily. This account is true to the best of my knowledge and belief, and represents my observations in the case currently under investigation. I understand that making false statements or reports pursuant to a police investigation is a criminal offense under MCL 750.411a.
        </div>

        {/* --- Narrative Section --- */}
        <div className="border-2 border-black min-h-[500px] flex flex-col relative bg-transparent">
            {/* Header */}
            <div className="black-bar text-center text-sm py-1 font-bold tracking-wider border-b-2 border-black">
                NARRATIVE
            </div>

            {/* Handwriting Body */}
            <div className="p-6 md:p-8 handwriting text-xl leading-9 relative z-10 text-justify">
                {/* Visual Guidelines (CSS Stripes) */}
                <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{
                         backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                         backgroundSize: '100% 2.25rem',
                         backgroundPosition: '0 2.5rem'
                     }} 
                />
                
                {data.statementBody}
            </div>
        </div>

      </div>
    </div>
  );
}