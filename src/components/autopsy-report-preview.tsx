/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

// --- CSS Assets ---
const AutopsyStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Oswald:wght@500&family=Archivo+Narrow:wght@600&display=swap");

    /* Clinical Blue Paper + Medical Grid */
    .coroner-card {
      background-color: #e8eff5; /* Cold Slate Blue/Grey */
      background-image: linear-gradient(
          rgba(51, 65, 85, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(51, 65, 85, 0.05) 1px, transparent 1px),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      background-size: 10px 10px, 10px 10px, auto; /* Grid size */
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.05);
    }

    /* The "Deceased" Stamp */
    .stamp-deceased {
      border: 2px solid #b91c1c;
      color: #b91c1c;
      font-family: "Oswald", sans-serif;
      text-transform: uppercase;
      font-size: 0.6rem;
      padding: 2px 6px;
      display: inline-block;
      transform: rotate(-8deg);
      mix-blend-mode: multiply;
      opacity: 0.8;
      letter-spacing: 0.1em;
      mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    }

    /* Forensic Scale (Ruler) */
    .forensic-ruler {
      background-image: repeating-linear-gradient(
        to bottom,
        #000,
        #000 5px,
        #fff 5px,
        #fff 10px
      );
      box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
    }

    .medical-label {
      font-family: "Archivo Narrow", sans-serif;
      font-size: 0.5rem;
      text-transform: uppercase;
      color: #64748b; /* Slate 500 */
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }

    .sticker-shadow {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  `}</style>
);

function parseAutopsyData(content: string) {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    // Basic fallback mapping
    const victimMatch = content.match(/(?:Victim|Name):\s*(.*?)(?:\n|$)/i);
    const dateMatch = content.match(/(?:Date|Time):\s*(.*?)(?:\n|$)/i);
    const causeMatch = content.match(
      /(?:Cause|Cause of Death):\s*(.*?)(?:\n|$)/i
    );

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
    description:
      json.description ||
      "Victim appears to be an average adult female in good health prior to incident.",
    externalInjuries:
      json.externalInjuries ||
      "Blunt force trauma to right eye and anterior scalp. Multiple lacerations.",
    internalInjuries:
      json.internalInjuries ||
      "Extensive skull fracture and severe hemorrhaging over the right eye socket.",
    causeOfDeath:
      json.causeOfDeath ||
      "Blunt force trauma of the head. Victim died within moments of trauma.",
    mannerOfDeath:
      json.mannerOfDeath ||
      "Homicide. Victim was struck by a single strike to the head inflicted by a hand or blunt object.",
    investigatingOfficer: json.investigatingOfficer || "Det. J. Stayson",
    recordingOfficer: json.recordingOfficer || "Ofc. John Geck",
    date: json.date || "5/9/1998",
    time: json.time || "09:00",
    coroner: json.coroner || "Dr. Tom Ellison MD",
  };
}

interface AutopsyReportPreviewProps {
  content: string;
}

export default function AutopsyReportPreview({
  content,
}: AutopsyReportPreviewProps) {
  const data = useMemo(() => parseAutopsyData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none">
      <AutopsyStyles />

      {/* --- Card Container --- */}
      <div className="w-full h-full coroner-card rounded-r-sm border border-[#cbd5e1] shadow-sm hover:shadow-md transition-all duration-300 flex relative overflow-hidden">
        {/* --- Left Element: Forensic Scale (Ruler) --- */}
        <div className="w-3 h-full forensic-ruler flex-shrink-0 z-20 border-r border-slate-300" />

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col relative">
          {/* Background Watermark: Body Diagram */}
          <div className="absolute right-0 bottom-[-10px] w-20 h-28 opacity-[0.06] pointer-events-none text-slate-800 z-0">
            <svg viewBox="0 0 100 200" fill="currentColor">
              <path d="M50 10 A 15 15 0 0 1 50 40 A 15 15 0 0 1 50 10 Z M20 50 L80 50 L90 120 L80 120 L75 70 L25 70 L20 120 L10 120 Z M30 120 L30 190 L45 190 L45 130 L55 130 L55 190 L70 190 L70 120 Z" />
            </svg>
          </div>

          {/* Background Watermark: EKG Line */}
          <div className="absolute bottom-6 left-0 right-0 h-8 z-0 opacity-20 text-slate-400">
            <svg
              viewBox="0 0 200 50"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 25 L20 25 L25 10 L30 40 L35 25 L60 25 L65 5 L70 45 L75 25 L200 25"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* --- Header Bar --- */}
          <div className="bg-[#334155] h-5 w-full flex items-center justify-between px-2 z-10 shadow-sm">
            <span className="text-[7px] text-white/90 font-mono tracking-widest uppercase">
              Forensic Pathology
            </span>
            {/* Biohazard Icon */}
            <div className="text-yellow-500 w-3 h-3">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z" />
              </svg>
            </div>
          </div>

          {/* --- Content Body --- */}
          <div className="p-3 flex-1 flex flex-col z-10">
            {/* The "Sticker" with Name */}
            <div className="bg-white/95 border border-slate-200 p-1.5 mb-3 sticker-shadow rotate-[-1deg]">
              <div className="medical-label">Decedent Name</div>
              <div className="font-['Courier_Prime'] font-bold text-[10px] uppercase leading-tight text-slate-900 line-clamp-2">
                {data.victimName}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-auto flex justify-between items-end">
              <div>
                <div className="medical-label">Case ID</div>
                <div className="font-mono text-[9px] text-slate-700 bg-slate-200/50 px-1 rounded-sm">
                  {data.caseNumber}
                </div>
              </div>

              {/* Stamp */}
              <div className="stamp-deceased">Post Mortem</div>
            </div>
          </div>
        </div>

        {/* --- Rusty Staple Visual (Top Center of content) --- */}
        <div className="absolute top-[18px] left-[55%] z-20">
          <div className="w-3 h-[2px] bg-[#713f12] opacity-70 shadow-sm rotate-1"></div>
        </div>
      </div>
    </div>
  );
}
