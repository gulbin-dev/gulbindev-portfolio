import useHeroSectionGSAP from "@/app/hooks/home-page-gsap/useHeroSectionGSAP";
import Link from "next/link";
export default function HeroSection({ windowSize }: { windowSize: number }) {
  useHeroSectionGSAP(windowSize);
  return (
    <section
      id="home-top"
      className="section w-full h-full overflow-hidden relative pt-10 linear-bg z-0 tablet:pt-1 tablet:h-screen"
    >
      <div className=" place-self-center max-w-180 tablet:flex">
        <div className="relative z-1 px-3 tablet:mt-10">
          <h1
            aria-hidden
            className="split-words text-pretty text-heading-lg tablet:text-heading-xl pt-7 tablet:pt-0"
          >
            Frontend Developer{" "}
            <span className="relative">
              Building
              <svg
                className="absolute -bottom-2  tablet:scale-y-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 99.98 16.76"
              >
                <path
                  id="line"
                  className=""
                  d="M98.48,15.26L7.69,11.82l81.2-5.73L1.5,1.5"
                  style={{
                    fill: "none",
                    stroke: "#ac62ff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "3px",
                  }}
                />
              </svg>
            </span>{" "}
            Predictable React Interfaces
          </h1>
          <h1 className="sr-only">
            Frontend Developer Building Predictable React Interfaces
          </h1>
          <p className="fade-in-up mt-4 tablet:mt-3">
            Helping teams deliver high-performance React applications with a
            focus on accessibility and SEO.
          </p>
          <ul className="my-6 flex flex-col gap-5.5 w-fit tablet:my-4 tablet:gap-4">
            <li className="list-discover-button opacity-0 group">
              <Link
                href="/discover"
                className="relative block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold"
              >
                {/* 1. FRONT FACE (Static) */}
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500">
                  CHECK MY WORKS
                </div>

                {/* 2. BACK FACE (The "Slide" layer) */}
                {/* translate-y-full puts it below the button; group-hover:translate-y-0 slides it up */}
                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  YOU MIGHT LIKE IT
                </div>
              </Link>
            </li>

            <li className="list-about-me-button opacity-0 group">
              <Link
                href="/about"
                className="relative inline-block w-30 h-5 rounded-lg bg-action-color text-dark-foreground overflow-hidden font-bold"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  KNOW MORE ABOUT ME
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-col-neutral-2 text-light-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  CONTACT ME IF YOU CAN
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative h-60 w-full z-1  tablet:h-150 overflow-hidden">
          <canvas
            id="hero-canvas"
            className="absolute top-35 left-0 tablet:bottom-0"
            data-speed="0.5"
          ></canvas>
        </div>
      </div>
    </section>
  );
}
