import Link from "next/link";

export default function CTALinkButton({
  children,
  className,
  link,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  link: string;
  target?: string;
}) {
  return (
    <Link
      href={link}
      target={target}
      className={`rounded-2xl bg-cta px-3 py-1.25 font-bold text-primary hover:bg-cta-hover ${className}`}
    >
      {children}
    </Link>
  );
}
