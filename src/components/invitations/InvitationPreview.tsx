"use client";
import React from "react";

export interface InvitationPreviewProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headline: string;
  subheadline?: string;
  details: string;
  footer?: string;
}

export function InvitationPreview(props: InvitationPreviewProps) {
  const { primaryColor, secondaryColor, accentColor, headline, subheadline, details, footer } = props;
  return (
    <div className="relative rounded-3xl border border-border overflow-hidden shadow" style={{ backgroundColor: secondaryColor }}>
      <div className="px-6 py-8">
        <div className="h-1 w-16 rounded" style={{ backgroundColor: accentColor }} />
        <h3 className="mt-4 text-2xl font-semibold" style={{ color: primaryColor }}>{headline}</h3>
        {subheadline && (
          <p className="mt-1 text-sm" style={{ color: primaryColor }}>{subheadline}</p>
        )}
        <pre className="mt-4 whitespace-pre-wrap text-sm text-foreground/80">{details}</pre>
        {footer && <p className="mt-6 text-xs text-muted-foreground">{footer}</p>}
      </div>
    </div>
  );
}

export default InvitationPreview;
