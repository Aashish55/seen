import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { RichText } from "@/components/shared/rich-text";
import { sanityFetchOne } from "@/sanity/fetch";
import { postBySlugQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/format";
import type { NewsPost } from "@/types/content";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<NewsPost | null> {
  return sanityFetchOne<NewsPost>(postBySlugQuery, { params: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.imageUrl ? { images: [{ url: post.imageUrl }] } : undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        title={post.title}
        crumbs={[{ label: "News & Notices", href: "/news" }, { label: post.title }]}
      />
      <article className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {post.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {post.author ? (
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" aria-hidden />
                {post.author}
              </span>
            ) : null}
          </div>

          {post.body ? (
            <RichText value={post.body} />
          ) : (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </>
  );
}
