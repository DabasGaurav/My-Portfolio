import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";

const links = [
  { href: "#work-education", label: "Work & Education" },
  { href: "#cooking", label: "Currently Cooking" },
  { href: "#certifications", label: "Certifications" },
  { href: "#teardowns", label: "Teardowns" },
  { href: "#blog", label: "Blog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold">
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <OpenChatButton className="rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-on-accent transition-opacity hover:opacity-90">
          Ask about me
        </OpenChatButton>
      </div>
    </header>
  );
}
