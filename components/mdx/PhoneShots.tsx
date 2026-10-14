import Image from "next/image";

type Shot = { src: string; alt: string; caption: string };

/**
 * A row of portrait phone screenshots with captions. `shots` is a JSON
 * string (same convention as Chart's `data`) because MDX JS expressions
 * are blocked by next-mdx-remote.
 */
export function PhoneShots({ shots }: { shots: string }) {
  const items = JSON.parse(shots) as Shot[];

  return (
    <div className="my-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
      {items.map((shot) => (
        <figure key={shot.src}>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={390}
            height={844}
            className="h-auto w-full"
            style={{ borderRadius: "var(--radius)", border: "1px solid var(--hairline)" }}
          />
          <figcaption className="mt-2 font-sans text-xs font-medium leading-snug text-muted">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
