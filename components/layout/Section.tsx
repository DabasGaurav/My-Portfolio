import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/**
 * Every homepage section (Projects, GitHub, Experience, Blog, ...) renders
 * through this wrapper so heading treatment and spacing stay identical
 * across the site instead of each section styling itself ad hoc.
 */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-balance font-display text-3xl md:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
