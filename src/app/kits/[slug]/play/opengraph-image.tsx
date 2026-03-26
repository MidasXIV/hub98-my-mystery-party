/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getMysteryKitBySlug } from "@/data/mysteryKits";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const alt = "Mystery Party host dashboard preview";

export const size = {
  width: 1200,
  height: 630,
};

type CharacterCard = {
  id: string;
  name: string;
  imageUrl?: string;
};

function truncate(str: string, max = 56) {
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}

async function toDataUri(publicUrl?: string) {
  if (!publicUrl) return null;

  try {
    const relativePath = publicUrl.replace(/^\//, "");
    const imagePath = path.join(process.cwd(), "public", relativePath);
    const file = await readFile(imagePath);
    const extension = path.extname(relativePath).toLowerCase();
    const mime =
      extension === ".png"
        ? "image/png"
        : extension === ".webp"
          ? "image/webp"
          : "image/jpeg";

    return `data:${mime};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

function pickCharacterSubset(characters: CharacterCard[], slug: string, max = 3) {
  if (characters.length <= max) return characters;

  const picked: CharacterCard[] = [];
  const seen = new Set<string>();
  const jump = Math.max(2, Math.floor(characters.length / max));
  let index = slug.length % characters.length;

  while (picked.length < max) {
    const candidate = characters[index % characters.length];
    if (!seen.has(candidate.id)) {
      picked.push(candidate);
      seen.add(candidate.id);
    }
    index += jump;
  }

  return picked;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0e1117",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          Host Dashboard
        </div>
      ),
      size,
    );
  }

  const title = truncate(kit.title);
  const caseImageUri = await toDataUri(kit.imageUrl);
  const characters = pickCharacterSubset(
    (kit.characters ?? []).map((char) => ({
      id: char.id,
      name: char.name,
      imageUrl: char.imageUrl,
    })),
    kit.slug,
  );

  const characterImages = await Promise.all(
    characters.map(async (character) => ({
      ...character,
      dataUri: await toDataUri(character.imageUrl),
    })),
  );

  const hiddenCount = Math.max((kit.characters?.length ?? 0) - characterImages.length, 0);

  const collageLayout = [
    { left: 760, top: 96, rotate: -7 },
    { left: 940, top: 126, rotate: 7 },
    { left: 850, top: 320, rotate: -4 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          overflow: "hidden",
          background: "#080b13",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {caseImageUri ? (
          <img
            src={caseImageUri}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(112deg, rgba(4,7,16,0.94) 0%, rgba(7,10,19,0.82) 44%, rgba(8,11,19,0.64) 72%, rgba(5,7,14,0.82) 100%)",
          }}
        />

        {characterImages.map((character, idx) => {
          const frame = collageLayout[idx] ?? collageLayout[collageLayout.length - 1];
          return (
            <div
              key={character.id}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                left: frame.left,
                top: frame.top,
                width: 200,
                height: 238,
                borderRadius: 18,
                overflow: "hidden",
                border: "5px solid rgba(255,255,255,0.92)",
                transform: `rotate(${frame.rotate}deg)`,
                background: "linear-gradient(145deg, #f8f5ee, #dbd4c5)",
              }}
            >
              {character.dataUri ? (
                <img
                  src={character.dataUri}
                  alt={character.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f6f2e8 0%, #dbd6c8 100%)",
                    color: "#2f2a24",
                    fontSize: 52,
                    fontWeight: 800,
                  }}
                >
                  {character.name.slice(0, 1).toUpperCase()}
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  left: 10,
                  right: 10,
                  bottom: 10,
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.56)",
                  color: "#fff",
                  fontSize: 18,
                  lineHeight: 1.2,
                  padding: "8px 10px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {character.name}
              </div>
            </div>
          );
        })}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "52px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              color: "rgba(255,255,255,0.82)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            <span style={{ color: "#ffd15a" }}>Hub98</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: "#ffd15a" }}>MyMystery.party</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Host Dashboard</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 650 }}>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 66,
                lineHeight: 1.04,
                fontWeight: 800,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(234,237,245,0.92)",
                fontSize: 32,
                lineHeight: 1.2,
                fontWeight: 600,
              }}
            >
              Play Mode
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#e4e8ff",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 999,
                  padding: "8px 16px",
                }}
              >
                Cast + clues + host notes
              </span>
              <span style={{ opacity: 0.92 }}>
                {hiddenCount > 0 ? `+${hiddenCount} more suspects` : "Full cast visible"}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
