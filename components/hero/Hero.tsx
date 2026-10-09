"use client";

import { hero } from "@/content/hero";
import { socialConfig } from "@/config/social.config";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import { AvatarCarousel } from "@/components/hero/AvatarCarousel";
import { haptic } from "@/lib/haptics";

export function Hero() {
  return (
    <section className="portfolio-hero">
      <div className="portfolio-hero-inner">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Product manager / builder</p>
          <h1>Hi, I&apos;m <span>{hero.name}.</span></h1>
          <p className="portfolio-positioning">{hero.positioning}</p>
          <div className="portfolio-hero-actions">
            <a href="#work" className="button button-coral" onClick={() => haptic("tap")}>{hero.cta.label} <span aria-hidden="true">↗</span></a>
            <OpenChatButton className="button button-outline-light">Ask about my work</OpenChatButton>
          </div>
          <div className="portfolio-socials" aria-label="Contact and profiles">
            <a href={socialConfig.linkedin.url} target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={() => haptic("tap")}>
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3.6 5.4h2.3v7H3.6v-7Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM7.4 5.4h2.2v.96h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.76 1.53 2.76 3.53v3.7h-2.3V9.13c0-.86-.02-1.97-1.2-1.97-1.2 0-1.39.94-1.39 1.9v3.34H7.4v-7Z" /></svg>
            </a>
            <a href={`mailto:${socialConfig.email}`} aria-label="Email" onClick={() => haptic("tap")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 6 9 7 9-7" /></svg>
            </a>
            <a href="https://wa.me/918376047278" target="_blank" rel="noreferrer" aria-label="WhatsApp +91 83760 47278" onClick={() => haptic("tap")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16.5v2.8a2 2 0 0 1-2.2 2A18 18 0 0 1 3 5.2 2 2 0 0 1 5 3h2.8a2 2 0 0 1 2 1.7l.4 2.5a2 2 0 0 1-.6 1.8L8 10.5a14 14 0 0 0 5.5 5.5l1.5-1.6a2 2 0 0 1 1.8-.6l2.5.4a2 2 0 0 1 1.7 2Z" /></svg>
            </a>
            <a href={socialConfig.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={() => haptic("tap")}>
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.23.49-2.69-.94-2.69-.94-.36-.92-.89-1.16-.89-1.16-.73-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.32c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" /></svg>
            </a>
          </div>
        </div>
        <AvatarCarousel avatars={hero.avatars} name={hero.name} />
      </div>
    </section>
  );
}
