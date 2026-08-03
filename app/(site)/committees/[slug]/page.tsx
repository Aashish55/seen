import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { sanityFetchOne } from "@/sanity/fetch";
import { committeeBySlugQuery } from "@/sanity/queries";
import type { Committee } from "@/types/content";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCommittee(slug: string): Promise<Committee | null> {
  return sanityFetchOne<Committee>(committeeBySlugQuery, { params: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const committee = await getCommittee(slug);
  if (!committee) return { title: "Committee" };
  return {
    title: `${committee.name} Committee`,
    description: committee.description,
  };
}

export default async function CommitteeDetailPage({ params }: Props) {
  const { slug } = await params;
  const committee = await getCommittee(slug);
  if (!committee) notFound();

  return (
    <>
      <PageHeader
        title={`${committee.name} Committee`}
        description={committee.description}
        crumbs={[
          { label: "Committees", href: "/committees" },
          { label: committee.name },
        ]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-3 lg:px-6">
          <div className="space-y-8 lg:col-span-2">
            {committee.activities?.length ? (
              <div>
                <h2 className="text-xl font-bold text-navy">Activities</h2>
                <ul className="mt-4 space-y-3">
                  {committee.activities.map((activity) => (
                    <li key={activity} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <aside>
            <h2 className="text-xl font-bold text-navy">Members</h2>
            <div className="mt-4 space-y-3">
              {committee.members?.length ? (
                committee.members.map((member, index) => (
                  <Card key={`${member.name}-${index}`}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <UserRound className="size-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          {member.name}
                        </p>
                        {member.role ? (
                          <p className="text-xs text-primary">{member.role}</p>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Member list coming soon.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
