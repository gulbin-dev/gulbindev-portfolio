"use client";

import Card from "@components/UI/Card";
import CardScrollProgress from "@components/UI/CardScrollProgress";
import { useRef } from "react";
import { gsap, useGSAP } from "@utils/gsap";
import { useInView } from "react-intersection-observer";

export default function WorkflowCards() {
  const cardClassStyle = "card flex h-24 flex-col gap-2 max-w-45";
  const ulClassStyle = "ml-3 list-disc";
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 800px 0px",
    triggerOnce: true,
  });
  useGSAP(
    () => {
      if (!inView) return;
      const cardList = gsap.utils.toArray<HTMLDivElement>(
        ".card",
        containerRef.current,
      );

      const tl = gsap.timeline();
      cardList.forEach((card) => {
        tl.to(card, {
          boxShadow: "0px 0px 12px 4px var(--color-secondary-orange)",
          duration: 1,

          scrollTrigger: {
            trigger: card,
            start: "10% center",
            end: "90% center",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    },
    { dependencies: [inView], scope: containerRef },
  );
  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="grid grid-flow-row auto-rows-[60px] grid-cols-[1fr_1fr_1fr_min] pb-10 tablet:pb-0"
    >
      <ul
        aria-label="Workflow"
        className="relative z-2 col-span-3 col-start-1 row-span-20 row-start-1 flex flex-col gap-6 py-6 tablet:grid tablet:grid-flow-row tablet:auto-rows-[60px] tablet:grid-cols-8 tablet:gap-x-0 tablet:gap-y-3 desktop:grid-cols-12"
      >
        <li
          role="presentation"
          className="col-span-4 col-start-1 row-span-2 row-start-1 desktop:col-start-2"
        >
          <Card
            cardRef={(el) => {
              if (cardsRef.current) cardsRef.current[0] = el;
            }}
            className={cardClassStyle}
          >
            <h3>Globalization and Building Blocks</h3>
            <ul className={ulClassStyle}>
              <li>Configured theme colors and typography</li>
              <li>Built reusable UI units</li>
            </ul>
          </Card>
        </li>
        <li
          role="presentation"
          className="col-span-4 col-start-3 row-span-2 row-start-4 desktop:col-start-5"
        >
          <Card
            cardRef={(el) => {
              if (cardsRef.current) cardsRef.current[1] = el;
            }}
            className={cardClassStyle}
          >
            <h3>Fast UI Prototyping</h3>
            <ul className={ulClassStyle}>
              <li>Built mobile-first responsive UIs</li>
              <li>Responsive Design</li>
              <li>Added hover and transition effects</li>
            </ul>
          </Card>
        </li>
        <li
          role="presentation"
          className="col-span-4 col-start-5 row-span-2 row-start-7 desktop:col-start-8"
        >
          <Card
            cardRef={(el) => {
              if (cardsRef.current) cardsRef.current[2] = el;
            }}
            className={cardClassStyle}
          >
            <h3>Interactive features</h3>
            <ul className={ulClassStyle}>
              <li>DOM Manipulation</li>
              <li>Implemented core application features</li>
              <li>Added dynamic visual elements</li>
            </ul>
          </Card>
        </li>
        <li
          role="presentation"
          className="col-span-4 col-start-3 row-span-2 row-start-10 desktop:col-start-5"
        >
          <Card
            cardRef={(el) => {
              if (cardsRef.current) cardsRef.current[3] = el;
            }}
            className={cardClassStyle}
          >
            <h3>Test and Optimize</h3>
            <ul className={ulClassStyle}>
              <li>Unit Testing</li>
              <li>Accessibility</li>
              <li>Optimized code for speed</li>
            </ul>
          </Card>
        </li>
        <li
          role="presentation"
          className="col-span-4 col-start-1 row-span-2 row-start-13 desktop:col-start-2"
        >
          <Card
            cardRef={(el) => {
              if (cardsRef.current) cardsRef.current[4] = el;
            }}
            className={cardClassStyle}
          >
            <h3>Build and Deploy</h3>
            <p>Deploying and managing production builds through Vercel</p>
          </Card>
        </li>
      </ul>

      <ul
        aria-hidden
        className="col-start-4 row-span-full row-start-1 mt-26 flex flex-col gap-17.5 tablet:col-span-4 tablet:col-start-1 tablet:mt-6 tablet:grid tablet:grid-flow-row tablet:auto-rows-[60px] tablet:grid-cols-8 tablet:gap-x-0 tablet:gap-y-3 desktop:grid-cols-12"
      >
        <li className="relative col-start-2 row-span-3 row-start-1 self-center justify-self-center desktop:col-start-4">
          <CardScrollProgress className="progress tablet:border tablet:border-transparent" />
        </li>
        <li className="relative col-start-4 row-span-3 row-start-4 self-center justify-self-center desktop:col-start-7">
          <CardScrollProgress className="progress tablet:border tablet:border-transparent" />
        </li>
        <li className="relative col-start-7 row-span-3 row-start-7 self-center justify-self-center desktop:col-start-9">
          <CardScrollProgress className="progress scale-x-[-1] tablet:border tablet:border-transparent" />
        </li>
        <li className="relative col-start-5 row-span-3 row-start-10 self-center justify-self-center desktop:col-start-6">
          <CardScrollProgress className="progress scale-x-[-1] tablet:border tablet:border-transparent" />
        </li>
      </ul>
    </div>
  );
}
