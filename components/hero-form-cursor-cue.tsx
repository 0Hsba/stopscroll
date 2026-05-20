"use client";

import { useEffect, useRef } from "react";

const DELAY_BEFORE_MS = 900;
const MOVE_DURATION_MS = 1750;
const INTRO_RATIO = 0.14;
const DWELL_BEFORE_CLICK_MS = 260;
const FADE_MS = 480;

const HAND_ICON_PX = 50;
const HAND_VB_SIZE = 24;
const HOTSPOT_VB_X = 13;
const HOTSPOT_VB_Y = 2.35;
const HOTSPOT_X = (HOTSPOT_VB_X / HAND_VB_SIZE) * HAND_ICON_PX;
const HOTSPOT_Y = (HOTSPOT_VB_Y / HAND_VB_SIZE) * HAND_ICON_PX;

type Pt = { x: number; y: number };

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutQuad(t: number) {
  const k = clamp(t, 0, 1);
  return 1 - (1 - k) * (1 - k);
}
function cubicBezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t, u2 = u * u, u3 = u2 * u, t2 = t * t, t3 = t2 * t;
  return {
    x: u3 * p0.x + 3 * u2 * t * p1.x + 3 * u * t2 * p2.x + t3 * p3.x,
    y: u3 * p0.y + 3 * u2 * t * p1.y + 3 * u * t2 * p2.y + t3 * p3.y,
  };
}
function lerpAngleDeg(from: number, to: number, k: number) {
  let d = to - from;
  d = ((((d + 540) % 360) + 360) % 360) - 180;
  return from + d * clamp(k, 0, 1);
}
function buildCurve(end: Pt, cw: number, ch: number) {
  const pad = 20;
  const p3: Pt = { ...end };
  const roomLeft = Math.max(56, end.x - pad - 16);
  const leftSpanWish = cw * 0.11 + 78;
  const leftSpan = Math.min(Math.max(86, Math.min(leftSpanWish, 178)), roomLeft);
  const downSpan = clamp(ch * 0.04 + 40, 48, 88);
  const p0: Pt = {
    x: clamp(end.x - leftSpan, pad + 14, cw - HAND_ICON_PX - pad),
    y: clamp(end.y + downSpan, end.y + 42, Math.min(end.y + 112, ch - pad - HAND_ICON_PX)),
  };
  const bowY = p0.y - clamp((p0.y - end.y) * 0.38, 20, 48);
  const p1: Pt = {
    x: clamp(end.x + (p0.x - end.x) * 0.32, pad + 28, cw - pad - HAND_ICON_PX),
    y: clamp(bowY, end.y + 20, Math.max(end.y + 24, p0.y - 6)),
  };
  const gapBelow = clamp((end.y + p1.y) * 0.5 - end.y * 0.5 + 52, 36, 86);
  const p2: Pt = {
    x: Math.min(Math.max(end.x + 40, pad + HAND_ICON_PX + 24), cw - HAND_ICON_PX - pad - 14),
    y: clamp(end.y + gapBelow * 0.58, end.y + 26, Math.min(end.y + gapBelow + 24, ch - pad - HAND_ICON_PX)),
  };
  return { p0, p1, p2, p3 };
}

export function HeroFormCursorCue() {
  const containerRef = useRef<HTMLDivElement>(null);
  const moverRef     = useRef<HTMLDivElement>(null);
  const rippleRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const timeoutsRef  = useRef<number[]>([]);
  const sentinelRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = typeof window !== "undefined" ? window : undefined;
    if (!w) return;

    const prefersReduce =
      typeof w.matchMedia === "function" &&
      w.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const clearAll = () => {
      timeoutsRef.current.forEach((id) => w.clearTimeout(id));
      timeoutsRef.current = [];
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
    };

    /** Lance (ou relance) l'animation de la main. */
    const play = () => {
      clearAll();

      const container = containerRef.current;
      const mover     = moverRef.current;
      const ripple    = rippleRef.current;
      if (!container || !mover || !ripple) return;

      // Réinitialise l'état visuel avant de rejouer
      container.style.transition   = "";
      container.style.visibility   = "visible";
      container.style.opacity      = "0";
      ripple.style.opacity         = "0";

      const tLaunch = w.setTimeout(() => {
        const anchor = document.querySelector<HTMLElement>("[data-hero-form-cta]");
        if (!anchor) return;

        const anchorRect = anchor.getBoundingClientRect();
        if (anchorRect.width < 12 || anchorRect.height < 12) return;

        const cRect = container.getBoundingClientRect();
        const end: Pt = {
          x: anchorRect.left + anchorRect.width  * 0.52 - cRect.left,
          y: anchorRect.top  + anchorRect.height * 0.48 - cRect.top,
        };

        const { p0, p1, p2, p3 } = buildCurve(end, cRect.width, cRect.height);
        const HAND_BIAS_DEG = 90;
        const dxChord = p3.x - p2.x, dyChord = p3.y - p2.y;
        const chordLen = Math.hypot(dxChord, dyChord);
        const angleRest =
          chordLen > 8
            ? (Math.atan2(dyChord, dxChord) * 180) / Math.PI + HAND_BIAS_DEG
            : (Math.atan2(p3.y - p1.y, p3.x - p1.x) * 180) / Math.PI + HAND_BIAS_DEG;
        const sx = p1.x - p0.x, sy = p1.y - p0.y;
        const angleStart =
          Math.hypot(sx, sy) > 14
            ? (Math.atan2(sy, sx) * 180) / Math.PI + HAND_BIAS_DEG
            : angleRest;

        const setMoverFrame = (pos: Pt, angleDeg: number, gripScale: number, introBlendRaw: number) => {
          const introEase = easeOutQuad(clamp(introBlendRaw, 0, 1));
          const scaleTotal = gripScale * (0.868 + introEase * 0.132);
          const introLiftPx = -(1 - introEase) * 11;
          mover.style.transform = `translate3d(${pos.x.toFixed(2)}px,${(pos.y + introLiftPx).toFixed(2)}px,0) rotate(${angleDeg.toFixed(2)}deg) translate3d(${-HOTSPOT_X}px,${-HOTSPOT_Y}px,0) scale(${scaleTotal.toFixed(4)})`;
        };

        const applyFrame = (u: number) => {
          const e = easeInOutCubic(u);
          const introBlend = INTRO_RATIO > 1e-6 ? Math.min(u / INTRO_RATIO, 1) : 1;
          container.style.opacity = String(easeOutQuad(introBlend));
          const pos = cubicBezier(p0, p1, p2, p3, e);
          let angleDeg = lerpAngleDeg(angleStart, angleRest, e);
          if (u > 0.12 && u < 0.78)
            angleDeg += Math.sin(e * Math.PI * 2.1) * 0.9 * Math.sin(Math.PI * u) * introBlend;
          setMoverFrame(pos, angleDeg, 1, introBlend);
        };

        applyFrame(0);
        const started = performance.now();

        const move = (now: number) => {
          const u = Math.min(1, (now - started) / MOVE_DURATION_MS);
          applyFrame(u);
          if (u < 1) { rafRef.current = w.requestAnimationFrame(move); return; }

          setMoverFrame(p3, angleRest, 1, 1);

          timeoutsRef.current.push(w.setTimeout(() => {
            setMoverFrame(p3, angleRest, 0.92, 1);

            timeoutsRef.current.push(w.setTimeout(() => {
              setMoverFrame(p3, angleRest, 1, 1);

              anchor.animate(
                [
                  { transform: "scale(1)", offset: 0 },
                  { transform: "scale(0.975) translateY(0.5px)", offset: 0.42 },
                  { transform: "scale(1.01) translateY(0px)", offset: 0.78 },
                  { transform: "scale(1)", offset: 1 },
                ],
                { duration: 460, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "none" },
              );

              ripple.style.opacity = "0.65";
              const anim = ripple.animate(
                [
                  { opacity: 0.5, transform: "translate(-50%,-50%) scale(0.35)" },
                  { opacity: 0,   transform: "translate(-50%,-50%) scale(1.08)" },
                ],
                { duration: 520, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" },
              );
              anim.onfinish = () => { ripple.style.opacity = "0"; };

              timeoutsRef.current.push(w.setTimeout(() => {
                container.style.transition = `opacity ${FADE_MS}ms ease-out`;
                container.style.opacity    = "0";
                timeoutsRef.current.push(w.setTimeout(() => {
                  container.style.visibility = "hidden";
                }, FADE_MS + 40));
              }, 380));
            }, 120));
          }, DWELL_BEFORE_CLICK_MS));
        };

        rafRef.current = w.requestAnimationFrame(move);
      }, DELAY_BEFORE_MS);

      timeoutsRef.current.push(tLaunch);
    };

    // Observer sur la sentinelle — rejoue à chaque entrée dans le viewport
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          // Sort du viewport : annule tout et remet à zéro
          clearAll();
          const container = containerRef.current;
          if (container) {
            container.style.transition  = "";
            container.style.opacity     = "0";
            container.style.visibility  = "hidden";
          }
        }
      },
      { threshold: 0.1 },
    );

    io.observe(sentinel);
    return () => { clearAll(); io.disconnect(); };
  }, []);

  return (
    <>
      {/* Sentinelle invisible ancrée sur la section hero */}
      <div ref={sentinelRef} className="pointer-events-none absolute inset-0" aria-hidden />

      <div
        ref={containerRef}
        className="motion-reduce:hidden pointer-events-none absolute inset-0 z-[18] opacity-0"
        style={{ visibility: "hidden" }}
        aria-hidden
      >
        <div ref={moverRef} className="absolute left-0 top-0 will-change-transform" style={{ transformOrigin: "0 0" }}>
          <div className="relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <svg width={HAND_ICON_PX} height={HAND_ICON_PX} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M14,3V13L17.2,11.31L17.42,11.28C17.71,11.28 17.97,11.4 18.16,11.6L18.9,12.37L14,16.57C13.74,16.84 13.39,17 13,17H6.5C5.73,17 5,16.3 5,15.5V11.14C5,10.53 5.35,10 5.85,9.8L10.79,7.6L12,7.47V3A1,1 0 0,1 13,2A1,1 0 0,1 14,3M5,19H13V22H5V19Z"
                fill="#0f172a" fillOpacity={0.14} transform="translate(0.45 0.55)"
              />
              <path
                d="M14,3V13L17.2,11.31L17.42,11.28C17.71,11.28 17.97,11.4 18.16,11.6L18.9,12.37L14,16.57C13.74,16.84 13.39,17 13,17H6.5C5.73,17 5,16.3 5,15.5V11.14C5,10.53 5.35,10 5.85,9.8L10.79,7.6L12,7.47V3A1,1 0 0,1 13,2A1,1 0 0,1 14,3M5,19H13V22H5V19Z"
                fill="white" stroke="#1e293b" strokeWidth={0.45} strokeLinejoin="round"
              />
            </svg>
            <div
              ref={rippleRef}
              className="pointer-events-none absolute h-24 w-24 rounded-full border-2 border-[#E86B00]/90 bg-[#E86B00]/25 opacity-0"
              style={{ left: HOTSPOT_X, top: HOTSPOT_Y, transform: "translate(-50%,-50%) scale(0.35)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
