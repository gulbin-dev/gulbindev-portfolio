"use client";

import Image from "next/image";
import { Video } from "./_card-skill-components/CardSkill";
import {
  gsap,
  mediaQueries,
  SplitText,
  useGSAP,
  ScrollTrigger,
} from "@utils/gsap";
import { useRef } from "react";
/** card-skill component */

export default function CardSkill() {
  const cardSkillRef = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          // if (!isRevealed) return;
          const { reduceMotion, isSmallScreen } = context.conditions ?? {};

          ScrollTrigger.create({
            trigger: cardSkillRef.current,
            start: "top bottom",
            //  wait for fonts to be loaded before animating SplitText
            onEnter: () =>
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
                  onStart: () => {
                    const listCardSkills =
                      gsap.utils.toArray<HTMLElement[]>(".list-card-skill");
                    listCardSkills.forEach((el, i) =>
                      gsap.to(el, {
                        y: 0,
                        autoAlpha: 1,
                        scrollTrigger: {
                          trigger: listCardSkills[i],
                          start: isSmallScreen ? "20% 60%" : "30% 60%",
                          end: "bottom 20%",
                        },
                      }),
                    );
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
              }),
          });
        },
      );
    },
    { dependencies: [], scope: cardSkillRef },
  );

  return (
    <section
      ref={cardSkillRef}
      className="section card-skill-section w-full! h-full relative mt-0! overflow-hidden linear-bg pb-8 text-light-foreground"
    >
      <div className="overflow-hidden">
        <h2 className="card-skill-header opacity-100 text-size-lg text-center text-pretty pt-5 tablet-portrait:pt-10 pb-1 px-2">
          Building Web Features that can stand out other brands
        </h2>
        <p
          className="card-skill-p text-center text-pretty mt-1.5 px-3 desktop:text-size-xsm"
          aria-hidden="true"
        >
          A website rich in accessibility, performance, user-friendly, and clean
          codebase.
        </p>
        <p className="sr-only">
          A website rich in accessibility, performance, user-friendly, and clean
          codebase.
        </p>
      </div>
      <div className="mt-0 max-w-180 place-self-center">
        <ul className="flex flex-col px-3 items-center tablet-portrait:max-w-80 desktop:max-w-100">
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Responsive Website</h3>
                <p>
                  High-fidelity, mobile-first designs engineered for stability.
                  Consistent across all devices, ensuring a seamless experience
                  while reducing layout breaks and QA cycles.
                </p>
              </div>
              <Video poster="/preview-poster.webp">
                <source src="/preview.webm" type="video/webm" />
                <source src="/preview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </Video>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Accessibility-First Interfaces</h3>
                <p>
                  Built with semantic HTML and ARIA patterns to ensure full
                  keyboard navigation. Improves usability for all users while
                  strengthening SEO and indexing reliability.
                </p>
              </div>
              <Image
                src="/accessibility.webp"
                alt=""
                width={800}
                height={450}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAEElEQVR42mMMNZr4n4EIAABPmQIZAUAfkQAAAABJRU5ErkJggg=="
                className="tablet-portrait:max-w-80 desktop:max-w-100 object-cover aspect-video"
              />
              <div className="container-video"></div>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Clean & Maintainable Code</h3>
                <p>
                  Writing readable, self-documenting code with a focus on SOLID
                  principles. My approach minimizes technical debt, making the
                  codebase easier to debug, refactor, and scale over time.
                </p>
              </div>
              <Video poster="codebase-poster.webp">
                <source src="/codebase.webm" type="video/webm" />
                <source src="/codebase.mp4" type="video/mp4" />
              </Video>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
