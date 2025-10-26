/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getCaseBySlug } from "@/data/coldCases";
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
export const alt = "My Mystery Party case preview";

// Helper to truncate overly long titles (OG / Twitter card best practices ~70 chars for headline prominence)
function truncate(str: string, max = 70) {
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
              fontFamily: "system-ui, sans-serif",
              background: "#000",
              overflow: "hidden",
            }}
          >
            {/* Background image */}
            <img
              src={dataUri}
              alt={title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.85)",
              }}
            />
            {/* Gradient overlay for text legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(140deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            {/* Content block */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "56px 72px",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                gap: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "#ffcf33" }}>Hub98</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>My Mystery Party</span>
              </div>
              <div
                style={{
                  fontSize: 80,
                  lineHeight: 1.05,
                  fontWeight: 700,
                  color: "white",
                  maxWidth: "80%",
                  textShadow: "0 6px 22px rgba(0,0,0,0.55)",
                }}
              >
                {title}
              </div>
              {coldCase.tags?.length ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginTop: 4,
                  }}
                >
                  {coldCase.tags.slice(0, 4).map((t) => (
                    <div
                      key={t}
                      style={{
                        fontSize: 24,
                        padding: "8px 18px",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 999,
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ),
        size
      );
    } catch (e) {
      console.warn("OG composite failed for", slug, e);
    }
  }

  // Fallback image (missing slug or file issue)
  const title = coldCase?.title || "Case Not Found";
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
          color: "white",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 32,
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
            maxWidth: "75%",
          }}
        >
          {truncate(title)}
        </div>
      </div>
    ),
    size
  );
}
