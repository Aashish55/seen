import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateRange } from "@/lib/format";
import type { EventItem } from "@/types/content";

export function EventCard({ event }: { event: EventItem }) {
  const startDate = new Date(event.date);
  const day = startDate.getDate();
  const month = startDate.toLocaleDateString("en-US", { month: "short" });

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="flex gap-5 p-5">
        <div
          className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground"
          aria-hidden
        >
          <span className="text-xl font-bold leading-none">{day}</span>
          <span className="text-xs uppercase">{month}</span>
        </div>
        <div className="min-w-0 space-y-2">
          <h3 className="font-semibold leading-snug text-navy">{event.title}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden />
              <time dateTime={event.date}>{formatDateRange(event.date, event.endDate)}</time>
            </span>
            {event.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                {event.location}
              </span>
            ) : null}
          </div>
          {event.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
          ) : null}
          {event.registrationUrl ? (
            <Button asChild variant="outline" size="sm" className="mt-1">
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                Register
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
