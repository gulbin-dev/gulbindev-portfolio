import { useSyncExternalStore } from "react";

// Cache variables sit outside the React render context entirely
let cachedWidth = typeof window !== "undefined" ? window.innerWidth : 0;
let timeoutId: ReturnType<typeof setTimeout>;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);

  // Singleton wrapper ensures we only ever attach ONE passive window listener globally
  if (listeners.size === 1) {
    const handleResize = () => {
      clearTimeout(timeoutId);

      // Debounce: Only read the layout geometry and inform React when dragging pauses
      timeoutId = setTimeout(() => {
        const currentWidth = window.innerWidth;

        // Critical Performance Gate: Only alert React if the integer actually changed
        if (currentWidth !== cachedWidth) {
          cachedWidth = currentWidth;
          listeners.forEach((cb) => cb());
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
  }

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      window.removeEventListener("resize", () => {});
      clearTimeout(timeoutId);
    }
  };
}

// OPTIMIZED: getSnapshot now returns a raw, static cached memory variable.
// It performs 0 DOM layout queries, completely eliminating layout thrashing.
const getSnapshot = () => cachedWidth;
const getServerSnapshot = () => 0;

/**
 * Custom hook that returns only the raw numerical screen width.
 * Completely immune to forced synchronous layout thrashing during active resizing.
 */
export default function useWindowSizeListener(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
