import { useGSAP } from "@gsap/react";
import { gsap, mediaQueries, ScrollSmoother } from "@utils/gsap/gsap";

/** Custom hook to handle ScrollSmoother in the Home page */
export default function useSmoothScroll(windowSize: number) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isSmallScreen } = context.conditions ?? {};
          ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
            speed: isSmallScreen ? 1 : 0.5,
          });
        },
      );
    },

    { dependencies: [windowSize], revertOnUpdate: true },
  );
}
