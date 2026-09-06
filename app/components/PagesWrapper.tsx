"use client";

import { gsap, mediaQueries, ScrollSmoother, useGSAP } from "@utils/gsap";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Internal ready state to defer GSAP initialization past React's initial commit lifecycle
  const [isReady, setIsReady] = useState(false);

  // Execution lock ref to stop React Scheduler from firing the hook multiple times per task loop
  const hasInitializedRef = useRef(false);

  //  Handle layout stability and route changes
  useEffect(() => {
    // Reset initialization flags whenever the route changes
    const call = () => setIsReady(false);
    call();
    hasInitializedRef.current = false;

    const ctx = gsap.context(() => {
      // Pushing state modification to the next animation frame ensures the DOM
      // is completely stable and painted before GSAP reads geometries.
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  // Hook 2: Initialize GSAP ScrollSmoother once the system is ready
  useGSAP(() => {
    // CRITICAL GATES: Skip if Hook 1 hasn't cleared the frame or if already processed in this scheduler loop
    if (!isReady || hasInitializedRef.current) return;

    // Set execution lock immediately to intercept back-to-back sequential task runs
    hasInitializedRef.current = true;

    // Immediately reset window scroll to top before measuring anything
    window.scrollTo(0, 0);
    const mm = gsap.matchMedia();

    mm.add(mediaQueries, (context) => {
      const { isMobilePortraitScreen } = context.conditions ?? {};

      // Initialize fresh smoother for the current route's DOM content
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        speed: isMobilePortraitScreen ? 1 : 0.5,
      });

      // Force a controlled scroll to top through the smoother
      smoother.scrollTop(0);
    });

    // Kills matchMedia and destroys ScrollSmoother gracefully on route change
    return () => {
      mm.revert();
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.kill();
      }
      // Unlock the flag when unmounting or tearing down for a route shift
      hasInitializedRef.current = false;
    };
  }, [pathname, isReady]); // Fires accurately across route transitions and layout clearances

  return (
    <div
      id="smooth-wrapper"
      className="min-h-screen overflow-hidden bg-primary"
    >
      <div
        id="smooth-content"
        className="bg-primary-color-darker content-wrapper"
      >
        <main className="flex flex-col items-center bg-primary pt-12 text-foreground-white">
          {children}
        </main>
      </div>
    </div>
  );
}
