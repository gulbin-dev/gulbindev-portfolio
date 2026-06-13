import HeaderLandmark from "@components/UI/HeaderLandmark";
import SoftSkill from "./_components/SoftSkill";
import CanvasWrapper from "@components/CanvasWrapper";
import GridBackground from "@components/UI/GridBackground";
import Section from "@components/UI/Section";
import Assessment from "./_components/Assessment";

export default function AboutPage() {
  return (
    <>
      <GridBackground className="hidden desktop:block" />
      <Section className="tablet:min-h-58.5">
        <GridBackground className="block desktop:hidden" />
        <header className="relative z-1 tablet:col-start-5 tablet:col-end-9 tablet:row-span-4 tablet:row-start-1 desktop:col-start-7 desktop:col-end-12">
          <HeaderLandmark level={1}>About</HeaderLandmark>
          <p>
            After graduating in 2025, I immediately expanded my foundation into
            the modern web ecosystem, diving deep into React.js, Server-Side
            Rendering (SSR), and TypeScript. I thrive on challenging tech
            stacks, which drove me to master advanced state management, GSAP
            animations, performance optimization, and SEO.
          </p>
          <br />
          <p>
            This portfolio is the result of that rigorous journey, and I&apos;m
            incredibly proud of the work and the fun I had building it.
          </p>
        </header>
        <CanvasWrapper className="z-1 tablet:col-span-4 tablet:col-start-1 tablet:row-span-7 tablet:row-start-1 tablet:block tablet:origin-top tablet:-translate-y-15 desktop:col-start-1 desktop:col-end-7 desktop:translate-y-8" />
      </Section>
      <section
        role="region"
        aria-labelledby="soft-skills"
        className="z-1 w-full bg-primary px-3 pt-20 tablet:pt-5"
      >
        <div className="max-w-180 justify-self-center">
          <header>
            <HeaderLandmark id="soft-skills" level={2}>
              Soft Skills
            </HeaderLandmark>
            <p>How my attitude can contribute to your team</p>
          </header>
          <SoftSkill />
        </div>
      </section>
      <section
        role="region"
        aria-labelledby="assessment"
        className="px-3 pt-15"
      >
        <header>
          <HeaderLandmark id="assessment" level={3}>
            Assessment
          </HeaderLandmark>
          <p>My honest self reflective assessment</p>
        </header>
        <Assessment />
      </section>
    </>
  );
}
