import { useLoading } from "@utils/LoadingContext";
import { gsap, mediaQueries, useGSAP, ScrollSmoother } from "@utils/gsap";
import { frameImages } from "@utils/imageSequence";
import { ImageSequenceConfig } from "@utils/types";

export default function AboutCanvas() {
  const { isRevealed } = useLoading();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          // fetch and reapply ScrollSmoother effects
          const smoother = ScrollSmoother.get();
          if (smoother) smoother.effects().forEach((t) => t.kill());
          smoother?.effects("[data-speed], [data-lag]");

          // gsap.matchMedia contitions
          const {
            isMobilePortraitScreen,
            isTabletPortraitScreen,
            isDesktopScreen,
          } = context.conditions ?? {};

          const canvas = document?.getElementById("about-canvas");
          canvas?.setAttribute("width", "420px");
          canvas?.setAttribute("height", "720px");

          const { placeholderImage, playhead, images } = frameImages;

          function imageSequence(config: ImageSequenceConfig) {
            const canvasElement = gsap.utils.toArray(
              config.canvas,
            )[0] as HTMLCanvasElement;
            const ctx = canvasElement.getContext("2d");
            if (isMobilePortraitScreen) ctx?.scale(1, 1);
            else if (isTabletPortraitScreen) ctx?.scale(0.6, 0.6);
            else if (isDesktopScreen) ctx?.scale(0.7, 0.7);

            const updateImage = () => {
              const currentImg = images[Math.round(playhead.frame)];
              // draw the placeholderImage with blur filter while the current frame still loads
              if (currentImg && !currentImg.complete) {
                ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx!.filter = "blur(10px)";
                ctx!.drawImage(placeholderImage, 0, 0);
                // Only draw if the image is actually loaded/exists
              } else if (currentImg && currentImg.complete) {
                ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx!.filter = "blur(0px)";
                ctx!.drawImage(currentImg, 0, 0);
              }
            };

            images.forEach((img, i) => {
              img.onload = () => {
                if (Math.floor(playhead.frame) === i) updateImage();
              };
            });

            // the animation responsible for the frame animation
            return gsap.to(playhead, {
              frame: images.length - 1,
              ease: "steps(46)",
              onUpdate: updateImage,
              immediateRender: true,
              scrollTrigger: config.scrollTrigger,
            });
          }
          imageSequence({
            canvas: "#about-canvas",
            scrollTrigger: {
              trigger: "#about-canvas",
              start: 0,
              end: isMobilePortraitScreen ? "top top" : "bottom+=500 90%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  return (
    <canvas
      id="about-canvas"
      className="absolute left-3 top-20 tablet-portrait:top-12"
    ></canvas>
  );
}
