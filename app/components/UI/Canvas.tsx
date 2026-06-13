"use client";

import {
  gsap,
  useGSAP,
  mediaQueries,
  ScrollSmoother,
  ScrollTrigger,
} from "@utils/gsap";
import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";
import { useInView } from "react-intersection-observer";

export default function Canvas({ className }: { className: string }) {
  const { ref, inView } = useInView();

  useGSAP(() => {
    if (!inView) return;
    const mm = gsap.matchMedia();
    mm.add(mediaQueries, (context) => {
      // fetch and reapply ScrollSmoother effects
      const smoother = ScrollSmoother.get();
      console.log(smoother);
      if (smoother) smoother.effects().forEach((t) => t.kill());
      smoother?.effects("[data-speed], [data-lag]");

      ScrollTrigger.refresh();

      // gsap.matchMedia conditions
      const { isTabletScreen, isDesktopScreen } = context.conditions ?? {};

      const { placeholderImage, playhead, images, eclipse } = frameImages;

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

        // Create an offscreen canvas to handle the composite mask cleanly.
        const offscreenCanvas = document.createElement("canvas");
        const offscreenCtx = offscreenCanvas.getContext("2d");

        // Sync offscreen dimensions to match your updated 650x720 canvas
        offscreenCanvas.width = canvasElement.width;
        offscreenCanvas.height = canvasElement.height;

        const renderPopOutLayers = (targetImg: HTMLImageElement) => {
          if (!ctx || !offscreenCtx) return;

          // Clear both canvases for the current render frame
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          offscreenCtx.clearRect(
            0,
            0,
            offscreenCanvas.width,
            offscreenCanvas.height,
          );

          // 1. DIMENSION & CENTERING CONFIGURATION (650x720 Canvas)
          const imgW = 420;
          const imgH = 720;
          const imgX = (canvasElement.width - imgW) / 2; // Exactly 115px
          const imgY = 0;

          // Eclipse asset scales to your fixed parameters
          const shapeW = 636;
          const shapeH = 624;
          const shapeX = (canvasElement.width - shapeW) / 2; // Exactly 7px
          const shapeY = canvasElement.height - shapeH; // Exactly 96px

          // This is the Y coordinate where your character pops out of the shape.
          // Adjust this number up or down to change where the unclipped top meets the masked bottom.
          const overflowCutoffY = 350;

          // 2. DRAW MASKED BOTTOM ZONE (Combining background + masked character)
          // LAYER A: Draw the eclipse shape as the solid background first
          offscreenCtx.drawImage(eclipse, shapeX, shapeY, shapeW, shapeH);

          // LAYER B: Draw the clipped character on top of the background
          offscreenCtx.save();
          offscreenCtx.globalCompositeOperation = "source-atop";
          offscreenCtx.drawImage(targetImg, imgX, imgY, imgW, imgH);
          offscreenCtx.restore();

          // Render the combined background + bottom clipped sequence back to the real canvas
          ctx.drawImage(offscreenCanvas, 0, 0);

          // 3. LAYER 1 (TOP OVERFLOW): DRAW THE UNCLIPPED OVERFLOWING PORTION
          ctx.save();
          ctx.beginPath();

          // Restricts the unclipped image drawing region up to your cutoff mark.
          // This keeps the unclipped legs from overlapping your crisp eclipse composite structure below.
          ctx.rect(imgX, 0, imgW, overflowCutoffY);
          ctx.clip();

          // Paint the unclipped top half
          ctx.drawImage(targetImg, imgX, imgY, imgW, imgH);
          ctx.restore();
        };

        const updateImage = () => {
          const currentImg = images[Math.round(playhead.frame)];
          const placeholderX = (canvasElement.width - 420) / 2;

          // Draw the placeholderImage with blur filter while the current frame still loads
          if (currentImg && !currentImg.complete) {
            ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx!.filter = "blur(10px)";
            ctx!.drawImage(placeholderImage, placeholderX, 0, 420, 720);

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
          // Only draw if the image is actually loaded/exists
          else if (currentImg && currentImg.complete) {
            ctx!.filter = "blur(0px)";
            renderPopOutLayers(currentImg);
          }
        };

        // Draw placeholder immediately if cached, otherwise on load
        if (placeholderImage.complete) {
          updateImage();
        } else {
          placeholderImage.onload = updateImage;
        }

        // Monitor if the eclipse background element loading triggers post-initialization
        if (!eclipse.complete) {
          eclipse.onload = updateImage;
        }

        images.forEach((img, i) => {
          img.onload = () => {
            if (Math.floor(playhead.frame) === i) updateImage();
          };
        });

        updateImage();

        // The animation responsible for the frame animation
        return gsap.to(playhead, {
          frame: images.length - 1,
          ease: "none",
          onUpdate: updateImage,
          scrollTrigger: config.scrollTrigger,
        });
      };

      imageSequence({
        canvas: "#canvas",
        scrollTrigger: {
          trigger: "#canvas",
          start: isDesktopScreen
            ? "top+=50 top"
            : isTabletScreen
              ? "top-=100 top"
              : "top 60%",
          end: isTabletScreen ? "bottom 90%" : "20% top",
          scrub: true,
        },
      });
    });
  }, [inView]);

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
