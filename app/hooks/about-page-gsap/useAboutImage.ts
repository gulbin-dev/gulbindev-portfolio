import { gsap, mediaQueries, useGSAP } from "@utils/gsap/gsap";
import useWindowSizeListener from "../useWindowSizeListener";

/** Custom hook to handle GSAP animations in the About page */
export default function useAboutImage() {
  const resizeKey = useWindowSizeListener();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isSmallScreen } = context.conditions ?? {};

          const scrollableHeroImage = () => {
            const frameCount = 47;
            const imageURLS = new Array(frameCount)
              .fill(0)
              .map((o, i) => `/home-page/home-page_${i + 1}.png`);
            const canvas = document?.getElementById("about-canvas");
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
              if (isSmallScreen) ctx?.scale(1, 1);
              else ctx?.scale(0.8, 0.8);

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
              canvas: "#about-canvas", // <canvas> object to draw images to
              scrollTrigger: {
                trigger: "#about-canvas",
                start: "top center",
                end: isSmallScreen ? "bottom+=200 top" : "bottom+=500 90%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          };
          scrollableHeroImage();
        },
      );
    },

    { dependencies: [resizeKey], revertOnUpdate: true },
  );
}
