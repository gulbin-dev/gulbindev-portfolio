"use client";
import { gsap, mediaQueries, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import useWindowSizeListener from "@hooks/useWindowSizeListener";

/** Custom hook to handle GSAP animations in VS Code mimic section in the Home page */
export default function useTasks() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          gsap.set(".task", {
            autoAlpha: 0,
            y: isReduceMotion ? 10 : 100,
          });
          ScrollTrigger.batch(".task", {
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

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
