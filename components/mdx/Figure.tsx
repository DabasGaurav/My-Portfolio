import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full border border-hairline"
      />
      {caption && (
        <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
