import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Users, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { RichText } from "@/components/shared/rich-text";
import { sanityFetchOne } from "@/sanity/fetch";
import { projectBySlugQuery } from "@/sanity/queries";
import type { Project } from "@/types/content";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  return sanityFetchOne<Project>(projectBySlugQuery, { params: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
    openGraph: project.imageUrl
      ? { images: [{ url: project.imageUrl }] }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.description}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-3 lg:px-6">
          <div className="space-y-8 lg:col-span-2">
            {project.body ? <RichText value={project.body} /> : null}
            {project.gallery?.length ? (
              <div>
                <h2 className="mb-4 text-xl font-bold text-navy">Gallery</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.gallery.map((url) => (
                    <div
                      key={url}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <aside className="space-y-5">
            <Card>
              <CardContent className="space-y-4 p-6">
                {project.category ? (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {project.category}
                  </Badge>
                ) : null}
                {project.location ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Location
                      </p>
                      <p className="text-sm font-medium">{project.location}</p>
                    </div>
                  </div>
                ) : null}
                {project.contributors?.length ? (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Contributors
                      </p>
                      <p className="text-sm font-medium">
                        {project.contributors.join(", ")}
                      </p>
                    </div>
                  </div>
                ) : null}
                {project.technologies?.length ? (
                  <div className="flex items-start gap-3">
                    <Wrench className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
