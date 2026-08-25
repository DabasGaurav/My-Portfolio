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
        className="w-full"
        style={{ borderRadius: "var(--radius)", border: "2px solid var(--ink)" }}
      />
      {caption && (
        <figcaption className="mt-2 font-sans text-xs font-medium text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
