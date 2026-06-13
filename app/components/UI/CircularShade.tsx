export default function CircularShade({ className }: { className: string }) {
  return (
    <div
      className={`circle absolute top-1/2 left-1/2 -translate-1/2 scale-0 rounded-full bg-radial-[at_10%_20%] from-neutral-400/60 via-25% to-primary to-50% tablet:right-0 tablet:bottom-0 tablet:bg-radial-[at_50%_50%] tablet:from-neutral-400/60 ${className}`}
    ></div>
  );
}
