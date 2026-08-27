import type { Certification } from "@/types/certification";

export function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certifications.map((cert) => {
        const card = (
          <div
            className={
              cert.placeholder
                ? "card-pop-flat border-dashed p-5 opacity-70"
                : "card-pop p-5"
            }
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg italic">{cert.name}</h3>
              {cert.placeholder && (
                <span className="shrink-0 rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                  Placeholder
                </span>
              )}
            </div>
            <p className="mt-1 font-sans text-sm font-medium text-muted">
              {cert.issuer} &middot; {cert.year}
            </p>
          </div>
        );

        return cert.url ? (
          <a key={cert.name} href={cert.url} target="_blank" rel="noreferrer">
            {card}
          </a>
        ) : (
          <div key={cert.name}>{card}</div>
        );
      })}
    </div>
  );
}
