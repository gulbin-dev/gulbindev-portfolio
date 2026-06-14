import GridBackground from "@components/UI/GridBackground";
import CTALinkButton from "@components/UI/CTALinkButton";
import HeaderLandmark from "@components/UI/HeaderLandmark";
import Tag from "@components/UI/Tag";
import Contact from "@components/Contact";
import WorkflowCards from "./_components/WorkflowCards";
import ProficientStacks from "./_components/ProficientStacks";
import { VSCodeIcon, VercelIcon, VitestIcon } from "@utils/tabler-icons";
import Image from "next/image";
import HeroScramblerText from "./_components/HeroScrambleText";
import CanvasWrapper from "@components/CanvasWrapper";
import TextWithUnderline from "@components/UI/TextWithUnderline";
import CoreStacks from "./_components/CoreStacks";
import Frontend from "./_components/Frontend";
import Section from "@components/UI/Section";

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <GridBackground className="hidden desktop:block" />
      <Section ariaLabel="Hero section" className="desktop:h-75">
        <GridBackground className="block desktop:hidden" />
        <header className="relative z-1 flex flex-col tablet:col-start-1 tablet:col-end-5 tablet:row-span-3 tablet:row-start-1 desktop:col-start-1 desktop:col-end-7 desktop:row-start-2">
          <span className="relative mt-6 ml-4 inline-block w-fit rounded-t-2xl pl-2.5 text-foreground-white before:absolute before:top-1/2 before:left-0 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green-500 before:drop-shadow-[0_0_4px_4px_#00ff00] before:content-['']">
            Hi, I&apos;m Joshua Glenn
          </span>
          <h1 className="flex flex-col text-size-lg text-secondary-red mobile-md:text-size-xl tablet:h-42">
            <span className="relative">Front-end Developer Building </span>
            <span className="relative">
              <HeroScramblerText
                className="font-bold"
                revealText="Predictable React Interfaces"
                initialText="&#8a0;_95*@ +1er? re15|7"
              />
            </span>
          </h1>
        </header>
        <nav
          aria-label="Introduction links"
          className="tablet:col-start-1 tablet:col-end-6 tablet:row-span-2 tablet:row-start-5 desktop:col-start-1 desktop:col-end-7 desktop:row-start-5"
        >
          <ul className="relative z-1 mt-5 mb-9 flex flex-col gap-5 mobile-md:flex-row mobile-md:gap-1.5 tablet:mt-10">
            <li>
              <CTALinkButton
                className="border border-stroke bg-primary text-foreground-white!"
                link="/joshua-glenn-gulbin-resume-2026-05-16.pdf"
                target="_blank"
              >
                Download CV
              </CTALinkButton>
            </li>
            <li>
              <CTALinkButton link="/projects">Check my work</CTALinkButton>
            </li>
          </ul>
        </nav>

        <CanvasWrapper className="tablet:col-start-5 tablet:col-end-9 tablet:row-span-7 tablet:row-start-1 tablet:block tablet:origin-center tablet:-translate-y-20 desktop:col-start-7 desktop:col-end-13" />
      </Section>
      {/* Stacks section */}
      <div className="relative z-1 flex w-full justify-center bg-primary">
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
      </div>
      {/* Service and Contact section */}
      <Section ariaLabel="Service and Contact">
        <header className="pt-5 tablet:col-span-3 tablet:col-start-1 tablet:row-span-2 tablet:row-start-1">
          <HeaderLandmark level={2}>Services</HeaderLandmark>
          <TextWithUnderline>
            <p className="animate-underline relative inline pb-1.5 text-size-xl after:absolute after:right-0 after:bottom-0 after:h-1 after:w-[65%] after:origin-right after:bg-secondary-orange after:content-['']">
              What I can do.
            </p>
          </TextWithUnderline>
        </header>
        <Frontend />
        <div className="pt-5 tablet:col-span-full tablet:col-start-1 tablet:row-span-26 tablet:row-start-7">
          <HeaderLandmark level={2}>Workflow</HeaderLandmark>
          <p className="mt-3">A habit of mine as I work</p>
          <WorkflowCards />
        </div>
        <Contact />
      </Section>
    </>
  );
}
