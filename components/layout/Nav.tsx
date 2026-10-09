import Link from "next/link";
import { socialConfig } from "@/config/social.config";

export function Nav() {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="site-brand" aria-label="Gaurav Dabas, home">
          <span className="site-brand-mark">GD</span>
          <span>Gaurav Dabas</span>
        </Link>
        <nav className="site-nav-links" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#background">Background</Link>
        </nav>
        <a className="site-nav-contact" href={`mailto:${socialConfig.email}`}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
