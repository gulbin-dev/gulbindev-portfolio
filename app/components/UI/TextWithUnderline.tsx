"use client";
import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useGSAP, gsap } from "@utils/gsap";

export default function TextWithUnderline({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
    triggerOnce: true,
  });

  useGSAP(
    () => {
      if (!inView || !containerRef.current) return;

      // Find the direct animated child inside THIS component instance scope only
      const targetElement =
        containerRef.current.querySelector(".animate-underline");
      if (!targetElement) return;

      gsap.to(targetElement, {
        "--scaleX": 1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".animate-underline",
          start: "top center",
          end: "bottom+=100 center",
        },
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
      className="inline-block" // Prevents the block div from taking 100% width if wrapped tightly
    >
      <style>{`
        @property --scaleX {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
      `}</style>
      {children}
    </div>
  );
}
