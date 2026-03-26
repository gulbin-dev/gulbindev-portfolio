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
          start: "top 85%",
        },
      });

      const aboutMeBtn = gsap.to(".list-about-me-button", {
        duration: 0.8,
        keyframes: keyframes,
        scrollTrigger: {
          trigger: ".list-about-me-button",
          start: "top 85%",
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

    const animateProfileMorph = () => {
      const timeline = gsap.timeline({
        defaults: { duration: 1 },
        repeat: -1,
      });
      const target = ["#m-profile-1"];
      timeline
        .to(target, {
          morphSVG: "#m-profile-2",
        })
        .to(target, {
          morphSVG: "#m-profile-3",
        })
        .to(target, {
          morphSVG: "#m-profile-1",
        });
    };
    animateSplitText();
    animateCTA();
    animateProfileMorph();
  });
}
