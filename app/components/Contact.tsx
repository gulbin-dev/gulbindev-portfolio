"use client";

import Link from "next/link";
import { MdEmail, FaLinkedin, MdOutlineArrowOutward } from "@utils/react-icons";
import { useRef } from "react";
import { useGSAP, gsap, mediaQueries, ScrollTrigger } from "@utils/gsap";

export default function Contact() {
  const contactRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const fadeEntries: HTMLElement[] = gsap.utils.toArray(
          ".contact-fade-entry",
        );
        const icons: HTMLElement[] = gsap.utils.toArray(".contact-icons");

        gsap.defaults({
          duration: 0.8,
        });
        ScrollTrigger.defaults({
          start: "top 80%",
        });

        ScrollTrigger.create({
          trigger: contactRef.current,
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
    { dependencies: [], scope: contactRef },
  );

  return (
    <ul
      ref={contactRef}
      className="flex flex-col gap-8 mt-6 place-self-center tablet-portrait:flex-row tablet-portrait:justify-center tablet-portrait:gap-6 tablet-portrait:px-3 desktop:mt-10"
    >
      <li className="card-contact-container">
        <div className="card-contact-header">
          <span>
            <FaLinkedin className="contact-icons text-secondary-color" />
          </span>
          <h3 className="contact-fade-entry text-size-lg">
            Let&apos;s Connect!
          </h3>
        </div>

        <div className="contact-content-container">
          <p className="contact-fade-entry">
            Always happy to discuss potential fits.
          </p>
          <Link
            href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
            target="_blank"
            aria-label="Connect with me on LinkedIn"
            className="cta-btn justify-self-center px-3 rounded-2xl"
          >
            <span className="cta-icon">
              <MdOutlineArrowOutward className="w-[60%]  place-self-center rounded-3xl " />
            </span>
          </Link>
        </div>
      </li>
      <li className="card-contact-container">
        <div className="card-contact-header">
          <span>
            <MdEmail className="contact-icons text-secondary-color" />
          </span>
          <h3 className="contact-fade-entry text-size-lg">Contact Me!</h3>
        </div>

        <div className="contact-content-container">
          <p className="contact-fade-entry">
            I&apos;m open to new challenges, Feel free to reach out!
          </p>
          <Link
            href="mailto:gulbindev@gmail.com"
            target="_blank"
            aria-label="Send me an email"
            className="cta-btn justify-self-center px-3 rounded-2xl"
          >
            <span className="cta-icon ">
              <MdOutlineArrowOutward className="w-[60%] place-self-center rounded-3xl " />
            </span>
          </Link>
        </div>
      </li>
    </ul>
  );
}
