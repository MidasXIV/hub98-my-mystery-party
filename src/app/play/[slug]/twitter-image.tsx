/* eslint-disable @next/next/no-img-element */
// Dedicated Twitter card image. Some platforms (X/Twitter) may prefer a simpler composition.
// Route: /play/[slug]/twitter-image
// Mirrors logic from opengraph-image.tsx but with slightly different layout emphasis.

import { ImageResponse } from "next/og";
import { getCaseBySlug } from "@/data/coldCases";
import { readFile } from "node:fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "Twitter preview – My Mystery Party case";
export const contentType = "image/png";
// Twitter summary_large_image recommended 1200x600 (OG 1200x630). We'll keep 1200x630 for consistency.
export const size = { width: 1200, height: 630 };

function truncate(str: string, max = 60) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const coldCase = getCaseBySlug(slug);

  if (coldCase) {
    const relativePath = coldCase.imageUrl.replace(/^\//, "");
    const imagePath = path.join(process.cwd(), "public", relativePath);
    try {
      const file = await readFile(imagePath);
      const base64 = file.toString("base64");
      const dataUri = `data:image/png;base64,${base64}`;
      const title = truncate(coldCase.title);
      return new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              fontFamily: "system-ui, sans-serif",
              backgroundColor: "#000",
              overflow: "hidden",
            }}
          >
            <img
              src={dataUri}
              alt={title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.78) contrast(1.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "52px 72px 56px",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Play button (non-interactive visual only) */}
              <div
                style={{
                  position: "absolute",
                  top: 52,
                  right: 72,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(90deg,#ffcf33,#f59e0b)",
                  color: "#000",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: 999,
                  letterSpacing: "1.2px",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
                }}
              >
                <span style={{ fontSize: 22 }}>▶</span> PLAY
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
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
                  gap: 28,
                  maxWidth: "80%",
                }}
              >
                <div
                  style={{
                    fontSize: 84,
                    lineHeight: 1.02,
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 4px 18px rgba(0,0,0,0.55)",
                  }}
                >
                  {title}
                </div>
                {coldCase.tags?.length ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "14px",
                      marginTop: 2,
                    }}
                  >
                    {coldCase.tags.slice(0, 3).map((tag) => (
                      <div
                        key={tag}
                        style={{
                          fontSize: 26,
                          padding: "10px 22px",
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          backdropFilter: "blur(5px)",
                          borderRadius: 999,
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "1px",
                  fontWeight: 500,
                }}
              >
                Solve the mystery →
              </div>
            </div>
          </div>
        ),
        size
      );
    } catch (e) {
      console.warn("Twitter image composite failed for", slug, e);
    }
  }

  // Fallback simple brand card
  const title = truncate(coldCase?.title || "Case Not Found");
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
          background: "#111",
          fontFamily: "system-ui, sans-serif",
          color: "#fff",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 34,
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
            fontSize: 86,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "75%",
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  );
}
