import type { ReactNode } from "react";

export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 border border-hairline p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
        {label}
      </p>
      <div className="mt-2 text-ink">{children}</div>
    </div>
  );
}
