"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, ScrollSmoother } from "./gsap";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Get the existing ScrollSmoother instance
    const smoother = ScrollSmoother.get();

    if (smoother) {
      // 2. Force scroll to 0 immediately (the true flag skips animation)
      smoother.scrollTop(0);

      // 3. Clear any cached scroll memory from ScrollTrigger
      ScrollTrigger.clearScrollMemory();

      // 4. Refresh ScrollTrigger to recalculate for the new page layout
      // Use requestAnimationFrame to ensure the DOM has updated first
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return null;
}
