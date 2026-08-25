"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { AlbumLightbox } from "@/components/gallery/album-lightbox";
import type { GalleryAlbum } from "@/types/content";

export function GalleryPreview({ albums }: { albums: GalleryAlbum[] }) {
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album._id}
            type="button"
            onClick={() => album.images.length && setActiveAlbum(album)}
            disabled={!album.images.length}
            className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-gradient-to-br from-navy via-navy-light to-primary/60 p-4 text-left disabled:cursor-default"
          >
            {album.images[0]?.url ? (
              <>
                <Image
                  src={album.images[0].url}
                  alt={album.images[0].alt ?? album.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent"
                />
              </>
            ) : (
              <Camera
                className="absolute right-4 top-4 size-6 text-white/40"
                aria-hidden
              />
            )}
            <span className="relative text-sm font-semibold text-white drop-shadow group-hover:underline">
              {album.title}
            </span>
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
