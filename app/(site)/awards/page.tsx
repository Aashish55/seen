import type { Metadata } from "next";
import { Award, FlaskConical, Lightbulb, Medal, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Awards & Honors",
  description:
    "SEEN awards recognizing excellence: Lifetime Achievement, Outstanding Engineer, Young Engineer, Innovation, and Best Research Paper.",
};

const awards = [
  {
    icon: Trophy,
    title: "Lifetime Achievement Award",
    description:
      "Honoring a distinguished career of exceptional service to Nepal's electrical engineering profession.",
  },
  {
    icon: Medal,
    title: "Outstanding Engineer Award",
    description:
      "Recognizing exemplary professional practice and impactful contribution to the sector.",
  },
  {
    icon: Award,
    title: "Young Engineer Award",
    description:
      "Celebrating early-career engineers showing outstanding promise and initiative.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Award",
    description:
      "For novel solutions and technologies addressing Nepal's energy challenges.",
  },
  {
    icon: FlaskConical,
    title: "Best Research Paper Award",
    description:
      "Awarded to the strongest peer-reviewed paper presented at SEEN conferences.",
  },
];

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        title="Awards & Honors"
        description="Recognizing excellence and service in Nepal's electrical engineering community."
        crumbs={[{ label: "Awards" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <Card key={award.title} className="transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy text-white">
                    <award.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold text-navy">{award.title}</h2>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-10 rounded-lg border bg-card p-5 text-sm text-muted-foreground">
            Nominations open annually ahead of the Annual General Meeting. Watch
            the news section for the call for nominations, or contact the
            secretariat for details.
          </p>
        </div>
      </section>
    </>
  );
}
