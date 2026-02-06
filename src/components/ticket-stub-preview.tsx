"use client";

import React, { useMemo } from "react";
import { parseTicketData } from "@/lib/ticket-utils"; // Assume utils file or inline

// --- CSS ---
const PreviewStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Oswald:wght@500&family=Share+Tech+Mono&display=swap');

    /* 1. Die-Cut Ticket Shape (Notches) */
    /*
      NOTE: We avoid using 'transparent' in the notch gradients because the
      board canvas can show through, making the ticket look unintentionally
      see-through. Instead we "punch" with a background-color variable.
    */
    .ticket-stub-shape {
      position: relative;
      background:
        radial-gradient(circle at 0 50%, var(--ticket-hole) 0 6px, var(--ticket-bg) 6.5px),
        radial-gradient(circle at 100% 50%, var(--ticket-hole) 0 6px, var(--ticket-bg) 6.5px);
      background-size: 51% 100%;
      background-position: left, right;
      background-repeat: no-repeat;
      box-shadow: 0 6px 14px rgba(0,0,0,0.25);
    }

    .ticket-paper {
      background-color: var(--ticket-bg);
      border: 1px solid rgba(0,0,0,0.25);
      border-radius: 4px;
      overflow: hidden;
    }

    /* Perforation hint */
    .ticket-perf {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 70%;
      width: 0;
      border-left: 2px dashed rgba(0,0,0,0.25);
      opacity: 0.8;
      pointer-events: none;
    }

    /* 2. Texture Overlay (overlay layer so it can't "wash out" text) */
    .ticket-texture {
      position: relative;
    }
    .ticket-texture::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
      opacity: 0.22;
      mix-blend-mode: multiply;
      pointer-events: none;
      z-index: 0;
    }

    /* 3. Typography */
    .font-retro { font-family: 'Abril Fatface', cursive; }
    .font-block { font-family: 'Oswald', sans-serif; }
    .font-mono-ticket { font-family: 'Share Tech Mono', monospace; }

    /* 4. Hole Punch */
    .hole-punch-mark {
      background-color: #333; /* The background behind the ticket */
      box-shadow: inset 1px 1px 2px rgba(0,0,0,0.6);
    }

    .ticket-text {
      text-shadow: 0 1px 0 rgba(255,255,255,0.25);
    }
  `}</style>
);

// Helper to map types to colors
const getTheme = (type: string) => {
  switch (type) {
    case 'movie': return { bg: '#c44d46', text: '#f1e6d2', border: '#a33b35' }; // Retro Red
    case 'train': return { bg: '#e3dccb', text: '#2c2c2c', border: '#c7bfad' }; // Manila/Beige
    case 'parking': return { bg: '#8bb0c4', text: '#1a2e3b', border: '#6f93a6' }; // Faded Blue
    default: return { bg: '#d4c5a9', text: '#333', border: '#b0a38e' };
  }
};

export default function TicketStubPreview({ content }: { content: string }) {
  const data = useMemo(() => parseTicketData(content), [content]);
  const theme = getTheme(data.type);

  return (
    <div className="w-full h-full p-2 flex items-center justify-center select-none group">
      <PreviewStyles />
      
      <div 
        className="w-full h-24 ticket-stub-shape ticket-paper ticket-texture flex flex-col items-center justify-center relative transition-transform group-hover:rotate-1"
        style={{ '--ticket-bg': theme.bg, '--ticket-hole': '#0b1220' } as React.CSSProperties}
      >
        <div className="ticket-perf" />

        {/* Border Inset */}
        <div 
          className="absolute inset-2 border-2 border-dashed opacity-50 rounded-sm pointer-events-none"
          style={{ borderColor: theme.border }} 
        />

        {/* Content */}
        <div className="ticket-text z-10 text-center" style={{ color: theme.text }}>
          <div className="font-retro text-lg leading-none tracking-wide uppercase opacity-95 truncate px-4">
            {data.venue}
          </div>
          <div className="font-block text-[10px] uppercase tracking-widest opacity-90 mt-1">
            {data.date}
          </div>
          {data.title && (
            <div className="font-block text-[10px] uppercase tracking-wider opacity-85 mt-0.5 truncate px-6">
              {data.title}
            </div>
          )}
        </div>

        {/* Serial Number Side Text */}
        <div 
          className="absolute right-3 top-1/2 -translate-y-1/2 -rotate-90 font-mono-ticket text-[8px] opacity-60 origin-center"
          style={{ color: theme.text }}
        >
          {data.serial}
        </div>

        {/* The "Used" Hole Punch */}
        {data.isPunched && (
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full hole-punch-mark z-20" />
        )}
      </div>
    </div>
  );
}