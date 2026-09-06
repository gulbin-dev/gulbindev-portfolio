"use client";

import { gsap, useGSAP, SplitText, mediaQueries } from "@utils/gsap";
import { useRef } from "react";
import useNavigationCancellation from "@hooks/useNavigationCancellation";

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
  const { isCancelled, signal } = useNavigationCancellation();

  useGSAP(() => {
    if (isCancelled) return;
    const mm = gsap.matchMedia();

    mm.add(mediaQueries, (context) => {
      if (!containerRef.current) return;
      const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};
      const scramblePool = "▂▚ ▗▐▝";

      const initialGibberishDelay = 1.5;
      const staggerSpacing = 0.08;

      if (isTabletScreen || isDesktopScreen) {
        gsap.delayedCall(initialGibberishDelay, () => {
          const container = containerRef.current;
          if (!container) return;

          // 1. Single DOM mutation setup pass
          container.innerText = revealText;
          const split = new SplitText(container, {
            type: "chars,words,lines",
            mask: "lines",
          });

          const chars = split.chars as HTMLElement[];
          if (!chars.length) return;

          // Save the target text data structure in memory to avoid DOM reading
          const charData = chars.map((el) => ({
            el,
            original: el.textContent || "",
            isSpace: (el.textContent || "").trim() === "",
          }));

          // 2. Centralized Proxy Object: Holds the animation values for the entire text block
          const proxy = { progress: 0 };
          const totalChars = chars.length;

          // 3. One single ScrollTrigger to rule all characters instead of totalChars triggers
          gsap.to(proxy, {
            scrollTrigger: {
              trigger: container,
              start: "top center",
              end: "bottom center",
            },
            progress: totalChars,
            duration: totalChars * staggerSpacing,
            ease: "none",
            onUpdate: () => {
              // BATCHED DOM WRITING LAYER: Iterates through memory arrays, avoiding layout thrashing
              const currentProgress = proxy.progress;

              for (let i = 0; i < totalChars; i++) {
                const item = charData[i];
                if (item.isSpace) continue;

                if (currentProgress >= i + 3) {
                  // Fully revealed state: execute once per character pass
                  if (item.el.textContent !== item.original) {
                    item.el.textContent = item.original;
                    item.el.classList.add("text-secondary-red");
                  }
                } else if (currentProgress >= i) {
                  // Scrambling state window
                  item.el.textContent =
                    scramblePool[
                      Math.floor(Math.random() * scramblePool.length)
                    ];
                } else {
                  // Not yet reached state
                  if (item.el.textContent !== "") {
                    item.el.textContent = "";
                  }
                }
              }
            },
            onComplete: () => {
              // Global fallback guarantee check
              charData.forEach((item) => {
                if (!item.isSpace) {
                  item.el.textContent = item.original;
                  item.el.classList.add("text-secondary-red");
                }
              });
            },
          });
        });
      }
    });
  }, [signal]);

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
