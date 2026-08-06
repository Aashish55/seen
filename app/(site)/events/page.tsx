import type { Metadata } from "next";
import { CalendarX } from "lucide-react";
import { EventCard } from "@/components/cards/event-card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { allPastEventsQuery, allUpcomingEventsQuery } from "@/sanity/queries";
import type { EventItem } from "@/types/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Seminars, workshops, conferences, and webinars organized by the Society of Electrical Engineers Nepal.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    sanityFetchList<EventItem>(allUpcomingEventsQuery),
    sanityFetchList<EventItem>(allPastEventsQuery),
  ]);

  return (
    <>
      <PageHeader
        title="Events"
        description="Seminars, workshops, conferences, and webinars - learn, network, and grow."
        crumbs={[{ label: "Events" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader eyebrow="Don't Miss" title="Upcoming Events" />
          {upcoming.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarX}
              title="No upcoming events"
              description="Check back soon - new events will show up here as they're scheduled."
            />
          )}
        </div>
      </section>
      {past.length ? (
        <section className="border-t bg-card py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <SectionHeader eyebrow="Archive" title="Past Events" />
            <div className="grid gap-6 lg:grid-cols-2">
              {past.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
