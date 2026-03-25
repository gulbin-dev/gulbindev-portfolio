"use client";
import { useState, useEffect } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import heroSectionGSAP from "@utils/gsap/hero-section-gsap";
import cardSkillGSAP from "@utils/gsap/card-skill-gsap";
import vsCodeSectionGSAP from "@utils/gsap/vsCode-section-gsap";
export default function useGlobalGSAP() {
  const [resizeKey, setResizeKey] = useState(0);

  /**
   * Handles window resizing and updates the resizeKey state.
   * This is used to trigger a re-render of the components that use this hook.
   * The debouncer is used to prevent the state from being updated too frequently.
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Clear previous timeout to debounce
      clearTimeout(timeoutId);
      // Only update state after user stops resizing for 200ms
      timeoutId = setTimeout(() => {
        setResizeKey((prev) => prev + 1);
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        {
          isSmallScreen: "(max-width: 440px)",
          isMediumScreen: "(min-width: 768px)",
          isLargeScreen: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          // const allAnimation = gsap.globalTimeline.getChildren();
          // console.log(allAnimation);
          console.log("this will log ", context);
          /**
           * Creates a ScrollSmoother instance that controls the animation of the VSCode header.
           * The animation is triggered when the user scrolls to the VSCode section.
           * The animation will smoothly scroll the VSCode header to the top of the viewport.
           * The animation will also smoothly skew the VSCode header when the user scrolls.
           * The animation will also smoothly move the VSCode header up and down when the user scrolls.
           * @returns {ScrollSmoother} A ScrollSmoother instance that controls the animation of the VSCode header.
           */
          const createVSCodeHeaderSmoothScroll = () => {
            const skewVSCodeHeader = gsap.quickTo(".vs-code-header", "skewY");
            const yVSCodeHeader = gsap.quickTo(".vs-code-header", "y");
            const clampSkew = gsap.utils.clamp(-4, 4);
            const clampYVSCode = gsap.utils.clamp(-20, 20);

            ScrollSmoother.create({
              smooth: 1.5,
              effects: true,
              smoothTouch: 0.1,
              onUpdate: (self) => {
                skewVSCodeHeader(clampSkew(self.getVelocity() / 2));
                yVSCodeHeader(clampYVSCode(self.getVelocity() / 50));
              },
              onStop: () => {
                skewVSCodeHeader(0);
                yVSCodeHeader(0);
              },
            });
          };

          /**
           * Creates a GSAP animation for the header and sets up a ScrollTrigger
           * to control the animation based on the scroll direction.
           */
          const createHeaderAnimation = () => {
            const showHeaderAnim = gsap.to("#header", {
              yPercent: -100,
              duration: 0.5,
              paused: true,
              id: "showHeaderAnim",
            });
            ScrollTrigger.create({
              animation: showHeaderAnim,
              start: 0,
              end: "max",
              onUpdate: (self) => {
                if (self.direction === -1) {
                  showHeaderAnim.reverse();
                } else {
                  showHeaderAnim.play();
                }
              },
            });
          };

          createHeaderAnimation();
          createVSCodeHeaderSmoothScroll();

          heroSectionGSAP(context);
          cardSkillGSAP(context);
          vsCodeSectionGSAP(context);
        },
      );
      console.log("this will run on mm revert");
      return () => mm.revert();
    },

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
