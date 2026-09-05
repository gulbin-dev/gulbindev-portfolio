import HeaderLandmark from "@components/UI/HeaderLandmark";
import SoftSkill from "./_components/SoftSkill";
import CanvasWrapper from "@components/CanvasWrapper";
import GridBackground from "@components/UI/GridBackground";
import Section from "@components/UI/Section";
import Assessment from "./_components/Assessment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <GridBackground className="hidden desktop:block" />
      <Section
        ariaLabel="About me"
        className="tablet:min-h-58.5 tablet:items-center tablet:py-10"
      >
        <GridBackground className="block desktop:hidden" />
        <header className="relative z-1 tablet:col-start-5 tablet:col-end-9 tablet:row-span-6 tablet:row-start-1 tablet:self-center desktop:col-start-7 desktop:col-end-13">
          <p className="mb-3 text-size-xsm tracking-[0.18em] text-secondary-orange uppercase">
            The person behind the work
          </p>
          <HeaderLandmark level={1}>About</HeaderLandmark>
          <p className="max-w-120 text-size-sm">
            After graduating in 2025, I expanded my foundation into the modern
            web ecosystem, diving deep into React.js, Server-Side Rendering
            (SSR), and TypeScript.
          </p>
          <p className="mt-4 max-w-120 text-size-sm text-foreground-white/75">
            I thrive on challenging tech stacks, from advanced state management
            and GSAP animations to performance optimization and SEO. This
            portfolio is the result of that rigorous journey, and I&apos;m proud
            of the work and the fun I had building it.
          </p>
          <ul
            aria-label="Core areas of focus"
            className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-stroke pt-3 text-size-xsm tracking-[0.12em] text-foreground-white/70 uppercase"
          >
            <li>React.js</li>
            <li>SSR</li>
            <li>TypeScript</li>
            <li>Performance</li>
          </ul>
        </header>
        <CanvasWrapper className="z-1 tablet:col-span-4 tablet:col-start-1 tablet:row-span-7 tablet:row-start-1 tablet:block tablet:origin-top tablet:-translate-y-15 desktop:col-start-1 desktop:col-end-7 desktop:translate-y-8" />
      </Section>
      <section
        role="region"
        aria-labelledby="soft-skills"
        className="z-1 w-full bg-primary px-3 py-15 tablet:py-20"
      >
        <div className="mx-auto max-w-180">
          <header className="mb-8 max-w-120 tablet:mb-12">
            <p className="mb-2 text-size-xsm tracking-[0.18em] text-secondary-orange uppercase">
              01 / How I work
            </p>
            <HeaderLandmark id="soft-skills" level={2}>
              Soft Skills
            </HeaderLandmark>
            <p className="text-size-sm text-foreground-white/75">
              The habits I bring to a team when the work gets complicated.
            </p>
          </header>
          <SoftSkill />
        </div>
      </section>
      <section
        role="region"
        aria-labelledby="assessment"
        className="w-full px-3 py-15 tablet:py-20"
      >
        <div className="mx-auto max-w-180">
          <header className="mb-2 max-w-120 tablet:mb-4">
            <p className="mb-2 text-size-xsm tracking-[0.18em] text-secondary-orange uppercase">
              02 / In progress
            </p>
            <HeaderLandmark id="assessment" level={2}>
              Assessment
            </HeaderLandmark>
            <p className="text-size-sm text-foreground-white/75">
              An honest look at where I am, what I have learned, and where I
              want to grow next.
            </p>
          </header>
          <Assessment />
        </div>
      </section>
    </>
  );
}
