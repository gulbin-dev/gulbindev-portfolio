// frame images
const frameCount = 47;

// Keep this reference stable so external files can always read it
const images: HTMLImageElement[] = [];
const playhead = { frame: 0 };

// Global event system to alert the React Canvas component instantly when ANY image loads
let fullyLoadedFrames = 0;
let onFrameLoadedCallback: ((count: number) => void) | null = null;

/**
 * Allows the React component to subscribe directly to individual image load events.
 * This completely circumvents DOM event race conditions on slow networks.
 */
export function subscribeToFrameLoads(callback: (count: number) => void) {
  onFrameLoadedCallback = callback;
  // Fire immediately upon subscription so the component knows the current state
  callback(fullyLoadedFrames);
  return () => {
    onFrameLoadedCallback = null;
  };
}

/**
 * Preload images in chunks to avoid overwhelming the network and main thread
 */
async function preloadInChunks(
  frameCount: number,
  chunkSize: number = 10,
  delayMs: number = 100,
): Promise<HTMLImageElement[]> {
  const loadedImages: HTMLImageElement[] = [];

  for (let i = 0; i < frameCount; i += chunkSize) {
    const chunkPromises = Array.from(
      { length: Math.min(chunkSize, frameCount - i) },
      (_, offset) => {
        const index = i + offset;
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();

          // This handler fires the exact moment a single asset arrives over the wire
          const handleLoad = () => {
            fullyLoadedFrames++;
            if (onFrameLoadedCallback) {
              onFrameLoadedCallback(fullyLoadedFrames);
            }
            resolve(img);
          };

          img.onload = handleLoad;
          img.onerror = handleLoad; // Graceful degradation if an image fails (keeps queue moving)
          img.src = `/frame-image/frame-images_${index}.webp`;

          // Push into the global stable array right away so the image
          // is accessible by index even while the rest of its chunk is downloading.
          images[index] = img;
        });
      },
    );

    const loadedChunk = await Promise.all(chunkPromises);
    loadedImages.push(...loadedChunk);

    // Give the main thread and network a breather before the next batch
    if (i + chunkSize < frameCount) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return loadedImages;
}

// Check window execution environment and screen size safely during initialization
const isNotMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches;

// Only trigger preloading if we are explicitly on a non-mobile viewport (Tablet / Desktop)
const imagesReadyPromise = isNotMobile
  ? preloadInChunks(frameCount)
  : Promise.resolve([]);

export const frameImages = {
  playhead,
  // Using a getter ensures external files always read the live, progressively populated array state
  get images() {
    return images;
  },
  isReady: imagesReadyPromise,
};
