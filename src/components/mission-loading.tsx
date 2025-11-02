"use client";
import React, { useEffect, useState, useMemo } from "react";

interface MissionLoadingProps {
  title?: string;
  rotateMs?: number;
  className?: string;
}

// Helpful rotating intel tips while the board generates.
const DEFAULT_SUGGESTIONS: string[] = [
  "Shortcut: Ctrl/Cmd + / - to zoom; Ctrl/Cmd 0 resets to 100%.",
  "Shortcut: Shift+Space toggles Pan Only mode (disables item clicks).",
  "Tip: Right-click (or long-press) an evidence item, then choose 'Connect to...' to link two pieces of intel.",
  "Tip: On mobile, rotate your device for a wider tactical layout.",
  "Tip: Use 'Reset View' when zoom/pan feels disoriented to re-center all evidence.",
  "Tip: Pinch to zoom; drag empty space to pan; zoom focuses where your cursor (or pinch midpoint) is.",
  "Tip: Request a new clue from the menu—fresh intel spawns near the center of your current view.",
  "Tip: Timeline mode organizes transcripts & articles chronologically. Patterns and contradictions pop out.",
  "Tip: Solve objectives to unlock new drops of evidence automatically.",
  "Tip: Long-press on touch devices to open item actions (edit, delete, connect).",
  "Tip: Dragging one item temporarily mutes others—focus helps you arrange complex clusters.",
];

export default function MissionLoading({
  title = "CLASSIFIED: Generating Mission Briefing...",
  rotateMs = 4500,
  className = "",
}: MissionLoadingProps) {
  const suggestions = useMemo(() => DEFAULT_SUGGESTIONS, []);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (suggestions.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      // Small timeout to allow fade-out before switching text
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % suggestions.length);
        setFade(true);
      }, 250);
    }, rotateMs);
    return () => clearInterval(interval);
  }, [suggestions, rotateMs]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-screen px-6 text-center bg-[#0f1115] bg-gradient-to-b from-[#0f1115] to-[#1a1d22] text-gray-100 ${className}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mb-8 flex flex-col items-center">
        <div className="text-2xl md:text-3xl text-gray-200 font-staatliches tracking-widest animate-pulse drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {title}
        </div>
        <div className="mt-6 h-2 w-56 bg-gray-700/60 rounded overflow-hidden ring-1 ring-black/40">
          <div className="h-full bg-yellow-400 animate-[loading-bar_2.4s_ease-in-out_infinite] shadow-[0_0_8px_2px_rgba(255,230,120,0.4)]" />
        </div>
      </div>

      <div className="relative mt-4 max-w-xl">
        <p
          key={index}
          className={`text-sm md:text-base font-special-elite text-gray-400/90 transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {suggestions[index]}
        </p>
      </div>

      <div className="mt-10 flex items-center space-x-2 text-[10px] tracking-widest uppercase text-gray-500 font-mono">
        <span className="relative inline-block w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-red-600 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-red-600" />
        </span>
        <span className="text-gray-400">Encrypted channel active</span>
      </div>
    </div>
  );
}

/* Tailwind utility keyframes (if not already defined elsewhere). You can move these to globals.css if preferred:
@keyframes loading-bar {
  0%, 20% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  80%, 100% { transform: translateX(100%); }
}
*/
