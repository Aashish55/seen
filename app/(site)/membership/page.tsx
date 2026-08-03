import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Medal,
  Network,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership types, benefits, requirements, and fees for the Society of Electrical Engineers Nepal.",
};

const membershipTypes = [
  {
    icon: GraduationCap,
    name: "Student",
    fee: "NPR 500 / year",
    description:
      "For students enrolled in electrical or related engineering programs.",
    requirements: "Proof of enrollment in a recognized institution.",
  },
  {
    icon: UserRound,
    name: "Associate",
    fee: "NPR 1,500 / year",
    description:
      "For fresh graduates and engineers early in their professional journey.",
    requirements: "Bachelor's degree in electrical or related engineering.",
  },
  {
    icon: BadgeCheck,
    name: "Professional",
    fee: "NPR 3,000 / year",
    description:
      "For licensed practicing engineers with professional experience.",
    requirements: "NEC registration and 2+ years of professional experience.",
  },
  {
    icon: Medal,
    name: "Fellow",
    fee: "By invitation",
    description:
      "Honors members with outstanding contributions to the profession.",
    requirements: "Nomination and approval by the executive committee.",
  },
  {
    icon: Building2,
    name: "Institutional",
    fee: "NPR 25,000 / year",
    description:
      "For companies, utilities, consultancies, and academic institutions.",
    requirements: "Registered organization working in the electrical sector.",
  },
];

const benefits = [
  { icon: Network, text: "Professional network of 1,200+ engineers across Nepal" },
  { icon: BookOpen, text: "Free access to journals, publications, and technical archives" },
  { icon: Users, text: "Discounted registration for conferences, workshops, and trainings" },
  { icon: BadgeCheck, text: "Recognition, awards, and professional endorsement" },
  { icon: GraduationCap, text: "CPD opportunities and mentorship programs" },
  { icon: Building2, text: "Voice in national standards and policy advocacy" },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        title="Membership"
        description="Join Nepal's professional community of electrical engineers."
        crumbs={[{ label: "Membership" }]}
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader
            eyebrow="Find Your Fit"
            title="Membership Types"
            description="Five categories designed for every stage of an engineering career."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {membershipTypes.map((type) => (
              <Card key={type.name} className="flex flex-col p-0">
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <type.icon className="size-5" aria-hidden />
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-navy">{type.name}</h3>
                    <span className="text-sm font-semibold text-primary">{type.fee}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  <p className="mt-auto border-t pt-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Requirements: </span>
                    {type.requirements}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-24 border-y bg-card py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader eyebrow="Why Join" title="Membership Benefits" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <li
                key={benefit.text}
                className="flex items-start gap-3 rounded-lg border bg-background p-5"
              >
                <benefit.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="fees" className="scroll-mt-24 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader
            eyebrow="Transparent Pricing"
            title="Fees & Requirements"
            description="Annual fees by membership category. A one-time admission fee of NPR 1,000 applies to new Associate and Professional members."
          />
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-navy text-left text-white">
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Annual Fee</th>
                  <th className="px-5 py-3.5 font-semibold">Key Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-card">
                {membershipTypes.map((type) => (
                  <tr key={type.name}>
                    <td className="px-5 py-3.5 font-medium text-navy">{type.name}</td>
                    <td className="px-5 py-3.5">{type.fee}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {type.requirements}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 border-t bg-navy py-14 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Apply Online</h2>
              <p className="mt-3 text-white/75">
                Ready to join? Download the membership form, fill in your
                details, and email it with your documents to{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-electric brightness-150 underline">
                  {siteConfig.email}
                </a>
                . An online application portal is coming soon.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {[
                  "Completed application form",
                  "Copy of academic certificates",
                  "NEC registration (for Professional members)",
                  "Passport-size photo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" variant="secondary">
                <Link href="/documents">
                  Download Forms
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
