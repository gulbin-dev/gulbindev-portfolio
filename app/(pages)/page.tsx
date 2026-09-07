import Image from "next/image";
import { Suspense, lazy } from "react";
import HeroScramblerText from "./_components/HeroScrambleText";
import Frontend from "./_components/Frontend";
import ProficientStacks from "./_components/ProficientStacks";
import CoreStacks from "./_components/CoreStacks";
import GridBackground from "@components/UI/GridBackground";
import CTALinkButton from "@components/UI/CTALinkButton";
import HeaderLandmark from "@components/UI/HeaderLandmark";
import Tag from "@components/UI/Tag";
import CanvasWrapper from "@components/CanvasWrapper";
import TextWithUnderline from "@components/UI/TextWithUnderline";
import Section from "@components/UI/Section";
import { VSCodeIcon, VercelIcon, VitestIcon } from "@utils/tabler-icons";
import { fetchProjectDemo } from "@server/project-demo";
import ProjectImages from "./_components/ProjectImages";

const WorkflowCards = lazy(() => import("./_components/WorkflowCards"));
const Contact = lazy(() => import("@components/Contact"));

export default async function HomePage() {
  const projects = fetchProjectDemo();
  return (
    <>
      {/* Hero section */}
      <GridBackground />
      <Section ariaLabel="Hero section" className="desktop:h-75">
        <header className="relative z-1 flex flex-col tablet:col-start-1 tablet:col-end-5 tablet:row-span-3 tablet:row-start-1 desktop:col-start-1 desktop:col-end-7 desktop:row-span-2 desktop:row-start-1">
          <span className="relative mt-6 ml-0 inline-flex w-fit items-center gap-2 rounded-t-2xl pl-2.5 text-foreground-white desktop:ml-4">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-500/70" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]" />
            </span>
            Hi, I&apos;m Joshua Glenn
          </span>
          <h1 className="mt-2 flex flex-col text-size-lg text-secondary-red mobile-md:text-size-lg tablet:h-42 desktop:text-size-xl">
            <span className="relative">Front-end Developer Building </span>
            <span className="relative">
              <HeroScramblerText
                className="font-bold"
                revealText="Predictable React Interfaces"
                initialText="&#8a0;_95*@ +1er? re15|7"
              />
            </span>
          </h1>
        </header>{" "}
        <p className="relative z-1 col-start-1 mt-3 max-w-100 text-size-sm leading-5 text-foreground-white/75 tablet:col-end-5 tablet:row-span-2 tablet:row-start-6 tablet:max-w-90 tablet:pt-3 desktop:col-end-7 desktop:row-start-5 med-desktop:row-start-5">
          I turn thoughtful designs into fast, responsive interfaces that feel
          as good to use as they are to maintain.
        </p>
        <nav
          aria-label="Introduction links"
          className="tablet:col-start-1 tablet:col-end-6 tablet:row-span-2 tablet:row-start-9 desktop:col-start-1 desktop:col-end-7 desktop:row-start-8 med-desktop:row-start-7"
        >
          <ul className="relative z-1 mt-5 flex flex-col gap-5 mobile-md:flex-row mobile-md:gap-1.5">
            <li>
              <CTALinkButton href="/projects">Check my work</CTALinkButton>
            </li>
            <li>
              <CTALinkButton
                className="border border-stroke bg-primary text-foreground-white!"
                href="/joshua-glenn-gulbin-resume-2026-05-16.pdf"
                target="_blank"
              >
                Download CV
              </CTALinkButton>
            </li>
          </ul>
        </nav>
        <CanvasWrapper className="tablet:col-start-5 tablet:col-end-9 tablet:row-span-7 tablet:row-start-1 tablet:block tablet:origin-center tablet:-translate-y-20 desktop:col-start-7 desktop:col-end-13" />
      </Section>
      {/* Services section */}
      <div className="relative z-1 flex w-full justify-center bg-primary">
        <Section className="w-full" ariaLabel="Offer Service">
          {" "}
          <header className="pt-5 tablet:col-span-3 tablet:col-start-1 tablet:row-span-2 tablet:row-start-1">
            <HeaderLandmark level={2}>Services</HeaderLandmark>
            <TextWithUnderline>
              <p className="animate-underline relative inline pb-1.5 text-size-xl after:absolute after:right-0 after:bottom-0 after:h-1 after:w-[65%] after:origin-right after:bg-secondary-orange after:content-['']">
                What I can do.
              </p>
            </TextWithUnderline>
          </header>
          <Frontend />
          <Suspense fallback={<>Loading..</>}>
            <ProjectImages projects={projects} />
          </Suspense>
          <div
            aria-hidden
            className="flex justify-end text-size-md text-stone-500 tablet:-col-start-1 tablet:row-start-6 desktop:-col-start-3"
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
        </Section>
      </div>
      {/* Stacks section */}
      <Section ariaLabel="Developer Stacks">
        <header className="col-start-1 col-end-5 row-span-5 row-start-1">
          <HeaderLandmark level={2}>Expertise</HeaderLandmark>
          <p className="text-size-md leading-5 tablet:text-size-lg tablet:leading-6">
            I&apos;m not just a{" "}
            <span className="text-secondary-orange">developer</span> who can{" "}
            <span className="rounded-lg bg-secondary-red px-1 py-0.5 font-bold">
              code
            </span>
            <span aria-hidden>,</span>
          </p>
          <p className="relative text-size-md leading-5 tablet:w-40.5 tablet:text-size-lg desktop:w-60">
            <span className="flex gap-1">
              <span>I build </span>
              <span className="relative tablet:max-h-5 tablet:flex-1 tablet:overflow-hidden">
                <HeroScramblerText
                  revealText="maintainable code"
                  initialText="$%7!#- $4^>"
                />
              </span>
            </span>{" "}
            base proficient with these stacks
          </p>
        </header>
        <ProficientStacks />

        <div className="relative col-span-full col-start-1 row-span-5 row-start-8 mt-9 flex flex-col tablet:mt-0 tablet:grid tablet:grid-cols-subgrid tablet:grid-rows-subgrid">
          <div className="col-start-1 col-end-5 row-span-3 row-start-1 desktop:col-end-6">
            <TextWithUnderline>
              <h3 className="animate-underline relative w-fit pb-1 after:absolute after:right-0 after:bottom-0 after:h-0.5 after:w-full after:origin-right after:bg-secondary-orange after:content-['']">
                Core Stack
              </h3>
            </TextWithUnderline>

            <p className="mt-2 text-size-md leading-5">
              Day-to-day front-end web technologies I used on shipping my
              projects
            </p>
          </div>
          <CoreStacks />
        </div>
        <div className="relative col-span-5 col-start-1 row-span-5 row-start-12 my-6 desktop:col-end-13 desktop:row-span-4 desktop:my-0">
          <h3>Experience working using </h3>
          <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-2.5">
            <li>
              <Tag style="text-blue-400" icon={<VSCodeIcon />}>
                VS Code
              </Tag>
            </li>
            <li>
              <Tag>RestAPI</Tag>
            </li>
            <li>
              <Tag style="text-neutral-50" icon={<VercelIcon />}>
                Vercel
              </Tag>
            </li>
            <li>
              <Tag
                style="text-lime-50"
                icon={
                  <Image src="/gsap-icon.png" alt="" width={24} height={24} />
                }
              >
                GSAP
              </Tag>
            </li>
            <li>
              <Tag style="text-lime-400" icon={<VitestIcon />}>
                Vitest
              </Tag>
            </li>
          </ul>
        </div>
      </Section>
      {/* Workflow and Contact section */}
      <Section ariaLabel="Workflow and Contact">
        <div className="pt-5 tablet:col-span-full tablet:col-start-1 tablet:row-span-23 tablet:row-start-1">
          <HeaderLandmark level={2}>Workflow</HeaderLandmark>
          <p className="mt-3">A habit of mine as I work</p>
          <Suspense
            fallback={<div className="min-h-250 tablet:min-h-275"></div>}
          >
            <WorkflowCards />
          </Suspense>
        </div>
        <Contact />
      </Section>
    </>
  );
}
