"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@utils/gsap";
import { useInView } from "react-intersection-observer";

export default function CardScrollProgress({
  className,
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 500px 0px",
    triggerOnce: true,
  });
  useGSAP(
    () => {
      if (!inView) return;
      ScrollTrigger.refresh();
      const circle = gsap.to("#circleTarget", {
        motionPath: {
          path: "#path",
          align: "#path",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        transformOrigin: "50% 50%",
        ease: "none",
      });

      ScrollTrigger.create({
        animation: circle,
        trigger: svgRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        anticipatePin: 1,
      });
    },
    { dependencies: [inView], scope: svgRef },
  );

  return (
    <>
      <svg
        ref={(el) => {
          svgRef.current = el;
          ref(el);
        }}
        id="motionPath"
        viewBox="0 0 82 190"
        className={`absolute top-0 left-0 overflow-visible ${className || ""}`}
        width={82}
        height={190}
      >
        <path
          id="path"
          fill="none"
          stroke="var(--color-secondary-orange)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.537,1.883C1.008,1.901,1.677,0.0,1.677,0.0L0.5,166C0.5,179.255,13.745,190,24.5,190L82,190"
        />
        <circle
          id="circleTarget"
          cx="0"
          cy="0"
          r="24"
          fill="var(--color-secondary-orange)"
          className="drop-shadow-[0px_0px_25px_var(--color-secondary-orange)]"
        />
      </svg>
    </>
  );
}
