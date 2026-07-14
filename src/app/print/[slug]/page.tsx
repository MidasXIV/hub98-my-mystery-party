import { notFound } from "next/navigation";
import { coldCases, getCaseBySlug } from "@/data/coldCases";
import type { ColdCase } from "@/data/coldCases";
import type { BoardData, BoardItem, PackagingSlot } from "@/lib/boardTypes";
import CaseBriefingViewer from "@/components/case-briefing-viewer";
import ElectronicMessagesViewer from "@/components/electronic-messages-viewer";
import AutopsyReportViewer from "@/components/autopsy-report-viewer";
import DiaryViewer from "@/components/diary-viewer";
import PersonOfInterestViewer from "@/components/person-of-interest-viewer";
import CriminalProfileViewer from "@/components/criminal-profile-viewer";
import LetterViewer from "@/components/letter-viewer";
import { BrochurePrintViewer } from "@/components/brochure-viewer";
import ReceiptViewer from "@/components/receipt-viewer";
import TicketStubViewer from "@/components/ticket-stub-viewer";
import BoardingPassViewer from "@/components/boarding-pass-viewer";
import TelephoneLogViewer from "@/components/telephone-log-viewer";
import ActivityLogViewer from "@/components/activity-log-viewer";
import SearchAndRescueReportViewer from "@/components/search-and-rescue-report-viewer";
import MapViewer from "@/components/map-viewer";
import MissingPersonReportViewer from "@/components/missing-person-report-viewer";
import NewspaperViewer from "@/components/newspaper-viewer";
import InterrogationTranscriptViewer from "@/components/interrogation-transcript-viewer";
import FormalAlibiViewer from "@/components/formal-alibi-viewer";
import TransmissionLogViewer from "@/components/transmission-log-viewer";
import BankStatementViewer from "@/components/bank-statement-viewer";
import ClueViewer from "@/components/clue-viewer";
import PrintInvestigationGuide from "@/components/print-investigation-guide";
import SpectrographyViewer from "@/components/spectrography-viewer";
import {
  buildRenderableDays,
  type RenderDiaryDay as LayoutRenderDiaryDay,
} from "@/lib/diary-layout";

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
        .guide-top-header { display: block !important; }
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
      .poster-wrap {
        width: 210mm;
        height: 297mm;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: #fff;
      }
      .poster-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      /* Origami-style objective sheet */
      .objective-sheet {
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        padding: 12mm 12mm 10mm;
        color: #171717;
        background-color: #f9f7f1;
        background-image:
          radial-gradient(circle at 25% 15%, rgba(0, 0, 0, 0.03) 0 1.4px, transparent 1.6px),
          radial-gradient(circle at 78% 65%, rgba(0, 0, 0, 0.02) 0 1.1px, transparent 1.4px),
          repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.22) 0px,
            rgba(255, 255, 255, 0.22) 2px,
            rgba(0, 0, 0, 0.01) 3px,
            rgba(0, 0, 0, 0.01) 4px
          );
        border: 1.2px solid rgba(20, 20, 20, 0.28);
      }
      .objective-top,
      .objective-inside {
        border: 1px solid rgba(20, 20, 20, 0.45);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.74);
        box-sizing: border-box;
      }
      .objective-top {
        min-height: 118mm;
        padding: 10mm 9mm 8mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .objective-top-inner {
        transform: rotate(180deg);
        transform-origin: center;
      }
      .objective-kicker {
        font: 700 4.2mm/1.2 "Segoe UI", Arial, sans-serif;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      .objective-title {
        margin-top: 8mm;
        font: 700 11mm/1.05 "Times New Roman", Georgia, serif;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
      .objective-subtitle {
        margin-top: 4mm;
        font: 600 4.8mm/1.3 "Segoe UI", Arial, sans-serif;
      }
      .objective-fold-zone {
        margin: 5mm 0 5mm;
      }
      .objective-fold-line {
        border-top: 1px dashed rgba(30, 30, 30, 0.55);
        margin-bottom: 2.2mm;
      }
      .objective-fold-dots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4.2mm;
      }
      .objective-fold-dots span {
        width: 2.3mm;
        height: 2.3mm;
        border-radius: 9999px;
        border: 1px solid rgba(20, 20, 20, 0.62);
        background: rgba(255, 255, 255, 0.85);
      }
      .objective-fold-label {
        margin-top: 1.8mm;
        text-align: center;
        font: 500 3mm/1.2 "Segoe UI", Arial, sans-serif;
        letter-spacing: 0.11em;
        text-transform: uppercase;
        color: rgba(20, 20, 20, 0.8);
      }
      .objective-inside {
        min-height: 132mm;
        padding: 9mm;
        display: flex;
        flex-direction: column;
      }
      .objective-inside-heading {
        font: 700 5.9mm/1.2 "Segoe UI", Arial, sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 4mm;
      }
      .objective-meta {
        font: 600 4.6mm/1.3 "Segoe UI", Arial, sans-serif;
        margin-bottom: 3mm;
      }
      .objective-description {
        font: 600 6.2mm/1.36 "Times New Roman", Georgia, serif;
        white-space: pre-wrap;
      }
      .completion-letter {
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        padding: 16mm 16mm 14mm;
        background: #f9f7f1;
        color: #161616;
        border: 1.4px solid rgba(22, 22, 22, 0.36);
        background-image:
          radial-gradient(circle at 20% 14%, rgba(0, 0, 0, 0.03) 0 1.6px, transparent 1.9px),
          radial-gradient(circle at 82% 72%, rgba(0, 0, 0, 0.02) 0 1.4px, transparent 1.7px),
          repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.2) 0px,
            rgba(255, 255, 255, 0.2) 2px,
            rgba(0, 0, 0, 0.012) 3px,
            rgba(0, 0, 0, 0.012) 4px
          );
      }
      .completion-letter-heading {
        font: 700 10mm/1.05 "Times New Roman", Georgia, serif;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 6mm;
      }
      .completion-letter-meta {
        font: 600 4.4mm/1.35 "Segoe UI", Arial, sans-serif;
        margin-bottom: 8mm;
      }
      .completion-letter-body {
        font: 500 5.5mm/1.42 "Times New Roman", Georgia, serif;
        white-space: pre-wrap;
      }
      .completion-letter-signoff {
        margin-top: 14mm;
        font: 600 4.8mm/1.3 "Segoe UI", Arial, sans-serif;
      }
      /* Index table styles (first page) */
      .index-wrap { padding: 8mm; box-sizing: border-box; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1.5px solid #111; padding: 6px 8px; font: 12px/1.3 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
      th { background: #f5f5f5; text-align: left; }
      .center { text-align: center; }
      /* Investigation guide page (page 2) */
      .guide-sheet {
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        padding: 12mm;
        color: #f4f1e8;
        background:
          radial-gradient(circle at 20% 12%, rgba(255, 255, 255, 0.08), transparent 26%),
          radial-gradient(circle at 82% 78%, rgba(255, 255, 255, 0.04), transparent 24%),
          linear-gradient(165deg, #2f2a2f 0%, #252126 45%, #1f1c20 100%);
        border: 1.2px solid rgba(226, 202, 131, 0.32);
      }
      .guide-eyebrow {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: rgba(245, 238, 219, 0.68);
        font: 600 3mm/1.2 "Segoe UI", Arial, sans-serif;
      }
      .guide-title {
        margin-top: 3.5mm;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #fdf8e9;
        font: 700 12.5mm/1 "Segoe UI", Arial, sans-serif;
      }
      .guide-subtitle {
        margin: 2.5mm auto 6mm;
        width: fit-content;
        padding: 1.3mm 4mm;
        border: 1px solid rgba(225, 198, 126, 0.55);
        text-transform: uppercase;
        letter-spacing: 0.19em;
        color: rgba(251, 241, 209, 0.9);
        font: 600 2.8mm/1.2 "Segoe UI", Arial, sans-serif;
      }
      .guide-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9mm;
        position: relative;
      }
      .guide-grid::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(50% - 0.5px);
        border-left: 1px dashed rgba(228, 209, 153, 0.35);
      }
      .guide-col {
        display: flex;
        flex-direction: column;
        gap: 4.5mm;
      }
      .guide-section-title {
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: #dec57e;
        font: 700 5.2mm/1.1 "Segoe UI", Arial, sans-serif;
      }
      .guide-panel {
        border: 1px solid rgba(219, 192, 122, 0.48);
        border-radius: 6px;
        background: rgba(18, 16, 18, 0.32);
        padding: 3.5mm;
      }
      .guide-panel-kicker {
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: rgba(242, 231, 200, 0.78);
        font: 700 2.6mm/1.2 "Segoe UI", Arial, sans-serif;
        margin-bottom: 2.2mm;
      }
      .guide-doc-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 4mm;
        row-gap: 1.2mm;
        margin: 0;
        padding: 0;
        list-style: none;
        color: rgba(244, 238, 219, 0.9);
        font: 500 3mm/1.25 "Segoe UI", Arial, sans-serif;
      }
      .guide-doc-list li::before {
        content: "• ";
        color: rgba(231, 206, 136, 0.84);
      }
      .guide-qr-box {
        width: 34mm;
        height: 34mm;
        border: 1px solid rgba(214, 188, 119, 0.56);
        background: rgba(251, 246, 230, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .guide-help-list {
        margin: 0;
        padding-left: 4mm;
        color: rgba(244, 238, 219, 0.92);
        font: 500 3.05mm/1.3 "Segoe UI", Arial, sans-serif;
      }
      .guide-footer {
        margin-top: 6.5mm;
        text-align: center;
        color: rgba(250, 241, 211, 0.86);
        font: 500 2.8mm/1.2 "Segoe UI", Arial, sans-serif;
        letter-spacing: 0.07em;
      }
      /* Cut-out sheet for non-full-page evidence */
      .cutout-sheet {
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        padding: 11mm;
        background-color: #faf9f5;
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.015) 1px, transparent 1px);
        background-size: 6mm 6mm;
        border: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
      }
      .cutout-heading {
        font: 700 4.2mm/1.2 "Segoe UI", Arial, sans-serif;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #2a2a2a;
        margin-bottom: 3.5mm;
      }
      .cutout-subheading {
        font: 500 3.2mm/1.3 "Segoe UI", Arial, sans-serif;
        color: rgba(35, 35, 35, 0.8);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 5mm;
      }
      .cutout-zone {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cutout-frame {
        position: relative;
        width: 176mm;
        min-height: 110mm;
        background: rgba(255, 255, 255, 0.92);
        border: 1px dashed rgba(0, 0, 0, 0.55);
        padding: 7mm;
      }
      .cutout-frame::before,
      .cutout-frame::after {
        content: "";
        position: absolute;
        left: 5mm;
        right: 5mm;
        border-top: 1px dashed rgba(20, 20, 20, 0.25);
      }
      .cutout-frame::before { top: 3mm; }
      .cutout-frame::after { bottom: 3mm; }
      .cutout-corner {
        position: absolute;
        width: 7mm;
        height: 7mm;
        border-color: rgba(10, 10, 10, 0.65);
        border-style: solid;
      }
      .cutout-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
      .cutout-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
      .cutout-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
      .cutout-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
      .cutout-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 96mm;
      }
      .cutout-tip {
        margin-top: 5mm;
        text-align: center;
        font: 600 3mm/1.2 "Segoe UI", Arial, sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(20, 20, 20, 0.78);
      }
      /* A5 cut-out sheet variant for document items */
      .cutout-sheet-a5 {
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        padding: 8mm;
        background-color: #f7f6f2;
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.012) 1px, transparent 1px);
        background-size: 6mm 6mm;
        border: 1.5px solid rgba(0, 0, 0, 0.18);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .cutout-heading-a5 {
        font: 700 3.8mm/1.2 "Segoe UI", Arial, sans-serif;
        letter-spacing: 0.11em;
        text-transform: uppercase;
        color: #2a2a2a;
        margin-bottom: 2.5mm;
        width: 148mm;
      }
      .cutout-subheading-a5 {
        font: 500 2.8mm/1.3 "Segoe UI", Arial, sans-serif;
        color: rgba(35, 35, 35, 0.8);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin-bottom: 3.5mm;
        width: 148mm;
      }
      .cutout-zone-a5 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .cutout-frame-a5 {
        position: relative;
        width: 148mm;
        height: 210mm;
        min-height: 210mm;
        background: rgba(255, 255, 255, 0.96);
        border: 1.5px dashed rgba(0, 0, 0, 0.55);
        padding: 6mm;
        box-sizing: border-box;
        overflow: hidden;
      }
      .cutout-frame-a5::before,
      .cutout-frame-a5::after {
        content: "";
        position: absolute;
        left: 4mm;
        right: 4mm;
        border-top: 1px dashed rgba(20, 20, 20, 0.22);
      }
      .cutout-frame-a5::before { top: 2mm; }
      .cutout-frame-a5::after { bottom: 2mm; }
      .cutout-corner-a5 {
        position: absolute;
        width: 6mm;
        height: 6mm;
        border-color: rgba(10, 10, 10, 0.62);
        border-style: solid;
      }
      .cutout-corner-a5.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
      .cutout-corner-a5.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
      .cutout-corner-a5.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
      .cutout-corner-a5.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
      .cutout-content-a5 {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        min-height: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .cutout-tip-a5 {
        margin-top: 3mm;
        text-align: center;
        font: 600 2.6mm/1.2 "Segoe UI", Arial, sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        color: rgba(20, 20, 20, 0.78);
      }
    `}</style>
    );
  };

  const cutoutItemTypes = new Set<BoardItem["type"]>([
    "clue",
    "note",
    "folder-tab",
    "ticket",
    "receipt",
    "objectives-cleared-badge",
    "document", // now render documents as cutout mesh (A5)
    "diary", // render diary as A5 cutout
  ]);

  const shouldRenderAsCutout = (item: BoardItem) =>
    cutoutItemTypes.has(item.type);

  const parseBadgeContent = (
    content: string,
  ): {
    imageUrl?: string;
    caseId?: string;
    issueDate?: string;
  } => {
    try {
      const parsed = JSON.parse(content || "{}");
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as {
          imageUrl?: string;
          caseId?: string;
          issueDate?: string;
        };
      }
    } catch {
      // Ignore malformed badge JSON and use fallback UI.
    }
    return {};
  };

  // Print viewer for all BoardItem types in ITEM_TYPES
  const renderViewer = (item: BoardItem) => {
    const content = item.content;
    switch (item.type) {
      case "brochure":
        return <BrochurePrintViewer content={content} />;
      case "case-briefing":
        return <CaseBriefingViewer content={content} />;
      case "electronic-messages":
        return <ElectronicMessagesViewer content={content} />;
      case "autopsy-report":
        return <AutopsyReportViewer content={content} />;
      case "diary":
        return <DiaryViewer content={content} />;
      case "letter":
        return <LetterViewer content={content} />;
      case "person-of-interest-report":
        return <PersonOfInterestViewer content={content} />;
      case "criminal-profile":
        return <CriminalProfileViewer content={content} />;
      case "receipt":
        return <ReceiptViewer content={content} />;
      case "ticket":
        return <TicketStubViewer content={content} />;
      case "boarding-pass":
        return <BoardingPassViewer content={content} />;
      case "spectrography-report":
        return <SpectrographyViewer content={content} />;
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
      case "objectives-cleared-badge": {
        const badge = parseBadgeContent(content);
        return (
          <div className="w-full flex flex-col items-center justify-center py-4">
            <div className="w-full max-w-[120mm] bg-white border border-gray-300 rounded-md p-5 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">
                Objectives Cleared
              </p>
              <div className="w-[56mm] h-[56mm] mx-auto relative flex items-center justify-center">
                {badge.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={badge.imageUrl}
                    alt={item.title || "Objectives Cleared Badge"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-full border border-dashed border-gray-400 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-500">
                    Badge Missing
                  </div>
                )}
              </div>
              <p className="mt-3 text-[11px] text-gray-700 font-semibold">
                {item.title || "Case Completion Badge"}
              </p>
              {(badge.caseId || badge.issueDate) && (
                <p className="mt-1 text-[10px] text-gray-500">
                  {badge.caseId ? `Ref: ${badge.caseId}` : ""}
                  {badge.caseId && badge.issueDate ? " • " : ""}
                  {badge.issueDate ? `Issued: ${badge.issueDate}` : ""}
                </p>
              )}
            </div>
          </div>
        );
      }
      case "bank-statement":
        return <BankStatementViewer content={content} />;
      case "clue":
        return <ClueViewer content={content} />;
      case "document":
        return (
          <div className="w-full min-h-[180mm] bg-amber-50 text-black text-xs overflow-visible p-4 font-special-elite">
            <h3 className="font-bold text-sm mb-2 border-b border-black/20 text-red-900">
              TOP SECRET // EYES ONLY
            </h3>
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        );
      case "note":
        return (
          <div className="w-full h-full bg-yellow-200 text-black text-sm p-3 shadow-md font-kalam">
            <p>{content}</p>
          </div>
        );
      case "folder-tab":
        return (
          <div className="w-full h-full bg-yellow-600 text-white text-xs p-1 px-3 flex items-center justify-center uppercase font-staatliches tracking-wider">
            {content}
          </div>
        );
      case "photo":
        // For photos we can reuse MapViewer-like simple image printing by passing content as JSON
        // but here we simply show the image in a centered box using standard img tag
        try {
          const url = item.imageUrl || undefined;
          if (!url) return null;
          return (
            <div className="w-full flex items-center justify-center py-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={String(item.content)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "95vh",
                  objectFit: "contain",
                }}
              />
            </div>
          );
        } catch {
          return null;
        }
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Unsupported evidence type: {item.type}
          </div>
        );
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
      case "brochure":
        return "Brochure";
      case "case-briefing":
        return "Case Briefing";
      case "electronic-messages":
        return "Electronic Messages";
      case "autopsy-report":
        return "Autopsy Report";
      case "diary":
        return "Diary";
      case "letter":
        return "Letter";
      case "person-of-interest-report":
        return "Person of Interest";
      case "criminal-profile":
        return "Criminal Profile";
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
                      <td className="center">
                        {packs.has("suspect") ? "✓" : ""}
                      </td>
                    )}
                    {available.includes("evidence") && (
                      <td className="center">
                        {packs.has("evidence") ? "✓" : ""}
                      </td>
                    )}
                    {available.includes("bonus") && (
                      <td className="center">
                        {packs.has("bonus") ? "✓" : ""}
                      </td>
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

  const renderCasePoster = (c: ColdCase) => {
    if (!c.imageUrl) return null;

    return (
      <section
        className="print-section print-break"
        aria-label="Case Poster Cover"
      >
        <div className="poster-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imageUrl}
            alt={`${c.title} case poster`}
            className="poster-image"
          />
        </div>
      </section>
    );
  };

  const renderInvestigationGuide = (
    c: ColdCase,
    items: BoardItem[],
    objectives: BoardData["objectives"],
  ) => {
    return (
      <PrintInvestigationGuide
        c={c}
        items={items}
        objectives={objectives}
        labelForItem={labelForItem}
      />
    );
  };

  const renderObjectiveSheets = (
    c: ColdCase,
    objectives: BoardData["objectives"],
  ) => {
    if (!Array.isArray(objectives) || objectives.length === 0) return null;

    return objectives.map((objective, index) => (
      <section
        key={`objective-sheet-${objective.id || index}`}
        className="print-section print-break"
        aria-label={`Objective ${index + 1}`}
      >
        <div className="objective-sheet">
          <div className="objective-top">
            <div className="objective-top-inner">
              <p className="objective-kicker">Foldable Objective Sheet</p>
              <h2 className="objective-title">{`OBJECTIVE ${index + 1}: ${c.title}`}</h2>
              <p className="objective-subtitle">
                Fold along the dotted guide to reveal the objective inside.
              </p>
            </div>
          </div>

          <div className="objective-fold-zone" aria-hidden="true">
            <div className="objective-fold-line" />
            <div className="objective-fold-dots">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="objective-fold-label">Fold Here</p>
          </div>

          <div className="objective-inside">
            <h3 className="objective-inside-heading">
              Objective {index + 1} — Inside Brief
            </h3>
            <p className="objective-description">{objective.description}</p>
          </div>
        </div>
      </section>
    ));
  };

  const renderClueSheets = (
    c: ColdCase,
    clues: BoardData["clues"],
    objectives: BoardData["objectives"],
  ) => {
    if (!Array.isArray(clues) || clues.length === 0) return null;

    const objectiveLookup = new Map(
      objectives.map((objective, index) => [objective.id, index + 1]),
    );

    return clues.map((clue, index) => {
      const forObjective = objectiveLookup.get(clue.forObjective);
      return (
        <section
          key={`clue-sheet-${clue.id || index}`}
          className="print-section print-break"
          aria-label={`Clue ${index + 1}`}
        >
          <div className="objective-sheet">
            <div className="objective-top">
              <div className="objective-top-inner">
                <p className="objective-kicker">Foldable Clue Sheet</p>
                <h2 className="objective-title">{`CLUE ${index + 1}: ${c.title}`}</h2>
                <p className="objective-subtitle">
                  Fold along the dotted guide to reveal this clue inside.
                </p>
              </div>
            </div>

            <div className="objective-fold-zone" aria-hidden="true">
              <div className="objective-fold-line" />
              <div className="objective-fold-dots">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="objective-fold-label">Fold Here</p>
            </div>

            <div className="objective-inside">
              <h3 className="objective-inside-heading">
                Clue {index + 1} — Inside Brief
              </h3>
              {typeof forObjective === "number" && (
                <p className="objective-meta">
                  Linked Objective: {forObjective}
                </p>
              )}
              <p className="objective-description">{clue.clue}</p>
            </div>
          </div>
        </section>
      );
    });
  };

  const renderAnswerSheets = (
    c: ColdCase,
    objectives: BoardData["objectives"],
  ) => {
    if (!Array.isArray(objectives) || objectives.length === 0) return null;

    return objectives.map((objective, index) => {
      const answer =
        typeof objective.solution === "string" &&
        objective.solution.trim().length > 0
          ? objective.solution.trim()
          : "Answer not provided in case data for this objective.";

      return (
        <section
          key={`answer-sheet-${objective.id || index}`}
          className="print-section print-break"
          aria-label={`Answer ${index + 1}`}
        >
          <div className="objective-sheet">
            <div className="objective-top">
              <div className="objective-top-inner">
                <p className="objective-kicker">Foldable Answer Sheet</p>
                <h2 className="objective-title">{`ANSWER ${index + 1}: ${c.title}`}</h2>
                <p className="objective-subtitle">
                  Fold along the dotted guide to reveal the answer inside.
                </p>
              </div>
            </div>

            <div className="objective-fold-zone" aria-hidden="true">
              <div className="objective-fold-line" />
              <div className="objective-fold-dots">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="objective-fold-label">Fold Here</p>
            </div>

            <div className="objective-inside">
              <h3 className="objective-inside-heading">
                Answer {index + 1} — Inside Brief
              </h3>
              <p className="objective-meta">Objective {index + 1}</p>
              <p className="objective-description">{answer}</p>
            </div>
          </div>
        </section>
      );
    });
  };

  const renderCompletionLetter = (c: ColdCase, items: BoardItem[]) => {
    const badgeItem = items.find(
      (item) => item.type === "objectives-cleared-badge",
    );

    let badgeText =
      "Your investigation is complete. You followed every thread, validated every contradiction, and brought this case to a close.";
    let officerSignature = "Cold Case Division";
    let issueDate = new Date().toLocaleDateString();
    let caseId = c.slug.toUpperCase();

    if (badgeItem?.content) {
      try {
        const parsed = JSON.parse(badgeItem.content) as {
          text?: string;
          officerSignature?: string;
          issueDate?: string;
          caseId?: string;
        };
        if (typeof parsed.text === "string" && parsed.text.trim()) {
          badgeText = parsed.text.trim();
        }
        if (
          typeof parsed.officerSignature === "string" &&
          parsed.officerSignature.trim()
        ) {
          officerSignature = parsed.officerSignature.trim();
        }
        if (typeof parsed.issueDate === "string" && parsed.issueDate.trim()) {
          issueDate = parsed.issueDate.trim();
        }
        if (typeof parsed.caseId === "string" && parsed.caseId.trim()) {
          caseId = parsed.caseId.trim();
        }
      } catch {
        // Keep fallback completion-letter content if badge payload is not valid JSON.
      }
    }

    return (
      <section
        className="print-section print-break"
        aria-label="Final Case Completion Letter"
      >
        <div className="completion-letter">
          <h2 className="completion-letter-heading">
            Final Case Completion Letter
          </h2>
          <p className="completion-letter-meta">Case File: {c.title}</p>
          <p className="completion-letter-meta">Case ID: {caseId}</p>
          <p className="completion-letter-meta">Date Issued: {issueDate}</p>

          <p className="completion-letter-body">{badgeText}</p>

          <p className="completion-letter-signoff">
            Signed, {officerSignature}
          </p>
        </div>
      </section>
    );
  };

  const renderCutoutSheet = (item: BoardItem) => {
    const label = labelForItem(item);
    // Special A5 mesh for documents and diary
    if (item.type === "document") {
      return (
        <div className="cutout-sheet-a5">
          <h3 className="cutout-heading-a5">Cut-Out Document</h3>
          <p className="cutout-subheading-a5">{label}</p>
          <div className="cutout-zone-a5">
            <div className="cutout-frame-a5">
              <span className="cutout-corner-a5 tl" aria-hidden="true" />
              <span className="cutout-corner-a5 tr" aria-hidden="true" />
              <span className="cutout-corner-a5 bl" aria-hidden="true" />
              <span className="cutout-corner-a5 br" aria-hidden="true" />
              <div className="cutout-content-a5">{renderViewer(item)}</div>
            </div>
          </div>
          <p className="cutout-tip-a5">✂ Cut out along the dashed frame</p>
        </div>
      );
    }
    if (item.type === "diary") {
      // Parse diary content and split into logical pages
      type DiaryDay = { date?: string; entries: string[] };
      type DiaryMarginNote = {
        text: string;
        page?: number;
        date?: string;
        dayIndex?: number;
        side?: "left" | "right";
        offset?: number;
        rotate?: number;
      };
      type DiaryEntryFont =
        | "default"
        | "gloria-hallelujah"
        | "reenie-beanie"
        | "nanum-pen-script"
        | "fuggles"
        | "caveat";
      type DiaryStylePreset = "clean" | "worn" | "distressed";
      type DiaryDoodlePack =
        | "none"
        | "minimal"
        | "science"
        | "botanical"
        | "mechanical"
        | "paranoid";
      type DiaryEmboss = "none" | "soft" | "deep";
      type DiaryData = {
        title?: string;
        entriesPerPage?: number;
        diaryEntries?: DiaryDay[];
        entryFont?: string;
        marginNotes?: DiaryMarginNote[];
        diaryStyle?: {
          preset?: DiaryStylePreset;
          handwritingStyle?: DiaryEntryFont;
          inkColor?: string;
          paperColor?: string;
          embossLabel?: string;
          embossSubLabel?: string;
          pressureLevel?: number;
          lineOpacity?: number;
          textureOpacity?: number;
          wearLevel?: number;
          neatness?: number;
          neatnessLevel?: number;
          doodlePack?: DiaryDoodlePack;
          emboss?: DiaryEmboss;
        };
      };
      const diaryFontFamilyByName: Record<
        Exclude<DiaryEntryFont, "default">,
        string
      > = {
        "gloria-hallelujah": '"Gloria Hallelujah", cursive',
        "reenie-beanie": '"Reenie Beanie", cursive',
        "nanum-pen-script": '"Nanum Pen Script", cursive',
        fuggles: '"Fuggles", cursive',
        caveat: '"Caveat", cursive',
      };
      const diaryFonts = [
        "default",
        "gloria-hallelujah",
        "reenie-beanie",
        "nanum-pen-script",
        "fuggles",
        "caveat",
      ];
      const clamp = (value: number, min: number, max: number): number =>
        Math.min(max, Math.max(min, value));
      const hashSeed = (input: string): number => {
        let hash = 0;
        for (let i = 0; i < input.length; i += 1) {
          hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
        }
        return hash;
      };
      const seeded = (seed: number, salt: number): number => {
        const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453123;
        return x - Math.floor(x);
      };
      const asMarginNotes = (value: unknown): DiaryMarginNote[] => {
        if (!Array.isArray(value)) return [];
        return value
          .map((n) => {
            if (!n || typeof n !== "object") return null;
            const raw = n as Record<string, unknown>;
            if (typeof raw.text !== "string" || raw.text.trim().length === 0) return null;
            const side = raw.side === "left" || raw.side === "right" ? raw.side : undefined;
            return {
              text: raw.text,
              page: typeof raw.page === "number" ? raw.page : undefined,
              date: typeof raw.date === "string" ? raw.date : undefined,
              dayIndex: typeof raw.dayIndex === "number" ? raw.dayIndex : undefined,
              side,
              offset: typeof raw.offset === "number" ? raw.offset : undefined,
              rotate: typeof raw.rotate === "number" ? raw.rotate : undefined,
            } as DiaryMarginNote;
          })
          .filter((n): n is DiaryMarginNote => Boolean(n));
      };
      const isDiaryEntryFont = (value: unknown): value is DiaryEntryFont =>
        typeof value === "string" && diaryFonts.includes(value);

      let data: DiaryData = {};
      try {
        data = JSON.parse(item.content);
      } catch {
        data = {
          title: "Diary",
          diaryEntries: [{ entries: [item.content] }],
          entriesPerPage: 2,
        };
      }
      const entriesPerPage = Math.max(1, data.entriesPerPage ?? 2);
      const days: DiaryDay[] = Array.isArray(data.diaryEntries)
        ? (data.diaryEntries as DiaryDay[]).map((d) => ({
            entries: d.entries || [],
            date: d.date,
          }))
        : [];
      const marginNotes = asMarginNotes(data.marginNotes);
      const stylePreset =
        data.diaryStyle?.preset === "worn" || data.diaryStyle?.preset === "distressed"
          ? data.diaryStyle.preset
          : "clean";
      const styleBase =
        stylePreset === "distressed"
          ? {
              inkColor: "#2b241d",
              dateColor: "#554536",
              paperColor: "#f3e4cc",
              borderColor: "#b59f7b",
              embossLabel: "FIELD DIARY",
              embossSubLabel: "ARCHIVE COPY",
              pressureLevel: 0.76,
              lineOpacity: 0.24,
              textureOpacity: 0.18,
              wearLevel: 0.72,
              neatness: 0.34,
            }
          : stylePreset === "worn"
            ? {
                inkColor: "#2f2a24",
                dateColor: "#493d31",
                paperColor: "#f8efdf",
                borderColor: "#c5b395",
                embossLabel: "FIELD DIARY",
                embossSubLabel: "ARCHIVE COPY",
                pressureLevel: 0.58,
                lineOpacity: 0.2,
                textureOpacity: 0.13,
                wearLevel: 0.45,
                neatness: 0.56,
              }
            : {
                inkColor: "#25211d",
                dateColor: "#3a3128",
                paperColor: "#fffaf1",
                borderColor: "#d8ccb8",
                embossLabel: "FIELD DIARY",
                embossSubLabel: "ARCHIVE COPY",
                pressureLevel: 0.42,
                lineOpacity: 0.14,
                textureOpacity: 0.08,
                wearLevel: 0.16,
                neatness: 0.84,
              };

      const resolvedNeatness =
        data.diaryStyle?.neatnessLevel ?? data.diaryStyle?.neatness ?? styleBase.neatness;

      const resolvedStyle = {
        inkColor: data.diaryStyle?.inkColor ?? styleBase.inkColor,
        dateColor: styleBase.dateColor,
        paperColor: data.diaryStyle?.paperColor ?? styleBase.paperColor,
        borderColor: styleBase.borderColor,
        embossLabel: data.diaryStyle?.embossLabel ?? styleBase.embossLabel,
        embossSubLabel: data.diaryStyle?.embossSubLabel ?? styleBase.embossSubLabel,
        emboss: data.diaryStyle?.emboss ?? "soft",
        pressureLevel: clamp(data.diaryStyle?.pressureLevel ?? styleBase.pressureLevel, 0, 1),
        lineOpacity: clamp(data.diaryStyle?.lineOpacity ?? styleBase.lineOpacity, 0.04, 0.36),
        textureOpacity: clamp(data.diaryStyle?.textureOpacity ?? styleBase.textureOpacity, 0.03, 0.32),
        wearLevel: clamp(data.diaryStyle?.wearLevel ?? styleBase.wearLevel, 0, 1),
        neatness: clamp(resolvedNeatness, 0, 1),
        doodlePack: data.diaryStyle?.doodlePack ?? "minimal",
      };
      const resolvedEntryFont: DiaryEntryFont = isDiaryEntryFont(data.diaryStyle?.handwritingStyle)
        ? data.diaryStyle.handwritingStyle
        : isDiaryEntryFont(data.entryFont)
          ? data.entryFont
          : "default";
      const entryFontStyle =
        resolvedEntryFont === "default"
          ? {
              fontSize: "0.875rem",
              lineHeight: 1.55,
            }
          : {
              fontFamily: diaryFontFamilyByName[resolvedEntryFont],
              fontSize: "1.12rem",
              lineHeight: 1.45,
            };
      const dateStyle = {
        ...entryFontStyle,
        letterSpacing: "inherit",
        fontWeight: "inherit",
      };
      const renderDays = buildRenderableDays(days, {
        handwritten: resolvedEntryFont !== "default",
        sectionsPerPage: entriesPerPage,
      });
      const totalPages =
        renderDays.length === 0 ? 1 : Math.ceil(renderDays.length / entriesPerPage);
      const pages = Array.from({ length: totalPages }, (_, pageIdx: number) => {
        const startIndex = pageIdx * entriesPerPage;
        const visibleDays = renderDays.slice(startIndex, startIndex + entriesPerPage);
        return (
          <div
            className="cutout-sheet-a5 print-break"
            key={`diary-cutout-page-${pageIdx}`}
          >
            <h3 className="cutout-heading-a5">
              Cut-Out Diary Page {pageIdx + 1}
            </h3>
            <p className="cutout-subheading-a5">{label}</p>
            <div className="cutout-zone-a5">
              <div className="cutout-frame-a5">
                <span className="cutout-corner-a5 tl" aria-hidden="true" />
                <span className="cutout-corner-a5 tr" aria-hidden="true" />
                <span className="cutout-corner-a5 bl" aria-hidden="true" />
                <span className="cutout-corner-a5 br" aria-hidden="true" />
                <div className="cutout-content-a5">
                  {/* Render only the entries for this page, using DiaryViewer logic but static */}
                  <div className="w-full flex flex-col gap-6 h-full min-h-0 justify-stretch overflow-hidden">
                    {visibleDays.map((day: LayoutRenderDiaryDay, idx: number) => (
                      (() => {
                        const daySeed = hashSeed(`${label}-${day.date || ""}-${startIndex + idx}`);
                        const currentPage = pageIdx + 1;
                        const notesForPage = marginNotes.filter(
                          (note) => note.page === undefined || note.page === currentPage,
                        );
                        const notesForDay = notesForPage.filter((note) => {
                          if (note.date && note.date !== day.date) return false;
                          if (typeof note.dayIndex === "number") return note.dayIndex === idx + 1;
                          if (note.date) return true;
                          return idx === 0;
                        });
                        const paperTilt = (1 - resolvedStyle.neatness) * (seeded(daySeed, 1) * 1.2 - 0.6);
                        const lineOpacity = clamp(
                          resolvedStyle.lineOpacity + (seeded(daySeed, 2) - 0.5) * 0.06,
                          0.04,
                          0.36,
                        );
                        const textureOpacity = clamp(
                          resolvedStyle.textureOpacity + (seeded(daySeed, 4) - 0.5) * 0.05,
                          0.03,
                          0.32,
                        );
                        const vignetteOpacity = clamp(resolvedStyle.wearLevel * 0.18, 0, 0.26);
                        const inkAlpha = clamp(0.72 + resolvedStyle.pressureLevel * 0.28, 0.64, 1);
                        const inkShadow = `${resolvedStyle.pressureLevel * 0.5}px ${resolvedStyle.pressureLevel * 0.6}px 0 rgba(0,0,0,0.14)`;
                        const doodleOpacity = clamp(0.08 + resolvedStyle.wearLevel * 0.12, 0.06, 0.2);

                        const doodlePath =
                          resolvedStyle.doodlePack === "science"
                            ? "M10 12 L54 12 M18 28 C30 10, 40 46, 54 26 M66 18 m -8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0"
                            : resolvedStyle.doodlePack === "botanical"
                              ? "M16 38 C34 8, 56 8, 72 38 M44 38 L44 16 M44 25 C34 24, 30 30, 28 36"
                              : resolvedStyle.doodlePack === "mechanical"
                                ? "M14 12 L32 12 L32 30 L14 30 Z M44 14 L72 14 L72 34 M46 34 L72 34"
                                : "M8 30 C22 14, 34 46, 50 24 M54 30 C64 16, 74 16, 84 30 M62 42 L70 34 L78 42";
                        const paragraphNudge = (eIdx: number) =>
                          `${(1 - resolvedStyle.neatness) * (seeded(daySeed + eIdx, 8) * 0.8 - 0.4)}px`;
                        const embossOpacity = resolvedStyle.emboss === "deep" ? 0.13 : 0.08;
                        const embossTilt = seeded(daySeed, 31) * 8 - 4;

                        return (
                          <div
                            key={(day.date || "day") + idx}
                            className="relative border rounded-sm p-4 flex flex-col flex-1 min-h-0 justify-start gap-2 overflow-hidden"
                            style={{
                              flex: 1,
                              minHeight: 0,
                              borderColor: resolvedStyle.borderColor,
                              backgroundColor: resolvedStyle.paperColor,
                              transform: `rotate(${paperTilt}deg)`,
                            }}
                          >
                            <div
                              className="absolute inset-0 pointer-events-none"
                              aria-hidden="true"
                              style={{
                                opacity: textureOpacity,
                                backgroundImage:
                                  "radial-gradient(circle at 14% 18%, rgba(95,74,51,0.9) 0 0.75px, transparent 0.95px), radial-gradient(circle at 72% 28%, rgba(95,74,51,0.8) 0 0.7px, transparent 0.9px)",
                                backgroundSize: "5px 5px, 7px 7px",
                              }}
                            />
                            <div
                              className="absolute inset-0 pointer-events-none"
                              aria-hidden="true"
                              style={{
                                opacity: lineOpacity,
                                backgroundImage:
                                  "repeating-linear-gradient(to bottom, transparent 0, transparent 23px, rgba(70,90,140,0.85) 24px, transparent 25px)",
                              }}
                            />
                            <div
                              className="absolute inset-0 pointer-events-none"
                              aria-hidden="true"
                              style={{
                                opacity: vignetteOpacity,
                                background:
                                  "radial-gradient(ellipse at center, transparent 55%, rgba(86,64,42,0.9) 100%)",
                              }}
                            />
                            {resolvedStyle.doodlePack !== "none" && (
                              <svg
                                className="absolute left-3 top-3 w-16 h-10 pointer-events-none"
                                viewBox="0 0 90 50"
                                fill="none"
                                aria-hidden="true"
                                style={{ opacity: doodleOpacity }}
                              >
                                <path d={doodlePath} stroke="#6f5738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                            {notesForDay.map((note, noteIdx) => {
                              const side = note.side ?? (noteIdx % 2 === 0 ? "left" : "right");
                              const sideClass = side === "left" ? "left-2" : "right-2";
                              const topOffset = note.offset ?? 16 + noteIdx * 14;
                              const rotate = note.rotate ?? (seeded(daySeed, 20 + noteIdx) * 12 - 6);
                              return (
                                <p
                                  key={`${note.text}-${noteIdx}`}
                                  className={`absolute ${sideClass} z-20 max-w-[20mm] text-[11px] leading-[1.05] pointer-events-none`}
                                  style={{
                                    top: `${topOffset}%`,
                                    transform: `rotate(${rotate}deg)`,
                                    color: resolvedStyle.inkColor,
                                    opacity: clamp(0.52 + resolvedStyle.pressureLevel * 0.28, 0.5, 0.9),
                                    textShadow: "0.4px 0.4px 0 rgba(0,0,0,0.1)",
                                    ...(resolvedEntryFont !== "default" ? { fontFamily: diaryFontFamilyByName[resolvedEntryFont] } : {}),
                                  }}
                                >
                                  {note.text}
                                </p>
                              );
                            })}
                            {day.overflowMarginText && (
                              <p
                                className="absolute right-2 top-[22%] z-20 max-w-[22mm] text-[11px] leading-[1.03] pointer-events-none"
                                style={{
                                  ...entryFontStyle,
                                  color: resolvedStyle.inkColor,
                                  opacity: clamp(0.44 + resolvedStyle.pressureLevel * 0.22, 0.42, 0.75),
                                  transform: `rotate(${seeded(daySeed, 61) * 10 - 5}deg)`,
                                  textShadow: "0.3px 0.3px 0 rgba(0,0,0,0.08)",
                                }}
                              >
                                {day.overflowMarginText}
                              </p>
                            )}
                            {resolvedStyle.emboss !== "none" && (
                              <div
                                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none uppercase"
                                aria-hidden="true"
                                style={{
                                  opacity: embossOpacity,
                                  transform: `rotate(${embossTilt}deg)`,
                                }}
                              >
                                <div
                                  className="rounded-full border px-8 py-4 text-center"
                                  style={{
                                    color: "#5f5f5f",
                                    borderColor: "#7c7c7c",
                                    background: "transparent",
                                    filter: "blur(0.15px)",
                                    textShadow: "0.2px 0.2px 0 rgba(255,255,255,0.4), -0.2px -0.2px 0 rgba(0,0,0,0.2)",
                                  }}
                                >
                                  <p className="text-[10px] tracking-[0.2em] leading-none">{resolvedStyle.embossLabel}</p>
                                  <p className="text-[8px] tracking-[0.14em] mt-[2px] leading-none">{resolvedStyle.embossSubLabel}</p>
                                </div>
                              </div>
                            )}
                        <div className="flex items-center mb-2">
                          <span
                            className="text-gray-600"
                            style={{ ...dateStyle, color: resolvedStyle.dateColor }}
                          >
                            {day.date || `Day ${startIndex + idx + 1}`}
                            {day.continuedFromPrevious ? " (cont.)" : ""}
                            {day.continuedToNext ? " (continues)" : ""}
                          </span>
                        </div>
                        <div
                          className="space-y-3 text-sm leading-relaxed flex-1 min-h-0 overflow-hidden"
                          style={{
                            ...entryFontStyle,
                            color: resolvedStyle.inkColor,
                            opacity: inkAlpha,
                            textShadow: inkShadow,
                          }}
                        >
                          {day.entries.map((entry: string, eIdx: number) => (
                            <p
                              key={eIdx}
                              className="whitespace-pre-wrap break-words"
                              style={{ marginLeft: paragraphNudge(eIdx) }}
                            >
                              {entry}
                            </p>
                          ))}
                        </div>
                          </div>
                        );
                      })()
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="cutout-tip-a5">✂ Cut out along the dashed frame</p>
          </div>
        );
      });
      return <>{pages}</>;
    }
    // Default cutout for other types
    return (
      <div className="cutout-sheet">
        <h3 className="cutout-heading">Cut-Out Evidence Piece</h3>
        <p className="cutout-subheading">{label}</p>
        <div className="cutout-zone">
          <div className="cutout-frame">
            <span className="cutout-corner tl" aria-hidden="true" />
            <span className="cutout-corner tr" aria-hidden="true" />
            <span className="cutout-corner bl" aria-hidden="true" />
            <span className="cutout-corner br" aria-hidden="true" />
            <div className="cutout-content">{renderViewer(item)}</div>
          </div>
        </div>
        <p className="cutout-tip">✂ Cut along the dashed frame</p>
      </div>
    );
  };

  const renderEvidenceChecklistPage = (c: ColdCase, items: BoardItem[]) => {
    const checklistItems = items.map((item, idx) => ({
      key: `${item.id || "item"}-${idx}`,
      label: labelForItem(item),
    }));

    return (
      <section
        className="print-section print-break"
        aria-label="Evidence Checklist Page"
      >
        <div className="w-[210mm] min-h-[297mm] bg-white text-black border border-gray-400 px-8 py-10 flex flex-col">
          <h2 className="text-[8mm] font-bold tracking-[0.08em] uppercase text-center text-gray-800">
            Evidence Checklist
          </h2>
          <p className="mt-1 text-[3.1mm] text-center tracking-[0.05em] uppercase text-gray-600">
            Mark each evidence item after you have fully read it
          </p>
          <p className="mt-2 text-[2.8mm] text-center text-gray-500 uppercase tracking-[0.08em]">
            Case: {c.title}
          </p>

          <div className="mt-6 border border-gray-400">
            <div className="grid grid-cols-[12mm_1fr_45mm] bg-gray-100 border-b border-gray-400 text-[2.9mm] font-semibold uppercase tracking-[0.08em]">
              <div className="p-2 text-center">Read</div>
              <div className="p-2 border-l border-gray-400">Evidence Item</div>
              <div className="p-2 border-l border-gray-400 text-center">
                Notes
              </div>
            </div>

            {checklistItems.map((entry) => (
              <div
                key={entry.key}
                className="grid grid-cols-[12mm_1fr_45mm] border-b border-gray-300 last:border-b-0 text-[3.1mm]"
              >
                <div className="p-2 flex items-center justify-center">
                  <span
                    className="block w-[4.6mm] h-[4.6mm] border border-black"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-2 border-l border-gray-300 leading-tight">
                  {entry.label}
                </div>
                <div className="p-2 border-l border-gray-300" />
              </div>
            ))}
          </div>

          <p className="mt-4 text-[2.7mm] text-gray-600 uppercase tracking-[0.07em]">
            Investigator signature: __________________________
          </p>
        </div>
      </section>
    );
  };

  return (
    <div id="print-root" className="print-container">
      <PrintStyles
        watermarkLogoUrl={
          slug === "station-zero"
            ? "/cold_case_data/station_zero/qrcode.png"
            : undefined
        }
      />
      {/* Print watermark logo (print-only via CSS) */}
      <div id="print-watermark-logo" aria-hidden="true" />

      {/* First page: Case Poster */}
      {renderCasePoster(caseFile)}

      {/* Second page: Investigation guide layout */}
      {renderInvestigationGuide(caseFile, board.items, board.objectives)}

      {/* Third page: Evidence Index table */}
      {renderEvidenceIndex(caseFile, board.items)}

      {/* Locked envelope fold-out templates: one per objective */}
      {/* <LockedEnvelopeFoldouts c={caseFile} objectives={board.objectives} /> */}

      {/* Objective sheets: one objective per page with fold guide */}
      {renderObjectiveSheets(caseFile, board.objectives)}

      {/* Clue sheets: one clue per page with fold guide */}
      {renderClueSheets(caseFile, board.clues, board.objectives)}

      {/* Answer sheets: one answer per objective page with fold guide */}
      {renderAnswerSheets(caseFile, board.objectives)}

      {/* Subsequent pages: full HTML evidence viewers without labels/wrappers */}
      {Array.isArray(board.items) &&
        board.items.map((item: BoardItem, idx: number) => (
          <section
            key={`${item.id}-${idx}`}
            className="print-section print-break"
          >
            {shouldRenderAsCutout(item)
              ? renderCutoutSheet(item)
              : renderViewer(item)}
          </section>
        ))}

      {/* Final page: case completion letter */}
      {renderCompletionLetter(caseFile, board.items)}

      {/* Bonus: Blank Notes Page (Lined) */}
      <section
        className="print-section print-break"
        aria-label="Blank Notes Page (Lined)"
      >
        <div
          className="w-[210mm] min-h-[297mm] flex flex-col items-center justify-start bg-white px-10 pt-12 pb-8"
          style={{ border: "1.2px solid #bbb", position: "relative" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-700 tracking-widest uppercase text-center">
            Notes
          </h2>
          <div className="w-full flex-1 relative">
            {/* Lined background using repeating linear gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                background:
                  "repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 1.2px, transparent 1.2px, transparent 22px)",
                pointerEvents: "none",
              }}
            />
            <div
              className="relative z-10 w-full h-full"
              style={{ minHeight: "220mm" }}
            />
          </div>
        </div>
      </section>

      {/* Bonus: Blank Notes Page (Grid) */}
      <section
        className="print-section print-break"
        aria-label="Blank Notes Page (Grid)"
      >
        <div
          className="w-[210mm] min-h-[297mm] flex flex-col items-center justify-start bg-white px-10 pt-12 pb-8"
          style={{ border: "1.2px solid #bbb", position: "relative" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-700 tracking-widest uppercase text-center">
            Grid Notes
          </h2>
          <div className="w-full flex-1 relative">
            {/* Grid background using repeating linear gradients */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                background:
                  "repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 18px), repeating-linear-gradient(to right, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 18px)",
                pointerEvents: "none",
              }}
            />
            <div
              className="relative z-10 w-full h-full"
              style={{ minHeight: "220mm" }}
            />
          </div>
        </div>
      </section>

      {/* Final page: Evidence read checklist */}
      {renderEvidenceChecklistPage(caseFile, board.items)}
    </div>
  );
}
