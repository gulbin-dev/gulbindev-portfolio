import Link from "next/link";
import type { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

// Combine Next.js LinkProps with standard HTML anchor attributes
type LinkProp = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> & {
    children: React.ReactNode;
    className?: string;
  };

export default function CTALinkButton({
  children,
  className = "",
  ...props
}: LinkProp) {
  return (
    <Link
      {...props}
      className={`rounded-2xl bg-cta px-3 py-1.75 font-bold text-primary hover:bg-cta-hover ${className}`}
    >
      {children}
    </Link>
  );
}
