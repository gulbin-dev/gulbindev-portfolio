export default function Tag({
  children,
  className,
  style,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  style?: string;
  icon?: React.ReactElement;
}) {
  return (
    <span
      className={`flex w-fit gap-1 rounded-3xl border border-stroke bg-primary-shade px-2.5 py-1.25 ${className}`}
    >
      <span aria-hidden className={`${style}`}>
        {icon}
      </span>
      {children}
    </span>
  );
}
