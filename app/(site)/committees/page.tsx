import type { Metadata } from "next";
import { Users } from "lucide-react";
import { CommitteeCard } from "@/components/cards/committee-card";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { committeesQuery } from "@/sanity/queries";
import type { Committee } from "@/types/content";

export const metadata: Metadata = {
  title: "Committees",
  description:
    "Technical committees of SEEN — Power Systems, Renewable Energy, Smart Grid, Women in Engineering, and more.",
};

export default async function CommitteesPage() {
  const committees = await sanityFetchList<Committee>(committeesQuery);

  return (
    <>
      <PageHeader
        title="Committees"
        description="Specialized technical committees drive SEEN's programs, research, and advocacy."
        crumbs={[{ label: "Committees" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {committees.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {committees.map((committee) => (
                <CommitteeCard key={committee._id} committee={committee} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No committees listed yet"
              description="SEEN's technical committees will appear here once added."
            />
          )}
        </div>
      </section>
    </>
  );
}
