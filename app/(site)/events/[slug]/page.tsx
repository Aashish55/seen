import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { sanityFetchOne } from "@/sanity/fetch";
import { eventBySlugQuery } from "@/sanity/queries";
import { formatDateRange } from "@/lib/format";
import type { EventItem } from "@/types/content";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<EventItem | null> {
  return sanityFetchOne<EventItem>(eventBySlugQuery, { params: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.description,
    openGraph: event.imageUrl ? { images: [{ url: event.imageUrl }] } : undefined,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <PageHeader
        title={event.title}
        crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      />
      <article className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          {event.imageUrl ? (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-navy">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-primary" aria-hidden />
              <time dateTime={event.date}>
                {formatDateRange(event.date, event.endDate)}
              </time>
            </span>
            {event.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" aria-hidden />
                {event.location}
              </span>
            ) : null}
            {event.host ? (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-primary" aria-hidden />
                {event.host}
              </span>
            ) : null}
          </div>

          {event.description ? (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          ) : null}

          {event.registrationUrl ? (
            <Button asChild size="lg" className="mt-8">
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                Register Now
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </Button>
          ) : null}
        </div>
      </article>
    </>
  );
}
