type Stat = { value: string; label: string };

/**
 * A row of headline numbers. `items` is a JSON string (MDX expressions are
 * blocked by next-mdx-remote/rsc). `note` names the sources or flags demo data.
 */
export function Stats({ items, note }: { items: string; note?: string }) {
  const stats = JSON.parse(items) as Stat[];
  return (
    <div className="not-prose my-10">
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-raised p-4">
            <p className="font-display text-2xl font-extrabold leading-none tracking-tight text-ink sm:text-3xl">{s.value}</p>
            <p className="mt-2 font-sans text-xs font-medium leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      {note && <p className="mt-2 font-sans text-[11px] font-medium leading-snug text-muted">{note}</p>}
    </div>
  );
}
