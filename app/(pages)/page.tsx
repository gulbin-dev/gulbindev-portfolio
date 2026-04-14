"use client";
import VsCodeUI from "./_components/VsCodeUI";
import CardSkill from "./_components/CardSkill";
import HireMe from "./_components/HireMe";
import HeroSection from "./_components/HeroSection";
import { ScrollTrigger } from "@utils/gsap/gsap";

/** Home page content */
export default function Home() {
  ScrollTrigger.refresh();
  return (
    <main>
      {/* hero-section */}
      <HeroSection />
      {/* card-skill-section */}
      <CardSkill />
      {/* VS code mimic */}
      <VsCodeUI />
      {/* Hire me */}
      <HireMe />
    </main>
  );
}
