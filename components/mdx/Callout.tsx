import type { ReactNode } from "react";

export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="card-pop-flat my-8 p-5">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-accent">
        {label}
      </p>
      <div className="mt-2 text-ink">{children}</div>
    </div>
  );
}
