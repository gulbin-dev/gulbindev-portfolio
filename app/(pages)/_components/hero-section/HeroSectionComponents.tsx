import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";
import { gsap, mediaQueries, ScrollSmoother, useGSAP } from "@utils/gsap";

export function Canvas() {
  // image sequence animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        // fetch and reapply ScrollSmoother effects
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.effects().forEach((t) => t.kill());
        smoother?.effects("[data-speed], [data-lag]");

        // gsap.matchMedia contitions
        const { isMobilePortraitScreen } = context.conditions ?? {};

        const { placeholderImage, playhead, images } = frameImages;

        const imageSequence = (config: ImageSequenceConfig) => {
          const canvasElement = gsap.utils.toArray(
            config.canvas,
          )[0] as HTMLCanvasElement;
          const ctx = canvasElement.getContext("2d");
          if (!isMobilePortraitScreen) {
            canvasElement.style.scale = "0.7";
          } else {
            canvasElement.style.scale = "1";
          }
          const updateImage = () => {
            const currentImg = images[Math.round(playhead.frame)];
            const x = (canvasElement.width - placeholderImage.width) / 2;
            // draw the placeholderImage with blur filter while the current frame still loads
            if (currentImg && !currentImg.complete) {
              ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
              ctx!.filter = "blur(10px)";

              ctx!.drawImage(placeholderImage, x, 0);

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
              ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
              ctx!.filter = "blur(0px)";
              ctx!.drawImage(currentImg, x, 0);
            }
          };

          // Draw placeholder immediately if cached, otherwise on load
          if (placeholderImage.complete) {
            updateImage();
          } else {
            placeholderImage.onload = updateImage;
          }

          images.forEach((img, i) => {
            img.onload = () => {
              if (Math.floor(playhead.frame) === i) updateImage();
            };
          });

          updateImage();

          // the animation responsible for the frame animation
          return gsap.to(playhead, {
            frame: images.length - 1,
            ease: "none",
            onUpdate: updateImage,
            scrollTrigger: config.scrollTrigger,
          });
        };

        imageSequence({
          canvas: "#hero-canvas",
          scrollTrigger: {
            trigger: "#hero-canvas",
            start: isMobilePortraitScreen ? "top 60%" : "top-=200 top",
            id: "hero-canvas-scroll",
            end: isMobilePortraitScreen ? "bottom 90%" : "20% top",
            scrub: true,
          },
        });
      });
    },
    { dependencies: [] },
  );

  return (
    <canvas
      id="hero-canvas"
      className="absolute tablet-portrait:max-w-none top-25 mobile-landscape:left-1/2 mobile-landscape:-translate-x-1/2! tablet-portrait:left-0 tablet-portrait:top-0 tablet-portrait:translate-x-0! "
      data-speed="0.5"
      width={420}
      height={720}
    ></canvas>
  );
}
