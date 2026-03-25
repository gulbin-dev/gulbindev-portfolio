"use client";
import VsCodeUI from "./components/VsCodeUI";
import CardSkill from "./components/CardSkill";
import HireMe from "./components/HireMe";
import HeroSection from "./components/HeroSection";

export default function Home() {
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
