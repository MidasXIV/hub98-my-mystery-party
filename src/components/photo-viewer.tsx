"use client";

import React from "react";
import Image from "next/image";
import type { PhotoVariant } from "@/components/photo-preview";

export default function PhotoViewer({
  imageUrl,
  title,
  variant = "overlay",
}: {
  imageUrl?: string;
  title?: string;
  variant?: PhotoVariant;
}) {
  const displayName = (title ?? "").trim();

  if (!imageUrl) {
    return <div className="text-gray-300 p-8">[ ACQUIRING VISUALS... ]</div>;
  }

  if (variant === "polaroid") {
    return (
      <div className="bg-[#f8f8f8] border border-black/20 shadow-xl p-4">
        <div className="bg-black/90 overflow-hidden">
          <Image
            src={imageUrl}
            alt={displayName || "Photo"}
            width={900}
            height={900}
            className="max-w-full max-h-[70vh] object-contain mx-auto"
          />
        </div>
        {displayName ? (
          <div
            className="pt-3 text-black text-2xl text-center"
            style={{ fontFamily: "cursive" }}
            title={displayName}
          >
            {displayName}
          </div>
        ) : null}
      </div>
    );
  }

  // Default overlay
  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt={displayName || "Photo"}
        width={900}
        height={900}
        className="max-w-full max-h-[70vh] object-contain mx-auto"
      />
      {displayName ? (
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <div
            className="px-4 py-2 bg-black/55 text-white text-2xl max-w-full truncate"
            style={{ fontFamily: "cursive" }}
            title={displayName}
          >
            {displayName}
          </div>
        </div>
      ) : null}
    </div>
  );
}
