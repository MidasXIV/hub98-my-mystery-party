"use client";

import React, { useMemo } from "react";
import { parseBrochureContent } from "@/lib/brochure-utils";

const PreviewStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Instrument+Sans:wght@400;500;600&display=swap");

    .brochure-stock {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.72), rgba(240,231,215,0.96)),
        linear-gradient(135deg, #1d4d46 0%, #2e6f66 52%, #ceb47c 100%);
      box-shadow:
        0 10px 24px rgba(0, 0, 0, 0.28),
        inset 0 0 0 1px rgba(255, 255, 255, 0.3);
    }

    .brochure-stock::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      opacity: 0.8;
      mix-blend-mode: multiply;
      pointer-events: none;
    }
  `}</style>
);

export default function BrochurePreview({ content }: { content: string }) {
  const brochure = useMemo(() => parseBrochureContent(content), [content]);

  return (
    <div className="relative w-full h-full select-none">
      <PreviewStyles />

      <div className="absolute inset-y-[4%] right-[-5%] w-[90%] rounded-[18px] bg-[#e8dcc6] shadow-[0_12px_20px_rgba(0,0,0,0.18)] rotate-[5deg]" />

      <div className="brochure-stock relative w-full h-full rounded-[18px] overflow-hidden border border-black/10 px-3 py-4 flex flex-col">
        <div className="relative rounded-[14px] border border-white/50 bg-black/12 px-3 py-1 text-white overflow-hidden">
          <div className="text-[8px] uppercase tracking-[0.3em] font-['Instrument_Sans'] opacity-80 font-bold">
            {brochure.front.eyebrow}
          </div>
          <div className="mt-2 font-['Cormorant_Garamond'] text-[8px] leading-[0.9] font-semibold text-balance">
            {brochure.front.headline}
          </div>
          <div className="mt-2 text-[10px] leading-tight font-['Instrument_Sans'] text-white/85 line-clamp-2">
            {brochure.front.subheadline || brochure.location}
          </div>
        </div>

        <div className="mt-3 flex-1 rounded-[14px] bg-[#f5efe3]/88 px-3 py-3 text-[#21302d] border border-black/8 flex flex-col">
          <div className="text-[8px] uppercase tracking-[0.24em] font-semibold text-[#5b5a4f]">
            {brochure.location}
          </div>
          <div className="mt-2 text-[6px] leading-[1.35] line-clamp-8 font-['Instrument_Sans']">
            {brochure.front.body}
          </div>
        </div>
      </div>
    </div>
  );
}