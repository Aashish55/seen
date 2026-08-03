import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, School, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Internship & Careers",
  description:
    "Internships, job opportunities, scholarships, and training programs for electrical engineers in Nepal.",
};

const opportunities = [
  {
    icon: School,
    title: "Internships",
    description:
      "SEEN connects engineering students with utilities, consultancies, and industry partners for structured internship placements.",
  },
  {
    icon: Briefcase,
    title: "Job Opportunities",
    description:
      "Member organizations post vacancies for electrical engineers. Check the news section for the latest openings.",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    description:
      "Merit-based scholarships and conference travel grants for promising students and young researchers.",
  },
  {
    icon: Wrench,
    title: "Training Programs",
    description:
      "Certified professional training on protection systems, design tools, safety compliance, and project management.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Internship & Careers"
        description="Opportunities to learn, work, and grow in Nepal's electrical engineering sector."
        crumbs={[{ label: "Internship & Careers" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {opportunities.map((item) => (
              <Card key={item.title} className="transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold text-navy">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-navy p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold">Looking for opportunities?</h2>
            <p className="max-w-xl text-white/75">
              Current openings, internship calls, and scholarship announcements
              are published in our news section.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/news">
                Browse Announcements
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
