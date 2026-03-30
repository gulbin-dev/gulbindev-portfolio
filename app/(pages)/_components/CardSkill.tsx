"use client";

export default function CardSkill() {
  return (
    <section
      id="pin-section"
      className="section snap w-full h-full relative tablet:h-screen overflow-hidden linear-bg pb-8 text-light-foreground"
    >
      <div id="pin-trigger">
        <h2 className="card-skill-header opacity-100 text-heading-lg text-center text-pretty pt-5 tablet:pt-10 pb-1 px-3">
          Building Web Features that can stand out other brands
        </h2>
        <p
          className="card-skill-p  text-center text-pretty mt-1.5 px-3"
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
      <div className="container-cards max-w-180 place-self-center">
        <ul className="flex flex-col gap-2 mt-4!">
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Responsive Website</h3>
                <p>
                  Mobile-first layouts that remain consistent across devices,
                  preventing layout breaks and reducing QA (Quality Assurance)
                  time.
                </p>
              </div>
              <video src="/responsive.webm" autoPlay loop muted></video>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Accessibility-First Interfaces</h3>
                <p>
                  Proper semantics, focus management, and ARIA usage make
                  features usable without a mouse and improve SEO indexing
                  reliability.
                </p>
              </div>
              <div className="container-video"></div>
            </div>
          </li>
          <li className="list-card-skill">
            <div className="card-skill">
              <div className="card-description">
                <h3>Maintainable Code Structure</h3>
                <p>
                  Components use a modular folder structure and predictable
                  logic so it&apos;s easy to maintain, and onboard new
                  developers.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
