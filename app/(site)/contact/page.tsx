import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/shared/social-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Society of Electrical Engineers Nepal - address, email, phone, office hours, and contact form.",
};

const contactDetails = [
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone },
  { icon: Clock, label: "Office Hours", value: siteConfig.officeHours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Questions about membership, events, or partnerships? We'd love to hear from you."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5 lg:px-6">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-navy">Contact Information</h2>
            <ul className="space-y-5">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <detail.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-medium text-navy hover:text-primary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="font-medium text-navy">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <FacebookIcon />
              Follow us on Facebook
            </a>
            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="SEEN office location on Google Maps"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sSociety+of+Electrical+Engineers+Nepal"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-xl font-bold text-navy">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
