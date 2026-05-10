import VsCodeUI from "./_components/VsCodeUI";
import CardSkill from "./_components/CardSkill";
import HireMe from "./_components/HireMe";
import HeroSection from "./_components/HeroSection";

/** Home page content */
export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col">
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
