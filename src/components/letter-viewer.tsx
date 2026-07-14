"use client";

import React, { useMemo } from "react";
import { Caveat } from "next/font/google";
import { parseLetterData } from "@/lib/letter-utils";

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function LetterViewer({ content }: { content: string }) {
  const letter = useMemo(() => parseLetterData(content), [content]);
  const isHandwritten = letter.variant === "handwritten";
  const showSignature = Boolean(letter.sign) && !isHandwritten;

  return (
    <div className="w-full min-h-screen bg-[#0b0a09] py-12 px-4 flex justify-center items-start overflow-y-auto print:bg-white print:p-0">
      
      {/* 
        Procedural 3D SVG Paper Filter
        Uses Fractal Noise passed through a Diffuse Lighting map to generate realistic 
        recycled cotton-rag paper bumps, shadows, and fibers on-the-fly.
      */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none" aria-hidden="true">
        <defs>
          <filter id="real-paper-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.04" 
              numOctaves="4" 
              result="noise" 
            />
            <feDiffuseLighting 
              in="noise" 
              lighting-color="#fdf9f0" 
              surfaceScale="1.4" 
              result="light"
            >
              <feDistantLight azimuth="55" elevation="65" />
            </feDiffuseLighting>
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.96" />
              <feFuncG type="linear" slope="0.94" />
              <feFuncB type="linear" slope="0.89" />
            </feComponentTransfer>
            <feBlend mode="multiply" in="SourceGraphic" result="blend" />
          </filter>
        </defs>
      </svg>

      {/* Print Configuration style block to preserve textures on physical print */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: #ffffff !important;
          }
          .print-paper {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 20mm !important;
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            filter: url(#real-paper-texture) !important;
            background: #fdf9f0 !important;
          }
        }
      `}} />

      {/* 
        A4 Document Container
        - Fits exact A4 ratios (210mm x 297mm equivalent).
        - Applies the SVG filter overlay.
        - Deploys heavy physical drop-shadow layers & aged edge burn.
      */}
      <article 
        className="print-paper relative w-full max-w-[794px] min-h-[1123px] p-12 sm:p-20 text-[#241a0e] flex flex-col justify-between"
        style={{
          filter: "url(#real-paper-texture)",
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.8),
            0 2px 6px rgba(0, 0, 0, 0.45),
            inset 0 0 50px rgba(120, 75, 30, 0.16)
          `,
          backgroundImage: isHandwritten
            ? `
              repeating-linear-gradient(to bottom, rgba(51,102,204,0.12) 0px, rgba(51,102,204,0.12) 1px, transparent 1px, transparent 34px),
              radial-gradient(circle at 75% 25%, rgba(139, 90, 43, 0.05) 0%, transparent 60%),
              radial-gradient(circle at 15% 80%, rgba(139, 90, 43, 0.07) 0%, transparent 55%),
              linear-gradient(to bottom, #f8f3e7, #efe3c9)
            `
            : `
              radial-gradient(circle at 75% 25%, rgba(139, 90, 43, 0.05) 0%, transparent 60%),
              radial-gradient(circle at 15% 80%, rgba(139, 90, 43, 0.07) 0%, transparent 55%),
              linear-gradient(to bottom, #fcfaf5, #f3e8cf)
            `
        }}
      >
        {/* Subtle, natural folding/crease lines */}
        <div className="absolute top-[33.3%] left-0 right-0 h-[1.5px] bg-black/[0.04] shadow-[0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
        <div className="absolute top-[66.6%] left-0 right-0 h-[1.5px] bg-black/[0.04] shadow-[0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />

        {/* 
          Ink-To-Paper Fusion Layer 
          - mix-blend-multiply causes text to merge under the 3D shadow peaks of the paper.
        */}
        <div className="relative z-10 flex-1 flex flex-col justify-between mix-blend-multiply">
          
          <div>
            {/* Header */}
            {!letter.hideLetterhead && (
              <header className="border-b-2 border-[#241a0e]/20 pb-6 mb-8">
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-bold text-[#56452f]">
                  {letter.letterhead}
                </p>
                <h1 className={`mt-4 text-2xl sm:text-3xl font-bold tracking-tight leading-snug ${isHandwritten ? `${caveat.className} normal-case` : "font-serif"} text-[#160f06]`}>
                  {letter.heading}
                </h1>
              </header>
            )}

            {letter.hideLetterhead && (
              <h1 className={`mb-8 text-2xl sm:text-3xl font-bold tracking-tight leading-snug ${isHandwritten ? `${caveat.className} normal-case` : "font-serif"} text-[#160f06]`}>
                {letter.heading}
              </h1>
            )}

            {/* Content & Micro-Bleed styling */}
            <section 
              className={`min-h-[500px] whitespace-pre-wrap ${isHandwritten ? `leading-9 text-[17px] sm:text-[19px] ${caveat.className} tracking-[0.01em]` : "leading-8 text-[15px] sm:text-[17px] font-serif tracking-wide"} text-[#241a0e]`}
              style={{
                // Tiny text shadow softens vector rendering to simulate paper wicking ink liquid
                textShadow: "0.2px 0.2px 0.4px rgba(36, 26, 14, 0.3)" 
              }}
            >
              {letter.content}
            </section>
          </div>

          {/* Footer & Signature */}
          <footer className={`mt-12 ${letter.hideFooter ? "" : "border-t-2 border-[#241a0e]/15 pt-6"} flex flex-col gap-5`}>
            {showSignature && (
              <p 
                className={`${caveat.className} text-3xl sm:text-4xl italic text-[#1c2538] opacity-95`} 
                style={{
                  // Softens fountain pen edges differently than type ink
                  textShadow: "0.3px 0.3px 0.6px rgba(28, 37, 56, 0.4)" 
                }}
              >
                {letter.sign}
              </p>
            )}
            
            {!letter.hideFooter && letter.footer && (
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#614e35] font-mono">
                {letter.footer}
              </p>
            )}
          </footer>
        </div>
      </article>
    </div>
  );
}