import { hero } from "@/content/hero";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
        <div>
          <span className="animate-rise-in inline-block rounded-full border-2 border-ink px-4 py-1.5 font-sans text-sm font-medium">
            Shipping this site in public
          </span>

          <h1 className="animate-rise-in mt-6 text-balance font-display text-5xl leading-[1.05] md:text-7xl [animation-delay:100ms]">
            {hero.name.split(" ")[0]}{" "}
            <span className="italic">{hero.name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="animate-rise-in mt-5 max-w-md text-lg text-muted [animation-delay:200ms]">
            {hero.positioning}
          </p>

          <OpenChatButton className="card-pop animate-rise-in mt-8 inline-block bg-accent px-7 py-3.5 font-sans text-base font-semibold text-white [animation-delay:300ms]">
            {hero.cta.label}
          </OpenChatButton>
        </div>

        <div
          className="animate-rise-in mx-auto flex aspect-square w-full max-w-64 items-center justify-center bg-surface-alt md:max-w-none [animation-delay:150ms]"
          style={{
            borderRadius: "var(--radius)",
            border: "2px solid var(--ink)",
            boxShadow: "8px 8px 0 0 var(--ink)",
          }}
        >
          <span className="font-display text-8xl italic text-ink-on-alt">
            {hero.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
        </div>
      </div>
    </section>
  );
}
