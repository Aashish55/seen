import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { NewsCard } from "@/components/cards/news-card";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { allPostsQuery } from "@/sanity/queries";
import type { NewsPost } from "@/types/content";

export const metadata: Metadata = {
  title: "News & Notices",
  description:
    "Latest news, notices, and announcements from the Society of Electrical Engineers Nepal.",
};

export default async function NewsPage() {
  const posts = await sanityFetchList<NewsPost>(allPostsQuery);

  return (
    <>
      <PageHeader
        title="News & Notices"
        description="Announcements, notices, and updates from the society."
        crumbs={[{ label: "News & Notices" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <NewsCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Newspaper}
              title="No news or notices yet"
              description="Published news and notices will appear here."
            />
          )}
        </div>
      </section>
    </>
  );
}
