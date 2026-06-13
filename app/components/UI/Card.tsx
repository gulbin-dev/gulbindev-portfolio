export default function Card({
  children,
  className,
  cardRef,
}: {
  children: React.ReactNode;
  className?: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`gap relative rounded-2xl border border-stroke bg-primary p-3 tablet:w-full ${className}`}
    >
      <div className="absolute inset-0 z-1 bg-secondary-orange/5"></div>

      {children}
    </div>
  );
}
