import { useMemo } from "react";
import { parseBoardingPass } from "@/lib/boarding-pass-utils";

export default function BoardingPassPreview({ content }: { content: string }) {
  const data = useMemo(() => parseBoardingPass(content), [content]);

  // Mathematically clips 4 corners at 45° and bites out the top/bottom stub dividers
  const ticketClipPath =
    "polygon(8px 0%, calc(72% - 6px) 0%, 72% 8px, calc(72% + 6px) 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, calc(72% + 6px) 100%, 72% calc(100% - 8px), calc(72% - 6px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)";

  return (
    // Neutral, compact preview: remove outer padding and use light background for better board cohesion
    <div className="w-full h-full transition-transform duration-150 ease-out cursor-pointer select-none">
      <div
        className="w-full h-full flex bg-white text-slate-900 overflow-hidden relative"
        style={{
          clipPath: ticketClipPath,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)", // subtle inset border
        }}
      >
        {/* Main Ticket Body */}
        <div className="flex-1 p-2 flex flex-col justify-between h-full">
          {/* Top Row: Passenger Info & Tail Number */}
          <div className="flex justify-between items-start">
            <div className="min-w-0 flex-1">
              <span className="block text-[8px] uppercase tracking-widest text-slate-500 font-semibold">
                Passenger
              </span>
              <span className="block text-sm font-semibold text-slate-900 truncate pr-2">
                {data.passengerName || "PASSENGER"}
              </span>
            </div>
            <div>
              <span className="inline-block text-[9px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 tracking-wider">
                {data.flightNumber || data.tailNumber || "PVT-JET"}
              </span>
            </div>
          </div>

          {/* Middle Row: Route */}
          <div className="flex items-center gap-3 my-0">
            <span className="text-sm font-semibold text-slate-800 tracking-tight">
              {data.departure || "DEP"}
            </span>
            <span className="text-slate-400 text-xs">✈</span>
            <span className="text-sm font-semibold text-slate-800 tracking-tight">
              {data.arrival || "ARR"}
            </span>
          </div>

          {/* Bottom Row: Footer metadata */}
          <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            <span>{data.provider || "SINGHANIA ENTERPRISES"}</span>
            <span>
              {data.date
                ? new Date(data.date).toLocaleDateString()
                : "31 Mar 2015"}
            </span>
          </div>
        </div>

        {/* Real physical tear-off dashed line */}
        <div className="h-full border-l border-dashed border-slate-800/80 self-center" />

        {/* Ticket Stub (Right 28%) */}
        <div className="w-[28%] bg-slate-100 h-full flex flex-col justify-between items-center text-center">
          <div>
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-semibold">
              Seat
            </span>
            <span className="text-base font-mono font-bold text-amber-400 tracking-wider">
              {data.seat || "01A"}
            </span>
          </div>

          {/* Simulated Retro Barcode */}
          <div className="flex items-end justify-center gap-[2px] w-full opacity-70 h-5 mt-0.5">
            <div className="bg-slate-300 w-[1px] h-full" />
            <div className="bg-slate-300 w-[2px] h-full" />
            <div className="bg-slate-300 w-[1px] h-full" />
            <div className="bg-slate-300 w-[3px] h-full" />
            <div className="bg-slate-300 w-[1px] h-full" />
            <div className="bg-slate-300 w-[2px] h-full" />
            <div className="bg-slate-300 w-[4px] h-full" />
            <div className="bg-slate-300 w-[1px] h-full" />
          </div>

          <div>
            <span className="block text-[9px] font-mono text-slate-700">
              {data.departTime || "21:30"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
