import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  align?: "start" | "center";
  /** Fond sombre (défaut) ou clair (ex. règles du jeu). */
  tone?: "dark" | "light";
};

/** Petit titre de section — style affiche, sans pill SaaS. */
export function SectionEyebrow({
  children,
  className = "",
  align = "center",
  tone = "dark",
}: Props) {
  const color = tone === "dark" ? "text-[#ffb074]" : "text-[#c2410c]";
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <p
      className={`font-[family-name:var(--font-lilita-one)] text-base leading-tight sm:text-lg ${color} ${alignClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
