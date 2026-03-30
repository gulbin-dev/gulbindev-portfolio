import { gsap, SplitText } from "@utils/gsap/gsap";

export default function heroSectionGSAP(context: gsap.Context) {
  context.add(() => {
    const { reduceMotion } = context.conditions ?? {};

    const animateCTA = () => {
      const keyframes = reduceMotion
        ? {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          }
        : {
            "0%": { opacity: 0, scaleX: 0, scaleY: 0 },
            "75%": { opacity: 1, scaleX: 1.2, scaleY: 1.2 },
            "100%": { opacity: 1, scaleX: 1, scaleY: 1 },
          };
      const discoverBtn = gsap.to(".list-discover-button", {
        duration: 0.5,
        keyframes: keyframes,
        scrollTrigger: {
          trigger: ".list-discover-button",
          start: "top 95%",
        },
      });

      const aboutMeBtn = gsap.to(".list-about-me-button", {
        duration: 0.8,
        keyframes: keyframes,
        scrollTrigger: {
          trigger: ".list-about-me-button",
          start: "top 95%",
        },
      });
      return () => {
        discoverBtn.kill();
        aboutMeBtn.kill();
      };
    };
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
        if (reduceMotion) {
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
    const scrollableHeroImage = () => {
      /**
       *  set 46 count instead of 47 since the first image has '1' instead of '0'
       *  it is intended to be able to 'add' a value when 'onUpdate' on ScrollTrigger
       *  runs
       */
      const frameCount = 47;
      const canvas = document.getElementById("hero-canvas");
      canvas?.setAttribute("width", "600px");
      canvas?.setAttribute("height", "1200px");
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      const images: HTMLImageElement[] = [];
      const heroImage = {
        frame: 0,
      };
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = `/home-page/home-page_${i}.png`;
        images.push(img);
      }
      images[0].onload = () => ctx?.drawImage(images[0], -350, 0);
      //  handles canvas drawing when scrolling
      const updateImage = () => {
        const img = images[Math.round(heroImage.frame)];
        if (img && ctx) {
          ctx.clearRect(0, 0, 600, 1200);
          ctx.drawImage(img, -350, 0);
        }
      };

      gsap.to(heroImage, {
        frame: images.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-canvas",
          start: "top center",
          end: "bottom 90%",
          scrub: true,
          onUpdate: updateImage,
        },
      });
    };

    animateSplitText();
    scrollableHeroImage();
    animateCTA();
  });
}
