import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="work-section scroll-mt-20">
      <div className="work-section-inner">
        <div className="work-section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
