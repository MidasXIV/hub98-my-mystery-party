"use client";

import React, { useMemo } from "react";

// --- CSS Assets ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

    .receipt-paper-preview {
      background-color: #fcfcfc;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    /* Sawtooth edge mask for "Torn Paper" look */
    .jagged-bottom {
      --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/10px 100%;
      -webkit-mask: var(--mask);
      mask: var(--mask);
    }

    /* Faded Carbon Ink */
    .carbon-ink {
      color: #3b3b58; /* Faded Navy/Purple */
      font-family: 'Courier Prime', monospace;
      text-shadow: 0.1px 0.1px 0.5px rgba(59, 59, 88, 0.3); /* Slight bleed */
    }
  `}</style>
);

function parseReceiptPreview(content: string) {
  try {
    const data = JSON.parse(content);
    return {
      store: data.establishment || "UNKNOWN STORE",
      date: data.date || "Unknown Date",
      total: data.total || "0.00"
    };
  } catch {
    return { store: "RECEIPT", date: "---", total: "--" };
  }
}

export default function ReceiptPreview({ content }: { content: string }) {
  const data = useMemo(() => parseReceiptPreview(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none">
      <PreviewStyles />
      
      {/* The Paper Strip */}
      {/* Added pb-4 to account for the jagged cut */}
      <div className="w-full h-full receipt-paper-preview jagged-bottom p-3 flex flex-col items-center text-center overflow-hidden">
        
        {/* Header */}
        <div className="carbon-ink font-bold text-[10px] uppercase leading-tight mb-2 border-b border-dashed border-gray-400 pb-1 w-full">
          {data.store}
        </div>

        {/* Content Preview */}
        <div className="flex-1 flex flex-col items-center justify-center opacity-80 space-y-1">
          <span className="carbon-ink text-[9px]">{data.date}</span>
          <span className="carbon-ink text-[14px] font-bold tracking-widest mt-1">
            ${data.total}
          </span>
        </div>

        {/* Coffee Stain Visual */}
        <div className="absolute bottom-4 right-[-10px] w-12 h-12 rounded-full border-[3px] border-[#8b5a2b] opacity-20 blur-[1px] mix-blend-multiply pointer-events-none" />

      </div>
    </div>
  );
}