"use client";

import React, { useMemo } from "react";
import { Caveat } from "next/font/google";
import { parseLetterData } from "@/lib/letter-utils";

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface LetterPreviewProps {
  content: string;
  variant?: "standard" | "cliche" | "chic" | "handwritten";
}

export default function LetterPreview({ content, variant }: LetterPreviewProps) {
  const letter = useMemo(() => parseLetterData(content), [content]);
  const resolvedVariant = variant ?? letter.variant ?? "standard";
  const isHandwritten = resolvedVariant === "handwritten";
  const showSignature = Boolean(letter.sign) && !isHandwritten;

  // Style configurations based on the variant
  const styles = {
    standard: {
      bg: "bg-gradient-to-br from-[#faf6eb] via-[#f4ebd9] to-[#e4d6be]",
      border: "border-[#c4b59b]",
      text: "text-[#382d1f]",
      fontHeader: "font-sans uppercase tracking-[0.18em]",
      fontBody: "font-serif",
    },
    cliche: {
      // Classic gritty typewriter / detective agency style
      bg: "bg-gradient-to-br from-[#f2ede0] via-[#e6dcbc] to-[#dcd0ac]",
      border: "border-[#b0a17f]",
      text: "text-[#2a241c]",
      fontHeader: "font-mono uppercase tracking-[0.12em]",
      fontBody: "font-mono tracking-tight", // Monospace fits the typewriter look
    },
    chic: {
      // High-society, elegant, wealthy suspect style
      bg: "bg-gradient-to-br from-[#fcfbfa] via-[#f6f3eb] to-[#ece5d8]",
      border: "border-double border-4 border-[#d4af37]/40", // Elegant double gold border
      text: "text-[#241e17]",
      fontHeader: "font-serif italic tracking-[0.15em]",
      fontBody: "font-serif tracking-wide leading-relaxed",
    },
    handwritten: {
      // Raw, unformatted handwritten note
      bg: "bg-gradient-to-br from-[#f7f2e6] via-[#efe4cd] to-[#e3d3b4]",
      border: "border-[#bca884]",
      text: "text-[#2b2115]",
      fontHeader: "font-sans uppercase tracking-[0.12em]",
      fontBody: `${caveat.className} tracking-[0.01em] leading-relaxed`,
    },
  }[resolvedVariant];

  return (
    <div className="relative w-full h-full select-none">
      {/* Tape on top (only for standard and cliché; chic stationery wouldn't be messily taped) */}
  {resolvedVariant !== "chic" && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-yellow-100/30 backdrop-blur-[0.5px] border-x border-dashed border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rotate-[-1.5deg] z-20 pointer-events-none" />
      )}

      {/* Main Card Container */}
      <div className={`relative w-full h-full ${styles.bg} border ${styles.border} shadow-[1px_2px_6px_rgba(0,0,0,0.15)] rounded-[1px] p-2.5 overflow-hidden flex flex-col justify-between ${styles.text}`}>
        
    {/* --- CLICHÉ EXTRAS --- */}
  {resolvedVariant === "cliche" && (
          <>
            {/* Ink smudge / Coffee stain effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(110,75,40,0.12)_0%,transparent_55%)] pointer-events-none" />
            
            {/* Red "EVIDENCE" or "CONFIDENTIAL" Stamp */}
            <div className="absolute top-2 right-2 border border-red-700/40 text-red-700/40 text-[7px] font-mono font-bold px-1 py-0.5 rounded rotate-[15deg] tracking-widest uppercase pointer-events-none">
              EVIDENCE
            </div>
          </>
        )}

    {/* --- CHIC EXTRAS --- */}
  {resolvedVariant === "chic" && (
          <>
            {/* Soft, clean vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(197,160,89,0.04)_100%)] pointer-events-none" />
            
            {/* Tiny Wax Seal preview in the bottom-right corner */}
            <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-red-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-red-900/40 flex items-center justify-center pointer-events-none rotate-12">
              <div className="w-3 h-3 rounded-full border border-red-700/40 flex items-center justify-center">
                <span className="text-[5px] text-red-100/50 font-serif">M</span>
              </div>
            </div>
          </>
        )}

        {/* --- HANDWRITTEN EXTRAS --- */}
  {resolvedVariant === "handwritten" && (
          <>
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_12px,rgba(30,64,175,0.16)_13px,transparent_14px)]" />
            <div className="absolute top-2 right-2 text-[7px] font-mono text-[#6b4f2a]/70 rotate-[8deg] pointer-events-none">
              personal note
            </div>
          </>
        )}

        {/* Subtle folding creases (used on standard and cliché variants) */}
  {resolvedVariant !== "chic" && resolvedVariant !== "handwritten" && (
          <>
            <div className="absolute top-0 bottom-0 left-[42%] w-[1px] bg-black/[0.03] shadow-[1px_0_1px_rgba(255,255,255,0.2)] pointer-events-none" />
            <div className="absolute left-0 right-0 top-[45%] h-[1px] bg-black/[0.03] shadow-[0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
          </>
        )}

        {/* Content Layout */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            {/* Letterhead */}
            {!letter.hideLetterhead && (
              <p className={`text-[7px] font-semibold text-[#6e5a42] border-b border-[#dfd4be]/60 pb-0.5 truncate ${styles.fontHeader}`}>
                {letter.letterhead || "CORRESPONDENCE"}
              </p>
            )}
            
            {/* Heading */}
            <h4 className={`mt-1.5 text-[9.5px] font-bold uppercase tracking-tight text-[#3d3121] truncate ${resolvedVariant === "cliche" ? "font-mono" : resolvedVariant === "handwritten" ? `${caveat.className} normal-case text-[10px]` : "font-serif"}`}>
              {letter.heading}
            </h4>

            {/* Body */}
            <p className={`mt-1 text-[9px] leading-relaxed line-clamp-3 whitespace-pre-wrap opacity-95 ${styles.fontBody}`}>
              {letter.content}
            </p>
          </div>

          {/* Footer Area */}
          <div className={`mt-2 pt-1 ${letter.hideFooter ? "" : "border-t border-dashed border-[#dfd4be]/60"}`}>
            {showSignature && (
              <p className="text-[8.5px] font-bold italic text-[#4f3f2d] truncate font-serif">
                {letter.sign}
              </p>
            )}
            {!letter.hideFooter && letter.footer && (
              <p className={`mt-0.5 text-[6.5px] text-[#806f57] truncate uppercase tracking-wider ${resolvedVariant === "cliche" ? "font-mono" : "font-sans"}`}>
                {letter.footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}