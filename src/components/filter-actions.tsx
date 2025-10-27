"use client";
import React from "react";

// Action bar props (subset of FilterMenu props)
export interface FilterActionsProps {
  activeFilters: Set<string>;
  allTypes: string[];
  setActiveFilters: (filters: Set<string>) => void;
  handleResetView: () => void;
  setIsTimelineVisible: (visible: boolean) => void;
  handleAddNewNote: () => void;
  handleRequestClue: () => void;
  cluesLeft: number;
  className?: string;
  layout?: "horizontal" | "wrap"; // horizontal for mobile, wrap for desktop
  dockOnMobile?: boolean; // if true, renders a fixed bottom dock in mobile view
}

const FilterActions: React.FC<FilterActionsProps> = ({
  activeFilters,
  allTypes,
  setActiveFilters,
  handleResetView,
  setIsTimelineVisible,
  handleAddNewNote,
  handleRequestClue,
  cluesLeft,
  className = "",
  layout = "horizontal",
  dockOnMobile = false,
}) => {
  const noCluesLeft = cluesLeft === 0;

  const baseBtn = "font-staatliches tracking-wider text-sm md:text-base px-3 py-1 rounded-md transition-colors border";
  const neutralBtn = "bg-white/70 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 border-gray-300/60 dark:border-white/10";
  const actionBtn = "bg-yellow-300 hover:bg-yellow-400 text-yellow-900 dark:bg-yellow-500/30 dark:text-yellow-100 dark:hover:bg-yellow-500/50 border-yellow-300/70 dark:border-yellow-500/40";
  const dangerDisabled = "disabled:bg-gray-400/40 disabled:text-gray-600 disabled:cursor-not-allowed";

  const toggleAll = () => {
    setActiveFilters(activeFilters.size === allTypes.length ? new Set() : new Set(allTypes));
  };

  if (dockOnMobile) {
    // Mobile dock version + desktop inline group
    return (
      <>
        {/* Desktop actions (md+) */}
        <div
          role="group"
          aria-label="Board actions"
          className={`hidden md:flex ${layout === "horizontal" ? "items-center" : "flex-wrap items-center"} gap-2 ${className}`}
        >
          <button
            onClick={handleResetView}
            className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
            aria-label="Reset board view"
          >Reset</button>
            <button
              onClick={() => setIsTimelineVisible(true)}
              className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
              aria-label="Open timeline"
            >Timeline</button>
          <button
            onClick={handleAddNewNote}
            className={`${baseBtn} ${actionBtn} flex-shrink-0`}
            aria-label="Add note"
          >Note</button>
          <button
            onClick={handleRequestClue}
            disabled={noCluesLeft}
            className={`${baseBtn} ${actionBtn} ${dangerDisabled} flex-shrink-0`}
            aria-label="Request clue"
          >Clue ({cluesLeft})</button>
          <button
            onClick={toggleAll}
            className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
            aria-label={activeFilters.size === allTypes.length ? 'Hide all evidence types' : 'Show all evidence types'}
          >{activeFilters.size === allTypes.length ? 'Hide All' : 'Show All'}</button>
        </div>
        {/* Mobile dock */}
        <div
          className="md:hidden fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-[960px] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex gap-2 backdrop-blur-md rounded-t-xl border border-gray-300/60 dark:border-white/10 bg-white/85 dark:bg-black/70 shadow-xl"
          role="group"
          aria-label="Board actions dock"
        >
          <button
            onClick={handleResetView}
            aria-label="Reset board view"
            className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0112.82-5.303L21 10M4.5 12a7.5 7.5 0 0012.82 5.303L21 14M4.5 12H3" />
            </svg>
            <span className="leading-tight">Reset</span>
          </button>
          <button
            onClick={() => setIsTimelineVisible(true)}
            aria-label="Open timeline"
            className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span className="leading-tight">Timeline</span>
          </button>
          <button
            onClick={handleAddNewNote}
            aria-label="Add note"
            className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <span className="leading-tight">Note</span>
          </button>
          <button
            onClick={handleRequestClue}
            aria-label="Request clue"
            disabled={noCluesLeft}
            className={`group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md transition ${noCluesLeft ? 'bg-gray-300/40 text-gray-500 dark:bg-white/10 dark:text-gray-600 cursor-not-allowed' : 'bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.25v2.25m0-2.25a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
            <span className="leading-tight">Clue ({cluesLeft})</span>
          </button>
          <button
            onClick={toggleAll}
            aria-label={activeFilters.size === allTypes.length ? 'Hide all evidence types' : 'Show all evidence types'}
            aria-pressed={activeFilters.size === allTypes.length}
            className={`group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md transition ${activeFilters.size === allTypes.length ? 'bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20'}`}
          >
            {activeFilters.size === allTypes.length ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0112 6c2.5 0 4.8.855 6.62 2.223M4 8l8 8m8-8l-8 8" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.683.07.207.07.431 0 .639C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678zM12 15a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            )}
            <span className="leading-tight">{activeFilters.size === allTypes.length ? 'Hide All' : 'Show All'}</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      role="group"
      aria-label="Board actions"
      className={`flex ${layout === "horizontal" ? "items-center" : "flex-wrap items-center"} gap-2 ${className}`}
    >
      <button
        onClick={handleResetView}
        className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
        aria-label="Reset board view"
      >Reset</button>
      <button
        onClick={() => setIsTimelineVisible(true)}
        className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
        aria-label="Open timeline"
      >Timeline</button>
      <button
        onClick={handleAddNewNote}
        className={`${baseBtn} ${actionBtn} flex-shrink-0`}
        aria-label="Add note"
      >Note</button>
      <button
        onClick={handleRequestClue}
        disabled={noCluesLeft}
        className={`${baseBtn} ${actionBtn} ${dangerDisabled} flex-shrink-0`}
        aria-label="Request clue"
      >Clue ({cluesLeft})</button>
      <button
        onClick={toggleAll}
        className={`${baseBtn} ${neutralBtn} flex-shrink-0`}
        aria-label={activeFilters.size === allTypes.length ? 'Hide all evidence types' : 'Show all evidence types'}
      >{activeFilters.size === allTypes.length ? 'Hide All' : 'Show All'}</button>
    </div>
  );
};

export default FilterActions;
