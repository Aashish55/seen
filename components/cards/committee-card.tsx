import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Committee } from "@/types/content";

export function CommitteeCard({ committee }: { committee: Committee }) {
  return (
    <Card className="group relative transition-shadow hover:shadow-lg">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Users className="size-5" aria-hidden />
        </span>
        <h3 className="text-lg font-semibold text-navy transition-colors group-hover:text-primary">
          <Link href={`/committees/${committee.slug}`} className="after:absolute after:inset-0">
            {committee.name}
          </Link>
        </h3>
        {committee.description ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {committee.description}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </CardContent>
    </Card>
  );
}
