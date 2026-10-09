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
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (avatars.length < 2 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % avatars.length);
    }, 4000);
    return () => clearInterval(id);
  }, [avatars.length, paused]);

  const current = avatars[index];

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-72">
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
      <p className="animate-avatar-fade mt-4 text-center font-display text-sm font-bold text-accent md:text-xl" key={`${current.role}-label`}>
        {current.role}
      </p>
      {avatars.length > 1 && <div className="mt-4 flex items-center gap-2" aria-label="Portrait controls">
        {avatars.map((avatar, pictureIndex) => <button key={avatar.src} type="button" onClick={() => setIndex(pictureIndex)} aria-label={`Show ${avatar.role} portrait`} aria-current={index === pictureIndex ? "true" : undefined} className={`h-2 rounded-full transition-all ${index === pictureIndex ? "w-7 bg-accent" : "w-2 bg-hairline hover:bg-accent"}`} />)}
        <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play portrait rotation" : "Pause portrait rotation"} className="ml-2 rounded-full border border-hairline px-2 py-1 font-mono text-[10px] text-muted hover:border-accent hover:text-accent">{paused ? "Play" : "Pause"}</button>
      </div>}
    </div>
  );
}
