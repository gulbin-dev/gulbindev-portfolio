"use client";

import useWindowSizeListener from "@hooks/useWindowSizeListener";
import useAboutImage from "@hooks/about-page-gsap/useAboutImage";
import useDescription from "@hooks/about-page-gsap/useDescription";
import { useEffect, useRef } from "react";
import {
  FaHandPaper,
  FaPaperPlane,
  FaGithubSquare,
  FaLinkedin,
} from "@utils/react-icons";
/** About page content */
export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const windowSize = useWindowSizeListener();
  useAboutImage();
  useDescription();

  useEffect(() => {
    if (windowSize < 768) canvasRef?.current?.setAttribute("data-speed", "0.5");
    else canvasRef?.current?.removeAttribute("data-speed");
  }, [windowSize]);

  return (
    <main className="bg-primary-color-darker px-3 mb-4">
      <section id="about-top" className="flex flex-col">
        <div className="canvas-container tablet:absolute h-75 w-full top-0 left-0  z-400 tablet:w-55 tablet:h-screen overflow-hidden ">
          <div className="hidden tablet:block absolute bg-primary-color-darker w-23 h-full"></div>
          <canvas
            id="about-canvas"
            className="absolute left-0 top-20 tablet:top-12"
          ></canvas>
        </div>
        <div className="tablet-pinned relative">
          {/* this <div> is used only for animation */}
          <div className="relative tablet:top-15 tablet:flex">
            {" "}
            <div className="hidden tablet:block min-w-40 min-h-15"></div>{" "}
            <div className="flex flex-col tablet:grid tablet:auto-rows-auto items-center tablet:max-h-20 tablet:auto-cols-min tablet:w-screen tablet:min-w-50 tablet:gap-y-5">
              {" "}
              <h1 className="text-heading-lg tablet:text-heading-xl col-start-1">
                About Me
              </h1>
              <p
                className="inline-block place-self-center tablet:text-3xl tablet:truncate col-start-1"
                aria-hidden="true"
              >
                <span className="flex gap-1 justify-center">
                  {" "}
                  <span className="word-hi self-end">Hi!</span>{" "}
                  <span className="min-w-3">
                    <FaHandPaper className="hand-icon z-300" />
                  </span>{" "}
                </span>{" "}
                <span className="block tablet:hidden">
                  I&apos;m{" "}
                  <span className="text-action-color font-bold">
                    Joshua Glenn R. Gulbin
                  </span>
                </span>
                <span className="hidden tablet:block">
                  {" "}
                  <span className="">I&apos;m</span>{" "}
                  <span className="name1 text-col-neutral-1 inline-block font-bold min-w-50 overflow-clip"></span>{" "}
                </span>
              </p>
              <p
                className="inline-block text-center h-full tablet:hidden col-start-1"
                aria-hidden="true"
              >
                {" "}
                a{" "}
                <span className="relative pb-0.5 after-line frontend-after">
                  frontend
                </span>{" "}
                <span className="relative pb-0.5 after-line developer-after">
                  developer
                </span>{" "}
                <span className="relative pb-0.5 after-line building-after">
                  building{" "}
                </span>{" "}
                responsive, state-driven web applications using React and{" "}
                <span className="relative pb-0.5 after-line javascript-after">
                  JavaScript
                </span>
                /{" "}
                <span className="relative pb-0.5 after-line typescript-after">
                  TypeScript
                </span>
                .
              </p>
            </div>
            <div
              className="hidden text-center relative tablet:flex gap-1 text-3xl items-end min-h-30 h-full"
              aria-hidden="true"
            >
              {" "}
              <span className="clip ">
                <span className="story-telling inline-block a lift-words">
                  a
                </span>{" "}
              </span>
              <span className="grid grid-cols-[repeat(9,50px)] gap-0.5 relative justify-baseline clip">
                <span className="story-telling frontend py-1.5 px-2.5 rounded-2xl frontend-bg-linear col-start-1 col-span-3 row-start-1">
                  <span>frontend</span>
                </span>
                <span className="story-telling developer py-1.5 px-2.5 rounded-2xl developer-bg-linear col-start-3 col-span-5 row-start-1 -z-1">
                  <span>developer</span>
                </span>
                <span className="story-telling building py-1.5 px-2.5 rounded-2xl building-bg-linear col-start-7 col-span-3 row-start-1">
                  <span>building</span>{" "}
                </span>
              </span>
              <span className=" story-telling responsive  lift-words">
                {" "}
                responsive,{" "}
              </span>
              <span className="container-state-driven grid grid-cols-[repeat(4,50px)] clip content-start mb-0.75  rounded-lg">
                <span className="story-telling state col-start-1 col-span-2 bg-action-color text-dark-foreground rounded-l-sm py-0.5 pl-1.5 flex gap-1.5 items-center z-2">
                  state{" "}
                  <span className="story-telling hyphen w-0.5 h-[3px] block bg-dark-foreground"></span>
                </span>

                <span className="story-telling driven col-start-3 col-span-2 bg-action-color text-dark-foreground py-0.5 pl-0.5 pr-1.5 rounded-r-sm block z-1">
                  driven
                </span>
              </span>{" "}
              {/*  SVG paper plane */}
              <div className="hidden tablet:block absolute left-90 top-25 min-w-20 min-h-30">
                <svg className="w-full h-full scale-65 -rotate-45 tablet:scale-100 tablet:rotate-0">
                  <path
                    id="path"
                    fill="none"
                    d="M-0.667,60.666C27.996,124.328,150.091,48.672,145.998,78.332,144.624,88.286,57.515,107.41,70.573,60.904,81.741,21.116,317.426,80.263,315.53,24.012,314.232,-14.453,266.274,-3.652,269.182,22.109,273.302,58.631,340.032,53.801,383.995,54.664"
                  ></path>
                </svg>
                <FaPaperPlane id="paper-plane" />
              </div>
              <span className="story-telling web lift-words">web</span>{" "}
              <span className="story-telling applications lift-words">
                applications
              </span>{" "}
              <span className="story-telling using lift-words">using</span>{" "}
              <span className="story-telling React lift-words">React</span>{" "}
              <span className="story-telling and lift-words">and</span>{" "}
              <span className="story-telling relative pb-0.5 javascript-after JavaScript">
                JavaScript
              </span>{" "}
              <span className="story-telling slash">/</span>
              <span className="story-telling relative pb-0.5 typescript-after TypeScript">
                TypeScript.
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
        <div className="relative flex flex-col items-center gap-x-2 mt-6 tablet:mt-40">
          <h2 className="text-heading-lg! tablet:text-heading-xl!">
            Reach out!
          </h2>
          <ul className="text-4xl flex gap-3 mt-2">
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
        <div className="mt-5">
          <h2 className="text-heading-lg text-center">Tech Stack</h2>
          <ul className="flex flex-wrap gap-y-4 gap-x-2 mt-3 justify-center">
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
