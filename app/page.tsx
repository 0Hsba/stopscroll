import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  BarChart3,
  ChevronDown,
  ClipboardList,
  Clock,
  Copy,
  Lightbulb,
  Play,
  School,
  Target,
  Zap,
} from "lucide-react";
import { Fragment } from "react";
import { cookies } from "next/headers";

import { ContactForm } from "@/components/contact-form";
import { DemoSection } from "@/components/demo-section";
import { FlipGameCard } from "@/components/flip-game-card";
import { FaqSection } from "@/components/faq-section";
import { FloatingGameCards, FloatingSideCard } from "@/components/floating-game-cards";
import { HeroCtaButton } from "@/components/hero-cta-button";
import { HeroFormCursorCue } from "@/components/hero-form-cursor-cue";
import { InteractiveAwarenessPanel } from "@/components/interactive-awareness-panel";
import { JsonLd } from "@/components/json-ld";
import { RevealOnView } from "@/components/reveal-on-view";
import { VideoPlayer } from "@/components/video-player";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionIconBadge, iconStroke } from "@/components/section-icon-badge";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getDictionary } from "@/lib/dictionaries";
import { getPageSections } from "@/lib/page-sections";
import { parseLocale } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: { canonical: `${SITE_URL}/` },
  };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const dict = getDictionary(locale);
  const ps = getPageSections(locale);

  return (
    <div className="overflow-x-hidden">
      <JsonLd locale={locale} description={dict.meta.description} />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative isolate flex min-h-[min(88vh,860px)] flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0a1020] to-[#070b14]"
          aria-hidden
        />
        {/* Decorative orbs */}
        <div
          className="pointer-events-none absolute -left-24 top-20 h-[min(520px,60vw)] w-[min(520px,60vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,107,0,0.35),transparent_62%)] blur-3xl motion-safe:animate-orb"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[12%] -right-[8%] h-[min(500px,58vw)] w-[min(500px,58vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,107,0,0.32),transparent_62%)] blur-3xl motion-safe:animate-orb-delayed"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[62%] top-[28%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_70%)] blur-3xl"
          aria-hidden
        />

        <div className="bg-grid-ss pointer-events-none absolute inset-0 opacity-60 motion-reduce:opacity-40" />
        <div
          className="pointer-events-none absolute left-1/2 top-[38%] h-[340px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,107,0,0.13),transparent_70%)] blur-2xl"
          aria-hidden
        />

        <div className="relative z-10 flex w-full flex-1 flex-col justify-center px-4 py-16 sm:px-8 md:py-20 lg:py-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            {/* Eyebrow — style affiche, pas pill SaaS */}
            <p className="motion-safe:animate-fade-up font-[family-name:var(--font-lilita-one)] text-lg leading-none text-[#ffb074] motion-safe:-rotate-1 sm:text-xl">
              {dict.home.eyebrow}
            </p>

            <h1 className="motion-safe:animate-fade-up motion-safe:animation-delay-100 mt-5 max-w-4xl text-balance text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
              {dict.home.heroTitle}
            </h1>
            <p className="motion-safe:animate-fade-up motion-safe:animation-delay-200 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300 lg:text-xl">
              {dict.home.heroSubtitle}
            </p>

            <div className="motion-safe:animate-fade-up motion-safe:animation-delay-300 mt-10 flex w-full max-w-xl flex-col items-center gap-3 sm:gap-4">
              <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <HeroCtaButton label={dict.home.ctaAbout} targetId="a-propos" cursorCueAnchor />
                <HeroCtaButton label={dict.home.ctaGame} targetId="notre-jeu" variant="outline" />
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span>{dict.home.scrollHint}</span>
                <ChevronDown
                  className="motion-safe:animate-scroll-hint h-5 w-5 text-[#E86B00]"
                  strokeWidth={iconStroke}
                  aria-hidden
                />
              </div>
            </div>

            <nav
              aria-label={dict.home.heroStepsAriaLabel}
              className="motion-safe:animate-fade-up motion-safe:animation-delay-300 mt-10 w-full max-w-2xl sm:mt-11"
            >
              <div className="flex w-full max-w-lg flex-row items-start justify-between gap-1.5 text-[10px] leading-snug text-slate-200 sm:mx-auto sm:max-w-2xl sm:items-center sm:justify-center sm:gap-x-1 sm:gap-y-1 sm:text-[15px]">
                {dict.home.heroSteps.map((label, i) => (
                  <Fragment key={i}>
                    {i > 0 ? (
                      <span className="mt-[0.35rem] shrink-0 select-none text-[11px] leading-none text-slate-300 sm:mt-0 sm:px-0.5" aria-hidden>→</span>
                    ) : null}
                    <span className="flex min-w-0 flex-1 basis-0 flex-col items-center gap-0.5 text-center sm:inline-flex sm:flex-none sm:flex-row sm:items-baseline sm:gap-1.5 sm:text-left">
                      <span className="font-semibold tabular-nums text-[#E86B00]">{i + 1}.</span>
                      <span className="font-medium">{label}</span>
                    </span>
                  </Fragment>
                ))}
              </div>
            </nav>
          </div>
        </div>
        <FloatingGameCards cards={dict.home.heroCards} />
        <HeroFormCursorCue />
      </section>

      {/* ═══════════════════════════════ WHY SECTION ═══════════════════════ */}
      <section className="relative bg-section-cool py-16 sm:py-24">
        <FloatingSideCard side="left"  topPercent={20} floatClass="animate-card-3" slideDelay="0.15s" opacity={72} card={{ tag: "", ...ps.sideCards.why[0] }} />
        <FloatingSideCard side="right" topPercent={58} floatClass="animate-card-2" slideDelay="0.25s" opacity={72} card={{ tag: "", ...ps.sideCards.why[1] }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070b14] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b14] to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <RevealOnView className="mb-10 flex flex-col items-center gap-2 text-center sm:mb-12">
            <SectionEyebrow>{ps.why.eyebrow}</SectionEyebrow>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{ps.why.title}</h2>
          </RevealOnView>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:items-center lg:gap-12">
            {/* Video card */}
            <RevealOnView variant="slide-left" delayMs={60}>
              <div
                id="video-explicative"
                className="ss-glow-ring mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1325] to-[#0f172a] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] lg:mx-0"
              >
                <SectionEyebrow align="start" className="mb-1 text-sm sm:text-base">
                  {ps.why.videoLabel}
                </SectionEyebrow>
                <h3 className="mt-2 text-xl font-bold text-white">{ps.why.videoTitle}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{ps.why.videoLead}</p>
                <VideoPlayer cta={ps.why.videoCta} title={ps.why.videoTitle} />
              </div>
            </RevealOnView>

            {/* Info cards */}
            <div className="grid gap-5 lg:self-center">
              <RevealOnView variant="slide-right" delayMs={0}>
                <article className="group ss-glow-ring relative overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(232,107,0,0.18),transparent_65%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/40 to-transparent" />
                  <SectionIconBadge icon={Clock} size="lg" />
                  <h2 className="text-base font-extrabold tracking-tight text-white">{ps.why.problemTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{ps.why.problemBody}</p>
                </article>
              </RevealOnView>

              <RevealOnView variant="slide-right" delayMs={80}>
                <article className="group ss-glow-ring relative overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-[#0f172a] p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/60 to-transparent" />
                  <SectionIconBadge icon={BarChart3} size="lg" />
                  <h2 className="text-base font-extrabold tracking-tight text-white">{ps.why.statsTitle}</h2>
                  <ul className="mt-2 space-y-2 text-sm text-slate-400">
                    {ps.why.statsItems.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E86B00]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnView>

              <RevealOnView variant="slide-right" delayMs={160}>
                <article className="group ss-glow-ring relative overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-gradient-to-br from-[#0f172a] to-[#111827] p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#E86B00]/8 blur-xl" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/40 to-transparent" />
                  <SectionIconBadge icon={ArrowRight} size="lg" />
                  <h2 className="text-lg font-extrabold tracking-tight text-white">{ps.why.solutionTitle}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-300">{ps.why.solutionBody}</p>
                </article>
              </RevealOnView>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ ABOUT ═════════════════════════════ */}
      <section id="a-propos" className="relative scroll-mt-[5.75rem] bg-section-warm py-16 sm:py-24">
        <FloatingSideCard side="left"  topPercent={15} floatClass="animate-card-4" slideDelay="0.1s"  opacity={72} card={{ tag: "", ...ps.sideCards.about[0] }} />
        <FloatingSideCard side="right" topPercent={60} floatClass="animate-card-1" slideDelay="0.2s"  opacity={72} card={{ tag: "", ...ps.sideCards.about[1] }} />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <RevealOnView>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#E86B00]/15 bg-gradient-to-br from-[#0b1325] via-[#0f172a] to-[#0b1325] p-6 shadow-[0_32px_80px_-28px_rgba(0,0,0,0.6)] ring-1 ring-white/5 sm:p-10">
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,107,0,0.08),transparent_70%)] blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(232,107,0,0.06),transparent_70%)] blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/30 to-transparent" aria-hidden />

              <div className="flex flex-col gap-8">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-8">
                  <div>
                    <SectionEyebrow align="start">{ps.about.eyebrow}</SectionEyebrow>
                    <h2 className="mt-3 text-3xl font-extrabold text-white">{ps.about.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{ps.about.body}</p>
                  </div>

                  <aside className="rounded-2xl border border-[#E86B00]/15 bg-[#0a0f1e] p-5 ring-1 ring-white/[0.04] sm:p-6">
                    <div className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-[#E86B00]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E86B00]/15 text-[#E86B00]">
                        <ClipboardList className="h-3.5 w-3.5" strokeWidth={iconStroke} aria-hidden />
                      </span>
                      {ps.about.processTitle}
                    </div>
                    <ol className="space-y-2.5">
                      {ps.about.processSteps.map((step, i) => (
                        <li key={step} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E86B00]/10 text-xs font-bold text-[#E86B00] ring-1 ring-[#E86B00]/20">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-slate-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </aside>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="group rounded-2xl border border-white/10 bg-[#0f172a] p-4 ring-1 ring-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#E86B00]/30 hover:shadow-[0_14px_36px_-14px_rgba(232,107,0,0.25)]">
                    <SectionIconBadge icon={Target} size="md" className="mb-3" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{ps.about.goalsTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{ps.about.goalsBody}</p>
                  </article>
                  <article className="group rounded-2xl border border-white/10 bg-[#0f172a] p-4 ring-1 ring-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#E86B00]/30 hover:shadow-[0_14px_36px_-14px_rgba(232,107,0,0.25)]">
                    <SectionIconBadge icon={Zap} size="md" className="mb-3" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{ps.about.whyTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{ps.about.whyBody}</p>
                  </article>
                </div>

                <div className="rounded-2xl border border-dashed border-[#E86B00]/30 bg-[#111827] p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E86B00]">{ps.about.schoolsTitle}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "HEFP",                      src: "/logo-school/HEFP_Bild_Wortmarke_ohne_Name_farbig_positiv_FR.png", href: "https://www.hefp.swiss" },
                    { label: "CEFF Industrie",            src: "/logo-school/LogoINDUSTRIEtextecourtrvb.jpg",                       href: "https://www.ceff.ch" },
                    { label: "DIVTEC Porrentruy",         src: "/logo-school/CEJEFDivisiontechniquenew.jpg",                        href: "https://www.divtec.ch/" },
                    { label: "Lycée technique de Bienne", src: "/logo-school/Logo_TFS_blanc_bleu_neu%20_marge.png",                 href: "https://bbz-cfp.ch/fr/filieres-de-formation/lycee-technique" },
                  ].map((school) => (
                    <a
                      key={school.label}
                      href={school.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-white/15 bg-[#0f172a] p-3 ring-1 ring-white/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E86B00]/30 hover:ring-[#E86B00]/25"
                    >
                      <div className="relative flex h-14 items-center justify-center overflow-hidden rounded-lg bg-white">
                        <Image src={school.src} alt={school.label} fill className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 1024px) 45vw, 220px" />
                      </div>
                      <p className="mt-2 text-center text-xs font-semibold text-slate-300 group-hover:text-[#E86B00] transition-colors">{school.label}</p>
                    </a>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* ═══════════════════════════════ CARD GAME ═════════════════════════ */}
      <div className="relative">
        <FloatingSideCard side="left"  topPercent={28} floatClass="animate-card-1" slideDelay="0.18s" opacity={72} card={{ tag: "", ...ps.sideCards.game[0] }} />
        <FloatingSideCard side="right" topPercent={62} floatClass="animate-card-3" slideDelay="0.28s" opacity={72} card={{ tag: "", ...ps.sideCards.game[1] }} />
      <section id="notre-jeu" className="relative scroll-mt-[5.75rem] overflow-hidden bg-section-warm py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,107,0,0.06),transparent_65%)] blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <RevealOnView className="mb-10 flex flex-col gap-2 sm:mb-12">
            <SectionEyebrow align="start">{ps.game.eyebrow}</SectionEyebrow>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{ps.game.title}</h2>
            <p className="max-w-2xl text-base text-slate-400">{ps.game.lead}</p>
          </RevealOnView>

          {/* Cartes exemple avec flip 3D */}
          <RevealOnView variant="fade-up" delayMs={60} className="mb-8">
            <SectionEyebrow align="start" className="mb-5 text-sm">
              {ps.game.exampleCardsTitle}
            </SectionEyebrow>
            <div className="flex gap-4 overflow-x-auto pb-2 sm:justify-center sm:overflow-x-visible">
              {ps.game.exampleCards.map((card) => (
                <FlipGameCard key={card.text} text={card.text} category={card.category} />
              ))}
            </div>
          </RevealOnView>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <RevealOnView variant="slide-left" delayMs={60}>
              <article className="ss-glow-ring relative overflow-hidden rounded-3xl border border-[#E86B00]/20 bg-gradient-to-br from-[#111827] to-[#0f172a] p-6 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/50 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(232,107,0,0.12),transparent_65%)]" />

                <h3 className="text-lg font-bold text-white">{ps.game.howTitle}</h3>
                <ol className="mt-5 space-y-3">
                  {[
                    { num: "1", text: ps.game.step1 },
                    { num: "2", text: ps.game.step2 },
                    { num: "3", text: ps.game.step3 },
                  ].map((step) => (
                    <li key={step.num} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E86B00]/15 text-xs font-bold text-[#E86B00] ring-1 ring-[#E86B00]/25">{step.num}</span>
                      <span className="text-sm leading-relaxed text-slate-300">{step.text}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {[ps.game.pill1, ps.game.pill2, ps.game.pill3].map((pill) => (
                    <div key={pill} className="flex items-center justify-center rounded-xl border border-[#E86B00]/15 bg-[#0a0f1e] px-3 py-2.5 text-center text-xs font-semibold text-[#ffbf8b] ring-1 ring-white/[0.03] transition-colors hover:border-[#E86B00]/30">
                      {pill}
                    </div>
                  ))}
                </div>
              </article>
            </RevealOnView>

            <div className="grid gap-5">
              <RevealOnView variant="slide-right" delayMs={0}>
                <article className="group ss-glow-ring relative overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-[#0f172a] p-5 ring-1 ring-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mb-3 flex items-center gap-2">
                    <SectionIconBadge icon={Copy} size="sm" />
                    <h3 className="font-bold text-white">{ps.game.infoTitle}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { v: "3+",    label: ps.game.playersLabel },
                      { v: "20–45", label: ps.game.minutesLabel },
                      { v: "15+",   label: ps.game.yearsLabel },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-white/8 bg-[#0a0f1e] py-2.5 transition-colors hover:border-[#E86B00]/20">
                        <p className="text-lg font-extrabold text-[#E86B00]">{stat.v}</p>
                        <p className="text-[10px] font-medium text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{ps.game.goalBody}</p>
                </article>
              </RevealOnView>

              <RevealOnView variant="slide-right" delayMs={80}>
                <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#0a0f1e] p-5 ring-1 ring-white/[0.04]">
                  <div className="mb-3 flex items-center gap-2">
                    <SectionIconBadge icon={School} size="sm" iconClassName="text-[#ffb074]" />
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#ffb074]">{ps.game.formatTitle}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {[ps.game.formatItem1, ps.game.formatItem2, ps.game.formatItem3].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-1 w-3 shrink-0 rounded-full bg-[#E86B00]/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnView>
            </div>
          </div>
        </div>
      </section>
      </div>{/* fin wrapper card game */}

      {/* ═══════════════════════════════ DEMO ══════════════════════════════ */}
      <div className="relative">
        <FloatingSideCard side="left"  topPercent={30} floatClass="animate-card-2" slideDelay="0.12s" opacity={70} card={{ tag: "", ...ps.sideCards.demo[0] }} />
        <FloatingSideCard side="right" topPercent={58} floatClass="animate-card-4" slideDelay="0.22s" opacity={70} card={{ tag: "", ...ps.sideCards.demo[1] }} />
        <DemoSection ps={ps.demo} />
      </div>

      {/* ═══════════════════════════════ TESTIMONIALS ══════════════════════ */}
      <div className="relative">
        <FloatingSideCard side="left"  topPercent={32} floatClass="animate-card-3" slideDelay="0.1s"  opacity={70} card={{ tag: "", ...ps.sideCards.testimonials[0] }} />
        <FloatingSideCard side="right" topPercent={55} floatClass="animate-card-1" slideDelay="0.2s"  opacity={70} card={{ tag: "", ...ps.sideCards.testimonials[1] }} />
        <TestimonialsSection
          eyebrow={dict.home.testimonialsEyebrow}
          title={dict.home.testimonialsTitle}
          lead={dict.home.testimonialsLead}
          items={dict.home.testimonials}
        />
      </div>

      {/* ═══════════════════════════════ PREVENTION ════════════════════════ */}
      <section id="prevention" className="relative scroll-mt-[5.75rem] bg-section-amber py-16 sm:py-24">
        <FloatingSideCard side="left"  topPercent={18} floatClass="animate-card-2" slideDelay="0.12s" opacity={72} card={{ tag: "", ...ps.sideCards.prevention[0] }} />
        <FloatingSideCard side="right" topPercent={52} floatClass="animate-card-3" slideDelay="0.22s" opacity={72} card={{ tag: "", ...ps.sideCards.prevention[1] }} />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <RevealOnView className="mb-10 flex flex-col gap-2 sm:mb-12">
            <SectionEyebrow align="start">{ps.prevention.eyebrow}</SectionEyebrow>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{ps.prevention.title}</h2>
            <p className="max-w-2xl text-base text-slate-400">{ps.prevention.lead}</p>
          </RevealOnView>

          <div className="grid gap-5 lg:grid-cols-3">
            <RevealOnView variant="fade-up" delayMs={0}>
              <article className="group ss-glow-ring relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#111827] p-6 ring-1 ring-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/30 to-transparent" />
                <SectionIconBadge icon={Lightbulb} size="xl" className="mb-4" />
                <h3 className="font-bold text-white">{ps.prevention.keyTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{ps.prevention.keyBody}</p>
                <div className="mt-4 rounded-xl border border-[#E86B00]/15 bg-[#0a0f1e] p-3 text-xs leading-relaxed text-slate-400">{ps.prevention.keyTip}</div>
              </article>
            </RevealOnView>

            <RevealOnView variant="fade-up" delayMs={80}>
              <article className="group ss-glow-ring relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#111827] p-6 ring-1 ring-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/30 to-transparent" />
                <SectionIconBadge icon={Ban} size="xl" className="mb-4" />
                <h3 className="font-bold text-white">{ps.prevention.tipsTitle}</h3>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {ps.prevention.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E86B00]" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealOnView>

            <RevealOnView variant="fade-up" delayMs={160}>
              <article className="group ss-glow-ring relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#111827] p-6 ring-1 ring-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/30 to-transparent" />
                <SectionIconBadge icon={AlertTriangle} size="xl" className="mb-4" />
                <h3 className="font-bold text-white">{ps.prevention.warningsTitle}</h3>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {ps.prevention.warnings.map((sign) => (
                    <li key={sign} className="flex items-start gap-2.5 text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {sign}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl border border-[#E86B00]/20 bg-[#E86B00]/5 px-4 py-3 text-xs leading-relaxed text-[#ffbf8b]">
                  {ps.prevention.warningNote}
                </div>
              </article>
            </RevealOnView>
          </div>

          <RevealOnView delayMs={100}>
            <InteractiveAwarenessPanel locale={locale} />
          </RevealOnView>
        </div>
      </section>

      {/* ═══════════════════════════════ FAQ ═══════════════════════════════ */}
      <div className="relative">
        <FloatingSideCard side="left"  topPercent={25} floatClass="animate-card-4" slideDelay="0.1s"  opacity={70} card={{ tag: "", ...ps.sideCards.faq[0] }} />
        <FloatingSideCard side="right" topPercent={60} floatClass="animate-card-2" slideDelay="0.2s"  opacity={70} card={{ tag: "", ...ps.sideCards.faq[1] }} />
        <FaqSection
          eyebrow={dict.home.faqEyebrow}
          title={dict.home.faqTitle}
          lead={dict.home.faqLead}
          items={dict.home.faqItems}
        />
      </div>

      {/* ═══════════════════════════════ CONTACT ═══════════════════════════ */}
      <section id="contact" className="relative scroll-mt-[5.75rem] bg-section-premium py-16 sm:py-24">
        <FloatingSideCard side="left"  topPercent={28} floatClass="animate-card-1" slideDelay="0.1s"  opacity={68} card={{ tag: "", ...ps.sideCards.contact[0] }} />
        <FloatingSideCard side="right" topPercent={58} floatClass="animate-card-4" slideDelay="0.2s"  opacity={68} card={{ tag: "", ...ps.sideCards.contact[1] }} />
        <div className="mx-auto max-w-2xl px-4 sm:px-8">
          <RevealOnView className="mb-8 text-center">
            <SectionEyebrow className="mb-1">{ps.contact.eyebrow}</SectionEyebrow>
            <h2 className="text-3xl font-extrabold text-white">{ps.contact.title}</h2>
            <p className="mt-2 text-slate-400">{ps.contact.lead}</p>
          </RevealOnView>

          <RevealOnView variant="scale" delayMs={60}>
            <div className="ss-glow-ring relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1325] to-[#0f172a] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/5 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86B00]/40 to-transparent" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(232,107,0,0.07),transparent_70%)] blur-2xl" />
              <ContactForm labels={ps.contact} />
            </div>
          </RevealOnView>
        </div>
      </section>
    </div>
  );
}
