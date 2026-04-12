"use client";
import VsCodeUI from "./_components/VsCodeUI";
import CardSkill from "./_components/CardSkill";
import HireMe from "./_components/HireMe";
import HeroSection from "./_components/HeroSection";
import { ScrollTrigger } from "@utils/gsap/gsap";
import useWindowSizeListener from "../hooks/useWindowSizeListener";

/** Home page content */
export default function Home() {
  ScrollTrigger.refresh();
  const windowSize = useWindowSizeListener();
  return (
    <main>
      {/* hero-section */}
      <HeroSection windowSize={windowSize} />
      {/* card-skill-section */}
      <CardSkill windowSize={windowSize} />
      {/* VS code mimic */}
      <VsCodeUI windowSize={windowSize} />
      {/* Hire me */}
      <HireMe windowSize={windowSize} />
    </main>
  );
}
