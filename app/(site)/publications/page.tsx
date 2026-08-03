import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PublicationCard } from "@/components/cards/publication-card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { publicationsQuery } from "@/sanity/queries";
import type { Publication } from "@/types/content";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Newsletters, technical journals, research papers, annual reports, and conference proceedings from SEEN.",
};

export default async function PublicationsPage() {
  const publications = await sanityFetchList<Publication>(publicationsQuery);
  const categories = [...new Set(publications.map((pub) => pub.category))];

  return (
    <>
      <PageHeader
        title="Publications"
        description="Journals, newsletters, research, and reports from Nepal's electrical engineering community."
        crumbs={[{ label: "Publications" }]}
      />
      {categories.length ? (
        categories.map((category, index) => (
          <section
            key={category}
            className={
              index % 2 === 1
                ? "border-y bg-card py-14 md:py-16"
                : "py-14 md:py-16"
            }
          >
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
              <SectionHeader title={category} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {publications
                  .filter((pub) => pub.category === category)
                  .map((publication) => (
                    <PublicationCard key={publication._id} publication={publication} />
                  ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <EmptyState
              icon={BookOpen}
              title="No publications yet"
              description="Newsletters, journals, and reports will appear here once published."
            />
          </div>
        </section>
      )}
    </>
  );
}
