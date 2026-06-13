"use client";

import { gsap, useGSAP, SplitText, mediaQueries } from "@utils/gsap";
import { useRef } from "react";

export default function HeroSplitScramblerText({
  className,
  revealText,
  initialText,
}: {
  className?: string;
  revealText: string;
  initialText: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(mediaQueries, (context) => {
      if (!containerRef.current) return;
      const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};
      const scramblePool = "▂▚ ▗▐▝"; // hacker effect characters

      const initialGibberishDelay = 1.5;
      const staggerSpacing = 0.08;
      if (isTabletScreen || isDesktopScreen) {
        gsap.delayedCall(initialGibberishDelay, () => {
          if (!containerRef.current) return;
          containerRef.current.innerText = revealText;
          const split = new SplitText(containerRef.current, {
            type: "chars,words,lines",
            mask: "lines",
          });
          const chars = split.chars;

          chars.forEach((el, index) => {
            const charEl = el as HTMLElement;
            const originalText = charEl.innerText;

            if (originalText.trim() === "") return;

            const state = { cycles: 0 };
            const maxCycles = 15;

            gsap.to(state, {
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
              },
              immediateRender: true,
              cycles: maxCycles,
              duration: 3 * staggerSpacing, // Exactly 3 characters scrambling ahead at a time (0.2s)
              delay: index * staggerSpacing,
              ease: "none",
              snap: "cycles",
              onStart: () => {
                charEl.innerText =
                  scramblePool[Math.floor(Math.random() * scramblePool.length)];
              },
              onUpdate: () => {
                // Continually flip symbols throughout the tween
                charEl.innerText =
                  scramblePool[Math.floor(Math.random() * scramblePool.length)];
              },
              onComplete: () => {
                // Guarantees clean execution when the animation successfully finishes
                charEl.innerText = originalText;
                charEl.classList.add("text-secondary-red");
              },
            });
          });
        });
      }
    });
  }, []);

  return (
    <>
      <span
        ref={containerRef}
        aria-hidden
        className={`absolute hidden max-h-12.5 w-full overflow-hidden text-pretty text-secondary-orange tablet:top-0 tablet:left-0 tablet:flex tablet:gap-1 desktop:max-h-6.25 ${className}`}
      >
        {initialText}
      </span>
      <span
        aria-hidden
        className={`relative block text-secondary-red tablet:hidden ${className}`}
      >
        {revealText}
      </span>
      <span className="sr-only">{revealText}</span>
    </>
  );
}
