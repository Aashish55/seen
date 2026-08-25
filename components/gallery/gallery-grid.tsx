"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlbumLightbox } from "@/components/gallery/album-lightbox";
import type { GalleryAlbum } from "@/types/content";

export function GalleryGrid({ albums }: { albums: GalleryAlbum[] }) {
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeAlbum = (open: boolean) => {
    if (!open) {
      setActiveAlbum(null);
      setActiveIndex(null);
    }
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album._id}
            type="button"
            onClick={() => album.images.length && setActiveAlbum(album)}
            disabled={!album.images.length}
            className="group overflow-hidden rounded-xl border bg-card text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {album.images[0]?.url ? (
                <Image
                  src={album.images[0].url}
                  alt={album.images[0].alt ?? album.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-full items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary/60"
                >
                  <Camera className="size-10 text-white/35" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <h2 className="font-semibold text-navy">{album.title}</h2>
              {album.category ? (
                <Badge variant="secondary" className="shrink-0 bg-accent text-accent-foreground">
                  {album.category}
                </Badge>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      <AlbumLightbox
        album={activeAlbum}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
        onOpenChange={closeAlbum}
      />
    </>
  );
}
