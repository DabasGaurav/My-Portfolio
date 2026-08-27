import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const links = [
  { href: "#work-education", label: "Work & Education" },
  { href: "#cooking", label: "Currently Cooking" },
  { href: "#certifications", label: "Certifications" },
  { href: "#blog", label: "Blog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link href="/" className="font-display text-xl italic">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
