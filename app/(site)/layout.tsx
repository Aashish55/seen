import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { UrgentNoticePopup } from "@/components/shared/urgent-notice-popup";
import { sanityFetchOne } from "@/sanity/fetch";
import { urgentNoticeQuery } from "@/sanity/queries";
import type { UrgentNotice } from "@/types/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notice = await sanityFetchOne<UrgentNotice>(urgentNoticeQuery);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {notice ? <UrgentNoticePopup notice={notice} /> : null}
    </div>
  );
}
