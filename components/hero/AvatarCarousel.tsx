"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Avatar = { src: string; role: string };

export function AvatarCarousel({ avatars, name }: { avatars: readonly Avatar[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (avatars.length < 2 || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % avatars.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [avatars.length, paused, reducedMotion]);

  const current = avatars[index];

  return (
    <div className="portrait-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="portrait-orbit" aria-hidden="true" />
      <div className="portrait-frame">
        <Image
          key={current.src}
          src={current.src}
          alt={`${name}, ${current.role}`}
          fill
          sizes="(min-width: 768px) 300px, 240px"
          className={`portrait-image ${index === 0 ? "portrait-image-real" : ""}`}
          priority={index === 0}
        />
      </div>
      {avatars.length > 1 && (
        <div className="portrait-controls" aria-label="Choose a portrait">
          {avatars.map((avatar, pictureIndex) => (
            <button
              key={avatar.src}
              type="button"
              onClick={() => setIndex(pictureIndex)}
              aria-label={`Show ${avatar.role} portrait`}
              aria-current={index === pictureIndex ? "true" : undefined}
              className={index === pictureIndex ? "is-active" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
