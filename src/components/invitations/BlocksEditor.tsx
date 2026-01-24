"use client";
import React from "react";

export type BlockType = "schedule" | "travel" | "photos";

export interface BlocksEditorProps {
  blocks: Array<{ id: string; type: BlockType; content: string }>;
  onChange: (next: BlocksEditorProps["blocks"]) => void;
}

export function BlocksEditor({ blocks, onChange }: BlocksEditorProps) {
  const addBlock = (type: BlockType) => {
    const id = `${type}-${Date.now()}`;
    onChange([...blocks, { id, type, content: "" }]);
  };
  const updateContent = (id: string, content: string) => {
    onChange(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };
  const removeBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => addBlock("schedule")}>Add Schedule</button>
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => addBlock("travel")}>Add Travel Tips</button>
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => addBlock("photos")}>Add Photo Gallery</button>
      </div>
      {blocks.map((b) => (
        <div key={b.id} className="rounded-xl border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold capitalize">{b.type}</span>
            <button className="text-xs text-primary" onClick={() => removeBlock(b.id)}>Remove</button>
          </div>
          <textarea
            value={b.content}
            onChange={(e) => updateContent(b.id, e.target.value)}
            placeholder={b.type === "schedule" ? "Add your event schedule..." : b.type === "travel" ? "Add travel tips & directions..." : "Add image URLs, one per line..."}
            className="mt-2 w-full rounded-lg border border-border bg-background p-2 text-sm"
            rows={4}
          />
        </div>
      ))}
    </div>
  );
}

export default BlocksEditor;
