import type { ReactNode } from "react";

export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="card-pop-flat relative my-10 px-8 py-8 font-display text-2xl font-bold leading-snug text-ink">
      <span
        aria-hidden="true"
        className="mb-2 block font-display text-5xl leading-none text-accent-2"
      >
        &#8220;
      </span>
      {children}
    </blockquote>
  );
}
