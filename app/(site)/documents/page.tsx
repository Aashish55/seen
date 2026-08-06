import type { Metadata } from "next";
import { Download, FileText, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { sanityFetchList } from "@/sanity/fetch";
import { documentsQuery } from "@/sanity/queries";
import type { OfficialDocument } from "@/types/content";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Official SEEN documents - code of ethics, membership forms, standards, guidelines, policies, and annual reports.",
};

export default async function DocumentsPage() {
  const documents = await sanityFetchList<OfficialDocument>(documentsQuery);
  const categories = [...new Set(documents.map((doc) => doc.category))];

  return (
    <>
      <PageHeader
        title="Documents"
        description="Official forms, standards, guidelines, and policies published by SEEN."
        crumbs={[{ label: "Documents" }]}
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl space-y-12 px-4 lg:px-6">
          {!categories.length && (
            <EmptyState
              icon={FolderOpen}
              title="No documents published yet"
              description="Official forms, standards, and guidelines will appear here."
            />
          )}
          {categories.map((category) => (
            <div key={category}>
              <SectionHeader title={category} />
              <ul className="divide-y rounded-xl border bg-card">
                {documents
                  .filter((doc) => doc.category === category)
                  .map((doc) => (
                    <li
                      key={doc._id}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <FileText className="size-5 shrink-0 text-primary" aria-hidden />
                        <span className="truncate font-medium">{doc.title}</span>
                      </span>
                      {doc.fileUrl ? (
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="size-3.5" aria-hidden />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
