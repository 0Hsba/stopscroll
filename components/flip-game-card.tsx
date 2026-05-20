"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type GameCardExample = {
  text: string;
  category: string;
};

function getEdgeTransform(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement): string {
  const rect = el.getBoundingClientRect();
  const nx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
  const ny = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
  if (Math.abs(nx) >= Math.abs(ny)) return nx > 0 ? "rotateY(180deg)" : "rotateY(-180deg)";
  return ny > 0 ? "rotateX(180deg)" : "rotateX(-180deg)";
}

export function FlipGameCard({ text, category }: GameCardExample) {
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
      className="ss-game-card h-[300px] w-[200px] shrink-0 cursor-pointer [perspective:900px] sm:h-[340px] sm:w-[226px]"
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
        {/* FACE AVANT — dos de carte visible par défaut */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.6rem] shadow-[0_16px_48px_-10px_rgba(0,0,0,0.55)] [backface-visibility:hidden]">
          <Image src="/card-back.png" alt="Stop Scroll" fill className="object-cover" sizes="(max-width: 640px) 200px, 226px" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/20" />
        </div>

        {/* FACE ARRIERE — contenu de la carte révélé au survol */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.6rem] shadow-[0_16px_48px_-10px_rgba(0,0,0,0.55)] [backface-visibility:hidden]"
          style={{ transform: backPre }}
        >
          <div className="ss-game-card-bg absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 32%, #d96a2a 0%, #9c2800 100%)" }} />
          <div className="absolute inset-0 opacity-80" style={{ background: "repeating-conic-gradient(from 0deg at 50% 42%, rgba(255,255,255,0.065) 0deg 9deg, transparent 9deg 18deg)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 42%, transparent 0%, rgba(160,35,0,0.55) 100%)" }} />
          <div className="pointer-events-none absolute -left-6 -top-6 h-36 w-36 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)" }} />
          <div className="relative flex h-full flex-col items-center justify-center px-5 pb-12 pt-8">
            <p className="ss-game-card-text text-center text-[1.05rem] font-extrabold leading-snug tracking-tight text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55), 0 0px 2px rgba(0,0,0,0.4)" }}>
              {text}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pb-4 text-center">
            <span className="ss-game-card-sub text-[0.7rem] font-black uppercase tracking-widest text-white/90" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              {category}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/20" />
        </div>
      </div>
    </div>
  );
}
