import { gsap, mediaQueries, SplitText, ScrollTrigger } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
/** Custom hook to handle GSAP animations in cards skill animation in the Home page */
export default function useCardSkillGSAP(
  windowSize: number,
  scopeRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { reduceMotion, isSmallScreen } = context.conditions ?? {};

          const listCardSkills = gsap.utils.toArray(".list-card-skill");
          const cardHeight =
            window.document &&
            (document?.querySelector(".list-card-skill") as HTMLElement)
              .offsetHeight;
          const snapCardSkill =
            !isSmallScreen &&
            gsap.to(listCardSkills, {
              yPercent: -100 * (listCardSkills.length - 1),
              opacity: 1,
              ease: "none",
            });
          if (!isSmallScreen)
            ScrollTrigger.create({
              animation: snapCardSkill || undefined,
              anticipatePin: 0.5,
              trigger: ".container-cards",
              pin: true,
              pinSpacing: true,
              pinSpacer: scopeRef.current,
              scrub: 1,
              snap: {
                snapTo: 1 / (listCardSkills.length - 1),
                duration: 0.25,
                ease: "power1.out",
                directional: false,
                delay: 0.3,
              },
              end: "+=" + cardHeight * (listCardSkills.length - 1),
            });

          //  wait for fonts to be loaded before animating SplitText
          document.fonts.ready.then(() => {
            const cardSkillP = SplitText.create(".card-skill-p", {
              type: "words",
              autoSplit: true,
              mask: "words",
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".card-skill-header",
                start: "top 70%",
              },
            });
            timeline
              .from(".card-skill-header", {
                y: -100,
                opacity: 0,
                duration: 1,
                lazy: false,
              })
              .from(
                cardSkillP.words,
                {
                  y: -50,
                  opacity: 0,
                  autoAlpha: 0,
                  lazy: false,
                  stagger: {
                    amount: 1,
                    from: "random",
                    ease: reduceMotion ? "none" : "power4.in",
                  },
                },
                "-=0.5",
              );
          });
        },
      );
    },

    {
      dependencies: [windowSize],
      revertOnUpdate: true,
      scope: scopeRef,
    },
  );
}
