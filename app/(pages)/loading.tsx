export default function Loading() {
  return (
    <div className="fixed inset-0 z-60 flex h-screen w-screen items-center justify-center overflow-hidden bg-linear-to-br from-primary via-primary to-primary-shade">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-stroke/70 bg-primary/70 px-8 py-6 text-center shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-sm">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-secondary-orange/25" />
          <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-secondary-orange" />
          <div className="h-3.5 w-3.5 rounded-full bg-secondary-orange shadow-[0_0_12px_#ff5c00]" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-wide text-foreground-white">
            Loading experience...
          </p>
          <p className="mt-1 text-sm text-foreground-white/70">
            Preparing the portfolio interface
          </p>
        </div>
      </div>
    </div>
  );
}
