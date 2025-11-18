/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { submitAffiliateApplication } from "@/app/affiliates/actions";
import { cn } from "@/lib/utils";

interface AffiliateSignupFormProps {
  className?: string;
}

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export function AffiliateSignupForm({ className }: AffiliateSignupFormProps) {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function validate(formData: FormData) {
    const errors: Record<string, string> = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const desiredCode = String(formData.get("desiredCode") || "").trim();
    const payoutMethod = String(formData.get("payoutMethod") || "").trim();
    const paypalEmail = String(formData.get("paypalEmail") || "").trim();

    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Invalid email format.";
    if (desiredCode && !/^[a-zA-Z0-9_-]{3,20}$/.test(desiredCode)) {
      errors.desiredCode = "3–20 chars, letters/numbers/-/_ only.";
    }
    if (payoutMethod === "paypal") {
      if (!paypalEmail) errors.paypalEmail = "PayPal email required.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(paypalEmail)) errors.paypalEmail = "Invalid PayPal email.";
    }
    return errors;
  }

  async function handleSubmit(formData: FormData) {
    const errors = validate(formData);
    setClientErrors(errors);
    if (Object.keys(errors).length) return; // Don&apos;t proceed

    setFormState({ status: "submitting" });
    startTransition(async () => {
      try {
        const res = await submitAffiliateApplication(formData);
        if (res?.success) {
          setFormState({ status: "success", message: "Application received! We&apos;ll email you once affiliate codes go live." });
        } else {
          setFormState({ status: "error", message: res?.error || "Something went wrong." });
        }
      } catch (e: any) {
        setFormState({ status: "error", message: e?.message || "Unexpected error." });
      }
    });
  }

  return (
    <div className={cn("relative z-10 max-w-2xl mx-auto", className)}>
      <form
        className="space-y-6 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-border rounded-lg p-6 shadow-xl"
        action={handleSubmit}
      >
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <input
            id="name"
            name="name"
            required
            className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50", clientErrors.name && "border-destructive")}
            placeholder="Detective Jane Doe"
          />
          {clientErrors.name && <p className="text-xs text-destructive">{clientErrors.name}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50", clientErrors.email && "border-destructive")}
              placeholder="you@example.com"
            />
            {clientErrors.email && <p className="text-xs text-destructive">{clientErrors.email}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="website" className="text-sm font-medium">Website / Channel</label>
          <input
            id="website"
            name="website"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50"
            placeholder="https://youtube.com/@yourchannel"
          />
          <p className="text-xs text-muted-foreground">Optional. Helps us prioritize partners with existing audiences.</p>
        </div>
        <div className="space-y-1">
          <label htmlFor="desiredCode" className="text-sm font-medium">Desired Affiliate Code</label>
          <input
            id="desiredCode"
            name="desiredCode"
            placeholder="JANEINVESTIGATES"
            className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50", clientErrors.desiredCode && "border-destructive")}
          />
          <p className="text-xs text-muted-foreground">We&apos;ll try to reserve this. If taken, we&apos;ll reach out with alternates.</p>
          {clientErrors.desiredCode && <p className="text-xs text-destructive">{clientErrors.desiredCode}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Preferred Payout Method *</label>
          <select
            name="payoutMethod"
            defaultValue="paypal"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50"
          >
            <option value="paypal">PayPal</option>
            <option value="bank" disabled>Bank Transfer (future)</option>
            <option value="crypto" disabled>Crypto (future)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="paypalEmail" className="text-sm font-medium">PayPal Email *</label>
          <input
            id="paypalEmail"
            name="paypalEmail"
            type="email"
            placeholder="billing@example.com"
            className={cn("w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50", clientErrors.paypalEmail && "border-destructive")}
          />
          {clientErrors.paypalEmail && <p className="text-xs text-destructive">{clientErrors.paypalEmail}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="notes" className="text-sm font-medium">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Tell us how you&apos;ll promote the cold cases."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring focus-visible:ring-ring/50 resize-y"
          />
        </div>
        <div className="text-xs leading-relaxed text-muted-foreground bg-muted/50 dark:bg-muted/10 rounded-md p-3 border border-border/50">
          <p><strong>Heads up:</strong> Affiliate codes will activate when purchasing launches. You&apos;ll still be able to onboard now so you&apos;re first in line.</p>
          <p className="mt-2">By submitting you agree to receive onboarding emails and occasional product updates. We never sell your data.</p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isPending || formState.status === "submitting"}>
            {formState.status === "submitting" || isPending ? "Submitting…" : "Submit Application"}
          </Button>
          {formState.status === "error" && (
            <span className="text-xs text-destructive">{formState.message}</span>
          )}
          {formState.status === "success" && (
            <span className="text-xs text-green-600 dark:text-green-400">{formState.message}</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default AffiliateSignupForm;
