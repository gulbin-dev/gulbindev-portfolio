// frameImages.ts
const frameCount = 47;

const images: ImageBitmap[] = [];
const playhead = { frame: 0 };

let fullyLoadedFrames = 0;
let onFrameLoadedCallback: ((count: number) => void) | null = null;
let activeWorker: Worker | null = null;

export function subscribeToFrameLoads(callback: (count: number) => void) {
  onFrameLoadedCallback = callback;
  callback(fullyLoadedFrames);
  return () => {
    onFrameLoadedCallback = null;
  };
}

function preloadInWorker(
  frameCount: number,
  chunkSize: number = 10,
  delayMs: number = 100,
): Promise<ImageBitmap[]> {
  // If an active worker is already running, terminate it before starting a new one
  if (activeWorker) {
    activeWorker.terminate();
  }

  return new Promise((resolve) => {
    const worker = new Worker(
      new URL("@workers/frameImages.worker.ts", import.meta.url),
    );
    activeWorker = worker;

    worker.onmessage = (e: MessageEvent) => {
      const { status, index, bitmap, error } = e.data;

      if (status === "success" && bitmap) {
        images[index] = bitmap;
      } else {
        console.error(`Failed to decode frame ${index}:`, error);
      }

      fullyLoadedFrames++;
      if (onFrameLoadedCallback) {
        onFrameLoadedCallback(fullyLoadedFrames);
      }

      if (fullyLoadedFrames === frameCount) {
        worker.terminate();
        activeWorker = null;
        resolve(images);
      }
    };

    // pass the current length of fully loaded frames so the worker can resume where it left off if needed
    worker.postMessage({
      frameCount,
      chunkSize,
      delayMs,
      startIndex: fullyLoadedFrames,
    });
  });
}

let imagesReadyPromise: Promise<ImageBitmap[]> | null = null;

export function startPreloading() {
  const isNotMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  // Don't re-trigger if it's already completely loaded
  if (fullyLoadedFrames === frameCount) {
    return imagesReadyPromise || Promise.resolve(images);
  }

  // If it's not fully loaded, or was paused midway, trigger/resume loading
  if (!activeWorker && isNotMobile) {
    imagesReadyPromise = preloadInWorker(frameCount);
  }

  return imagesReadyPromise || Promise.resolve([]);
}

export const frameImages = {
  playhead,
  get images() {
    return images;
  },
  get isReady() {
    return imagesReadyPromise || Promise.resolve([]);
  },
};

/**
 * Halts active workers to prevent network waste on unmount.
 * Retains already downloaded bitmaps and current loading progress.
 */
export function clearFrameImages() {
  // Terminate the worker instantly to stop downloading/processing frames
  if (activeWorker) {
    activeWorker.terminate();
    activeWorker = null;
  }

  // Reset the promise reference so startPreloading() knows it can attempt a resume
  imagesReadyPromise = null;
}
