"use client";

import { useMemo, useState } from "react";

interface KitPurchaseDetailsProps {
  ratingValue: number;
  ratingCount: number;
  ratingStars: string;
  playerOptions: string[];
  selectedPlayers?: string;
  languages: string[];
  darkMode?: boolean;
}

export default function KitPurchaseDetails({
  ratingValue,
  ratingCount,
  ratingStars,
  playerOptions,
  selectedPlayers,
  languages,
  darkMode = false,
}: KitPurchaseDetailsProps) {
  const initialPlayer = useMemo(() => {
    if (selectedPlayers && playerOptions.includes(selectedPlayers)) {
      return selectedPlayers;
    }

    return playerOptions[0] ?? "";
  }, [playerOptions, selectedPlayers]);

  const [activePlayer, setActivePlayer] = useState(initialPlayer);
  const [activeLanguage, setActiveLanguage] = useState(languages[0] ?? "");

  const optionBaseClass =
    "inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
  const activeOptionClass = darkMode
    ? "border-amber-200/50 bg-amber-50 text-stone-950 shadow-[0_10px_24px_-20px_rgba(251,191,36,0.55)]"
    : "border-stone-900 bg-stone-900 text-white shadow-[0_10px_24px_-20px_rgba(28,25,23,0.45)]";
  const inactiveOptionClass = darkMode
    ? "border-white/15 bg-white/10 text-white/88 hover:border-white/30 hover:bg-white/15 hover:text-white"
    : "border-subtle-stroke bg-white/90 text-stone-800 hover:border-stone-900 hover:bg-white hover:text-stone-950";
  const sectionLabelClass = darkMode
    ? "text-xs uppercase tracking-[0.32em] text-white/55"
    : "text-xs uppercase tracking-[0.32em] text-text-secondary";
  const wrapperClass = darkMode
    ? "mt-6 space-y-8 rounded-[24px] border border-white/10 bg-black/15 p-4 backdrop-blur-sm"
    : "mt-6 space-y-8";
  const ratingWrapClass = darkMode
    ? "flex items-center gap-3 text-sm text-white/70"
    : "flex items-center gap-3 text-sm text-text-secondary";
  const ratingStarClass = darkMode
    ? "text-sm tracking-[0.2em] text-white sm:text-base"
    : "text-sm tracking-[0.2em] text-text-primary sm:text-base";
  const ratingValueClass = darkMode
    ? "font-medium text-white"
    : "font-medium text-text-primary";

  return (
    <div className={wrapperClass}>
      {(ratingValue > 0 || ratingCount > 0) && (
        <div className={ratingWrapClass}>
          <span className={ratingStarClass}>
            {ratingStars}
          </span>
          <span className={ratingValueClass}>
            {ratingValue.toFixed(1)}
          </span>
          {ratingCount > 0 && <span>({ratingCount})</span>}
        </div>
      )}

      {playerOptions.length > 0 && (
        <div>
          <p className={sectionLabelClass}>
            Players
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {playerOptions.map((option) => {
              const isActive = option === activePlayer;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActivePlayer(option)}
                  aria-pressed={isActive}
                  className={`${optionBaseClass} ${
                    isActive ? activeOptionClass : inactiveOptionClass
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <p className={sectionLabelClass}>
            Language
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {languages.map((language) => {
              const isActive = language === activeLanguage;

              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setActiveLanguage(language)}
                  aria-pressed={isActive}
                  className={`${optionBaseClass} ${
                    isActive ? activeOptionClass : inactiveOptionClass
                  }`}
                >
                  {language}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
