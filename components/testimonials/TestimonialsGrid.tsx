import Image from "next/image";
import type { Testimonial } from "@/types/testimonial";

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {testimonials.map((t) => {
        const card = (
          <div
            className={
              t.placeholder
                ? "card-pop-flat border-dashed p-6 opacity-70"
                : "card-pop group p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            }
          >
            <svg
              width="28"
              height="20"
              viewBox="0 0 28 20"
              fill="none"
              aria-hidden="true"
              className={t.placeholder ? "text-hairline" : "text-accent/40"}
            >
              <path
                d="M0 20V11.4C0 4.9 4 .9 11 0l1 3.6c-4 1-6 3.3-6 7h6V20H0Zm16 0V11.4c0-6.5 4-10.5 11-11.4l1 3.6c-4 1-6 3.3-6 7h6V20H16Z"
                fill="currentColor"
              />
            </svg>
            <p className="mt-3 text-muted">{t.quote}</p>
            <div className="mt-5 flex items-center gap-3">
              {t.avatar && (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-display text-sm font-bold">{t.name}</p>
                {t.role && (
                  <p className="font-sans text-xs font-medium text-muted">{t.role}</p>
                )}
              </div>
              {t.placeholder && (
                <span className="ml-auto shrink-0 rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                  Placeholder
                </span>
              )}
            </div>
          </div>
        );

        return t.linkedinUrl ? (
          <a
            key={t.name}
            href={t.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-transform active:scale-[0.98]"
          >
            {card}
          </a>
        ) : (
          <div key={t.name}>{card}</div>
        );
      })}
    </div>
  );
}
