"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import { getCaseBySlug } from "@/data/coldCases";
import BoardControls, { BoardControlsProps } from "./board-controls";

// Dedicated header for /play/[slug] preserving original style while injecting case metadata.
interface PlayHeaderComponentProps {
  boardControlsProps?: BoardControlsProps; // Unified controls (filters + actions + mobile dock)
  titleOverride?: string; // Optional override for case title (e.g., operation codename).
}

export const PlayHeader: React.FC<PlayHeaderComponentProps> = ({
  boardControlsProps,
  titleOverride,
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const current = resolvedTheme || theme;
  const toggleTheme = () => setTheme(current === "light" ? "dark" : "light");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = pathname.split("/play/")[1]?.split("/")[0];
  const caseFile = slug ? getCaseBySlug(slug) : undefined;
  const loc = searchParams.get("loc") || undefined;
  const characters = searchParams.get("chars")?.split("|").filter(Boolean) || [];

  return (
    <>
  <header id="play-header" className="fixed left-1/2 top-2 md:top-4 z-50 -translate-x-1/2 flex flex-col items-stretch px-3 md:px-4 py-2 bg-white/80 dark:bg-black/40 border border-gray-200/60 dark:border-white/10 shadow-xl rounded-2xl w-[95vw] max-w-[960px] gap-2 backdrop-blur-md">
      <div className="flex items-center w-full gap-2 md:gap-3">
      {/* Mobile: icon-only Cases */}
      <Link
        href="/cases"
        className="flex items-center justify-center h-9 w-9 md:h-auto md:w-auto rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/10 transition shadow"
        aria-label="Cases"
      >
        <span className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5M3.75 9h16.5m-10.5 4.5h10.5m-6 4.5h6" />
          </svg>
        </span>
        <span className="hidden md:inline font-mono text-xs md:text-sm px-3 md:px-4 py-2 font-semibold">Cases</span>
      </Link>
      {/* Center title */}
      <div className="flex-1 flex flex-col items-center min-w-0">
        <span className="text-[12px] md:text-sm font-semibold truncate text-center" title={titleOverride || caseFile?.title}>{titleOverride || caseFile?.title || "Detective Board"}</span>
        <div className="hidden md:flex flex-wrap justify-center gap-1 text-[9px] md:text-[10px] leading-tight text-gray-700 dark:text-gray-300 max-h-[30px] overflow-hidden">
          {loc && <span className="truncate">Loc: {loc}</span>}
          {characters.length > 0 && (
            <span className="truncate" title={characters.join(", ")}>Chars: {characters.slice(0,4).join(", ")}{characters.length > 4 ? "…" : ""}</span>
          )}
        </div>
      </div>
      {/* Mobile: icon-only Case File */}
      <Link
        href={`/cases/${slug}`}
        className="flex items-center justify-center h-9 w-9 md:h-auto md:w-auto rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 dark:bg-yellow-500/20 dark:text-yellow-300 dark:hover:bg-yellow-500/30 border border-yellow-300/60 dark:border-yellow-400/30 transition shadow"
        aria-label="Case File"
      >
        <span className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h9l6 6v12a.75.75 0 01-.75.75H6.75A.75.75 0 016 21.75V3.75A.75.75 0 016.75 3z" />
          </svg>
        </span>
        <span className="hidden md:inline font-mono text-xs md:text-sm px-3 md:px-4 py-2 font-semibold">Case File</span>
      </Link>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300/60 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition"
      >
        <span className="sr-only">Toggle theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-all duration-300 ${current === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 scale-50 absolute"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-all duration-300 ${current === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90 scale-50 absolute"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </button>
      </div>
      {boardControlsProps && (
        <div className="w-full mt-1 md:mt-2 border-t border-gray-200/40 dark:border-white/10 pt-2">
          <BoardControls {...boardControlsProps} />
        </div>
      )}
    </header>
  {/* BoardControls renders unified controls (filters + actions + mobile dock) */}
    </>
  );
};

export default PlayHeader;