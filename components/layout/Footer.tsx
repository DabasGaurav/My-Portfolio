import { socialConfig } from "@/config/social.config";
import { hero } from "@/content/hero";

const columns = [
  {
    heading: "Work",
    links: [
      { href: "#work-education", label: "Work & Education" },
      { href: "#cooking", label: "Currently Cooking" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "#certifications", label: "Certifications" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#teardowns", label: "Teardowns" },
    ],
  },
  {
    heading: "Content",
    links: [
      { href: "#blog", label: "Blog" },
      { href: socialConfig.github.url, label: "GitHub Profile" },
    ],
  },
];

export function Footer() {
  const hasCalendar = hero.calendarUrl.length > 0;

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold">
              {hero.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">{hero.positioning}</p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={socialConfig.linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M3.6 5.4h2.3v7H3.6v-7Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM7.4 5.4h2.2v.96h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.76 1.53 2.76 3.53v3.7h-2.3V9.13c0-.86-.02-1.97-1.2-1.97-1.2 0-1.39.94-1.39 1.9v3.34H7.4v-7Z" />
                </svg>
              </a>
              <a
                href={socialConfig.github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted transition-colors hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                  />
                </svg>
              </a>
              <a
                href={`mailto:${socialConfig.email}`}
                aria-label="Email"
                className="text-muted transition-colors hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
                  <path d="m2 4 6 5 6-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-display text-sm font-bold">{col.heading}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-sans text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 font-sans text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {hero.name}</span>
          {hasCalendar && (
            <a
              href={hero.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent transition-opacity hover:opacity-70"
            >
              Let&apos;s talk &rarr;
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
