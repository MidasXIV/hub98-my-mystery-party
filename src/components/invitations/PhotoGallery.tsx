import React from "react";
import Image from "next/image";

export function PhotoGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <div key={src + i} className="overflow-hidden rounded-xl border border-border bg-muted">
          <div className="relative h-32 sm:h-40 w-full">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={i < 3}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;
