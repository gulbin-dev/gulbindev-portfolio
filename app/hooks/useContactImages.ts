// useContactImages.ts
import { useEffect, useState } from "react";

interface ContactUrls {
  gmail: string;
  fiverr: string;
  upwork: string;
  linkedin: string;
}

export function useContactImages(inView: boolean, isBiggerScreen: boolean) {
  const [imageUrls, setImageUrls] = useState<ContactUrls>({
    gmail: "",
    fiverr: "",
    upwork: "",
    linkedin: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle",
  );

  useEffect(() => {
    // Only fetch if card module viewport intersect conditions match
    if (!inView || !isBiggerScreen) return;

    setStatus("loading");

    const targets = [
      { id: "gmail", url: "/images/gmail-contact.png" },
      { id: "fiverr", url: "/images/fiverr-contact.png" },
      { id: "upwork", url: "/images/upwork-contact.png" },
      { id: "linkedin", url: "/images/linkedin-contact.png" },
    ];

    const worker = new Worker(
      new URL("@workers/contact.worker.ts", import.meta.url),
    );
    const generatedUrls: Record<string, string> = {};
    let trackingCount = 0;

    worker.onmessage = (e: MessageEvent) => {
      const { status: frameStatus, id, blob, error } = e.data;

      if (frameStatus === "success" && blob) {
        // Create an optimized local memory locator reference URL string
        generatedUrls[id] = URL.createObjectURL(blob);
      } else {
        console.error(`Contact background error for ${id}:`, error);
      }

      trackingCount++;
      if (trackingCount === targets.length) {
        setImageUrls(generatedUrls as unknown as ContactUrls);
        setStatus(Object.keys(generatedUrls).length > 0 ? "loaded" : "error");
        worker.terminate();
      }
    };

    worker.postMessage({ targets });

    return () => {
      worker.terminate();
      // Revoke the object memory space allocations to prevent page route leaks
      Object.values(generatedUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [inView, isBiggerScreen]);

  // Fallbacks: provide desktop blurred placeholders if worker hasn't completed execution blocks
  return {
    status,
    srcs: {
      gmail: imageUrls.gmail || "/images/gmail-contact-bg.png",
      fiverr: imageUrls.fiverr || "/images/fiverr-contact-bg.png",
      upwork: imageUrls.upwork || "/images/upwork-contact-bg.png",
      linkedin: imageUrls.linkedin || "/images/linkedin-contact-bg.png",
    },
  };
}
