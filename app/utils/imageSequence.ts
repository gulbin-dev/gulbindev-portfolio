// frameImages.ts
const frameCount = 47;

const images: ImageBitmap[] = [];
const playhead = { frame: 0 };

let fullyLoadedFrames = 0;
let onFrameLoadedCallback: ((count: number) => void) | null = null;
let activeWorker: Worker | null = null; // Reference to terminate early if unmounted mid-load

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
  // If an active worker is already running from a fast double-mount, terminate it
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

    worker.postMessage({ frameCount, chunkSize, delayMs });
  });
}

// 1. Wrap this in an exportable function so React can orchestrate the loader lifetime
let imagesReadyPromise: Promise<ImageBitmap[]> | null = null;

export function startPreloading() {
  const isNotMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  // Don't re-trigger if it's already loading or loaded successfully
  if (!imagesReadyPromise && isNotMobile) {
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

export function clearFrameImages() {
  // If the user navigates away mid-download, stop the background worker instantly
  if (activeWorker) {
    activeWorker.terminate();
    activeWorker = null;
  }

  images.forEach((bitmap) => {
    if (bitmap) {
      bitmap.close();
    }
  });

  images.length = 0;
  fullyLoadedFrames = 0;
  imagesReadyPromise = null; // Clear the promise reference so it can be re-triggered next time
}
