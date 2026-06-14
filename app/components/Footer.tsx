import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import {
  EmailIcon,
  FiverrIcon,
  GithubIcon,
  LinkedInIcon,
  UpworkIcon,
} from "@utils/tabler-icons";
import CTALinkButton from "./UI/CTALinkButton";

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
      className="bg-primary-color-darker w-full pt-10 pb-3"
    >
      <div className="w-full max-w-180 place-self-center px-3">
        <Link href="/" className="inline-block text-white">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={58}
            aria-hidden
          />
        </Link>

        <p className="mt-2 tablet:w-[75%] desktop:w-[45%] desktop:text-size-xsm">
          I&apos;m Joshua Glenn R. Gulbin, a front-end web developer building
          responsive, user-centered, SEO-friendly website and clean code space.
        </p>
        <div className="grid grid-flow-row auto-rows-max grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12">
          <nav
            aria-label="Footer contact"
            className="footer-nav col-span-full col-start-1 row-start-1 py-6"
          >
            <ul aria-label="Contact links" className="flex gap-1">
              <li>
                <Link
                  href="https://github.com/gulbin-dev"
                  target="_blank"
                  aria-label="Visit my Github profile"
                  className="change-on-interaction"
                >
                  {/* only load icons when footer is in view */}
                  {inView ? (
                    <GithubIcon size={44} />
                  ) : (
                    <div className="h-5.5 w-5.5"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
                  target="_blank"
                  aria-label="Let's connect on LinkedIn"
                  className="change-on-interaction"
                >
                  {inView ? (
                    <LinkedInIcon size={44} />
                  ) : (
                    <div className="h-5.5 w-5.5"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.fiverr.com/s/1q8R136"
                  target="_blank"
                  aria-label="Hire me on Fiverr"
                  className="change-on-interaction"
                >
                  {inView ? (
                    <FiverrIcon size={44} />
                  ) : (
                    <div className="h-5.5 w-5.5"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.upwork.com/freelancers/~01971e35462d72fb44?mp_source=share"
                  target="_blank"
                  aria-label="Hire me on Upwork"
                  className="change-on-interaction"
                >
                  {inView ? (
                    <UpworkIcon size={44} />
                  ) : (
                    <div className="h-5.5 w-5.5"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:gulbindev@gmail.com"
                  target="_blank"
                  aria-label="Send me an email"
                  className="change-on-interaction"
                >
                  {inView ? (
                    <EmailIcon size={44} />
                  ) : (
                    <div className="h-5.5 w-5.5"></div>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
          <CTALinkButton
            link="/joshua-glenn-gulbin-resume-2026-05-16.pdf"
            target="_blank"
            className="col-span-2 col-start-1 row-start-2 text-center"
          >
            Download CV
          </CTALinkButton>
          <nav className="col-span-2 col-start-1 row-start-3 tablet:col-start-5 tablet:row-start-1 desktop:col-start-7">
            <ul
              aria-label="Website's legal and terms links"
              className="flex flex-col gap-1 py-5"
            >
              <li>
                <Link href="/privacy-notice" className="change-on-interaction">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="change-on-interaction"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-center">
          Icons used provided by{" "}
          <Link
            href="https://tabler.io/icons"
            target="_blank"
            className="change-on-interaction underline"
          >
            Tabler-Icons
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.streamlinehq.com/"
            target="_blank"
            className="change-on-interaction underline"
          >
            Streamline
          </Link>
        </p>
        <p className="mt-5 text-center">
          &copy; 2026 GulbinDev - Frontend React Web Developer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
