"use client";
import React from "react";

export interface FilterMenuProps {
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
  variant?: 'integrated' | 'standalone'; // integrated = inside PlayHeader, adopts glass style; standalone retains original dark panel style
}

// Reusable FilterMenu extracted from play board page. Now driven entirely by props so it can live inside PlayHeader.
export const FilterMenu: React.FC<FilterMenuProps> = ({
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
  variant = 'integrated',
}) => {
  const noCluesLeft = cluesLeft === 0;

  // Shared button style tokens for cohesion with PlayHeader
  const baseBtn = "font-staatliches tracking-wider text-sm md:text-base px-3 py-1 rounded-md transition-colors border";
  const neutralBtn = "bg-white/70 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 border-gray-300/60 dark:border-white/10";
  const neutralSmallBtn = "bg-white/70 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 border-gray-300/60 dark:border-white/10";
  const actionBtn = "bg-yellow-300 hover:bg-yellow-400 text-yellow-900 dark:bg-yellow-500/30 dark:text-yellow-100 dark:hover:bg-yellow-500/50 border-yellow-300/70 dark:border-yellow-500/40";
  const dangerDisabled = "disabled:bg-gray-400/40 disabled:text-gray-600 disabled:cursor-not-allowed";
  const ghostBtn = "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15 border-gray-300/60 dark:border-white/10";

  const filterInactive = ghostBtn;
  const filterActive = actionBtn;

  const menuContent = (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-300/50 dark:border-white/10">
          <h3 className="font-staatliches tracking-wider text-xl text-gray-900 dark:text-gray-200">CONTROLS</h3>
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
        <h4 className="font-staatliches tracking-wider text-lg text-gray-700 dark:text-gray-300 mb-2">Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { handleResetView(); setIsMobileMenuOpen(false); }}
            className={`w-full text-center ${baseBtn} ${neutralSmallBtn}`}
          >Reset View</button>
          <button
            onClick={() => { setIsTimelineVisible(true); setIsMobileMenuOpen(false); }}
            className={`w-full text-center ${baseBtn} ${neutralSmallBtn}`}
          >Timeline</button>
          <button
            onClick={() => { handleAddNewNote(); setIsMobileMenuOpen(false); }}
            className={`w-full text-center ${baseBtn} ${actionBtn}`}
          >Add Note</button>
          <button
            onClick={() => { handleRequestClue(); setIsMobileMenuOpen(false); }}
            className={`w-full text-center ${baseBtn} ${actionBtn} ${dangerDisabled}`}
            disabled={noCluesLeft}
          >Request Clue ({cluesLeft})</button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <h4 className="font-staatliches tracking-wider text-lg text-gray-700 dark:text-gray-300 mb-2">Filter Evidence</h4>
        <button
          onClick={() => setActiveFilters(activeFilters.size === allTypes.length ? new Set() : new Set(allTypes))}
          className={`w-full mb-2 text-center ${baseBtn} ${neutralSmallBtn}`}
        >{activeFilters.size === allTypes.length ? "Hide All" : "Show All"}</button>
        <div className="grid grid-cols-2 gap-2">
          {allTypes.map((type) => {
            const active = activeFilters.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`${baseBtn} capitalize ${active ? filterActive : filterInactive}`}
              >{type.replace(/-/g, " ")}</button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className={`flex-shrink-0 flex flex-col items-center z-20 md:justify-center md:my-2 md:w-full w-full ${variant === 'integrated' ? 'rounded-xl' : ''}`}>
      {/* Integrated variant: docked mobile navigation */}
      {variant === 'integrated' && (
        <div className="md:hidden w-full -mx-1 px-1 pt-1 pb-1 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
          <button
            onClick={() => setActiveFilters(activeFilters.size === allTypes.length ? new Set() : new Set(allTypes))}
            className={`${baseBtn} ${neutralSmallBtn} flex-shrink-0`}
          >{activeFilters.size === allTypes.length ? 'Hide' : 'Show'} All</button>
          {allTypes.map(type => {
            const active = activeFilters.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`${baseBtn} flex-shrink-0 capitalize ${active ? filterActive : filterInactive}`}
              >{type.replace(/-/g, ' ')}</button>
            );
          })}
          <button
            onClick={handleResetView}
            className={`${baseBtn} ${neutralSmallBtn} flex-shrink-0`}
            aria-label="Reset view"
          >Reset</button>
            <button
              onClick={() => setIsTimelineVisible(true)}
              className={`${baseBtn} ${neutralSmallBtn} flex-shrink-0`}
              aria-label="Timeline"
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
        </div>
      )}
      {/* Standalone mobile button & modal (retained for non-integrated usage) */}
      {variant !== 'integrated' && (
        <div className="md:hidden flex">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`font-staatliches tracking-wider text-sm px-4 py-2 flex items-center gap-2 rounded-md border ${neutralSmallBtn} shadow-sm`}
            aria-label="Open controls menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            CONTROLS
          </button>
        </div>
      )}

      {/* Mobile Menu Modal */}
      {variant !== 'integrated' && isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[250] flex items-center justify-center animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="relative bg-white/90 dark:bg-black/60 border border-gray-300/60 dark:border-white/10 rounded-2xl shadow-xl m-4 w-full max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {menuContent}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => setActiveFilters(activeFilters.size === allTypes.length ? new Set() : new Set(allTypes))}
          className={`${baseBtn} ${neutralBtn}`}
        >{activeFilters.size === allTypes.length ? "Hide All" : "Show All"}</button>
        {allTypes.map((type) => {
          const active = activeFilters.has(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`${baseBtn} capitalize ${active ? filterActive : filterInactive}`}
            >{type.replace(/-/g, " ")}</button>
          );
        })}
        <button
          onClick={handleResetView}
          className={`${baseBtn} ${neutralBtn}`}
          aria-label="Reset board view to fit all items"
        >Reset View</button>
        <button
          onClick={() => setIsTimelineVisible(true)}
          className={`${baseBtn} ${neutralBtn}`}
          aria-label="Show case timeline"
        >Timeline</button>
        <button
          onClick={handleAddNewNote}
          className={`${baseBtn} ${actionBtn}`}
          aria-label="Add a new note to the board"
        >Add Note</button>
        <button
          onClick={handleRequestClue}
          className={`${baseBtn} ${actionBtn} ${dangerDisabled}`}
          disabled={noCluesLeft}
          aria-label="Request a new clue"
        >Request Clue ({cluesLeft})</button>
      </div>
    </div>
  );
};

export default FilterMenu;
