import {
  gsap,
  mediaQueries,
  SplitText,
  ScrollSmoother,
  useGSAP,
} from "@/app/utils/gsap";
import frameImages from "@/app/utils/imageSequence";
import { ImageSequenceConfig } from "@/app/utils/types";

/** Custom hook to handle GSAP animations in hero-section in the Home page */
export const useHeroSection = (isRevealed: boolean) => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          /** handle animation of CTA buttons */
          const animateCTA = () => {
            const keyframes = isReduceMotion
              ? {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                }
              : {
                  "0%": { opacity: 0, scaleX: 0, scaleY: 0 },
                  "75%": { opacity: 1, scaleX: 1.2, scaleY: 1.2 },
                  "100%": { opacity: 1, scaleX: 1, scaleY: 1 },
                };
            gsap.to(".list-discover-button", {
              duration: 0.5,
              keyframes: keyframes,
              scrollTrigger: {
                trigger: ".list-discover-button",
                start: "top 95%",
              },
            });

            gsap.to(".list-about-me-button", {
              duration: 0.8,
              keyframes: keyframes,
              scrollTrigger: {
                trigger: ".list-about-me-button",
                start: "top 95%",
              },
            });
          };

          /** handle animation of SplitText */
          const animateSplitText = () => {
            document.fonts.ready.then(() => {
              // 1. Split the text
              const split_h1 = SplitText.create(".split-words", {
                type: "words",
                autoSplit: true,
              });

              // 2. Initialize Timeline
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: ".split-words",
                  start: "top 85%",
                },
              });

              // 3. Add Text Animation to Timeline
              if (isReduceMotion) {
                timeline.from(".split-words", {
                  y: 100,
                  autoAlpha: 0,
                  duration: 1,
                });
              } else {
                timeline
                  .from(split_h1.words, {
                    y: 100,
                    autoAlpha: 0,
                    stagger: {
                      amount: 1,
                      from: "random",
                      ease: "power4.in",
                    },
                  })
                  .from("#line", {
                    drawSVG: "100% 100%",
                    autoAlpha: 0,
                    duration: 1,
                    ease: "expo.out",
                    onComplete: () => split_h1.revert(),
                  });
              }
            });
          };

          animateCTA();
          animateSplitText();
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
};

export const useHeroImageSequence = (isRevealed: boolean) => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        // fetch and reapply ScrollSmoother
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.effects().forEach((t) => t.kill());
        smoother?.effects("[data-speed], [data-lag]");

        // gsap.matchMedia contitions
        const { isSmallScreen } = context.conditions ?? {};

        const canvas = document.getElementById("hero-canvas");
        canvas?.setAttribute("width", "500px");
        canvas?.setAttribute("height", "720px");

        const { placeholderImage, imageURLS, playhead, images } = frameImages();

        function imageSequence(config: ImageSequenceConfig) {
          const canvasElement = gsap.utils.toArray(
            config.canvas,
          )[0] as HTMLCanvasElement;
          const ctx = canvasElement.getContext("2d");

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

          // Map through URLs and create Image objects
          config.urls.forEach((url) => {
            const img = new Image();
            img.src = url;
            images.push(img);
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
          urls: imageURLS, // Array of image URLs
          canvas: "#hero-canvas",
          scrollTrigger: {
            trigger: "#hero-canvas",
            start: 0,
            end: isSmallScreen ? "bottom 90%" : "20% top",

            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );
};
