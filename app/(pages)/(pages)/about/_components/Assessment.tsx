"use client";

import Quotes from "@components/UI/Quotes";
import Card from "@components/UI/Card";
import { gsap, useGSAP, mediaQueries } from "@utils/gsap";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

export default function Assessment() {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 200px 0px",
    triggerOnce: true,
  });

  useGSAP(
    () => {
      if (!inView) return;

      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};

        if (isTabletScreen || isDesktopScreen) {
          const cardList = gsap.utils.toArray<HTMLLIElement>(
            ".list",
            containerRef.current,
          );

          cardList.forEach((el, index) => {
            gsap.to(el, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 30%",
                once: true,
                fastScrollEnd: true,
              },
            });
          });
        }
      });
    },
    { dependencies: [inView], scope: containerRef },
  );

  return (
    <ul
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="grid grid-cols-1 gap-3 py-5 tablet:grid-cols-8 tablet:grid-rows-[repeat(9,80px)] desktop:grid-cols-12"
    >
      <li
        role="presentation"
        className="list col-star-1 z-3 tablet:row-span-3 tablet:row-start-1 tablet:w-75 tablet:translate-y-3 tablet:scale-0 tablet:opacity-0 desktop:col-start-2"
      >
        <Card>
          <Quotes>
            <p>
              I have been learning to build websites for the past year and I am
              having quite a lot of fun. I am a self-taught front-end developer
              building scalable, maintainable, SEO-friendly, and responsive
              websites.
            </p>
          </Quotes>
        </Card>
      </li>
      <li
        role="presentation"
        className="list col-star-1 z-2 tablet:col-start-2 tablet:row-span-3 tablet:row-start-4 tablet:w-75 tablet:translate-y-3 tablet:scale-0 tablet:opacity-0 desktop:col-start-5"
      >
        <Card>
          <Quotes>
            <p>
              Most of my experience comes from a solo environment, so I
              don&apos;t have team exposure yet. I am willing to learn and adapt
              to new things to help me grow in this fast-moving industry.
            </p>
          </Quotes>
        </Card>
      </li>
      <li
        role="presentation"
        className="list col-star-1 tablet:row-span-3 tablet:row-start-7 tablet:w-75 tablet:translate-y-3 tablet:scale-0 tablet:opacity-0 desktop:col-start-3"
      >
        <Card>
          <Quotes>
            <p>
              Taking a big leap is my core attitude. It pushed me to learn
              TypeScript as a solo developer. I can&apos;t wait to contribute
              the skills I have learned over the past year.
            </p>
          </Quotes>
        </Card>
      </li>
    </ul>
  );
}
