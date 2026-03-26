/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getMysteryKitBySlug } from "@/data/mysteryKits";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const alt = "Mystery Party character dossier preview";

export const size = {
  width: 1200,
  height: 630,
};

function truncate(str: string, max = 52) {
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

export default async function Image({
  params,
}: {
  params:
    | Promise<{ slug: string; characterSlug: string }>
    | { slug: string; characterSlug: string };
}) {
  const { slug, characterSlug } =
    params instanceof Promise ? await params : params;

  const kit = getMysteryKitBySlug(slug);
  const character = kit?.characters?.find((c) => c.slug === characterSlug);

  if (!kit || !character) {
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
          Character Dossier
        </div>
      ),
      size,
    );
  }

  const kitImageUri = await toDataUri(kit.imageUrl);
  const charImageUri = await toDataUri(character.imageUrl);

  const supportCharacters = (kit.characters ?? [])
    .filter((c) => c.id !== character.id)
    .slice(0, 2);

  const supportImages = await Promise.all(
    supportCharacters.map(async (c) => ({
      id: c.id,
      name: c.name,
      image: await toDataUri(c.imageUrl),
    })),
  );

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
        {kitImageUri ? (
          <img
            src={kitImageUri}
            alt={kit.title}
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
              "linear-gradient(115deg, rgba(5,7,15,0.95) 0%, rgba(8,10,18,0.86) 44%, rgba(10,13,22,0.6) 72%, rgba(5,7,15,0.84) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 730,
            top: 74,
            width: 332,
            height: 430,
            borderRadius: 24,
            overflow: "hidden",
            display: "flex",
            border: "6px solid rgba(255,255,255,0.94)",
            background: "linear-gradient(145deg, #f8f5ee, #dbd4c5)",
          }}
        >
          {charImageUri ? (
            <img
              src={charImageUri}
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
                fontSize: 120,
                fontWeight: 800,
                color: "#2f2a24",
              }}
            >
              {character.name.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        {supportImages.map((item, idx) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              display: "flex",
              left: idx === 0 ? 1040 : 980,
              top: idx === 0 ? 54 : 470,
              width: 138,
              height: 150,
              borderRadius: 14,
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.92)",
              background: "#d6d0c1",
            }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>
        ))}

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
              color: "rgba(255,255,255,0.84)",
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
            <span>Dossier</span>
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
              {truncate(character.name)}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(234,237,245,0.92)",
                fontSize: 30,
                lineHeight: 1.2,
                fontWeight: 600,
              }}
            >
              {character.role || "Character Dossier"}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 620,
                color: "rgba(226,232,248,0.94)",
                fontSize: 24,
                lineHeight: 1.35,
                fontWeight: 500,
              }}
            >
              {truncate(character.summary, 130)}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#e4e8ff",
                fontSize: 22,
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
                {kit.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
