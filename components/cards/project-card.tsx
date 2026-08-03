import Link from "next/link";
import { CircuitBoard, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MediaThumb } from "@/components/shared/media-placeholder";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <MediaThumb imageUrl={project.imageUrl} alt="" icon={CircuitBoard} />
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          {project.category ? (
            <Badge variant="secondary" className="w-fit bg-accent text-accent-foreground">
              {project.category}
            </Badge>
          ) : null}
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          {project.location ? (
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden />
              {project.location}
            </p>
          ) : null}
          {project.description ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
          ) : null}
        </CardContent>
      </Link>
    </Card>
  );
}
