import type { ReactNode } from "react";

export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      className="relative my-10 px-8 py-8 font-display text-2xl italic leading-snug text-ink-on-alt not-italic"
      style={{
        background: "var(--surface-alt)",
        borderRadius: "var(--radius)",
        border: "2px solid var(--ink)",
        boxShadow: "6px 6px 0 0 var(--ink)",
      }}
    >
      <span aria-hidden="true" className="mb-2 block font-display text-5xl leading-none">
        &#8220;
      </span>
      {children}
    </blockquote>
  );
}
