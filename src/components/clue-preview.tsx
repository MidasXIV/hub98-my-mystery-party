import { parseClueContent } from "@/lib/clue-utils";

interface CluePreviewProps {
  content: string;
  isNew?: boolean;
}

export default function CluePreview({ content, isNew = false }: CluePreviewProps) {
  const parsed = parseClueContent(content);

  return (
    <div
      className={`w-full h-full clue-item-effect text-black text-[11px] flex items-center justify-center text-left font-special-elite ${
        isNew ? "clue-item-appear" : ""
      }`}
    >
      <div className="px-3 py-2 w-full h-full overflow-hidden flex flex-col justify-center">
        <p className="leading-tight break-words">{parsed.clue}</p>
        {parsed.forObjective ? (
          <p className="mt-1 text-[10px] uppercase tracking-wide opacity-75">
            {parsed.forObjective}
          </p>
        ) : null}
      </div>
    </div>
  );
}
