import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Network,
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
    "Life membership fee and eligibility for the Society of Electrical Engineers Nepal.",
};

const membershipType = {
  icon: BadgeCheck,
  name: "Life Membership",
  fee: "NPR 3,100",
  feeNote: "one-time",
  description:
    "A single payment secures lifetime membership with SEEN - no annual renewals.",
  requirements: "Nepal Engineering Council (NEC) registered electrical engineer.",
};

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

      <section id="fees" className="scroll-mt-24 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeader
            eyebrow="Transparent Pricing"
            title="Membership"
            description="One membership, for life - open to NEC-registered electrical engineers."
          />
          <Card>
            <CardContent className="flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <div className="flex items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <membershipType.icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{membershipType.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {membershipType.description}
                  </p>
                </div>
              </div>
              <div className="border-t pt-6 text-left sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0 sm:text-right">
                <p className="flex items-baseline gap-1.5 sm:justify-end">
                  <span className="text-4xl font-bold text-primary">
                    {membershipType.fee}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {membershipType.feeNote}
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Eligibility: </span>
                  {membershipType.requirements}
                </p>
              </div>
            </CardContent>
          </Card>
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
                  "NEC registration certificate",
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
