import type { Teardown } from "@/types/teardown";

export function TeardownsGrid({ teardowns }: { teardowns: Teardown[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {teardowns.map((t) => {
        const card = (
          <div
            className={
              t.placeholder
                ? "card-pop-flat border-dashed p-5 opacity-70"
                : "card-pop p-5"
            }
          >
            <h3 className="font-display text-lg font-bold">{t.product}</h3>
            <p className="mt-1 font-sans text-sm text-muted">
              {t.category} &middot; {t.year}
            </p>
          </div>
        );
        return t.url ? (
          <a key={t.product} href={t.url}>
            {card}
          </a>
        ) : (
          <div key={t.product}>{card}</div>
        );
      })}
    </div>
  );
}
