"use client";

import React, { useMemo } from "react";
import { parseBankData } from "@/lib/bank-statement-utils";

const PreviewStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Special+Elite&display=swap");

    /* 1. "Safety Paper" Texture (Classic Blue/Grey Financial Look) */
    .bank-security-paper {
      background-color: #f0f4f8; /* Pale Safety Blue */
      /* Creates a subtle cross-hatch / security pattern */
      background-image:
        repeating-linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.02) 0px,
          rgba(0, 0, 0, 0.02) 1px,
          transparent 1px,
          transparent 4px
        ),
        repeating-linear-gradient(
          -45deg,
          rgba(0, 0, 0, 0.02) 0px,
          rgba(0, 0, 0, 0.02) 1px,
          transparent 1px,
          transparent 4px
        );
      border-top: 4px solid #2c3e50; /* Strong top header bar */
    }

    /* 2. Fonts */
    .font-bank-header {
      font-family: "Special Elite", serif;
      letter-spacing: 1px;
    }
    .font-data-mono {
      font-family: "Courier Prime", monospace;
      color: #1e293b;
    }
    .font-label-small {
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* 3. The "Window" Box */
    .address-window {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    }
  `}</style>
);

export default function BankStatementPreview({ content }: { content: string }) {
  const data = useMemo(() => parseBankData(content), [content]);

  return (
    <div className="w-full h-full relative group cursor-pointer select-none">
      <PreviewStyles />

      {/* Container */}
      <div className="w-full h-full bank-security-paper flex flex-col p-3 relative overflow-hidden rounded-sm">
        {/* --- Top Header --- */}
        <div className="flex items-center justify-between mb-3 border-b border-slate-300 pb-2">
          <div className="flex items-center gap-2">
            {/* Simple Logo Icon */}
            <div className="w-5 h-5 bg-[#2c3e50] text-white flex items-center justify-center rounded-sm font-data-mono font-bold text-[10px]">
              $
            </div>
            <div className="font-bank-header text-[9px] text-[#2c3e50] font-bold leading-tight uppercase">
              {data.bankName}
            </div>
          </div>
          <div className="text-[11px] font-label-small text-slate-700 tracking-widest leading-none font-bold font-['Special_Elite']">
            Bank Statement
          </div>
        </div>

        {/* --- Main Content: Name & Period --- */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Account Holder (The most important part) */}
          <div>
            <div className="font-label-small text-[7px] text-slate-500 mb-0.5">
              Account Holder
            </div>
            <div className="address-window">
              <div className="font-data-mono text-[11px] font-bold text-slate-900 leading-tight truncate">
                {data.accountHolder}
              </div>
              <div className="font-data-mono text-[8px] text-slate-600 mt-0.5">
                Acct: {data.accountNumber}
              </div>
            </div>
          </div>

          {/* Statement Period */}
          <div className="mt-auto">
            <div className="font-label-small text-[7px] text-slate-500 mb-0.5">
              Statement Period
            </div>
            <div className="font-data-mono text-[9px] bg-slate-200/50 px-1 py-0.5 border-l-2 border-slate-400">
              {data.period}
            </div>
          </div>
        </div>

        {/* --- Footer Balance (Visual cue) --- */}
        <div className="mt-3 pt-2 border-t border-slate-300 flex justify-between items-end">
          <span className="font-label-small text-[7px] text-slate-400">
            End Balance
          </span>
          <span className="font-data-mono text-[10px] font-bold text-[#2c3e50]">
            ${data.endBalance}
          </span>
        </div>

        {/* Visual Artifact: "PAID" or "FILED" stamp look */}
        <div className="absolute top-10 right-[-10px] w-16 h-16 opacity-[0.03] pointer-events-none rotate-12">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="black"
              strokeWidth="5"
              fill="none"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
            >
              BANK
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
