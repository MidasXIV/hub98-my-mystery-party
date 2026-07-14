import type { ColdCase } from "@/data/coldCases";
import type { BoardData } from "@/lib/boardTypes";

type LockedEnvelopeFoldoutsProps = {
  c: ColdCase;
  objectives: BoardData["objectives"];
};

export default function LockedEnvelopeFoldouts({
  c,
  objectives,
}: LockedEnvelopeFoldoutsProps) {
  if (!Array.isArray(objectives) || objectives.length === 0) return null;

  return objectives.map((objective, index) => (
    <section
      key={`locked-envelope-foldout-${objective.id || index}`}
      className="print-section print-break bg-gray-200 flex justify-center py-4"
      aria-label={`Locked Envelope Foldout ${index + 1}`}
    >
      {/* 
        A4 PAGE CONTAINER 
        Expanded to full edge-to-edge printing (210x297mm)
      */}
      <div className="relative w-[210mm] h-[297mm] box-border bg-white shadow-xl overflow-hidden text-black font-sans">
        
        {/* --- FULL PAGE SVG ENVELOPE NET --- */}
        <svg viewBox="0 0 210 297" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Base Cut Outline */}
          <path 
            d="M 0 55 L 27.5 41 L 45 0 L 165 0 L 182.5 41 L 210 55 L 210 242 L 182.5 256 L 165 297 L 45 297 L 27.5 256 L 0 242 Z" 
            fill="#faf9f7" 
            stroke="#9ca3af" 
            strokeWidth="0.5" 
          />
          
          {/* Dashed Fold Lines */}
          <line x1="27.5" y1="41" x2="182.5" y2="41" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="27.5" y1="256" x2="182.5" y2="256" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="27.5" y1="41" x2="27.5" y2="256" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="182.5" y1="41" x2="182.5" y2="256" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Flap Instructions (Visible on the back when folded) */}
          <text x="105" y="20" fontSize="3.5" textAnchor="middle" fill="#6b7280" letterSpacing="1.5" className="font-semibold uppercase">
            Top Flap: Fold down last to seal envelope
          </text>
          <text x="105" y="280" fontSize="3.5" textAnchor="middle" fill="#6b7280" letterSpacing="1.5" className="font-semibold uppercase">
            Bottom Flap: Fold up & tape to side flaps
          </text>
          <text x="12" y="148.5" fontSize="3.5" transform="rotate(-90 12 148.5)" textAnchor="middle" fill="#6b7280" letterSpacing="1.5" className="font-semibold uppercase">
            Fold In & Tape
          </text>
          <text x="198" y="148.5" fontSize="3.5" transform="rotate(90 198 148.5)" textAnchor="middle" fill="#6b7280" letterSpacing="1.5" className="font-semibold uppercase">
            Fold In & Tape
          </text>
        </svg>

        {/* --- MAIN ENVELOPE FACE (155mm x 215mm) --- */}
        {/* Placed perfectly within the fold lines */}
        <div className="absolute left-[27.5mm] top-[41mm] w-[155mm] h-[215mm] border-[0.5px] border-gray-200 bg-[#fdfdfc]">
          
          {/* Engineering Grid Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`gridLines-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
              <pattern id={`gridCrosses-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 18 20 L 22 20 M 20 18 L 20 22" fill="none" stroke="#9ca3af" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gridLines-${index})`} />
            <rect width="100%" height="100%" fill={`url(#gridCrosses-${index})`} />
          </svg>

          {/* Inner Content Wrapper */}
          <div className="absolute inset-0 flex flex-col items-center text-center relative z-10 p-[15mm]">
            
            {/* Eye Logo (Top Left) */}
            <div className="absolute top-[12mm] left-[12mm]">
              <svg viewBox="0 0 24 24" fill="none" className="w-[16mm] h-[16mm]">
                <path d="M12 5C5 5 2 12 2 12C2 12 5 19 12 19C19 19 22 12 22 12C22 12 19 5 12 5Z" stroke="#cba258" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="4" fill="#cba258"/>
                <path d="M1.5 12 L4.5 12 M19.5 12 L22.5 12" stroke="#cba258" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Typewriter Subtitle */}
            <p className="font-mono text-[6mm] text-gray-800 tracking-[0.15em] mt-[10mm]">
              {c.title}
            </p>

            {/* Red Stamped Main Text */}
            <div className="relative mt-[35mm]">
              <h3 className="font-serif text-[34mm] leading-none font-bold text-[#942020] tracking-[0.05em] opacity-90 mix-blend-multiply">
                OBJ-{index + 1}
              </h3>
              {/* Simulated Red Ink Splatters */}
              <div className="absolute top-2 -left-6 w-[2.5mm] h-[2.5mm] rounded-full bg-[#942020] opacity-70" />
              <div className="absolute top-8 -left-3 w-[1.5mm] h-[1.5mm] rounded-full bg-[#942020] opacity-80" />
              <div className="absolute bottom-6 -right-8 w-[3mm] h-[3mm] rounded-full bg-[#942020] opacity-70" />
              <div className="absolute top-12 -right-4 w-[1.5mm] h-[1.5mm] rounded-full bg-[#942020] opacity-90" />
            </div>

            {/* Gold Title Text w/ Faux 3D Shadow */}
            <div className="mt-[25mm]">
              <h4 
                className="font-serif text-[13mm] leading-[1.1] font-bold text-[#c49a4a] uppercase tracking-wider"
                style={{ textShadow: "0.8px 0.8px 0 #fff, 2px 2px 0 #cbd5e1, 4px 4px 0 #94a3b8" }}
              >
                LOCKED<br/>ENVELOPE
              </h4>
            </div>

            <div className="flex-1" />

            {/* Footer Instruction Text */}
            <p className="font-sans text-[3.5mm] font-bold tracking-[0.04em] text-gray-800 mb-[4mm]">
              ACCESS CONTENTS BY UNLOCKING THIS ENVELOPE ON THE WEBSITE
            </p>
            <p className="font-sans text-[2.8mm] font-medium tracking-[0.02em] text-gray-500 uppercase">
              * Sized to hold A4 case files folded in half *
            </p>

          </div>
        </div>

      </div>
    </section>
  ));
}