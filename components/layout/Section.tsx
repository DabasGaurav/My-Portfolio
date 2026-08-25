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
 * across the site instead of each section styling itself ad hoc. The
 * numeral in the margin (desktop only) is the one place sections are
 * allowed to look different from each other — it breaks the otherwise
 * identical rhythm without touching the content column.
 */
export function Section({ id, index, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="relative scroll-mt-20 border-t border-hairline">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-24 hidden font-mono text-sm text-muted/40 lg:block lg:left-[calc(50%-27rem)]"
      >
        {String(index).padStart(2, "0")}
      </span>
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
