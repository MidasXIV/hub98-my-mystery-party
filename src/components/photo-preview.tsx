"use client";

import React from "react";
import Image from "next/image";

export type PhotoVariant = "overlay" | "polaroid";

export default function PhotoPreview({
  imageUrl,
  title,
  variant = "overlay",
}: {
  imageUrl?: string;
  title?: string;
  variant?: PhotoVariant;
}) {
  const displayName = (title ?? "").trim();

  if (variant === "polaroid") {
    return (
      <div className="w-full h-full p-2 bg-[#f8f8f8] border border-black/20">
        <div className="w-full h-full flex flex-col">
          <div className="relative w-full flex-1 bg-black/90 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={displayName || "Photo"}
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200 text-xs bg-gray-900">
                [ IMAGE MISSING ]
              </div>
            )}
          </div>
          {displayName ? (
            <div className="pt-2 px-1 pb-1 leading-none">
              <div
                className="text-[13px] text-black truncate"
                style={{ fontFamily: "cursive" }}
                title={displayName}
              >
                {displayName}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // Default overlay
  return (
    <div className="w-full h-full p-2 bg-gray-700 border border-gray-500 overflow-hidden">
      <div className="relative w-full h-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={displayName || "Photo"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs bg-gray-800">
            [ ACQUIRING VISUALS... ]
          </div>
        )}

        {displayName ? (
          <div className="absolute bottom-2 left-2 right-2">
            <div
              className="inline-block max-w-full px-2 py-1 bg-black/55 text-white truncate"
              style={{ fontFamily: "cursive" }}
              title={displayName}
            >
              {displayName}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
