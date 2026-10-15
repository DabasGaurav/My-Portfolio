"use client";

import { useEffect, useState } from "react";

export type CaseStudySection = { id: string; label: string };

const defaultSections: CaseStudySection[] = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "decisions", label: "Product choices" },
  { id: "next", label: "Next test" },
];

export function CaseStudyNav({ sections = defaultSections }: { sections?: CaseStudySection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "problem");

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const section of sections) {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= threshold) current = section.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [sections]);

  return (
    <nav className="case-study-nav" aria-label="Case study sections">
      <div>
        {sections.map((section) => <a key={section.id} href={`#${section.id}`} onClick={() => setActive(section.id)} aria-current={active === section.id ? "location" : undefined}>{section.label}</a>)}
      </div>
    </nav>
  );
}
