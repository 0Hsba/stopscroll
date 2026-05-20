import type { LucideIcon } from "lucide-react";

const STROKE = 1.75;

const sizes = {
  sm: { box: "h-7 w-7 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-8 w-8 rounded-xl", icon: "h-4 w-4" },
  lg: { box: "h-9 w-9 rounded-xl", icon: "h-[18px] w-[18px]" },
  xl: { box: "h-10 w-10 rounded-xl", icon: "h-5 w-5" },
} as const;

type Props = {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
  iconClassName?: string;
};

/** Icône dans pastille orange — style cohérent (Lucide, trait fin). */
export function SectionIconBadge({
  icon: Icon,
  size = "lg",
  className = "",
  iconClassName = "",
}: Props) {
  const s = sizes[size];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-[#E86B00]/10 text-[#E86B00] ring-1 ring-[#E86B00]/20 ${s.box} ${className}`}
    >
      <Icon className={`${s.icon} ${iconClassName}`} strokeWidth={STROKE} aria-hidden />
    </span>
  );
}

export const iconStroke = STROKE;
