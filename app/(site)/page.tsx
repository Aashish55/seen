import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { Partners } from "@/components/home/partners";
import { NewsCard } from "@/components/cards/news-card";
import { EventCard } from "@/components/cards/event-card";
import { ProjectCard } from "@/components/cards/project-card";
import { PublicationCard } from "@/components/cards/publication-card";
import { SectionHeader } from "@/components/shared/section-header";
import { sanityFetchList } from "@/sanity/fetch";
import {
  featuredProjectsQuery,
  galleryQuery,
  latestPostsQuery,
  partnersQuery,
  publicationsQuery,
  upcomingEventsQuery,
} from "@/sanity/queries";
import type {
  EventItem,
  GalleryAlbum,
  NewsPost,
  Partner,
  Project,
  Publication,
} from "@/types/content";

export default async function HomePage() {
  const [news, events, projects, publications, partners, gallery] =
    await Promise.all([
      sanityFetchList<NewsPost>(latestPostsQuery, { params: { limit: 3 } }),
      sanityFetchList<EventItem>(upcomingEventsQuery, { params: { limit: 3 } }),
      sanityFetchList<Project>(featuredProjectsQuery, { params: { limit: 3 } }),
      sanityFetchList<Publication>(publicationsQuery),
      sanityFetchList<Partner>(partnersQuery),
      sanityFetchList<GalleryAlbum>(galleryQuery),
    ]);

  return (
    <>
      <Hero />

      {/* Latest news */}
      {news.length ? (
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader
              eyebrow="Stay Informed"
              title="Latest News & Notices"
              href="/news"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 3).map((post) => (
                <NewsCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Upcoming events */}
      {events.length ? (
        <section className="border-y bg-card py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader
              eyebrow="Mark Your Calendar"
              title="Upcoming Events"
              href="/events"
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured projects */}
      {projects.length ? (
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader
              eyebrow="Engineering in Action"
              title="Featured Projects"
              href="/projects"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Publications */}
      {publications.length ? (
        <section className="border-y bg-card py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader
              eyebrow="Knowledge Hub"
              title="Recent Publications"
              href="/publications"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {publications.slice(0, 4).map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery preview */}
      {gallery.length ? (
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader eyebrow="Moments" title="Gallery" href="/gallery" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.slice(0, 6).map((album) => (
                <Link
                  key={album._id}
                  href="/gallery"
                  className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-gradient-to-br from-navy via-navy-light to-primary/60 p-4"
                >
                  <Camera
                    className="absolute right-4 top-4 size-6 text-white/40"
                    aria-hidden
                  />
                  <span className="text-sm font-semibold text-white drop-shadow group-hover:underline">
                    {album.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Partners */}
      {partners.length ? (
        <section className="border-y bg-card py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader
              eyebrow="Working Together"
              title="Partner Organizations"
            />
            <Partners partners={partners} />
          </div>
        </section>
      ) : null}

      {/* Join CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center lg:px-6">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            Become a member of SEEN
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join a growing community of professional electrical engineers shaping
            Nepal&apos;s energy future.
          </p>
          <Link
            href="/membership"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Membership
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
