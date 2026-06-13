"use client";

import React from "react";
import {
  gsap,
  mediaQueries,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
} from "@utils/gsap";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A client wrapper component that handles GSAP SmoothScroll
 *
 * To prevent the entire page to wrap as client component
 * @param param0 these are page route and Footer component
 */

export default function PagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // store browser path url

  // animation fo scroll smooth
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      // media queries conditions giving a responsive animation
      // based on screen size and reduce motion
      mediaQueries,
      (context) => {
        const { isMobilePortraitScreen } = context.conditions ?? {};
        ScrollSmoother.create({
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
          speed: isMobilePortraitScreen ? 1 : 0.5,
        });
      },
    );
  }, []);

  // reset scroll position per navigation
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
      ScrollTrigger.refresh();
    }
  }, [pathname, children]);

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        className="bg-primary-color-darker content-wrapper"
      >
        <main className="flex flex-col items-center bg-primary pt-12 text-foreground-white">
          {children}
        </main>
      </div>
    </div>
  );
}
