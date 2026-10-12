"use client";

import { type ReactNode } from "react";

export function NewsArticleMedia({
  imageUrl,
  alt,
  children,
}: {
  imageUrl: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mb-8 flex w-full justify-center">
        <img
          src={imageUrl}
          alt={alt}
          className="h-auto max-h-[70vh] w-auto max-w-full rounded-2xl object-contain"
        />
      </div>
      {children}
    </>
  );
}
