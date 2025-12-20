"use client";

import { parseSARData } from "@/lib/sar-utils"; // Adjust import path as needed
import Image from "next/image";
import React, { useMemo } from "react";

const ViewerStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Share+Tech+Mono&family=Courier+Prime:wght@400;700&display=swap");

    /* 1. A4 Paper Texture */
    .a4-sheet {
      background-color: #fdfdfd;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      color: #111;
    }

    /* 2. Map Styles */
    .map-container {
      background-color: #f1f5f9;
      position: relative;
      overflow: hidden;
      border-bottom: 2px solid #334155;
    }

    .map-grid-overlay {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .topo-pattern {
      background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='topo' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50 T 150 50' fill='none' stroke='%2394a3b8' stroke-width='1' opacity='0.4'/%3E%3Cpath d='M0 25 Q 25 0 50 25 T 100 25' fill='none' stroke='%2394a3b8' stroke-width='1' opacity='0.4'/%3E%3Cpath d='M0 75 Q 25 50 50 75 T 100 75' fill='none' stroke='%2394a3b8' stroke-width='1' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23topo)' /%3E%3C/svg%3E");
    }

    /* 3. Legend Hatches */
    .hatched-bg {
      background-image: repeating-linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2) 2px,
        transparent 2px,
        transparent 4px
      );
    }

    /* 4. Fonts */
    .font-tech {
      font-family: "Share Tech Mono", monospace;
    }
    .font-label {
      font-family: "Roboto Condensed", sans-serif;
    }
    .font-type {
      font-family: "Courier Prime", monospace;
    }

    /* 5. Table Styling */
    .log-table-row:nth-child(even) {
      background-color: #f1f5f9;
    }
  `}</style>
);

export default function SearchAndRescueReportViewer({
  content,
}: {
  content: string;
}) {
  const data = useMemo(() => parseSARData(content), [content]);

  return (
    <div className="w-full flex justify-center py-8 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- A4 Paper Container --- */}
      {/* Width set to ~800px to mimic A4 proportions on screen */}
      <div className="a4-sheet w-full max-w-[800px] min-h-[1130px] flex flex-col relative">
        {/* --- 1. HEADER SECTION --- */}
        <header className="border-b-4 border-slate-800 p-6 pb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-tech text-xs text-slate-500 mb-1">
                FORM SAR-09-B // UNCLASSIFIED
              </div>
              <h1 className="font-label text-4xl font-bold uppercase tracking-tight text-slate-900">
                {data.operationName}
              </h1>
            </div>
            <div className="text-right">
              <div className="font-tech text-xl font-bold bg-slate-800 text-white px-3 py-1 inline-block">
                GRID: {data.gridReference}
              </div>
              <div className="font-type text-sm mt-1 font-bold text-slate-700">
                DATE: {data.date}
              </div>
            </div>
          </div>
        </header>

        {/* --- 2. MAP SECTION (The "Visual") --- */}
        <section className="w-full h-[400px] map-container bg-slate-100 relative">
          {/* Background Texture/Image */}
          <div
            className={`absolute inset-0 w-full h-full ${
              data.mapImageUrl ? "" : "topo-pattern"
            }`}
          >
            {data.mapImageUrl && (
              <Image
                src={data.mapImageUrl}
                alt="Map"
                fill
                className="object-cover opacity-80 grayscale-[30%] contrast-125"
              />
            )}
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 map-grid-overlay pointer-events-none" />

          {/* Map Overlay Text */}
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 font-tech text-xs border border-black/20">
            SECTOR VIEW: {data.sector}
          </div>

          {/* Center Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-red-600 rounded-full opacity-60 pointer-events-none flex items-center justify-center">
            <div className="w-full h-[1px] bg-red-600"></div>
            <div className="h-full w-[1px] bg-red-600 absolute"></div>
          </div>
        </section>

        {/* --- 3. LEGEND STRIP --- */}
        {/* Horizontal bar style legend for A4 efficiency */}
        <section className="bg-slate-100 border-b border-slate-400 p-3 px-6 flex items-center gap-6 overflow-x-auto">
          <span className="font-tech font-bold text-sm uppercase mr-2">
            Map Key:
          </span>
          {data.legend.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 border border-black/60 ${
                  item.pattern === "hatched" ? "hatched-bg" : ""
                }`}
                style={{ backgroundColor: item.color }}
              />
              <span className="font-label text-xs uppercase font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* --- 4. NARRATIVE REPORT --- */}
        <section className="p-8 flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Briefing */}
            <div className="flex-1">
              <h3 className="font-tech font-bold text-sm border-b-2 border-slate-300 mb-2 uppercase text-slate-500">
                1. Situation Brief
              </h3>
              <p className="font-type text-sm text-justify leading-relaxed">
                {data.briefing}
              </p>
            </div>

            {/* Terrain */}
            <div className="flex-1">
              <h3 className="font-tech font-bold text-sm border-b-2 border-slate-300 mb-2 uppercase text-slate-500">
                2. Terrain / Conditions
              </h3>
              <p className="font-type text-sm text-justify leading-relaxed">
                {data.terrainNotes}
              </p>
            </div>
          </div>

          {/* Logs Table */}
          <div>
            <h3 className="font-tech font-bold text-sm border-b-2 border-slate-300 mb-2 uppercase text-slate-500">
              3. Operational Log
            </h3>
            <div className="border border-slate-300 text-xs font-mono w-full">
              <div className="grid grid-cols-12 bg-slate-800 text-white font-bold p-1.5 uppercase">
                <div className="col-span-2">Time</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-8">Action / Note</div>
              </div>
              {data.searchLog.map((log, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 p-1.5 border-t border-slate-200 log-table-row text-black"
                >
                  <div className="col-span-2 font-bold">{log.time}</div>
                  <div className="col-span-2 text-slate-700 font-bold">
                    {log.unit}
                  </div>
                  <div className="col-span-8">{log.notes}</div>
                </div>
              ))}
              {/* Empty rows to fill space */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="grid grid-cols-12 p-1.5 border-t border-slate-200 log-table-row h-8"
                >
                  <div className="col-span-2"></div>
                  <div className="col-span-2"></div>
                  <div className="col-span-8"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. FOOTER --- */}
        <footer className="mt-auto p-6 border-t border-slate-300">
          <div className="flex justify-between items-end">
            <div>
              <div className="font-tech text-xs text-slate-400 uppercase mb-4">
                Operational Authority Signature
              </div>
              <div className="font-['Courier_Prime'] font-bold text-xl text-slate-900 border-b border-black inline-block min-w-[200px] pb-1">
                {data.author}
              </div>
            </div>

            {/* Stamp Visual */}
            <div className="border-4 border-slate-300 text-slate-300 font-black uppercase text-xl p-2 rotate-[-10deg] opacity-50 select-none">
              Filed
            </div>

            <div className="text-right">
              <div className="font-tech text-xs text-slate-500">
                PAGE 1 OF 1
              </div>
              <div className="font-tech text-[10px] text-slate-400">
                RIVERDALE SEARCH & RESCUE
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
