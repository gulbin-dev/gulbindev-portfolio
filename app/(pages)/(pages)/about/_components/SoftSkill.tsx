"use client";

import { gsap, useGSAP, mediaQueries, SplitText } from "@utils/gsap";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import Quotes from "@components/UI/Quotes";

export default function SoftSkill() {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
    triggerOnce: true,
  });

  // Adjusted base className to explicitly handle screen reader list roles
  const liClassName =
      "flex flex-col gap-3 pt-3 pb-4 border-b border-stroke overflow-hidden",
    quoteStyle = "text-size-md font-bold",
    quoteClassName = "quote tablet:opacity-0 tablet:translate-y-10",
    paragraphClassName =
      "paragraph pt-3 self-end tablet:opacity-0 tablet:translate-y-10 w-[80%]";

  useGSAP(
    () => {
      if (!inView) return;

      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isTabletScreen, isDesktopScreen } = context?.conditions ?? {};

        if (isTabletScreen || isDesktopScreen) {
          const quotes = gsap.utils.toArray<HTMLParagraphElement>(
            ".quote",
            containerRef.current,
          );
          const paragraphs = gsap.utils.toArray<HTMLParagraphElement>(
            ".paragraph",
            containerRef.current,
          );

          const animatePs = (p: HTMLParagraphElement[]) => {
            gsap.to(p, {
              opacity: 1,
              y: 0,
            });
          };

          document.fonts.ready.then(() => {
            SplitText.create(paragraphs, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              linesClass: "split-line-class",
              onSplit: (self) => {
                gsap.from(self.lines, {
                  yPercent: 100,
                  opacity: 0,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: containerRef.current,
                    start: "35% center",
                    end: "bottom center",
                  },
                  stagger: {
                    amount: 1.5,
                    from: "start",
                  },
                  onStart: () => {
                    animatePs(paragraphs);
                    animatePs(quotes);
                  },
                });
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
      aria-label="Soft skill"
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="relative z-1 flex flex-col tablet:grid tablet:grid-flow-row tablet:grid-cols-2 tablet:gap-x-3"
    >
      {/* Skill 1 */}
      <li role="presentation" className={liClassName}>
        <article aria-hidden="true">
          <Quotes className={quoteClassName} style={quoteStyle}>
            <h3>Constructive Feedback</h3>
          </Quotes>
          <p className={paragraphClassName}>
            I believe I won&apos;t truly improve without others telling me the
            things I need to hear. I value honest feedback as my best tool for
            growth.
          </p>
        </article>

        <div className="sr-only">
          <h3>Constructive Feedback</h3>
          <p>
            I believe I won&apos;t truly improve without others telling me the
            things I need to hear. I value honest feedback as my best tool for
            growth.
          </p>
        </div>
      </li>

      {/* Skill 2 */}
      <li role="presentation" className={liClassName}>
        <article aria-hidden="true">
          <Quotes className={quoteClassName} style={quoteStyle}>
            <h3>Critical Thinking</h3>
          </Quotes>
          <p className={paragraphClassName}>
            I would rather break tasks into small, manageable pieces than try to
            reinvent things. I focus on simplicity over over-complicating
            solutions.
          </p>
        </article>
        <div className="sr-only">
          <h3>Critical Thinking</h3>
          <p>
            I would rather break tasks into small, manageable pieces than try to
            reinvent things. I focus on simplicity over over-complicating
            solutions.
          </p>
        </div>
      </li>

      {/* Skill 3 */}
      <li role="presentation" className={liClassName}>
        <article aria-hidden="true">
          <Quotes className={quoteClassName} style={quoteStyle}>
            <h3>Time Management</h3>
          </Quotes>
          <p className={paragraphClassName}>
            I manage project time by breaking features into reusable components.
            This keeps my workflow fast and my code efficient.
          </p>
        </article>
        <div className="sr-only">
          <h3>Time Management</h3>
          <p>
            I manage project time by breaking features into reusable components.
            This keeps my workflow fast and my code efficient.
          </p>
        </div>
      </li>

      {/* Skill 4 */}
      <li role="presentation" className={liClassName}>
        <article aria-hidden="true">
          <Quotes className={quoteClassName} style={quoteStyle}>
            <h3>Organization</h3>
          </Quotes>
          <p className={paragraphClassName}>
            I don&apos;t want to stress over scanning messy files and code, so I
            keep everything highly organized.
          </p>
        </article>
        <div className="sr-only">
          <h3>Organization</h3>
          <p>
            I don&apos;t want to stress over scanning messy files and code, so I
            keep everything highly organized.
          </p>
        </div>
      </li>
    </ul>
  );
}
