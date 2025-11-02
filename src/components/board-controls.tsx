"use client";
import React from "react";
import { createPortal } from "react-dom";
import {
  CalendarSearch,
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
  handleDeclutter: () => void; // new declutter layout action
  isDecluttered?: boolean; // indicates current declutter state for toggle label
  cluesLeft: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  variant?: "integrated" | "standalone"; // integrated: inside header; standalone: modal style
  dockActionsOnMobile?: boolean; // if true actions rendered as bottom dock in mobile view
  mobileDockPortal?: boolean; // render dock via portal to body for reliable positioning
  includeDockSpacer?: boolean; // add spacer div to prevent overlap with page content
  // Zoom + Pan Only mode additions
  scale?: number; // current zoom level
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  panOnly?: boolean; // when true board items are not interactive (only panning/zooming allowed)
  togglePanOnly?: () => void;
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
  handleDeclutter,
  isDecluttered,
  cluesLeft,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  variant = "integrated",
  dockActionsOnMobile = true,
  mobileDockPortal = true,
  includeDockSpacer = true,
  scale = 1,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  panOnly = false,
  togglePanOnly,
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
      {/* Zoom group */}
      {onZoomOut && onZoomIn && (
        <div
          className="flex items-center gap-1 mr-2"
          aria-label="Zoom controls"
        >
          <button
            onClick={onZoomOut}
            aria-label="Zoom out"
            className={`${baseBtn} ${actionNeutral}`}
          >
            -
          </button>
          <span
            className="text-[11px] font-mono min-w-[46px] text-center select-none"
            aria-live="polite"
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            aria-label="Zoom in"
            className={`${baseBtn} ${actionNeutral}`}
          >
            +
          </button>
          <button
            onClick={onZoomReset}
            aria-label="Reset zoom"
            className={`${baseBtn} ${actionNeutral}`}
          >
            100%
          </button>
        </div>
      )}
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
        onClick={handleDeclutter}
        className={`${baseBtn} ${actionNeutral}`}
      >
        {isDecluttered ? "Undo" : "Declutter"}
      </button>
      {togglePanOnly && (
        <button
          onClick={togglePanOnly}
          aria-pressed={panOnly}
          className={`${baseBtn} ${panOnly ? actionPrimary : actionNeutral}`}
        >
          {panOnly ? "Pan Only: ON" : "Pan Only"}
        </button>
      )}
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
        onClick={handleDeclutter}
        className="group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="leading-tight">
          {isDecluttered ? "Undo" : "Declutter"}
        </span>
      </button>
      {togglePanOnly && (
        <button
          onClick={togglePanOnly}
          aria-pressed={panOnly}
          className={`group flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 px-1 py-1 text-[10px] font-semibold tracking-wide font-staatliches rounded-md transition ${
            panOnly
              ? "bg-yellow-300 dark:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-400 dark:hover:bg-yellow-500/50"
              : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.8113 1.64706C6.62188 2.87918 6.68268 3.88523 6.76848 5.30499C6.78415 5.56426 6.80065 5.83732 6.81661 6.12808C6.83111 6.39208 6.63758 6.62172 6.37495 6.65217C6.11232 6.68262 5.87138 6.50334 5.82509 6.24304L5.74754 5.80698C5.64402 5.16529 5.48355 4.25481 5.17807 3.44741C4.86241 2.61312 4.4486 2.04121 3.93436 1.86044C3.64994 1.76104 3.41901 1.84279 3.25868 2.01052C3.08746 2.18962 2.9976 2.47065 3.0627 2.75399C3.2146 3.34424 3.44627 3.9167 3.69836 4.51802C3.72082 4.57158 3.74346 4.62543 3.76621 4.67954C3.9954 5.22457 4.23619 5.7972 4.41644 6.39081L4.41691 6.39238C4.562 6.87586 4.65646 7.2595 4.73086 7.56165C4.76034 7.68138 4.78667 7.78831 4.81175 7.88359C4.86768 8.09606 4.77836 8.32014 4.59161 8.43588C4.40486 8.55161 4.16445 8.53188 3.99907 8.38725C3.73749 8.15848 3.515 7.92784 3.31817 7.71802C3.27627 7.67335 3.23602 7.63018 3.19705 7.58838C3.04777 7.42826 2.91712 7.28812 2.78334 7.16029C2.45989 6.85122 2.18398 6.68004 1.80585 6.64369L1.80324 6.64343C1.56117 6.61888 1.41402 6.66441 1.31756 6.72627C1.21899 6.78947 1.11988 6.90414 1.03784 7.1123C0.976576 7.28492 1.01515 7.62987 1.1929 7.96911L1.19728 7.97747C1.40086 8.38452 1.74475 8.81587 2.18141 9.29299C2.39739 9.52898 2.62872 9.76849 2.86934 10.0174L2.87966 10.0281C3.11546 10.2721 3.35962 10.5247 3.59713 10.7827C4.4288 11.6863 5.27706 12.7538 5.4627 14H11.5087C11.5636 12.4353 11.8756 11.268 12.2875 10.1346C12.4454 9.70041 12.6121 9.28412 12.7826 8.85829C13.1097 8.04139 13.4509 7.18937 13.7705 6.10824C14.0989 4.99737 14.0097 4.37033 13.8613 4.03984C13.717 3.71858 13.4914 3.61786 13.3816 3.59606C13.1381 3.54774 13.0384 3.60947 12.9698 3.67901C12.867 3.78316 12.7698 3.98273 12.6921 4.30269C12.6166 4.61345 12.5752 4.96517 12.533 5.32501L12.5298 5.35285C12.4924 5.67242 12.4505 6.03016 12.3665 6.30098C12.3383 6.40699 12.2819 6.50407 12.1979 6.57539C12.1382 6.6261 12.0104 6.70818 11.8309 6.69312C11.5424 6.66891 11.3712 6.42143 11.365 6.14783C11.356 5.75454 11.3883 5.35864 11.4074 4.96608C11.4428 4.23646 11.477 3.5337 11.4245 2.8342L11.4242 2.82934C11.3916 2.32997 11.0493 2.00228 10.7007 1.9228C10.5305 1.88401 10.369 1.90601 10.2347 1.9835C10.103 2.05946 9.95535 2.21318 9.8574 2.51394L9.85631 2.51726C9.81525 2.6404 9.77298 2.87753 9.73606 3.2124C9.70044 3.53542 9.67337 3.91279 9.65156 4.29418C9.6329 4.62033 9.61785 4.9584 9.60434 5.26194C9.58728 5.64529 9.57267 5.97357 9.55633 6.1532C9.54983 6.22459 9.52939 6.29493 9.49501 6.35785C9.47356 6.39711 9.36115 6.60947 9.07106 6.61843C8.77917 6.62744 8.63975 6.40057 8.61698 6.35919C8.55634 6.24899 8.55066 6.11807 8.54754 5.99283C8.54474 5.88064 8.54294 5.71798 8.54174 5.54767C8.53935 5.20582 8.53935 4.81919 8.53935 4.70952C8.53935 3.6657 8.53838 2.65372 8.44714 1.64372C8.39183 1.24127 8.06278 1.00455 7.6436 1.00005C7.22399 0.995552 6.87918 1.22704 6.8113 1.64706ZM9.41219 1.3617C9.21469 0.448484 8.39913 0.00810324 7.65433 0.00011154C6.86452 -0.00836308 5.98761 0.465881 5.82365 1.49037L5.82318 1.49334C5.78239 1.7584 5.75229 2.01481 5.7309 2.26652C5.39423 1.67364 4.92622 1.14894 4.2655 0.916859C3.58661 0.679312 2.9492 0.887087 2.53582 1.31952C2.13415 1.73971 1.94438 2.36742 2.09031 2.98746L2.09269 2.99713C2.26478 3.66808 2.52396 4.30316 2.77613 4.90465C2.79814 4.95717 2.8201 5.00941 2.84194 5.06139C3.02139 5.48842 3.19378 5.89866 3.33871 6.31256C2.96404 5.98142 2.51925 5.70796 1.90276 5.6484C1.48865 5.60663 1.10391 5.67536 0.777805 5.88444C0.454239 6.0919 0.240671 6.40405 0.104187 6.75406L0.100868 6.76281C-0.10184 7.31286 0.0663312 7.97157 0.304895 8.42897C0.573704 8.96474 0.996104 9.47904 1.44372 9.96813C1.67046 10.2159 1.91136 10.4652 2.15033 10.7124L2.15682 10.7191C2.39524 10.9658 2.63217 11.2109 2.86134 11.4599C3.80937 12.49 4.50002 13.4632 4.50002 14.5C4.50002 14.7761 4.72388 15 5.00002 15H12C12.2762 15 12.5 14.7761 12.5 14.5C12.5 12.8212 12.8021 11.6462 13.2274 10.4762C13.3653 10.0968 13.5216 9.70579 13.6868 9.29247C14.0238 8.44922 14.398 7.51298 14.7295 6.39175C15.0956 5.15324 15.0559 4.25904 14.7735 3.63017C14.487 2.99208 13.9798 2.6953 13.5763 2.6152C13.1276 2.52614 12.7367 2.60475 12.4268 2.83081C12.4253 2.80773 12.4236 2.78468 12.4219 2.76167C12.3587 1.8105 11.6907 1.12285 10.923 0.947821C10.5346 0.859287 10.1111 0.900393 9.73509 1.11724C9.61852 1.18446 9.51055 1.26623 9.41219 1.3617Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>

          <span className="leading-tight">{panOnly ? "Pan ON" : "Pan"}</span>
        </button>
      )}
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
