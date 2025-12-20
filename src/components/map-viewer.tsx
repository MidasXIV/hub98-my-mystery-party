"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { parseMapData } from "@/lib/map-utils"; // Assume same utils

const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&family=Courier+Prime:wght@400;700&display=swap');

    .map-clean-paper {
      background-color: #fbfbfb; /* Stark, Clean White/Grey */
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      color: #111;
    }

    /* Architectural Grid Overlay */
    .blueprint-grid {
      background-image: 
        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
      background-size: 100px 100px;
      pointer-events: none;
    }

    /* Pin Styles */
    .map-pin {
      width: 16px;
      height: 16px;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-family: 'Oswald', sans-serif;
      font-weight: bold;
      font-size: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      cursor: help;
      transition: transform 0.2s;
    }
    .map-pin:hover { transform: translate(-50%, -60%) scale(1.1); }
    
    .pin-crime { background: #dc2626; color: white; border: 2px solid white; }
    .pin-suspect { background: #2563eb; color: white; border: 2px solid white; }
    .pin-clue { background: #facc15; color: black; border: 2px solid black; }
    .pin-location { background: #fff; color: black; border: 2px solid #333; }

    .font-header { font-family: 'Oswald', sans-serif; }
    .font-body { font-family: 'Roboto Condensed', sans-serif; }
    .font-mono { font-family: 'Courier Prime', monospace; }
  `}</style>
);

export default function MapViewer({ content }: { content: string }) {
  const data = useMemo(() => parseMapData(content), [content]);

  return (
    <div className="w-full flex justify-center py-8 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Main Layout Container --- */}
      <div className="relative w-full max-w-[800px] min-h-[900px] map-clean-paper flex flex-col border border-gray-300">
        
        {/* --- 1. HEADER --- */}
        <header className="p-6 border-b border-gray-300 flex justify-between items-end bg-white">
          <div>
            <h1 className="font-header text-3xl uppercase tracking-tight text-slate-900">
              {data.title}
            </h1>
            <p className="font-body text-sm uppercase tracking-widest text-slate-500">
              {data.region} • {data.date}
            </p>
          </div>
          <div className="text-right font-mono text-xs border border-gray-300 px-2 py-1 bg-gray-50">
            REF: MP-{new Date().getFullYear()}-X
          </div>
        </header>

        {/* --- 2. MAP AREA --- */}
        <div className="relative w-full aspect-square md:aspect-[16/10] bg-slate-100 overflow-hidden border-b border-gray-300">
           
           {/* Image */}
           <div className="absolute inset-0">
             {data.imageUrl ? (
               <Image 
                 src={data.imageUrl} 
                 alt="Map" 
                 fill 
                 className="object-contain opacity-90 grayscale-[10%]"
               />
             ) : (
               /* Fallback Pattern if no image */
               <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-50" />
             )}
           </div>

           {/* Grid Overlay */}
           <div className="absolute inset-0 blueprint-grid" />

           {/* Map Pins */}
           {data.markers.map((marker, i) => (
             <div
               key={i}
               className={`absolute map-pin ${
                 marker.type === 'crime' ? 'pin-crime' : 
                 marker.type === 'suspect' ? 'pin-suspect' : 
                 marker.type === 'clue' ? 'pin-clue' : 'pin-location'
               }`}
               style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
               title={marker.label}
             >
               {i + 1}
             </div>
           ))}

           {/* Compass Overlay */}
           <div className="absolute top-4 right-4 pointer-events-none opacity-80">
              <svg width="40" height="40" viewBox="0 0 100 100">
                 <path d="M50 0 L60 40 L50 100 L40 40 Z" fill="#333" />
                 <text x="50" y="-10" textAnchor="middle" className="font-header font-bold text-xs">N</text>
              </svg>
           </div>
        </div>

        {/* --- 3. POINTS OF INTEREST (POI) --- */}
        <div className="flex-1 p-8 bg-white">
           <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-2">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
             <h2 className="font-header text-xl uppercase tracking-wide">Points of Interest</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.markers.map((marker, i) => (
                <div key={i} className="flex gap-4 group">
                   {/* Number Box */}
                   <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 border-gray-800 font-header text-lg font-bold bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors">
                     {i + 1}
                   </div>
                   
                   {/* Content */}
                   <div>
                      <h3 className="font-body font-bold text-sm uppercase mb-1">
                        {marker.label}
                      </h3>
                      <p className="font-mono text-xs text-gray-600 leading-relaxed">
                        {marker.description || "No additional data available."}
                      </p>
                      {/* Optional Type Tag */}
                      {marker.type && (
                        <span className="inline-block mt-1 text-[9px] uppercase font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-sm">
                          {marker.type}
                        </span>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- 4. FOOTER --- */}
        <footer className="bg-gray-100 p-4 border-t border-gray-300 flex justify-between items-center text-xs text-gray-500 font-mono">
           <div>SCALE {data.scale}</div>
           <div>MUNICIPAL ARCHIVES</div>
        </footer>

      </div>
    </div>
  );
}