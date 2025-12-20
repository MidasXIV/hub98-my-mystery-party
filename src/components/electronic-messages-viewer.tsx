"use client";

import React, { useMemo } from "react";
import { parseElectronicData, ElectronicType } from "@/lib/electronic-messages-utils";

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Courier+Prime&family=Inter:wght@400;600&display=swap');

    .printer-sheet {
      background-color: #ffffff;
      /* High quality bright white paper */
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
      color: #111;
    }

    .font-ui { font-family: 'Inter', sans-serif; } /* Modern UI font */
    .font-meta { font-family: 'Courier Prime', monospace; } /* Printer Meta */

    /* Chat Bubble Styles for "Print Mode" */
    .chat-bubble {
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.4;
      max-width: 80%;
      margin-bottom: 8px;
      position: relative;
    }
    
    /* "Incoming" (Left) - Light Grey fill */
    .bubble-in {
      background-color: #f3f4f6; 
      border: 1px solid #e5e7eb;
      color: #000;
      border-bottom-left-radius: 0;
    }

    /* "Outgoing" (Right) - Darker Grey/Black fill simulation */
    .bubble-out {
      background-color: #e5e7eb;
      border: 1px solid #d1d5db;
      color: #000;
      align-self: flex-end;
      border-bottom-right-radius: 0;
      text-align: right;
    }

    /* Email Header Block */
    .email-header-row {
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 8px 0;
    }
    .email-label {
      width: 80px;
      font-weight: 600;
      color: #666;
      font-size: 13px;
    }
    .email-value {
      flex: 1;
      font-size: 13px;
    }
  `}</style>
);

export default function ElectronicMessageViewer({ content }: { content: string }) {
  const data = useMemo(() => parseElectronicData(content), [content]);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- A4 Printout Container --- */}
      <div className="relative w-full max-w-[800px] min-h-[1100px] printer-sheet p-10 flex flex-col">
        
        {/* --- PRINTER HEADER (Meta) --- */}
        <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-8 opacity-60">
           <div className="font-meta text-xs">
             Evidence File: {data.caseRef}
           </div>
           <div className="font-meta text-xs text-right">
             Printed: {data.printDate}<br/>
             Source: {data.platformName}
           </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 font-ui">
          
          {/* === LAYOUT 1: EMAIL === */}
          {data.type === 'EMAIL' && (
            <div>
               <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-4">{data.subject}</h1>
                  <div className="email-header-row">
                     <span className="email-label">From:</span>
                     <span className="email-value font-bold">{data.from}</span>
                  </div>
                  <div className="email-header-row">
                     <span className="email-label">To:</span>
                     <span className="email-value">{data.to}</span>
                  </div>
                  <div className="email-header-row">
                     <span className="email-label">Date:</span>
                     <span className="email-value">{data.messages[0]?.time || data.printDate}</span>
                  </div>
               </div>

               <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif text-gray-900">
                  {data.messages.map((msg, i) => (
                    <div key={i} className="mb-4">
                      {msg.body}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* === LAYOUT 2: CHAT / SMS / WHATSAPP === */}
          {['SMS', 'CHAT', 'WHATSAPP'].includes(data.type) && (
            <div>
               {/* Chat Header */}
               <div className="flex items-center justify-center border-b border-gray-300 pb-4 mb-6">
                  <div className="text-center">
                     <div className="text-xs uppercase text-gray-500 font-bold tracking-widest mb-1">
                       CONVERSATION HISTORY
                     </div>
                     <div className="text-lg font-bold">
                       {data.participants}
                     </div>
                  </div>
               </div>

               {/* Message Stream */}
               <div className="flex flex-col">
                  {data.messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col max-w-[80%] ${msg.isMe ? 'self-end items-end' : 'self-start items-start'} mb-4`}>
                       
                       {/* Sender Name (Small) */}
                       <div className="text-[10px] text-gray-500 mb-1 px-1">
                         {msg.sender}, {msg.time}
                       </div>

                       {/* Bubble */}
                       <div className={`chat-bubble ${msg.isMe ? 'bubble-out' : 'bubble-in'}`}>
                         {msg.body}
                       </div>

                    </div>
                  ))}
               </div>
            </div>
          )}

        </div>

        {/* --- PRINTER FOOTER --- */}
        <div className="mt-auto border-t border-gray-300 pt-2 flex justify-between items-center opacity-50">
           <div className="font-meta text-[9px]">
             Page 1 of 1
           </div>
           <div className="font-meta text-[9px]">
             {`https://forensics.local/cases/${data.caseRef.toLowerCase()}/export.html`}
           </div>
        </div>

        {/* --- Visual Evidence Stamp --- */}
        <div className="absolute bottom-10 right-10 border-4 border-red-700 text-red-700 font-bold text-xl uppercase px-4 py-2 rotate-[-15deg] opacity-60 mix-blend-multiply pointer-events-none">
           Digital Copy
        </div>

      </div>
    </div>
  );
}