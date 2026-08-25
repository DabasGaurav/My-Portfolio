type ChartDatum = {
  label: string;
  value: number;
};

/**
 * A single-series bar chart for illustrating a post's data. Follows the
 * dataviz skill's mark spec (capped bar thickness, 4px rounded data-end,
 * hairline baseline, sparing direct labels). Uses the site's brand accent
 * as the single series color (contrast-checked at >=5:1 in both themes) —
 * lib/palette.ts's validated categorical set is for genuine multi-series
 * charts, which this isn't.
 *
 * Single series only, so no legend box is needed — the title names it.
 * `note` should flag synthetic/demo data per the site's honest-data rule.
 *
 * `data` accepts a JSON string (the reliable path from MDX — array/object
 * JSX attribute expressions don't survive next-mdx-remote/rsc's compile
 * step) or a real array when used from a normal .tsx file.
 */
export function Chart({
  title,
  data,
  unit = "",
  note,
}: {
  title: string;
  data: string | ChartDatum[];
  unit?: string;
  note?: string;
}) {
  const parsed: ChartDatum[] = typeof data === "string" ? JSON.parse(data) : data;
  const width = 640;
  const height = 280;
  const padding = { top: 24, right: 16, bottom: 32, left: 16 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...parsed.map((d) => d.value), 1);
  const slotWidth = plotWidth / parsed.length;
  const barWidth = Math.min(24, slotWidth * 0.5);

  return (
    <figure className="card-pop-flat my-8 p-6">
      <style>{`
        .chart-series { fill: var(--accent); }
      `}</style>
      <figcaption className="font-sans text-sm font-semibold text-muted">
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 w-full"
        role="img"
        aria-label={title}
      >
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          className="stroke-hairline"
          strokeWidth={1}
        />
        {parsed.map((d, i) => {
          const barHeight = (d.value / maxValue) * plotHeight;
          const x = padding.left + i * slotWidth + (slotWidth - barWidth) / 2;
          const y = height - padding.bottom - barHeight;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 1)}
                rx={4}
                className="chart-series"
              />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-ink font-mono text-[10px] tabular-nums"
              >
                {d.value}
                {unit}
              </text>
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 18}
                textAnchor="middle"
                className="fill-muted font-sans text-[10px] font-medium"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {note && (
        <p className="mt-2 font-sans text-xs font-medium text-muted">{note}</p>
      )}
    </figure>
  );
}
