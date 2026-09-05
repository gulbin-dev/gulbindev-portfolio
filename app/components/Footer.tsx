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
      className="from-primary-color-darker to-primary-color relative w-full overflow-hidden border-t border-white/10 bg-linear-to-b via-[#2a2630]"
    >
      {/* Gradient backdrop elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-linear-to-br from-secondary-orange/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-linear-to-tr from-cta/5 to-transparent blur-3xl"></div>
      </div>

      <div className="relative mx-auto w-full max-w-180 px-4 py-6 tablet:py-20 desktop:py-24 sm:px-6">
        {/* Logo and Brand Section */}
        <div className="mb-3">
          <Link href="/" className="group inline-flex items-center">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="GulbinDev logo"
                width={100}
                height={58}
                aria-hidden
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          <p className="mt-1 max-w-2xl text-size-xsm leading-relaxed text-foreground-white/80">
            I&apos;m{" "}
            <span className="font-semibold text-foreground-white">
              Joshua Glenn R. Gulbin
            </span>
            , a front-end web developer crafting responsive, user-centered
            experiences with clean, modern code.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 mb-12 grid grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-12 desktop:grid-cols-3">
          {/* Social Links Section */}
          <div>
            <h3 className="mb-4 text-size-sm font-semibold text-foreground-white">
              Connect
            </h3>
            <nav aria-label="Social media links">
              <ul className="flex flex-wrap gap-1.5">
                <li>
                  <Link
                    href="https://github.com/gulbin-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my Github profile"
                    className="hover:text-primary-color inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-cta hover:bg-cta active:scale-95"
                  >
                    {inView ? (
                      <GithubIcon size={20} />
                    ) : (
                      <div className="h-5 w-5"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/joshua-glenn-gulbin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Let's connect on LinkedIn"
                    className="hover:text-primary-color inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-cta hover:bg-cta active:scale-95"
                  >
                    {inView ? (
                      <LinkedInIcon size={20} />
                    ) : (
                      <div className="h-5 w-5"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.fiverr.com/s/1q8R136"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hire me on Fiverr"
                    className="hover:text-primary-color inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-cta hover:bg-cta active:scale-95"
                  >
                    {inView ? (
                      <FiverrIcon size={20} />
                    ) : (
                      <div className="h-5 w-5"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.upwork.com/freelancers/~01971e35462d72fb44?mp_source=share"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hire me on Upwork"
                    className="hover:text-primary-color inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-cta hover:bg-cta active:scale-95"
                  >
                    {inView ? (
                      <UpworkIcon size={20} />
                    ) : (
                      <div className="h-5 w-5"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:gulbindev@gmail.com"
                    aria-label="Send me an email"
                    className="hover:text-primary-color inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-cta hover:bg-cta active:scale-95"
                  >
                    {inView ? (
                      <EmailIcon size={20} />
                    ) : (
                      <div className="h-5 w-5"></div>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-4 text-size-sm font-semibold text-foreground-white">
              Resources
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy-notice"
                    className="inline-flex items-center gap-2 text-foreground-white/70 transition-all duration-300 hover:translate-x-1 hover:text-cta"
                  >
                    <span className="text-cta">→</span> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="inline-flex items-center gap-2 text-foreground-white/70 transition-all duration-300 hover:translate-x-1 hover:text-cta"
                  >
                    <span className="text-cta">→</span> Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* CTA Section */}
          <div className="tablet:col-span-2 desktop:col-span-1">
            <h3 className="mb-4 text-size-sm font-semibold text-foreground-white">
              My Resume
            </h3>
            <CTALinkButton
              href="/joshua-glenn-gulbin-resume-2026-05-16.pdf"
              target="_blank"
              className="w-full text-center tablet:w-auto"
            >
              Download CV
            </CTALinkButton>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Footer Bottom Section */}
        <div className="space-y-4">
          <p className="text-center text-size-xsm text-foreground-white/60">
            Made with <span className="text-secondary-orange">❤️</span> using{" "}
            <span className="font-semibold text-cta">Next.js</span>,{" "}
            <span className="font-semibold text-cta">React</span>, and{" "}
            <span className="font-semibold text-cta">TypeScript</span>
          </p>
          <p className="text-center text-size-xsm text-foreground-white/60">
            Icons provided by{" "}
            <Link
              href="https://tabler.io/icons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta underline underline-offset-2 transition-colors hover:text-cta-hover"
            >
              Tabler Icons
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.streamlinehq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta underline underline-offset-2 transition-colors hover:text-cta-hover"
            >
              Streamline
            </Link>
          </p>
          <p className="text-center text-size-xsm text-foreground-white/50">
            &copy; 2026 GulbinDev - Frontend React Web Developer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
