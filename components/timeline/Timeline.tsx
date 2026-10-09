import type { TimelineEntry } from "@/types/experience";
import { socialConfig } from "@/config/social.config";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const isb = entries.find((entry) => entry.org === "Indian School of Business");
  const pm = entries.find((entry) => entry.org === "ION" && entry.role === "Product Manager");
  const engineer = entries.find((entry) => entry.org === "ION" && entry.role === "Software Engineer");
  const dtu = entries.find((entry) => entry.org.includes("Delhi College of Engineering"));
  const rows = [
    isb && { role: "PGP", org: "Indian School of Business", period: isb.period },
    pm && { role: "Product Manager", org: "ION", period: pm.period },
    engineer && { role: "Software Engineer", org: "ION", period: engineer.period },
    dtu && { role: "B.Tech, Computer Science", org: "Delhi Technological University", period: dtu.period },
  ].filter((row): row is { role: string; org: string; period: string } => Boolean(row));

  return (
    <div className="timeline-list">
      {rows.map((row) => (
        <div key={row.role} className="timeline-row">
          <div><strong>{row.role}</strong><span>{row.org}</span></div>
          <time>{row.period}</time>
        </div>
      ))}
      <a className="timeline-link" href={socialConfig.linkedin.url} target="_blank" rel="noreferrer">More on LinkedIn ↗</a>
    </div>
  );
}
