import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#blog", label: "Blog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link href="/" className="font-display text-lg">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
