export default function Loading() {
  return (
    <div className="loader-bg min-h-screen fixed min-w-screen inset flex items-center justify-center bg-linear-to-br from-primary-color to-primary-color-darker overflow-hidden">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-color mx-auto mb-4"></div>
        <p className="text-lg text-foreground">Loading page...</p>
        <p className="mt-1">First time visit may take a while to load</p>
      </div>
    </div>
  );
}
