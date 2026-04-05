import React from "react";
import Image from "next/image";

type BadgeContent = {
  imageUrl?: string;
};

function parseBadgeContent(content: string): BadgeContent {
  try {
    const parsed = JSON.parse(content || "{}");
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as BadgeContent;
    }
  } catch {
    // keep defaults below
  }
  return {};
}

export default function BadgeBoardPreview({
  content,
  title,
}: {
  content: string;
  title?: string;
}) {
  const data = parseBadgeContent(content);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {data.imageUrl ? (
        <div className="relative w-[95%] h-[95%]">
          <Image
            src={data.imageUrl}
            alt={title || "Objectives Cleared Badge"}
            fill
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px] uppercase tracking-widest border-2 border-dashed border-white/10 rounded-full">
          Badge Missing
        </div>
      )}
    </div>
  );
}