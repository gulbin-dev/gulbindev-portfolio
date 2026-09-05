"use client";

import { useInView } from "react-intersection-observer";
import { gsap, useGSAP, mediaQueries } from "@utils/gsap";
import { useRef } from "react";

export default function Frontend() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 600px 0px",
    triggerOnce: true,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};
        if (isTabletScreen || isDesktopScreen) {
          gsap.to(".text", {
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 60%",
            },
          });
        }
      });
    },
    { dependencies: [inView], scope: containerRef },
  );
  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="my-6 w-fit overflow-hidden tablet:col-start-1 tablet:col-end-4 tablet:row-span-4 tablet:row-start-3 tablet:mb-0 desktop:col-start-3 desktop:row-start-4 med-desktop:col-end-6"
    >
      <div className="text">
        <h3>Frontend Website</h3>
        <p>
          I can build website from a Figma design or any other design tools with
          pixel perfect website UI implementations.
        </p>
      </div>
    </div>
  );
}
