"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HeroCardsDict = {
  topLeft:     { tag: string; text: string; sub: string };
  bottomLeft:  { tag: string; text: string; sub: string };
  topRight:    { tag: string; text: string; sub: string };
  bottomRight: { tag: string; text: string; sub: string };
  mobilePost:  { tag: string; text: string; sub: string };
  mobileReply: { tag: string; text: string; sub: string };
};

export type CardData = {
  tag:  string;
  text: string;
  sub:  string;
};

type FloatAnim = "animate-card-1" | "animate-card-2" | "animate-card-3" | "animate-card-4";

/** Classes statiques (obligatoire pour que Tailwind les génère). */
const FLOAT_CLASS: Record<FloatAnim, string> = {
  "animate-card-1": "motion-safe:animate-card-1",
  "animate-card-2": "motion-safe:animate-card-2",
  "animate-card-3": "motion-safe:animate-card-3",
  "animate-card-4": "motion-safe:animate-card-4",
};

function floatAnimClass(floatClass: string, visible: boolean): string {
  if (!visible) return "";
  return FLOAT_CLASS[floatClass as FloatAnim] ?? FLOAT_CLASS["animate-card-1"];
}

function getEdgeTransform(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement): string {
  const rect = el.getBoundingClientRect();
  const nx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
  const ny = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
  if (Math.abs(nx) >= Math.abs(ny)) return nx > 0 ? "rotateY(180deg)" : "rotateY(-180deg)";
  return ny > 0 ? "rotateX(180deg)" : "rotateX(-180deg)";
}

export function GameCard({ text, sub }: CardData) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flip, setFlip]       = useState("");
  const [backPre, setBackPre] = useState("rotateY(180deg)");

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const t = getEdgeTransform(e, cardRef.current);
    setBackPre(t);
    setFlip(t);
  }

  return (
    <div
      ref={cardRef}
      className="ss-game-card w-[150px] h-[224px] shrink-0 cursor-pointer [perspective:900px]"
      tabIndex={0}
      role="button"
      aria-label={text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setFlip("")}
      onFocus={() => { setBackPre("rotateY(180deg)"); setFlip("rotateY(180deg)"); }}
      onBlur={() => setFlip("")}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
        style={{ transform: flip }}
      >
        {/* Face visible par défaut — dos de carte (comme section Notre jeu) */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.4rem] shadow-[0_16px_48px_-10px_rgba(0,0,0,0.75)] [backface-visibility:hidden]">
          <Image src="/card-back.png" alt="Stop Scroll" fill className="object-cover" sizes="150px" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/20" />
        </div>

        {/* Contenu révélé au survol */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.4rem] shadow-[0_16px_48px_-10px_rgba(0,0,0,0.75)] [backface-visibility:hidden]"
          style={{ transform: backPre }}
        >
          <div className="ss-game-card-bg absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 32%, #d96a2a 0%, #9c2800 100%)" }} />
          <div className="absolute inset-0 opacity-80" style={{ background: "repeating-conic-gradient(from 0deg at 50% 42%, rgba(255,255,255,0.065) 0deg 9deg, transparent 9deg 18deg)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 42%, transparent 0%, rgba(160,35,0,0.55) 100%)" }} />
          <div className="pointer-events-none absolute -left-6 -top-6 h-36 w-36 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)" }} />
          <div className="relative flex h-full flex-col items-center justify-center px-4 pb-10 pt-6">
            <p className="ss-game-card-text ss-game-card-text-sm text-center text-[0.87rem] font-extrabold leading-snug tracking-tight text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55), 0 0px 2px rgba(0,0,0,0.4)" }}>
              {text}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pb-3 text-center">
            <span className="ss-game-card-sub ss-game-card-sub-sm text-[0.57rem] font-black uppercase tracking-widest text-white/90" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              {sub}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/20" />
        </div>
      </div>
    </div>
  );
}

function FloatingCard({
  slideClass, slideDelay, floatClass, posClass, card, visible, tiltDeg = 0,
}: {
  slideClass: string; slideDelay: string; floatClass: string;
  posClass: string; card: CardData; visible: boolean; tiltDeg?: number;
}) {
  return (
    <div
      className={["select-none absolute z-10", posClass, visible ? slideClass : "opacity-0"].join(" ")}
      style={{ animationDelay: visible ? slideDelay : "0s" }}
    >
      <div className={floatAnimClass(floatClass, visible)}>
        <div style={{ transform: `rotate(${tiltDeg}deg)` }}>
          <GameCard {...card} />
        </div>
      </div>
    </div>
  );
}

export function FloatingSideCard({
  side, topPercent, card, floatClass = "animate-card-1", slideDelay = "0.1s", opacity = 75,
}: {
  side: "left" | "right";
  topPercent: number;
  card: CardData;
  floatClass?: string;
  slideDelay?: string;
  opacity?: number;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    setTilt((Math.random() - 0.5) * 16);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); else setVisible(false); },
      { threshold: 0, rootMargin: "300px 0px 300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const slideClass = side === "left" ? "animate-slide-left" : "animate-slide-right";

  return (
    <>
      <div
        ref={sentinelRef}
        className="pointer-events-none"
        style={{ position: "absolute", top: `${topPercent}%`, left: 0, width: 1, height: 1 }}
        aria-hidden
      />
      <div
        className={[
          "select-none absolute z-10 hidden lg:block",
          side === "left" ? "left-6" : "right-6",
          visible ? slideClass : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{
          top: `${topPercent}%`,
          animationDelay: visible ? slideDelay : "0s",
          opacity: visible ? opacity / 100 : 0,
        }}
      >
        <div className={visible ? `motion-safe:${floatClass}` : ""}>
          <div style={{ transform: `rotate(${tilt}deg)` }}>
            <GameCard {...card} />
          </div>
        </div>
      </div>
    </>
  );
}

export function FloatingGameCards({ cards }: { cards: HeroCardsDict }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tilts, setTilts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setTilts(Array.from({ length: 4 }, () => (Math.random() - 0.5) * 16));
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); else setVisible(false); },
      { threshold: 0, rootMargin: "300px 0px 300px 0px" },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute inset-0" aria-hidden />

      <FloatingCard
        posClass="hidden lg:block top-[8%] left-[2%]"
        slideClass="animate-slide-top-left"
        slideDelay="0.1s"
        floatClass="animate-card-1"
        visible={visible}
        card={{ ...cards.topLeft }}
        tiltDeg={tilts[0]}
      />
      <FloatingCard
        posClass="hidden lg:block top-[58%] left-[1%]"
        slideClass="animate-slide-left"
        slideDelay="0.38s"
        floatClass="animate-card-3"
        visible={visible}
        card={{ ...cards.bottomLeft }}
        tiltDeg={tilts[1]}
      />
      <FloatingCard
        posClass="hidden lg:block top-[12%] right-[2%]"
        slideClass="animate-slide-top-right"
        slideDelay="0.15s"
        floatClass="animate-card-2"
        visible={visible}
        card={{ ...cards.topRight }}
        tiltDeg={tilts[2]}
      />
      <FloatingCard
        posClass="hidden lg:block top-[62%] right-[1%]"
        slideClass="animate-slide-right"
        slideDelay="0.42s"
        floatClass="animate-card-4"
        visible={visible}
        card={{ ...cards.bottomRight }}
        tiltDeg={tilts[3]}
      />

      {/* Hero mobile cards removed — interfered with hero text on small screens */}
    </>
  );
}
