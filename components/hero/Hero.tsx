import { hero } from "@/content/hero";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
      <h1 className="text-balance font-display text-5xl leading-tight md:text-6xl">
        {hero.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{hero.positioning}</p>
      <a
        href={hero.cta.href}
        className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-surface transition-opacity hover:opacity-90"
      >
        {hero.cta.label}
      </a>
    </section>
  );
}
