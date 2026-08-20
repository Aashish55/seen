import type { Metadata } from "next";
import { Fragment } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Eye,
  Flag,
  HardHat,
  Handshake,
  Landmark,
  Leaf,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { ExecutiveCommitteeMemberCard } from "@/components/cards/executive-committee-member-card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { siteConfig } from "@/lib/site-config";
import { sanityFetchList } from "@/sanity/fetch";
import { executiveCommitteeQuery, pastPresidentsQuery } from "@/sanity/queries";
import type { ExecutiveCommitteeMember, PastPresident } from "@/types/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Society of Electrical Engineers Nepal - our history, vision, mission, leadership, and chapters.",
};

const objectives = [
  "Promote the professional development of electrical engineers in Nepal",
  "Set and advocate for technical standards and safe engineering practice",
  "Foster knowledge exchange through seminars, publications, and research",
  "Represent the profession before government, industry, and academia",
  "Support students and young engineers entering the profession",
  "Strengthen international collaboration with peer societies",
];

const purposeFlow = [
  { label: "Electrical Engineers", icon: Users },
  { label: "Professional Excellence", icon: Award },
  { label: "Safe & Reliable Electricity", icon: ShieldCheck },
  { label: "Technology & Innovation", icon: Lightbulb },
  { label: "National Development", icon: Flag },
];

const coreValues = [
  {
    icon: BadgeCheck,
    title: "Professionalism",
    description: "Commitment to competence, integrity, ethics, and excellence.",
  },
  {
    icon: HardHat,
    title: "Safety",
    description:
      "Prioritizing human life and safety in every electrical engineering practice.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Encouraging creativity, research, technology, and forward-looking solutions.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description:
      "Building bridges among engineers, academia, industry, government, and society.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Promoting efficient, resilient, environmentally responsible energy and electrical systems.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description:
      "Creating a culture of continuous learning and professional development.",
  },
  {
    icon: Landmark,
    title: "National Service",
    description:
      "Using engineering knowledge and expertise for the advancement of Nepal.",
  },
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

export default async function AboutPage() {
  const [executiveCommittee, pastPresidents] = await Promise.all([
    sanityFetchList<ExecutiveCommitteeMember>(executiveCommitteeQuery),
    sanityFetchList<PastPresident>(pastPresidentsQuery),
  ]);

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
              <p className="text-muted-foreground text-justify">
                The {siteConfig.name} ({siteConfig.shortName}) is the national
                professional society of electrical engineers, uniting
                practitioners across power systems, renewable energy,
                electronics, automation, and emerging technologies.
              </p>
              <p className="text-muted-foreground text-justify">
                Founded by a group of practicing engineers, SEEN has grown into
                a nationwide community that champions technical excellence,
                professional ethics, and the electrification of Nepal - from
                large hydropower and transmission projects to rural microgrids.
              </p>
              <h3 className="pt-2 text-xl font-semibold text-navy">History</h3>
              <p className="text-muted-foreground text-justify">
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
                      Excellence in Electrical Engineering for a Safe, Sustainable, Innovative and Electrified Nepal.
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
                      To unite, empower and advance electrical engineers through professional development, knowledge, research, collaboration and advocacy, while promoting safe, reliable, efficient and sustainable electrical engineering practices for national development.
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

      <section id="core-values" className="scroll-mt-24 pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-10 md:px-12 md:py-12">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 size-64 rounded-full bg-primary/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-16 size-56 rounded-full bg-electric/20 blur-3xl"
            />
            <div className="relative">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Our Purpose
              </p>

              {/* Mobile: stacked rows */}
              <ol className="mt-8 space-y-3 md:hidden">
                {purposeFlow.map((step, index) => (
                  <li
                    key={step.label}
                    className="flex items-center gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-electric text-white shadow-md">
                      <step.icon className="size-5" aria-hidden />
                    </span>
                    <div className="flex flex-1 items-center gap-2">
                      <span className="text-xs font-bold text-white/40">
                        0{index + 1}
                      </span>
                      <p className="text-sm font-semibold text-white">
                        {step.label}
                      </p>
                    </div>
                    {index < purposeFlow.length - 1 ? (
                      <ArrowRight
                        className="size-4 shrink-0 rotate-90 text-white/30"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>

              {/* Desktop: horizontal flow with connecting arrows */}
              <ol className="mt-12 hidden md:flex md:items-start">
                {purposeFlow.map((step, index) => (
                  <Fragment key={step.label}>
                    <li className="flex flex-1 flex-col items-center px-2 text-center">
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-electric text-white shadow-lg ring-4 ring-navy">
                        <step.icon className="size-6" aria-hidden />
                      </span>
                      <p className="mt-3 max-w-[9rem] text-sm font-semibold leading-snug text-white">
                        {step.label}
                      </p>
                    </li>
                    {index < purposeFlow.length - 1 ? (
                      <li
                        aria-hidden
                        className="flex shrink-0 items-center pt-5 text-white/30"
                      >
                        <ArrowRight className="size-5" />
                      </li>
                    ) : null}
                  </Fragment>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <SectionHeader
              eyebrow="What Drives Us"
              title="SEEN Core Values"
              description="The principles that guide every engineer, program, and decision at SEEN."
            />
            <div className="border-t border-border">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className="group grid gap-4 border-b border-border px-2 py-7 transition-colors duration-300 hover:bg-card md:grid-cols-[5rem_14rem_1fr] md:items-center md:gap-8 md:px-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-2xl font-bold text-primary/20 transition-colors duration-300 group-hover:text-primary/40 md:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <value.icon className="size-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy md:text-lg">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
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
          {executiveCommittee.length ? (
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {executiveCommittee
                  .map((member) => (
                    <ExecutiveCommitteeMemberCard key={member._id} member={member} />
                  ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No committee members listed yet"
              description="The executive committee will appear here once added in the Studio."
            />
          )}
        </div>
      </section>

      <section id="past-presidents" className="scroll-mt-24 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader eyebrow="Legacy" title="Past Presidents" />
          {pastPresidents.length ? (
            <ol className="relative space-y-6 border-l-2 border-primary/30 pl-6">
              {pastPresidents.map((president) => (
                <li key={president._id} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary"
                  />
                  <p className="font-semibold text-navy">{president.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {president.startYear} – {president.endYear ?? "Present"}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              icon={Users}
              title="No past presidents listed yet"
              description="Past presidents will appear here once added in the Studio."
            />
          )}
        </div>
      </section>

      {/* <section id="chapters" className="scroll-mt-24 border-y bg-card py-14 md:py-20">
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
      </section> */}
    </>
  );
}
