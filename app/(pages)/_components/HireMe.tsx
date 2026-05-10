"use client";

import { FaMapLocationDot, RiTeamFill } from "@utils/react-icons";
import Contact from "@/app/components/Contact";
import { gsap, mediaQueries, ScrollTrigger, useGSAP } from "@utils/gsap";
import { useRef } from "react";

export default function HireMe() {
  const hireMeRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const fadeEntries: HTMLElement[] = gsap.utils.toArray(".fade-entry");
        const icons: HTMLElement[] = gsap.utils.toArray(".icons");

        gsap.defaults({
          duration: 0.8,
        });
        ScrollTrigger.defaults({
          start: "top 80%",
        });

        ScrollTrigger.create({
          trigger: hireMeRef.current,
          start: "top bottom",
          onEnter: () => {
            fadeEntries.forEach((el) =>
              gsap.to(el, {
                autoAlpha: 1,
                y: 0,
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                },
              }),
            );
            icons.forEach((icon) =>
              gsap.to(icon, {
                keyframes: reduceMotion
                  ? {
                      "50%": { autoAlpha: 1 },
                    }
                  : {
                      "25%": { rotate: 25, autoAlpha: 1 },
                      "50%": { rotate: -15 },
                      "75%": { rotate: 15 },
                      "100%": { rotate: 0 },
                    },
                ease: "circ.out",
                transformOrigin: "bottom center",
                scrollTrigger: {
                  trigger: icon,
                },
              }),
            );
          },
        });
      });
    },
    { dependencies: [], scope: hireMeRef },
  );

  return (
    <section
      ref={hireMeRef}
      className="section snap w-full h-full bg-primary-color-darker py-7 px-3"
    >
      <h2 className="fade-entry text-size-xl text-center font-bold">
        Available for Hire
      </h2>
      <div className="max-w-180 place-self-center">
        <ul className="flex flex-col gap-8 mt-6 items-center place-self-center tablet-portrait:flex-row tablet-portrait:gap-15">
          <li className="card-container">
            <FaMapLocationDot className="icons" aria-hidden />
            <div className="content-container">
              <h3 className="fade-entry text-size-lg font-bold">Location</h3>
              <h4 className="fade-entry font-bold">Remote/Worldwide</h4>
              <p className="fade-entry">
                Open to collaborating across all time zones.
              </p>
            </div>
          </li>
          <li className="card-container">
            <RiTeamFill className="icons" aria-hidden />
            <div className="content-container">
              <h3 className="fade-entry text-size-lg font-bold">
                Job Preference
              </h3>
              <h4 className="fade-entry font-bold">Flexible</h4>
              <p className="fade-entry">
                Can work full-time, part-time, contract
              </p>
            </div>
          </li>
        </ul>
        <h2 className="fade-entry mt-10 text-size-xl font-bold text-center desktop:mt-20">
          Want a good website for your ideas?
        </h2>
        <p className="fade-entry mt-2 text-center desktop:text-size-xsm">
          You can reach me and let&apos;s work together
        </p>
        <Contact />
      </div>
    </section>
  );
}
