"use client";

import Image from "next/image";
import type { Certification } from "@/types/certification";
import { haptic } from "@/lib/haptics";

export function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certifications.map((cert) => (
        <div
          key={cert.name}
          className={
            cert.placeholder
              ? "card-pop-flat border-dashed p-5 opacity-70"
              : "card-pop group p-5 transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
          }
        >
          <div className="flex items-start gap-3">
            {cert.image && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-raised p-1.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={cert.image}
                  alt={`${cert.issuer} logo`}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold">{cert.name}</h3>
                {cert.placeholder && (
                  <span className="shrink-0 rounded-full bg-hairline px-2.5 py-1 font-sans text-[11px] font-medium text-muted">
                    Placeholder
                  </span>
                )}
              </div>
              <p className="mt-1 font-sans text-sm font-medium text-muted">
                {cert.issuer} &middot; {cert.year}
              </p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => haptic("tap")}
                  className="mt-3 inline-flex items-center gap-1 font-sans text-sm font-semibold text-accent transition-opacity hover:opacity-80 active:scale-95"
                >
                  Open certificate to verify
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M6 3h7v7M13 3 3 13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
