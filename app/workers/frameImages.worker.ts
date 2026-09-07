// image.worker.ts
self.onmessage = async (e: MessageEvent) => {
  const { frameCount, chunkSize, delayMs } = e.data;

  for (let i = 0; i < frameCount; i += chunkSize) {
    const currentChunkSize = Math.min(chunkSize, frameCount - i);

    const chunkPromises = Array.from(
      { length: currentChunkSize },
      async (_, offset) => {
        const index = i + offset;
        // Using an absolute path pointing to your public folder
        const url = `/frame-image/frame-images_${index}.webp`;

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const blob = await response.blob();

          // This decodes the webp compression into raw pixels on the background thread
          const bitmap = await createImageBitmap(blob);

          // Transfer ownership of the bitmap memory to the main thread with 0-copy overhead
          self.postMessage({ status: "success", index, bitmap }, [bitmap]);
        } catch (e: unknown) {
          const error = e as Error;
          self.postMessage({ status: "error", index, error: error.message });
        }
      },
    );

    // Wait for the current chunk to finish fetching & decoding
    await Promise.all(chunkPromises);

    // Give the network/server a breather between batches
    if (i + chunkSize < frameCount) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

export {};
