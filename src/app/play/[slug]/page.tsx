/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MissionLoading from "@/components/mission-loading";

import React from "react";
import { getCaseBySlug } from "@/data/coldCases";
import Image from "next/image";
import { notFound } from "next/navigation";
import PlayHeader from "@/components/play-header";
import EvidencePanel from "@/components/evidence-panel";
import TimelinePanel from "@/components/timeline-panel";

// Removed unused Type import (schemas are server-side)
import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  CSSProperties,
} from "react";
import ObjectivesPanel from "@/components/objectives-panel";

// Removed unused PlayPageProps interface

const PREDEFINED_IMAGES = {
  "Dr Verma image":
    "https://github.com/user-attachments/assets/83616c10-f1b9-4d45-924b-f7e2d06fea61",
  "Mrs Sharma image":
    "https://github.com/user-attachments/assets/5bc1200d-2c58-47a2-83fe-b9834eb1bd60",
  "Nurse Agnes image":
    "https://github.com/user-attachments/assets/8cbb6265-dcda-4a03-aca4-cf57cfff4ccf",
  "Rohan Sharma image":
    "https://github.com/user-attachments/assets/5e7a703d-2dbf-4661-8838-4e7fce270f91",
  "Karan Kholi image":
    "https://github.com/user-attachments/assets/ca6bea85-0753-4a2d-8114-1c537df204e3",
};

const PREDEFINED_CLUES = [
  "A faint scent of almond in the air...",
  "The victim's watch is stopped at 3:14.",
  "A single, muddy boot print near the back door, too small for the victim.",
  "A torn piece of a prescription for a powerful sedative.",
  "Two coffee cups on the table, but the victim lived alone.",
  "The library book is overdue. The title? 'A Perfect Poison'.",
  "A dog that didn't bark in the night.",
  "A hastily scribbled note: 'Meet me at the pier. Urgent.'",
];

// Removed unused boardItemSchema (server-side generation only now)

// Schemas moved server-side; removed unused client definitions.

import {
  ITEM_TYPES,
  BoardItem,
  BoardData,
  BoardItemType,
  Objective,
} from "../../../lib/boardTypes";
import { computeDeclutterLayout } from "../../../lib/declutter";

// Minimal decorative tape component (placeholder for previous implementation)
function Tape({ rotation }: { rotation?: number }) {
  return (
    <div
      className="absolute top-1 left-1 w-10 h-4 bg-yellow-300/80 opacity-70 mix-blend-multiply"
      style={{ transform: `rotate(${rotation || 0}deg)` }}
    />
  );
}

// Simplified context menu (replacing earlier extracted component)
function ContextMenu({
  visible,
  x,
  y,
  onClose,
  onDelete,
  onEdit,
  onConnect,
}: {
  visible: boolean;
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onConnect: () => void;
}) {
  if (!visible) return null;
  return (
    <div
      className="fixed z-[400] bg-gray-900 border border-gray-700 rounded shadow-lg text-sm"
      style={{ left: x, top: y }}
      onMouseLeave={onClose}
    >
      <button
        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
        onClick={onConnect}
      >
        Connect
      </button>
      <button
        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

// Provide sensible baseline sizes so AI-generated tiny dimensions are normalized.
const DEFAULT_ITEM_SIZES: Record<
  BoardItemType,
  { width: number; height: number }
> = {
  photo: { width: 220, height: 220 },
  document: { width: 260, height: 190 },
  note: { width: 180, height: 180 },
  clue: { width: 200, height: 100 },
  "folder-tab": { width: 140, height: 48 },
  "autopsy-report": { width: 300, height: 130 },
  "formal-alibi": { width: 250, height: 160 },
  "interrogation-transcript": { width: 270, height: 170 },
  newspaper: { width: 300, height: 200 },
};

function normalizeItemSize(item: BoardItem): BoardItem {
  const defaults = DEFAULT_ITEM_SIZES[item.type];
  if (!defaults) return item;
  const minWidth = defaults.width * 0.7;
  const minHeight = defaults.height * 0.7;
  let { width, height } = item.size;
  if (!width || width < minWidth) width = defaults.width;
  if (!height || height < minHeight) height = defaults.height;
  return { ...item, size: { width, height } };
}

// Lightweight viewers extracted from earlier inline markup accidentally injected.
function AutopsyReportViewer({ content }: { content: string }) {
  let parsedContent: Record<string, string> = {};
  try {
    const maybe = JSON.parse(content);
    if (maybe && typeof maybe === "object") parsedContent = maybe;
  } catch {
    // Fallback: attempt to split by lines with KEY: VALUE pattern
    content.split(/\n+/).forEach((line) => {
      const match = line.match(/^(.*?):\s*(.*)$/);
      if (match) parsedContent[match[1].trim()] = match[2].trim();
    });
  }
  return (
    <div className="bg-[#f6f2e8] text-black p-6 font-special-elite max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-center mb-2">
        OFFICE OF THE CHIEF MEDICAL EXAMINER
      </h2>
      <h3 className="text-lg text-center border-b-2 border-black pb-4 mb-6">
        AUTOPSY REPORT
      </h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
        {Object.entries(parsedContent).map(([key, value]) => {
          if (key.toLowerCase().includes("findings")) return null;
          return (
            <div key={key}>
              <p className="font-bold text-gray-600">{key}:</p>
              <p className="pl-2 whitespace-pre-wrap">{String(value)}</p>
            </div>
          );
        })}
      </div>
      <div className="text-sm">
        {(parsedContent["SUMMARY OF FINDINGS"] ||
          parsedContent["FINDINGS"]) && (
          <>
            <h4 className="font-bold text-gray-600 border-b border-black/50 mb-2">
              SUMMARY OF FINDINGS
            </h4>
            <p className="whitespace-pre-wrap">
              {parsedContent["SUMMARY OF FINDINGS"] ||
                parsedContent["FINDINGS"]}
            </p>
          </>
        )}
      </div>
      <div className="mt-16 text-sm">
        <div className="w-1/2 float-right text-center">
          <p className="border-t border-black pt-2">
            SIGNATURE OF MEDICAL EXAMINER
          </p>
        </div>
      </div>
    </div>
  );
}

function NewspaperClipping({
  content,
  isModal,
}: {
  content: string;
  isModal: boolean;
}) {
  let data: { headline?: string; body?: string; date?: string } = {};
  try {
    data = JSON.parse(content);
  } catch {
    data = { headline: "UNPARSEABLE CLIPPING", body: content };
  }
  return (
    <div
      className={`bg-[#fdf7e3] text-black font-special-elite p-3 border border-gray-500 ${
        isModal ? "max-w-2xl" : "text-[10px]"
      }`}
    >
      <h4 className="font-bold text-center tracking-wide mb-1 uppercase">
        {data.headline || "UNTITLED"}
      </h4>
      {data.date && (
        <p className="text-center text-[10px] mb-2 opacity-70">{data.date}</p>
      )}
      <p className="whitespace-pre-wrap leading-snug">{data.body || ""}</p>
    </div>
  );
}

// FIX: Add explicit prop types to resolve TypeScript error on `item.content`.
function Modal({
  item,
  onClose,
  imageUrl,
}: {
  item: BoardItem;
  onClose: () => void;
  imageUrl?: string;
}) {
  useEffect(() => {
    const handleEsc = (e: { key: string }) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const renderContent = () => {
    switch (item.type) {
      case "photo":
        if (imageUrl) {
          return (
            <Image
              src={imageUrl}
              alt={item.content}
              width={900}
              height={900}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
          );
        }
        return (
          <div className="text-gray-300 p-8">[ ACQUIRING VISUALS... ]</div>
        );
      case "document":
        return (
          <div className="bg-amber-50 text-black p-4 font-special-elite max-w-2xl whitespace-pre-wrap">
            <h3 className="font-bold text-lg mb-4 border-b border-black/20 text-red-900">
              TOP SECRET // EYES ONLY
            </h3>
            <p>{item.content}</p>
          </div>
        );
      case "note":
        return (
          <div className="bg-yellow-200 text-black p-4 font-kalam text-lg max-w-lg">
            <p>{item.content}</p>
          </div>
        );
      case "clue":
        return (
          <div className="bg-[#f0e6d6] text-black p-8 font-special-elite max-w-md w-full border-t-8 border-red-700">
            <h3 className="text-sm uppercase text-center text-red-900/80 tracking-widest mb-6">
              EVIDENCE LOG: CLUE
            </h3>
            <p className="text-3xl text-center leading-relaxed">
              {item.content}
            </p>
          </div>
        );
      case "autopsy-report":
        return <AutopsyReportViewer content={item.content} />;
      case "formal-alibi":
        return (
          <div className="bg-slate-100 text-black p-6 font-special-elite max-w-2xl whitespace-pre-wrap">
            <h3 className="font-bold text-xl mb-1 text-center">
              OFFICIAL STATEMENT OF ALIBI
            </h3>
            <p className="text-center text-xs mb-4 border-b-2 border-black pb-2">
              CASE FILE: 044-SHADOWFALL
            </p>
            <p>{item.content}</p>
          </div>
        );
      case "interrogation-transcript":
        return (
          <div className="bg-gray-200 text-black p-6 font-mono text-sm max-w-3xl whitespace-pre-wrap">
            <h3 className="font-bold text-lg mb-1 text-center">
              INTERROGATION TRANSCRIPT
            </h3>
            <p className="text-center text-xs mb-4 border-b-2 border-black pb-2">
              CLASSIFIED // EYES ONLY
            </p>
            <p>{item.content}</p>
          </div>
        );
      case "newspaper":
        return <NewspaperClipping content={item.content} isModal={true} />;
      case "folder-tab":
        return (
          <div className="bg-yellow-600 text-white text-2xl p-4 uppercase font-staatliches tracking-wider">
            {item.content}
          </div>
        );
      default:
        return <p className="p-4">{item.content}</p>;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900/80 border border-gray-600 rounded-md shadow-lg p-4 m-4 max-w-[90vw] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close detail view"
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-3xl z-10 font-mono leading-none"
        >
          &times;
        </button>
        {renderContent()}
      </div>
    </div>
  );
}

interface TimelineViewProps {
  items: BoardItem[];
  onClose: () => void;
  onFocusItem: (itemId: string) => void;
}

type TimelineItem = {
  id: string;
  type: string;
  date: Date;
  title: string;
  summary: string;
  content: string;
};

function TimelineView({ items, onClose, onFocusItem }: TimelineViewProps) {
  const timelineItems: TimelineItem[] = useMemo(() => {
    const raw = items.filter(
      (i) => i.type === "newspaper" || i.type === "interrogation-transcript"
    );
    const parsed: TimelineItem[] = [];
    for (const item of raw) {
      try {
        if (item.type === "newspaper") {
          const data = JSON.parse(item.content);
          if (data.date && data.headline && data.body) {
            const dateObj = new Date(data.date);
            if (!isNaN(dateObj.getTime())) {
              parsed.push({
                id: item.id,
                type: item.type,
                date: dateObj,
                title: data.headline,
                summary: String(data.body).substring(0, 120) + "...",
                content: item.content,
              });
            }
          }
        } else {
          const dateMatch = item.content.match(/^INTERVIEW DATE: (.*)/m);
          const subjectMatch = item.content.match(/^SUBJECT: (.*)/m);
          if (dateMatch?.[1]) {
            const dateObj = new Date(dateMatch[1]);
            if (!isNaN(dateObj.getTime())) {
              const title = subjectMatch?.[1]
                ? `Interrogation: ${subjectMatch[1]}`
                : "Interrogation Transcript";
              const contentWithoutHeader = item.content
                .replace(/^INTERVIEW DATE: .*\n?/, "")
                .replace(/^SUBJECT: .*\n?/, "");
              parsed.push({
                id: item.id,
                type: item.type,
                date: dateObj,
                title,
                summary: contentWithoutHeader.trim().substring(0, 120) + "...",
                content: item.content,
              });
            }
          }
        }
      } catch (e) {
        console.warn("Failed to parse timeline item", item, e);
      }
    }
    return parsed.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [items]);

  const handleItemClick = (itemId: string) => {
    onFocusItem(itemId);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[300] flex flex-col p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div className="w-10"></div>
        <h2 className="text-3xl md:text-4xl text-center font-staatliches tracking-widest text-gray-300">
          CASE TIMELINE
        </h2>
        <button
          onClick={onClose}
          aria-label="Close timeline"
          className="text-gray-400 hover:text-white text-4xl font-mono leading-none"
        >
          &times;
        </button>
      </div>

      <div className="relative flex-grow overflow-y-auto pr-4">
        {timelineItems.length === 0 ? (
          <p className="text-center text-gray-500 font-special-elite mt-8">
            No chronological data available.
          </p>
        ) : (
          <>
            <div className="absolute top-0 left-4 md:left-1/2 w-0.5 h-full bg-red-500/50 transform md:-translate-x-1/2"></div>
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex items-start md:items-center w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item.id);
                  }}
                >
                  <div className="absolute top-5 md:top-1/2 -translate-y-1/2 bg-gray-800 border-2 border-red-500 rounded-full p-2 z-10 left-[-2px] md:left-1/2 md:-translate-x-1/2">
                    {item.type === "newspaper" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zM8 6a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm-4 5a1 1 0 100 2h4a1 1 0 100-2H8z" />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`relative w-full p-4 bg-gray-900/80 border border-gray-700 rounded-md shadow-lg cursor-pointer hover:border-yellow-400 hover:shadow-yellow-400/20 transition-all duration-300 ml-12 md:ml-0 md:w-1/2 
                                        ${
                                          index % 2 === 0
                                            ? "md:pl-10 md:text-left md:mr-auto"
                                            : "md:pr-10 md:text-right md:ml-auto"
                                        }`}
                  >
                    <p className="font-special-elite text-sm text-yellow-400 mb-1">
                      {item.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="font-bold font-staatliches tracking-wide text-lg text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-special-elite">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ObjectiveSolverModal({
  objective,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  objective: Objective;
  onClose: () => void;
  onSubmit: (objectiveId: string, solution: string) => void;
  isSubmitting: boolean;
}) {
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const handleEsc = (e: { key: string }) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(objective.id, solution);
  };

  if (!objective) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[350] flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900 border border-yellow-500/50 rounded-md shadow-lg p-6 m-4 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-staatliches tracking-wider text-yellow-400 mb-2">
          SOLVE OBJECTIVE
        </h2>
        <p className="font-special-elite text-gray-300 mb-4 border-t border-b border-gray-700 py-3">
          {objective.description}
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="solution-text"
            className="font-special-elite text-sm text-gray-400"
          >
            Enter your findings or theory:
          </label>
          <textarea
            id="solution-text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full h-32 p-2 mt-1 bg-gray-800 border border-gray-600 rounded-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono"
            placeholder="Detail your conclusions here..."
            required
          />
          <div className="flex justify-end items-center mt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="font-staatliches tracking-wider px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-staatliches tracking-wider px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400 rounded-sm transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Analyzing...
                </>
              ) : (
                "Submit Findings"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// FilterMenu moved to dedicated component and integrated inside PlayHeader.

// Adapt to upcoming Next.js change where params may be a Promise.
export default function PlayBoardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const caseFile = getCaseBySlug(slug);

  // FIX: Strongly type the boardData state to resolve property access errors on 'unknown' type for items.
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [lineCoords, setLineCoords] = useState<
    Array<{ x1: number; y1: number; x2: number; y2: number } | null>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(
    "CLASSIFIED: Generating Mission Briefing..."
  );
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Interaction states
  const [draggingItem, setDraggingItem] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeFilters, setActiveFilters] = useState<Set<BoardItemType>>(
    new Set(ITEM_TYPES)
  );
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    itemId: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    itemId: null,
  });
  const [connectingState, setConnectingState] = useState<{
    from: string | null;
  }>({ from: null });
  const [modalItem, setModalItem] = useState<BoardItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState(
    new Set<string>()
  );
  const [solvingObjective, setSolvingObjective] = useState<Objective | null>(
    null
  );
  const [isSubmittingObjective, setIsSubmittingObjective] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [usedClueIndices, setUsedClueIndices] = useState(new Set<number>());
  const [newItemId, setNewItemId] = useState<string | null>(null);

  const itemRefs = useRef(new Map());
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const pinchDistRef = useRef(0);
  // FIX: Provide a specific type for the useRef to fix clearTimeout errors.
  // Use ReturnType<typeof setTimeout> to correctly type the timer ID for both browser (number) and Node (Timeout) environments.
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const dragStartPoint = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  // Generate the board structure
  useEffect(() => {
    const generateBoard = async () => {
      try {
        const res = await fetch("/api/board/generate", { method: "POST" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const data = normalizeBoardData(raw);
        setBoardData(data);
        setLoadingMessage(null);
      } catch (err) {
        console.error("Failed to generate board data:", err);
        setError(
          "Failed to retrieve mission intel. The connection might be compromised."
        );
        setLoadingMessage(null);
      }
    };
    generateBoard();
  }, []);

  // Set image URLs from predefined list
  useEffect(() => {
    if (!boardData) return;

    const photoItems = boardData.items.filter((item) => item.type === "photo");

    const newUrls: Record<string, string> = {};
    for (const item of photoItems) {
      const matchingKey = Object.keys(PREDEFINED_IMAGES).find((key) =>
        item.content.includes(key)
      );
      if (matchingKey) {
        newUrls[item.id] =
          PREDEFINED_IMAGES[matchingKey as keyof typeof PREDEFINED_IMAGES];
      }
    }
    setImageUrls(newUrls);
  }, [boardData]);

  const visibleItems = useMemo(
    () => boardData?.items.filter((item) => activeFilters.has(item.type)) || [],
    [boardData, activeFilters]
  );
  const visibleItemIds = useMemo(
    () => new Set(visibleItems.map((item) => item.id)),
    [visibleItems]
  );

  useLayoutEffect(() => {
    if (!boardData || !boardData.connections || !viewportRef.current) return;

    const board = viewportRef.current as HTMLElement;
    // FIX: Explicitly type the Map to ensure that items retrieved from it (`fromItem`, `toItem`) are correctly typed as `BoardItem`. This resolves TypeScript errors where properties like `position` and `size` could not be found on an inferred `unknown` type.
    const itemsById: Map<string, BoardItem> = new Map(
      boardData.items.map((item) => [item.id, item])
    );

    const calculateAndSetLines = () => {
      const boardWidth = board.clientWidth;
      const boardHeight = board.clientHeight;
      if (boardWidth === 0 || boardHeight === 0) return;

      // The SVG is positioned at top: -100%, left: -100% of the board.
      // So its origin (0,0) is at board coordinates (-boardWidth, -boardHeight).
      const svgOriginOffset = {
        x: boardWidth,
        y: boardHeight,
      };

      const newCoords = boardData.connections
        .filter(
          (conn) => visibleItemIds.has(conn.from) && visibleItemIds.has(conn.to)
        )
        .map((conn) => {
          const fromItem = itemsById.get(conn.from);
          const toItem = itemsById.get(conn.to);

          if (fromItem && toItem) {
            // Calculate item center in the board's coordinate system (in pixels)
            const fromCenterX =
              (fromItem.position.x / 100) * boardWidth +
              fromItem.size.width / 2;
            const fromCenterY =
              (fromItem.position.y / 100) * boardHeight +
              fromItem.size.height / 2;
            const toCenterX =
              (toItem.position.x / 100) * boardWidth + toItem.size.width / 2;
            const toCenterY =
              (toItem.position.y / 100) * boardHeight + toItem.size.height / 2;

            // Translate board coordinates to the SVG's coordinate system
            return {
              x1: fromCenterX + svgOriginOffset.x,
              y1: fromCenterY + svgOriginOffset.y,
              x2: toCenterX + svgOriginOffset.x,
              y2: toCenterY + svgOriginOffset.y,
            };
          }
          return null;
        })
        .filter(Boolean);

      setLineCoords(newCoords);
    };

    calculateAndSetLines();

    const resizeObserver = new ResizeObserver(calculateAndSetLines);
    resizeObserver.observe(board);

    return () => {
      resizeObserver.disconnect();
    };
  }, [boardData, visibleItemIds]);

  // Zoom handler
  useEffect(() => {
    const viewportElement = viewportRef.current as unknown as HTMLElement;
    if (!viewportElement) return;

    const handleWheel = (e: {
      preventDefault: () => void;
      deltaY: number;
      clientX: number;
      clientY: number;
    }) => {
      e.preventDefault();
      const rect = viewportElement.getBoundingClientRect();
      const zoomSpeed = 0.1;

      const delta = e.deltaY > 0 ? -1 : 1;

      setPosition((prevPosition) => {
        setScale((currentScale) => {
          const newScale = Math.max(
            0.5,
            Math.min(3, currentScale + delta * zoomSpeed * currentScale)
          );
          // Removed unused contentX/contentY variables (calculation refactored)
          // newPosX/newPosY no longer needed after refactor; position recalculated below.
          return newScale;
        });
        // This is a bit of a hack to get around state updates not being immediate.
        // We calculate the new position based on the scale *before* the setScale has re-rendered.
        const newScale = Math.max(
          0.5,
          Math.min(3, scale + delta * zoomSpeed * scale)
        );
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const contentX = (mouseX - prevPosition.x) / scale;
        const contentY = (mouseY - prevPosition.y) / scale;
        return {
          x: mouseX - contentX * newScale,
          y: mouseY - contentY * newScale,
        };
      });
    };

    viewportElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewportElement.removeEventListener("wheel", handleWheel);
  }, [scale]);

  const handleItemMouseDown = (
    e: { stopPropagation: () => void; clientX: number; clientY: number },
    itemId: string
  ) => {
    e.stopPropagation();
    dragStartPoint.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
    const itemRef = itemRefs.current.get(itemId);
    if (!itemRef) return;
    const itemRect = itemRef.getBoundingClientRect();
    const offsetX = (e.clientX - itemRect.left) / scale;
    const offsetY = (e.clientY - itemRect.top) / scale;
    setDraggingItem({ id: itemId, offsetX, offsetY });
  };

  const handleItemTouchStart = (
    e: { stopPropagation: () => void; touches: string | any[] },
    itemId: string
  ) => {
    e.stopPropagation();
    if (e.touches.length > 1) return;

    const touch = e.touches[0];
    dragStartPoint.current = { x: touch.clientX, y: touch.clientY };
    didDrag.current = false;

    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    longPressTimer.current = setTimeout(() => {
      handleItemContextMenu(
        {
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => {},
        },
        itemId
      );
      longPressTimer.current = null;
    }, 500);

    const itemRef = itemRefs.current.get(itemId);
    if (!itemRef) return;
    const itemRect = itemRef.getBoundingClientRect();
    const offsetX = (touch.clientX - itemRect.left) / scale;
    const offsetY = (touch.clientY - itemRect.top) / scale;
    setDraggingItem({ id: itemId, offsetX, offsetY });
  };

  const handleBoardInteractionStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (connectingState.from) {
      setConnectingState({ from: null });
      return;
    }
    // For mouse events, check if the target is the board itself or its direct child
    if (
      e.target !== e.currentTarget &&
      (e.target as HTMLElement).parentElement !== e.currentTarget
    )
      return;

    if ("touches" in e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        pinchDistRef.current = dist;
        setIsPanning(true);
      } else {
        const point = e.touches[0];
        lastPanPoint.current = { x: point.clientX, y: point.clientY };
        setIsPanning(true);
      }
    } else {
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      setIsPanning(true);
    }
  };

  const handleInteractionMove = (e: {
    touches: string | any[];
    preventDefault: () => void;
    movementX: number;
    movementY: number;
  }) => {
    const isTouchEvent = "touches" in e;

    if (isTouchEvent && longPressTimer.current) {
      const touch = e.touches[0];
      const dist = Math.hypot(
        touch.clientX - touchStartPos.current.x,
        touch.clientY - touchStartPos.current.y
      );
      if (dist > 10) {
        // If finger moved more than 10px, cancel long press
        // FIX: Check if timer exists before clearing, as `clearTimeout` doesn't accept `null`.
        if (longPressTimer.current) clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
    if (isTouchEvent) e.preventDefault();

    const viewportRect = viewportRef.current?.getBoundingClientRect();
    if (!viewportRect) return;

    if (isTouchEvent && e.touches.length === 2 && isPanning) {
      const newDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );

      const rect = viewportRef.current?.getBoundingClientRect();
      const pinchMidpointX =
        (e.touches[0].pageX + e.touches[1].pageX) / 2 - (rect?.left || 0);
      const pinchMidpointY =
        (e.touches[0].pageY + e.touches[1].pageY) / 2 - (rect?.top || 0);

      setScale((currentScale) => {
        const scaleChange = newDist / pinchDistRef.current;
        const newScale = Math.max(0.5, Math.min(3, currentScale * scaleChange));

        // Recompute position to keep midpoint stable
        setPosition((currentPos) => {
          const contentX = (pinchMidpointX - currentPos.x) / currentScale;
          const contentY = (pinchMidpointY - currentPos.y) / currentScale;
          const newPosX = pinchMidpointX - contentX * newScale;
          const newPosY = pinchMidpointY - contentY * newScale;
          return { x: newPosX, y: newPosY };
        });

        pinchDistRef.current = newDist;
        return newScale;
      });
      return;
    }

    const point = isTouchEvent ? e.touches[0] : e;

    if (draggingItem && !didDrag.current) {
      const dist = Math.hypot(
        point.clientX - dragStartPoint.current.x,
        point.clientY - dragStartPoint.current.y
      );
      if (dist > 5) {
        // 5px threshold
        didDrag.current = true;
      }
    }

    if (draggingItem && (!isTouchEvent || longPressTimer.current === null)) {
      const newX_px =
        (point.clientX - viewportRect.left - position.x) / scale -
        draggingItem.offsetX;
      const newY_px =
        (point.clientY - viewportRect.top - position.y) / scale -
        draggingItem.offsetY;

      const newXPercent = (newX_px / viewportRect.width) * 100;
      const newYPercent = (newY_px / viewportRect.height) * 100;

      setBoardData((prevData) => {
        // If there's no previous data, keep it unchanged.
        if (!prevData) return prevData;
        return {
          ...prevData,
          items: prevData.items.map((item) =>
            item.id === draggingItem.id
              ? { ...item, position: { x: newXPercent, y: newYPercent } }
              : item
          ),
          // Ensure required arrays remain defined to match BoardData type.
          connections: prevData.connections,
          objectives: prevData.objectives,
        };
      });
    } else if (isPanning) {
      if (isTouchEvent) {
        const dx = point.clientX - lastPanPoint.current.x;
        const dy = point.clientY - lastPanPoint.current.y;
        setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPanPoint.current = { x: point.clientX, y: point.clientY };
      } else {
        setPosition((prev) => ({
          x: prev.x + (e as MouseEvent).movementX,
          y: prev.y + (e as MouseEvent).movementY,
        }));
      }
    }
  };

  const handleInteractionEnd = () => {
    // FIX: Check if timer exists before clearing, as `clearTimeout` doesn't accept `null`.
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (!longPressTimer.current) {
      // Prevents drag end if context menu was shown
      setDraggingItem(null);
    }
    setIsPanning(false);
    pinchDistRef.current = 0;
  };

  const toggleFilter = (type: BoardItemType) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(type)) {
        newFilters.delete(type);
      } else {
        newFilters.add(type);
      }
      return newFilters;
    });
  };

  const handleItemContextMenu = (
    e: { clientX: any; clientY: any; preventDefault: any },
    itemId: string
  ) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, itemId });
  };

  const closeContextMenu = () =>
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null });

  const handleDelete = () => {
    const { itemId } = contextMenu;
    if (!itemId) return;
    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId),
        connections: prev.connections.filter(
          (c) => c.from !== itemId && c.to !== itemId
        ),
      };
    });
    closeContextMenu();
  };

  const handleEdit = () => {
    const { itemId } = contextMenu;
    const item = boardData?.items.find((i) => i.id === itemId);
    if (!item) return;
    const newContent = prompt("Enter new content:", item.content);
    if (newContent !== null && newContent.trim() !== "") {
      setBoardData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === itemId ? { ...i, content: newContent } : i
          ),
          connections: prev.connections ?? [],
          objectives: prev.objectives ?? [],
        };
      });
    }
    closeContextMenu();
  };

  const handleStartConnection = () => {
    setConnectingState({ from: contextMenu.itemId });
    closeContextMenu();
  };

  const handleItemClick = (
    e: { stopPropagation: () => void },
    itemId: string
  ) => {
    if (didDrag.current) return;

    const fromId = connectingState.from;

    if (fromId) {
      if (fromId !== itemId) {
        const connectionExists = boardData?.connections.some(
          (c) =>
            (c.from === fromId && c.to === itemId) ||
            (c.from === itemId && c.to === fromId)
        );
        if (!connectionExists) {
          setBoardData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              connections: [...prev.connections, { from: fromId, to: itemId }],
            };
          });
        }
        setConnectingState({ from: null });
        e.stopPropagation();
      } else {
        setConnectingState({ from: null });
      }
    } else {
      const item = boardData?.items.find((i) => i.id === itemId);
      if (item) {
        setModalItem(item);
      }
    }
  };

  const handleResetView = () => {
    if (!viewportRef.current || visibleItems.length === 0) return;

    const viewport = viewportRef.current as HTMLElement;
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    visibleItems.forEach((item) => {
      const itemLeft = (item.position.x / 100) * viewportWidth;
      const itemTop = (item.position.y / 100) * viewportHeight;
      const itemRight = itemLeft + item.size.width;
      const itemBottom = itemTop + item.size.height;

      if (itemLeft < minX) minX = itemLeft;
      if (itemTop < minY) minY = itemTop;
      if (itemRight > maxX) maxX = itemRight;
      if (itemBottom > maxY) maxY = itemBottom;
    });

    const bboxWidth = maxX - minX;
    const bboxHeight = maxY - minY;

    if (bboxWidth <= 0 || bboxHeight <= 0) return;

    const PADDING = 80;

    const scaleX = viewportWidth / (bboxWidth + PADDING);
    const scaleY = viewportHeight / (bboxHeight + PADDING);

    const newScale = Math.max(0.5, Math.min(3, Math.min(scaleX, scaleY)));

    const bboxCenterX = minX + bboxWidth / 2;
    const bboxCenterY = minY + bboxHeight / 2;

    const newX = viewportWidth / 2 - bboxCenterX * newScale;
    const newY = viewportHeight / 2 - bboxCenterY * newScale;

    setIsAnimating(true);
    setScale(newScale);
    setPosition({ x: newX, y: newY });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Declutter: collision-aware grouping by type into columns without overlap.
  // Store original item positions keyed by id for robust undo (preserves new items added after declutter)
  const previousPositionsRef = useRef<Map<
    string,
    { position: { x: number; y: number }; rotation: number }
  > | null>(null);
  const [isDecluttered, setIsDecluttered] = useState(false);
  const [animateLayout, setAnimateLayout] = useState(false);

  // Aesthetic clustered declutter with undo toggle.
  const handleToggleDeclutter = () => {
    if (!boardData || !viewportRef.current) return;

    // Undo case: restore original layout
    if (isDecluttered && previousPositionsRef.current) {
      const snapshot = previousPositionsRef.current;
      setBoardData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((item) => {
            const original = snapshot.get(item.id);
            return original
              ? {
                  ...item,
                  position: original.position,
                  rotation: original.rotation,
                }
              : item; // keep items created after declutter
          }),
        };
      });
      previousPositionsRef.current = null;
      setIsDecluttered(false);
      setTimeout(() => handleResetView(), 50);
      return;
    }

    // Capture original positions for undo
    const posMap = new Map<
      string,
      { position: { x: number; y: number }; rotation: number }
    >();
    boardData.items.forEach((i) =>
      posMap.set(i.id, { position: { ...i.position }, rotation: i.rotation })
    );
    previousPositionsRef.current = posMap;

    const viewportWidth = (viewportRef.current as HTMLElement).clientWidth;
    const viewportHeight = (viewportRef.current as HTMLElement).clientHeight;
    const placed = computeDeclutterLayout(
      boardData.items,
      viewportWidth,
      viewportHeight
    );
    setAnimateLayout(true);
    setBoardData((prev) => (prev ? { ...prev, items: placed } : prev));
    setIsDecluttered(true);
    setTimeout(() => handleResetView(), 80);
    setTimeout(() => setAnimateLayout(false), 600);
  };

  const handleAddNewNote = () => {
    if (!viewportRef.current) return;

    const viewportWidth = (viewportRef.current as HTMLElement).clientWidth;
    const viewportHeight = (viewportRef.current as HTMLElement).clientHeight;

    // Center of the current view in board coordinates (pixels)
    const centerX_board_px = (viewportWidth / 2 - position.x) / scale;
    const centerY_board_px = (viewportHeight / 2 - position.y) / scale;

    // Convert to percentage
    const x_percent = (centerX_board_px / viewportWidth) * 100;
    const y_percent = (centerY_board_px / viewportHeight) * 100;

    const newNote: BoardItem = {
      id: `note-${Date.now()}`,
      type: "note",
      content: "New note...",
      position: {
        x: x_percent,
        y: y_percent,
      },
      size: { width: 150, height: 150 },
      rotation: Math.random() * 4 - 2, // -2 to 2 degrees
    };

    setBoardData((prev) => {
      if (!prev) {
        return {
          items: [newNote],
          connections: [],
          objectives: [],
        };
      }
      return {
        ...prev,
        items: [...prev.items, newNote],
        connections: prev.connections,
        objectives: prev.objectives,
      };
    });
    setNewItemId(newNote.id);
    setTimeout(() => setNewItemId(null), 600);
  };

  const handleRequestClue = () => {
    if (!viewportRef.current) return;

    const availableClueIndices = PREDEFINED_CLUES.map((_, i) => i).filter(
      (i) => !usedClueIndices.has(i)
    );

    if (availableClueIndices.length === 0) {
      alert("No more clues available.");
      return;
    }

    const randomIndex =
      availableClueIndices[
        Math.floor(Math.random() * availableClueIndices.length)
      ];
    const newClueContent = PREDEFINED_CLUES[randomIndex];

    const viewportWidth = viewportRef.current.clientWidth;
    const viewportHeight = viewportRef.current.clientHeight;
    const centerX_board_px = (viewportWidth / 2 - position.x) / scale;
    const centerY_board_px = (viewportHeight / 2 - position.y) / scale;
    const x_percent = (centerX_board_px / viewportWidth) * 100;
    const y_percent = (centerY_board_px / viewportHeight) * 100;

    const newClueItem: BoardItem = {
      id: `clue-${Date.now()}`,
      type: "clue",
      content: newClueContent,
      position: { x: x_percent, y: y_percent },
      size: { width: 160, height: 80 },
      rotation: Math.random() * 5 - 2.5,
    };

    setBoardData((prev) => {
      // If there's no previous board data, create an initial BoardData object.
      if (!prev) {
        return {
          items: [newClueItem],
          connections: [],
          objectives: [],
        };
      }
      return {
        ...prev,
        items: [...prev.items, newClueItem],
        // keep existing arrays intact to satisfy BoardData type
        connections: prev.connections,
        objectives: prev.objectives,
      };
    });
    setNewItemId(newClueItem.id);
    setTimeout(() => setNewItemId(null), 600);

    setUsedClueIndices((prev) => {
      const newSet = new Set(prev);
      newSet.add(randomIndex);
      return newSet;
    });
  };

  const handleFocusItem = (itemId: string) => {
    setIsTimelineVisible(false);

    const item = boardData?.items.find((i) => i.id === itemId);
    if (!item || !viewportRef.current) return;

    const viewport = viewportRef.current;
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    const itemCenterX =
      (item.position.x / 100) * viewportWidth + item.size.width / 2;
    const itemCenterY =
      (item.position.y / 100) * viewportHeight + item.size.height / 2;

    const newScale = 1.5;

    const newX = viewportWidth / 2 - itemCenterX * newScale;
    const newY = viewportHeight / 2 - itemCenterY * newScale;

    setIsAnimating(true);
    setScale(newScale);
    setPosition({ x: newX, y: newY });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleAttemptSolve = (objectiveId: string) => {
    const objectiveToSolve = boardData?.objectives.find(
      (obj) => obj.id === objectiveId
    );
    if (objectiveToSolve) {
      setSolvingObjective(objectiveToSolve);
    }
  };

  const handleObjectiveSubmit = async (
    objectiveId: string,
    solutionText: string
  ) => {
    setIsSubmittingObjective(true);
    const solvedObjective = boardData?.objectives.find(
      (obj) => obj.id === objectiveId
    );

    try {
      const res = await fetch("/api/board/objective", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boardData,
          objectiveDescription: solvedObjective?.description,
          solutionText,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const newEvidence = await res.json();
      // Normalize sizes of new items before merging so they aren't minuscule.
      newEvidence.items = newEvidence.items.map(normalizeItemSize);

      setBoardData((prev) => {
        if (!prev) return prev;
        const updatedItems = [...prev.items, ...newEvidence.items];
        const updatedConnections = [
          ...prev.connections,
          ...newEvidence.connections,
        ];
        return {
          ...prev,
          items: updatedItems,
          connections: updatedConnections,
        };
      });

      setCompletedObjectives((prev) => {
        const newSet = new Set(prev);
        newSet.add(objectiveId);
        return newSet;
      });
    } catch (err) {
      console.error("Failed to generate new evidence:", err);
      alert("Failed to process findings. Intel connection may be unstable.");
    } finally {
      setIsSubmittingObjective(false);
      setSolvingObjective(null);
    }
  };

  if (!caseFile) return notFound();

  // Basic normalization logic; ensures required shape & sizes.
  function normalizeBoardData(raw: any): BoardData {
    const items: BoardItem[] = Array.isArray(raw.items)
      ? raw.items.map((it: any, idx: number) => {
          const type: BoardItemType = ITEM_TYPES.includes(it.type)
            ? it.type
            : "note";
          const id =
            typeof it.id === "string" ? it.id : `item-${idx}-${Date.now()}`;
          const content =
            typeof it.content === "string"
              ? it.content
              : JSON.stringify(it.content ?? {});
          const position = {
            x:
              typeof it.position?.x === "number"
                ? it.position.x
                : Math.random() * 80 + 10,
            y:
              typeof it.position?.y === "number"
                ? it.position.y
                : Math.random() * 80 + 10,
          };
          const size = {
            width:
              typeof it.size?.width === "number"
                ? it.size.width
                : DEFAULT_ITEM_SIZES[type].width,
            height:
              typeof it.size?.height === "number"
                ? it.size.height
                : DEFAULT_ITEM_SIZES[type].height,
          };
          const rotation =
            typeof it.rotation === "number"
              ? it.rotation
              : Math.random() * 6 - 3;
          return normalizeItemSize({
            id,
            type,
            content,
            position,
            size,
            rotation,
          });
        })
      : [];
    const connections = Array.isArray(raw.connections)
      ? raw.connections.filter((c: any) => c && c.from && c.to)
      : [];
    const objectives = Array.isArray(raw.objectives)
      ? raw.objectives.filter((o: any) => o && o.id && o.description)
      : [];
    return { items, connections, objectives };
  }

  if (loadingMessage) {
    // Use new MissionLoading component with rotating tips while data generates.
    return <MissionLoading title={loadingMessage} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-red-400 bg-red-900/50 p-4 border border-red-500 font-special-elite">
          {error}
        </div>
      </div>
    );
  }

  const renderItem = (item: BoardItem) => {
    const isDragging = draggingItem?.id === item.id;
    const isConnectingFrom = connectingState.from === item.id;
    const isAnyItemDragging = !!draggingItem;

    // Enable composite transforms for hover effects to work with inline transforms.
    const commonClasses = `absolute shadow-lg shadow-black/60 transform-gpu ${
      animateLayout
        ? "transition-[left,top] duration-500 ease-in-out"
        : "transition-all duration-200"
    }`;
    let dynamicClasses = "";

    if (isDragging) {
      dynamicClasses += "shadow-2xl shadow-yellow-400/20 z-[100] ";
    } else {
      // Only apply hover effects if not dragging another item to reduce visual noise
      if (!isAnyItemDragging) {
        dynamicClasses +=
          "hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-400/20 hover:z-20 ";
      }
    }

    // When an item is being dragged, reduce the opacity of all other items.
    if (isAnyItemDragging && !isDragging) {
      dynamicClasses += "opacity-50 ";
    }

    if (isConnectingFrom)
      dynamicClasses += "animate-pulse ring-2 ring-red-500 ";
    if (connectingState.from && !isConnectingFrom)
      dynamicClasses += "hover:ring-2 hover:ring-red-400 ";

    // FIX: Add CSSProperties type to prevent type errors on properties like `userSelect`.
    // By setting CSS variables, we can compose transforms with Tailwind classes (e.g., hover:scale)
    // FIX: The CSSProperties type is augmented to allow for CSS custom properties (like `--tw-rotate`),
    // which are not included in the standard CSSProperties type by default in some TypeScript environments.
    const style: CSSProperties & { [key: `--${string}`]: string | number } = {
      left: `${item.position.x}%`,
      top: `${item.position.y}%`,
      width: `${item.size.width}px`,
      height: `${item.size.height}px`,
      "--tw-rotate": `${item.rotation}deg`,
      // Make the dragged item slightly larger for better feedback
      "--tw-scale-x": isDragging ? "1.05" : "1",
      "--tw-scale-y": isDragging ? "1.05" : "1",
      transformOrigin: "center center",
      cursor: connectingState.from
        ? "crosshair"
        : isDragging
        ? "grabbing"
        : "grab",
      zIndex: isDragging || isConnectingFrom ? 100 : 10,
      userSelect: "none",
    };

    const interactionHandlers = {
      onMouseDown: (e: any) => handleItemMouseDown(e, item.id),
      onTouchStart: (e: any) => handleItemTouchStart(e, item.id),
      onContextMenu: (e: any) => handleItemContextMenu(e, item.id),
      onClick: (e: any) => handleItemClick(e, item.id),
      title: item.content,
    };

    switch (item.type) {
      case "photo":
        const imageUrl = imageUrls[item.id];
        return (
          // FIX: Ref callback should not return a value and should handle unmounting.
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} p-2 bg-gray-700 border border-gray-500 overflow-hidden`}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.content}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                key={`${item.id}-image-placeholder`}
                className="w-full h-full flex flex-col items-center justify-center text-center text-gray-300 text-xs p-1 bg-gray-800"
              >
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
            <Tape key={`tape-${item.id}`} rotation={-15} />
          </div>
        );
      case "document":
        return (
          // FIX: Ref callback should not return a value and should handle unmounting.
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-amber-50 text-black text-xs overflow-y-auto p-4 font-special-elite`}
          >
            <h3 className="font-bold text-sm mb-2 border-b border-black/20 text-red-900">
              TOP SECRET // EYES ONLY
            </h3>
            <p className="whitespace-pre-wrap">{item.content}</p>
          </div>
        );
      case "note":
        const isNewNote = newItemId === item.id;
        return (
          // FIX: Ref callback should not return a value and should handle unmounting.
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-yellow-200 text-black text-sm p-3 shadow-md font-kalam ${
              isNewNote ? "clue-item-appear" : ""
            }`}
          >
            <p>{item.content}</p>
            <Tape rotation={10} />
          </div>
        );
      case "clue":
        const isNewClue = newItemId === item.id;
        return (
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} clue-item-effect text-black text-xs flex items-center justify-center text-center font-special-elite ${
              isNewClue ? "clue-item-appear" : ""
            }`}
          >
            <p>{item.content}</p>
          </div>
        );
      case "autopsy-report":
        return (
          // FIX: Ref callback should not return a value and should handle unmounting.
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-[#f0e6d6] text-black text-xs p-2 px-3 flex items-center justify-center uppercase font-staatliches tracking-wider border-2 border-gray-600/50`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            AUTOPSY REPORT
          </div>
        );
      case "newspaper":
        return (
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} newspaper-clipping-effect`}
          >
            <NewspaperClipping content={item.content} isModal={false} />
          </div>
        );
      case "formal-alibi":
        return (
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-gray-200 text-black text-xs p-3 font-special-elite border border-gray-400 overflow-hidden`}
          >
            <h4 className="font-bold text-center text-sm border-b border-black/30 mb-2">
              ALIBI STATEMENT
            </h4>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {item.content}
            </p>
            <Tape rotation={-5} />
          </div>
        );
      case "interrogation-transcript":
        return (
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-gray-300 text-black text-xs p-3 font-mono border-2 border-gray-500 overflow-hidden`}
          >
            <h4 className="font-bold text-center text-sm border-b-2 border-black/30 pb-1 mb-2">
              INTERVIEW NOTES
            </h4>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {item.content}
            </p>
            <Tape rotation={8} />
          </div>
        );
      case "folder-tab":
        return (
          // FIX: Ref callback should not return a value and should handle unmounting.
          <div
            {...interactionHandlers}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            key={item.id}
            style={style}
            className={`${commonClasses} ${dynamicClasses} bg-yellow-600 text-white text-xs p-1 px-3 flex items-center justify-center uppercase font-staatliches tracking-wider`}
          >
            {item.content}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main
      className={`w-screen h-screen p-2 md:p-4 flex flex-col items-center justify-center overflow-hidden bg-[#111] touch-none ${
        connectingState.from ? "cursor-crosshair" : ""
      }`}
      onMouseMove={
        handleInteractionMove as unknown as React.MouseEventHandler<HTMLElement>
      }
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchMove={
        handleInteractionMove as unknown as React.TouchEventHandler<HTMLElement>
      }
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
    >
      {solvingObjective && (
        <ObjectiveSolverModal
          objective={solvingObjective}
          onClose={() => setSolvingObjective(null)}
          onSubmit={handleObjectiveSubmit}
          isSubmitting={isSubmittingObjective}
        />
      )}
      {isTimelineVisible && boardData && (
        <TimelineView
          items={boardData.items}
          onClose={() => setIsTimelineVisible(false)}
          onFocusItem={handleFocusItem}
        />
      )}
      {contextMenu.visible && (
        <ContextMenu
          {...contextMenu}
          onClose={closeContextMenu}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onConnect={handleStartConnection}
        />
      )}
      {modalItem && (
        <Modal
          item={modalItem}
          onClose={() => setModalItem(null)}
          imageUrl={imageUrls[modalItem.id]}
        />
      )}
      {/* Evidence panel: list evidence items grouped by type; clicking focuses item on board */}
      {boardData && (
        <div className="fixed right-10 top-20 z-[55] flex flex-col gap-4">
          <EvidencePanel
            items={boardData.items.map((i) => ({
              id: i.id,
              type: i.type,
              content: i.content,
            }))}
            onFocus={(id) => handleFocusItem(id)}
          />
          <TimelinePanel
            items={boardData.items.map((i) => ({
              id: i.id,
              type: i.type,
              content: i.content,
            }))}
            onFocus={(id) => handleFocusItem(id)}
            onOpenFull={() => setIsTimelineVisible(true)}
          />
          {boardData.objectives.length > 0 && (
            <ObjectivesPanel
              objectives={boardData.objectives}
              completedObjectives={completedObjectives}
              onAttemptSolve={handleAttemptSolve}
            />
          )}
        </div>
      )}

      <PlayHeader
        titleOverride="OPERATION SHADOWFALL"
        boardControlsProps={{
          activeFilters,
          allTypes: [...ITEM_TYPES] as string[],
          toggleFilter: (t: string) => toggleFilter(t as BoardItemType),
          setActiveFilters: (filters: Set<string>) =>
            setActiveFilters(filters as Set<BoardItemType>),
          handleResetView,
          setIsTimelineVisible,
          handleAddNewNote,
          handleRequestClue,
          handleDeclutter: handleToggleDeclutter,
          isDecluttered,
          cluesLeft: PREDEFINED_CLUES.length - usedClueIndices.size,
          isMobileMenuOpen,
          setIsMobileMenuOpen,
          variant: "integrated",
          dockActionsOnMobile: true,
          mobileDockPortal: true,
          includeDockSpacer: true,
        }}
      />
      <div
        id="board"
        ref={viewportRef}
        onMouseDown={handleBoardInteractionStart}
        onTouchStart={handleBoardInteractionStart}
        className="w-full h-full relative border-4 md:border-8 border-gray-800 flex-grow overflow-hidden"
        style={{
          cursor: isPanning
            ? "grabbing"
            : connectingState.from
            ? "crosshair"
            : "grab",
        }}
      >
        <div
          id="lighting-overlay"
          className="absolute inset-0 pointer-events-none z-10"
        ></div>
        <div
          id="board-content"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
            transition: isAnimating
              ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {visibleItems.map(renderItem)}
          <svg
            className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] pointer-events-none z-0"
            aria-hidden="true"
          >
            {lineCoords.map((coords, i) => (
              <line
                key={i}
                {...coords}
                stroke="rgba(255, 0, 0, 0.5)"
                strokeWidth="2"
                filter="url(#glow)"
              />
            ))}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  );
}
