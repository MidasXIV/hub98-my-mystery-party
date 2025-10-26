/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { coldCases } from "@/data/coldCases";
import { readFile } from "node:fs/promises";
import path from "path";

// Open Graph image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
// Use Node.js runtime so we can read the file system (public folder) directly.
export const runtime = "nodejs";

// Generates an OG image based on the case thumbnail.
// If the slug doesn't match a case or the image can't be loaded, falls back to a simple text image.
export const alt = "My Mystery Party – Interactive Mystery Cases";

// Helper to truncate overly long titles (OG / Twitter card best practices ~70 chars for headline prominence)
// (truncate helper removed for simplified hero version)

export default async function Image() {
  // Base hero image: vanishing woman
  const heroRelative = "hero_wideshot/woman-vanishing.png";
  const heroPath = path.join(process.cwd(), "public", heroRelative);
  let heroData: string | null = null;
  try {
    const heroFile = await readFile(heroPath);
    heroData = `data:image/png;base64,${heroFile.toString("base64")}`;
  } catch (e) {
    console.warn("Failed to load hero image", heroRelative, e);
  }

  // Load 6 case thumbnails for a subtle row strip (optional accent)
  const cases = coldCases.slice(0, 6);
  const thumbs: { src: string; data: string }[] = [];
  for (const c of cases) {
    try {
      const fp = path.join(process.cwd(), "public", c.imageUrl.replace(/^\//, ""));
      const f = await readFile(fp);
      thumbs.push({ src: c.imageUrl, data: `data:image/png;base64,${f.toString("base64")}` });
    } catch (e) {
      console.warn("Failed to read thumbnail", c.imageUrl, e);
    }
  }

  // If hero failed completely, fallback text only
  if (!heroData) {
    return new ImageResponse(
      (
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
            gap: 38,
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
              fontSize: 80,
              fontWeight: 700,
              textAlign: "center",
              maxWidth: "70%",
              lineHeight: 1.05,
            }}
          >
            Unravel Every Mystery
          </div>
        </div>
      ),
      size
    );
  }

  // Thumbnail strip dimensions
  // (Row sizing variables removed after design change; kept minimal to avoid unused warnings)

  return new ImageResponse(
    (
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
        {/* Hero base image */}
        {heroData && (
          <img
            src={heroData}
            alt="Hero"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.72) contrast(1.08) saturate(1.05)",
            }}
          />
        )}
        {/* Vignette overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 68% 42%, rgba(255,207,51,0.15), transparent 55%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
        {/* Full-screen frosted overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 72px 58px",
            boxSizing: "border-box",
            background: "rgba(0,0,0,0.42)",
            backdropFilter: "blur(26px) saturate(150%)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
                gap: 10,
                fontSize: 14,
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span style={{ display: "flex" }}>Solve</span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ display: "flex" }}>Connect</span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span style={{ display: "flex" }}>Reveal</span>
            </div>
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
                fontSize: 80,
                lineHeight: 1.03,
                fontWeight: 700,
                color: "white",
                textShadow: "0 8px 28px rgba(0,0,0,0.65)",
                display: "flex",
              }}
            >
              <span style={{ display: "flex" }}>Unravel Every Mystery</span>
            </div>
            <div
              style={{
                fontSize: 26,
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
                  gap: 14,
                  flexWrap: "wrap",
                  maxWidth: 720,
                }}
              >
                {thumbs.map((t) => (
                  <img
                    key={t.src}
                    src={t.data}
                    alt={t.src}
                    style={{
                      width: 96,
                      height: 96,
                      objectFit: "cover",
                      borderRadius: 18,
                      filter: "brightness(0.9) contrast(1.05)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                fontSize: 16,
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
                display: "flex",
              }}
            >
              Mystery Platform
            </div>
            {/* <div
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
            </div> */}
          </div>
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
              fontSize: 68,
              lineHeight: 1.04,
              fontWeight: 700,
              color: "white",
              textShadow: "0 6px 26px rgba(0,0,0,0.6)",
              display: "flex",
            }}
          >
            <span style={{ display: "flex" }}>Unravel Every Mystery</span>
          </div>
          <div
            style={{
              fontSize: 23,
              fontWeight: 500,
              color: "rgba(255,255,255,0.80)",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            <span style={{ display: "flex" }}>Interactive case files. Collaborative sleuthing. New stories weekly.</span>
          </div>
          {/* Thumbnail strip inside panel */}
          {thumbs.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                overflow: "hidden",
                paddingTop: 4,
              }}
            >
              {thumbs.map((t) => (
                <img
                  key={t.src}
                  src={t.data}
                  alt={t.src}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 14,
                    filter: "brightness(0.9) contrast(1.05)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
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
            {/* <div
              style={{
                background: "linear-gradient(90deg,#ffcf33,#f59e0b)",
                color: "#000",
                padding: "10px 20px",
                fontSize: 20,
                fontWeight: 700,
                borderRadius: 999,
                letterSpacing: "1px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.55)",
                display: "flex",
              }}
            >
              Explore →
            </div> */}
          </div>
        </div>
      </div>
    ),
    size
  );
}