/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getCaseBySlug } from "@/data/coldCases";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "My Mystery Party case preview";

function truncate(str: string, max = 70) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export default async function Image(req: NextRequest) {
  const url = new URL(req.url);
  const origin = url.origin;
  const parts = url.pathname.split("/").filter(Boolean);
  const slug = parts[parts.length - 1] || "";

  const coldCase = getCaseBySlug(slug) as {
    imageUrl?: string;
    title?: string;
    subtitle?: string;
  } | undefined;

  if (coldCase) {
    const thumbUrl = `${origin}${coldCase.imageUrl || "/cold_cases/previews/default.jpg"}`;
    const title = truncate(coldCase.title || "");
    const subtitle = coldCase.subtitle || "A case from My Mystery Party";

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
          <img
            src={thumbUrl}
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

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(140deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
            }}
          />

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

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                fontSize: 24,
                opacity: 0.95,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
      ),
      size
    );
  }

  const title = "Case Not Found";
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
