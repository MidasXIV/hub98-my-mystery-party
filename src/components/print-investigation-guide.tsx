import type { ColdCase } from "@/data/coldCases";
import type { BoardData, BoardItem } from "@/lib/boardTypes";

type PrintInvestigationGuideProps = {
  c: ColdCase;
  items: BoardItem[];
  objectives: BoardData["objectives"];
  labelForItem: (item: BoardItem) => string;
};


// Extracted theme to keep the main component clean
const theme = {
  bg: "#838078", // Organic muted grayish-olive
  accent: "#cab185", // Soft gold/tan
  textPrimary: "#ffffff",
  textSecondary: "#e0dcd3",
  panelBg: "rgba(0, 0, 0, 0.15)", // Slightly darker pill background
  website: "WWW.MYMYSTERY.PARTY",
  gridMajor: "rgba(255, 255, 255, 0.08)",
  gridMinor: "rgba(255, 255, 255, 0.03)",
};

// --- Typography helpers ---
const textSerif = "font-serif text-[#ffffff]";
const textPill =
  "font-sans uppercase tracking-[0.08em] font-medium text-[3.2mm] py-[1.5mm] rounded-[1.5mm] border border-[#cab185] text-[#cab185] text-center";

function GuideSectionTitle({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`${textPill} w-full mb-[3mm] ${className}`.trim()}
      style={{ backgroundColor: theme.panelBg, ...style }}
    >
      {children}
    </div>
  );
}

function ColumnTitle({ top, bottom, className = "" }: { top: string; bottom: string; className?: string }) {
  return (
    <div className={`text-center mb-[8mm] relative z-10 ${className}`}>
      <p className="text-[#cab185] font-sans tracking-[0.15em] text-[3.5mm] leading-none mb-[2mm]">
        {top}
      </p>
      <p className="text-[#cab185] font-sans font-bold tracking-[0.05em] text-[6.5mm] leading-none transform scale-y-125">
        {bottom}
      </p>
    </div>
  );
}

export default function PrintInvestigationGuide({
  c,
  items,
  objectives,
  labelForItem,
}: PrintInvestigationGuideProps) {
  // Deduplicate and limit to 14 items to safely fit A4 dimensions
  const docLabels = items
    .filter((item) => item.type !== "clue" && item.type !== "objectives-cleared-badge")
    .map((item) => labelForItem(item))
    .filter((label, idx, arr) => arr.indexOf(label) === idx)
    .slice(0, 14);

  const qrPath = `/cold_case_data/${c.slug.replace(/-/g, "_")}/qrcode.png`;
  const lockedCount = Array.isArray(objectives) ? objectives.length : 0;

  return (
    <section
      className="print-section print-break flex justify-center bg-[#222] p-8"
      aria-label="Investigation Guide"
    >
      <div
        className="relative w-[210mm] h-[297mm] box-border overflow-hidden pt-[18mm] pb-[12mm] px-[16mm]"
        style={{ color: theme.textPrimary }}
      >
        {/* --- Blurred Poster Background --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imageUrl}
            alt="Case Poster Background"
            className="w-full h-full object-cover object-center scale-110"
            style={{ filter: 'blur(5px) brightness(0.55) saturate(1.2)' }}
            aria-hidden="true"
            draggable={false}
          />
          {/* Fallback overlay for contrast and grid */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(${theme.gridMajor} 1px, transparent 1px),
                linear-gradient(90deg, ${theme.gridMajor} 1px, transparent 1px),
                linear-gradient(${theme.gridMinor} 1px, transparent 1px),
                linear-gradient(90deg, ${theme.gridMinor} 1px, transparent 1px),
                rgba(40,40,38,0.60)
              `,
              backgroundSize: '20mm 20mm, 20mm 20mm, 5mm 5mm, 5mm 5mm, cover',
              zIndex: 1,
            }}
          />
        </div>
        {/* --- Main Content --- */}
        <div className="relative z-10 flex flex-col h-full">
          {/* --- HEADER --- */}
          <header className="guide-top-header text-center shrink-0 relative">
            <p className={`${textSerif} text-[3.8mm] text-white/90 mb-[2mm] italic`}>
              You are about to investigate the case of
            </p>
            <h2
              className="font-sans font-black text-white uppercase text-[13.2mm] leading-[1.08] break-words"
              style={{ letterSpacing: "0.18em" }}
            >
              {c.title}
            </h2>
            <div className="mt-[2mm] mb-[6mm]">
              <span className="inline-block bg-white text-[#838078] font-sans font-bold uppercase tracking-[0.3em] text-[2.8mm] px-[4mm] py-[1.2mm]">
                Case briefing + evidence workflow
              </span>
            </div>
            <p className={`${textSerif} text-[3.8mm] text-white/90 italic mt-[4mm]`}>
              You will need to refer to:
            </p>
          </header>
          {/* --- 2-COLUMN LAYOUT --- */}
          <div className="relative flex-1 flex gap-[10mm] mt-[9mm] min-h-0">
            {/* Center Dotted Divider */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-[1.5px] border-dotted border-[#cab185]/60" />
            {/* ==============================
                LEFT COLUMN: PHYSICAL
               ============================== */}
            <div className="flex-1 flex flex-col relative pt-[4mm] min-h-0">
              {/* Floating Folder SVG */}
              <svg viewBox="0 0 100 120" className="absolute -left-[14mm] -top-[12mm] w-[35mm] h-[40mm] -rotate-12 opacity-80" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M15 40 L45 25 L90 25 L80 45 L95 55 L20 100 Z" fill="rgba(255,255,255,0.05)" />
                <rect x="30" y="30" width="30" height="20" strokeDasharray="2 2" transform="rotate(10 30 30)" />
                <path d="M10 50 L85 50 L75 110 L5 110 Z" fill="transparent" strokeWidth="2" />
                <line x1="15" y1="58" x2="45" y2="58" strokeWidth="2.5" />
              </svg>
              {/* Column Title */}
              <ColumnTitle top="PHYSICAL" bottom="DOCUMENTS" className="pl-[12mm]" />
              {/* Case File Section */}
              <div className="mb-[8mm]">
                <GuideSectionTitle className="w-[70%] mx-auto mb-[6mm]">CASE FILE</GuideSectionTitle>
                <ul className={`grid grid-cols-2 gap-x-[4mm] gap-y-[2mm] text-[3.2mm] ${textSerif} px-[2mm]`}>
                  {docLabels.map((label, idx) => (
                    <li key={`${label}-${idx}`} className="flex items-start break-words">
                      <span className="mr-[2mm] text-white/70 text-[3.5mm] leading-none mt-[0.5mm]">&bull;</span>
                      <span className="leading-[1.25]">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Locked Envelopes Section */}
              <div className="mt-auto mb-[12mm]">
                <GuideSectionTitle className="w-[75%] mx-auto mb-[8mm]">{lockedCount} LOCKED ENVELOPES</GuideSectionTitle>
                <div className="flex justify-center">
                  {/* Envelope outline SVG */}
                  <svg viewBox="0 0 160 100" className="w-[50mm] opacity-70" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M10 20 L80 60 L150 20" />
                    <rect x="10" y="20" width="140" height="70" />
                    <path d="M10 90 L55 60" />
                    <path d="M150 90 L105 60" />
                    {/* Lock */}
                    <rect x="70" y="65" width="20" height="25" rx="2" fill={theme.bg} stroke="white" strokeWidth="2" />
                    <path d="M74 65 V58 A 6 6 0 0 1 86 58 V65" strokeWidth="2" />
                    <circle cx="80" cy="77" r="2.5" strokeWidth="1.5" />
                    <line x1="80" y1="79.5" x2="80" y2="84" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
            {/* ==============================
                RIGHT COLUMN: ONLINE
               ============================== */}
            <div className="flex-1 flex flex-col relative pt-[4mm] min-h-0">
              {/* Floating Phone SVG */}
              <svg viewBox="0 0 60 120" className="absolute right-0 -top-[8mm] w-[22mm] h-[45mm] rotate-6 opacity-70" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="5" y="5" width="50" height="110" rx="4" fill="rgba(255,255,255,0.05)" />
                <rect x="10" y="15" width="40" height="90" rx="1" />
                <line x1="22" y1="10" x2="38" y2="10" strokeWidth="2" />
                <circle cx="30" cy="110" r="1.5" />
              </svg>
              {/* Column Title */}
              <ColumnTitle top="ONLINE" bottom="INTERFACE" className="pr-[12mm]" />
              {/* QR Code Section */}
              <div className="flex flex-col items-center mb-[5mm]">
                <div className="w-[28mm] h-[28mm] border-[1.5px] border-white/80 p-[1.5mm] mb-[4mm]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrPath}
                    alt={`${c.title} QR access`}
                    className="w-full h-full object-contain mix-blend-screen opacity-90 bg-white"
                  />
                </div>
                <p className="font-sans text-[3.6mm] tracking-[0.2em] text-white uppercase">
                  {theme.website}
                </p>
              </div>
              {/* Unlock Envelope Section */}
              <div className="mb-[5mm] relative">
                <GuideSectionTitle>UNLOCK AN ENVELOPE</GuideSectionTitle>
                <p className={`text-center text-[3.3mm] ${textSerif}`}>
                  You can try to unlock an envelope at any time.
                </p>
                {/* Hand-drawn Arrow SVG connecting to left column */}
                <svg 
                  className="absolute -left-[28mm] top-[14mm] w-[35mm] h-[45mm] opacity-80 overflow-visible pointer-events-none" 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5"
                >
                  <path d="M 100 0 C 60 20, 20 50, 0 100" strokeLinecap="round" />
                  <path d="M 0 100 L 15 90 M 0 100 L 5 80" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Additional Resources Section */}
              <div className="mb-[5mm]">
                <GuideSectionTitle>ADDITIONAL RESOURCES</GuideSectionTitle>
                <div className={`text-[3.3mm] ${textSerif} flex flex-col items-center`}>
                  <p className="mb-[2mm]">Access the following:</p>
                  <ul className="w-[90%] mx-auto space-y-[1.3mm]">
                    <li className="flex items-start"><span className="mr-[2mm]">&bull;</span> Digital Evidence database</li>
                    <li className="flex items-start"><span className="mr-[2mm]">&bull;</span> Audio & Video files (locked)</li>
                    <li className="flex items-start"><span className="mr-[2mm]">&bull;</span> {c.title} external links</li>
                  </ul>
                </div>
              </div>
              {/* Need Help Section */}
              <div>
                <GuideSectionTitle>NEED HELP?</GuideSectionTitle>
                <p className={`text-center text-[3.3mm] ${textSerif}`}>
                  Get a hint if you&apos;re stuck.
                </p>
              </div>
            </div>
          </div>
          {/* --- FOOTER --- */}
          <footer className="mt-auto pt-[6mm] shrink-0 text-left">
            <p className={`${textSerif} text-[2.8mm] text-white/80 italic`}>
              *If any of the listed items are missing, please contact us on contact@mymystery.party
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}