import type { ReactNode } from "react";

export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative my-10 pl-2 font-display text-2xl leading-snug text-ink not-italic">
      <span
        aria-hidden="true"
        className="absolute -top-6 -left-1 font-display text-6xl text-accent/25 select-none"
      >
        &#8220;
      </span>
      <span className="relative">{children}</span>
    </blockquote>
  );
}
