import { gsap, SplitText } from "./gsap";

export default function cardSkillGSAP(context: gsap.Context) {
  context.add(() => {
    const { isSmallScreen, reduceMotion } = context.conditions ?? {};
    //  initialize timeline
    const globalTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#pin-trigger",
        pin: "#pin-section",
        start: "top top",
        end: "bottom+=2000 top",
        scrub: 1,
        id: "pin-section",
        invalidateOnRefresh: true,
      },
    });

    //  wait for fonts to be loaded before animating SplitText
    document.fonts.ready.then(() => {
      const cardSkillP = SplitText.create(".card-skill-p", {
        type: "words",
        autoSplit: true,
        mask: "words",
      });

      //  function to animate Section Header & Paragraph (entry)
      const animateEntry_HeaderParagraph = (): gsap.core.Timeline => {
        const timeline = gsap.timeline();
        timeline
          .from(".card-skill-header", {
            y: 200,
            opacity: 0,
            duration: 1,
          })
          .from(cardSkillP.words, {
            y: 100,
            opacity: 0,
            autoAlpha: 0,
            stagger: {
              amount: 1,
              from: "random",
              ease: reduceMotion ? "none" : "power4.in",
            },
          });
        return timeline;
      };
      //  function to animate Section Header & Paragraph (exit)
      //  and first Card (entry)
      const animateEntry_CardSkill_and_ExitHeaderParagraph =
        (): gsap.core.Timeline => {
          const timeline = gsap.timeline();
          timeline
            .from(".list-card-skill:nth-child(1)", {
              opacity: 0,
              y: 100,
            })
            .to(".card-skill-header", {
              opacity: 0,
              y: -150,
            })
            .to(
              cardSkillP.words,

              {
                opacity: 0,
                y: -150,
                stagger: 0,
              },
              "<",
            );
          return timeline;
        };

      const animateEntry_CardSkill_and_ExitCardSkill =
        (): gsap.core.Timeline => {
          const timeline = gsap.timeline();
          timeline
            .to(".list-card-skill:nth-child(1)", {
              y: isSmallScreen ? -230 : -150,
            })
            .from(".list-card-skill:nth-child(2)", {
              opacity: 0,
              y: 100,
            })
            .from(".list-card-skill:nth-child(3)", {
              opacity: 0,
              y: 100,
            });
          return timeline;
        };

      //Timeline controller
      globalTimeline.add(animateEntry_HeaderParagraph());
      globalTimeline.add(animateEntry_CardSkill_and_ExitHeaderParagraph());
      globalTimeline.add(animateEntry_CardSkill_and_ExitCardSkill(), "-=0.5");
    });
  });
}
