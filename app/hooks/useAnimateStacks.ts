"use client";
import { gsap, mediaQueries, useGSAP } from "@utils/gsap";
import { RefObject } from "react";
export default function useAnimateStacks({
  inView,
  containerRef,
}: {
  inView: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  useGSAP(
    () => {
      if (!inView) return;
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};

        // Only run the repel calculation and animation on tablet screens and above
        if (isTabletScreen || isDesktopScreen) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "35% center",
              end: "bottom bottom",
            },
          });
          tl.to(".tags", {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: Math.random() * 0.2,
            scrollTrigger: {
              trigger: container,
              start: "35% center",
              end: "bottom center",
            },
          }).to(
            ".circle",
            {
              scale: 1,
              duration: 1.2,
            },
            "<",
          );
        }
      });
    },
    { dependencies: [inView], scope: containerRef },
  );
}
