import Link from "next/link";
import { socialConfig } from "@/config/social.config";
import { hero } from "@/content/hero";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#102e31] text-[#f7f3e9]">
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d9a47e]">04 / Let&apos;s make something useful</p>
          <p className="mt-4 font-display text-3xl font-bold">Have a good problem to solve?</p>
          <p className="mt-2 max-w-md text-sm text-[#c7d8d4]">I&apos;d like to hear about it.</p>
          <a href={`mailto:${socialConfig.email}`} className="mt-5 inline-block rounded-lg bg-[#e7c39b] px-5 py-3 font-sans text-sm font-bold text-[#102e31] hover:opacity-90">Get in touch ↗</a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-[#c7d8d4]">
          <Link href="/#work" className="hover:text-white">Projects</Link>
          <a href={socialConfig.github.url} target="_blank" rel="noreferrer" className="hover:text-white">GitHub ↗</a>
          <a href={socialConfig.linkedin.url} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
          <span>© {new Date().getFullYear()} {hero.name}</span>
        </div>
      </div>
    </footer>
  );
}
