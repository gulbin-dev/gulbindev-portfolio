import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { FaGithubSquare, FaLinkedin, MdEmail } from "@utils/react-icons";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  // Intersection Observer is used to only load icons when footer is in view
  const { ref, inView } = useInView({
    rootMargin: "200px 0px 0px 0px",
    triggerOnce: true,
  });

  return (
    <footer
      ref={(el) => {
        footerRef.current = el;
        ref(el);
      }}
      className="bg-primary-color-darker w-full pb-1"
    >
      <div className="max-w-180 place-self-center w-full px-3">
        <Link href="/" className="text-white inline-block">
          <Image src="/logo.png" alt="logo" width={100} height={58} />
        </Link>

        <p className="mt-2 desktop:text-size-xsm">
          Frontend React Web developer focusing on building responsive,
          user-centered, seo friendly website and clean code space.
        </p>
        <nav className="mt-3 footer-nav">
          <ul className="flex gap-1">
            <li>
              <Link
                href="https://github.com/gulbin-dev"
                aria-label="Visit my Github"
                className="enlarge"
              >
                {/* only load icons when footer is in view */}
                {inView ? (
                  <FaGithubSquare />
                ) : (
                  <div className="w-[1em] h-[1em"></div>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
                aria-label="Let's connect on LinkedIn"
                className="enlarge"
              >
                {inView ? (
                  <FaLinkedin />
                ) : (
                  <div className="w-[1em] h-[1em]"></div>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="mailto:gulbindev@gmail.com"
                aria-label="Send me an email"
                className="enlarge"
              >
                {inView ? <MdEmail /> : <div className="w-[1em] h-[1em]"></div>}
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href="/joshua-glenn-gulbin-resume-2026-05-16.pdf"
          target="_blank"
          className="cta-btn mt-3"
        >
          <span className="cta-text">Download CV</span>
        </Link>

        <p className="mt-5 italic text-light-secondary">Quick Links</p>
        <NavLinks
          navStyle="flex flex-col gap-1 footer"
          anchorStyle="underline"
        />

        <p className="mt-5 text-center">
          &copy; 2026 GulbinDev - Frontend React Web Developer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
