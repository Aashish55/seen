import type { Metadata } from "next";
import { Award, Eye, Globe2, MapPin, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Society of Electrical Engineers Nepal — our history, vision, mission, leadership, and chapters.",
};

const objectives = [
  "Promote the professional development of electrical engineers in Nepal",
  "Set and advocate for technical standards and safe engineering practice",
  "Foster knowledge exchange through seminars, publications, and research",
  "Represent the profession before government, industry, and academia",
  "Support students and young engineers entering the profession",
  "Strengthen international collaboration with peer societies",
];

const executiveCommittee = [
  { name: "Er. President Name", role: "President" },
  { name: "Er. VP Name", role: "Vice President" },
  { name: "Er. Secretary Name", role: "General Secretary" },
  { name: "Er. Treasurer Name", role: "Treasurer" },
  { name: "Er. Member Name", role: "Executive Member" },
  { name: "Er. Member Name", role: "Executive Member" },
];

const pastPresidents = [
  { name: "Er. Past President", tenure: "2022 – 2024" },
  { name: "Er. Past President", tenure: "2020 – 2022" },
  { name: "Er. Past President", tenure: "2018 – 2020" },
];

const chapters = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SEEN"
        description="The professional home of electrical engineers in Nepal."
        crumbs={[{ label: "About" }]}
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy md:text-3xl">
                Introduction
              </h2>
              <p className="text-muted-foreground">
                The {siteConfig.name} ({siteConfig.shortName}) is the national
                professional society of electrical engineers, uniting
                practitioners across power systems, renewable energy,
                electronics, automation, and emerging technologies.
              </p>
              <p className="text-muted-foreground">
                Founded by a group of practicing engineers, SEEN has grown into
                a nationwide community that champions technical excellence,
                professional ethics, and the electrification of Nepal — from
                large hydropower and transmission projects to rural microgrids.
              </p>
              <h3 className="pt-2 text-xl font-semibold text-navy">History</h3>
              <p className="text-muted-foreground">
                From its earliest gatherings of utility and consulting
                engineers, the society has continuously expanded its role:
                organizing national conferences, publishing technical journals,
                advising on standards, and mentoring the next generation of
                engineers.
              </p>
            </div>
            <div className="grid content-start gap-5">
              <Card>
                <CardContent className="flex gap-4 p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Eye className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">Vision</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A prosperous Nepal powered by safe, reliable, and
                      sustainable electrical systems, engineered by a
                      world-class profession.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex gap-4 p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Target className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">Mission</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      To advance the science and practice of electrical
                      engineering in Nepal through professional development,
                      standards, advocacy, and community.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Award className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy">Objectives</h3>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                        {objectives.map((objective) => (
                          <li key={objective}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="executive-committee" className="scroll-mt-24 border-y bg-card py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader
            eyebrow="Leadership"
            title="Executive Committee"
            description="The elected leadership steering the society's strategy and programs."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {executiveCommittee.map((member, index) => (
              <Card key={`${member.role}-${index}`}>
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <Users className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{member.name}</p>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="past-presidents" className="scroll-mt-24 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader eyebrow="Legacy" title="Past Presidents" />
          <ol className="relative space-y-6 border-l-2 border-primary/30 pl-6">
            {pastPresidents.map((president, index) => (
              <li key={index} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary"
                />
                <p className="font-semibold text-navy">{president.name}</p>
                <p className="text-sm text-muted-foreground">{president.tenure}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="chapters" className="scroll-mt-24 border-y bg-card py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader
            eyebrow="Nationwide Presence"
            title="Chapters"
            description="SEEN chapters bring programs and community to every province."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <li
                key={chapter}
                className="flex items-center gap-3 rounded-lg border bg-background p-4"
              >
                <MapPin className="size-5 text-primary" aria-hidden />
                <span className="font-medium">{chapter} Chapter</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-4 rounded-xl border bg-background p-6">
            <Globe2 className="mt-1 size-6 shrink-0 text-primary" aria-hidden />
            <div>
              <h3 className="font-semibold text-navy">International Relations</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                SEEN maintains relationships with regional and international
                engineering societies for knowledge exchange, joint events, and
                reciprocal membership benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
