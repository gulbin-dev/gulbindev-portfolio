"use client";
import { useEffect, useRef, useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@utils/gsap";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "auto";
  }, [isMobileNavOpen]);

  // Header hide/show on scroll
  useGSAP(() => {
    let isScrollingDown = true;
    const showHeaderAnim = gsap.to(headerRef.current, {
      yPercent: -100,
      duration: 0.5,
      paused: true,
    });

    ScrollTrigger.create({
      animation: showHeaderAnim,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (Math.abs(velocity) < 15) return;

        if (velocity < 0 && isScrollingDown) {
          isScrollingDown = false;
          showHeaderAnim.reverse();
        } else if (velocity > 0 && !isScrollingDown) {
          isScrollingDown = true;
          showHeaderAnim.play();
        }
      },
    });
  }, []);

  // Hamburger + sidebar animation timeline
  useGSAP(
    () => {
      const slices = gsap.utils.toArray<HTMLElement>(".hamburger-icon");
      gsap.defaults({ ease: "power2.out", duration: 0.3 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(slices[0], { autoAlpha: 0, y: 10 })
        .to(slices[1], { rotate: 45, delay: 0.3 }, "<")
        .to(slices[2], { rotate: -45 }, "<")
        .to(slices[3], { autoAlpha: 0, y: -10 }, "<-=0.3")
        .fromTo(
          sideBarRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.5 },
          "<",
        );
    },
    { scope: headerRef },
  );

  // Play or reverse timeline based on nav state
  useGSAP(() => {
    if (isMobileNavOpen) tl.current?.play();
    else tl.current?.reverse();
  }, [isMobileNavOpen]);

  // Toggle handler
  const { contextSafe } = useGSAP(() => {}, { scope: sideBarRef });
  const toggleSideBarHandler = contextSafe(() =>
    setIsMobileNavOpen((prev) => !prev),
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed! z-50 left-0 top-0 w-full min-h-12 content-center  tablet-portrait:min-h-9 bg-secondary-color "
      >
        <div className="max-w-180 w-full h-full flex justify-between items-center place-self-center px-3 py-3 tablet-portrait:py-0">
          <Link href="/" className="px-0 text-white">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={58}
              loading="eager"
              className="aspect-auto"
            />
          </Link>
          <NavLinks navStyle="hidden header-nav gap-6 mr-8 tablet-portrait:flex" />
          <button
            onClick={toggleSideBarHandler}
            className="flex flex-col gap-1 tablet-portrait:hidden"
            aria-label="Navigation menu"
          >
            <span className="hamburger-icon"></span>
            <span className="w-5 h-1 relative">
              <span className="hamburger-icon block absolute origin-center"></span>
              <span className="hamburger-icon block absolute origin-center"></span>
            </span>

            <span className="hamburger-icon"></span>
          </button>
        </div>
      </header>

      <div
        ref={sideBarRef}
        className="mobile-side-bar bg-primary-color-darker w-full h-screen fixed top-0 left-0 z-10 py-15"
        style={{ transform: "translateX(100%)" }}
      >
        <NavLinks
          navStyle="flex flex-col gap-2 items-end pr-3"
          anchorStyle="text-size-lg"
          updateState={setIsMobileNavOpen}
        />
      </div>
    </>
  );
}
