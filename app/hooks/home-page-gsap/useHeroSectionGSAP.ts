import {
  gsap,
  mediaQueries,
  SplitText,
  ScrollSmoother,
} from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";

/** Custom hook to handle GSAP animations in hero-section in the Home page */
export default function useHeroSectionGSAP(windowSize: number) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const smoother = ScrollSmoother.get();
          if (smoother) smoother.effects().forEach((t) => t.kill());
          smoother?.effects("[data-speed], [data-lag]");

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
              const split_h1 = SplitText.create(".split-words", {
                type: "words",
                autoSplit: true,
              });

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: ".split-words",
                  start: "top 85%",
                },
              });

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

          /** handle animation of hero image */
          const scrollableHeroImage = () => {
            const frameCount = 47;
            const imageURLS = new Array(frameCount)
              .fill(0)
              .map((o, i) => `/home-page/home-page_${i + 1}.png`);
            const canvas = document.getElementById("hero-canvas");
            canvas?.setAttribute("width", "600px");
            canvas?.setAttribute("height", "1200px");

            interface ImageSequenceConfig {
              urls: string[];
              canvas: string | HTMLCanvasElement;
              scrollTrigger: gsap.plugins.ScrollTrigger["Vars"];
              onUpdate?: () => void;
            }

            function imageSequence(config: ImageSequenceConfig) {
              const playhead = { frame: 0 };
              const canvasElement = gsap.utils.toArray(
                config.canvas,
              )[0] as HTMLCanvasElement;
              const ctx = canvasElement.getContext("2d");
              const onUpdate = config.onUpdate;
              const updateImage = () => {
                ctx!.clearRect(0, 0, 600, 1200);

                ctx!.drawImage(images[Math.round(playhead.frame)], -350, 0);
                if (onUpdate) {
                  onUpdate();
                }
              };
              const images: HTMLImageElement[] = config.urls.map((url, i) => {
                const img = new Image();
                img.src = url;
                if (i === 0) {
                  img.onload = updateImage;
                }
                return img;
              });

              return gsap.to(playhead, {
                frame: images.length - 1,
                ease: "none",
                onUpdate: updateImage,
                scrollTrigger: config.scrollTrigger,
              });
            }
            imageSequence({
              urls: imageURLS, // Array of image URLs
              canvas: "#hero-canvas", // <canvas> object to draw images to
              scrollTrigger: {
                trigger: "#hero-canvas",
                start: "top center",
                end: "bottom 90%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          };

          animateCTA();
          animateSplitText();
          scrollableHeroImage();
        },
      );
    },

    { dependencies: [windowSize], revertOnUpdate: true },
  );
}
