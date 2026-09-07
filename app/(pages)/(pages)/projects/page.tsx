import HeaderLandmark from "@components/UI/HeaderLandmark";
import { fetchProjectDemo } from "@server/project-demo";
import Projects from "./_components/Projects";
import { Suspense, lazy } from "react";
import ProjectLoader from "./_components/ProjectLoader";
import { Metadata } from "next";

const Contact = lazy(() => import("@components/Contact"));

export const metaData: Metadata = {
  title: "Portfolio Projects",
};

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
      <Suspense
        fallback={<div className="min-h-62.5 tablet:min-h-75"></div>}
      ></Suspense>
      <section className="w-full max-w-180 px-3">
        <Contact />
      </section>
    </>
  );
}
