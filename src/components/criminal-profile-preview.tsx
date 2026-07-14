"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { parseCriminalProfileData } from "@/lib/criminal-profile-utils";

const PreviewStyles = () => (
  <style jsx global>{`
    .cp-preview-paper {
      background: #efe2cc;
      background-image: radial-gradient(rgba(0, 0, 0, 0.07) 0.45px, transparent 0.45px);
      background-size: 4px 4px;
    }

    .cp-preview-stamp {
      border: 2px solid #7f1d1d;
      color: #7f1d1d;
      font-size: 10px;
      letter-spacing: 0.12em;
      font-weight: 800;
      transform: rotate(-9deg);
      mix-blend-mode: multiply;
      opacity: 0.85;
    }
  `}</style>
);

export default function CriminalProfilePreview({ content }: { content: string }) {
  const data = useMemo(() => parseCriminalProfileData(content), [content]);

  return (
    <div className="w-full h-full">
      <PreviewStyles />
      <div className="cp-preview-paper relative w-full h-full border border-[#7d664a] shadow-md overflow-hidden rounded-sm">
        <div className="absolute top-1.5 left-2 text-[9px] uppercase tracking-widest text-[#5b4631] font-mono">
          Criminal Profile • {data.profileId}
        </div>

        <div className="absolute inset-x-3 top-6 bottom-12 bg-[#f8f6f2] border border-[#bba790] p-1.5">
          <div className="relative w-full h-full border border-black/30 overflow-hidden">
            <Image
              src={data.imageUrl}
              alt={data.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              draggable={false}
            />
          </div>
          <div className="absolute bottom-2 right-2 cp-preview-stamp px-2 py-0.5 bg-[#f8f6f2]/90">
            PROFILE
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2 bg-[#fffdf8] border border-[#9d8668] px-2 py-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#1e1b16] truncate">
            {data.name}
          </p>
          <p className="text-[9px] text-[#5b4631] uppercase tracking-wide truncate">
            Alias: {data.alias}
          </p>
        </div>
      </div>
    </div>
  );
}
