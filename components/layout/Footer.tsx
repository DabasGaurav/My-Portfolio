import { socialConfig } from "@/config/social.config";

const links = [
  { href: socialConfig.github.url, label: "GitHub" },
  { href: socialConfig.linkedin.url, label: "LinkedIn" },
  { href: `mailto:${socialConfig.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()}</span>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
