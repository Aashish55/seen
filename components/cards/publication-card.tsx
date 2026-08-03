import { BookOpen, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MediaThumb } from "@/components/shared/media-placeholder";
import { formatDate } from "@/lib/format";
import type { Publication } from "@/types/content";

export function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <MediaThumb
        imageUrl={publication.coverUrl}
        alt=""
        icon={BookOpen}
        className="aspect-[16/9]"
      />
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {publication.category}
          </Badge>
          {publication.publishedAt ? (
            <time dateTime={publication.publishedAt}>
              {formatDate(publication.publishedAt)}
            </time>
          ) : null}
        </div>
        <h3 className="line-clamp-2 font-semibold leading-snug text-navy">
          {publication.title}
        </h3>
        {publication.fileUrl ? (
          <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
            <a href={publication.fileUrl} target="_blank" rel="noopener noreferrer">
              <Download className="size-3.5" aria-hidden />
              Download PDF
            </a>
          </Button>
        ) : (
          <p className="mt-auto text-xs text-muted-foreground">PDF coming soon</p>
        )}
      </CardContent>
    </Card>
  );
}
