import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/**
 * Every homepage section (Projects, GitHub, Experience, Blog, ...) renders
 * through this wrapper so heading treatment and spacing stay identical
 * across the site instead of each section styling itself ad hoc.
 */
export function Section({ id, index, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-medium text-on-accent">
            {String(index).padStart(2, "0")}
          </span>
          <p className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-muted">
            {eyebrow}
          </p>
        </div>
        <h2 className="mt-3 text-balance font-display text-4xl italic md:text-5xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
