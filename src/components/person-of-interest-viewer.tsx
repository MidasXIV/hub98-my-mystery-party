/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

// --- Types ---
// Updated to match the granular fields in the reference image
export interface PersonOfInterestData {
  // Personal
  lastName?: string;
  firstName?: string;
  middleName?: string;
  alias?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  dob?: string;
  age?: string;
  
  // Physical Stats
  sex?: string;
  race?: string;
  height?: string;
  weight?: string;
  hair?: string;
  eyes?: string;
  scars?: string;
  
  // Background
  occupation?: string;
  employer?: string;
  arrests?: string;
  
  // Vehicles (Array of cars)
  vehicles?: Array<{ year: string; make: string; model: string; color: string; plate: string }>;
  
  // Narrative
  statement?: string; // Maps to "Reason" or "Statement"
  conclusion?: string;
  narrativeDate?: string;
  narrativeTime?: string;
  
  // Meta
  caseNumber?: string;
  policeStation?: string;
}

// --- CSS & Assets ---
const FormStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Patrick+Hand&family=Oswald:wght@500;700&display=swap');

    /* Burnt Orange Form Paper */
    .poi-form-paper {
      background-color: #e8a87c;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
      color: #1a1a1a;
    }

    /* The Printed Labels (Small, Sans-Serif) */
    .form-label {
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 0.65rem; /* ~10px */
      text-transform: uppercase;
      color: #4a3b2a;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
      line-height: 1;
    }

    /* The "Handwritten" Data */
    .handwriting {
      font-family: 'Patrick Hand', cursive;
      color: #0f172a; /* Dark Blue Ink */
      font-size: 1.1rem;
      line-height: 1.1;
      padding-left: 0.25rem;
    }

    /* Grid Lines */
    .form-border {
      border: 1px solid #3f2e22;
    }
    .border-r-form { border-right: 1px solid #3f2e22; }
    .border-b-form { border-bottom: 1px solid #3f2e22; }
    .border-t-form { border-top: 1px solid #3f2e22; }

    /* Narrative Box ruled lines */
    .ruled-lines {
      background-image: repeating-linear-gradient(transparent, transparent 1.5rem, rgba(0,0,0,0.1) 1.5rem, rgba(0,0,0,0.1) 1.55rem);
      background-attachment: local;
      line-height: 1.55rem;
    }
  `}</style>
);

// --- Parsing Logic ---
function parsePOIData(content: string): PersonOfInterestData {
  let json: any = {};
  
  // 1. Try JSON Parse
  try {
    json = JSON.parse(content);
  } catch {
    // 2. Fallback: Parse the old Text format into the new JSON structure
    const subjectMatch = content.match(/\*\*Subject:\*\*\s*(.*?)(\n|$)/i);
    const occMatch = content.match(/\*\*Occupation:\*\*\s*(.*?)(\n|$)/i);
    const reasonMatch = content.match(/\*\*Reason for Inclusion.*?\*\*([\s\S]*?)(?=\*\*Conclusion|\Z)/i);
    const conclusionMatch = content.match(/\*\*Conclusion:\*\*([\s\S]*)/i);

    // Split Name if possible
    const fullName = subjectMatch ? subjectMatch[1].trim().split(' ') : ["Unknown"];
    
    json = {
      firstName: fullName[0],
      lastName: fullName.slice(1).join(' '),
      occupation: occMatch ? occMatch[1].trim() : "",
      statement: (reasonMatch ? reasonMatch[1].trim() : "") + "\n\n" + (conclusionMatch ? conclusionMatch[1].trim() : ""),
    };
  }

  // 3. Normalize Data (Ensure fields exist)
  return {
    // Prefer explicit keys from provided schema; fall back to older aliases
    lastName: json.lastName || json.surname || json.subject?.split(' ').pop() || "",
    firstName: json.firstName || json.givenName || json.subject?.split(' ')[0] || "",
    middleName: json.middleName || "",
    alias: json.alias || "",
    address: json.address || "N/A",
    city: json.city || "N/A",
    state: json.state || "N/A",
    zipCode: json.zipCode || "N/A",
    phone: json.phone || "N/A",
    dob: json.dob || "Unknown",
    age: json.age || "",
    sex: json.sex || "M",
    race: json.race || "W",
    height: json.height || "",
    weight: json.weight || "",
    hair: json.hair || "",
    eyes: json.eyes || "",
    scars: json.scars || "None visible",
    occupation: json.occupation || "Unemployed",
    employer: json.employer || "",
    arrests: json.arrests || "None",
    // Prefer explicit 'statement' field; accept provided 'statement' or 'conclusion' split when present
    statement: json.statement || json.reason || json.statementBody || "No statement provided.",
    conclusion: json.conclusion || "",
    caseNumber: json.caseNumber || "A03-05081998",
    narrativeDate: json.narrativeDate || "Oct 28, 1998",
    narrativeTime: json.narrativeTime || "14:00",
    vehicles: Array.isArray(json.vehicles) ? json.vehicles : [
        // Dummy data if none provided, just for the visual style
        { year: "??", make: "----", model: "----", color: "--", plate: "----" }
    ],
    policeStation: json.policeStation || "Riverdale Police Department",
  };
}

export default function PersonOfInterestViewer({ content }: { content: string }) {
  const data = useMemo(() => parsePOIData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <FormStyles />
      
      {/* --- Paper Container --- */}
      <div className="relative w-full max-w-[900px] min-h-[1100px] poi-form-paper shadow-2xl p-6 md:p-8 text-black font-sans">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-1">
          <div className="flex items-center gap-3">
             {/* Badge SVG */}
             <div className="w-12 h-14 opacity-80">
                <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                   <path d="M50 5 L85 20 L85 80 C85 100 50 115 50 115 C50 115 15 100 15 80 L15 20 L50 5 Z" fill="none"/>
                   <path d="M50 10 L80 23 L80 78 C80 95 50 108 50 108 C50 108 20 95 20 78 L20 23 L50 10 Z" strokeWidth="1"/>
                   <text x="50" y="32" fontSize="8" textAnchor="middle" fontFamily="serif" fontWeight="bold">POLICE</text>
                   <path d="M50 55 L58 80 L35 65 L65 65 L42 80 Z" fill="currentColor" opacity="0.2"/>
                </svg>
             </div>
             <h1 className="text-2xl md:text-3xl font-bold font-['Oswald'] tracking-wider uppercase">
                {data.policeStation}
             </h1>
          </div>
          <div className="text-center">
             <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight font-['Oswald']">
               Person of Interest
             </h2>
          </div>
          <div className="text-right">
             <div className="form-label">Case No.</div>
             <div className="handwriting text-xl">{data.caseNumber}</div>
          </div>
        </div>

        {/* --- Section 1: Name & Alias --- */}
        <div className="form-border bg-white/10 mb-2">
            <div className="flex border-b-form">
                <div className="flex-1 border-r-form p-1">
                    <div className="form-label">Name - Last</div>
                    <div className="handwriting">{data.lastName}</div>
                </div>
                <div className="flex-1 border-r-form p-1">
                    <div className="form-label">Name - First</div>
                    <div className="handwriting">{data.firstName}</div>
                </div>
                <div className="flex-1 p-1">
                    <div className="form-label">Name - Middle</div>
                    <div className="handwriting">{data.middleName}</div>
                </div>
            </div>
            <div className="p-1">
                <div className="form-label">Alias / Maiden Name / Nickname</div>
                <div className="handwriting">{data.alias}</div>
            </div>
        </div>

        {/* --- Section 2: Contact & Demographics --- */}
        <div className="form-border bg-white/10 mb-2">
            {/* Address Row */}
            <div className="flex border-b-form">
                <div className="flex-[3] border-r-form p-1">
                    <div className="form-label">Home Address</div>
                    <div className="handwriting">{data.address}</div>
                </div>
                <div className="flex-[1] border-r-form p-1">
                    <div className="form-label">Apt</div>
                    <div className="handwriting"></div>
                </div>
                <div className="flex-[1.5] border-r-form p-1">
                    <div className="form-label">City</div>
                    <div className="handwriting">{data.city}</div>
                </div>
                <div className="flex-[0.5] border-r-form p-1">
                    <div className="form-label">State</div>
                    <div className="handwriting">{data.state}</div>
                </div>
                <div className="flex-[1] p-1">
                    <div className="form-label">Zip Code</div>
                    <div className="handwriting">{data.zipCode}</div>
                </div>
            </div>
            
            {/* Phone / ID Row */}
            <div className="flex border-b-form">
                <div className="flex-[1.5] border-r-form p-1">
                    <div className="form-label">Home Phone</div>
                    <div className="handwriting">{data.phone}</div>
                </div>
                <div className="flex-[1.5] border-r-form p-1">
                    <div className="form-label">Driver&apos;s License / ID</div>
                    <div className="handwriting">T99-281-992</div>
                </div>
                <div className="flex-[0.5] border-r-form p-1">
                    <div className="form-label">State</div>
                    <div className="handwriting">IN</div>
                </div>
                <div className="flex-[1.5] p-1">
                    <div className="form-label">Marital Status</div>
                    <div className="handwriting">Single</div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="flex">
                <div className="w-24 border-r-form p-1">
                     <div className="form-label">DOB</div>
                     <div className="handwriting">{data.dob}</div>
                </div>
                <div className="w-12 border-r-form p-1">
                     <div className="form-label">Age</div>
                     <div className="handwriting">{data.age}</div>
                </div>
                <div className="w-12 border-r-form p-1">
                     <div className="form-label">Sex</div>
                     <div className="handwriting uppercase">{data.sex}</div>
                </div>
                <div className="w-12 border-r-form p-1">
                     <div className="form-label">Race</div>
                     <div className="handwriting uppercase">{data.race}</div>
                </div>
                <div className="w-16 border-r-form p-1">
                     <div className="form-label">Height</div>
                     <div className="handwriting">{data.height}</div>
                </div>
                <div className="w-16 border-r-form p-1">
                     <div className="form-label">Weight</div>
                     <div className="handwriting">{data.weight}</div>
                </div>
                <div className="w-16 border-r-form p-1">
                     <div className="form-label">Hair</div>
                     <div className="handwriting">{data.hair}</div>
                </div>
                <div className="w-16 border-r-form p-1">
                     <div className="form-label">Eye</div>
                     <div className="handwriting">{data.eyes}</div>
                </div>
                 <div className="flex-1 p-1">
                     <div className="form-label">Scars / Marks / Tattoos</div>
                     <div className="handwriting">{data.scars}</div>
                </div>
            </div>
        </div>

        {/* --- Section 3: Background --- */}
        <div className="form-border bg-white/10 mb-2">
             <div className="flex border-b-form">
                <div className="flex-1 border-r-form p-1">
                     <div className="form-label">Prior Arrests?</div>
                     <div className="handwriting">{data.arrests}</div>
                </div>
                 <div className="flex-1 border-r-form p-1">
                     <div className="form-label">Prior Felonies?</div>
                     <div className="handwriting">None</div>
                </div>
                 <div className="flex-1 p-1">
                     <div className="form-label">Outstanding Warrants?</div>
                     <div className="handwriting">None</div>
                </div>
             </div>
             <div className="flex">
                <div className="flex-[1.5] border-r-form p-1">
                     <div className="form-label">Employer</div>
                     <div className="handwriting">{data.employer}</div>
                </div>
                <div className="flex-[2] border-r-form p-1">
                     <div className="form-label">Employer Address</div>
                     <div className="handwriting">Riverdale, IN</div>
                </div>
                 <div className="flex-[1.5] p-1">
                     <div className="form-label">Occupation</div>
                     <div className="handwriting">{data.occupation}</div>
                </div>
             </div>
        </div>

        {/* --- Section 4: Vehicles Header --- */}
        <div className="bg-[#3f2e22] text-[#e8a87c] text-center text-[10px] font-bold tracking-widest uppercase py-0.5 mb-0">
             IF YOU OWN MORE THAN 4 VEHICLES USE AN ADDITIONAL CARD
        </div>
        
        {/* Vehicles Table */}
        <div className="form-border border-t-0 mb-4 bg-white/5">
             {/* Table Head */}
             <div className="flex border-b-form">
                 <div className="w-12 p-1 border-r-form form-label">Year</div>
                 <div className="flex-1 p-1 border-r-form form-label">Make</div>
                 <div className="flex-1 p-1 border-r-form form-label">Model</div>
                 <div className="w-24 p-1 border-r-form form-label">Color</div>
                 <div className="w-24 p-1 border-r-form form-label">Plate</div>
                 <div className="w-32 p-1 form-label">VIN</div>
             </div>
             {/* Table Body (Map vehicles or show blanks) */}
             {[0, 1, 2].map((i) => {
                 const v = data.vehicles?.[i];
                 return (
                    <div key={i} className="flex border-b-form last:border-0 h-8">
                        <div className="w-12 p-1 border-r-form handwriting">{v?.year || ""}</div>
                        <div className="flex-1 p-1 border-r-form handwriting">{v?.make || ""}</div>
                        <div className="flex-1 p-1 border-r-form handwriting">{v?.model || ""}</div>
                        <div className="w-24 p-1 border-r-form handwriting">{v?.color || ""}</div>
                        <div className="w-24 p-1 border-r-form handwriting">{v?.plate || ""}</div>
                        <div className="w-32 p-1 handwriting"></div>
                    </div>
                 );
             })}
        </div>

        {/* --- Section 5: Narrative (Individual Statement) --- */}
        <div className="form-border bg-[#e8a87c] mb-1">
            <div className="bg-[#a89078] bg-opacity-40 border-b-form text-center p-0.5">
                <span className="font-['Roboto_Condensed'] text-sm font-bold uppercase">Investigative Narrative / Individual Statement</span>
            </div>
            
            <div className="p-1 border-b-form flex justify-between bg-white/10">
                 <div className="form-label">In the space below, describe the rationale for inclusion or witness statement.</div>
                 <div className="flex gap-4">
                     <div>
                        <span className="form-label mr-2">Date:</span>
                        <span className="handwriting text-sm">{data.narrativeDate}</span>
                     </div>
                     <div>
                        <span className="form-label mr-2">Time:</span>
                        <span className="handwriting text-sm">{data.narrativeTime}</span>
                     </div>
                 </div>
            </div>

            {/* The Ruled Area */}
            <div className="min-h-[300px] p-4 handwriting text-xl ruled-lines relative">
                 {data.statement}
                 {data.conclusion && (
                     <>
                        <br/><br/>
                        <span className="font-bold underline text-base font-sans opacity-70">CONCLUSION:</span>
                        <br/>
                        {data.conclusion}
                     </>
                 )}
            </div>
        </div>

        {/* --- Footer --- */}
        <div className="mt-4 border-t-2 border-black pt-1 flex justify-between items-end">
            <div className="w-1/3">
                <div className="form-label mb-4">Signature of Officer</div>
                <div className="font-['Patrick_Hand'] text-3xl opacity-80 -rotate-3 ml-4">
                   Det. Stayson
                </div>
                <div className="border-t border-black mt-1"></div>
            </div>
            
            <div className="w-1/3 text-center opacity-60">
                <div className="form-label">Department Use Only</div>
                <div className="font-mono text-xs">REF: 423 MAIN ST, RIVERDALE</div>
            </div>

            <div className="w-1/4">
                <div className="form-label mb-1">Badge No.</div>
                <div className="handwriting text-xl border border-black p-1 text-center bg-white/10">
                   79788
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}