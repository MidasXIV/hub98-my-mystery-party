"use client";

import React, { useMemo } from "react";
import {
  BrochureData,
  BrochureSide,
  parseBrochureContent,
} from "@/lib/brochure-utils";

const ViewerStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap");

    .brochure-card {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.88), rgba(245,238,226,0.98)),
        #f6efdf;
      box-shadow:
        0 18px 34px rgba(0, 0, 0, 0.28),
        inset 0 0 0 1px rgba(80, 64, 39, 0.08);
    }

    .brochure-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 424' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.07'/%3E%3C/svg%3E");
      pointer-events: none;
      mix-blend-mode: multiply;
    }

  `}</style>
);

function BrochureFace({
  brochure,
  side,
  faceLabel,
  accentClass,
}: {
  brochure: BrochureData;
  side: BrochureSide;
  faceLabel: string;
  accentClass: string;
}) {
  return (
    <article className="relative brochure-card w-full max-w-[148mm] aspect-[148/210] rounded-[22px] overflow-hidden border border-black/10 text-[#1d2826]">
      <div className={`relative h-[35%] px-6 py-5 text-white ${accentClass}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-['Instrument_Sans'] text-[10px] uppercase tracking-[0.28em] text-white/80">
              {side.eyebrow}
            </p>
            <h2 className="mt-2 font-['Cormorant_Garamond'] text-[38px] leading-[0.9] font-semibold text-balance">
              {side.headline}
            </h2>
          </div>
          <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold">
            {faceLabel}
          </span>
        </div>

        <p className="mt-3 max-w-[85%] font-['Instrument_Sans'] text-[12px] leading-[1.45] text-white/88">
          {side.subheadline || brochure.location}
        </p>

        <div className="absolute inset-x-6 bottom-4 h-px bg-white/30" />
      </div>

      <div className="relative h-[65%] px-6 py-5 flex flex-col">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#6e604a] font-['Instrument_Sans'] font-semibold">
          <span>{brochure.location}</span>
          <span>{brochure.edition}</span>
        </div>

        <div className="mt-4 whitespace-pre-wrap font-['Instrument_Sans'] text-[13px] leading-[1.5] text-[#2b2822]">
          {side.body}
        </div>

        {side.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 font-['Instrument_Sans'] text-[12px] leading-[1.45] text-[#3f3b35]">
            {side.bullets.map((bullet, index) => (
              <li key={`${faceLabel}-${index}`} className="flex gap-2">
                <span className="mt-[2px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b6b3f]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-[#ccbda0] text-[10px] uppercase tracking-[0.2em] text-[#786a54] font-['Instrument_Sans'] font-semibold">
          <span>{side.footer || brochure.stamp}</span>
          <span>{brochure.stamp}</span>
        </div>
      </div>
    </article>
  );
}

export default function BrochureViewer({ content }: { content: string }) {
  const brochure = useMemo(() => parseBrochureContent(content), [content]);

  return (
    <div className="w-full flex justify-center px-2 py-2 md:px-6 md:py-4">
      <ViewerStyles />

      <div className="w-full max-w-[980px] grid gap-5 md:grid-cols-2 justify-items-center">
        <BrochureFace
          brochure={brochure}
          side={brochure.front}
          faceLabel="Front"
          accentClass="bg-[linear-gradient(135deg,#1d4d46_0%,#2d7369_55%,#d1b06e_100%)]"
        />
        <BrochureFace
          brochure={brochure}
          side={brochure.back}
          faceLabel="Back"
          accentClass="bg-[linear-gradient(135deg,#5b3a28_0%,#885841_52%,#d3b07a_100%)]"
        />
      </div>
    </div>
  );
}

function BrochurePrintFace({
  brochure,
  side,
  faceLabel,
  accentClass,
}: {
  brochure: BrochureData;
  side: BrochureSide;
  faceLabel: string;
  accentClass: string;
}) {
  return (
    <div className="cutout-sheet-a5">
      <p className="cutout-heading-a5">Brochure Trim Sheet</p>
      <p className="cutout-subheading-a5">
        Print on A4 and cut away the excess. Final brochure size must be A5 only.
      </p>

      <div className="cutout-zone-a5">
        <div className="cutout-frame-a5">
          <span className="cutout-corner-a5 tl" />
          <span className="cutout-corner-a5 tr" />
          <span className="cutout-corner-a5 bl" />
          <span className="cutout-corner-a5 br" />

          <div className="cutout-content-a5">
            <BrochureFace
              brochure={brochure}
              side={side}
              faceLabel={faceLabel}
              accentClass={accentClass}
            />
          </div>
        </div>
      </div>

      <p className="cutout-tip-a5">
        Cut off all extras outside the dashed trim frame. Keep only the 148 mm by 210 mm brochure.
      </p>
    </div>
  );
}

export function BrochurePrintViewer({ content }: { content: string }) {
  const brochure = useMemo(() => parseBrochureContent(content), [content]);

  return (
    <div className="w-full flex flex-col items-center">
      <ViewerStyles />

      <BrochurePrintFace
        brochure={brochure}
        side={brochure.front}
        faceLabel="Front"
        accentClass="bg-[linear-gradient(135deg,#1d4d46_0%,#2d7369_55%,#d1b06e_100%)]"
      />
      <div className="break-after-page" />
      <BrochurePrintFace
        brochure={brochure}
        side={brochure.back}
        faceLabel="Back"
        accentClass="bg-[linear-gradient(135deg,#5b3a28_0%,#885841_52%,#d3b07a_100%)]"
      />
    </div>
  );
}