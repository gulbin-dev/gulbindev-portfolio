"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap, mediaQueries, SplitText, useGSAP } from "@utils/gsap";
import { useRef } from "react";

const Canvas = dynamic(
  () =>
    import("./hero-section/HeroSectionComponents").then(
      (component) => component.Canvas,
    ),
  {
    ssr: false,
  },
);

export default function HeroSection() {
  const heroSectionRef = useRef<HTMLElement | null>(null);

  // hero section elements animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isReduceMotion } = context.conditions ?? {};

        // Wait for fonts to be ready
        document.fonts.ready.then(() => {
          // Split text into words
          const split_h1 = SplitText.create(".hero-header", {
            type: "words",
            autoSplit: true,
            wordsClass: "hero-split-word",
          });

          // Initialize Timeline
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero-header",
              start: "top 85%",
            },
          });

          if (isReduceMotion) {
            timeline.to(".hero-header", {
              autoAlpha: 1,
              duration: 1,
            });
          } else {
            timeline
              .to(split_h1.words, {
                y: 0,
                autoAlpha: 1,
                stagger: {
                  each: 0.1,
                  from: "random",
                  ease: "power2.out",
                },
              })

              .from("#line", {
                drawSVG: "100% 100%",
                autoAlpha: 0,
                duration: 1,
                ease: "expo.out",
                // onComplete: () => split_h1.revert(),
              });
          }
        });

        gsap.to(".hero-p", {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".hero-p",
            start: "bottom bottom",
          },
        });

        const keyframes = isReduceMotion
          ? { "0%": { autoAlpha: 0 }, "100%": { autoAlpha: 1 } }
          : {
              "0%": { autoAlpha: 0, scaleX: 0, scaleY: 0 },
              "75%": { autoAlpha: 1, scaleX: 1.2, scaleY: 1.2 },
              "100%": { scaleX: 1, scaleY: 1 },
            };

        gsap.utils
          .toArray<
            HTMLElement[]
          >([".list-discover-button", ".list-about-me-button"])
          .forEach((btn, i) => {
            gsap.to(btn, {
              duration: 0.5 + i * 0.3,
              keyframes,
              scrollTrigger: {
                trigger: btn,
                start: "bottom bottom",
                end: "bottom+=150 bottom",
                toggleActions: "play none none none",
              },
            });
          });
      });
    },
    { dependencies: [], scope: heroSectionRef },
  );

  return (
    <section
      ref={heroSectionRef}
      id="home-top"
      className="section  overflow-hidden relative linear-bg z-0 tablet-portrait:h-90"
    >
      <div className="flex flex-col  place-self-center max-w-180 w-full tablet-portrait:flex-row tablet-landscape:h-fit! tablet-portrait:justify-center">
        <div className="z-1 px-3 pt-10 h-full tablet-portrait:pt-15 tablet-portrait:max-w-1/2">
          <h1 aria-hidden className="hero-header">
            Frontend Developer{" "}
            <span className="relative">
              Building
              <svg
                className="absolute left-0 -bottom-2  tablet-portrait:scale-y-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 99.98 16.76"
              >
                <path
                  id="line"
                  className=""
                  d="M98.48,15.26L7.69,11.82l81.2-5.73L1.5,1.5"
                  style={{
                    fill: "none",
                    stroke: "#ac62ff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "3px",
                  }}
                />
              </svg>
            </span>{" "}
            Predictable React Interfaces
          </h1>
          <h1 className="sr-only">
            Frontend Developer Building Predictable React Interfaces
          </h1>
          <p className="hero-p mt-4 tablet-portrait:mt-3 tablet-portrait:text-size-xsm translate-y-12.5 invisible">
            Helping teams deliver high-performance React applications with a
            focus on accessibility and SEO.
          </p>
          <ul className="my-6 flex flex-col gap-5.5 w-fit h-full tablet-portrait:my-4 tablet-portrait:gap-4">
            <li className="list-discover-button text-base invisible group">
              <Link
                href="/discover"
                className="relative block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold desktop:text-size-sm desktop:w-45 desktop:h-7"
              >
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500">
                  CHECK MY WORKS
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  YOU MIGHT LIKE IT
                </div>
              </Link>
            </li>

            <li className="list-about-me-button group">
              <Link
                href="/about"
                className="relative inline-block text-base w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold desktop:text-size-sm desktop:w-45 desktop:h-7"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  KNOW MORE ABOUT ME
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  CONTACT ME IF YOU CAN
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative top-0 left-0 h-60 min-w-53 min-h-90 z-1 overflow-hidden tablet-portrait:h-90">
          <Canvas />
        </div>
      </div>
    </section>
  );
}
