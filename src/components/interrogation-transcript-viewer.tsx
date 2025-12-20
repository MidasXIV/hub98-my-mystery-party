"use client";

import React, { useMemo } from "react";

// --- CSS & Assets ---
const Styles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

    /* Wide letter spacing for the Department Header */
    .tracking-widest-2 {
      letter-spacing: 0.3em;
    }

    /* Realistic Paper Texture (Manila/Cream) */
    .paper-sheet {
      background-color: #fdfcf8;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
      box-shadow: 0 2px 5px rgba(0,0,0,0.05), 0 15px 40px rgba(0,0,0,0.15);
    }

    /* Typewriter Text Styling */
    .typewriter-ink {
      font-family: 'Courier Prime', monospace;
      color: #1a1a1a;
      text-shadow: 0.2px 0.2px 0.5px rgba(0,0,0,0.1);
    }
  `}</style>
);

// --- Parsing Logic ---
interface InterrogationTranscriptData {
  department: string;
  title: string;
  caseNumber: string;
  date: string;
  interviewer: string;
  subject: string;
  bodyRaw: string[];
}

/** 
 * This function parses your specific Markdown-like format 
 * (e.g. "**Date:** October...") into structured data.
 */
function parseRawContent(text: string): InterrogationTranscriptData {
  // First, attempt to parse JSON content matching the provided schema.
  try {
    const json = JSON.parse(text);
    const body: string[] = Array.isArray(json.bodyRaw) ? json.bodyRaw : [];
    return {
      department: json.department || "POLICE DEPARTMENT",
      title: json.title || "",
      caseNumber: json.caseNumber || "",
      date: json.date || "",
      interviewer: json.interviewer || "",
      subject: json.subject || "",
      bodyRaw: body,
    };
  } catch {
    // fall through to legacy text parsing
  }

  const data: InterrogationTranscriptData = {
    department: "POLICE DEPARTMENT",
    title: "",
    caseNumber: "",
    date: "",
    interviewer: "",
    subject: "",
    bodyRaw: [],
  };

  const lines = text.split('\n');
  let isBody = false;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Detect Metadata
    if (trimmed.startsWith("## Interview:")) {
      data.title = trimmed.replace("## Interview:", "").trim();
    } else if (trimmed.includes("**Case File:**")) {
      data.caseNumber = trimmed.replace(/\*\*Case File:\*\*/i, "").trim();
    } else if (trimmed.includes("**Date:**")) {
      data.date = trimmed.replace(/\*\*Date:\*\*/i, "").trim();
    } else if (trimmed.includes("**Interviewer:**")) {
      data.interviewer = trimmed.replace(/\*\*Interviewer:\*\*/i, "").trim();
    } else if (trimmed.includes("**Subject:**")) {
      data.subject = trimmed.replace(/\*\*Subject:\*\*/i, "").trim();
    } else if (trimmed.includes("**Begin Transcript**") || trimmed.includes("BEGINNING OF INTERVIEW")) {
      isBody = true;
    } else {
      // If we hit the body marker, or if it looks like dialogue, treat as body
      if (isBody || trimmed.startsWith("**")) {
        data.bodyRaw.push(trimmed);
      }
    }
  });

  return data;
}

export function InterrogationTranscriptViewer({
  content,
  compact = false,
}: {
  content: string;
  compact?: boolean;
}) {
  // Parse the raw string content into structured data
  const data = useMemo(() => parseRawContent(content), [content]);

  // --- COMPACT VIEW ---
  if (compact) {
    return (
      <div className="w-full h-full bg-[#fdfbf7] border border-gray-400 p-3 font-mono text-xs flex flex-col gap-2">
        <div className="font-bold border-b border-gray-300 pb-1 truncate">
          CASE: {data.caseNumber || "UNKNOWN"}
        </div>
        <div className="text-[10px] text-gray-600">
          {data.date}
        </div>
      </div>
    );
  }

  // --- FULL VIEW ---
  return (
    <div className="w-full flex justify-center py-10 bg-gray-100/50 min-h-screen overflow-y-auto">
      <Styles />
      
      {/* The Paper Sheet */}
      <div className="relative w-full max-w-[850px] min-h-[1100px] paper-sheet p-12 md:p-16 text-black">
        
        {/* --- Header --- */}
        <header className="flex flex-row items-start justify-between mb-10">
          {/* Badge SVG */}
          <div className="w-20 h-24 flex-shrink-0 opacity-80 mt-2">
             <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
               <path d="M50 5 L90 20 L90 80 C90 105 50 115 50 115 C50 115 10 105 10 80 L10 20 L50 5 Z" fill="none"/>
               <path d="M50 12 L85 24 L85 78 C85 98 50 108 50 108 C50 108 15 98 15 78 L15 24 L50 12 Z" strokeWidth="1"/>
               <text x="50" y="38" fontSize="8" textAnchor="middle" fontFamily="serif" fontWeight="bold">POLICE</text>
               <path d="M50 55 L56 75 L38 62 L62 62 L44 75 Z" fill="currentColor" opacity="0.1"/>
             </svg>
          </div>

          {/* Department Name - Wide Spaced */}
          <div className="flex-1 text-right pt-4">
            <h1 className="text-lg font-bold uppercase tracking-widest-2 typewriter-ink">
              {data.department}
            </h1>
          </div>
        </header>

        {/* --- Metadata Stack (Centered) --- */}
        <section className="flex flex-col items-center text-center mb-8 typewriter-ink text-[14px] leading-relaxed">
          
          {/* Main Title Line */}
          <div className="mb-2 font-bold uppercase tracking-wide">
             FULL RECORDED INTERVIEW - {data.subject || data.title}
          </div>
          
          {/* Case Number */}
          <div className="mb-4 font-bold">
            CASE NUMBER: {data.caseNumber || "PENDING"}
          </div>

          {/* Details Block */}
          <div className="space-y-1">
            {data.date && <div><span className="font-bold">Date:</span> {data.date}</div>}
            {data.interviewer && <div><span className="font-bold">Conducted by:</span> {data.interviewer}</div>}
            <div className="mt-2">
              <span className="font-bold">Location:</span> Interview Room B
            </div>
          </div>

        </section>

        {/* --- The Divider --- */}
        <div className="typewriter-ink text-center text-xs opacity-70 mb-10 tracking-wider">
           ################ BEGINNING OF INTERVIEW ################
        </div>

        {/* --- Transcript Body --- */}
        <main className="typewriter-ink text-[14px] leading-7 text-justify">
          {data.bodyRaw.length > 0 ? (
            data.bodyRaw.map((line, i) => {
              // Support both Markdown-style "**Speaker:** text" and simple "Speaker: text"
              const mdMatch = line.match(/^\*\*(.*?):\*\*\s*(.*)/);
              const simpleMatch = line.match(/^(.*?):\s*(.*)/);

              if (mdMatch) {
                return (
                  <div key={i} className="mb-4">
                    <span className="font-bold mr-2">{mdMatch[1]}:</span>
                    <span>{mdMatch[2]}</span>
                  </div>
                );
              } else if (simpleMatch) {
                return (
                  <div key={i} className="mb-4">
                    <span className="font-bold mr-2">{simpleMatch[1]}:</span>
                    <span>{simpleMatch[2]}</span>
                  </div>
                );
              } else {
                const cleanLine = line.replace(/\*\*/g, "");
                return (
                  <div key={i} className="mb-4 italic opacity-80">[{cleanLine}]</div>
                );
              }
            })
          ) : (
            <p className="text-center italic opacity-50">(Transcript content is empty)</p>
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-[10px] font-mono opacity-40">
           EVIDENCE EXHIBIT #{Math.floor(Math.random() * 1000)}
        </footer>

      </div>
    </div>
  );
}

export default InterrogationTranscriptViewer;