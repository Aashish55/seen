import Image from "next/image";
import { Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaThumbProps {
  imageUrl?: string | null;
  alt: string;
  icon?: LucideIcon;
  className?: string;
  sizes?: string;
}

/**
 * Renders the content image when available, otherwise an on-brand gradient
 * placeholder - so the site looks complete before any assets are uploaded.
 */
export function MediaThumb({
  imageUrl,
  alt,
  icon: Icon = Zap,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: MediaThumbProps) {
  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary/70"
        >
          <Icon className="size-10 text-white/35" />
        </div>
      )}
    </div>
  );
}
