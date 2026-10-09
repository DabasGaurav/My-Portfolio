import Link from "next/link";
import { socialConfig } from "@/config/social.config";
import { hero } from "@/content/hero";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold">{hero.name.split(" ")[0]}<span className="text-accent">.</span></p>
          <p className="mt-2 max-w-md text-sm text-muted">Have a product problem worth working on? I&apos;d like to hear about it.</p>
          <a href={`mailto:${socialConfig.email}`} className="mt-4 inline-block font-sans text-sm font-semibold text-accent hover:underline">Get in touch ↗</a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-muted">
          <Link href="/#work" className="hover:text-accent">Projects</Link>
          <a href={socialConfig.github.url} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub ↗</a>
          <a href={socialConfig.linkedin.url} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn ↗</a>
          <span>© {new Date().getFullYear()} {hero.name}</span>
        </div>
      </div>
    </footer>
  );
}
