"use client";
import React, { useRef, useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";

interface ZoomControllerProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onZoomSet?: (scale: number) => void; // direct set from slider
  className?: string;
  mobileOnly?: boolean; // optional mobile-only rendering hint
  embedded?: boolean; // render without fixed positioning wrapper
}

// Floating zoom controller optimized for mobile visibility.
// Compact pill layout with large tap targets; percentage doubles as reset.
export const ZoomController: React.FC<ZoomControllerProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onZoomSet,
  className = "",
  mobileOnly = true,
  embedded = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Toggle expansion (optional future state for more controls)
  const toggleExpanded = () => setExpanded((e) => !e);

  const percent = Math.round(scale * 100);
  const animRef = useRef<number | null>(null);
  const scaleStartRef = useRef(scale);
  scaleStartRef.current = scale;

  const animateTo = useCallback(
    (target: number) => {
      if (!onZoomSet) return;
      const start = performance.now();
      const initial = scaleStartRef.current;
      const duration = 180; // ms
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const frame = (ts: number) => {
        const t = Math.min(1, (ts - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const next = initial + (target - initial) * eased;
        onZoomSet(next);
        if (t < 1) animRef.current = requestAnimationFrame(frame);
        else animRef.current = null;
      };
      animRef.current = requestAnimationFrame(frame);
    },
    [onZoomSet]
  );

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    embedded ? (
      <div ref={containerRef} className={className}>{children}</div>
    ) : (
      <div
        ref={containerRef}
        className={`pointer-events-auto select-none fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-[120] ${
          mobileOnly ? "md:hidden" : ""
        } ${className}`}
      >
        {children}
      </div>
    );

  return (
    <Wrapper>
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
          {/* Slider (mobile vertical) */}
          <div className="my-2 h-full flex items-center justify-center px-1">
            <Slider
              orientation="vertical"
              min={50}
              max={300}
              value={[percent]}
              onValueChange={(vals) => {
                const p = vals[0];
                const target = Math.max(0.5, Math.min(3, p / 100));
                animateTo(target);
              }}
              className="h-full data-[orientation=vertical]:w-6"
              aria-label="Zoom level"
            />
            <span className="sr-only" role="status" aria-live="polite">Zoom {percent}%</span>
          </div>
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
    </Wrapper>
  );
};

export default ZoomController;
