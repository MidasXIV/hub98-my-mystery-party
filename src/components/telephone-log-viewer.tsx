"use client";

import React, { useMemo } from "react";
import { parseTelecomLog } from "@/lib/phone-log-utils"; 

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

    .computer-sheet {
      background-color: #ffffff;
      /* The classic Green Bar Pattern: 3 lines white, 3 lines green (approx) */
      background-image: repeating-linear-gradient(
        to bottom,
        #ffffff,
        #ffffff 24px,
        #e3f0e3 24px,
        #e3f0e3 48px
      );
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      font-family: 'VT323', monospace;
      color: #000;
      font-size: 1.1rem;
    }

    .pin-feed-margin {
      width: 24px;
      background-color: #fff;
      border-right: 1px dashed #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px; /* Standard spacing for tractor holes */
      padding-top: 12px;
      user-select: none;
    }
    
    .pin-hole-large {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #222;
      opacity: 0.1;
    }

    .matrix-text {
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .header-box {
      border: 1px dashed #000;
      padding: 1rem;
      background: white; /* Header usually breaks the green bar pattern visually */
    }
  `}</style>
);

export default function TelecomLogViewer({ content }: { content: string }) {
  const data = useMemo(() => parseTelecomLog(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Continuous Feed Paper --- */}
      <div className="relative w-full max-w-[900px] flex shadow-2xl">
        
        {/* Left Strip */}
        <div className="pin-feed-margin">
           {[...Array(30)].map((_, i) => <div key={i} className="pin-hole-large" />)}
        </div>

        {/* Content Area */}
        <div className="flex-1 computer-sheet p-8 min-h-[800px]">
          
          {/* --- Corporate Header --- */}
          <div className="header-box mb-6">
            <div className="flex justify-between items-start border-b border-black pb-2 mb-2">
               <div>
                 <h1 className="text-3xl font-bold">{data.provider}</h1>
                 <p className="text-sm">DATA PROCESSING CENTER • SUBPOENA FULFILLMENT UNIT</p>
               </div>
               <div className="text-right">
                 <div className="text-xl font-bold">CONFIDENTIAL</div>
                 <div className="text-sm">LAW ENFORCEMENT COPY</div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-lg">
               <div>
                  <div className="flex justify-between">
                    <span className="opacity-60">SUBSCRIBER:</span>
                    <span className="font-bold">{data.subscriber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">PHONE NUM:</span>
                    <span className="font-bold">{data.phoneNumber}</span>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between">
                    <span className="opacity-60">BILLING CYCLE:</span>
                    <span>{data.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">REQ ID:</span>
                    <span>{data.caseId}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* --- The Data Grid --- */}
          <table className="w-full text-left matrix-text border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-1">DATE/TIME</th>
                <th className="py-1">TYPE</th>
                <th className="py-1">DESTINATION</th>
                <th className="py-1">LOC/TOWER</th>
                <th className="py-1 text-right">DUR</th>
                <th className="py-1 text-right">COST</th>
              </tr>
            </thead>
            <tbody>
              {data.calls.map((call, i) => (
                <tr key={i} className="hover:bg-black/10 leading-6">
                  <td className="py-0">{call.time}</td>
                  <td className="py-0">
                    <span className={`px-1 ${call.direction === 'INCOMING' ? 'bg-gray-200' : ''}`}>
                      {call.direction === 'INCOMING' ? '<-- IN' : '--> OUT'}
                    </span>
                  </td>
                  <td className="py-0 font-bold tracking-widest">{call.destination}</td>
                  <td className="py-0 opacity-70">{call.tower || "LOCAL"}</td>
                  <td className="py-0 text-right">{call.duration}</td>
                  <td className="py-0 text-right">{call.cost || "0.00"}</td>
                </tr>
              ))}
              
              {/* Filler Rows to show off green bars */}
              {[...Array(5)].map((_, i) => (
                 <tr key={`fill-${i}`} className="leading-6 opacity-20">
                    <td>--/-- --:--</td>
                    <td>---</td>
                    <td>000-000-0000</td>
                    <td>-----</td>
                    <td className="text-right">0:00</td>
                    <td className="text-right">0.00</td>
                 </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="mt-8 border-t border-dashed border-black pt-2 text-center text-sm opacity-60">
             *** END OF RECORD *** SYSTEM GENERATED REPORT *** NO SIGNATURE REQUIRED ***
          </div>

        </div>

        {/* Right Strip */}
        <div className="pin-feed-margin border-r-0 border-l">
           {[...Array(30)].map((_, i) => <div key={i} className="pin-hole-large" />)}
        </div>

      </div>
    </div>
  );
}