"use client";

import {
  gsap,
  useGSAP,
  mediaQueries,
  ScrollSmoother,
  ScrollTrigger,
} from "@utils/gsap";
import useNavigationCancellation from "@hooks/useNavigationCancellation";
import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";

export default function Canvas({ className }: { className: string }) {
  const { ref, inView } = useInView();
  const { signal } = useNavigationCancellation();

  const { placeholderImage, playhead, images } = frameImages;

  // to cache values of frameImages across render
  const frameImagesConfig = useMemo(() => {
    return { placeholderImage, playhead, images };
  }, [placeholderImage, playhead, images]);

  useGSAP(() => {
    if (!inView || signal.aborted) return;
    const mm = gsap.matchMedia();
    mm.add(mediaQueries, (context) => {
      if (signal.aborted) return;

      // fetch and reapply ScrollSmoother effects
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.effects().forEach((t) => t.kill());
      smoother?.effects("[data-speed], [data-lag]");

      ScrollTrigger.refresh();

      // gsap.matchMedia conditions
      const { isTabletScreen, isDesktopScreen } = context.conditions ?? {};

      const imageSequence = (config: ImageSequenceConfig) => {
        const canvasElements = gsap.utils.toArray(
          config.canvas,
        ) as HTMLCanvasElement[];

        const canvasElement = canvasElements[0];
        if (!canvasElement) return;

        const ctx = canvasElement.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        if (dpr === 1.5) canvasElement.style.scale = "0.7";
        if (isTabletScreen) canvasElement.style.scale = "0.9";
        if (isDesktopScreen) canvasElement.style.scale = "0.7";

        const updateImage = () => {
          if (signal.aborted) return;

          const currentImg =
            frameImagesConfig.images[
              Math.round(frameImagesConfig.playhead.frame)
            ];
          const placeholderX = (canvasElement.width - 625) / 2;
          const imageIsLoaded =
            currentImg?.complete && currentImg.naturalWidth > 0;

          ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);

          if (imageIsLoaded) {
            ctx!.filter = "blur(0px)";
            ctx!.drawImage(currentImg, placeholderX, 0, 625, 720);
          } else {
            // Keep a visible frame while the current image is loading.
            ctx!.filter = "blur(10px)";
            ctx!.drawImage(
              frameImagesConfig.placeholderImage,
              placeholderX,
              0,
              625,
              720,
            );

            // add text on canvas
            ctx!.filter = "blur(0px)";
            ctx!.fillStyle = "white";
            ctx!.font = "20px Arial";
            ctx!.textAlign = "center";
            ctx!.textBaseline = "middle";
            ctx!.fillText(
              "Loading Frame Image...",
              canvasElement.width / 2,
              canvasElement.height / 2,
            );
          }

          ctx!.filter = "blur(0px)";
        };

        // Draw placeholder immediately if cached, otherwise when it loads.
        const handlePlaceholderLoad = updateImage;
        const imageLoadHandlers = frameImagesConfig.images.map((img, i) => {
          const handleImageLoad = () => {
            if (signal.aborted) return;
            if (Math.floor(frameImagesConfig.playhead.frame) === i)
              updateImage();
          };

          return { img, handleImageLoad };
        });

        if (frameImagesConfig.placeholderImage.complete) {
          updateImage();
        } else {
          frameImagesConfig.placeholderImage.addEventListener(
            "load",
            handlePlaceholderLoad,
          );
        }

        imageLoadHandlers.forEach(({ img, handleImageLoad }) => {
          img.addEventListener("load", handleImageLoad);
        });

        updateImage();

        // The animation responsible for the frame animation
        const animation = gsap.to(frameImagesConfig.playhead, {
          frame: frameImagesConfig.images.length - 1,
          ease: "none",
          onUpdate: updateImage,
          scrollTrigger: config.scrollTrigger,
        });

        signal.addEventListener(
          "abort",
          () => {
            animation.kill();
            frameImagesConfig.placeholderImage.removeEventListener(
              "load",
              handlePlaceholderLoad,
            );
            imageLoadHandlers.forEach(({ img, handleImageLoad }) => {
              img.removeEventListener("load", handleImageLoad);
            });
          },
          { once: true },
        );

        return animation;
      };

      imageSequence({
        canvas: "#canvas",
        scrollTrigger: {
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
  }, [inView, signal]);

  return (
    <canvas
      ref={(el) => ref(el)}
      aria-label="Joshua Glenn R. Gulbin front-end developer"
      id="canvas"
      className={`hidden ${className}`}
      data-speed="0.5"
      width={650}
      height={720}
    ></canvas>
  );
}
