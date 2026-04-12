"use cleint";
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
  MorphSVGPlugin,
  ScrollSmoother,
  GSDevTools,
  MotionPathPlugin,
  MotionPathHelper,
  CustomEase,
  ScrambleTextPlugin,
} from "gsap/all";

/**
 * Registers all the Gsap plugins at once.
 */
gsap.registerPlugin(
  SplitText,
  ScrollTrigger,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrollSmoother,
  GSDevTools,
  MotionPathPlugin,
  MotionPathHelper,
  CustomEase,
  ScrambleTextPlugin,
);

/**
 * Exports all the Gsap plugins and Gsap itself to be used across the project.
 */
export {
  gsap,
  SplitText,
  ScrollTrigger,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrollSmoother,
  GSDevTools,
  useGSAP,
  MotionPathPlugin,
  MotionPathHelper,
  CustomEase,
  ScrambleTextPlugin,
};

/** Media query conditions used for responsive animation with GSAP matchMedia  */
export const mediaQueries = {
  isSmallScreen: "(max-width: 480px)",
  isMediumScreen: "(min-width: 768px) and (max-width: 1023px)",
  isLargeScreen: "(min-width: 1024px)",
  isReduceMotion: "(prefers-reduced-motion: reduce)",
};
