"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  QrCode,
  Share2,
  Users,
  Check,
  Link2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type KitCharacter = {
  id: string;
  slug?: string;
  name: string;
  role?: string;
  imageUrl?: string;
};

interface KitCharacterShareCardProps {
  character: KitCharacter;
  href: string;
  absoluteUrl: string;
}

export default function KitCharacterShareCard({
  character,
  href,
  absoluteUrl,
}: KitCharacterShareCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isInlineQrMode, setIsInlineQrMode] = useState(false);
  const [copiedState, setCopiedState] = useState<"idle" | "link" | "qr">(
    "idle",
  );

  const initials = useMemo(
    () =>
      character.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
    [character.name],
  );

  const qrImageUrl = useMemo(() => {
    const qr = new URL("https://api.qrserver.com/v1/create-qr-code/");
    qr.searchParams.set("size", "720x720");
    qr.searchParams.set("margin", "24");
    qr.searchParams.set("format", "png");
    qr.searchParams.set("data", absoluteUrl);
    return qr.toString();
  }, [absoluteUrl]);

  const resetCopied = (state: "link" | "qr") => {
    setCopiedState(state);
    window.setTimeout(() => {
      setCopiedState((current) => (current === state ? "idle" : current));
    }, 1800);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      resetCopied("link");
    } catch {
      setCopiedState("idle");
    }
  };

  const copyQrImage = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();

      if (
        typeof ClipboardItem === "undefined" ||
        !navigator.clipboard?.write ||
        !blob.type.startsWith("image/")
      ) {
        await navigator.clipboard.writeText(absoluteUrl);
        resetCopied("qr");
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      resetCopied("qr");
    } catch {
      try {
        await navigator.clipboard.writeText(absoluteUrl);
        resetCopied("qr");
      } catch {
        setCopiedState("idle");
      }
    }
  };

  const shareCharacter = async () => {
    const shareData = {
      title: `${character.name} | My Mystery Party`,
      text: `Open ${character.name}'s character page on mymystery.party.`,
      url: absoluteUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      return;
    }

    await copyText();
  };

  return (
    <>
      <div className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[28px] border border-subtle-stroke bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
        {!isInlineQrMode ? (
          <Link
            href={href}
            className="absolute inset-0 z-10"
            aria-label={`Open ${character.name} character file`}
          />
        ) : null}

        <div className="relative h-full w-full overflow-hidden">
          {isInlineQrMode ? (
            <div className="flex h-full flex-col bg-gradient-to-br from-white via-slate-100 to-slate-200 p-2 md:p-4 text-slate-950">
              <div className="mb-1 md:mb-3 flex items-center justify-between gap-3 rounded-2xl bg-slate-950 p-2 md:px-4 md:py-3 text-white shadow-lg">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setIsInlineQrMode(false);
                  }}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15"
                  aria-label={`Exit ${character.name} QR mode`}
                  title="Back to portrait"
                >
                  <ArrowLeft size={16} />
                </button>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                    Scan to join
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm font-semibold">
                    {character.name}
                  </p>
                </div>
                <div className="hidden md:flex flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                  {initials}
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center rounded-[24px] border border-slate-200 bg-white p-4 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${character.name}`}
                  className="aspect-square w-full max-w-[210px] rounded-2xl"
                />
              </div>

              <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white/75 px-3 py-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  mymystery.party
                </p>
                <p className="mt-1 text-[11px] text-slate-700">
                  Scan for {character.name}&apos;s page
                </p>
              </div>
            </div>
          ) : character.imageUrl ? (
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/5 text-text-secondary">
              <Users size={48} strokeWidth={1} />
            </div>
          )}

          {!isInlineQrMode ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
          ) : null}
        </div>

        {!isInlineQrMode ? (
          <div className="absolute right-3 top-3 z-50 flex flex-col gap-2 opacity-100 sm:translate-x-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                shareCharacter();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur transition hover:bg-black/70 hover:text-white"
              aria-label={`Share ${character.name}`}
              title="Share"
            >
              <Share2 size={16} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                copyQrImage();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur transition hover:bg-black/70 hover:text-white"
              aria-label={`Copy ${character.name} QR code`}
              title={copiedState === "qr" ? "Copied" : "Copy QR code"}
            >
              {copiedState === "qr" ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsInlineQrMode(true);
              }}
              className="z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur transition hover:bg-black/70 hover:text-white"
              aria-label={`Enable ${character.name} QR mode`}
              title="Show QR on card"
            >
              <QrCode size={16} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsQrOpen(true);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur transition hover:bg-black/70 hover:text-white"
              aria-label={`Open ${character.name} full-screen QR`}
              title="Open QR modal"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        ) : null}

        {isInlineQrMode ? (
          //   <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-slate-950/88 px-3 py-2 text-center text-white backdrop-blur">
          //     <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
          //       QR mode live
          //     </p>
          //     <p className="mt-1 text-xs text-white/75">
          //       Guests can scan this directly from the card.
          //     </p>
          //   </div>
          <></>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 text-center">
            <div className="mx-auto mb-3 h-px w-8 bg-indigo-300/80 opacity-80 transition-all duration-500 group-hover:w-16" />

            <h3 className="text-xl font-semibold tracking-wide text-white drop-shadow-md">
              {character.name}
            </h3>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/90">
              {character.role || "Suspect"}
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
              <span>Open File</span>
              <ExternalLink size={12} className="text-indigo-200" />
            </div>
          </div>
        )}

        <div className="absolute inset-0 rounded-[28px] border-2 border-transparent transition-colors duration-300 group-hover:border-indigo-300/40 pointer-events-none" />
      </div>

      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent className="max-h-[90vh] w-[92vw] max-w-[360px] overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#0A0A0B] p-0 text-white shadow-2xl outline-none sm:max-w-[380px]">
          {/* 1. Header: Simplified */}
          <div className="px-6 pt-8 text-center">
            <DialogTitle className="text-xl font-bold tracking-tight">
              Character Pass
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs text-white/50">
              Scan to join as{" "}
              <span className="text-white font-medium">{character.name}</span>
            </DialogDescription>
          </div>

          {/* 2. The QR "Ticket" - Clean & High Contrast */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2rem] bg-white p-4 text-slate-950 shadow-xl"
            >
              {/* Subtle Ticket Notch Effect */}
              <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0A0A0B]" />
              <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0A0A0B]" />

              {/* Character ID Header */}
              <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold uppercase tracking-tight">
                    {character.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    mymystery.party
                  </p>
                </div>
              </div>

              {/* QR Code Image */}
              <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-50 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrImageUrl}
                  alt="QR Code"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* 3. Consolidated Actions */}
          <div className="space-y-3 px-6 pb-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareCharacter}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-black transition-transform active:scale-95"
              >
                <Share2 size={16} />
                Share
              </button>
              <button
                onClick={copyQrImage}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 text-sm font-bold transition-transform active:scale-95"
              >
                {copiedState === "qr" ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
                {copiedState === "qr" ? "Copied" : "Copy QR"}
              </button>
            </div>

            <button
              onClick={copyText}
              className="group flex w-full items-center justify-center gap-2 py-2 text-[11px] font-medium text-white/40 transition-colors hover:text-white"
            >
              <span className="truncate max-w-[180px] font-mono opacity-50">
                {absoluteUrl}
              </span>
              {copiedState === "link" ? (
                <Check size={12} />
              ) : (
                <Link2 size={12} />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
