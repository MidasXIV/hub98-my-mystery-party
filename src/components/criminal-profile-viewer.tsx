"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { parseCriminalProfileData } from "@/lib/criminal-profile-utils";

// Optimize font loading with next/font
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
});

export default function CriminalProfileViewer({ content }: { content: string }) {
  const data = useMemo(() => parseCriminalProfileData(content), [content]);

  return (
    // Outer viewport container: allows horizontal scroll on mobile without breaking A4 structure
    <div className={`w-full min-h-screen bg-gray-900 py-8 px-4 flex justify-start md:justify-center overflow-x-auto ${caveat.variable}`}>
      
      {/* Scope styles directly and ensure high precision for printing */}
      <style jsx>{`
        .gov-sheet {
          width: 210mm;
          height: 297mm;
          min-width: 210mm; /* Prevents shrinking horizontally */
          min-height: 297mm; /* Prevents shrinking vertically */
          background: #f9f6ef;
          border: 2px solid #0f172a;
          color: #0f172a;
          box-shadow: 0 10px 36px rgba(0, 0, 0, 0.32);
          position: relative;
          overflow: hidden; /* Lock content inside the A4 boundary */
          box-sizing: border-box;
        }

        .gov-watermark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          color: rgba(127, 29, 29, 0.04);
          font-weight: 800;
          font-size: 4.5rem;
          letter-spacing: 0.2em;
          transform: rotate(-25deg);
          text-transform: uppercase;
          z-index: 1;
        }

        .gov-label {
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #334155;
          font-weight: 700;
          line-height: 1.2;
        }

        .gov-value {
          font-family: "Courier New", monospace;
          font-size: 0.85rem;
          line-height: 1.25;
          color: #111827;
        }

        .gov-section {
          border: 1px solid #1f2937;
          background: #fffdf9;
        }

        .gov-section-title {
          border-bottom: 1px solid #1f2937;
          background: linear-gradient(90deg, #e9edf3 0%, #f2f4f7 100%);
          padding: 6px 10px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 800;
          color: #1e293b;
        }

        .gov-section-code {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 18px;
          padding: 0 6px;
          margin-right: 8px;
          border: 1px solid #1f2937;
          background: #0f172a;
          color: #f8fafc;
          font-size: 0.56rem;
          letter-spacing: 0.06em;
          font-weight: 800;
          border-radius: 2px;
        }

        .gov-grid td,
        .gov-grid th {
          border: 1px solid #1f2937;
          padding: 4px 6px;
          vertical-align: top;
        }

        .gov-grid th {
          background: #f1f5f9;
          text-align: left;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #334155;
          font-weight: 700;
          width: 25%;
        }

        .gov-sign {
          font-family: var(--font-caveat), cursive;
          font-size: 1.8rem;
          line-height: 1;
          color: #0b1220;
        }

        .gov-meta-band {
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid #0f172a;
        }

        .gov-ruled {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 21px,
            rgba(51, 65, 85, 0.08) 22px,
            transparent 23px
          );
        }

        .gov-side-card {
          border: 1px solid #1f2937;
          background: #f8fafc;
          padding: 6px;
        }

        .finger-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          padding: 10px;
        }

        .finger-cell {
          border: 1px dashed #334155;
          background: radial-gradient(circle at 40% 40%, rgba(15, 23, 42, 0.09), rgba(15, 23, 42, 0.02));
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #334155;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          line-height: 1.2;
        }

        /* Print Specific Styling */
        @media print {
          body {
            background: none;
            margin: 0;
            padding: 0;
          }
          .gov-sheet {
            box-shadow: none;
            border: none;
            width: 210mm;
            height: 297mm;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <article className="gov-sheet p-8 flex flex-col justify-between gap-3">
        <div className="gov-watermark" aria-hidden="true">Government Record</div>

        {/* Header - Fixed desktop-style grid layout */}
        <header className="gov-section relative z-10 overflow-hidden">
          <div className="grid grid-cols-[1fr_260px]">
            <div className="p-3 border-r border-[#1f2937] bg-white">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0f172a]">
                State Bureau of Criminal Investigation
              </p>
              <h1 className="mt-1 text-[1.4rem] leading-tight font-extrabold uppercase tracking-[0.04em] text-[#111827]">
                Organized Crime Subject Profile
              </h1>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#334155] font-semibold">
                Form OCU-17B • Records Control Division
              </p>
            </div>
            <div className="p-3 bg-[#f8fafc]">
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                <div>
                  <p className="gov-label">Profile ID</p>
                  <p className="gov-value font-bold text-[0.8rem]">{data.profileId}</p>
                </div>
                <div>
                  <p className="gov-label">Case Ref</p>
                  <p className="gov-value text-[0.8rem]">{data.caseRef}</p>
                </div>
                <div>
                  <p className="gov-label">Prepared</p>
                  <p className="gov-value text-[0.8rem]">{data.preparedDate}</p>
                </div>
                <div>
                  <p className="gov-label">Reviewed</p>
                  <p className="gov-value text-[0.8rem]">{data.reviewedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Layout - Strict 2-Column layout */}
        <section className="grid grid-cols-[210px_1fr] gap-4 relative z-10 flex-grow">
          {/* Left Column (Metadata & Image) */}
          <aside className="flex flex-col gap-3">
            <div className="gov-side-card">
              <div className="relative h-[220px] border border-[#1f2937] bg-[#f8fafc]">
                <Image
                  src={data.imageUrl}
                  alt={data.name}
                  fill
                  sizes="210px"
                  priority
                  className="object-cover grayscale-[20%]"
                />
              </div>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-[#334155] font-semibold text-center">
                Primary Identification Photo
              </p>
            </div>

            <div className="gov-side-card flex-grow flex flex-col justify-center gap-1.5">
              <div>
                <p className="gov-label">Jurisdiction</p>
                <p className="gov-value text-[0.8rem] leading-tight">{data.jurisdiction}</p>
              </div>
              <div className="mt-1">
                <p className="gov-label">Last Sighting</p>
                <p className="gov-value text-[0.8rem] leading-tight">{data.lastConfirmedSighting}</p>
              </div>
            </div>

            <div className="gov-side-card flex-grow flex flex-col justify-center gap-1.5">
              <div>
                <p className="gov-label">Linked Evidence IDs</p>
                <p className="gov-value text-[0.8rem] leading-tight">{data.linkedEvidenceIds}</p>
              </div>
              <div className="mt-1">
                <p className="gov-label">Objective Link</p>
                <p className="gov-value text-[0.8rem] leading-tight">{data.objectiveLink}</p>
              </div>
            </div>
          </aside>

          {/* Right Column (Tables and Narrative) */}
          <div className="flex flex-col justify-between gap-3">
            {/* Section 1: Biographical */}
            <div className="gov-section overflow-hidden">
              <div className="gov-section-title">
                <span className="gov-section-code">01</span>Biographical Data
              </div>
              <table className="w-full border-collapse gov-grid">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td className="gov-value font-bold uppercase text-[0.8rem]">{data.name}</td>
                    <th>Alias</th>
                    <td className="gov-value text-[0.8rem]">{data.alias}</td>
                  </tr>
                  <tr>
                    <th>DOB</th>
                    <td className="gov-value text-[0.8rem]">{data.dob}</td>
                    <th>Case Ref</th>
                    <td className="gov-value text-[0.8rem]">{data.caseRef}</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td className="gov-value text-[0.8rem]">{data.height}</td>
                    <th>Weight</th>
                    <td className="gov-value text-[0.8rem]">{data.weight}</td>
                  </tr>
                  <tr>
                    <th>Hair</th>
                    <td className="gov-value text-[0.8rem]">{data.hair}</td>
                    <th>Eyes</th>
                    <td className="gov-value text-[0.8rem]">{data.eyes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 2: Summary Description */}
            <div className="gov-section overflow-hidden flex-grow flex flex-col">
              <div className="gov-section-title">
                <span className="gov-section-code">02</span>Intelligence Summary
              </div>
              <div className="p-3 gov-ruled flex-grow overflow-hidden relative">
                <p className="gov-value text-[0.8rem] whitespace-pre-wrap leading-[22px]">
                  {data.bio}
                </p>
              </div>
            </div>

            {/* Section 3: Fingerprint Grid */}
            <div className="gov-section overflow-hidden">
              <div className="gov-section-title">
                <span className="gov-section-code">03</span>Fingerprint Grid
              </div>
              <div className="finger-grid">
                <div className="finger-cell">Left Thumb</div>
                <div className="finger-cell">Left Index</div>
                <div className="finger-cell">Left Middle</div>
                <div className="finger-cell">Left Ring</div>
                <div className="finger-cell">Left Little</div>
                <div className="finger-cell">Right Thumb</div>
                <div className="finger-cell">Right Index</div>
                <div className="finger-cell">Right Middle</div>
                <div className="finger-cell">Right Ring</div>
                <div className="finger-cell">Right Little</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Lock height to keep content strictly aligned */}
        <footer className="gov-section relative z-10 overflow-hidden mt-auto">
          <div className="gov-section-title">
            <span className="gov-section-code">04</span>Certification & Approval
          </div>
          <div className="p-3 grid grid-cols-2 gap-5">
            <div>
              <p className="gov-label">Prepared By (Investigating Officer)</p>
              <div className="h-8 flex items-end">
                <span className="gov-sign">{data.preparedBy}</span>
              </div>
              <div className="border-b border-[#1f2937]" />
              <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[#334155] font-semibold">
                Badge {data.preparedBadge} • Signed {data.preparedDate}
              </p>
            </div>
            <div>
              <p className="gov-label">Approved By (Supervising Officer)</p>
              <div className="h-8 flex items-end">
                <span className="gov-sign">{data.approvedBy}</span>
              </div>
              <div className="border-b border-[#1f2937]" />
              <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[#334155] font-semibold">
                Badge {data.approvedBadge} • Signed {data.reviewedDate}
              </p>
            </div>
          </div>
          <div className="px-3 pb-2 text-[9px] uppercase tracking-[0.1em] text-[#334155] font-semibold flex justify-between">
            <span>State Government Record • Internal Use Only</span>
            <span>Document Ref: {data.profileId}</span>
          </div>
        </footer>
      </article>
    </div>
  );
}