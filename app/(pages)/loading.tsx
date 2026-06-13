export default function Loading() {
  return (
    <div className="inset fixed z-60 flex h-screen w-screen items-center justify-center overflow-hidden bg-linear-to-br from-primary to-primary-shade">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p className="text-foreground text-lg">Loading page...</p>
      </div>
    </div>
  );
}
