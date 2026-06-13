"use client";

import Card from "@components/UI/Card";
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
          gsap.to(".card", {
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
      className="my-6 w-fit overflow-hidden tablet:col-start-3 tablet:col-end-7 tablet:row-span-4 tablet:row-start-3 tablet:mb-0"
    >
      <Card className="card max-w-60 flex-col gap-1.5 tablet:mt-0 tablet:max-w-45 tablet:-translate-x-full">
        <h3>Frontend Website</h3>
        <p>
          I can build website from a Figma design or any other design tools with
          pixel perfect website UI implementations.
        </p>
      </Card>
    </div>
  );
}
