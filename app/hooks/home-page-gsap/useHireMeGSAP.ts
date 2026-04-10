"use client";
import { gsap, mediaQueries } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import useWindowSizeListener from "../useWindowSizeListener";
export default function useHireMeGSAP() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const fadeEntries: HTMLElement[] = gsap.utils.toArray(".fade-entry");

        fadeEntries.forEach((el) =>
          gsap.from(el, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }),
        );

        gsap.from(".location", {
          scaleX: -1,
          duration: 0.8,
          autoAlpha: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".location",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".job-preference", {
          keyframes: {
            "0%": { rotate: -25, autoAlpha: 0 },
            "25%": { rotate: 25, autoAlpha: 1 },
            "50%": { rotate: -15 },
            "75%": { rotate: 15 },
            "100%": { rotate: 0 },
          },
          ease: "circ.out",
          transformOrigin: "bottom center",
          duration: 0.8,
          scrollTrigger: {
            trigger: ".job-preference",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
