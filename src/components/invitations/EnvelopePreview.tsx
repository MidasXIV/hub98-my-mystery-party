"use client";
import React from "react";

export function EnvelopePreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative rounded-3xl border border-border bg-card shadow">
      <div className="p-6">
        <div className="h-24 w-full rounded-lg bg-muted" />
        <div className="mt-4 flex items-center gap-2">
          <span className="inline-block h-2 w-16 rounded" style={{ backgroundColor: accentColor }} />
          <span className="text-sm text-muted-foreground">Envelope Accent</span>
        </div>
      </div>
    </div>
  );
}

export default EnvelopePreview;
