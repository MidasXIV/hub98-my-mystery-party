"use client";
import React from "react";
import InvitationPreview from "./InvitationPreview";
import PricingSummary from "./PricingSummary";
import InfoTabs from "./InfoTabs";
import BlocksEditor, { BlockType } from "./BlocksEditor";
import GuestSurveyBuilder, { Question } from "./GuestSurveyBuilder";
import ShareOptions from "./ShareOptions";

export interface CustomizePanelProps {
  design: {
    title: string;
    basePrice: number;
    pricing: { extraFeatures: { envelopeLiner: number; waxSeal: number; premiumPaper: number }; perRecipient: number };
    defaultColors: { primary: string; secondary: string; accent: string };
    defaultText: { headline: string; subheadline?: string; details: string; footer?: string };
    defaultType: "personal" | "professional";
    slug: string;
  };
  baseUrl: string;
}

export function CustomizePanel({ design, baseUrl }: CustomizePanelProps) {
  const [colors, setColors] = React.useState(design.defaultColors);
  const [type, setType] = React.useState<"personal" | "professional">(design.defaultType);
  const [text, setText] = React.useState(design.defaultText);
  const [features, setFeatures] = React.useState({ envelopeLiner: false, waxSeal: false, premiumPaper: false });
  const [recipients, setRecipients] = React.useState(0);
  const [blocks, setBlocks] = React.useState<Array<{ id: string; type: BlockType; content: string }>>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const cfg = {
    type,
    colors,
    text,
    features,
    recipients,
    blocks,
    questions,
  };
  const cfgString = typeof window !== "undefined" ? btoa(encodeURIComponent(JSON.stringify(cfg))) : "";
  const shareUrl = `${baseUrl}/invitations/${design.slug}?cfg=${cfgString}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        <InvitationPreview
          primaryColor={colors.primary}
          secondaryColor={colors.secondary}
          accentColor={colors.accent}
          headline={text.headline}
          subheadline={text.subheadline}
          details={text.details}
          footer={text.footer}
        />

        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Customize Colors</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 text-sm">Primary
              <input type="color" value={colors.primary} onChange={(e) => setColors((c) => ({ ...c, primary: e.target.value }))} />
            </label>
            <label className="flex items-center gap-2 text-sm">Secondary
              <input type="color" value={colors.secondary} onChange={(e) => setColors((c) => ({ ...c, secondary: e.target.value }))} />
            </label>
            <label className="flex items-center gap-2 text-sm">Accent
              <input type="color" value={colors.accent} onChange={(e) => setColors((c) => ({ ...c, accent: e.target.value }))} />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Event Type</h3>
          <div className="mt-2 flex gap-2">
            <button
              className={`px-3 py-2 rounded-lg text-sm ${type === "personal" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              onClick={() => setType("personal")}
            >Personal</button>
            <button
              className={`px-3 py-2 rounded-lg text-sm ${type === "professional" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              onClick={() => setType("professional")}
            >Professional</button>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4 space-y-2">
          <h3 className="font-semibold">Invitation Text</h3>
          <input
            className="w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Headline"
            value={text.headline}
            onChange={(e) => setText((t) => ({ ...t, headline: e.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Subheadline"
            value={text.subheadline || ""}
            onChange={(e) => setText((t) => ({ ...t, subheadline: e.target.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Details"
            rows={5}
            value={text.details}
            onChange={(e) => setText((t) => ({ ...t, details: e.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Footer"
            value={text.footer || ""}
            onChange={(e) => setText((t) => ({ ...t, footer: e.target.value }))}
          />
        </div>

        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Additional Details (Blocks)</h3>
          <BlocksEditor blocks={blocks} onChange={setBlocks} />
        </div>

        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Guest Management (Surveys)</h3>
          <GuestSurveyBuilder value={questions} onChange={setQuestions} />
        </div>

        <InfoTabs />
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Features</h3>
          <div className="mt-2 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={features.envelopeLiner} onChange={(e) => setFeatures((f) => ({ ...f, envelopeLiner: e.target.checked }))} />
              Envelope liner (+${design.pricing.extraFeatures.envelopeLiner.toFixed(2)})
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={features.waxSeal} onChange={(e) => setFeatures((f) => ({ ...f, waxSeal: e.target.checked }))} />
              Wax seal (+${design.pricing.extraFeatures.waxSeal.toFixed(2)})
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={features.premiumPaper} onChange={(e) => setFeatures((f) => ({ ...f, premiumPaper: e.target.checked }))} />
              Premium paper (+${design.pricing.extraFeatures.premiumPaper.toFixed(2)})
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <h3 className="font-semibold">Recipients</h3>
          <input
            type="number"
            min={0}
            value={recipients}
            onChange={(e) => setRecipients(parseInt(e.target.value || "0", 10))}
            className="mt-2 w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Number of recipients"
          />
          <p className="mt-1 text-xs text-muted-foreground">Sending cost per recipient: ${design.pricing.perRecipient.toFixed(2)}</p>
        </div>

        <PricingSummary
          basePrice={design.basePrice}
          perRecipient={design.pricing.perRecipient}
          recipients={recipients}
          features={features}
          featurePrices={design.pricing.extraFeatures}
        />

        <ShareOptions
          shareUrl={shareUrl}
          onSendEmail={() => console.log("Stub: send email with ", shareUrl)}
          onSendSms={() => console.log("Stub: send SMS with ", shareUrl)}
        />
      </aside>
    </div>
  );
}

export default CustomizePanel;
