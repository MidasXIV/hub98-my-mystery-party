"use client";

import React from "react";
import Image from "next/image";

type BadgeContent = {
  imageUrl?: string;
  caseId?: string;
  issueDate?: string;
  officerSignature?: string;
  text?: string;
};

function parseBadgeContent(content: string): BadgeContent {
  try {
    const parsed = JSON.parse(content || "{}");
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as BadgeContent;
    }
  } catch {
    // ignore malformed json and use defaults
  }
  return {};
}

export default function BadgeBoardViewer({
  content,
  title,
}: {
  content: string;
  title?: string;
}) {
  const data = parseBadgeContent(content);

  const imageSrc = data.imageUrl;
  const displayText =
    data.text ||
    "You have cleared the objectives. Well done, Detective.";
  
  // Mystery flavor constants
  const caseId = data.caseId || "CASE-FILE: REDACTED";
  const issueDate = data.issueDate || new Date().toLocaleDateString();
  const signature = data.officerSignature || "The Commissioner";

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-500">
      {/* The "A4 Sheet" Container */}
      <div className="relative w-full max-w-2xl bg-[#fdfbf7] shadow-2xl p-8 md:p-16 border-[12px] border-double border-slate-200 text-slate-800 print:shadow-none print:border-none print:m-0">
        
        {/* Subtle Watermark/Background decoration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex items-center justify-center">
            <h1 className="text-[12rem] font-black -rotate-12 select-none">CONFIDENTIAL</h1>
        </div>

        {/* Header Section */}
        <div className="relative flex justify-between items-start mb-12 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Department of Investigation</h3>
            <h1 className="text-2xl font-serif font-bold text-slate-900 leading-tight">OFFICIAL COMMENDATION</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">REF: {caseId}</p>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">DATE: {issueDate}</p>
          </div>
        </div>

        {/* Badge Section - The Main Visual */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="relative group">
            {/* Soft glow behind the badge */}
            <div className="absolute inset-0 bg-yellow-500/10 blur-2xl rounded-full scale-150 transition-all group-hover:scale-175 opacity-0 group-hover:opacity-100" />
            
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title || "Objectives Cleared Badge"}
                  fill
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:rotate-3"
                />
              ) : (
                <div className="w-full h-full rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-xs uppercase tracking-widest text-slate-400">
                  Badge Missing
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
             <span className="bg-slate-900 text-white px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase">Status: Case Closed</span>
          </div>
        </div>

        {/* Body Text Section */}
        <div className="relative space-y-6 text-center max-w-lg mx-auto">
          <h2 className="text-xl font-serif italic text-slate-700">
            Honoring the Resolve of the Individual
          </h2>
          <p className="text-lg leading-relaxed font-serif text-slate-800 italic first-letter:text-3xl first-letter:font-bold">
            {displayText}
          </p>
        </div>

        {/* Signature Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-end">
            <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Authorization</p>
                <div className="font-['Dancing_Script',_cursive] text-2xl text-slate-600 border-b border-slate-300 pb-1 px-2">
                    {signature}
                </div>
            </div>
            <div className="text-right opacity-40">
                 <div className="w-16 h-16 border-4 border-slate-400 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-500 rotate-12">
                    STATION<br/>ZERO
                 </div>
            </div>
        </div>
      </div>

      {/* Action Buttons (Hidden when printing) */}
      <div className="mt-8 flex gap-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print Commendation
        </button>
      </div>

      {/* Required for the handwritten font signature effect */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
        @media print {
            body * { visibility: hidden; }
            .print\:m-0, .print\:m-0 * { visibility: visible; }
            .print\:m-0 { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}