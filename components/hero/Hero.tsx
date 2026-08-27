import Image from "next/image";
import { hero } from "@/content/hero";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";

export function Hero() {
  const hasResume = hero.resumeUrl.length > 0;
  const hasCalendar = hero.calendarUrl.length > 0;
  const hasIllustration = hero.illustratedAvatarSrc.length > 0;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div>
          <span className="animate-rise-in inline-block rounded-full border border-hairline bg-surface-raised px-4 py-1.5 font-sans text-sm font-medium text-muted shadow-sm">
            {hero.badge}
          </span>

          <h1 className="animate-rise-in mt-6 text-balance font-display text-5xl leading-[1.05] md:text-7xl [animation-delay:100ms]">
            {hero.name.split(" ")[0]}{" "}
            <span className="text-accent italic">
              {hero.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="animate-rise-in mt-5 max-w-md text-lg text-muted [animation-delay:200ms]">
            {hero.positioning}
          </p>

          <div className="animate-rise-in mt-8 flex flex-wrap items-center gap-3 [animation-delay:300ms]">
            <OpenChatButton className="card-pop inline-block bg-accent px-7 py-3.5 font-sans text-base font-semibold text-on-accent">
              {hero.cta.label}
            </OpenChatButton>

            {hasResume && (
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="card-pop inline-flex items-center gap-2 bg-surface-raised px-6 py-3.5 font-sans text-base font-semibold text-ink"
              >
                Resume
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 2v8m0 0L5 7m3 3 3-3M3 12v1.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V12"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}

            {hasCalendar && (
              <a
                href={hero.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="card-pop inline-flex items-center gap-2 bg-surface-raised px-6 py-3.5 font-sans text-base font-semibold text-ink"
              >
                Book a call
              </a>
            )}
          </div>
        </div>

        <div className="animate-rise-in relative mx-auto aspect-square w-full max-w-72 md:max-w-none [animation-delay:150ms]">
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, var(--accent-2) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="group relative aspect-square w-full overflow-hidden rounded-full border-4 border-surface-raised shadow-xl">
            <Image
              src="/images/gaurav.jpg"
              alt={hero.name}
              fill
              sizes="(min-width: 768px) 40vw, 288px"
              className={`object-cover object-[50%_65%] transition-transform duration-500 ${
                hasIllustration ? "group-hover:opacity-0" : "group-hover:scale-105"
              }`}
              priority
            />
            {hasIllustration && (
              <Image
                src={hero.illustratedAvatarSrc}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 288px"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
