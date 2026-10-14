/**
 * A simple comparison table. MDX here has no GFM tables, so rows come in as a
 * JSON string: { "head": [...], "rows": [[...], ...] }. Cells may use **bold**.
 */
function cell(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function DataTable({ data, caption }: { data: string; caption?: string }) {
  const { head, rows } = JSON.parse(data) as { head: string[]; rows: string[][] };
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto border border-hairline">
        <table className="w-full border-collapse font-sans text-sm">
          <thead className="bg-surface-sunken">
            <tr>
              {head.map((h) => (
                <th key={h} className="border-b border-hairline px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.06em] text-ink">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="align-top">
                {r.map((c, j) => (
                  <td key={j} className={`border-b border-hairline px-3 py-2 leading-snug ${j === 0 ? "font-medium text-ink" : "text-muted"}`}>{cell(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-2 font-sans text-xs font-medium text-muted">{caption}</figcaption>}
    </figure>
  );
}
