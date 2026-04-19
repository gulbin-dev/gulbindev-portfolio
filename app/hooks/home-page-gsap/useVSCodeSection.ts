import { gsap, mediaQueries, ScrollTrigger, useGSAP } from "@/app/utils/gsap";

/**  handle circle animations*/
export function useCircles(isRevealed: boolean) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          gsap.set(".ui-circle", {
            autoAlpha: 0,
            y: isReduceMotion ? 10 : 100,
          });
          ScrollTrigger.batch(".ui-circle", {
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
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
}

/**  handle line code animations*/
export function useCodeBlocks(isRevealed: boolean) {
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
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
}

/**  handle tasks animations*/
export function useTasks(isRevealed: boolean) {
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
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
}
/**  handle VSCode section header animation*/
export function useVSHeader(isRevealed: boolean) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        () => {
          const skewVSCodeHeader = gsap.quickTo(".vs-code-header", "skewY");
          const yVSCodeHeader = gsap.quickTo(".vs-code-header", "y");
          const clampSkew = gsap.utils.clamp(-4, 4);
          const clampYVSCode = gsap.utils.clamp(-20, 20);

          gsap.to(".vs-code-header", {
            scrollTrigger: {
              trigger: ".vs-code-header",
              start: "top 100%",
              onUpdate: (self) => {
                skewVSCodeHeader(clampSkew(self.getVelocity() / 2));
                yVSCodeHeader(clampYVSCode(self.getVelocity() / 50));
              },
            },
          });
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
}
