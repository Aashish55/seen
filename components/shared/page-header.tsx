import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  crumbs?: Crumb[];
}

export function PageHeader({ title, description, crumbs = [] }: PageHeaderProps) {
  return (
    <section className="border-b bg-gradient-to-br from-navy via-navy-light to-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 lg:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <Fragment key={crumb.label}>
                <ChevronRight className="size-3.5" aria-hidden />
                <li>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {crumb.label}
                    </span>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-white/75 md:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
