import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** Trailing substring of `title` to render as the gradient highlight — must match the end of `title` exactly. */
  highlight: string;
  description?: string;
  children: ReactNode;
};

/**
 * Every homepage section renders through this wrapper so heading
 * treatment and spacing stay identical site-wide: a plain eyebrow label,
 * an H2 with its trailing phrase gradient-highlighted, an optional
 * one-line description, then content.
 */
export function Section({ id, eyebrow, title, highlight, description, children }: SectionProps) {
  const prefix = title.endsWith(highlight) ? title.slice(0, -highlight.length) : title;

  return (
    <section id={id} className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="font-sans text-sm text-muted">{eyebrow}</p>
        <h2 className="mt-1 text-balance font-display text-3xl font-bold md:text-4xl">
          {prefix}
          <span className="heading-highlight">{highlight}</span>
        </h2>
        {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
