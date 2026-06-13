export default function Section({
  ariaLabel,
  children,
  className,
}: {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      role="region"
      aria-label={ariaLabel}
      className={`relative h-full max-w-180 overflow-hidden px-3 tablet:grid tablet:grid-flow-row tablet:auto-rows-[60px] tablet:grid-cols-8 desktop:grid-cols-12 ${className}`}
    >
      {children}
    </section>
  );
}
