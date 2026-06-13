"use client";

/**
 * This file is used to import all the Gsap plugins and Gsap itself once,
 * register all the plugins at once and export it to be used across the project.
 * This is done to avoid importing and registering the plugins in each component.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import {
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  ScrollSmoother,
  MotionPathPlugin,
  ScrambleTextPlugin,
  Observer,
} from "gsap/all";

/**
 * Registers all the Gsap plugins at once.
 */
gsap.registerPlugin(
  SplitText,
  ScrollTrigger,
  DrawSVGPlugin,
  ScrollSmoother,
  MotionPathPlugin,
  ScrambleTextPlugin,
  Observer,
);

ScrollTrigger.defaults({
  toggleActions: "play none none none",
});

/**
 * Exports all the Gsap plugins and Gsap itself to be used across the project.
 */
export {
  gsap,
  SplitText,
  ScrollTrigger,
  ScrollSmoother,
  MotionPathPlugin,
  useGSAP,
  ScrambleTextPlugin,
  Observer,
};

/** Media query conditions used for responsive animation with GSAP matchMedia  */
export const mediaQueries = {
  isMobileScreen: "(max-width: 480px)",
  isTabletScreen: "(min-width: 768px) and (max-width: 1024px)",
  isDesktopScreen: "(min-width: 1024px)",
  isReduceMotion: "(prefers-reduced-motion: reduce)",
};
