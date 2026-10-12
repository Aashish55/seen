import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { sanityFetchList } from "@/sanity/fetch";
import { galleryQuery } from "@/sanity/queries";
import { EmptyState } from "@/components/shared/empty-state";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import type { GalleryAlbum } from "@/types/content";
import { baseKeywords } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from SEEN events, conferences, site visits, workshops, and competitions.",
  keywords: [
    ...baseKeywords,
    "SEEN gallery",
    "SEEN photos",
    "electrical engineers events photos Nepal",
  ],
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
              <GalleryGrid albums={albums} />
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
