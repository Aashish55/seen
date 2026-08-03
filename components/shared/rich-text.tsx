import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { urlFor } from "@/sanity/image";

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-headings:font-heading space-y-4 leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic">
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value: image }) => (
              <Image
                src={urlFor(image).width(1200).url()}
                alt={image.alt ?? ""}
                width={1200}
                height={675}
                className="rounded-lg"
              />
            ),
          },
        }}
      />
    </div>
  );
}
