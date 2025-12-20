/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, useMemo } from "react";
import {
  ITEM_TYPES,
  BoardItem,
  BoardData,
  BoardItemType,
  Objective,
} from "@/lib/boardTypes";

const getItemImageUrl = (item: BoardItem): string | undefined => {
  if (item.type !== "photo") return undefined;
  if (item.imageUrl && item.imageUrl.trim().length > 0)
    return withBase(item.imageUrl.trim());
  // Fallback: treat content as path/URL if it matches pattern
  if (/^(https?:\/\/|\/)/.test(item.content))
    return withBase(item.content.trim());
  return undefined;
};

const withBase = (path: string) => {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (base) {
    try {
      return new URL(path, base).toString();
    } catch {
      return path; // fallback
    }
  }
  return path; // root-relative works both locally and on Vercel
};

function Tape({ rotation }: { rotation?: number }) {
  return (
    <div
      className="absolute top-1 left-1 w-10 h-4 bg-yellow-300/80 opacity-70 mix-blend-multiply"
      style={{ transform: `rotate(${rotation || 0}deg)` }}
    />
  );
}

import Image from "next/image";
import ActivityLogPreview from "./activity-log-preview";
import AutopsyReportPreview from "./autopsy-report-preview";
import ElectronicMessagesPreview from "./electronic-messages-preview";
import FormalAlibiPreview from "./formal-alibi-preview";
import InterrogationTranscriptPreview from "./interrogation-transcript-preview";
import MapPreview from "./map-preview";
import MissingPersonReportPreview from "./missing-person-report-preview";
import NewspaperPreview from "./newspaper-preview";
import PersonOfInterestPreview from "./person-of-interest-preview";
import ReceiptPreview from "./receipt-preview";
import SearchAndRescueReportPreview from "./search-and-rescue-report-preview";
import TelephoneLogPreview from "./telephone-log-preview";
import TicketStubPreview from "./ticket-stub-preview";
// ---------------------------------------------------------------------------
// 1. EXTRACT CONTENT RENDERERS
// Strategy Pattern: Isolate specific item logic into small, testable chunks.
// ---------------------------------------------------------------------------

interface ContentRendererProps {
  item: BoardItem;
  isNew?: boolean;
}

export const CONTENT_RENDERERS: Record<string, React.FC<ContentRendererProps>> = {
  photo: ({ item }) => {
    const imageUrl = getItemImageUrl(item);
    return (
      <div className="w-full h-full p-2 bg-gray-700 border border-gray-500 overflow-hidden flex flex-col">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.content}
            width={item.size.width}
            height={item.size.height}
            className="w-full h-full object-cover"
            draggable={false} // Prevent native drag
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-300 text-xs p-1 bg-gray-800">
            <svg
              className="animate-spin h-5 w-5 text-gray-400 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-bold uppercase tracking-wider text-sm text-gray-400">
              [ ACQUIRING VISUALS... ]
            </span>
          </div>
        )}
        <Tape rotation={-15} />
      </div>
    );
  },

  document: ({ item }) => (
    <div className="w-full h-full bg-amber-50 text-black text-xs overflow-y-auto p-4 font-special-elite">
      <h3 className="font-bold text-sm mb-2 border-b border-black/20 text-red-900">
        TOP SECRET // EYES ONLY
      </h3>
      <p className="whitespace-pre-wrap">{item.content}</p>
    </div>
  ),

  note: ({ item, isNew }) => (
    <div
      className={`w-full h-full bg-yellow-200 text-black text-sm p-3 shadow-md font-kalam ${
        isNew ? "clue-item-appear" : ""
      }`}
    >
      <p>{item.content}</p>
      <Tape rotation={10} />
    </div>
  ),

  clue: ({ item, isNew }) => (
    <div
      className={`w-full h-full clue-item-effect text-black text-xs flex items-center justify-center text-center font-special-elite ${
        isNew ? "clue-item-appear" : ""
      }`}
    >
      <p>{item.content}</p>
    </div>
  ),

  "autopsy-report": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <AutopsyReportPreview content={item.content} />
      <Tape rotation={5} />
    </div>
  ),

  newspaper: ({ item }) => (
    <div className="w-full h-full">
      <NewspaperPreview content={item.content} />
    </div>
  ),

  ticket: ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <TicketStubPreview content={item.content} />
    </div>
  ),

  "activity-log": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <ActivityLogPreview content={item.content} />
    </div>
  ),

  map: ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <MapPreview content={item.content} />
    </div>
  ),

  "electronic-messages": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <ElectronicMessagesPreview content={item.content} />
    </div>
  ),

  "missing-person-report": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <MissingPersonReportPreview content={item.content} />
      <Tape rotation={-4} />
    </div>
  ),

  "search-and-rescue-report": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <SearchAndRescueReportPreview content={item.content} />
      <Tape rotation={3} />
    </div>
  ),

  "formal-alibi": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <FormalAlibiPreview content={item.content} />
      <Tape rotation={-5} />
    </div>
  ),

  "interrogation-transcript": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <InterrogationTranscriptPreview content={item.content} />
      <Tape rotation={8} />
    </div>
  ),

  "folder-tab": ({ item }) => (
    <div className="w-full h-full bg-yellow-600 text-white text-xs p-1 px-3 flex items-center justify-center uppercase font-staatliches tracking-wider">
      {item.content}
    </div>
  ),

  diary: ({ item }) => {
    let diarySummary: { days: number; title?: string } = { days: 0 };
    try {
      const parsed = JSON.parse(item.content);
      const days = Array.isArray(parsed?.diaryEntries)
        ? parsed.diaryEntries.length
        : 0;
      diarySummary = { days, title: parsed?.title };
    } catch {
      diarySummary = { days: 1 };
    }

    return (
      <div className="w-full h-full bg-[#3b2f24] text-amber-100 text-xs p-2 font-special-elite border-2 border-[#6d543d] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wider font-staatliches text-[11px]">
            Diary
          </span>
          <span className="text-[10px] opacity-70">
            {diarySummary.days} {diarySummary.days === 1 ? "day" : "days"}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-center px-1">
          <span
            className="font-semibold truncate w-full"
            title={diarySummary.title || item.content}
          >
            {diarySummary.title || "Field Notes"}
          </span>
        </div>
        <div className="h-2 bg-gradient-to-r from-[#6d543d] to-[#3b2f24] rounded-sm mt-1" />
      </div>
    );
  },

  "person-of-interest-report": ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <PersonOfInterestPreview content={item.content} />
      <Tape rotation={-7} />
    </div>
  ),

  receipt: ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <ReceiptPreview content={item.content} />
      <Tape rotation={12} />
    </div>
  ),

  phoneLog: ({ item }) => (
    <div className="w-full h-full overflow-hidden">
      <TelephoneLogPreview content={item.content} />
    </div>
  ),
  
  // Fallback for unknown types
  default: () => null,
};

// ---------------------------------------------------------------------------
// 2. CREATE A REUSABLE CONTAINER
// Handles the "Physics" (Drag, Drop, Connect) and shared DOM attributes.
// ---------------------------------------------------------------------------

interface ItemContainerProps {
  item: BoardItem;
  style: CSSProperties;
  className: string;
  handlers: React.HTMLAttributes<HTMLDivElement>;
  itemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  children: React.ReactNode;
}

const BoardItemContainer = ({
  item,
  style,
  className,
  handlers,
  itemRefs,
  children,
}: ItemContainerProps) => {
  // Callback ref optimization to handle Map updates cleanly
  const setRef = (el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(item.id, el);
    else itemRefs.current.delete(item.id);
  };

  return (
    <div
      ref={setRef}
      id={`board-item-${item.id}`} // Helpful for debugging
      style={style}
      className={className}
      {...handlers}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. MAIN COMPONENT
// Focuses on State Derivation and Composition
// ---------------------------------------------------------------------------

interface BoardItemProps {
  item: BoardItem;
  draggingItem: BoardItem | null;
  connectingState: { from: string | null };
  animateLayout: boolean;
  panOnly: boolean;
  newItemId: string | null;
  // Handlers passed from parent to avoid closure stale state
  onItemInteraction: any;
  itemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}

const renderBoardItemComponent = React.memo(
  ({
    item,
    draggingItem,
    connectingState,
    animateLayout,
    panOnly,
    newItemId,
    onItemInteraction,
    itemRefs,
  }: BoardItemProps) => {
    // 3a. Derive State
    const isDragging = draggingItem?.id === item.id;
    const isConnectingFrom = connectingState.from === item.id;
    const isAnyItemDragging = !!draggingItem;

    // 3b. Memoize Styles (Performance optimization)
    const containerStyle = useMemo(() => {
      const baseStyle: CSSProperties & {
        [key: `--${string}`]: string | number;
      } = {
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        width: `${item.size.width}px`,
        height: `${item.size.height}px`,
        "--tw-rotate": `${item.rotation}deg`,
        "--tw-scale-x": isDragging ? "1.05" : "1",
        "--tw-scale-y": isDragging ? "1.05" : "1",
        transformOrigin: "center center",
        zIndex: isDragging || isConnectingFrom ? 100 : 10,
        userSelect: "none",
        pointerEvents: panOnly ? "none" : "auto",
        cursor: connectingState.from
          ? "crosshair"
          : isDragging
          ? "grabbing"
          : "grab",
      };
      return baseStyle;
    }, [
      item.position,
      item.size,
      item.rotation,
      isDragging,
      isConnectingFrom,
      panOnly,
      connectingState.from,
    ]);

    // 3c. Construct Classes (Using template literals for readability)
    const className = useMemo(() => {
      const transitions = animateLayout
        ? "transition-[left,top] duration-500 ease-in-out"
        : "transition-all duration-200";

      let stateClasses = "";

      if (isDragging) {
        stateClasses = "shadow-2xl shadow-yellow-400/20 z-[100]";
      } else {
        // Idle state
        if (!isAnyItemDragging) {
          stateClasses =
            "hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-400/20 hover:z-20";
        } else {
          // Dim if others are dragging
          stateClasses = "opacity-50";
        }
      }

      if (isConnectingFrom)
        stateClasses += " animate-pulse ring-2 ring-red-500";
      if (connectingState.from && !isConnectingFrom)
        stateClasses += " hover:ring-2 hover:ring-red-400";

      return `absolute shadow-lg shadow-black/60 transform-gpu ${transitions} ${stateClasses}`;
    }, [
      isDragging,
      isConnectingFrom,
      isAnyItemDragging,
      animateLayout,
      connectingState.from,
    ]);

    // 3d. Memoize Handlers
    const handlers = useMemo(
      () => ({
        onMouseDown: (e: any) => onItemInteraction.onMouseDown(e, item.id),
        onTouchStart: (e: any) => onItemInteraction.onTouchStart(e, item.id),
        onContextMenu: (e: any) => onItemInteraction.onContextMenu(e, item.id),
        onClick: (e: any) => onItemInteraction.onClick(e, item.id),
        title: item.content,
      }),
      [item.id, item.content, onItemInteraction]
    );

    // 3e. Select Renderer
    const Renderer = CONTENT_RENDERERS[item.type] || CONTENT_RENDERERS.default;

    return (
      <BoardItemContainer
        item={item}
        style={containerStyle}
        className={className}
        handlers={handlers}
        itemRefs={itemRefs}
      >
        <Renderer item={item} isNew={newItemId === item.id} />
      </BoardItemContainer>
    );
  },
  (prev, next) => {
    // SENIOR NOTE:
    // Returning 'true' here blindly (as in your original code) prevents updates
    // even if data changes.
    // A senior engineer would explicitly compare props, or remove this custom
    // comparator to rely on React.memo's default shallow comparison.
    // Assuming you want shallow comparison:
    return (
      prev.item === next.item &&
      prev.draggingItem === next.draggingItem &&
      prev.connectingState === next.connectingState &&
      prev.newItemId === next.newItemId
    );
  }
);

// Fixes the ESLint error
renderBoardItemComponent.displayName = "BoardItem";
export default renderBoardItemComponent;