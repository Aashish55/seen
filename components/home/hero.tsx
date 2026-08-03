import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { icon: Users, value: "1,200+", label: "Member Engineers" },
  { icon: CalendarDays, value: "40+", label: "Events per Year" },
  { icon: FileText, value: "25+", label: "Publications" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-[center_20%] md:bg-[center_30%] bg-no-repeat"
        style={{ backgroundImage: "url('/cover.jpg')" }}
      />
      <div aria-hidden className="absolute inset-0 bg-navy/65" />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 w-[480px] h-[480px] rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-24 w-[420px] h-[420px] rounded-full bg-electric/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 lg:px-6">
        <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
          {siteConfig.tagline}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 max-w-2xl text-white/75 md:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/membership#apply">
              Join Now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/about">Learn About SEEN</Link>
          </Button>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <stat.icon className="size-5" aria-hidden />
              </span>
              <div>
                <dt className="order-2 text-xs text-white/60">{stat.label}</dt>
                <dd className="font-heading text-xl font-bold">{stat.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
