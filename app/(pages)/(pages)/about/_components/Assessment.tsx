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
          gsap.defaults({
            ease: "power1.in",
          });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cardList[1],
              start: "top center",
              endTrigger: cardList[2],
              end: "bottom center",
              scrub: true,
            },
          });

          tl.to(cardList[1], {
            y: 0,
          })
            .to(
              cardList[1],
              {
                filter: "blur(0px)",
              },
              "<+=0.2",
            )
            .to(
              cardList[2],
              {
                yPercent: 100,
              },
              "<",
            )

            .to(cardList[2], {
              yPercent: 200,
            })
            .to(
              cardList[2],
              {
                filter: "blur(0px)",
              },
              "<+=0.2",
            );
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
      className="flex flex-col gap-3 py-5"
    >
      <li role="presentation" className="list z-3 tablet:w-75">
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
        className="list z-2 tablet:w-75 tablet:-translate-y-full tablet:blur-xs"
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
        className="list tablet:w-75 tablet:-translate-y-[200%] tablet:blur-xs"
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
