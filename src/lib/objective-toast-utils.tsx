import React from "react";
import type { BoardItem } from "@/lib/boardTypes";

type ObjectiveToastTone = "success" | "warning" | "error" | "info";

function toneClasses(tone: ObjectiveToastTone) {
  switch (tone) {
    case "success":
      return {
        badge: "text-emerald-700 dark:text-emerald-300",
        accent: "border-emerald-300/70 dark:border-emerald-400/40",
      };
    case "warning":
      return {
        badge: "text-amber-700 dark:text-amber-300",
        accent: "border-amber-300/70 dark:border-amber-400/40",
      };
    case "error":
      return {
        badge: "text-rose-700 dark:text-rose-300",
        accent: "border-rose-300/70 dark:border-rose-400/40",
      };
    default:
      return {
        badge: "text-gray-700 dark:text-gray-300",
        accent: "border-gray-300/70 dark:border-white/20",
      };
  }
}

export function ObjectiveToastCard({
  title,
  subtitle,
  meta,
  tone = "info",
  onDismiss,
  children,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: ObjectiveToastTone;
  onDismiss?: () => void;
  children?: React.ReactNode;
}) {
  const toneStyle = toneClasses(tone);

  return (
    <div
      className={`w-[min(30rem,92vw)] rounded-md border border-gray-300/60 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-sm backdrop-blur transition ${toneStyle.accent}`}
    >
      <div className="px-3 py-2 border-b border-gray-200/80 dark:border-white/10 flex items-start justify-between gap-3">
        <div>
          <p className={`font-staatliches tracking-wider text-xs uppercase ${toneStyle.badge}`}>
            {title}
          </p>
          {subtitle ? (
            <p className="font-special-elite text-[13px] text-gray-700 dark:text-gray-200 leading-snug mt-1">
              {subtitle}
            </p>
          ) : null}
        </div>
        {meta ? (
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-[2px] whitespace-nowrap">
            {meta}
          </span>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded border border-gray-300/80 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-white/15 transition"
          >
            <span aria-hidden="true" className="text-sm leading-none">×</span>
          </button>
        ) : null}
      </div>

      {children ? <div className="p-3 pt-2">{children}</div> : null}
    </div>
  );
}

export function UnlockedEvidenceToastContent({
  unlockedItems,
  onFocus,
  onDismiss,
}: {
  unlockedItems: BoardItem[];
  onFocus: (id: string) => void;
  onDismiss?: () => void;
}) {
  return (
    <ObjectiveToastCard
      title="Objective Solved"
      tone="success"
      meta={`${unlockedItems.length} items`}
      subtitle={`${unlockedItems.length} new evidence ${unlockedItems.length === 1 ? "item" : "items"} unlocked.`}
      onDismiss={onDismiss}
    >
      <ul className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {unlockedItems.map((item) => {
          const preview =
            item.title && item.title.trim().length > 0
              ? item.title
              : `${item.type} · ${item.id}`;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onFocus(item.id)}
                className="group w-full text-left px-2 py-1 rounded-md text-[11px] leading-tight font-mono bg-gray-100/70 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/10 text-gray-700 dark:text-gray-200 transition flex items-start gap-2"
              >
                <span className="flex-1 truncate font-special-elite" aria-label={`${item.type} content`}>
                  {preview || "(empty)"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-3 h-3 opacity-40 group-hover:opacity-80 transition"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </ObjectiveToastCard>
  );
}

export function ObjectiveStatusToastContent({
  title,
  message,
  tone,
  onDismiss,
}: {
  title: string;
  message: string;
  tone: ObjectiveToastTone;
  onDismiss?: () => void;
}) {
  return (
    <ObjectiveToastCard
      title={title}
      subtitle={message}
      tone={tone}
      onDismiss={onDismiss}
    />
  );
}
