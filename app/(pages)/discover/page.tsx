import { Suspense } from "react";
import Projects from "./_component/Projects";
import ProjectLoader from "./_component/ProjectLoader";

/** Discover page content */
export default function Discover() {
  return (
    <main className="bg-primary-color-darker">
      <section id="dicover-top" className="pt-10">
        <h1 className="text-center text-heading-xl pt-5 px-3">
          Explore my work
        </h1>

        {/* <Suspense fallback={<ProjectLoader />}>
          <Projects />
        </Suspense> */}
      </section>
      <section className="pb-10">
        <h2>Any ideas you may have? Let&apos;s make it real.</h2>
        <p>Reach me here</p>
      </section>
    </main>
  );
}
