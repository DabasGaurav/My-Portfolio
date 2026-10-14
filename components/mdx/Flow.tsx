type Step = { title: string; body?: string; tone?: "accent" | "warn" | "plain" };

/**
 * A left-to-right (stacked on mobile) chain of steps joined by arrows, for
 * money flows and system pipelines. `steps` is a JSON string.
 */
export function Flow({ steps, caption }: { steps: string; caption?: string }) {
  const items = JSON.parse(steps) as Step[];
  const tone = (t?: Step["tone"]) =>
    t === "accent" ? "border-accent bg-surface-raised" : t === "warn" ? "border-accent-2 bg-surface-raised" : "border-hairline bg-surface-raised";
  return (
    <figure className="not-prose my-10">
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {items.map((s, i) => (
          <li key={s.title} className="flex flex-col sm:flex-1 sm:flex-row sm:items-center">
            <div className={`h-full flex-1 border-2 p-3 ${tone(s.tone)}`}>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-sm font-bold leading-tight text-ink">{s.title}</p>
              {s.body && <p className="mt-1 font-sans text-xs leading-snug text-muted">{s.body}</p>}
            </div>
            {i < items.length - 1 && (
              <span aria-hidden="true" className="self-center px-1 py-1 font-display text-lg text-accent-2 sm:py-0">
                <span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-2 font-sans text-xs font-medium text-muted">{caption}</figcaption>}
    </figure>
  );
}
