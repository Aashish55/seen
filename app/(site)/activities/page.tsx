import type { Metadata } from "next";
import {
  Award,
  Factory,
  GraduationCap,
  HandHeart,
  Mic2,
  MonitorPlay,
  Presentation,
  Users2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Technical seminars, workshops, conferences, webinars, industrial visits, competitions, and outreach programs by SEEN.",
};

const activities = [
  {
    icon: Mic2,
    title: "Technical Seminars",
    description:
      "Regular expert talks on power systems, renewables, automation, and emerging technologies.",
  },
  {
    icon: Presentation,
    title: "Workshops",
    description:
      "Hands-on training on protection, design software, safety practices, and field techniques.",
  },
  {
    icon: Users2,
    title: "Conferences",
    description:
      "National conferences connecting engineers, researchers, utilities, and policymakers.",
  },
  {
    icon: MonitorPlay,
    title: "Webinars",
    description:
      "Accessible online sessions with national and international speakers.",
  },
  {
    icon: Factory,
    title: "Industrial Visits",
    description:
      "Site visits to hydropower plants, substations, factories, and control centers.",
  },
  {
    icon: Award,
    title: "Competitions",
    description:
      "Student project competitions, paper contests, and innovation challenges.",
  },
  {
    icon: GraduationCap,
    title: "Outreach Programs",
    description:
      "Electrical safety awareness campaigns in schools and communities nationwide.",
  },
  {
    icon: HandHeart,
    title: "CSR Activities",
    description:
      "Community electrification support, disaster response, and volunteer engineering.",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities"
        description="What SEEN does year-round to advance the profession and serve the public."
        crumbs={[{ label: "Activities" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <Card key={activity.title} className="transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <activity.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="font-semibold text-navy">{activity.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
