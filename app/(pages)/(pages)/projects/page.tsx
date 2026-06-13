import Contact from "@components/Contact";
import HeaderLandmark from "@components/UI/HeaderLandmark";
import { fetchProjectDemo } from "@server/project-demo";
import Projects from "./_components/Projects";
import { Suspense } from "react";
import ProjectLoader from "./_components/ProjectLoader";

export default async function ProjectsPage() {
  const projects = fetchProjectDemo();
  return (
    <>
      <section className="w-full max-w-180 px-3 pt-6">
        <header>
          <HeaderLandmark level={1}>Projects</HeaderLandmark>
          <p>I built these projects myself, showcasing my front-end skills</p>
        </header>
        <Suspense fallback={<ProjectLoader />}>
          <Projects projects={projects} />
        </Suspense>
      </section>
      <section className="w-full max-w-180 px-3">
        <Contact />
      </section>
    </>
  );
}
