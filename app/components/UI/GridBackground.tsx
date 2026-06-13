"use client";

import { gsap, mediaQueries, useGSAP } from "@utils/gsap";
import { useRef } from "react";

export default function GridBackground({ className }: { className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};
        if (isTabletScreen || isDesktopScreen) {
          const container = containerRef.current as HTMLDivElement;

          // 1. Set initial CSS variable positions
          gsap.set(container, { "--mouse-x": 0, "--mouse-y": 0 });

          // 2. GSAP quickTo smoothly animates the CSS variables for the trailing lag effect
          const xQuickTo = gsap.quickTo(container, "--mouse-x", {
            duration: 0.5,
            ease: "power3.out",
          });

          const yQuickTo = gsap.quickTo(container, "--mouse-y", {
            duration: 0.5,
            ease: "power3.out",
          });

          const handleMouseMove = (e: MouseEvent) => {
            // Pass raw coordinates directly into the smooth GSAP tweens
            xQuickTo(e.clientX);
            yQuickTo(e.clientY);
          };

          window.addEventListener("mousemove", handleMouseMove);

          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }
      });
    },
    { scope: containerRef },
  );

  // Clean CSS template for the 50px grid squares
  const gridLayoutCSS = {
    backgroundSize: "50px 50px",
    backgroundColor: "var(--color-primary)",
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 h-[110dvh] -translate-x-1 overflow-hidden bg-primary ${className}`}
    >
      {/* LAYER 1: The Dim Base Grid (Default 'dead' state from your original code) */}
      <div
        className="border-color-secondary-orange-dead absolute inset-0 border-t border-l opacity-40"
        style={{
          ...gridLayoutCSS,
          backgroundImage: `
            linear-gradient(to right, var(--color-secondary-orange-dead) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-secondary-orange-dead) 1px, transparent 1px)
          `,
        }}
      />

      {/* LAYER 2: The Glowing Grid (Revealed in a perfect circle around the trailed mouse position) */}
      <div
        className="absolute inset-0 hidden border-t border-l border-secondary-orange tablet:block"
        style={{
          ...gridLayoutCSS,
          // Bright grid lines and a subtle inner glow color
          backgroundImage: `
            linear-gradient(to right, var(--color-secondary-orange) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-secondary-orange) 1px, transparent 1px)
          `,

          // CSS MASK: Creates a perfect 150px circle that cuts through the grid smoothly with zero pixelation
          maskImage: `radial-gradient(circle 150px at calc(var(--mouse-x) * 1px) calc(var(--mouse-y) * 1px), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at calc(var(--mouse-x) * 1px) calc(var(--mouse-y) * 1px), black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
