"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { GalleryAlbum } from "@/types/content";

export function AlbumLightbox({
  album,
  activeIndex,
  onIndexChange,
  onOpenChange,
}: {
  album: GalleryAlbum | null;
  activeIndex: number | null;
  onIndexChange: (index: number | null) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const stepImage = (delta: number) => {
    if (activeIndex === null || !album) return;
    const count = album.images.length;
    onIndexChange((activeIndex + delta + count) % count);
  };

  return (
    <Dialog open={album !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{album?.title}</DialogTitle>
          <DialogDescription>
            {album ? `${album.images.length} photo${album.images.length === 1 ? "" : "s"}` : null}
          </DialogDescription>
        </DialogHeader>

        {album && activeIndex !== null ? (
          <div className="relative flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={album.images[activeIndex].url}
                alt={album.images[activeIndex].alt ?? album.title}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-contain"
              />
            </div>
            {album.images.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="absolute top-1/2 left-2 -translate-y-1/2"
                  onClick={() => stepImage(-1)}
                >
                  <ChevronLeft />
                  <span className="sr-only">Previous photo</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => stepImage(1)}
                >
                  <ChevronRight />
                  <span className="sr-only">Next photo</span>
                </Button>
              </>
            ) : null}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() => onIndexChange(null)}
            >
              <LayoutGrid />
              Gallery View
            </Button>
          </div>
        ) : (
          <div className="grid max-h-[65vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
            {album?.images.map((image, index) => (
              <button
                key={image.url + index}
                type="button"
                onClick={() => onIndexChange(index)}
                className="relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Image
                  src={image.url}
                  alt={image.alt ?? album.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-200 hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
