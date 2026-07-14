import { useMemo } from "react";
import parseSpectrography from "@/lib/spectrography-utils";

export default function SpectrographyPreview({ content }: { content: string }) {
  const data = useMemo(() => parseSpectrography(content), [content]);

  // Procedural thumbnail generation based directly on the peak data
  const miniBars = useMemo(() => {
    const peaks = data.peaks || [];
    if (!peaks.length) return [];
    
    // Generate 12 miniature symmetrical lines for the preview panel
    return Array.from({ length: 12 }).map((_, i) => {
      const pct = i / 11;
      const index = Math.floor(pct * (peaks.length - 1));
      const val = peaks[index]?.intensity || 2;
      return {
        h: Math.max(1, Math.min(24, val * 0.25 + Math.sin(i * 1.5) * 4)),
        key: i,
      };
    });
  }, [data.peaks]);

  // Distinct retro-dossier notch cutouts
  const miniClipPath = "polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)";

  return (
    <div className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none">
      <div 
        className="w-full h-full flex bg-[#fafafa] text-slate-900 border border-slate-300 p-2.5 relative flex-col justify-between"
        style={{ clipPath: miniClipPath }}
      >
        <div className="leading-tight">
          <span className="block text-[7px] uppercase font-mono text-slate-400 font-bold tracking-wider">
            Spectrography
          </span>
          <span className="block text-xs font-extrabold text-slate-950 truncate max-w-[120px] mt-0.5">
            {data.sampleId || "SPEC-UNKNOWN"}
          </span>
          <span className="block text-[8px] text-slate-500 font-mono truncate max-w-[120px]">
            {data.instrument || "RECOVERY DEPT"}
          </span>
        </div>

        {/* Miniature Symmetrical Soundwave Silhouette */}
        <div className="flex items-center justify-center w-full h-12 relative bg-slate-900/5 rounded border border-slate-200/50 overflow-hidden">
          {/* Vertical Red Axis Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-500/80" />
          
          <div className="flex flex-col gap-[2px] w-full items-center justify-between h-full py-1">
            {miniBars.map((bar) => (
              <div
                key={bar.key}
                style={{ width: `${bar.h * 2}px` }}
                className="h-[1.5px] bg-slate-900 opacity-80"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}