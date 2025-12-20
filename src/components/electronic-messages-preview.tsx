"use client";

import React, { useMemo } from "react";
import { parseElectronicData } from "@/lib/electronic-messages-utils"; // Assume utils

const PreviewStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Courier+Prime&display=swap");

    .card-shell {
      background-color: #ffffff;
      background-image: radial-gradient(
          circle at 30% 0%,
          rgba(0, 0, 0, 0.04),
          transparent 40%
        ),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(0, 0, 0, 0.08);
    }

    /* Horizontal Fold Line */
    .fold-crease {
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.05) 45%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(0, 0, 0, 0.05) 55%,
        transparent 100%
      );
      height: 10px;
      width: 100%;
    }

    .font-sans-print {
      font-family: "Roboto", sans-serif;
    }
    .font-mono-print {
      font-family: "Courier Prime", monospace;
    }

    .badge {
      font-size: 10px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: linear-gradient(to bottom, #fafafa, #f1f1f1);
    }
    .bubble {
      border: 1px solid #e5e7eb;
      background: linear-gradient(to bottom, #ffffff, #fbfbfb);
    }
    .avatar-abstract {
      background: radial-gradient(circle at 30% 30%, #e5e7eb, #f8fafc 60%);
      border: 1px solid #d1d5db;
    }
    .pill-sender {
      border: 1px solid rgba(0, 0, 0, 0.06);
      background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    }
    .subject-line {
      background: linear-gradient(to bottom, #fff, #fafafa);
    }
  `}</style>
);

export default function ElectronicMessagePreview({
  content,
}: {
  content: string;
}) {
  const data = useMemo(() => parseElectronicData(content), [content]);
  const lastMessage = data.messages[data.messages.length - 1];

  return (
    <div className="w-full h-full p-2 relative group cursor-pointer select-none">
      <PreviewStyles />

      {/* Container */}
      <div className="w-full h-full card-shell flex flex-col relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Top ribbon with gradient and service badge */}
        <div className="relative p-2 border-b border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
          <div className="flex items-center gap-1">
            {/* Show avatar only for non-email (chat types). For EMAIL, omit avatar. */}
            {data.type !== "EMAIL" && (
              <div className="relative w-8 h-8 rounded-full avatar-abstract shadow-sm flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-500"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 20c0-4 4-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            )}
            {data.type !== "EMAIL" && (
              <div className="ml-1 flex-1 min-w-0">
                <div className="font-sans-print text-[11px] font-semibold truncate">
                  {data.subject || data.platformName || "Thread"}
                </div>
                <div className="text-[9px] text-gray-500 truncate">
                  {Array.isArray(data.participants)
                    ? data.participants.join(" · ")
                    : String(data.participants || "")}
                </div>
              </div>
            )}
            {/* Show platform badge only for EMAIL; hide for chat types */}
            {data.type === "EMAIL" && (
              <span className="badge rounded px-1.5 py-0.5 text-gray-700 uppercase">
                {data.platformName || "email"}
              </span>
            )}
          </div>
        </div>

        {/* Middle: email vs chat preview */}
        <div className="relative flex-1 p-2">
          {data.type === "EMAIL" ? (
            <div className="space-y-1">
              {/* Line 1: Recipient pill (TO) + date */}
              <div className="flex items-center justify-between gap-2">
                <div className="pill-sender rounded px-1.5 py-0.5 text-[10px] text-gray-800 font-sans-print truncate flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-500"
                  >
                    <path
                      d="M2 7l10 6 10-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="font-semibold mr-1">To:</span>
                  <span className="font-medium">
                    {(() => {
                      const toField = (data as unknown as { to?: string }).to;
                      const participants = Array.isArray(data.participants)
                        ? data.participants
                        : [];
                      const fallback =
                        participants[1] || participants.join(", ");
                      return String(toField || fallback || "");
                    })()}
                  </span>
                </div>
                <span className="font-mono-print text-[9px] text-gray-500 truncate">
                  {String(data.printDate || "")}
                </span>
              </div>

              {/* Line 2: Subject */}
              <div className="subject-line rounded px-1.5 py-0.5 text-[10px] font-sans-print font-semibold text-gray-900 truncate">
                {String(data.subject || "(No Subject)")}
              </div>

              {/* Line 3: Snippet */}
              <div className="text-[10px] text-gray-600 font-sans-print truncate">
                {(lastMessage?.body || "").slice(0, 88)}
                {(lastMessage?.body || "").length > 88 ? "…" : ""}
              </div>
            </div>
          ) : (
            <div className="bubble rounded-md px-2 py-1 text-[10px] text-gray-800 font-sans-print shadow-sm truncate">
              <span>
                {(lastMessage?.body || "").slice(0, 90)}
                {(lastMessage?.body || "").length > 90 ? "…" : ""}
              </span>
            </div>
          )}
          <div className="absolute top-[48%] left-0 w-full fold-crease" />
        </div>

        {/* Footer: metadata line */}
        <div className="px-2 py-1 border-t border-gray-200 bg-gray-50/60">
          <div className="flex items-center justify-between">
            <span className="font-mono-print text-[8px] text-gray-500 truncate">
              {data.printDate}
            </span>
            <span className="font-mono-print text-[8px] text-gray-400 truncate">
              {data.caseRef ? `ref:${data.caseRef}` : "ref:—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
