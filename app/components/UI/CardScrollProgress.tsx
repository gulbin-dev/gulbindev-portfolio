"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@utils/gsap";
import { useInView } from "react-intersection-observer";

// Centralized state registry to manage active instances smoothly
const activeRegistry = {
  circle: null as SVGCircleElement | null,
  trigger: null as ScrollTrigger | null,
};

export default function CardScrollProgress({
  className,
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  // Store animation and trigger instances to prevent recreation
  const animationRef = useRef<ReturnType<typeof gsap.to> | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isInitializedRef = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 500px 0px",
    triggerOnce: false, // Changed to false so we can detect when it leaves view
  });

  useGSAP(
    () => {
      if (!inView || isInitializedRef.current) return;

      const path = pathRef.current;
      const target = circleRef.current;
      if (!path || !target) return;

      // 1. Initialize hidden target in a single render batch
      gsap.set(target, { autoAlpha: 0 });

      // 2. Create the timeline animation ONCE and store it
      animationRef.current = gsap.to(target, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        transformOrigin: "50% 50%",
        ease: "none",
        paused: true,
      });

      // 3. Setup ScrollTrigger ONCE and store it
      scrollTriggerRef.current = ScrollTrigger.create({
        animation: animationRef.current,
        trigger: svgRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        anticipatePin: 1,
        onToggle: (self) => {
          // Use ScrollTrigger.generateStyles or core animations inside context to batch reads/writes
          if (self.isActive) {
            // If another instance is active, hide it instantly before showing this one
            if (activeRegistry.circle && activeRegistry.circle !== target) {
              gsap.set(activeRegistry.circle, { autoAlpha: 0 });
            }
            if (activeRegistry.trigger && activeRegistry.trigger !== self) {
              activeRegistry.trigger.animation?.pause();
            }

            // Set new active instance
            activeRegistry.circle = target;
            activeRegistry.trigger = self;
            gsap.set(target, { autoAlpha: 1 });
          } else if (activeRegistry.trigger === self) {
            // Clean up registry if leaving active state
            gsap.set(target, { autoAlpha: 0 });
            activeRegistry.circle = null;
            activeRegistry.trigger = null;
          }
        },
      });

      isInitializedRef.current = true;
    },
    { dependencies: [inView], scope: svgRef },
  );

  // Cleanup function to remove animation and trigger when component unmounts
  useEffect(() => {
    const currentCircle = circleRef.current;
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Clean up registry if this was the active instance
      if (activeRegistry.circle === currentCircle) {
        activeRegistry.circle = null;
        activeRegistry.trigger = null;
      }
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <svg
      ref={(el) => {
        svgRef.current = el;
        ref(el); // Intersection observer hook assignment
      }}
      id="motionPath"
      viewBox="0 0 82 190"
      className={`absolute top-0 left-0 overflow-visible ${className || ""}`}
      width={82}
      height={190}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="var(--color-secondary-orange)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.537,1.883C1.008,1.901,1.677,0.0,1.677,0.0L0.5,166C0.5,179.255,13.745,190,24.5,190L82,190"
      />
      <circle
        ref={circleRef}
        cx="0"
        cy="0"
        r="24"
        fill="var(--color-secondary-orange)"
        className="drop-shadow-[0px_0px_25px_var(--color-secondary-orange)]"
      />
    </svg>
  );
}
