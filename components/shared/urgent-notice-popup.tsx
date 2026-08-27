"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UrgentNotice } from "@/types/content";

const dismissKey = (id: string) => `urgent-notice-dismissed:${id}`;

export function UrgentNoticePopup({ notice }: { notice: UrgentNotice }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(dismissKey(notice._id))) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, [notice._id]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      try {
        sessionStorage.setItem(dismissKey(notice._id), "1");
      } catch {
        /* ignore */
      }
    }
  }

  const isImage = notice.fileType?.startsWith("image/");
  const isPdf = notice.fileType === "application/pdf";

  const contentClass = isImage
    ? "w-auto max-w-[calc(100vw-2rem)]"
    : isPdf
      ? "h-[95vh] w-[calc(100%-2rem)] max-w-3xl"
      : "max-w-lg";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={contentClass}>
        <DialogHeader>
          <DialogTitle className="text-lg">{notice.title}</DialogTitle>
          {notice.description ? (
            <DialogDescription className="whitespace-pre-line text-sm">
              {notice.description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {notice.fileUrl ? (
          isImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={notice.fileUrl}
              alt={notice.title}
              className="pointer-events-none block h-auto max-h-[80vh] w-auto max-w-full rounded-lg border object-contain select-none"
            />
          ) : isPdf ? (
            <object
              data={`${notice.fileUrl}#toolbar=0`}
              type="application/pdf"
              className="min-h-0 flex-1 rounded-lg border"
            >
              <Button asChild variant="outline" className="w-full justify-start">
                <a
                  href={notice.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText />
                  <span className="truncate">View PDF</span>
                  <ExternalLink className="ml-auto size-3.5 opacity-60" />
                </a>
              </Button>
            </object>
          ) : (
            <Button asChild variant="outline" className="w-full justify-start">
              <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download />
                <span className="truncate">
                  Download {notice.fileName ?? "attachment"}
                </span>
                <ExternalLink className="ml-auto size-3.5 opacity-60" />
              </a>
            </Button>
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
