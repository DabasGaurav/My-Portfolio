import { hero } from "@/content/hero";
import { socialConfig } from "@/config/social.config";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import { AvatarCarousel } from "@/components/hero/AvatarCarousel";

export function Hero() {
  const hasResume = hero.resumeUrl.length > 0;
  const hasCalendar = hero.calendarUrl.length > 0;
  const hasOpenToWork = hero.openToWorkIn.length > 0;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div>
          <h1 className="animate-rise-in text-balance font-display text-4xl font-bold leading-[1.1] md:text-6xl">
            Hi, I&apos;m <span className="text-accent">{hero.name}</span>
          </h1>

          {hero.nickname && (
            <p className="animate-rise-in mt-1 text-sm text-muted [animation-delay:80ms]">
              (also go by {hero.nickname})
            </p>
          )}

          <div className="animate-rise-in mt-4 flex flex-wrap items-center gap-2 [animation-delay:120ms]">
            <span className="card-pop-flat rounded-full px-4 py-1.5 font-sans text-sm text-muted">
              {hero.roleTags.join(" · ")}
            </span>
            {hasOpenToWork && (
              <span className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 font-sans text-sm text-accent">
                Open to work in: {hero.openToWorkIn.join(", ")}
              </span>
            )}
          </div>

          <p className="animate-rise-in mt-5 max-w-md text-lg text-muted [animation-delay:200ms]">
            {hero.positioning}
          </p>

          <div className="animate-rise-in mt-8 flex flex-wrap items-center gap-3 [animation-delay:300ms]">
            <OpenChatButton className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold text-on-accent transition-opacity hover:opacity-90">
              {hero.cta.label}
            </OpenChatButton>

            {hasCalendar && (
              <a
                href={hero.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="card-pop-flat rounded-xl px-6 py-3 font-display text-sm font-bold text-ink"
              >
                Book a call
              </a>
            )}

            {hasResume && (
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="card-pop-flat rounded-xl px-6 py-3 font-display text-sm font-bold text-ink"
              >
                Resume
              </a>
            )}
          </div>

          <div className="animate-rise-in mt-6 flex items-center gap-4 [animation-delay:380ms]">
            <a
              href={socialConfig.linkedin.url}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3.6 5.4h2.3v7H3.6v-7Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM7.4 5.4h2.2v.96h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.76 1.53 2.76 3.53v3.7h-2.3V9.13c0-.86-.02-1.97-1.2-1.97-1.2 0-1.39.94-1.39 1.9v3.34H7.4v-7Z" />
              </svg>
            </a>
            <a
              href={`mailto:${socialConfig.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
                <path d="m2 4 6 5 6-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="animate-rise-in [animation-delay:150ms]">
          <AvatarCarousel avatars={hero.avatars} name={hero.name} />
        </div>
      </div>
    </section>
  );
}
