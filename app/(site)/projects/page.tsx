import type { Metadata } from "next";
import { Hammer } from "lucide-react";
import { ProjectCard } from "@/components/cards/project-card";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { allProjectsQuery } from "@/sanity/queries";
import type { Project } from "@/types/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured electrical engineering projects supported by the Society of Electrical Engineers Nepal.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetchList<Project>(allProjectsQuery);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Engineering initiatives supported by SEEN members and committees across Nepal."
        crumbs={[{ label: "Projects" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          {projects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Hammer}
              title="No projects published yet"
              description="Engineering projects supported by SEEN will appear here."
            />
          )}
        </div>
      </section>
    </>
  );
}
