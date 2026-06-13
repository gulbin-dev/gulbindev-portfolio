export default function Quotes({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: string;
}) {
  return (
    <div
      className={`relative grid w-fit grid-cols-[max-content_1fr_max-content] grid-rows-[repeat(3,auto)] px-1 text-secondary-red ${className}`}
    >
      <span
        aria-hidden
        className="col-start-1 row-start-1 block h-4 w-4 text-7xl"
      >
        “
      </span>
      <span
        className={`col-start-2 row-start-2 text-center text-size-sm text-foreground-white ${style}`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="col-start-3 row-start-3 block h-4 w-4 text-7xl"
      >
        ”
      </span>
    </div>
  );
}
