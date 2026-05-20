"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIVACY_PATH = "/politique-confidentialite";

type Props = {
  className: string;
  children: React.ReactNode;
};

export function PrivacyPolicyFooterLink({ className, children }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={PRIVACY_PATH}
      className={className}
      onClick={() => {
        if (pathname === PRIVACY_PATH) window.scrollTo(0, 0);
      }}
    >
      {children}
    </Link>
  );
}
