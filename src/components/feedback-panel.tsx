"use client";
import React from "react";
import GenericFloatingPanel from "./floating-panel";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Gameplay & bug feedback panel
// Posts suggestions to provided Discord webhook.
// NOTE: Exposing webhook client-side allows abuse; ideally proxy via /api route.

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1437897265170743438/YXKdLctECC2h7RHCmexYTQMBiY7144KjdWyEKF3JUyPnPo-ZtGQjpZ6IA21PVfTyw7rF";
const COOLDOWN_KEY = "gameFeedbackCooldown_v1";
const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes between submissions
const MAX_LEN = 1200; // local soft cap

const categories = [
  { value: "bug", label: "Bug" },
  { value: "gameplay", label: "Gameplay Idea" },
  { value: "other", label: "Other" },
];

function msFmt(ms: number) {
  const s = Math.ceil(ms / 1000);
  if (s < 60) return s + "s";
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}m ${rs}s`;
}

export default function FeedbackPanel() {
  const pathname = usePathname();
  const [category, setCategory] = React.useState("bug");
  const [details, setDetails] = React.useState("");
  const [repro, setRepro] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = React.useState(0);

  // Cooldown timer
  React.useEffect(() => {
    const tick = () => {
      try {
        const last = localStorage.getItem(COOLDOWN_KEY);
        if (!last) {
          setCooldownRemaining(0);
          return;
        }
        const remaining = parseInt(last, 10) + COOLDOWN_MS - Date.now();
        setCooldownRemaining(remaining > 0 ? remaining : 0);
      } catch {
        setCooldownRemaining(0);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setError(null);
    const body = details.trim();
    if (!body) {
      setError("Please enter details.");
      return;
    }
    if (body.length > MAX_LEN) {
      setError("Details exceed length limit.");
      return;
    }
    if (cooldownRemaining > 0) {
      setError("Wait for cooldown.");
      return;
    }
    setStatus("submitting");
    try {
      const payload =
        `Feedback (${category})\nPath: ${pathname}\nUser Agent: ${navigator.userAgent}\n\nDetails:\n${body}` +
        (repro.trim() ? `\n\nReproduction Steps:\n${repro.trim()}` : "");
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: payload.slice(0, 1900) }), // Discord safeguard
      });
      if (!res.ok) throw new Error("Webhook failed");
      setStatus("success");
      setDetails("");
      setRepro("");
      try {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      } catch {}
    } catch (err) {
      console.error(err);
      setError("Unable to send feedback.");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <GenericFloatingPanel
      trigger={
        <div
          className="font-staatliches tracking-wider text-xs md:text-sm px-3 py-2 rounded-md bg-white/80 dark:bg-black/40 border border-gray-300/60 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 shadow-sm transition cursor-pointer"
          aria-label="Open feedback panel"
        >
          Feedback
        </div>
      }
      title={
        <span className="flex items-center gap-2">
          <span className="">Gameplay Feedback</span>
        </span>
      }
      //   initialSize={{ height: 420, width: 380 }}
      contentStyle={{
        height: "100%",
        maxHeight: "420px",
        width: "380px",
        display: "flex",
        flexDirection: "column",
      }}
      bodyClassName="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-3"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
        aria-describedby={error ? "feedback-error" : undefined}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-mono border transition",
                category === c.value
                  ? "bg-yellow-400 text-black border-yellow-500"
                  : "bg-gray-200/70 dark:bg-white/10 text-gray-700 dark:text-gray-200 border-gray-300/50 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/20"
              )}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="feedback-details"
            className="text-xs font-semibold tracking-wide uppercase text-gray-600 dark:text-gray-300"
          >
            Details
          </label>
          <textarea
            id="feedback-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            aria-invalid={!!error}
            className={cn(
              "w-full rounded-md border bg-white/70 dark:bg-black/30 backdrop-blur px-2 py-2 text-[12px] leading-relaxed font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
              error && "border-red-500"
            )}
            placeholder="Describe the bug or idea…"
            maxLength={MAX_LEN + 200}
          />
          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
            <span>
              {details.trim().length}/{MAX_LEN}
            </span>
            {cooldownRemaining > 0 && (
              <span className="text-amber-600 dark:text-amber-400">
                Cooldown {msFmt(cooldownRemaining)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="feedback-repro"
            className="text-xs font-semibold tracking-wide uppercase text-gray-600 dark:text-gray-300"
          >
            Reproduction (optional)
          </label>
          <textarea
            id="feedback-repro"
            value={repro}
            onChange={(e) => setRepro(e.target.value)}
            rows={3}
            className="w-full rounded-md border bg-white/50 dark:bg-black/20 backdrop-blur px-2 py-2 text-[11px] leading-relaxed font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-300"
            placeholder="Steps to reproduce the bug…"
          />
        </div>
        {error && (
          <div
            id="feedback-error"
            role="alert"
            className="text-[11px] text-red-600 dark:text-red-400"
          >
            {error}
          </div>
        )}
        {status === "success" && (
          <div
            role="status"
            className="text-[11px] text-green-600 dark:text-green-400"
          >
            Feedback sent. Thank you!
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            size="sm"
            disabled={status === "submitting" || cooldownRemaining > 0}
            className="rounded-full"
          >
            {status === "submitting"
              ? "Sending…"
              : status === "success"
              ? "Sent"
              : "Submit"}
          </Button>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            Path: {pathname}
          </span>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
          Avoid sharing personal data. For security we recommend reporting
          sensitive issues privately.
        </p>
      </form>
    </GenericFloatingPanel>
  );
}
