"use client";
import React from "react";

const tabs = [
  { key: "styles", title: "Page Styles", content: "Mobile-first, accessible layouts with typographic presets and themeable color schemes." },
  { key: "surveys", title: "Guest Surveys", content: "Collect RSVPs and preferences via open-ended, multiple-choice, or checkbox questions." },
  { key: "sms", title: "Text Message Invites", content: "Send invitations via SMS for quick confirmations and reminders." },
  { key: "links", title: "Shareable Links", content: "Generate a link your guests can open to view details and RSVP instantly." },
  { key: "rsvp", title: "RSVP Tracking", content: "Dashboard shows deliveries, opens, and responses with basic analytics." },
];

export function InfoTabs() {
  const [active, setActive] = React.useState(tabs[0].key);
  return (
    <div className="rounded-2xl border border-border">
      <div className="flex flex-wrap gap-2 p-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 rounded-lg text-sm ${active === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm text-muted-foreground">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}

export default InfoTabs;
