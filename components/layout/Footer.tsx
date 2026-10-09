import Link from "next/link";
import { socialConfig } from "@/config/social.config";
import { hero } from "@/content/hero";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div>
            <p className="eyebrow text-[#f5e75b]">Have a good problem to solve?</p>
            <h2>Let&apos;s talk.</h2>
          </div>
          <a className="site-footer-cta" href="https://wa.me/918376047278" target="_blank" rel="noreferrer">Start a conversation ↗</a>
        </div>
        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} {hero.name}</span>
          <div>
            <Link href="/#work">Projects</Link>
            <a href={socialConfig.github.url} target="_blank" rel="noreferrer">GitHub</a>
            <a href={socialConfig.linkedin.url} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${socialConfig.email}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
