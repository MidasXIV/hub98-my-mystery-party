"use client";
import React from "react";
import { createPortal } from "react-dom";
import {
  CalendarSearch,
  EyeOffIcon,
  Lightbulb,
  ListRestart,
  LucideEyeOff,
  NotebookPen,
} from "lucide-react";

// Unified board controls component combining filters + actions + mobile dock + standalone modal.
export interface BoardControlsProps {
  activeFilters: Set<string>;
  allTypes: string[];
  toggleFilter: (type: string) => void;
  setActiveFilters: (filters: Set<string>) => void;
  handleResetView: () => void;
  setIsTimelineVisible: (visible: boolean) => void;
  handleAddNewNote: () => void;
  handleRequestClue: () => void;
  cluesLeft: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  variant?: "integrated" | "standalone"; // integrated: inside header; standalone: modal style
  dockActionsOnMobile?: boolean; // if true actions rendered as bottom dock in mobile view
  mobileDockPortal?: boolean; // render dock via portal to body for reliable positioning
  includeDockSpacer?: boolean; // add spacer div to prevent overlap with page content
}

const BoardControls: React.FC<BoardControlsProps> = ({
  activeFilters,
  allTypes,
  toggleFilter,
  setActiveFilters,
  handleResetView,
  setIsTimelineVisible,
  handleAddNewNote,
  handleRequestClue,
  cluesLeft,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  variant = "integrated",
  dockActionsOnMobile = true,
  mobileDockPortal = true,
  includeDockSpacer = true,
}) => {
  const noCluesLeft = cluesLeft === 0;
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    updateScrollState();
  }, [activeFilters, allTypes.length, updateScrollState]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const handleArrowScroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  // Style tokens
  const baseBtn =
    "font-staatliches tracking-wider text-xs md:text-xs px-3 py-1 rounded-md transition-colors border pointer-events-auto cursor-pointer";
  const filterActive =
    "bg-yellow-300 hover:bg-yellow-400 text-yellow-900 dark:bg-yellow-500/30 dark:text-yellow-100 dark:hover:bg-yellow-500/50 border-yellow-300/70 dark:border-yellow-500/40";
  const filterInactive =
    "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15 border-gray-300/60 dark:border-white/10";
  const actionNeutral =
    "bg-white/70 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 border-gray-300/60 dark:border-white/10";
  const actionPrimary =
    "bg-yellow-300 hover:bg-yellow-400 text-yellow-900 dark:bg-yellow-500/30 dark:text-yellow-100 dark:hover:bg-yellow-500/50 border-yellow-300/70 dark:border-yellow-500/40";
  const dangerDisabled =
    "disabled:bg-gray-400/40 disabled:text-gray-600 disabled:cursor-not-allowed";

  const toggleAll = () =>
    setActiveFilters(
      activeFilters.size === allTypes.length ? new Set() : new Set(allTypes)
    );
  const allActive =
    activeFilters.size === allTypes.length && allTypes.length > 0;

  // Standalone variant modal content (actions + filters)
  const standaloneContent = (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-300/50 dark:border-white/10">
          <h3 className="font-staatliches tracking-wider text-xl text-gray-900 dark:text-gray-200">
            CONTROLS
          </h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl font-mono leading-none"
          >
            &times;
          </button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h4 className="font-staatliches tracking-wider text-lg text-gray-700 dark:text-gray-300 mb-2">
          Actions
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              handleResetView();
              setIsMobileMenuOpen(false);
            }}
            className={`${baseBtn} ${actionNeutral}`}
          >
            Reset View
          </button>
          <button
            onClick={() => {
              setIsTimelineVisible(true);
              setIsMobileMenuOpen(false);
            }}
            className={`${baseBtn} ${actionNeutral}`}
          >
            Timeline
          </button>
          <button
            onClick={() => {
              handleAddNewNote();
              setIsMobileMenuOpen(false);
            }}
            className={`${baseBtn} ${actionPrimary}`}
          >
            Add Note
          </button>
          <button
            onClick={() => {
              handleRequestClue();
              setIsMobileMenuOpen(false);
            }}
            disabled={noCluesLeft}
            className={`${baseBtn} ${actionPrimary} ${dangerDisabled}`}
          >
            Request Clue ({cluesLeft})
          </button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h4 className="font-staatliches tracking-wider text-lg text-gray-700 dark:text-gray-300 mb-2">
          Filter Evidence
        </h4>
        <button
          onClick={() =>
            setActiveFilters(allActive ? new Set() : new Set(allTypes))
          }
          className={`${baseBtn} ${actionNeutral} w-full mb-2`}
        >
          {allActive ? "Hide All" : "Show All"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          {allTypes.map((t) => {
            const active = activeFilters.has(t);
            return (
              <button
                key={t}
                onClick={() => toggleFilter(t)}
                className={`${baseBtn} capitalize ${
                  active ? filterActive : filterInactive
                }`}
              >
                {t.replace(/-/g, " ")}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  // Actions bar (desktop inline)
  const desktopActions = (
    <div
      role="group"
      aria-label="Board actions"
      className="hidden md:flex flex-wrap items-center gap-2"
    >
      <button
        onClick={handleResetView}
        className={`${baseBtn} ${actionNeutral}`}
      >
        Reset
      </button>
      <button
        onClick={() => setIsTimelineVisible(true)}
        className={`${baseBtn} ${actionNeutral}`}
      >
        Timeline
      </button>
      <button
        onClick={handleAddNewNote}
        className={`${baseBtn} ${actionPrimary}`}
      >
        Note
      </button>
      <button
        onClick={handleRequestClue}
        disabled={noCluesLeft}
        className={`${baseBtn} ${actionPrimary} ${dangerDisabled}`}
      >
        Clue ({cluesLeft})
      </button>
      <button
        onClick={toggleAll}
        aria-pressed={allActive}
        className={`${baseBtn} ${allActive ? actionPrimary : actionNeutral}`}
      >
        {allActive ? "Hide All" : "Show All"}
      </button>
    </div>
  );

  // Mobile dock actions
  const mobileDockContent = (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-[960px] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex gap-2 backdrop-blur-md rounded-t-xl border border-gray-300/60 dark:border-white/10 bg-white/90 dark:bg-black/70 shadow-xl"
      role="group"
      aria-label="Board actions dock"
    >
      <button
        onClick={handleResetView}
        className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
      >
        <ListRestart />
        <span className="leading-tight">Reset</span>
      </button>
      <button
        onClick={() => setIsTimelineVisible(true)}
        className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
      >
        <CalendarSearch />
        <span className="leading-tight">Timeline</span>
      </button>
      <button
        onClick={handleAddNewNote}
        className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50 transition"
      >
        <NotebookPen />
        <span className="leading-tight">Note</span>
      </button>
      <button
        onClick={handleRequestClue}
        disabled={noCluesLeft}
        className={`group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md transition ${
          noCluesLeft
            ? "bg-gray-300/40 text-gray-500 dark:bg-white/10 dark:text-gray-600 cursor-not-allowed"
            : "bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50"
        }`}
      >
        <Lightbulb />
        <span className="leading-tight">Clue ({cluesLeft})</span>
      </button>
      <button
        onClick={toggleAll}
        aria-pressed={allActive}
        className={`group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md transition ${
          allActive
            ? "bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50"
            : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20"
        }`}
      >
        {allActive && <LucideEyeOff />}
        {allActive ? "Hide All" : "Show All"}
      </button>
    </div>
  );

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Integrated variant (inside header)
  if (variant === "integrated") {
    return (
      <div className="flex flex-col w-full gap-2">
        {desktopActions}
        {/* Filter bar mobile with arrows */}
        <div className="md:hidden w-full px-1 pt-1 pb-1 flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => canScrollLeft && handleArrowScroll("left")}
            aria-label="Scroll filters left"
            aria-disabled={!canScrollLeft}
            className={`h-9 w-9 flex items-center justify-center rounded-md border ${
              canScrollLeft
                ? "bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-700 dark:text-gray-200"
                : "bg-gray-200/50 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            } border-gray-300/60 dark:border-white/10 shadow-sm backdrop-blur flex-shrink-0`}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            ref={scrollRef}
            role="group"
            aria-label="Filter evidence types"
            className="flex-1 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap scroll-smooth"
          >
            {allTypes.map((type) => {
              const active = activeFilters.has(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleFilter(type)}
                  aria-pressed={active}
                  className={`${baseBtn} flex-shrink-0 capitalize ${
                    active ? filterActive : filterInactive
                  }`}
                >
                  {type.replace(/-/g, " ")}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => canScrollRight && handleArrowScroll("right")}
            aria-label="Scroll filters right"
            aria-disabled={!canScrollRight}
            className={`h-9 w-9 flex items-center justify-center rounded-md border ${
              canScrollRight
                ? "bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-700 dark:text-gray-200"
                : "bg-gray-200/50 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            } border-gray-300/60 dark:border-white/10 shadow-sm backdrop-blur flex-shrink-0`}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Desktop filters row */}
        <div
          className="hidden md:flex flex-wrap justify-center items-center gap-2"
          role="group"
          aria-label="Filter evidence types"
        >
          {allTypes.map((type) => {
            const active = activeFilters.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                aria-pressed={active}
                className={`${baseBtn} capitalize ${
                  active ? filterActive : filterInactive
                }`}
              >
                {type.replace(/-/g, " ")}
              </button>
            );
          })}
        </div>
        {dockActionsOnMobile &&
          mobileDockPortal &&
          mounted &&
          createPortal(mobileDockContent, document.body)}
        {dockActionsOnMobile && !mobileDockPortal && mobileDockContent}
        {dockActionsOnMobile && includeDockSpacer && (
          <div className="md:hidden w-full" aria-hidden />
        )}
      </div>
    );
  }

  // Standalone variant uses modal trigger + modal content
  return (
    <div className="w-full flex flex-col items-center">
      <div className="md:hidden flex">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`font-staatliches tracking-wider text-sm px-4 py-2 flex items-center gap-2 rounded-md border ${actionNeutral} shadow-sm`}
          aria-label="Open controls menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          CONTROLS
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[250] flex items-center justify-center animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="relative bg-white/90 dark:bg-black/60 border border-gray-300/60 dark:border-white/10 rounded-2xl shadow-xl m-4 w-full max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {standaloneContent}
          </div>
        </div>
      )}
      {/* Desktop full controls (actions + filters) */}
      <div className="hidden md:flex w-full flex-col gap-3">
        {desktopActions}
        <div
          role="group"
          aria-label="Filter evidence types"
          className="flex flex-wrap justify-center items-center gap-2"
        >
          {allTypes.map((type) => {
            const active = activeFilters.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                aria-pressed={active}
                className={`${baseBtn} capitalize ${
                  active ? filterActive : filterInactive
                }`}
              >
                {type.replace(/-/g, " ")}
              </button>
            );
          })}
        </div>
      </div>
      {dockActionsOnMobile &&
        mobileDockPortal &&
        mounted &&
        createPortal(mobileDockContent, document.body)}
      {dockActionsOnMobile && !mobileDockPortal && mobileDockContent}
      {dockActionsOnMobile && includeDockSpacer && (
        <div className="md:hidden h-16 w-full" aria-hidden />
      )}
    </div>
  );
};

export default BoardControls;
