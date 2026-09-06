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
          //  Sequence execution wrapped into a single timeline event thread
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "35% center",
              end: "bottom center", // Adjusted to match the logical end of both elements
              toggleActions: "play none none reverse", // Cleans up if the user scrolls backwards
            },
          });

          tl.to(".tags", {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            // Structured stagger replaces unpredictable Math.random() delays for smooth frame rendering
            stagger: {
              amount: 0.2,
              from: "random", // Achieves your randomized feel but executes inside GSAP's optimized update pass
            },
          }).to(
            ".circle",
            {
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
            },
            "<", // Flawlessly synchronizes the circle scaling alongside the tag animation
          );
        }
      });
    },
    { dependencies: [inView], scope: containerRef },
  );
}
