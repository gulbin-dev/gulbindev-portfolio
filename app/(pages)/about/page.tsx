"use client";

import dynamic from "next/dynamic";
import {
  FaHandPaper,
  FaPaperPlane,
  FaGithubSquare,
  FaLinkedin,
  FaReact,
} from "@utils/react-icons";
import {
  gsap,
  mediaQueries,
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from "@utils/gsap";

const AboutCanvas = dynamic(
  () => import("@/app/(pages)/about/_components/AboutCanvas"),
  { ssr: false },
);

/** About page content */
export default function About() {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        // media queries conditions giving a responsive animation
        const { isMobilePortraitScreen, isDesktopScreen } =
          context.conditions ?? {};

        const smoother = ScrollSmoother.get();
        if (isDesktopScreen) smoother?.effects().forEach((t) => t.kill());

        const animateTechStack = () => {
          const techStacks = gsap.utils.toArray<HTMLElement[]>(".tech-stack");
          gsap.to(techStacks, {
            y: 0,
            autoAlpha: 1,
            stagger: {
              amount: 1,
              from: "start",
            },
            scrollTrigger: {
              trigger: ".container-tech-stack",
              start: "top bottom",
              end: "bottom 40%",
            },
          });
        };

        if (isDesktopScreen) {
          // list of elements with the class "story-telling" used for horizontal scrolling
          const storyTellingElements =
            gsap.utils.toArray<HTMLElement[]>(".story-telling");
          const pinned = document.querySelector(
            ".tablet-pinned",
          ) as HTMLDivElement;
          const scrollHorizontal = gsap.to(".tablet-pinned", {
            x: -150 * storyTellingElements.length,
            ease: "none",
            scrollTrigger: {
              trigger: ".tablet-pinned",
              pin: true,
              start: 0,
              end: () => "bottom+=" + (pinned?.offsetWidth + 250) + " top",
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onLeave: animateTechStack,
            },
          });

          ScrollTrigger.create({
            trigger: ".canvas-container",
            pin: true,
            start: 0,
            end: () =>
              pinned?.offsetHeight + "+=" + pinned?.offsetWidth + " top",
          });
          /**
           * A function to animate the paper plane
           */
          const animatePaperPlane = () => {
            gsap.to("#paper-plane", {
              scrollTrigger: {
                trigger: ".split-text-story",
                start: "left 80%",
                end: "right left",
                containerAnimation: scrollHorizontal,
              },
              keyframes: {
                "20%": { autoAlpha: 1, scale: 1 },
              },
              duration: 5,
              ease: "power1.inOut",
              motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: 45,
              },
            });
          };
          const animateFrontendDeveloperBuilding = () => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".a",
                containerAnimation: scrollHorizontal,
                start: 0,
                end: "right left",
              },
              onStart: () => {
                gsap.to(".responsive", {
                  y: 0,
                  autoAlpha: 1,
                  scrollTrigger: {
                    trigger: ".responsive",
                    start: "left 70%",
                    end: "right 40%",
                    containerAnimation: scrollHorizontal,
                  },
                  onStart: animateStateDriven,
                });

                document.fonts.ready.then(() => {
                  const splitTextStory =
                    document.querySelector(".split-text-story");
                  splitTextStory?.setAttribute("style", "visibility: visible");
                  SplitText.create(".split-text-story", {
                    type: "words",
                    wordsClass: "split-word",
                    autoSplit: true,
                    onSplit(self) {
                      return gsap.to(self.words, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: {
                          amount: 0.8,
                          from: "start",
                        },
                        scrollTrigger: {
                          trigger: ".split-text-story",
                          containerAnimation: scrollHorizontal,
                          start: "left 70%",
                          end: "right center",
                        },
                        onComplete: animateReact,
                      });
                    },
                  });
                });
              },
            });
            timeline
              .to(".a", {
                x: 0,
                duration: 0.5,
              })
              .to(
                ".frontend",
                {
                  x: 0,
                  ease: "power2.in",
                },
                "-=0.3",
              )
              .to(".developer", {
                rotate: 0,
                y: 0,
                autoAlpha: 1,
              })
              .to(".developer-bg-linear", {
                "--developer-grad-angle": "375deg",
                duration: 1,
              })
              .to(
                ".building",
                {
                  scaleY: 1,
                  y: 0,
                  ease: "bounce.out",
                },
                "<",
              )
              .to(
                ".building-bg-linear",
                {
                  "--building-grad-angle": "45deg",
                  duration: 1,
                },
                "-=0.5",
              );
          };
          const animateStateDriven = () => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".state",
                containerAnimation: scrollHorizontal,
                start: "left 70%",
                end: "right 40%",
                onEnter: animatePaperPlane,
              },
            });

            timeline
              .to(".state", {
                x: 0,
              })
              .to(
                ".driven",
                {
                  x: 0,
                },
                "-=0.3",
              )
              .to(".container-state-driven", {
                "--animate-background": "#ffc400",
              })
              .to(
                ".hyphen",
                {
                  rotate: 0,
                  scaleX: 3,
                },
                "<",
              );
          };
          const animateReact = () => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".react-icon",
                start: "left 80%",
                end: "right 40%",
                containerAnimation: scrollHorizontal,
              },
              onStart: animateJsTs,
            });
            timeline
              .to(".react-icon", {
                x: 0,
              })
              .to(
                ".react",
                {
                  x: 0,
                },
                "<",
              )
              .to(".and", {
                y: 0,
              });
          };
          const animateJsTs = () => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: ".javaScript",
                start: "left 70%",
                end: "right 40%",
                containerAnimation: scrollHorizontal,
              },
            });
            timeline
              .to(".javaScript", {
                autoAlpha: 1,
                y: 0,
              })
              .to(
                ".typeScript",
                {
                  autoAlpha: 1,
                  y: 0,
                },
                "-=0.3",
              )
              .to(".divider", {
                delay: 0.5,
                rotate: -65,
                scaleX: 0.3,
              })
              .to(
                ".js-container",
                {
                  x: 15,
                  y: 10,
                },
                "<",
              )
              .to(
                ".ts-container",
                {
                  x: -8,
                  y: -10,
                },
                "<",
              );
          };

          const animateIntro = () => {
            const timeline = isMobilePortraitScreen
              ? gsap.timeline({
                  scrollTrigger: {
                    trigger: ".word-hi",
                    start: "top center",
                    end: "bottom+=200 center",
                  },
                })
              : gsap.timeline({});

            timeline.to(".name1", {
              duration: 2,
              scrambleText: {
                text: "Joshua Glenn R. Gulbin",
                chars: "01 ",
                oldClass: "unicode",
                newClass: "post-scramble",
                speed: 0.5,
                revealDelay: 1,
                tweenLength: false,
              },
            });
          };
          const animateHandIcon = () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: isMobilePortraitScreen ? ".hand-icon" : "",
                start: "top center",
              },
            });
            tl.to(".hand-icon", {
              autoAlpha: 1,
            }).to(".hand-icon", {
              transformOrigin: "bottom center",
              keyframes: {
                "5%": { rotate: 0 },
                "25%": { rotate: -35 },
                "50%": { rotate: 35 },
                "75%": { rotate: -35 },
                "100%": { rotate: 0 },
              },
              repeatDelay: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "none",
            });
          };

          animateIntro();
          animateHandIcon();
          animateFrontendDeveloperBuilding();
        }

        animateTechStack();
      });
    },
    { dependencies: [] },
  );

  return (
    <main className="bg-primary-color-darker mb-4">
      <section id="about-top" className="flex flex-col relative">
        <div className="canvas-container h-90 w-full top-0 left-0  z-20  desktop:absolute desktop:mt-30 desktop:w-55 desktop:h-90 ">
          <div className="hidden desktop:block absolute bg-primary-color-darker w-[15vw] h-80"></div>
          <AboutCanvas />
        </div>
        <div className="tablet-pinned max-w-225! relative">
          {/* this <div> is used only for animation */}
          <div className="relative desktop:top-45 desktop:flex">
            {" "}
            <div className="hidden desktop:block min-w-60 min-h-15"></div>{" "}
            <div className="flex mt-5 flex-col items-center  tablet-portrait:mt-25 desktop:mt-8 desktop:grid desktop:auto-rows-auto desktop:max-h-20 desktop:auto-cols-min  desktop:w-screen desktop:min-w-80 desktop:gap-y-5">
              {" "}
              <h1 className="text-size-lg  tablet-portrait:text-size-xl  col-start-1">
                About Me
              </h1>
              <p
                className="inline-block place-self-center col-start-1 mt-3 tablet-portrait:text-size-md  desktop:truncate desktop:mt-10"
                aria-hidden="true"
              >
                <span className="flex gap-1 justify-center">
                  {" "}
                  <span className="word-hi self-end">Hi!</span>{" "}
                  <span className="min-w-3">
                    <FaHandPaper className="hand-icon z-300 invisible desktop:visible" />
                  </span>{" "}
                </span>{" "}
                <span className="block desktop:hidden">
                  I&apos;m{" "}
                  <span className="text-action-color font-bold">
                    Joshua Glenn R. Gulbin
                  </span>
                </span>
                <span className="hidden desktop:block">
                  {" "}
                  <span className="">I&apos;m</span>{" "}
                  <span className="name1 text-col-neutral-1 inline-block font-bold min-w-65 overflow-clip"></span>{" "}
                </span>
              </p>
              {/* mobile UI */}
              <p
                className="inline-block text-center h-full px-5 text-pretty tablet-portrait:text-size-xsm desktop:hidden col-start-1"
                aria-hidden="true"
              >
                {" "}
                a <span className=" after-line frontend-after">
                  frontend
                </span>{" "}
                <span className=" after-line developer-after">developer</span>{" "}
                <span className=" after-line building-after">building </span>{" "}
                responsive, state-driven web applications using React and{" "}
                <span className=" after-line javascript-after">JavaScript</span>{" "}
                /{" "}
                <span className="relative pb-0.5 after-line typescript-after">
                  TypeScript
                </span>
                .
              </p>
            </div>
            {/* bigger screen UI */}
            <div
              className="hidden text-center relative gap-2 text-3xl items-end min-h-30 h-full desktop:flex desktop:top-8 desktop:text-size-md"
              aria-hidden="true"
            >
              {" "}
              <span className="clip">
                <span className="story-telling inline-block a lift-words -translate-x-6.25">
                  a
                </span>{" "}
              </span>
              <span className="grid grid-cols-[repeat(9,80px)] gap-0.5 relative clip">
                <span className="story-telling frontend py-2 px-3.5 rounded-2xl frontend-bg-linear col-start-1 col-span-3 row-start-1 -translate-x-[101%]">
                  <span>frontend</span>
                </span>
                <span className="story-telling developer py-1.5 px-2.5 rounded-2xl developer-bg-linear col-start-3 col-span-5 row-start-1 -z-1 invisible rotate-180 origin-top-left">
                  <span>developer</span>
                </span>
                <span className="story-telling building py-1.5 px-2.5 rounded-2xl building-bg-linear col-start-7 col-span-3 row-start-1 origin-bottom translate-y-3.75 scale-y-0">
                  <span>building</span>{" "}
                </span>
              </span>
              <span className="story-telling lift-words clip">
                {" "}
                <span className="responsive block invisible translate-y-12.5">
                  responsive,
                </span>{" "}
              </span>
              <span className="container-state-driven grid grid-cols-[repeat(4,70px)] clip content-start rounded-lg">
                <span className="story-telling state col-start-1 col-span-2 bg-action-color text-dark-foreground rounded-l-sm py-2 pl-2 flex gap-1.5 items-center z-2 -translate-x-20.5">
                  state{" "}
                  <span className="story-telling hyphen w-0.5 h-[3px] block bg-dark-foreground origin-center rotate-90 scale-x-[10]"></span>
                </span>

                <span className="story-telling driven col-start-3 col-span-2 bg-action-color text-dark-foreground py-2 pl-0.5 pr-2 rounded-r-sm block z-1 -translate-x-35.75">
                  driven
                </span>
              </span>{" "}
              {/*  SVG paper plane */}
              <div className="hidden desktop:block absolute left-92 top-25 min-w-20 min-h-30">
                <svg className="w-full h-full scale-65 -rotate-45 desktop:scale-100 desktop:rotate-0">
                  <path
                    id="path"
                    fill="none"
                    d="M-0.667,60.666C27.996,124.328,150.091,48.672,145.998,78.332,144.624,88.286,57.515,107.41,70.573,60.904,81.741,21.116,317.426,80.263,315.53,24.012,314.232,-14.453,266.274,-3.652,269.182,22.109,273.302,58.631,340.032,53.801,383.995,54.664"
                  ></path>
                </svg>
                <FaPaperPlane id="paper-plane" className="invisible scale-50" />
              </div>
              <span className="story-telling split-text-story lift-words clip">
                web applications using
              </span>{" "}
              <span className="grid grid-cols-[repeat(4,50px) items-center mb-0.75 gap-0.5 clip">
                <span className="story-telling react col-start-1 col-span-2 -translate-x-15.5">
                  React
                </span>{" "}
                <FaReact className="col-start-3 react-icon text-[#61DBFB] bg-primary-color-darker text-5xl font-bold rounded-md z-1 -translate-x-20.75" />
                <span className="story-telling and pl-1 mb-px col-start-4 -translate-y-[102%]">
                  and
                </span>{" "}
              </span>
              <span className="mb-[11px] items-center grid grid-cols-[repeat(4,70px)] grid-rows-[repeat(2,30px)] gap-2.5 relative">
                <span className="clip mb-2 col-start-1 row-start-1 col-span-2 js-container">
                  <span className="story-telling relative block pb-0.5 javascript-after javaScript py-1 px-2 bg-action-color text-dark-foreground rounded-sm invisible translate-y-full">
                    JavaScript
                  </span>{" "}
                </span>

                <span className="text-8xl divider absolute left-1/2 -translate-x-1/2 z-1 w-60 h-1 bg-light-foreground"></span>
                <span className="clip mt-2 col-start-4 row-start-2 col-span-2 ts-container">
                  <span className="story-telling relative block pb-0.5 typescript-after typeScript py-1 px-2 bg-secondary-color rounded-sm  invisible -translate-y-full">
                    TypeScript.
                  </span>
                </span>
              </span>
            </div>
          </div>{" "}
          {/* this <p> is used only for screen readers */}
          <p className="sr-only">
            Hi! I&apos;m Joshua Glenn R. Gulbin, a frontend developer building
            responsive, state-driven web applications using React and
            JavaScript/TypeScript.
          </p>
        </div>

        {/* Contact */}
        <div className="relative flex flex-col items-center gap-x-2 mt-6 desktop:mt-100">
          <h2 className="text-size-lg tablet-portrait:text-size-xl">
            Reach out!
          </h2>
          <ul className="text-4xl flex gap-3 mt-2 tablet-portrait:text-4xl">
            <li>
              <button>
                <FaGithubSquare />
              </button>
            </li>
            <li>
              <button>
                <FaLinkedin />
              </button>
            </li>
          </ul>
        </div>
        {/*  Tech Stack */}
        <div className="mt-5">
          <h2 className="text-size-lg text-center tablet-portrait:text-size-xl">
            Tech Stack
          </h2>
          <ul className="flex container-tech-stack flex-wrap gap-y-4 gap-x-2 mt-3 justify-center">
            <li>
              <span className="tech-stack">HTML</span>
            </li>
            <li>
              <span className="tech-stack">CSS</span>
            </li>
            <li>
              <span className="tech-stack">Javascript</span>
            </li>
            <li>
              <span className="tech-stack">Tailwind CSS</span>
            </li>
            <li>
              <span className="tech-stack">NextJS</span>
            </li>
            <li>
              <span className="tech-stack">Typescript</span>
            </li>
            <li>
              <span className="tech-stack">GSAP</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
