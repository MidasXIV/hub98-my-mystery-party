import { notFound } from "next/navigation";
import { coldCases, getCaseBySlug } from "@/data/coldCases";
import type { ColdCase } from "@/data/coldCases";
import type { BoardData, BoardItem, PackagingSlot } from "@/lib/boardTypes";
import CaseBriefingViewer from "@/components/case-briefing-viewer";
import ElectronicMessagesViewer from "@/components/electronic-messages-viewer";
import AutopsyReportViewer from "@/components/autopsy-report-viewer";
import DiaryViewer from "@/components/diary-viewer";
import PersonOfInterestViewer from "@/components/person-of-interest-viewer";
import ReceiptViewer from "@/components/receipt-viewer";
import TicketStubViewer from "@/components/ticket-stub-viewer";
import TelephoneLogViewer from "@/components/telephone-log-viewer";
import ActivityLogViewer from "@/components/activity-log-viewer";
import SearchAndRescueReportViewer from "@/components/search-and-rescue-report-viewer";
import MapViewer from "@/components/map-viewer";
import MissingPersonReportViewer from "@/components/missing-person-report-viewer";
import NewspaperViewer from "@/components/newspaper-viewer";
import InterrogationTranscriptViewer from "@/components/interrogation-transcript-viewer";
import FormalAlibiViewer from "@/components/formal-alibi-viewer";
import TransmissionLogViewer from "@/components/transmission-log-viewer";

// Ensure we pre-generate for known cases
export async function generateStaticParams() {
  return coldCases.map((c) => ({ slug: c.slug }));
}

export default async function PrintAllEvidencePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = params instanceof Promise ? await params : params;
  const caseFile = getCaseBySlug(slug);
  if (!caseFile) return notFound();

  const isBoardData = (val: unknown): val is BoardData => {
    if (!val || typeof val !== "object") return false;
    const obj = val as { [k: string]: unknown };
    return (
      Array.isArray(obj.items) &&
      Array.isArray(obj.connections) &&
      Array.isArray(obj.objectives)
    );
  };

  const board: BoardData | null = isBoardData(caseFile.evidence as unknown)
    ? (caseFile.evidence as unknown as BoardData)
    : null;
  if (!board) return notFound();

  // Small print stylesheet without styled-jsx (works in a Server Component)
  const PrintStyles = (props?: { watermarkLogoUrl?: string }) => {
    const logoUrl = props?.watermarkLogoUrl
      ? props.watermarkLogoUrl
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80'%3E%3Cdefs%3E%3Cstyle%3E@font-face{font-family:Segoe%20UI;}%3C/style%3E%3C/defs%3E%3Ctext x='2' y='56' font-family='Segoe UI, Roboto, Arial, sans-serif' font-size='38' font-weight='700' fill='%23000'%3Emymystery.party%3C/text%3E%3C/svg%3E";
    const sizeCSS = props?.watermarkLogoUrl
      ? "width: 18mm; height: 18mm;"
      : "width: 42mm; height: 12mm;";
    return (
      <style>{`
      /* A4, edge-to-edge for PDF export */
      @page { size: A4; margin: 0; }
      @media print {
        html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-scheme: light; background: #ffffff !important; margin: 0 !important; padding: 0 !important; }
        #smooth-content, #print-root { margin: 0 !important; padding: 0 !important; }
        /* Ensure site global header never shows up on print pages */
        header { display: none !important; }
        .print-break { break-after: page; }
        /* Strip viewer wrappers that add dark backdrops and vertical spacing */
        .bg-gray-900 { background-color: #ffffff !important; }
        .min-h-screen { min-height: auto !important; }
        .overflow-y-auto { overflow: visible !important; }
        .py-10 { padding-top: 0 !important; padding-bottom: 0 !important; }
        .py-8 { padding-top: 0 !important; padding-bottom: 0 !important; }
        .shadow, .shadow-xl, .shadow-2xl { box-shadow: none !important; }
        /* Ensure content starts at the top, no extra margins */
        .print-section > div { margin-top: 0 !important; }
        /* Subtle watermark logo shown on every printed page */
        #print-watermark-logo {
          position: fixed;
          bottom: 8mm; right: 10mm;
          opacity: 0.22; /* faint */
          ${sizeCSS} /* compact brand */
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size: contain;
          pointer-events: none;
          z-index: 9999;
          filter: grayscale(100%);
          background-image: url("${logoUrl}");
        }
      }
      .print-container { background: #ffffff; color: #111111; min-height: 100vh; padding: 0; width: 100%; }
      .print-section { page-break-inside: avoid; margin: 0; padding: 0; }
      /* Index table styles (first page) */
      .index-wrap { padding: 8mm; box-sizing: border-box; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1.5px solid #111; padding: 6px 8px; font: 12px/1.3 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
      th { background: #f5f5f5; text-align: left; }
      .center { text-align: center; }
    `}</style>
    );
  };

  const renderViewer = (item: BoardItem) => {
    const content = item.content;
    console.log("Rendering print viewer for item:", item.id, "of type:", item.type, " content present: ", content !== null && content !== undefined);
    switch (item.type) {
      case "case-briefing":
        return <CaseBriefingViewer content={content} />;
      case "electronic-messages":
        return <ElectronicMessagesViewer content={content} />;
      case "autopsy-report":
        return <AutopsyReportViewer content={content} />;
      case "diary":
        return <DiaryViewer content={content} />;
      case "person-of-interest-report":
        return <PersonOfInterestViewer content={content} />;
      case "receipt":
        return <ReceiptViewer content={content} />;
      case "ticket":
        return <TicketStubViewer content={content} />;
      case "phoneLog":
        return <TelephoneLogViewer content={content} />;
      case "activity-log":
        return <ActivityLogViewer content={content} />;
      case "search-and-rescue-report":
        return <SearchAndRescueReportViewer content={content} />;
      case "map":
        return <MapViewer content={content} />;
      case "missing-person-report":
        return <MissingPersonReportViewer content={content} />;
      case "newspaper":
        return <NewspaperViewer content={content} />;
      case "interrogation-transcript":
        return <InterrogationTranscriptViewer content={content} />;
      case "formal-alibi":
        return <FormalAlibiViewer content={content} />;
      case "transmission-log":
        return <TransmissionLogViewer content={content} />;
      case "photo":
        // For photos we can reuse MapViewer-like simple image printing by passing content as JSON
        // but here we simply show the image in a centered box using standard img tag
        try {
          const url = item.imageUrl || undefined;
          if (!url) return null;
          return (
            <div className="w-full flex items-center justify-center py-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={String(item.content)} style={{ maxWidth: "100%", maxHeight: "95vh", objectFit: "contain" }} />
            </div>
          );
        } catch {
          return null;
        }
      default:
        return null;
    }
  };

  /**
   * Returns a human-friendly label for an evidence item.
   * Normalizes type names and falls back to id when appropriate.
   */
  const labelForItem = (item: BoardItem): string => {
    if (item.title && item.title.trim().length > 0) {
      return item.title.trim();
    }
    switch (item.type) {
      case "case-briefing":
        return "Case Briefing";
      case "electronic-messages":
        return "Electronic Messages";
      case "autopsy-report":
        return "Autopsy Report";
      case "diary":
        return "Diary";
      case "person-of-interest-report":
        return "Person of Interest";
      case "receipt":
        return "Receipt";
      case "ticket":
        return "Ticket";
      case "phoneLog":
        return "Telephone Log";
      case "activity-log":
        return "Activity Log";
      case "search-and-rescue-report":
        return "Search & Rescue Report";
      case "map":
        return "Map";
      case "missing-person-report":
        return "Missing Person Report";
      case "newspaper":
        return "Newspaper";
      case "interrogation-transcript":
        return "Interrogation Transcript";
      case "formal-alibi":
        return "Formal Alibi";
      case "transmission-log":
        return "Transmission Log";
      case "photo":
        return String(item.content || item.id || "Photo");
      default:
        return item.id || "Evidence";
    }
  };

  /**
   * Derives packaging columns configured for the case. Defaults to all known columns.
   */
  const getAvailablePackagingColumns = (c: ColdCase): PackagingSlot[] => {
    const cols = c.packagingColumns;
    return Array.isArray(cols) && cols.length > 0
      ? cols
      : ["suspect", "evidence", "bonus"];
  };

  type IndexColumn = { key: "item" | PackagingSlot; label: string };

  /**
   * Builds index table columns with clean labels.
   */
  const buildIndexColumns = (c: ColdCase): ReadonlyArray<IndexColumn> => {
    const available = getAvailablePackagingColumns(c);
    const labelForCol = (k: PackagingSlot) =>
      k === "suspect"
        ? "SUSPECT PACKET"
        : k === "evidence"
        ? "EVIDENCE ENVELOPE"
        : "BONUS ENVELOPE";

    return [
      { key: "item", label: "ITEM" },
      ...available.map((k) => ({ key: k, label: labelForCol(k) })),
    ];
  };

  /**
   * Renders the first-page Evidence Index table. Print-friendly and robust for PDF export.
   */
  const renderEvidenceIndex = (c: ColdCase, items: BoardItem[]) => {
    const columns = buildIndexColumns(c);
    const available = getAvailablePackagingColumns(c);
    return (
      <section className="print-section print-break">
        <div className="index-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const packs = new Set((item.packIn || []) as PackagingSlot[]);
                return (
                  <tr key={`${item.id}-${idx}`}>
                    <td>{labelForItem(item)}</td>
                    {available.includes("suspect") && (
                      <td className="center">{packs.has("suspect") ? "✓" : ""}</td>
                    )}
                    {available.includes("evidence") && (
                      <td className="center">{packs.has("evidence") ? "✓" : ""}</td>
                    )}
                    {available.includes("bonus") && (
                      <td className="center">{packs.has("bonus") ? "✓" : ""}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    <div id="print-root" className="print-container">
      <PrintStyles watermarkLogoUrl={slug === "station-zero" ? "/cold_case_data/station_zero/qrcode.png" : undefined} />
  {/* Print watermark logo (print-only via CSS) */}
  <div id="print-watermark-logo" aria-hidden="true" />

      {/* First page: Evidence Index table */}
      {renderEvidenceIndex(caseFile, board.items)}

      {/* Subsequent pages: full HTML evidence viewers without labels/wrappers */}
      {Array.isArray(board.items) &&
        board.items.map((item: BoardItem, idx: number) => (
          <section key={`${item.id}-${idx}`} className="print-section print-break">
            {renderViewer(item)}
          </section>
        ))}
    </div>
  );
}
