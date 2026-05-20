import { ChevronDown } from "lucide-react";

import { RevealOnView } from "@/components/reveal-on-view";
import { iconStroke } from "@/components/section-icon-badge";
import { SectionEyebrow } from "@/components/section-eyebrow";

type FaqItem = Readonly<{ q: string; a: string }>;

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly FaqItem[];
};

function Chevron() {
  return <ChevronDown className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />;
}

/** FAQ accordéons natifs ; id pour ancre pied de page / deep links */
export function FaqSection({ eyebrow, title, lead, items }: Props) {
  return (
    <section
      id="faq"
      className="scroll-mt-[5.75rem] border-b border-white/10 bg-[#070b14] py-16 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <RevealOnView className="mb-10 text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2
            id="faq-heading"
            className="mt-3 text-2xl font-extrabold text-white sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-300">
            {lead}
          </p>
        </RevealOnView>

        <RevealOnView delayMs={70} className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-[#0f172a] shadow-[0_10px_32px_-18px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.04] open:bg-[#111827] open:shadow-[0_16px_40px_-20px_rgba(232,107,0,0.2)] motion-reduce:open:shadow-md"
              name="faq-ss"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-[1.125rem] text-left sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 pt-px text-[15px] font-bold leading-snug text-white sm:text-base">
                  {item.q}
                </span>
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E86B00]/10 text-[#E86B00] transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.34,1.36,0.64,1)] group-open:rotate-180 motion-reduce:transition-none">
                  <Chevron />
                </span>
              </summary>
              <div className="border-t border-white/10 px-5 pb-[1.125rem] pt-0 text-[15px] leading-relaxed text-slate-300 sm:px-6 sm:pb-6">
                <p className="pt-4">{item.a}</p>
              </div>
            </details>
          ))}
        </RevealOnView>
      </div>
    </section>
  );
}


