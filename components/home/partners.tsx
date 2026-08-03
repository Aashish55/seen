import Image from "next/image";
import { Building2 } from "lucide-react";
import type { Partner } from "@/types/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {partners.map((partner) => {
        const content = (
          <span className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border bg-card p-5 text-center transition-colors hover:border-primary/40">
            {partner.logoUrl ? (
              <span className="relative h-10 w-full">
                <Image
                  src={partner.logoUrl}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </span>
            ) : (
              <Building2 className="size-8 text-muted-foreground/60" aria-hidden />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {partner.name}
            </span>
          </span>
        );

        return (
          <li key={partner._id} className="h-full">
            {partner.website && partner.website !== "#" ? (
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
