"use client";

import React, { useMemo } from "react";
import { parseBankData } from "@/lib/bank-statement-utils";

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inconsolata:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

    .statement-sheet {
      background-color: #fffefc; /* Ivory/Cream */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
      color: #111;
    }

    .font-serif { font-family: 'Lora', serif; }
    .font-bank { font-family: 'Cinzel', serif; }
    .font-num { font-family: 'Inconsolata', monospace; }

    .ledger-row:nth-child(even) {
      background-color: #f9f9f7;
    }
    .ledger-cell {
      padding: 0.5rem;
      border-right: 1px solid #e5e7eb;
    }
    .ledger-cell:last-child { border-right: none; }
  `}</style>
);

export default function BankStatementViewer({ content }: { content: string }) {
  const data = useMemo(() => parseBankData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Legal Paper Container --- */}
      <div className="relative w-full max-w-[850px] min-h-[1100px] statement-sheet p-10 md:p-14 flex flex-col">
        
        {/* --- 1. HEADER --- */}
        <header className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center bg-black text-white">
                 <span className="font-bank text-4xl mt-1">$</span>
              </div>
              <div>
                 <h1 className="font-bank text-2xl md:text-3xl font-bold uppercase tracking-widest">
                   {data.bankName}
                 </h1>
                 <p className="font-serif text-xs uppercase tracking-wide opacity-60">
                   Member F.D.I.C. • Established 1892
                 </p>
              </div>
           </div>
           
           <div className="text-right font-serif text-sm">
              <div className="font-bold">STATEMENT PERIOD</div>
              <div>{data.period}</div>
              <div className="mt-2 font-bold">PAGE</div>
              <div>1 of 1</div>
           </div>
        </header>

        {/* --- 2. ACCOUNT INFO & SUMMARY --- */}
        <section className="flex flex-col md:flex-row gap-8 mb-8">
           
           {/* Address Block */}
           <div className="flex-1 border p-4 font-num text-sm leading-relaxed uppercase bg-white shadow-sm">
              <div className="font-bold border-b border-gray-200 pb-1 mb-2 text-xs text-gray-500">
                Account Holder
              </div>
              <div>{data.accountHolder}</div>
              <div className="opacity-70 whitespace-pre-wrap">{data.address}</div>
           </div>

           {/* Summary Block */}
           <div className="w-full md:w-1/2 bg-gray-100 p-4 border border-gray-300 font-num">
              <div className="flex justify-between mb-2">
                 <span>Account Number:</span>
                 <span className="font-bold">{data.accountNumber}</span>
              </div>
              <div className="w-full h-px bg-gray-300 my-2" />
              <div className="flex justify-between mb-1">
                 <span className="text-gray-600">Beginning Balance:</span>
                 <span>{data.startBalance}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t-2 border-gray-300">
                 <span>Ending Balance:</span>
                 <span>{data.endBalance}</span>
              </div>
           </div>
        </section>

        {/* --- 3. TRANSACTION LEDGER --- */}
        <section className="flex-1">
           <table className="w-full border border-gray-300 text-sm font-num">
              <thead className="bg-black text-white uppercase text-xs">
                 <tr>
                    <th className="py-2 px-2 text-left w-24">Date</th>
                    <th className="py-2 px-2 text-left w-20">Ref #</th>
                    <th className="py-2 px-2 text-left">Description</th>
                    <th className="py-2 px-2 text-right w-24">Debit</th>
                    <th className="py-2 px-2 text-right w-24">Credit</th>
                    <th className="py-2 px-2 text-right w-28">Balance</th>
                 </tr>
              </thead>
              <tbody className="text-gray-800">
                 {data.transactions.map((tx, i) => (
                   <tr key={i} className="ledger-row border-b border-gray-200">
                      <td className="ledger-cell">{tx.date}</td>
                      <td className="ledger-cell opacity-60">{tx.ref || "-"}</td>
                      <td className="ledger-cell font-serif uppercase text-xs tracking-wide font-bold">
                        {tx.desc}
                      </td>
                      <td className="ledger-cell text-right">
                        {tx.withdrawal ? `-${tx.withdrawal}` : ""}
                      </td>
                      <td className="ledger-cell text-right text-black font-bold">
                        {tx.deposit ? `+${tx.deposit}` : ""}
                      </td>
                      <td className="ledger-cell text-right font-bold bg-gray-50/50">
                        {tx.balance}
                      </td>
                   </tr>
                 ))}
                 
                 {/* Empty Rows Filler */}
                 {[...Array(5)].map((_, i) => (
                    <tr key={`fill-${i}`} className="ledger-row border-b border-gray-200 h-8">
                       <td className="ledger-cell"></td>
                       <td className="ledger-cell"></td>
                       <td className="ledger-cell"></td>
                       <td className="ledger-cell"></td>
                       <td className="ledger-cell"></td>
                       <td className="ledger-cell"></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </section>

        {/* --- 4. FOOTER --- */}
        <footer className="mt-12 text-center text-[10px] font-sans text-gray-400 uppercase tracking-widest">
           Please report any discrepancies within 10 days of receipt • {data.bankName}
        </footer>

        {/* --- Visual Stamp --- */}
        {data.status === 'FROZEN' && (
           <div className="absolute bottom-20 right-20 border-4 border-red-800 text-red-800 text-4xl font-black uppercase p-4 rotate-[-15deg] opacity-60 mix-blend-multiply pointer-events-none">
             Account Frozen
           </div>
        )}

      </div>
    </div>
  );
}