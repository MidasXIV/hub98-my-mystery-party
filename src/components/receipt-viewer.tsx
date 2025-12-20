/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

// --- Types ---
interface ReceiptItem {
  qty: number;
  name: string;
  price: string;
}

interface ReceiptData {
  establishment: string;
  address?: string;
  date: string;
  time?: string;
  items: ReceiptItem[];
  total: string;
  paymentMethod?: string;
  note?: string;
}

// --- CSS & Assets ---
const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Share+Tech+Mono&display=swap');

    /* 1. The Paper Strip */
    .receipt-paper {
      background-color: #fdfdfd;
      /* Noise + Subtle linear gradient to simulate a roll curl */
      background-image: 
        linear-gradient(to right, rgba(0,0,0,0.02), rgba(255,255,255,0.5) 20%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.01)),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    /* 2. The Torn Edges (Top and Bottom) */
    .jagged-y {
      --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/10px 100%;
      -webkit-mask: var(--mask);
      mask: var(--mask);
    }

    /* 3. The Carbon Ink (Purple/Blue Tint) */
    .ink-carbon {
      font-family: 'Share Tech Mono', 'Courier Prime', monospace;
      color: #2e2e4e; /* Deep Carbon Blue */
      text-shadow: 0px 0px 1px rgba(46, 46, 78, 0.4); /* Ink Bleed */
      text-transform: uppercase;
    }

    /* 4. Crinkle Effects */
    .crinkle-line {
      position: absolute;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.05), transparent);
      width: 100%;
      height: 2px;
      transform: rotate(1deg);
      pointer-events: none;
    }
  `}</style>
);

// --- Parsing Logic ---
function parseReceiptData(content: string): ReceiptData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { items: [] };
  }

  return {
    establishment: json.establishment || "UNKNOWN VENDOR",
    address: json.address || "",
    date: json.date || "UNKNOWN DATE",
    time: json.time || "",
    items: Array.isArray(json.items) ? json.items : [],
    total: json.total || "0.00",
    paymentMethod: json.paymentMethod || "CASH",
    note: json.note || ""
  };
}

export default function ReceiptViewer({ content }: { content: string }) {
  const data = useMemo(() => parseReceiptData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Main Receipt Container --- */}
      {/* Max width is narrow (320px) to mimic a real paper strip */}
      <div className="relative w-full max-w-[340px] jagged-y receipt-paper p-6 pb-12 flex flex-col items-center shadow-2xl">
        
        {/* --- Header --- */}
        <div className="text-center mb-6 w-full">
          <h2 className="ink-carbon text-2xl font-bold tracking-widest mb-1">
            {data.establishment}
          </h2>
          {data.address && (
            <p className="ink-carbon text-xs opacity-70 mb-2">
              {data.address}
            </p>
          )}
          <div className="w-full border-b border-dashed border-[#2e2e4e]/40 my-2" />
          <div className="flex justify-between w-full px-2">
            <span className="ink-carbon text-xs">{data.date}</span>
            <span className="ink-carbon text-xs">{data.time}</span>
          </div>
          <div className="w-full border-b border-dashed border-[#2e2e4e]/40 my-2" />
        </div>

        {/* --- Item List --- */}
        <div className="w-full mb-6 px-1">
          {data.items.length > 0 ? (
            data.items.map((item, i) => (
              <div key={i} className="flex justify-between items-end mb-2 text-sm leading-none">
                <div className="ink-carbon flex-1 pr-2">
                  <span className="mr-2 text-xs opacity-70">{item.qty}</span>
                  <span>{item.name}</span>
                </div>
                <div className="ink-carbon font-bold">
                  {item.price}
                </div>
              </div>
            ))
          ) : (
            <div className="ink-carbon text-center italic text-xs opacity-50">
              (Item list illegible)
            </div>
          )}
        </div>

        {/* --- Totals --- */}
        <div className="w-full border-t-[2px] border-[#2e2e4e]/60 pt-2 mb-8 px-1">
          <div className="flex justify-between items-center text-lg">
            <span className="ink-carbon font-bold">TOTAL</span>
            <span className="ink-carbon font-black text-xl">${data.total}</span>
          </div>
          <div className="flex justify-between items-center text-xs mt-1 opacity-80">
            <span className="ink-carbon">PAID VIA:</span>
            <span className="ink-carbon">{data.paymentMethod}</span>
          </div>
        </div>

        {/* --- Footer Note --- */}
        <div className="text-center opacity-60">
           <p className="ink-carbon text-[10px] uppercase tracking-wide">
             Thank You For Your Business
           </p>
           <p className="ink-carbon text-[9px] mt-1">
             RCPT #{Math.floor(Math.random() * 999999)}
           </p>
           {data.note && (
             <div className="mt-4 font-['Courier_Prime'] text-xs border border-[#2e2e4e]/30 p-1 rotate-1">
               {data.note}
             </div>
           )}
        </div>

        {/* --- Visual Artifacts --- */}
        
        {/* Coffee Stain */}
        <div className="absolute top-[30%] left-[-10px] w-20 h-20 rounded-full border-[6px] border-[#6f4e37] opacity-10 blur-[2px] pointer-events-none mix-blend-multiply" />
        
        {/* Crinkle Lines (Overlay) */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-black/5 rotate-1 pointer-events-none" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black/5 rotate-[-1deg] pointer-events-none" />

      </div>
    </div>
  );
}