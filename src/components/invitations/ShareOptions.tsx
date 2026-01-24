"use client";
import React from "react";

export interface ShareOptionsProps {
  shareUrl: string;
  onSendEmail?: () => void;
  onSendSms?: () => void;
}

export function ShareOptions({ shareUrl, onSendEmail, onSendSms }: ShareOptionsProps) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {}
  };
  const sendEmail = async () => {
    try {
      await fetch("/api/invitations/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: shareUrl }),
      });
    } catch {}
    onSendEmail?.();
  };
  const sendSms = async () => {
    try {
      await fetch("/api/invitations/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: shareUrl }),
      });
    } catch {}
    onSendSms?.();
  };
  return (
    <div className="rounded-2xl border border-border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Shareable Link</span>
        <button className="text-xs text-primary" onClick={copy}>Copy</button>
      </div>
      <input className="w-full rounded-lg border border-border bg-background p-2 text-sm" readOnly value={shareUrl} />
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground" onClick={sendEmail}>Send Email</button>
        <button className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground" onClick={sendSms}>Send Text Message</button>
      </div>
      <p className="text-xs text-muted-foreground">Email/SMS sending is stubbed. Hook up your provider (e.g., SendGrid/Twilio) in a route handler.</p>
    </div>
  );
}

export default ShareOptions;
