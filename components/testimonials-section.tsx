import { Star } from "lucide-react";

import { RevealOnView } from "@/components/reveal-on-view";
import { SectionEyebrow } from "@/components/section-eyebrow";

type Item = { quote: string; author: string; context: string; rating: number };

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly Item[];
};

function Stars({ rating }: { rating: number }) {
  const filled = Math.min(5, Math.max(1, Math.round(rating)));
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${filled}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < filled
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-600"
          }`}
          strokeWidth={i < filled ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Item }) {
  return (
    <figure className="relative flex h-auto min-h-[220px] w-full shrink-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#0f172a] p-5 shadow-[0_14px_38px_-22px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(232,107,0,0.07)] sm:h-[250px] sm:w-[340px] sm:shrink-0 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_65%_at_100%_0%,rgba(232,107,0,0.13),transparent_62%)]"
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <Stars rating={item.rating} />
        <blockquote className="relative mt-3 min-h-0 flex-1">
          <p className="line-clamp-5 text-[15px] leading-snug text-slate-200 sm:text-[0.95rem] sm:leading-snug">
            <span className="font-semibold text-[#E86B00]">«</span>
            {item.quote}
            <span className="font-semibold text-[#E86B00]"> »</span>
          </p>
        </blockquote>
        <figcaption className="mt-auto border-t border-white/10 pt-3.5">
          <p className="text-sm font-bold leading-tight text-white">{item.author}</p>
          <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c2410c] sm:text-xs sm:tracking-[0.16em]">
            {item.context}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/** Carrousel infini (CSS) ; grille statique si `prefers-reduced-motion` */
export function TestimonialsSection({ eyebrow, title, lead, items }: Props) {
  return (
    <section
      id="avis"
      className="relative isolate scroll-mt-[5.75rem] border-b border-white/10 bg-gradient-to-b from-[#070b14] via-[#0a1020] to-[#070b14] py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <RevealOnView className="mb-4 text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2
            id="testimonials-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {lead}
          </p>
        </RevealOnView>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:hidden">
          {items.slice(0, 3).map((item) => (
            <div key={item.author} className="flex justify-center">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>

        <div className="mt-10 hidden grid-cols-2 gap-5 md:grid-cols-3 sm:motion-reduce:grid">
          {items.slice(0, 3).map((item) => (
            <div key={item.author} className="flex justify-center">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>

        <div className="relative mt-10 hidden sm:block motion-reduce:hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070b14] via-[#070b14]/90 to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070b14] via-[#070b14]/90 to-transparent sm:w-24"
            aria-hidden
          />

          <div className="ss-testimonial-wrap overflow-hidden py-2">
            <div className="ss-testimonial-track">
              {items.map((item) => (
                <TestimonialCard
                  key={`a-${item.author}-${item.quote.slice(0, 12)}`}
                  item={item}
                />
              ))}
              {items.map((item) => (
                <TestimonialCard
                  key={`b-${item.author}-${item.quote.slice(0, 12)}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
