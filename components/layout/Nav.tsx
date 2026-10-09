import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const links = [
  { href: "/#work", label: "Selected work" },
  { href: "/#background", label: "Background" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold">
          {siteConfig.name.split(" ")[0]}<span className="text-accent">.</span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="font-sans text-sm text-muted transition-colors hover:text-accent">{link.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
