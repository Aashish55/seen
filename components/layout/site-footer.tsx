import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  LinkedinIcon,
} from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

const exploreLinks = [
  { label: "About SEEN", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Committees", href: "/committees" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
];

const resourceLinks = [
  { label: "News & Notices", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Publications", href: "/publications" },
  { label: "Documents", href: "/documents" },
  { label: "Internship & Careers", href: "/careers" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:px-6">
        <div className="space-y-4 lg:col-span-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-background">
              <Image src="/logo.png" alt="SEEN Logo" width={28} height={28} />
            </span>
            <span className="min-w-0 font-heading text-base font-bold leading-tight text-white lg:whitespace-nowrap lg:text-lg">
              {siteConfig.name}
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SEEN on Facebook"
              className="flex size-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-primary"
            >
              <FacebookIcon />
            </a>
            <a
              href={siteConfig.social.linkedin}
              aria-label="SEEN on LinkedIn"
              className="flex size-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-primary"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Resources" className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
            Resources
          </h3>
          <ul className="space-y-2.5 text-sm">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {siteConfig.address}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
              {siteConfig.phone}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row lg:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js & Sanity ·{" "}
            <Link href="/studio" className="hover:text-white">
              Content Studio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
