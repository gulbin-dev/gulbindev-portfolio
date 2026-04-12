import { gsap, mediaQueries, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
export default function useHireMeGSAP(windowSize: number) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const fadeEntries: HTMLElement[] = gsap.utils.toArray(".fade-entry");
        const icons: HTMLElement[] = gsap.utils.toArray(".icons");

        gsap.defaults({
          duration: 0.8,
        });
        ScrollTrigger.defaults({
          start: "top 80%",
          toggleActions: "play none none reverse",
        });
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
        icons.forEach((icon) =>
          gsap.from(icon, {
            keyframes: {
              "0%": { rotate: -25, autoAlpha: 0 },
              "25%": { rotate: 25, autoAlpha: 1 },
              "50%": { rotate: -15 },
              "75%": { rotate: 15 },
              "100%": { rotate: 0 },
            },
            ease: "circ.out",
            transformOrigin: "bottom center",
            scrollTrigger: {
              trigger: icon,
            },
          }),
        );
      });
    },
    { dependencies: [windowSize], revertOnUpdate: true },
  );
}
