/* eslint-disable @next/next/no-img-element */
// Root-level Twitter card image aligned with hero-wide OG design.
// Route: /twitter-image
// Focuses on clear headline + brand for summary_large_image.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "path";
import { coldCases } from "@/data/coldCases";

export const runtime = "nodejs";
export const alt = "My Mystery Party – Interactive Mystery Cases";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  // Base hero image
  const heroRelative = "hero_wideshot/woman-vanishing.png";
  const heroPath = path.join(process.cwd(), "public", heroRelative);
  let heroData: string | null = null;
  try {
    const heroFile = await readFile(heroPath);
    heroData = `data:image/png;base64,${heroFile.toString("base64")}`;
  } catch (e) {
    console.warn("Failed to load hero image for twitter card", heroRelative, e);
  }

  // Grab a few thumbnails to reinforce variety (smaller than OG version)
  const thumbs: string[] = [];
  for (const c of coldCases.slice(0, 4)) {
    try {
      const fp = path.join(process.cwd(), "public", c.imageUrl.replace(/^\//, ""));
      const f = await readFile(fp);
      thumbs.push(`data:image/png;base64,${f.toString("base64")}`);
    } catch (e) {
      console.warn("Failed to read thumbnail for twitter card", c.imageUrl, e);
    }
  }

  // Fallback if hero fails entirely.
  if (!heroData) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#050505",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          gap: 34,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ color: "#ffcf33" }}>Hub98</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>My Mystery Party</span>
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "72%",
            lineHeight: 1.04,
          }}
        >
          Unravel Every Mystery
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.5px",
            textAlign: "center",
            maxWidth: "60%",
          }}
        >
          Interactive case files. Collaborative sleuthing. New stories weekly.
        </div>
      </div>,
      size
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
        background: "#000",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Hero base */}
      <img
        src={heroData}
        alt="Hero"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.74) contrast(1.08) saturate(1.05)",
        }}
      />
      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(140deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.30) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 70% 40%, rgba(255,207,51,0.15), transparent 55%)",
          mixBlendMode: "overlay",
        }}
      />
      {/* Frosted content layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 56px",
          boxSizing: "border-box",
          background: "rgba(0,0,0,0.40)",
          backdropFilter: "blur(22px) saturate(150%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ color: "#ffcf33" }}>Hub98</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>My Mystery Party</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            maxWidth: "70%",
          }}
        >
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "white",
              textShadow: "0 6px 24px rgba(0,0,0,0.6)",
              display: "flex",
            }}
          >
            <span style={{ display: "flex" }}>Unravel Every Mystery</span>
          </div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            <span style={{ display: "flex" }}>Interactive case files. Collaborative sleuthing. New stories weekly.</span>
          </div>
          {thumbs.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                maxWidth: 620,
              }}
            >
              {thumbs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`thumb-${i}`}
                  style={{
                    width: 88,
                    height: 88,
                    objectFit: "cover",
                    borderRadius: 18,
                    filter: "brightness(0.9) contrast(1.05)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    display: "flex",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: "1px",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 500,
              display: "flex",
            }}
          >
            Solve • Connect • Reveal
          </div>
          <div
            style={{
              background: "linear-gradient(90deg,#ffcf33,#f59e0b)",
              color: "#000",
              padding: "12px 26px",
              fontSize: 22,
              fontWeight: 700,
              borderRadius: 999,
              letterSpacing: "1px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.55)",
              display: "flex",
            }}
          >
            Explore →
          </div>
        </div>
      </div>
    </div>,
    size
  );
}
