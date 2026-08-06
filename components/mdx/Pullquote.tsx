import type { ReactNode } from "react";

export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-accent pl-6 font-display text-2xl leading-snug text-ink not-italic">
      {children}
    </blockquote>
  );
}
