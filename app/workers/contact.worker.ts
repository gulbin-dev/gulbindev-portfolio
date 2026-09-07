// contact.worker.ts
self.onmessage = async (e: MessageEvent) => {
  const { targets }: { targets: Array<{ id: string; url: string }> } = e.data;

  // Process all contact card backgrounds concurrently
  await Promise.all(
    targets.map(async (target) => {
      try {
        const response = await fetch(target.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const blob = await response.blob();

        // 1. Offload image decompression and bitmap formatting to background CPU
        const bitmap = await createImageBitmap(blob);

        // 2. OffscreenCanvas lets workers bundle bitmap contents into an internal blob reference
        const offscreen = new OffscreenCanvas(bitmap.width, bitmap.height);
        const ctx = offscreen.getContext("2d");
        ctx?.drawImage(bitmap, 0, 0);

        // Clean up bitmap reference instantly
        bitmap.close();

        // 3. Extract as a standalone raw file block
        const fileBlob = await offscreen.convertToBlob({ type: "image/png" });

        // Stream the blob object back to the main thread
        self.postMessage({ status: "success", id: target.id, blob: fileBlob });
      } catch (e: unknown) {
        const error = e as Error;
        self.postMessage({
          status: "error",
          id: target.id,
          error: error.message,
        });
      }
    }),
  );
};

export {};
