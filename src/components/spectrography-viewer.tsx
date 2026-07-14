import { useMemo } from "react";
import parseSpectrography from "@/lib/spectrography-utils";

export default function SpectrographyViewer({ content }: { content: string }) {
  const data = useMemo(() => parseSpectrography(content), [content]);

  const sortedPeaks = useMemo(() => {
    return [...(data.peaks || [])].sort((a, b) => a.mz - b.mz);
  }, [data.peaks]);

  // Linear interpolation with deterministic wave-fuzz
  const computedWaveform = useMemo(() => {
    const lines = [];
    const totalLines = 220; // Number of vertical pixels/lines in the graph
    if (!sortedPeaks.length) return [];

    const minMz = sortedPeaks[0].mz;
    const maxMz = sortedPeaks[sortedPeaks.length - 1].mz;
    const range = maxMz - minMz;

    for (let i = 0; i < totalLines; i++) {
      const pct = i / (totalLines - 1);
      const targetMz = minMz + pct * range;

      let interpolatedIntensity = 2;

      // Map boundary checks
      if (targetMz <= sortedPeaks[0].mz) {
        interpolatedIntensity = sortedPeaks[0].intensity;
      } else if (targetMz >= sortedPeaks[sortedPeaks.length - 1].mz) {
        interpolatedIntensity = sortedPeaks[sortedPeaks.length - 1].intensity;
      } else {
        // Find bounding peaks
        let left = sortedPeaks[0];
        let right = sortedPeaks[sortedPeaks.length - 1];

        for (let j = 0; j < sortedPeaks.length - 1; j++) {
          if (targetMz >= sortedPeaks[j].mz && targetMz <= sortedPeaks[j + 1].mz) {
            left = sortedPeaks[j];
            right = sortedPeaks[j + 1];
            break;
          }
        }

        // Lerp factor
        const t = (targetMz - left.mz) / (right.mz - left.mz);
        interpolatedIntensity = left.intensity + t * (right.intensity - left.intensity);
      }

      // Add high-frequency visual "fuzz" to match the photo's analog signature
      const fuzz = Math.sin(i * 1.8) * 6;
      const computedWidth = Math.max(1, Math.min(85, (interpolatedIntensity * 0.75) + fuzz));

      lines.push({
        y: pct * 480, // Map to standard visual height
        width: computedWidth,
      });
    }
    return lines;
  }, [sortedPeaks]);

  return (
    <div className="w-[740px] bg-[#fbfbfb] text-slate-900 border border-slate-300 rounded-lg shadow-lg flex p-6 relative overflow-hidden font-sans print:shadow-none">
      
      {/* ================= LEFT PANEL: VERTICAL SOUNDWAVE ================= */}
      <div className="w-[240px] shrink-0 border border-slate-200 bg-slate-50/50 rounded p-2 flex flex-col items-center relative">
        <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-2 font-mono">
          Vocal Print Spectral Analysis
        </div>
        
        {/* Dynamic SVG Waveform Canvas */}
        <svg width="200" height="480" className="bg-white border border-slate-200/80 rounded select-none">
          {/* Vertical Red Axis Line */}
          <line x1="100" y1="0" x2="100" y2="480" stroke="#f43f5e" strokeWidth="1.5" />

          {/* Symmetrical Waveform */}
          {computedWaveform.map((line, idx) => (
            <line
              key={idx}
              x1={100 - line.width}
              y1={line.y}
              x2={100 + line.width}
              y2={line.y}
              stroke="#0f172a"
              strokeWidth="1.2"
              opacity="0.85"
            />
          ))}

          {/* Dynamic Gridlines plotted matching the peak timestamps (mz) */}
          {sortedPeaks.filter((_, idx) => idx % 2 === 0 || idx === sortedPeaks.length - 1).map((peak, index) => {
            if (!sortedPeaks.length) return null;
            const minMz = sortedPeaks[0].mz;
            const maxMz = sortedPeaks[sortedPeaks.length - 1].mz;
            const range = maxMz - minMz;
            const pct = (peak.mz - minMz) / range;
            const yPos = pct * 460 + 10; // Keep bounds padded

            return (
              <g key={index}>
                <line x1="0" y1={yPos} x2="200" y2={yPos} stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
                <text x="160" y={yPos - 4} fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace" opacity="0.9">
                  {peak.mz.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="text-[8px] text-slate-400 mt-2 font-mono">
          SYSTEM REFERENCE: PARABOLIC REC-009
        </div>
      </div>

      {/* ================= RIGHT PANEL: INTERACTIVE CASE DETAILS ================= */}
      <div className="flex-1 pl-6 flex flex-col justify-between">
        
        <div>
          {/* Case Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-4">
            <div>
              <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-bold font-mono leading-none">
                Acoustic Analysis
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1 uppercase tracking-tight">
                Parabolic Microphone Report
              </h3>
            </div>
            <div className="text-right font-mono">
              <div className="bg-slate-900 text-white px-2 py-0.5 text-[9px] font-bold rounded print:bg-black">
                CASE: {data.sampleId || "456-MK-90"}
              </div>
              <div className="text-[9px] text-slate-500 mt-1">
                DATE: {data.analyzedAt ? new Date(data.analyzedAt).toLocaleDateString() : "—"}
              </div>
            </div>
          </div>

          {/* Dynamic Report Content */}
          <div className="text-xs text-slate-700 space-y-3 leading-relaxed text-justify">
            <p>
              This document registers data received via our covert audio post. The listening arrays were routed to capture acoustic vibrations inside target coordinates on the night of the investigation.
            </p>
            <p className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[10px] text-slate-600">
              <strong className="block text-slate-800 text-[9px] uppercase font-bold mb-1">Equipment Details:</strong>
              DEVICE: {data.instrument || "Unspecified Receiver"}<br />
              OPERATOR REF: {data.operator || "Unassigned Analyst"}
            </p>
            
            {data.summary && (
              <p className="border-t border-slate-100 pt-3 italic text-slate-600">
                {data.summary}
              </p>
            )}
          </div>
        </div>

        {/* Analyst Signature Block */}
        <div className="border-t border-slate-200 pt-3 flex justify-between items-end">
          <div className="leading-tight">
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-bold font-mono">
              Lead Officer
            </span>
            <span className="text-xs font-semibold text-slate-800 font-mono">
              {data.operator || "Inspector J. Ishwar"}
            </span>
          </div>

          <div className="text-right">
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-bold font-mono mb-1">
              File Verification
            </span>
            <span className="font-serif italic text-base text-slate-500 border-b border-slate-300 pb-0.5 px-3 block select-none">
              J. Ishwar
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}