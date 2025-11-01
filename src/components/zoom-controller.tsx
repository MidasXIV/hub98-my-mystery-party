"use client";
import React, { useRef, useState } from "react";

interface ZoomControllerProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  className?: string;
  // optional mobile-only rendering hint
  mobileOnly?: boolean;
}

// Floating zoom controller optimized for mobile visibility.
// Compact pill layout with large tap targets; percentage doubles as reset.
export const ZoomController: React.FC<ZoomControllerProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  className = "",
  mobileOnly = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Toggle expansion (optional future state for more controls)
  const toggleExpanded = () => setExpanded((e) => !e);

  const percent = Math.round(scale * 100);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto select-none fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-[120] ${
        mobileOnly ? "md:hidden" : ""
      } ${className}`}
    >
      <div
        className="flex flex-col items-center gap-1"
        aria-label="Zoom controls"
      >
        <div
          className="rounded-xl shadow-lg shadow-black/40 border border-gray-300/60 dark:border-white/10 backdrop-blur bg-white/90 dark:bg-black/70 px-2 py-2 flex flex-col items-center"
        >
          <button
            onClick={onZoomIn}
            aria-label="Zoom in"
            className="h-10 w-10 flex items-center justify-center text-lg font-bold rounded-md bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-100 active:scale-95 transition"
            title="Zoom in (Ctrl/Cmd +)"
          >
            +
          </button>
          <button
            onClick={onZoomReset}
            aria-label="Reset zoom"
            title="Reset zoom (Ctrl/Cmd 0)"
            className="mt-1 text-xs font-mono tracking-wide text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {percent}%
          </button>
          <button
            onClick={onZoomOut}
            aria-label="Zoom out"
            className="h-10 w-10 flex items-center justify-center text-xl font-bold rounded-md bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-100 active:scale-95 transition"
            title="Zoom out (Ctrl/Cmd -)"
          >
            −
          </button>
        </div>
        <button
          onClick={toggleExpanded}
          aria-label={expanded ? "Hide extra zoom info" : "Show zoom shortcuts"}
          className="text-[10px] font-staatliches tracking-wider uppercase text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {expanded ? "SHORTCUTS" : "ZOOM"}
        </button>
        {expanded && (
          <div className="text-[10px] font-mono bg-black/70 text-gray-200 px-2 py-1 rounded-md border border-white/10 space-y-0.5">
            <div>Ctrl/Cmd + : in</div>
            <div>Ctrl/Cmd - : out</div>
            <div>Ctrl/Cmd 0 : reset</div>
            <div>Shift+Space : pan-only</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoomController;
