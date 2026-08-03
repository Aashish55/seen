import type { Metadata } from "next";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { sanityFetchList } from "@/sanity/fetch";
import { galleryQuery } from "@/sanity/queries";
import { EmptyState } from "@/components/shared/empty-state";
import type { GalleryAlbum } from "@/types/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from SEEN events, conferences, site visits, workshops, and competitions.",
};

export default async function GalleryPage() {
  const albums = await sanityFetchList<GalleryAlbum>(galleryQuery);

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Moments from our events, conferences, site visits, and programs."
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {albums.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {albums.map((album) => (
                  <article
                    key={album._id}
                    className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
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
                  </article>
                ))}
              </div>
              {albums.every((album) => !album.images.length) ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Upload album photos in the Content Studio to bring these albums to life.
                </p>
              ) : null}
            </>
          ) : (
            <EmptyState
              icon={Camera}
              title="No gallery albums yet"
              description="Photos from events, conferences, and site visits will appear here."
            />
          )}
        </div>
      </section>
    </>
  );
}
