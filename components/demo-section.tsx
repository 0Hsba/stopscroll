import type { ReactNode } from "react";
import {
  Brain,
  Crown,
  GraduationCap,
  Megaphone,
  PenLine,
  Smile,
  Zap,
} from "lucide-react";

import { RevealOnView } from "@/components/reveal-on-view";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { iconStroke } from "@/components/section-icon-badge";
import type { PageSections } from "@/lib/page-sections";

const phaseIconClass = "h-6 w-6";
const featIconClass = "h-5 w-5";

type Props = {
  ps: PageSections["demo"];
};

function PhaseCard({
  step,
  icon,
  num,
  title,
  body,
  delayMs,
}: {
  step: string;
  icon: ReactNode;
  num: string;
  title: string;
  body: string;
  delayMs: number;
}) {
  return (
    <RevealOnView variant="fade-up" delayMs={delayMs} className="h-full">
      <article className="ss-mock-card ss-noise relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/50 to-transparent" />
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(232,107,0,0.18),transparent_70%)] blur-lg" />
        <p className="mb-4 text-xs font-semibold text-[#E86B00]/75">{step}</p>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E86B00]/12 text-[#E86B00] ring-1 ring-[#E86B00]/20">
            {icon}
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E86B00] text-[10px] font-black text-white">
              {num}
            </span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-white">{title}</h3>
        </div>
        <p className="mt-auto text-sm leading-relaxed text-slate-400">{body}</p>
        <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-[#E86B00] to-[#f59e0b] opacity-60" />
      </article>
    </RevealOnView>
  );
}

function StatBadge({ value, label, delayMs }: { value: string; label: string; delayMs: number }) {
  return (
    <RevealOnView variant="scale" delayMs={delayMs}>
      <div className="ss-stat-badge flex flex-col items-center px-5 py-4 text-center">
        <span className="text-2xl font-black text-[#E86B00] sm:text-3xl">{value}</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </span>
      </div>
    </RevealOnView>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  delayMs,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  delayMs: number;
}) {
  return (
    <RevealOnView variant="fade-up" delayMs={delayMs} className="h-full">
      <article className="ss-feat-card group relative flex h-full flex-col overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/30 to-transparent" />
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#E86B00]/6 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#E86B00]/12" />
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E86B00]/10 text-[#E86B00] ring-1 ring-[#E86B00]/18 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h4 className="font-extrabold tracking-tight text-white">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
      </article>
    </RevealOnView>
  );
}

export function DemoSection({ ps }: Props) {
  return (
    <section
      id="demo"
      className="relative scroll-mt-[5.75rem] overflow-hidden bg-section-premium py-16 sm:py-24"
      aria-labelledby="demo-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(232,107,0,0.07),transparent_65%)] blur-3xl"
        aria-hidden={true}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(232,107,0,0.05),transparent_70%)] blur-3xl"
        aria-hidden={true}
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04),transparent_70%)] blur-3xl"
        aria-hidden={true}
      />
      <div className="ss-section-divider pointer-events-none absolute inset-x-0 top-0" aria-hidden={true} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <RevealOnView className="mb-10 flex flex-col items-center text-center gap-3 sm:mb-12">
          <SectionEyebrow>{ps.eyebrow}</SectionEyebrow>
          <h2
            id="demo-heading"
            className="max-w-2xl text-balance text-3xl font-extrabold text-white sm:text-4xl"
          >
            {ps.title}
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-slate-400">
            {ps.lead}
          </p>
        </RevealOnView>

        <div className="grid gap-5 sm:grid-cols-3">
          <PhaseCard step={ps.phase1.step} icon={<Megaphone className={phaseIconClass} strokeWidth={iconStroke} aria-hidden />} num="1" title={ps.phase1.title} body={ps.phase1.body} delayMs={0}   />
          <PhaseCard step={ps.phase2.step} icon={<PenLine className={phaseIconClass} strokeWidth={iconStroke} aria-hidden />} num="2" title={ps.phase2.title} body={ps.phase2.body} delayMs={80}  />
          <PhaseCard step={ps.phase3.step} icon={<Crown className={phaseIconClass} strokeWidth={iconStroke} aria-hidden />} num="3" title={ps.phase3.title} body={ps.phase3.body} delayMs={160} />
        </div>

        <RevealOnView variant="fade" delayMs={200} className="my-8 sm:my-10">
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b1325]/60 p-1 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              <StatBadge value="3+"    label={ps.stat1Label} delayMs={240} />
              <StatBadge value="20-45" label={ps.stat2Label} delayMs={290} />
              <StatBadge value="15+"   label={ps.stat3Label} delayMs={340} />
              <StatBadge value="3"     label={ps.stat4Label} delayMs={390} />
            </div>
          </div>
        </RevealOnView>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<GraduationCap className={featIconClass} strokeWidth={iconStroke} aria-hidden />} title={ps.feat1Title} body={ps.feat1Body} delayMs={0}   />
          <FeatureCard icon={<Smile className={featIconClass} strokeWidth={iconStroke} aria-hidden />} title={ps.feat2Title} body={ps.feat2Body} delayMs={60}  />
          <FeatureCard icon={<Brain className={featIconClass} strokeWidth={iconStroke} aria-hidden />} title={ps.feat3Title} body={ps.feat3Body} delayMs={120} />
          <FeatureCard icon={<Zap className={featIconClass} strokeWidth={iconStroke} aria-hidden />} title={ps.feat4Title} body={ps.feat4Body} delayMs={180} />
        </div>
      </div>

      <div className="ss-section-divider pointer-events-none absolute inset-x-0 bottom-0" aria-hidden={true} />
    </section>
  );
}
