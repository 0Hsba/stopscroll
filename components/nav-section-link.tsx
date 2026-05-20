"use client";

import type { CSSProperties, ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { scrollToAnchor } from "@/components/smooth-scroll-provider";

type Props = {
  /** Fragment sans `#` (ex. `a-propos`). */
  targetId: string;
  children: ReactNode;
  className?: string;
  /** Appelé après navigation interne (scroll) ou au clic si l’on quitte la page. */
  onAfterNavigate?: () => void;
  tabIndex?: number;
  style?: CSSProperties;
};

/** Lien vers une ancre `/` : scroll natif sur la home, sinon navigation puis hash. */
export function NavSectionLink({
  targetId,
  children,
  className,
  onAfterNavigate,
  tabIndex,
  style,
}: Props) {
  const pathname = usePathname();
  const id = targetId.replace(/^#/, "");
  const href = `/#${id}`;
  const hashSel = `#${id}`;

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      tabIndex={tabIndex}
      style={style}
      onClick={(e) => {
        if (pathname !== "/") {
          onAfterNavigate?.();
          return;
        }
        e.preventDefault();
        scrollToAnchor(hashSel);
        onAfterNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}
