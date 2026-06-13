"use client";

import Image from "next/image";
import Card from "./UI/Card";
import CTALinkButton from "./UI/CTALinkButton";
import { useEffect, useState, useRef } from "react";
import useWindowSizeListener from "@hooks/useWindowSizeListener";
import { useGSAP, gsap, mediaQueries, Observer } from "@utils/gsap";
import { useInView } from "react-intersection-observer";
import TextWithUnderline from "./UI/TextWithUnderline";

export default function Contact() {
  const windowSize = useWindowSizeListener();
  const [isBiggerScreen, setIsBiggerScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const activeCardIndexRef = useRef<number | null>(null);
  const latestTouchedCardRef = useRef<number | null>(null);
  const activeCardTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "75% 0px 0px 0px",
    triggerOnce: true,
  });

  const cardClassName =
      "card-contact flex relative items-center justify-between translate-y-0 overflow-hidden tablet:origin-bottom-left tablet:absolute tablet:bottom-0 tablet:opacity-0 tablet:translate-y-10 tablet:left-0 tablet:max-w-40 tablet:h-50",
    headingClassName =
      "heading z-2 text-size-md tablet:absolute tablet:top-0 tablet:left-0 tablet:p-5 tablet:rounded-tl-2xl tablet:rounded-br-2xl",
    divShadeClassName = "shade absolute inset-0 z-1 bg-primary-shade/60",
    imageClassName = "rounded-2xl object-cover",
    liClassName = "card-contact-wrapper relative",
    drawerCLassName =
      "drawer z-2 tablet:absolute tablet:right-0 tablet:bottom-0 tablet:flex tablet:opacity-0 tablet:translate-y-full tablet:w-full tablet:justify-center tablet:bg-primary tablet:py-6";

  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  useEffect(() => {
    const checkSize = () => setIsBiggerScreen(window.innerWidth >= 768); // conditional resource download base on screen size
    checkSize();
  }, [windowSize]);

  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context.conditions ?? {};

        if (isTabletScreen || isDesktopScreen) {
          const contacts = gsap.utils.toArray<HTMLDivElement>(
            ".card-contact",
            containerRef.current,
          );
          // individual card positions based on index
          const positionConfig = (index: number) => {
            const rotation = -25 + index * 10;
            const translateX = -55 + index * 20;
            return { rotate: rotation, x: translateX, y: 0 };
          };

          const resetCardAnimationView = () => {
            latestTouchedCardRef.current = null;
            activeCardTimelineRef.current?.kill();
            activeCardTimelineRef.current = null;
            setActiveCardIndex(null);

            contacts.forEach((card, originalIndex) => {
              const homeCoords = positionConfig(originalIndex);
              const drawer = card.querySelector(".drawer");
              const heading = card.querySelector(".heading");
              const shade = card.querySelector(".shade");

              gsap.to(card, {
                x: homeCoords.x,
                y: homeCoords.y,
                rotate: homeCoords.rotate,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                zIndex: originalIndex,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });

              if (drawer) {
                gsap.to(drawer, {
                  opacity: 0,
                  y: "100%",
                  duration: 0.3,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }

              if (heading) {
                gsap.to(heading, {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }

              if (shade) {
                gsap.to(shade, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
            });
          };

          const entryAnimationTimeline = gsap.timeline({
            ease: "power.in",
            scrollTrigger: {
              trigger: contacts,
              start: "top 80%",
              end: "70% center",
            },
            onComplete: resetCardAnimationView,
          });
          entryAnimationTimeline
            .to(contacts, {
              opacity: 1,
              y: 0,
              duration: 1,
            })
            .to(contacts[0], positionConfig(0))
            .to(contacts[1], positionConfig(1), "<")
            .to(contacts[2], positionConfig(2), "<")
            .to(contacts[3], positionConfig(3), "<");

          const animateCardView = (
            cardInfo: {
              cardEl: HTMLDivElement;
              index: number;
            } | null,
            interactionType: "click" | "hover" = "click", // 2. Track interaction type
          ) => {
            if (!cardInfo || cardInfo.index === -1) {
              resetCardAnimationView();
              return;
            }

            const requestedIndex = cardInfo.index;
            latestTouchedCardRef.current = requestedIndex;

            // Toggle behavior only for clicks/taps (tapping an open card closes it)
            if (
              activeCardIndexRef.current === requestedIndex &&
              interactionType === "click"
            ) {
              resetCardAnimationView();
              return;
            }

            setActiveCardIndex(requestedIndex);
            activeCardTimelineRef.current?.kill();

            const targetCard = cardInfo.cardEl;
            const targetDrawer = targetCard.querySelector(".drawer");
            const targetHeading = targetCard.querySelector(".heading");
            const targetShade = targetCard.querySelector(".shade");
            const otherCards = contacts.filter((card) => card !== targetCard);

            gsap.killTweensOf([
              targetCard,
              targetDrawer,
              targetHeading,
              targetShade,
            ]);
            const cardTl = gsap.timeline({
              overwrite: "auto",
            });
            activeCardTimelineRef.current = cardTl;

            cardTl
              .to(targetCard, {
                x: "-=15",
                y: "-=15",
                scale: 1.03,
                filter: "blur(0px)",
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
              })
              .to(
                targetCard,
                {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1.02,
                  zIndex: 10,
                  duration: 0.45,
                  ease: "power3.out",
                },
                "+=0.01",
              )
              .to(
                targetHeading,
                {
                  xPercent: -100,
                  opacity: 0,
                  duration: 0.35,
                  ease: "power2.out",
                },
                "-=0.2",
              )
              .to(
                targetShade,
                {
                  opacity: 0,
                  duration: 0.35,
                  ease: "power2.out",
                },
                "<",
              )
              .to(
                targetDrawer,
                {
                  opacity: 1,
                  y: "0%",
                  duration: 0.4,
                  ease: "power3.out",
                },
                "<0.1",
              );

            otherCards.forEach((card) => {
              const originalIndex = contacts.indexOf(card);
              const homeCoords = positionConfig(originalIndex);
              const unselectedDrawer = card.querySelector(".drawer");
              const heading = card.querySelector(".heading");
              const shade = card.querySelector(".shade");

              const isBelowSelected = originalIndex > cardInfo.index;
              const pushX = isBelowSelected
                ? homeCoords.x + 30
                : homeCoords.x - 30;
              const pushY = homeCoords.y + 40;

              gsap.to(card, {
                x: pushX,
                y: pushY,
                rotate: homeCoords.rotate * 1.2,
                zIndex: originalIndex,
                opacity: 0.35,
                filter: "blur(3px)",
                scale: 0.95,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });

              if (unselectedDrawer) {
                gsap.to(unselectedDrawer, {
                  opacity: 0,
                  y: "100%",
                  duration: 0.3,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }

              if (heading) {
                gsap.to(heading, {
                  x: 0,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }

              if (shade) {
                gsap.to(shade, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
            });
          };

          const getCardInfoToAnimate = (
            targetEl: HTMLElement | null,
            pointerEvent?: PointerEvent,
          ) => {
            if (!targetEl) return null;

            const cardEl = targetEl.closest(".card-contact") as HTMLDivElement;
            if (!cardEl) return null;
            const event = pointerEvent;
            const index = contacts.indexOf(cardEl);
            return { cardEl, index, event };
          };

          Observer.create({
            target: containerRef.current,
            type: "touch,pointer",
            onPress: (obs) => {
              const eventTarget = (obs.event as PointerEvent)
                .target as HTMLElement;
              const info = getCardInfoToAnimate(
                eventTarget,
                obs.event as PointerEvent,
              );

              if (info?.event?.pointerType === "touch") {
                animateCardView(info, "click");
              }
            },

            onClick: (obs) => {
              const eventTarget = (obs.event as PointerEvent)
                .target as HTMLDivElement;

              const info = getCardInfoToAnimate(
                eventTarget,
                obs.event as PointerEvent,
              );
              if (
                info?.event?.pointerType === "mouse" ||
                info?.event?.pointerType === "touch"
              ) {
                animateCardView(info, "click");
              } else {
                resetCardAnimationView();
              }
            },
          });
        }
      });
    },
    { dependencies: [inView], revertOnUpdate: true, scope: containerRef },
  );

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      role="region"
      aria-label="Contact"
      className="tablet:col-span-full tablet:col-start-1 tablet:row-span-10 tablet:row-start-30"
    >
      <TextWithUnderline>
        <p className="text-size-sm">
          You can{" "}
          <span className="animate-underline relative pb-1 after:absolute after:right-0 after:bottom-0 after:h-0.75 after:w-full after:origin-right after:content-[''] tablet:after:bg-secondary-orange">
            reach me
          </span>{" "}
          on any of these platforms
        </p>
      </TextWithUnderline>
      <div className="mt-5 gap-6 tablet:flex">
        <ul
          aria-label="Contact list"
          className="flex h-50 w-full flex-col items-stretch gap-1.5 tablet:mt-15 tablet:ml-35 tablet:max-w-40 tablet:flex-col-reverse"
        >
          <li role="presentation" className={liClassName}>
            <Card
              cardRef={(el) => {
                if (cardsRef.current) cardsRef.current[0] = el;
              }}
              className={cardClassName}
            >
              <h4
                className={`tablet:bg-[#450005] tablet:text-[#D81A27] ${headingClassName}`}
              >
                Gmail
              </h4>
              <div className={divShadeClassName}></div>
              <Image
                src={
                  inView && isBiggerScreen
                    ? "/images/gmail-contact.png"
                    : "/images/gmail-contact-bg.png"
                }
                alt=""
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                aria-hidden
                className={imageClassName}
              />
              <div className={`tablet:bg-primary ${drawerCLassName}`}>
                <CTALinkButton
                  link="mailto:gulbindev@gmail.com"
                  target="_blank"
                >
                  Send an email
                </CTALinkButton>
              </div>
            </Card>
          </li>
          <li role="presentation" className={liClassName}>
            <Card
              cardRef={(el) => {
                if (cardsRef.current) cardsRef.current[1] = el;
              }}
              className={cardClassName}
            >
              <h4
                className={`tablet:bg-[#003221] tablet:text-[#00BD7B] ${headingClassName}`}
              >
                Fiverr
              </h4>
              <div className={divShadeClassName}></div>
              <Image
                src={
                  inView && isBiggerScreen
                    ? "/images/fiverr-contact.png"
                    : "/images/fiverr-contact-bg.png"
                }
                alt=""
                loading="lazy"
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className={imageClassName}
              />
              <div className={`tablet:bg-primary ${drawerCLassName}`}>
                <CTALinkButton
                  link="https://www.fiverr.com/s/1q8R136"
                  target="_blank"
                >
                  Let&apos;s work together
                </CTALinkButton>
              </div>
            </Card>
          </li>
          <li role="presentation" className={liClassName}>
            <Card
              cardRef={(el) => {
                if (cardsRef.current) cardsRef.current[2] = el;
              }}
              className={cardClassName}
            >
              <h4
                className={`tablet:bg-[#004D0C] tablet:text-[#00D420] ${headingClassName}`}
              >
                Upwork
              </h4>
              <div className={divShadeClassName}></div>
              <Image
                src={
                  inView && isBiggerScreen
                    ? "/images/upwork-contact.png"
                    : "/images/upwork-contact-bg.png"
                }
                alt=""
                loading="lazy"
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className={imageClassName}
              />
              <div className={`tablet:bg-primary ${drawerCLassName}`}>
                <CTALinkButton
                  link="https://www.upwork.com/freelancers/~01971e35462d72fb44?mp_source=share"
                  target="_blank"
                >
                  Hire me
                </CTALinkButton>
              </div>
            </Card>
          </li>
          <li role="presentation" className={liClassName}>
            <Card
              cardRef={(el) => {
                if (cardsRef.current) cardsRef.current[3] = el;
              }}
              className={cardClassName}
            >
              <h4
                className={`tablet:bg-[#152151] tablet:text-[#458BF4] ${headingClassName}`}
              >
                LinkedIn
              </h4>
              <div className={divShadeClassName}></div>
              <Image
                src={
                  inView && isBiggerScreen
                    ? "/images/linkedin-contact.png"
                    : "/images/linkedin-contact-bg.png"
                }
                alt=""
                loading="lazy"
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className={imageClassName}
              />
              <div className={`tablet:bg-primary ${drawerCLassName}`}>
                <CTALinkButton
                  link="https://www.linkedin.com/in/joshua-glenn-gulbin/"
                  target="_blank"
                >
                  Connect with me
                </CTALinkButton>
              </div>
            </Card>
          </li>
        </ul>
        <div
          aria-hidden
          className="hidden self-end text-size-md text-stone-500 tablet:block"
        >
          <TextWithUnderline>
            <span className="relative block w-fit pb-0.5 after:absolute after:right-0 after:bottom-0 after:h-0.5 after:w-full after:origin-right after:bg-secondary-orange after:content-[''] desktop:hidden">
              TAP
            </span>
            <span className="relative hidden w-fit pb-0.5 after:absolute after:right-0 after:bottom-0 after:h-0.5 after:w-full after:origin-right after:bg-secondary-orange after:content-[''] desktop:block">
              CLICK
            </span>
          </TextWithUnderline>
        </div>
      </div>
    </div>
  );
}
