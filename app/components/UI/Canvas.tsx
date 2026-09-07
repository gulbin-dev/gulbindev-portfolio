"use client";

import { gsap, useGSAP, mediaQueries, ScrollSmoother } from "@utils/gsap";
import useNavigationCancellation from "@hooks/useNavigationCancellation";
import {
  frameImages,
  subscribeToFrameLoads,
  startPreloading,
  clearFrameImages,
} from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Canvas({ className }: { className: string }) {
  const { ref, inView } = useInView();
  const { isCancelled, signal } = useNavigationCancellation();

  // Track the actual number of individual images successfully loaded across the wire
  const [loadedCount, setLoadedCount] = useState(0);

  // A mutable pointer to manually execute repaints outside of GSAP execution blocks
  const triggerRepaintRef = useRef<() => void>(() => {});

  // Orchestrate worker loading pipelines and component lifecycle subscription
  useEffect(() => {
    // Skip completely if running on a mobile viewport (< 768px)
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 768px)").matches
    ) {
      return;
    }

    // Lazy trigger the worker background downloading thread safely on mount
    startPreloading();

    const unsubscribe = subscribeToFrameLoads((count) => {
      setLoadedCount(count);
      // If an asset arrives while a user is idling or stalling on Slow 4G, paint it immediately
      if (triggerRepaintRef.current) {
        triggerRepaintRef.current();
      }
    });

    return () => {
      unsubscribe();
      // Wipes memory references from the GPU texture registry to avoid Next.js route memory leaks
      clearFrameImages();
    };
  }, []);

  useGSAP(
    () => {
      // We check loadedCount > 0 instead of length to confirm bitmaps are ready to draw
      if (!inView || isCancelled || loadedCount === 0) return;

      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        if (isCancelled) return;

        // Fetch and reapply ScrollSmoother effects
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.effects().forEach((t) => t.kill());
        smoother?.effects("[data-speed], [data-lag]");

        const { isTabletScreen, isDesktopScreen } = context.conditions ?? {};

        const imageSequence = (config: ImageSequenceConfig) => {
          const canvasElements = gsap.utils.toArray(
            config.canvas,
          ) as HTMLCanvasElement[];
          const canvasElement = canvasElements[0]; // Fixed: Extract the first canvas element node safely
          if (!canvasElement) return;

          const ctx = canvasElement.getContext("2d");
          if (!ctx) return;

          // --- BATCHED DOM READS & CONSTANTS ---
          // Read width and height once. Cache them to eliminate DOM Layout Thrashing on scroll.
          const cWidth = canvasElement.width;
          const cHeight = canvasElement.height;
          const placeholderX = (cWidth - 625) / 2;
          const centerX = cWidth / 2;
          const centerY = cHeight / 2;

          // --- ONE-TIME CANVAS STATE SETTINGS ---
          // Batch baseline context settings so they aren't redundantly re-applied every frame
          ctx.filter = "blur(0px)";
          ctx.fillStyle = "white";
          ctx.font = "20px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const updateImage = () => {
            if (isCancelled) return;

            const targetIndex = Math.round(frameImages.playhead.frame);

            let displayImg: ImageBitmap | null = null;
            const currentImg = frameImages.images[targetIndex];

            // An ImageBitmap object only exists in our array if it is fully decoded and ready
            if (currentImg) {
              displayImg = currentImg;
            } else {
              // fallback: search backward for the closest loaded frame to maintain animation progress
              for (let i = targetIndex - 1; i >= 0; i--) {
                if (frameImages.images[i]) {
                  displayImg = frameImages.images[i];
                  break;
                }
              }
            }

            // --- BATCHED WRITES (CLEAR & RENDER) ---
            // Use local memory coordinates instead of DOM reads
            ctx.clearRect(0, 0, cWidth, cHeight);

            if (displayImg) {
              // ImageBitmaps clear and draw natively faster than DOM images
              ctx.drawImage(displayImg, placeholderX, 0, 625, 720);

              if (loadedCount < 47) {
                ctx.fillText(
                  `Loading Images [${loadedCount}/47]`,
                  centerX,
                  centerY,
                );
              }
            } else {
              // absolute fallback: show placeholder info while loading frame 0 over the wire
              ctx.fillText(
                `Initializing Sequence (${loadedCount}/47)...`,
                centerX,
                centerY,
              );
            }
          };

          // Attach current renderer pointer instance to the trigger ref
          triggerRepaintRef.current = updateImage;

          // Paint immediately when component loads
          updateImage();

          const animation = gsap.to(frameImages.playhead, {
            frame: 46,
            ease: "none",
            onUpdate: updateImage,
            scrollTrigger: config.scrollTrigger,
          });

          signal.addEventListener(
            "abort",
            () => {
              animation.kill();
              triggerRepaintRef.current = () => {};
            },
            { once: true },
          );

          return animation;
        };

        imageSequence({
          canvas: "#canvas",
          scrollTrigger: {
            id: "canvas",
            trigger: "#canvas",
            start: isDesktopScreen
              ? "top-=150 top"
              : isTabletScreen
                ? "top-=100 top"
                : "top 60%",
            end: isTabletScreen ? "bottom 90%" : "20% top",
            scrub: true,
          },
        });
      });
    },
    { dependencies: [inView, signal, loadedCount] },
  );

  return (
    <canvas
      ref={ref}
      aria-label="Joshua Glenn R. Gulbin front-end developer"
      id="canvas"
      className={`hidden ${className}`}
      data-speed="0.5"
      width={650}
      height={720}
    ></canvas>
  );
}
