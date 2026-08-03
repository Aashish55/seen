import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MediaThumb } from "@/components/shared/media-placeholder";
import { formatDate } from "@/lib/format";
import type { NewsPost } from "@/types/content";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <Link href={`/news/${post.slug}`} className="flex h-full flex-col">
        <MediaThumb imageUrl={post.imageUrl} alt="" icon={Newspaper} />
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {post.category}
            </Badge>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          ) : null}
        </CardContent>
      </Link>
    </Card>
  );
}
