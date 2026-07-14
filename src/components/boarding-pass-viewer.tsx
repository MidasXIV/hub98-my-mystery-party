import { useMemo } from "react";
import { parseBoardingPass } from "@/lib/boarding-pass-utils";

export default function BoardingPassViewer({ content }: { content: string }) {
  const data = useMemo(() => parseBoardingPass(content), [content]);

  return (
    <div className="w-[720px] h-[310px] bg-white border border-slate-300 text-slate-900 rounded-md shadow-md relative overflow-hidden font-sans ticket-full-paper print:max-w-[720px] print:shadow-none print:border-slate-400">
      
      {/* Perforation Fold Notches on Top and Bottom Edges */}
      <div className="absolute top-0 right-[220px] w-3 h-1.5 bg-slate-300 rounded-b-full z-20 border-x border-b border-slate-400/30 print:border-slate-400" />
      <div className="absolute bottom-0 right-[220px] w-3 h-1.5 bg-slate-300 rounded-t-full z-20 border-x border-t border-slate-400/30 print:border-slate-400" />

      {/* Two-column boarding pass: left main + right stub */}
      <div className="flex h-full">
        
        {/* ================= LEFT MAIN PANEL ================= */}
        <div className="w-[500px] flex flex-col justify-between relative pb-4">
          
          {/* Top Carrier Stripe */}
          <div className="bg-slate-900 text-white px-6 py-2 flex justify-between items-center print:bg-black">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">
                Singhania Enterprises
              </span>
              <span className="text-[8px] opacity-65 tracking-wider">• Private Aviation</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest font-bold text-amber-400 uppercase">
              {data.type || "BOARDING PASS"}
            </div>
          </div>

          <div className="px-6 pt-3 flex-1 flex flex-col justify-between">
            {/* Row 1: Passenger Name & Class details */}
            <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-2">
              <div className="col-span-2">
                <span className="block text-[8px] uppercase font-mono text-slate-500">Passenger Name</span>
                <span className="block text-base font-bold text-slate-950 truncate leading-tight">
                  {data.passengerName ? data.passengerName.toUpperCase() : "PASSENGER UNKNOWN"}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] uppercase font-mono text-slate-500">Class / Cabin</span>
                <span className="block text-xs font-mono font-bold text-slate-800">
                  {data.class ? data.class.toUpperCase() : "FIRST CLASS"}
                </span>
              </div>
            </div>

            {/* Row 2: Route Details (From -> To) with visual arrow */}
            <div className="grid grid-cols-12 items-center gap-2 py-2 border-b border-slate-200">
              <div className="col-span-5">
                <span className="block text-[8px] uppercase font-mono text-slate-500">Departure Airport (From)</span>
                <span className="block text-sm font-bold text-slate-950 truncate leading-tight">
                  {data.departure ? data.departure.toUpperCase() : "—"}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                  {data.departTime ? `STD: ${data.departTime}` : "DEP: —"}
                </span>
              </div>
              
              <div className="col-span-2 text-center flex items-center justify-center">
                <span className="text-slate-400 text-xs font-mono select-none">▶</span>
              </div>

              <div className="col-span-5 text-right">
                <span className="block text-[8px] uppercase font-mono text-slate-500">Destination Airport (To)</span>
                <span className="block text-sm font-bold text-slate-950 truncate leading-tight">
                  {data.arrival ? data.arrival.toUpperCase() : "—"}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                  {data.arriveTime ? `STA: ${data.arriveTime}` : "ARR: —"}
                </span>
              </div>
            </div>

            {/* Row 3: Boarding logistics boxes */}
            <div className="grid grid-cols-4 gap-2 text-center py-2 border-b border-slate-200 bg-slate-50/50">
              <div className="border-r border-slate-200">
                <span className="block text-[7px] uppercase font-mono text-slate-500">Gate</span>
                <span className="block text-sm font-bold text-slate-950">{data.gate || "01"}</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="block text-[7px] uppercase font-mono text-slate-500">Boarding Group</span>
                <span className="block text-sm font-bold text-slate-950">{data.boardingGroup || data.boarding || "A"}</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="block text-[7px] uppercase font-mono text-slate-500">Seat Assignment</span>
                <span className="block text-sm font-mono font-bold text-amber-500 print:text-black">{data.seat || "—"}</span>
              </div>
              <div>
                <span className="block text-[7px] uppercase font-mono text-slate-500">Carrier / Flight</span>
                <span className="block text-sm font-mono font-bold text-slate-950">
                  {data.flightNumber || data.tailNumber || "—"}
                </span>
              </div>
            </div>

            {/* Faux Notes / Security Stamp area */}
            {/* Notes removed for authenticity; do not display special instructions */}

            <div className="mt-2 flex justify-end items-center text-[8px] text-slate-400 font-mono">
              <div>REF: {data.bookingRef || data.ticketNumber || "TKT-000"}</div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="px-6 pt-2 flex justify-between items-center text-[8px] text-slate-400 font-mono">
            <span>PRINT DATE: {data.date ? new Date(data.date).toLocaleDateString() : "31 MAR 2015"}</span>
            <span>CASE REF: {data.caseRef || "456-MK-90"}</span>
          </div>
        </div>

        {/* ================= PERFORATION / STUB ================= */}
        <div className="w-[220px] border-l border-dashed border-slate-300 p-4 flex flex-col justify-between bg-slate-50/70 h-full relative">
          
          <div>
            {/* Top Stub Header Strip */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <div className="text-[9px] uppercase font-mono font-bold text-slate-900 leading-none">
                  PASSENGER COPY
                </div>
                <div className="text-[7px] font-mono text-slate-400 mt-1">
                  SINGHANIA AVIATION
                </div>
              </div>
              <div className="text-[14px] font-mono font-bold text-amber-500 print:text-black leading-none">
                {data.seat || "—"}
              </div>
            </div>

            {/* Stub Passenger Details */}
            <div className="mt-3">
              <span className="block text-[7px] uppercase font-mono text-slate-500">Name</span>
              <span className="block text-xs font-bold text-slate-950 truncate">
                {data.passengerName ? data.passengerName.toUpperCase() : "PASSENGER UNKNOWN"}
              </span>
            </div>

            {/* Stub Flight Details */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[7px] uppercase font-mono text-slate-500">Flight</span>
                <span className="block text-[11px] font-mono font-bold text-slate-800">
                  {data.flightNumber || data.tailNumber || "—"}
                </span>
              </div>
              <div>
                <span className="block text-[7px] uppercase font-mono text-slate-500">Date</span>
                <span className="block text-[11px] font-mono font-bold text-slate-800">
                  {data.date ? new Date(data.date).toLocaleDateString() : "31/03/2015"}
                </span>
              </div>
            </div>

            {/* Stub Route Details */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[7px] uppercase font-mono text-slate-500">From</span>
                <span className="block text-xs font-semibold text-slate-800 truncate">
                  {data.departure ? data.departure.toUpperCase().split(" ")[0] : "—"}
                </span>
              </div>
              <div>
                <span className="block text-[7px] uppercase font-mono text-slate-500">To</span>
                <span className="block text-xs font-semibold text-slate-800 truncate">
                  {data.arrival ? data.arrival.toUpperCase().split(" ")[0] : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Prominent High-Contrast Barcode */}
          <div className="mt-2">
            <div className="flex items-end justify-center gap-[2px] h-11 select-none">
              <div className="bg-slate-950 w-[2px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[4px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[1px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[5px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[2px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[1px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[3px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[6px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[2px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[4px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[1px] h-full print:bg-black" />
              <div className="bg-slate-950 w-[3px] h-full print:bg-black" />
            </div>
            <div className="text-[8px] text-slate-500 text-center mt-1.5 font-mono">
              {data.ticketNumber || "TKT-000000"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}