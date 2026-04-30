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
 * A wrapper component that helps implement the SmoothScroll from GSAP.
 * This component will render a div with an id of "smooth-wrapper" and
 * another div with an id of "smooth-content" inside it. The content
 * of the wrapped component will be rendered inside the "smooth-content"
 * div.
 */

export default function PagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
      ScrollTrigger.refresh();
    }
  }, [pathname, children]);

  return (
    <div id="smooth-wrapper" className="max-h-screen! overflow-hidden!">
      <div
        id="smooth-content"
        className="bg-primary-color-darker min-h-screen! content-wrapper"
      >
        {children}
      </div>
    </div>
  );
}
