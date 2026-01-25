import type { PhotoVariant } from "@/components/photo-preview";

export type ParsedPhotoContent = {
  /** Optional friendly name to display on the photo */
  title?: string;
  /** Visual variant for rendering */
  variant?: PhotoVariant;
};

/**
 * Attempts to parse `photo` item `content`.
 *
 * Supported inputs:
 * - Plain string: treated as title (legacy behavior)
 * - JSON string: { title?: string, name?: string, variant?: 'overlay'|'polaroid', photoVariant?: ... }
 */
export function parsePhotoContent(content: unknown): ParsedPhotoContent {
  // Some case data uses object content for photos ({ title, variant }).
  // On initial board load we stringify non-string content, but unlocked items may arrive as raw objects.
  if (content && typeof content === "object") {
    const obj = content as Record<string, unknown>;
    const titleRaw =
      typeof obj.title === "string"
        ? obj.title
        : typeof obj.name === "string"
          ? obj.name
          : undefined;
    const variantRaw =
      typeof obj.variant === "string"
        ? obj.variant
        : typeof obj.photoVariant === "string"
          ? obj.photoVariant
          : typeof obj.photoStyle === "string"
            ? obj.photoStyle
            : undefined;
    const variant: PhotoVariant | undefined =
      variantRaw === "polaroid" || variantRaw === "overlay"
        ? variantRaw
        : undefined;
    return {
      title: typeof titleRaw === "string" ? titleRaw.trim() : undefined,
      variant,
    };
  }

  const raw = (typeof content === "string" ? content : "").trim();
  if (!raw) return {};

  // Only parse JSON if it looks like JSON.
  if (raw.startsWith("{") || raw.startsWith("[")) {
    try {
      const data = JSON.parse(raw);
      const titleRaw =
        typeof data?.title === "string"
          ? data.title
          : typeof data?.name === "string"
          ? data.name
          : undefined;

      const variantRaw =
        typeof data?.variant === "string"
          ? data.variant
          : typeof data?.photoVariant === "string"
          ? data.photoVariant
          : typeof data?.photoStyle === "string"
          ? data.photoStyle
          : undefined;

      const variant: PhotoVariant | undefined =
        variantRaw === "polaroid" || variantRaw === "overlay"
          ? variantRaw
          : undefined;

      return {
        title: typeof titleRaw === "string" ? titleRaw.trim() : undefined,
        variant,
      };
    } catch {
      // fall through
    }
  }

  // Non-JSON content (common legacy case): treat content itself as the display title.
  return { title: raw };
}
