"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import Image from "next/image";

export interface Testimonial {
  name: string;
  designation: string;
  title?: string;
  profile?: string;
  content: string;
  mediaUrl?: string; // video URL
  thumbnail?: string; // image URL used for preview and image viewer
  hideProfile?: boolean; // optional flag to hide avatar + name + designation
}

type TestimonialCardProps = {
  testimonial?: Testimonial;
  hideProfile?: boolean; // prop-level override
};

export function TestimonialCard({ testimonial, hideProfile: hideProfileProp }: TestimonialCardProps) {
  const [hydrated, setHydrated] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [imageOpen, setImageOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => setHydrated(true), []);

  // Preserve video behavior: autoplay when dialog opens; pause and reset when closed
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoOpen) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [videoOpen]);

  if (!testimonial) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">Loading testimonial...</CardContent>
      </Card>
    );
  }

  const {
    name = "Anonymous",
    profile = "",
    title = "",
    designation = "Customer",
    content = "No testimonial available.",
    mediaUrl,
    thumbnail,
    hideProfile,
  } = testimonial;

  // show a light skeleton till client hydration to avoid mismatches for media
  if (!hydrated) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">Loading...</CardContent>
      </Card>
    );
  }

  const hideProfileFinal = hideProfileProp ?? hideProfile ?? false;
  const isVideo = Boolean(mediaUrl && /\.(mp4|webm|ogg)$/i.test(mediaUrl));

  return (
    <Card className="break-inside-avoid border p-3 rounded-3xl my-4 border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300">
      {title ? (
        <CardHeader className="p-0">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
      ) : null}

      <CardContent className="p-0 mt-3 space-y-4">
        <ScrollArea className="max-h-[500px] rounded-md">
          <div className="space-y-4">
            {/* Video preview (unchanged behavior) */}
            {isVideo && mediaUrl && (
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <button type="button" className="relative w-full cursor-pointer group outline-none" aria-label="Play video">
                    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border relative">
                      {thumbnail ? (
                        <Image src={thumbnail} alt={title || name} fill className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full bg-black" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full bg-black/60 p-4 text-white shadow">
                          <Play className="h-6 w-6" />
                        </span>
                      </div>
                    </AspectRatio>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-5xl w-full p-0 overflow-hidden bg-black text-white border-0">
                  <AspectRatio ratio={16 / 9} className="bg-black">
                    <video ref={videoRef} src={mediaUrl} controls className="w-full h-full" />
                  </AspectRatio>
                </DialogContent>
              </Dialog>
            )}

            {/* Image preview -> barebones image viewer */}
            {!isVideo && thumbnail && (
              <Dialog open={imageOpen} onOpenChange={setImageOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="relative w-full cursor-pointer group outline-none"
                    aria-label="View image preview"
                  >
                    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border relative">
                      <Image src={thumbnail} alt={title || name} fill className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
                    </AspectRatio>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-5xl w-full p-0 overflow-hidden bg-black text-white border-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-50 rounded-full text-white hover:bg-white/10"
                      aria-label="Close image"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogClose>
                  <AspectRatio ratio={16 / 9} className="bg-black flex items-center justify-center">
                    <Image src={thumbnail} alt={title || name} width={1920} height={1080} className="object-contain" priority={false} />
                  </AspectRatio>
                </DialogContent>
              </Dialog>
            )}

            {/* Text content */}
            {content ? <p className="text-muted-foreground leading-relaxed">{content}</p> : null}
          </div>
        </ScrollArea>

        {/* Optional profile footer */}
        {!hideProfileFinal && (
          <>
            <Separator />
            <div className="flex items-center space-x-3 pt-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile} />
                <AvatarFallback>{name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{designation}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
