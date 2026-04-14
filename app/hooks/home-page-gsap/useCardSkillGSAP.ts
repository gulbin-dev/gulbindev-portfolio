import { gsap, mediaQueries, SplitText } from "@utils/gsap/gsap";
import { useGSAP } from "@gsap/react";
/** Custom hook to handle GSAP animations in cards skill animation in the Home page */
export default function useCardSkillGSAP() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      // media queries conditions giving a responsive animation
      // based on screen size and reduce motion
      mediaQueries,
      (context) => {
        const { reduceMotion, isSmallScreen } = context.conditions ?? {};

        const listCardSkills =
          gsap.utils.toArray<HTMLElement[]>(".list-card-skill");
        gsap.set(listCardSkills, { y: 100, opacity: 0 });
        listCardSkills.forEach((el, i) =>
          gsap.to(el, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: listCardSkills[i],
              start: isSmallScreen ? "20% 60%" : "30% 60%",
              end: "bottom 20%",
            },
          }),
        );

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
            .fromTo(
              ".card-skill-header",
              {
                y: -100,
                opacity: 0,
              },
              { y: 0, opacity: 1 },
            )
            .from(
              cardSkillP.words,
              {
                y: -50,
                opacity: 0,
                autoAlpha: 0,
                lazy: false,
                stagger: {
                  amount: 0.8,
                  from: "random",
                  ease: reduceMotion ? "none" : "power4.in",
                },
              },
              "-=0.5",
            );
        });
      },
    );
  });
}
