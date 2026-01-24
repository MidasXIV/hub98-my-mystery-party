"use client";
import React from "react";

export interface PricingSummaryProps {
  basePrice: number;
  perRecipient: number;
  recipients: number;
  features: { envelopeLiner: boolean; waxSeal: boolean; premiumPaper: boolean };
  featurePrices: { envelopeLiner: number; waxSeal: number; premiumPaper: number };
}

export function PricingSummary({ basePrice, perRecipient, recipients, features, featurePrices }: PricingSummaryProps) {
  const extras = (features.envelopeLiner ? featurePrices.envelopeLiner : 0)
    + (features.waxSeal ? featurePrices.waxSeal : 0)
    + (features.premiumPaper ? featurePrices.premiumPaper : 0);
  const delivery = perRecipient * Math.max(0, recipients);
  const total = basePrice + extras + delivery;

  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between text-sm">
        <span>Base</span>
        <span>${basePrice.toFixed(2)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span>Extras</span>
        <span>${extras.toFixed(2)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span>Recipients ({recipients})</span>
        <span>${delivery.toFixed(2)}</span>
      </div>
      <hr className="my-3 border-border" />
      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PricingSummary;
