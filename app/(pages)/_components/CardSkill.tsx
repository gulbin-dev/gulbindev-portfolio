"use client";

import useCardSkillGSAP from "@/app/hooks/home-page-gsap/useCardSkillGSAP";

/** card-skill component */
export default function CardSkill() {
  useCardSkillGSAP();
  return (
    <section
      id="pin-section"
      className="section snap w-full h-full relative tablet:h-screen overflow-hidden linear-bg pb-8 text-light-foreground"
    >
      <div id="pin-trigger">
        <h2 className="card-skill-header opacity-100 text-heading-lg text-center text-pretty pt-5 tablet:pt-10 pb-1 px-2">
          Building Web Features that can stand out other brands
        </h2>
        <p
          className="card-skill-p text-center text-pretty mt-1.5 px-3"
          aria-hidden="true"
        >
          A website rich in accessibility, performance, user-friendly, and clean
          codebase.
        </p>
        <p className="sr-only">
          A website rich in accessibility, performance, user-friendly, and clean
          codebase.
        </p>
      </div>
      <div className="container-cards mt-10! max-w-180 place-self-center">
        <ul className=" flex flex-col">
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Responsive Website</h3>
                <p>
                  High-fidelity, mobile-first designs engineered for stability.
                  Consistent across all devices, ensuring a seamless experience
                  while reducing layout breaks and QA cycles.
                </p>
              </div>
              <video
                src="/responsive.webm"
                className="tablet:w-[70vw] aspect-video"
                autoPlay
                loop
                muted
              ></video>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Accessibility-First Interfaces</h3>
                <p>
                  Built with semantic HTML and ARIA patterns to ensure full
                  keyboard navigation. Improves usability for all users while
                  strengthening SEO and indexing reliability.
                </p>
              </div>
              <div className="container-video"></div>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Clean & Maintainable Code</h3>
                <p>
                  Writing readable, self-documenting code with a focus on SOLID
                  principles. My approach minimizes technical debt, making the
                  codebase easier to debug, refactor, and scale over time.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
