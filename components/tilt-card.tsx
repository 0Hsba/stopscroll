"use client";

import { type ReactNode, useCallback, useRef } from "react";

/**
 * Wrapper léger qui applique une rotation statique à son enfant et la réinitialise
 * au survol (avec lift). Utilise uniquement .style.transform pour être sûr qu'aucun
 * CSS Tailwind ne vient l'écraser.
 */
export function TiltCard({
  deg,
  children,
  className = "",
}: {
  deg: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translateY(-8px) rotate(0deg)";
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = `rotate(${deg}deg)`;
  }, [deg]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `rotate(${deg}deg)`,
        transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
