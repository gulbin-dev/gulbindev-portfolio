import { gsap, mediaQueries, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";

/** Custom hook to handle GSAP animations in VS Code mimic section in the Home page */
export default function useCodeBlocks(windowSize: number) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          gsap.set(".code-snippet p", {
            autoAlpha: 0,
            y: isReduceMotion ? 10 : 100,
          });
          ScrollTrigger.batch(".code-snippet p", {
            onEnter: (elements) => {
              gsap.to(elements, {
                y: 0,
                autoAlpha: 1,
                stagger: 0.15,
                overwrite: true,
              });
            },
            onLeaveBack: (elements) =>
              gsap.set(elements, { opacity: 0, y: 100, overwrite: true }),
            start: "top 98%",
          });
        },
      );
    },

    { dependencies: [windowSize], revertOnUpdate: true },
  );
}
