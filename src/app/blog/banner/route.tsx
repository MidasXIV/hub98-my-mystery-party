/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const size = {
  width: 1200,
  height: 630,
};

function clamp(text: string, max: number) {
  const s = (text || "").trim();
  if (!s) return "";
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function pickGradient(seed: string) {
  // Deterministic gradients (small set, good variety)
  const gradients = [
    ["#0b1220", "#312e81", "#0891b2"], // indigo/cyan
    ["#0f172a", "#7c3aed", "#f97316"], // violet/orange
    ["#030712", "#0f766e", "#84cc16"], // teal/lime
    ["#020617", "#be123c", "#f59e0b"], // rose/amber
    ["#0a0a0a", "#2563eb", "#22c55e"], // blue/green
  ];

  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const rawTitle = searchParams.get("title") || "";
  const rawDescription = searchParams.get("description") || searchParams.get("desc") || "";
  const rawCategory = searchParams.get("category") || "";

  const title = clamp(rawTitle, 90) || "My Mystery Party";
  const description = clamp(rawDescription, 140);
  const category = clamp(rawCategory, 38);

  const [c1, c2, c3] = pickGradient(`${title}|${category}`);

  // Simple, fast, and very legible. No external font fetches.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: c1,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background gradients */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 20% 25%, ${c2}55 0%, transparent 55%), radial-gradient(circle at 80% 35%, ${c3}55 0%, transparent 55%), linear-gradient(135deg, ${c1} 0%, #000 100%)`,
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.70) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Brand + category pill */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 26,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#ffcf33" }}>Hub98</span>
              <span style={{ opacity: 0.35 }}>•</span>
              <span>My Mystery Party</span>
            </div>

            {category ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                {category}
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Title + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: "92%" }}>
            <div
              style={{
                display: "flex",
                fontSize: 82,
                lineHeight: 1.04,
                fontWeight: 800,
                color: "white",
                textShadow: "0 10px 30px rgba(0,0,0,0.65)",
              }}
            >
              {title}
            </div>
            {description ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  lineHeight: 1.35,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: "85%",
                }}
              >
                {description}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(255,255,255,0.65)",
              fontSize: 18,
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            <span style={{ display: "flex" }}>Guides & Party Planning</span>
            <span style={{ display: "flex" }}>mymystery.party</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
