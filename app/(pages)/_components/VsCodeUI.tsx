"use client";

import { gsap, mediaQueries, ScrollTrigger, useGSAP } from "@utils/gsap";
import { useRef } from "react";

export default function VSCodeUI() {
  const vsCodeRef = useRef<HTMLElement | null>(null);

  // handle VSCode section header animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        () => {
          const skewVSCodeHeader = gsap.quickTo(".vs-code-header", "skewY");
          const yVSCodeHeader = gsap.quickTo(".vs-code-header", "y");
          const clampSkew = gsap.utils.clamp(-4, 4);
          const clampYVSCode = gsap.utils.clamp(-20, 20);

          ScrollTrigger.create({
            trigger: ".vs-code-header",
            start: "top bottom",
            end: "bottom top",
            onEnter: () =>
              gsap.to(".vs-code-header", {
                scrollTrigger: {
                  onUpdate: (self) => {
                    skewVSCodeHeader(clampSkew(self.getVelocity() / 2));
                    yVSCodeHeader(clampYVSCode(self.getVelocity() / 50));
                  },
                },
              }),
          });
        },
      );
    },
    { dependencies: [], scope: vsCodeRef },
  );

  // handle fade animation on scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,

        () => {
          ScrollTrigger.batch(".code-snippet p", {
            onEnter: (elements) => {
              gsap.to(elements, {
                y: 0,
                autoAlpha: 1,
                stagger: 0.15,
                overwrite: true,
              });
            },
            onLeaveBack: (elements) =>
              gsap.set(elements, { opacity: 0, y: 100, overwrite: true }),
            start: "top 98%",
          });
        },
      );
    },
    { dependencies: [], scope: vsCodeRef },
  );

  return (
    <section
      ref={vsCodeRef}
      aria-hidden="true"
      className="section snap w-full h-full  section3-bg"
    >
      <h2
        id="vs-code-header"
        className="vs-code-header pt-8 pb-3 text-size-xl text-center"
      >
        Solving Problem Into Smaller Tasks
      </h2>

      {/* dark background <div> simialr to vs code */}
      <div className=" bg-[#0F111A] w-full">
        <div className="max-w-96 place-self-center px-3 flex flex-col py-4 text-size-md tablet-portrait:text-2xl w-full ">
          <p id="issue" className="text-issue-red flex flex-col gap-1">
            <span>
              <span id="issue-span" className="text-issue-red font-bold">
                Issue:{" "}
              </span>
              <span>
                User profile names across the app are inconsistent and causing
                bugs.
              </span>
            </span>
            <span className="issue-list">
              Some names contain extra spaces (&quot; Joshua Glenn &quot;)
            </span>
            <span className="issue-list">
              Some include numbers or symbols (&quot;Josh123!!&quot;)
            </span>
            <span className="issue-list">Some are too short or too long</span>
            <span className="issue-list">
              Different parts of the app display names differently (header,
              profile page, comments)
            </span>
            <span className="issue-list">
              Backend stores raw input without validation
            </span>
            <span className="issue-list">
              Existing database already has dirty data
            </span>
          </p>

          {/* code snippet */}
          <div className="flex pt-4">
            <div className="code-snippet flex flex-col pr-1">
              <p>
                <span className="code-reserved-name">const </span>
                <span className="code-userdefined">data </span>
                <span className="code-reserved-syntax">= </span>
                <span className="code-reserved-syntax">{`{`}</span>
              </p>
              <p className="pl-3">
                <span className="code-string">id </span>
                <span className="code-reserved-syntax">: </span>
                <span className="code-number">12836128731</span>
                <span className="code-reserved-syntax">,</span>
              </p>
              <p className="pl-3">
                <span className="code-string">name </span>
                <span className="code-reserved-syntax">: </span>
                <span className="code-reserved-syntax">{`"`}</span>
                <span className="code-string">{` Joshua gleNn R. 123 GulbIn  456   `}</span>
                <span className="code-reserved-syntax">{`"`}</span>
                <span className="code-reserved-syntax">,</span>
              </p>
              <p className="code-reserved-syntax">{`}`}</p>

              <br />
              <p>
                <span className="code-reserved-name">function </span>
                <span className="code-func-prop">sanitizeName</span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined">name</span>
                <span className="code-reserved-syntax">: </span>
                <span className="code-reserved-name">string</span>
                <span className="code-casing">{")"}</span>
                <span className="code-casing">{" {"}</span>
              </p>
              <p className="pl-3">
                <span className="code-reserved-name"> let </span>
                <span className="code-userdefined">cleaned </span>
                <span className="code-reserved-syntax">= </span>
                <span className="code-userdefined">name</span>
                <span className="code-reserved-syntax">.trim</span>
                <span className="code-casing">{"()"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <p className="code-darkgray pl-3"> {"// Remove numbers"}</p>
              <p className="pl-3">
                <span className="code-userdefined"> cleaned </span>
                <span className="code-reserved-syntax">= cleaned.replace(</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-string">[0-9]</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-number">g</span>
                <span className="code-reserved-syntax">, {`""`});</span>
              </p>
              <p className="code-darkgray pl-3">
                {" "}
                {"// Allow: letters (Unicode), spaces, hyphen, apostrophe, dot"}
              </p>
              <p className="pl-3">
                <span className="code-userdefined"> cleaned </span>
                <span className="code-reserved-syntax">= cleaned.replace(</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-string">{`[^\p{L}\s\-'.]`}</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-number">gu</span>
                <span className="code-reserved-syntax">, {`""`});</span>
              </p>
              <p className="code-darkgray pl-3">
                {" "}
                {"// Collapse multiple spaces"}
              </p>
              <p className="pl-3">
                <span className="code-userdefined"> cleaned </span>
                <span className="code-reserved-syntax">= cleaned.replace(</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-string">\s+</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-number">g</span>
                <span className="code-reserved-syntax">, {`" "`});</span>
              </p>
              <p className="code-darkgray pl-3">
                {" "}
                {"// Normalize casing (lowercase first)"}
              </p>
              <p className="pl-3">
                <span className="code-userdefined"> cleaned </span>
                <span className="code-reserved-syntax">
                  = cleaned.toLowerCase
                </span>
                <span className="code-casing">{"()"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <p className="code-darkgray pl-3">
                {" "}
                {"// Convert to Title Case (handle hyphen + apostrophe)"}
              </p>
              <br />
              <p className="pl-3">
                <span className="code-userdefined"> cleaned </span>
                <span className="code-reserved-syntax">= cleaned</span>
              </p>
              <p className="pl-6">
                <span className="code-reserved-syntax"> .split(</span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string"> </span>
                <span className="code-reserved-syntax">&quot;)</span>
              </p>
              <p className="pl-6">
                <span className="code-reserved-syntax"> .map(</span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined italic">word</span>
                <span className="code-casing"> {") "}</span>
                <span className="code-reserved-name">{"=> "}</span>
                <span className="code-casing">{"{"}</span>
              </p>
              <p className="pl-9">
                <span className="code-reserved-name"> return </span>
                <span className="code-userdefined">word</span>
              </p>
              <p className="pl-12">
                <span className="code-reserved-syntax"> .split(</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-string">{`([-'])`}</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-casing">) </span>
                <span className="code-darkgray">{`// keep separators`}</span>
              </p>
              <p className="pl-12">
                <span className="code-reserved-syntax"> .map(</span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined italic">part</span>
                <span className="code-casing"> {") "}</span>
                <span className="code-reserved-name">{"=> "}</span>
                <span className="code-casing">{"{"}</span>
              </p>
              <p className="pl-15">
                <span className="code-reserved-name"> if </span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined">part </span>
                <span className="code-reserved-syntax">=== </span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string">-</span>
                <span className="code-reserved-syntax">
                  &quot; || part ==={" "}
                </span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string">&apos;</span>
                <span className="code-reserved-syntax">
                  &quot;) return part;
                </span>
              </p>
              <p className="pl-15">
                <span className="code-reserved-name"> if </span>
                <span className="code-casing">{"("}</span>
                <span className="code-reserved-syntax">!</span>
                <span className="code-userdefined">part</span>
                <span className="code-casing">{")"}</span>
                <span className="code-reserved-name"> return </span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string"></span>
                <span className="code-reserved-syntax">&quot;;</span>
              </p>
              <p className="pl-15">
                <span className="code-reserved-name"> return </span>
                <span className="code-userdefined">part</span>
                <span className="code-casing">{"["}</span>
                <span className="code-number">0</span>
                <span className="code-casing">{"]"}</span>
                <span className="code-reserved-syntax">
                  {`.toUpperCase() + part.slice(`}
                </span>
                <span className="code-number">1</span>
                <span className="code-casing">{")"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <p className="pl-12">
                <span className="code-casing"> {"})"}</span>
              </p>
              <p className="pl-12">
                <span className="code-reserved-syntax"> .join(</span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string"></span>
                <span className="code-reserved-syntax">&quot;);</span>
              </p>
              <p className="pl-6">
                <span className="code-casing"> {"})"}</span>
              </p>
              <p className="pl-6">
                <span className="code-reserved-syntax"> .join(</span>
                <span className="code-reserved-syntax">&quot;</span>
                <span className="code-string"> </span>
                <span className="code-reserved-syntax">&quot;);</span>
              </p>
              <br />
              <p className="pl-3">
                <span className="code-reserved-name"> return </span>
                <span className="code-userdefined">cleaned</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <p>
                <span className="code-casing">{"}"}</span>
              </p>
              <br />
              <p>
                <span className="code-func-prop">sanitizeName</span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined">data</span>
                <span className="code-reserved-syntax">.</span>
                <span className="code-reserved-syntax">name</span>
                <span className="code-casing">{")"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
