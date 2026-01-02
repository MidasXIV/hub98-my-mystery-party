"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitWaitlist } from "@/app/waitlist/actions";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function WaitlistSignupForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    setState({ status: "submitting" });

    startTransition(async () => {
      const res = await submitWaitlist(formData);
      if (res?.success) {
        setEmail("");
        setState({
          status: "success",
          message: "You’re on the list. We’ll email you when the next beta drop is ready.",
        });
      } else {
        setState({ status: "error", message: res?.error || "Something went wrong." });
      }
    });
  }

  return (
    <div className={cn("space-y-3", className)}>
      <form action={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input type="hidden" name="source" value="waitlist-page" />
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Email address"
        />
        <Button type="submit" disabled={isPending || state.status === "submitting"}>
          {isPending || state.status === "submitting" ? "Joining…" : "Join waitlist"}
        </Button>
      </form>

      {state.status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <p className="text-xs text-muted-foreground">
        No spam. Just beta drops and big releases.
      </p>
    </div>
  );
}
