import type { TimelineEntry } from "@/types/experience";
import { socialConfig } from "@/config/social.config";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const isb = entries.find((entry) => entry.org === "Indian School of Business");
  const pm = entries.find((entry) => entry.org === "ION" && entry.role === "Product Manager");
  const engineer = entries.find((entry) => entry.org === "ION" && entry.role === "Software Engineer");

  return (
    <div className="card-pop-flat overflow-hidden">
      {pm && <div className="flex flex-wrap justify-between gap-2 border-b border-hairline px-5 py-4">
        <div><p className="font-display font-bold">Product Manager</p><p className="text-sm text-muted">ION</p></div>
        <span className="font-sans text-xs text-muted">{pm.period}</span>
      </div>}
      {engineer && <div className="flex flex-wrap justify-between gap-2 border-b border-hairline px-5 py-4">
        <div><p className="font-display font-bold">Software Engineer</p><p className="text-sm text-muted">ION</p></div>
        <span className="font-sans text-xs text-muted">{engineer.period}</span>
      </div>}
      {isb && <div className="flex flex-wrap justify-between gap-2 px-5 py-4">
        <div><p className="font-display font-bold">PGP</p><p className="text-sm text-muted">Indian School of Business</p></div>
        <span className="font-sans text-xs text-muted">{isb.period}</span>
      </div>}
      <a href={socialConfig.linkedin.url} target="_blank" rel="noreferrer" className="block border-t border-hairline px-5 py-3 font-sans text-sm font-semibold text-accent hover:bg-surface-sunken">
        Full background on LinkedIn ↗
      </a>
    </div>
  );
}
