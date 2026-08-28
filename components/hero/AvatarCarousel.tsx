"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Avatar = { src: string; role: string };

/**
 * The reference site's rotating hero avatar: a large circular image with
 * a glow ring, cross-fading between images every few seconds, each
 * paired with a role-title caption that changes in sync. A single-entry
 * array just renders statically — this only visibly rotates once more
 * avatars are added to content/hero.ts.
 */
export function AvatarCarousel({ avatars, name }: { avatars: readonly Avatar[]; name: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (avatars.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % avatars.length);
    }, 4000);
    return () => clearInterval(id);
  }, [avatars.length]);

  const current = avatars[index];

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-72 md:max-w-80">
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, var(--accent-2) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-accent">
          <Image
            key={current.src}
            src={current.src}
            alt={name}
            fill
            sizes="(min-width: 768px) 40vw, 288px"
            className="animate-avatar-fade object-cover object-[50%_65%]"
            priority
          />
        </div>
      </div>
      <p className="animate-avatar-fade mt-4 font-display text-xl font-bold text-accent" key={`${current.role}-label`}>
        {current.role}
      </p>
    </div>
  );
}
